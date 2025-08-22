'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './page.module.css';

// Grid + time settings
const SIZE_OPTIONS = [
  { label: '3×3', c: 3, r: 3 },
  { label: '4×4', c: 4, r: 4 },
];

// Time per size (seconds)
const TIME_BY_SIZE = {
  '3x3': 60, // 1:00
  '4x4': 75, // 1:15
};

// Mole behavior by size
const MOLE_CONFIG = {
  '3x3': { interval: 800, upTime: 650, concurrent: 1 }, // slower, 1 mole at a time
  '4x4': { interval: 650, upTime: 550, concurrent: 2 }, // a bit faster, up to 2 at once
};

function sizeKey(c, r) {
  return `${c}x${r}`;
}
function fmtTime(s) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${ss.toString().padStart(2, '0')}`;
}

export default function WhackMole() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);

  // Game state
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_BY_SIZE['3x3']);
  const [timeUp, setTimeUp] = useState(false);

  const [score, setScore] = useState(0);      // Snake-style scoring (+10 per hit)
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);    // not used for score (just stat)

  // Active moles tracking
  const [active, setActive] = useState(() => new Set()); // Set of cell indices that currently have a mole up
  const [bonked, setBonked] = useState(() => new Set()); // Set of indices that have been hit (prevent double score)
  const [shake, setShake] = useState(null);               // index for brief hit animation

  // Refs for loops
  const timerRef = useRef(null);
  const moleIntervalRef = useRef(null);
  const moleTimeoutsRef = useRef({}); // { [idx]: timeoutId } to lower moles

  const totalCells = useMemo(() => cols * rows, [cols, rows]);
  const sKey = sizeKey(cols, rows);
  const totalTime = TIME_BY_SIZE[sKey] ?? 60;
  const { interval, upTime, concurrent } = MOLE_CONFIG[sKey] ?? MOLE_CONFIG['3x3'];

  const gameOver = timeUp;

  // TIMER LOOP
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

  // MOLE SPAWN LOOP
  useEffect(() => {
    if (started && !gameOver) {
      moleIntervalRef.current = setInterval(() => {
        setActive((prev) => {
          const next = new Set(prev);
          // Clean up if already at max concurrent
          if (next.size >= concurrent) return next;

          // Choose a random empty hole
          let tries = 0;
          let pick = -1;
          while (tries < 10) {
            const candidate = Math.floor(Math.random() * totalCells);
            if (!next.has(candidate)) {
              pick = candidate;
              break;
            }
            tries++;
          }
          if (pick === -1) return next;

          next.add(pick);

          // Schedule the mole to go down
          const t = setTimeout(() => {
            setActive((prev2) => {
              const n2 = new Set(prev2);
              n2.delete(pick);
              return n2;
            });
            setBonked((prevB) => {
              const nB = new Set(prevB);
              nB.delete(pick);
              return nB;
            });
            delete moleTimeoutsRef.current[pick];
          }, upTime);

          moleTimeoutsRef.current[pick] = t;
          return next;
        });
      }, interval);

      return () => {
        clearInterval(moleIntervalRef.current);
      };
    }
  }, [started, gameOver, totalCells, interval, upTime, concurrent]);

  // STOP LOOPS ON GAME OVER
  useEffect(() => {
    if (gameOver) {
      clearInterval(timerRef.current);
      clearInterval(moleIntervalRef.current);
      // Clear pending mole timeouts
      Object.values(moleTimeoutsRef.current).forEach((t) => clearTimeout(t));
      moleTimeoutsRef.current = {};
      setActive(new Set());
    }
  }, [gameOver]);

  const restart = (newCols = cols, newRows = rows) => {
    // clear loops/timeouts before resetting
    clearInterval(timerRef.current);
    clearInterval(moleIntervalRef.current);
    Object.values(moleTimeoutsRef.current).forEach((t) => clearTimeout(t));
    moleTimeoutsRef.current = {};

    setCols(newCols);
    setRows(newRows);
    setStarted(false);
    setTimeUp(false);
    setTimeLeft(TIME_BY_SIZE[sizeKey(newCols, newRows)] ?? 60);
    setScore(0);
    setHits(0);
    setMisses(0);
    setActive(new Set());
    setBonked(new Set());
    setShake(null);
  };

  const handleHoleClick = (idx) => {
    if (gameOver) return;

    // Miss if no mole here
    if (!active.has(idx)) {
      setMisses((m) => m + 1);
      // tiny nudge effect on miss (hole shake)
      setShake(idx);
      setTimeout(() => setShake(null), 120);
      return;
    }

    // Mole exists — check if already bonked
    if (bonked.has(idx)) return;
    // Mark bonked to avoid multiple scores on same mole
    setBonked((prev) => {
      const n = new Set(prev);
      n.add(idx);
      return n;
    });

    // Score like Snake: +10 per hit
    setScore((s) => s + 10);
    setHits((h) => h + 1);

    // pop/bonk feedback
    setShake(idx);
    setTimeout(() => setShake(null), 120);

    // Optionally drop the mole early on hit:
    const to = moleTimeoutsRef.current[idx];
    if (to) {
      clearTimeout(to);
      delete moleTimeoutsRef.current[idx];
    }
    setActive((prev) => {
      const n = new Set(prev);
      n.delete(idx);
      return n;
    });
    setBonked((prev) => {
      const n = new Set(prev);
      n.delete(idx);
      return n;
    });
  };

  const timePct = Math.max(0, Math.min(100, Math.round((timeLeft / totalTime) * 100)));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Whack-a-Mole</h1>

      <div className={styles.header}>
        <div className={styles.badge}><span>⭐ Score:</span> <strong>{score}</strong></div>
        <div className={styles.badge}><span>🕒 Time:</span> <strong>{fmtTime(timeLeft)}</strong></div>
        <div className={styles.badge}><span>🎯 Hits:</span> <strong>{hits}</strong></div>
        <div className={styles.badge}><span>🙈 Misses:</span> <strong>{misses}</strong></div>
      </div>

      {/* Time bar */}
      <div className={styles.timeBarWrap} aria-hidden>
        <div className={styles.timeBar} style={{ width: `${timePct}%` }} />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.sizeGroup}>
          {SIZE_OPTIONS.map(o => (
            <button
              key={o.label}
              className={`${styles.pill} ${(cols===o.c && rows===o.r) ? styles.pillActive : ''}`}
              onClick={() => restart(o.c, o.r)}
              title={`Time: ${fmtTime(TIME_BY_SIZE[sizeKey(o.c, o.r)] ?? 60)}`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <button
          className={styles.primary}
          onClick={() => {
            if (!started) setStarted(true);
            else restart();
          }}
        >
          {started ? 'Restart' : 'Start'}
        </button>
      </div>

      <div
        className={styles.board}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: totalCells }).map((_, i) => {
          const isUp = active.has(i);
          const wasHit = bonked.has(i);
          const isShake = shake === i;
          return (
            <button
              key={i}
              className={`${styles.hole} ${isUp ? styles.holeUp : ''} ${wasHit ? styles.holeBonked : ''} ${isShake ? styles.holeShake : ''}`}
              onClick={() => handleHoleClick(i)}
              aria-label={isUp ? 'Mole up' : 'Empty hole'}
            >
              <div className={styles.holeInner}>
                {/* ground */}
                <div className={styles.ground} />
                {/* mole */}
                <div className={`${styles.mole} ${isUp ? styles.moleUp : ''}`}>
                  <span className={styles.moleFace}>{wasHit ? '😵' : '🦫'}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {gameOver && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>⌛ Time’s Up!</h2>
            <div className={styles.modalStats}>
              <div><span>Score</span><strong>{score}</strong></div>
              <div><span>Hits</span><strong>{hits}</strong></div>
              <div><span>Misses</span><strong>{misses}</strong></div>
              <div><span>Board</span><strong>{cols}×{rows}</strong></div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.primary} onClick={() => restart(cols, rows)}>Play Again</button>
              <button className={styles.ghost} onClick={() => restart(3, 3)}>Reset to 3×3 (1:00)</button>
            </div>
          </div>
        </div>
      )}

      <p className={styles.hint}>Tap the holes when the mole pops up. +10 per hit. Bigger grids spawn faster!</p>
    </div>
  );
}
