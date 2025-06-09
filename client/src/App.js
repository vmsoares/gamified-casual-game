import React, { useState } from 'react';
import Game from './Game';
import Leaderboard from './Leaderboard';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [lastScore, setLastScore] = useState(null);

  const handleGameEnd = async (score) => {
    setLastScore(score);
    try {
      await addDoc(collection(db, 'scores'), {
        score,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Erro ao salvar pontuação', err);
    }
  };

  return (
    <div className="App">
      <h1>Gamified Casual Game</h1>
      {lastScore === null ? (
        <Game onGameEnd={handleGameEnd} />
      ) : (
        <>
          <h2>Seu resultado: {lastScore} pontos!</h2>
          <button onClick={() => setLastScore(null)}>Jogar Novamente</button>
                  <Leaderboard />
        </>
      )}
    </div>
  );
}

export default App;
