import React, { useEffect, useState } from 'react';
import './Leaderboards.css';

interface Player {
  id: number;
  name: string;
  balance: number;
}

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div className="leaderboards">
      <h2>Leaderboard</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name}: ${player.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;