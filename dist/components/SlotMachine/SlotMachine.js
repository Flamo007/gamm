import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBalance } from './store/slices/playerSlice';
import './SlotMachine.css';

const SlotMachine = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.player.balance);
  const [result, setResult] = useState(['', '', '']);
  const [bet, setBet] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    // Kod för att snurra slotmaskinen
  };

  return (
    <div className="slot-machine">
      <h1>Slotmaskin</h1>
      <p>Balance: {balance}</p>
      <p>Bet: {bet}</p>
      <button onClick={spin}>Snurra</button>
      <div className="result">
        {result.map((symbol, index) => (
          <span key={index}>{symbol}</span>
        ))}
      </div>
    </div>
  );
};

export default SlotMachine;