import React, { useState } from 'react';
import Game from './Game';

function App() {
  const [lastScore, setLastScore] = useState(null);

  const handleGameEnd = (score) => {
    setLastScore(score);
    // TODO: enviar score ao Firebase/Firestore
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
        </>
      )}
    </div>
  );
}

export default App;
