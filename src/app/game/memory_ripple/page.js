'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './page.module.css';

export default function MemoryRipple() {
  const [gameState, setGameState] = useState('idle'); // idle, showing, playing, gameOver
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [playerPattern, setPlayerPattern] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [showingIndex, setShowingIndex] = useState(0);

  const gridSize = 4;
  const positions = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  const generatePattern = useCallback((length) => {
    const newPattern = [];
    for (let i = 0; i < length; i++) {
      newPattern.push(Math.floor(Math.random() * (gridSize * gridSize)));
    }
    return newPattern;
  }, [gridSize]);

  const startGame = () => {
    setGameState('showing');
    setLevel(1);
    setScore(0);
    setPlayerPattern([]);
    const newPattern = generatePattern(3);
    setPattern(newPattern);
    setShowingIndex(0);
  };

  const createRipple = (position) => {
    const id = Date.now();
    setRipples(prev => [...prev, { id, position }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  useEffect(() => {
    if (gameState === 'showing' && showingIndex < pattern.length) {
      const timer = setTimeout(() => {
        createRipple(pattern[showingIndex]);
        setShowingIndex(showingIndex + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (gameState === 'showing' && showingIndex === pattern.length) {
      setTimeout(() => {
        setGameState('playing');
        setShowingIndex(0);
      }, 1000);
    }
  }, [gameState, showingIndex, pattern]);

  const handleCellClick = (position) => {
    if (gameState !== 'playing') return;

    createRipple(position);
    const newPlayerPattern = [...playerPattern, position];
    setPlayerPattern(newPlayerPattern);

    if (newPlayerPattern[newPlayerPattern.length - 1] !== pattern[newPlayerPattern.length - 1]) {
      setGameState('gameOver');
      return;
    }

    if (newPlayerPattern.length === pattern.length) {
      setScore(score + level * 10);
      setTimeout(() => {
        setLevel(level + 1);
        setPlayerPattern([]);
        const newPattern = generatePattern(Math.min(3 + level, 8));
        setPattern(newPattern);
        setGameState('showing');
        setShowingIndex(0);
      }, 1000);
    }
  };

  const getPositionStyle = (index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    return {
      top: `${row * 25}%`,
      left: `${col * 25}%`,
    };
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Memory Ripple</h1>
      
      <div className={styles.stats}>
        <div>Level: {level}</div>
        <div>Score: {score}</div>
      </div>

      <div className={styles.gameBoard}>
        {positions.map((position) => (
          <div
            key={position}
            className={styles.cell}
            style={getPositionStyle(position)}
            onClick={() => handleCellClick(position)}
          >
            {ripples
              .filter(r => r.position === position)
              .map(ripple => (
                <div key={ripple.id} className={styles.ripple} />
              ))}
          </div>
        ))}
      </div>

      {gameState === 'idle' && (
        <button className={styles.button} onClick={startGame}>
          Start Game
        </button>
      )}

      {gameState === 'showing' && (
        <div className={styles.status}>Watch the pattern...</div>
      )}

      {gameState === 'playing' && (
        <div className={styles.status}>
          Repeat the pattern ({playerPattern.length}/{pattern.length})
        </div>
      )}

      {gameState === 'gameOver' && (
        <div className={styles.gameOver}>
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <button className={styles.button} onClick={startGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}