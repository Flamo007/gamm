const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Speldata
const games = [
  { id: '1', name: 'Slot Machines', category: 'Casino', isFavorite: false },
  { id: '2', name: 'Card Games', category: 'Table Games', isFavorite: false },
  { id: '3', name: 'Roulette', category: 'Casino', isFavorite: false },
  { id: '4', name: 'Scratch Cards', category: 'Instant Win', isFavorite: false },
  { id: '5', name: 'Blackjack', category: 'Table Games', isFavorite: false },
  { id: '6', name: 'Poker', category: 'Table Games', isFavorite: false },
  { id: '7', name: 'Bingo', category: 'Instant Win', isFavorite: false },
];

// Spelardata
const players = [
  { id: '1', name: 'Player123', balance: 1000 },
  { id: '2', name: 'Player456', balance: 1500 },
  { id: '3', name: 'Player789', balance: 800 },
];

let player = {
  id: '1',
  name: 'Player123',
  balance: 1000, // Startsaldo
  lastDailyBonus: null, // Datum för senaste dagliga bonus
};

// Endpoint: Hämta alla spel
app.get('/api/games', (req, res) => {
  res.json(games);
});

// Endpoint: Hämta spelarens data
app.get('/api/player', (req, res) => {
  res.json(player);
});

// Endpoint: Uppdatera spelarens saldo
app.post('/api/player/update-balance', (req, res) => {
  const { amount } = req.body;
  player.balance += amount; // Uppdatera spelarens saldo
  res.json(player);
});

// Endpoint: Titta på reklam för att tjäna valuta
app.post('/api/player/watch-ad', (req, res) => {
  const reward = 50; // Belöning för att titta på reklam
  player.balance += reward;
  res.json({ message: 'Ad watched successfully', reward, balance: player.balance });
});

// Endpoint: Daglig bonus
app.post('/api/player/daily-bonus', (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Dagens datum (YYYY-MM-DD)
  if (player.lastDailyBonus === today) {
    return res.status(400).json({ message: 'Daily bonus already claimed!' });
  }
  const bonus = 100; // Belopp för daglig bonus
  player.balance += bonus;
  player.lastDailyBonus = today;
  res.json({ message: 'Daily bonus claimed!', bonus, balance: player.balance });
});

// Endpoint: Leaderboard
app.get('/api/leaderboard', (req, res) => {
  const sortedPlayers = players.sort((a, b) => b.balance - a.balance);
  res.json(sortedPlayers);
});

// Starta servern
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

import React, { useEffect, useState } from 'react';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>{game.name}</div>
      ))}
    </div>
  );
};

export default GameList;