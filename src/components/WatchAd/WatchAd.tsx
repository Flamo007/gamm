import React from 'react';
import { useDispatch } from 'react-redux';
import { updateBalance } from '../../store/slices/playerSlice';

const WatchAd: React.FC = () => {
  const dispatch = useDispatch();

  const handleWatchAd = () => {
    fetch('/api/player/watch-ad', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`You earned $${data.reward} for watching an ad!`);
        dispatch(updateBalance(data.reward));
      });
  };

  return (
    <div>
      <button onClick={handleWatchAd} className="watch-ad-button">
        Watch Ad to Earn $50
      </button>
    </div>
  );
};

export default WatchAd;