// app/components/SnakeGame.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
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

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
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
    const gameInterval = setInterval(moveSnake, 100);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Snake Game</h1>
      <div className="mb-4 text-xl">Score: {score}</div>
      
      <div 
        className="relative bg-gray-800 border-2 border-gray-600"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute ${index === 0 ? 'bg-green-400' : 'bg-green-600'}`}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 1,
              height: CELL_SIZE - 1,
            }}
          />
        ))}
        
        {/* Food */}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 1,
            height: CELL_SIZE - 1,
          }}
        />
      </div>

      <div className="mt-6 space-y-4">
        {!isPlaying && (
          <button
            onClick={startGame}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
          >
            {gameOver ? 'Play Again' : 'Start Game'}
          </button>
        )}
        
        {gameOver && (
          <div className="text-center">
            <p className="text-2xl font-bold text-red-500">Game Over!</p>
            <p className="text-lg">Final Score: {score}</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-gray-400">
        <p>Use arrow keys to control the snake</p>
        <p className="text-sm mt-2">Eat the red food to grow and increase your score!</p>
      </div>
    </div>
  );
}