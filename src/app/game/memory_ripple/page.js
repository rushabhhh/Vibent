'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './page.module.css';

/* ===== Global Leaderboard helper (added) ===== */
const LB_LS_KEY = "GB_LEADERBOARD_V1";
const LB_NAME_KEY = "GB_PLAYER_NAME";

function lb_read() {
  const raw = typeof window !== "undefined" ? localStorage.getItem(LB_LS_KEY) : null;
  if (!raw) return { players: {}, seedApplied: true };
  try { return JSON.parse(raw); } catch { return { players: {}, seedApplied: true }; }
}

function lb_write(data) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LB_LS_KEY, JSON.stringify(data));
  }
}

function recordScoreForLeaderboard(points, gameId) {
  if (typeof window === "undefined") return;
  const name = (localStorage.getItem(LB_NAME_KEY) || "Guest").trim() || "Guest";
  const data = lb_read();
  if (!data.players[name]) {
    data.players[name] = {
      total: 0,
      games: { snake: 0, whackmole: 0, memory: 0 },
      updatedAt: 0
    };
  }
  data.players[name].total += Number(points) || 0;
  const g = data.players[name].games;
  if (gameId && Object.prototype.hasOwnProperty.call(g, gameId)) {
    g[gameId] += Number(points) || 0;
  }
  data.players[name].updatedAt = Date.now();
  lb_write(data);
}
/* ===== end helper ===== */

// Simple emoji set (pairs are made from the first N)
const EMOJIS = ['🍉','🍇','🍓','🍒','🍍','🥝','🍑','🍎','🍌','🥥','🍊','🫐','🍐','🥭'];

// Time per grid (seconds)
const TIME_BY_SIZE = {
  '4x4': 120, // 2 min
  '5x4': 180, // 3 min
  '6x4': 240, // 4 min
};

function makeDeck(cols, rows) {
  const pairsNeeded = (cols * rows) / 2;
  const base = EMOJIS.slice(0, pairsNeeded);
  const deck = [...base, ...base].map((symbol, i) => ({
    id: i + '_' + Math.random().toString(36).slice(2, 7),
    symbol,
    flipped: false,
    matched: false,
  }));
  // Fisher–Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${ss.toString().padStart(2, '0')}`;
}

export default function MemoryCardGame() {
  const [cols, setCols] = useState(4);
  const [rows, setRows] = useState(4);
  const [deck, setDeck] = useState(() => makeDeck(4, 4));

  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [lock, setLock] = useState(false);

  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  // Snake-style score: +10 per match
  const [score, setScore] = useState(0);

  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_BY_SIZE['4x4']);
  const [timeUp, setTimeUp] = useState(false);

  const timerRef = useRef(null);

  // NEW: prevents double-posting to leaderboard per round
  const submittedRef = useRef(false);

  const totalPairs = useMemo(() => (cols * rows) / 2, [cols, rows]);
  const gameWon = matches === totalPairs;
  const gameOver = gameWon || timeUp;

  // Timer loop
  useEffect(() => {
    if (started && !gameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setTimeUp(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [started, gameOver]);

  // Stop timer when game ends
  useEffect(() => {
    if (gameOver && timerRef.current) clearInterval(timerRef.current);
  }, [gameOver]);

  // NEW: post the score exactly once when the round ends
  useEffect(() => {
    if (gameOver && !submittedRef.current) {
      recordScoreForLeaderboard(score, "memory");
      submittedRef.current = true;
    }
  }, [gameOver, score]);

  const sizeKey = (c = cols, r = rows) => `${c}x${r}`;
  const resetTimeFor = (c, r) => TIME_BY_SIZE[sizeKey(c, r)] ?? 120;

  const restart = (newCols = cols, newRows = rows) => {
    // allow posting again on the next round
    submittedRef.current = false;

    setCols(newCols);
    setRows(newRows);
    setDeck(makeDeck(newCols, newRows));
    setFirst(null);
    setSecond(null);
    setLock(false);
    setMoves(0);
    setMatches(0);
    setScore(0);
    setTimeUp(false);
    setTimeLeft(resetTimeFor(newCols, newRows));
    setStarted(false);
  };

  const handleCardClick = (idx) => {
    if (lock || gameOver) return;
    if (!started) setStarted(true);

    const card = deck[idx];
    if (card.flipped || card.matched) return;

    const nextDeck = deck.slice();
    nextDeck[idx] = { ...card, flipped: true };
    setDeck(nextDeck);

    if (first === null) {
      setFirst(idx);
      return;
    }
    if (second === null) {
      setSecond(idx);
      setLock(true);
      setMoves(m => m + 1);

      setTimeout(() => {
        const a = nextDeck[first];
        const b = nextDeck[idx];

        if (a.symbol === b.symbol) {
          // match!
          const updated = nextDeck.slice();
          updated[first] = { ...a, matched: true };
          updated[idx] = { ...b, matched: true };
          setDeck(updated);
          setMatches(x => x + 1);
          setScore(s => s + 10); // +10 per match
        } else {
          const updated = nextDeck.slice();
          updated[first] = { ...a, flipped: false };
          updated[idx] = { ...b, flipped: false };
          setDeck(updated);
        }
        setFirst(null);
        setSecond(null);
        setLock(false);
      }, 550);
    }
  };

  const sizeOptions = [
    { label: '4×4', c: 4, r: 4 },
    { label: '5×4', c: 5, r: 4 },
    { label: '6×4', c: 6, r: 4 },
  ];

  const accuracy = moves === 0 ? 0 : Math.round((matches / moves) * 100);
  const timePct = Math.max(0, Math.min(100, Math.round((timeLeft / resetTimeFor(cols, rows)) * 100)));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Memory Match</h1>

      {/* Link to the global leaderboard */}
      <a href="/leaderboard" className={styles.badge} style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 8 }}>
        🏆 View Global Leaderboard
      </a>

      <div className={styles.header}>
        <div className={styles.badge}><span>⭐ Score:</span> <strong>{score}</strong></div>
        <div className={styles.badge}><span>🕒 Time:</span> <strong>{fmtTime(timeLeft)}</strong></div>
        <div className={styles.badge}><span>🎯 Moves:</span> <strong>{moves}</strong></div>
        <div className={styles.badge}><span>✅ Accuracy:</span> <strong>{accuracy}%</strong></div>
      </div>

      {/* Time bar */}
      <div className={styles.timeBarWrap} aria-hidden>
        <div className={styles.timeBar} style={{ width: `${timePct}%` }} />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.sizeGroup}>
          {sizeOptions.map(o => (
            <button
              key={o.label}
              className={`${styles.pill} ${(cols===o.c && rows===o.r) ? styles.pillActive : ''}`}
              onClick={() => restart(o.c, o.r)}
              title={`Time: ${fmtTime(resetTimeFor(o.c, o.r))}`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <button className={styles.primary} onClick={() => restart()}>
          {started ? 'Restart' : 'Start'}
        </button>
      </div>

      <div
        className={styles.board}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {deck.map((card, i) => {
          const stateClass = card.matched
            ? styles.cardMatched
            : card.flipped
            ? styles.cardFlipped
            : '';
          return (
            <button
              key={card.id}
              className={`${styles.card} ${stateClass}`}
              onClick={() => handleCardClick(i)}
              aria-label={card.flipped || card.matched ? card.symbol : 'Hidden card'}
            >
              <div className={styles.cardInner}>
                <div className={`${styles.cardFace} ${styles.cardBack}`}>?</div>
                <div className={`${styles.cardFace} ${styles.cardFront}`}>{card.symbol}</div>
              </div>
              {card.matched && <span className={styles.sparkle} aria-hidden>✨</span>}
            </button>
          );
        })}
      </div>

      {gameOver && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>
              {gameWon ? '🎉 You Win!' : '⌛ Time’s Up!'}
            </h2>
            <div className={styles.modalStats}>
              <div><span>Score</span><strong>{score}</strong></div>
              <div><span>Time Left</span><strong>{fmtTime(timeLeft)}</strong></div>
              <div><span>Moves</span><strong>{moves}</strong></div>
              <div><span>Accuracy</span><strong>{accuracy}%</strong></div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.primary} onClick={() => restart(cols, rows)}>
                {gameWon ? 'Play Again' : 'Try Again'}
              </button>
              <button className={styles.ghost} onClick={() => restart(4, 4)}>Reset to 4×4 (2:00)</button>
            </div>
          </div>
        </div>
      )}

      <p className={styles.hint}>
        Flip two cards. Match pairs to win. Time increases with grid size.
      </p>
    </div>
  );
}
