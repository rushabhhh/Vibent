// app/components/SnakeGame.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 22; // slightly larger for spacing
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 1, y: 0 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateRandomFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      // Wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      // Self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateRandomFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPlaying, generateRandomFood]);

  const handleKeyPress = useCallback((e) => {
    if (!isPlaying) return;

    const key = e.key;
    let newDirection = { ...direction };

    switch (key) {
      case 'ArrowUp':
        if (direction.y === 0) newDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (direction.y === 0) newDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (direction.x === 0) newDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (direction.x === 0) newDirection = { x: 1, y: 0 };
        break;
    }

    setDirection(newDirection);
  }, [direction, isPlaying]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 120);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans">
      <h1 className="text-5xl font-extrabold mb-4 text-green-400 drop-shadow-lg animate-fade-in">Snake Game</h1>
      <div className="mb-4 text-2xl font-mono text-yellow-300 animate-fade-in delay-100">Score: {score}</div>

      <div 
        className="relative bg-gray-900 border-4 border-gray-700 rounded-xl shadow-xl overflow-hidden game-board-snake"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Subtle grid lines */}
        <div className="absolute inset-0 grid-lines"></div>
        {/* Ambient glow */}
        <div className="absolute inset-0 game-board-glow"></div>

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute rounded-md transition-all duration-100 ease-linear snake-segment ${index === 0 ? 'snake-head' : 'snake-body'}`}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />
        ))}
        
        {/* Food (shiny apple) */}
        <div
          className="absolute rounded-full food-apple"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
          }}
        ></div>
      </div>

      <div className="mt-6 space-y-4">
        {!isPlaying && (
          <button
            onClick={startGame}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-xl tracking-wide shadow-md shadow-green-500/40 transition-all button-glow"
          >
            {gameOver ? 'Play Again' : 'Start Game'}
          </button>
        )}

        {gameOver && (
          <div className="text-center animate-bounce game-over-text">
            <p className="text-3xl font-bold text-red-500 drop-shadow">💀 Game Over!</p>
            <p className="text-xl text-yellow-300">Final Score: {score}</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-gray-400 animate-fade-in delay-200">
        <p>🎮 Use <span className="text-green-400 font-bold">Arrow Keys</span> to control the snake</p>
        <p className="text-sm mt-2 italic">Eat the glowing apple to grow and boost your score!</p>
      </div>

      {/* Global Styles for Snake Game */}
      <style jsx global>{`
        .font-sans {
          font-family: 'Inter', sans-serif; /* Assuming Inter is available from Geist Sans */
        }
        .font-mono {
          font-family: 'Geist Mono', monospace; /* Assuming Geist Mono is available */
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-fade-in.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; }

        .game-board-snake {
          background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
          box-shadow: 0 10px 30px rgba(0, 255, 0, 0.15), inset 0 0 15px rgba(0, 255, 0, 0.05);
          position: relative;
          overflow: hidden;
        }

        .game-board-glow {
          position: absolute;
          inset: -5px; /* Slightly outside the board */
          border-radius: 25px; /* Match board border-radius + padding */
          box-shadow: 0 0 30px rgba(0, 255, 0, 0.3); /* Green ambient glow */
          pointer-events: none;
          animation: boardGlow 3s infinite alternate ease-in-out;
        }

        @keyframes boardGlow {
          from { box-shadow: 0 0 20px rgba(0, 255, 0, 0.2); }
          to { box-shadow: 0 0 40px rgba(0, 255, 0, 0.4); }
        }

        .grid-lines {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: ${CELL_SIZE}px ${CELL_SIZE}px;
          pointer-events: none;
        }

        .snake-segment {
          background: linear-gradient(135deg, #22c55e, #16a34a); /* Green gradient */
          border: 1px solid rgba(0,0,0,0.2);
          box-shadow: inset 0 0 5px rgba(255,255,255,0.2), 0 0 8px rgba(34,197,94,0.5);
          transition: transform 0.1s ease-out; /* Smooth movement */
        }

        .snake-head {
          background: linear-gradient(135deg, #86efac, #22c55e); /* Brighter green */
          box-shadow: inset 0 0 8px rgba(255,255,255,0.4), 0 0 15px rgba(134,239,172,0.8);
          z-index: 10;
        }

        .food-apple {
          background: radial-gradient(circle at 30% 30%, #ff6b6b, #e74c3c); /* Red gradient */
          border: 1px solid rgba(0,0,0,0.2);
          box-shadow: 0 0 15px rgba(231,76,60,0.7), inset 0 0 10px rgba(255,255,255,0.5);
          animation: foodPulse 1.5s infinite alternate ease-in-out;
          z-index: 5;
        }

        @keyframes foodPulse {
          from { transform: scale(1); box-shadow: 0 0 10px rgba(231,76,60,0.5), inset 0 0 8px rgba(255,255,255,0.4); }
          to { transform: scale(1.05); box-shadow: 0 0 20px rgba(231,76,60,0.9), inset 0 0 12px rgba(255,255,255,0.6); }
        }

        .button-glow {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #10b981, #059669); /* Green gradient */
          border: none;
          color: white;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          box-shadow: 0 5px 20px rgba(16,185,129,0.4);
        }

        .button-glow:hover {
          background: linear-gradient(45deg, #059669, #10b981);
          box-shadow: 0 8px 25px rgba(16,185,129,0.6);
          transform: translateY(-2px);
        }

        .button-glow:active {
          transform: translateY(0);
          box-shadow: 0 3px 15px rgba(16,185,129,0.3);
        }

        .game-over-text {
          font-family: 'Geist Mono', monospace;
          text-shadow: 0 0 10px rgba(255,0,0,0.6);
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 0.8s infinite;
        }

        /* Cosmic background pattern */
        body {
          background-image: 
            radial-gradient(circle at 15% 50%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 85% 20%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 50% 80%, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: cosmicPattern 60s linear infinite;
        }

        @keyframes cosmicPattern {
          from { background-position: 0 0; }
          to { background-position: 500px 500px; }
        }
      `}</style>
    </div>
  );
}
