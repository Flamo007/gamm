import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GamePage.css'; // Importera CSS för layout
import SlotMachine from '../SlotMachine/SlotMachine';  // Importera SlotMachine-komponenten

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>(); // Hämta gameId från URL-parametrarna
  const navigate = useNavigate(); // För navigering i appen

  // Om gameId inte finns, navigera tillbaka till startsidan
  useEffect(() => {
    if (!gameId) {
      navigate('/', { replace: true }); // Navigera tillbaka till startsidan om gameId saknas
    }
  }, [gameId, navigate]);

  // Funktion för att hantera "Tillbaka till startsidan"-knappen
  const handleBack = () => {
    navigate('/', { replace: true }); // Navigera tillbaka till startsidan
  };

  return (
    <div className="game-page">
      <h1>Game {gameId}</h1> {/* Visa spelets ID */}
      <SlotMachine /> {/* SlotMachine-komponenten visas här */}
      <button className="back-button" onClick={handleBack}>
        Back to Homepage
      </button>
    </div>
  );
};

export default GamePage;
