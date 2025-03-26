import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setBalance, updateBalance } from '../../store/slices/playerSlice'; // Korrekt import
import './PlayerBalance.css';

const PlayerBalance: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const balance = useSelector((state: RootState) => state.player.balance);

  useEffect(() => {
    // Hämta spelarens saldo från backend
    fetch('/api/player')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch player data');
        }
        return res.json();
      })
      .then((data) => dispatch(setBalance(data.balance))) // Korrekt användning av setBalance
      .catch((error) => console.error('Error fetching player data:', error));
  }, [dispatch]);

  const handleEarn = () => {
    dispatch(updateBalance(100)); // Lägg till 100
    fetch('/api/player/update-balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 100 }),
    }).catch((error) => console.error('Error updating balance:', error));
  };

  const handleSpend = () => {
    dispatch(updateBalance(-50)); // Ta bort 50
    fetch('/api/player/update-balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: -50 }),
    }).catch((error) => console.error('Error updating balance:', error));
  };

  return (
    <div className="player-balance">
      <h2>Your Balance</h2>
      <p>${balance}</p>
      <button onClick={handleEarn}>Earn $100</button>
      <button onClick={handleSpend}>Spend $50</button>
    </div>
  );
};

export default PlayerBalance;