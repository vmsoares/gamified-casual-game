import React, { useState, useEffect } from 'react';

const GAME_DURATION = 60; // segundos
const TARGET_SIZE = 50;   // px

function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - TARGET_SIZE);
  const y = Math.random() * (window.innerHeight - TARGET_SIZE - 100) + 100; // evita topo
  return { x, y };
}

export default function Game({ onGameEnd }) {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [targetPos, setTargetPos] = useState(getRandomPosition());

  // Contagem regressiva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          onGameEnd(score);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [score, onGameEnd]);

  const handleClick = () => {
    setScore((s) => s + 1);
    setTargetPos(getRandomPosition());
  };

  return (
    <div>
      <h2>Tempo: {timeLeft}s | Pontos: {score}</h2>
      {timeLeft > 0 && (
        <div
          onClick={handleClick}
          style={{
            position: 'absolute',
            width: TARGET_SIZE,
            height: TARGET_SIZE,
            backgroundColor: '#ff5252',
            borderRadius: '50%',
            cursor: 'pointer',
            left: targetPos.x,
            top: targetPos.y,
          }}
        />
      )}
      {timeLeft === 0 && (
        <button onClick={() => window.location.reload()}>Jogar Novamente</button>
      )}
    </div>
  );
}
