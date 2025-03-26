import React, { useEffect, useState } from 'react';

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {players.map((player: any) => (
          <li key={player.id}>
            {player.name}: ${player.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;