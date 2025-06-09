import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'scores'), orderBy('score', 'desc'), limit(10));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setScores(data);
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <h3>Top 10 Pontuações</h3>
      <ol>
        {scores.map((s, idx) => (
          <li key={s.id}>
            {idx + 1}. {s.score} pts
          </li>
        ))}
      </ol>
    </div>
  );
}
