// src/components/Player/PlayerProfile.tsx
import React from 'react';

// PlayerProfile-komponenten
const PlayerProfile: React.FC<{
  name: string;
  level: number;
  balance: number;
  vipLevel: string;
}> = ({ name, level, balance, vipLevel }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Level: {level}</p>
      <p>Balance: ${balance}</p>
      <p>VIP Level: {vipLevel}</p>
    </div>
  );
};

export default PlayerProfile;  // Default export
