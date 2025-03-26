const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Speldata
const games = [
  {
    id: '1',
    name: 'Slot Machines',
    image: '/assets/slot-machines.jpg',
  },
  {
    id: '2',
    name: 'Card Games',
    image: '/assets/card-games.jpg',
  },
  {
    id: '3',
    name: 'Roulette',
    image: '/assets/roulette.jpg',
  },
  {
    id: '4',
    name: 'Scratch Cards',
    image: '/assets/scratch-cards.jpg',
  },
];

// Endpoint: Rotvägen
app.get('/', (req, res) => {
  res.send('Welcome to the Lucky Empire API!');
});

// Endpoint: Hämta alla spel
app.get('/api/games', (req, res) => {
  const games = [
    { id: '1', name: 'Slot Machine', category: 'Casino' },
    { id: '2', name: 'Roulette', category: 'Casino' },
    { id: '3', name: 'Blackjack', category: 'Card Games' },
    { id: '4', name: 'Poker', category: 'Card Games' },
  ];
  res.json(games);
});

// Endpoint: Login
app.post('/api/login', (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Name cannot be empty.' });
  }

  // Mockad användardata
  const user = {
    name,
    balance: 1000, // Startsaldo
  };

  res.json({
    message: `Welcome, ${user.name}!`,
    balance: user.balance,
  });
});

// Endpoint: Daily Bonus
app.post('/api/player/daily-bonus', (req, res) => {
  const bonus = Math.floor(Math.random() * 100) + 1; // Generera en slumpmässig bonus
  res.json({
    bonus,
    message: `You received $${bonus} as a daily bonus!`,
  });
});

// Starta servern
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});