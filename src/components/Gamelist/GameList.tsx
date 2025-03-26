import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameList.css';

interface Game {
  id: string;
  name: string;
  category: string;
}

const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Ny state för laddning
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/games')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch games.');
        }
        return res.json();
      })
      .then((data: Game[]) => {
        setGames(data);
        const uniqueCategories = Array.from(new Set(data.map((game) => game.category)));
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error('Error fetching games:', err);
        alert('An error occurred while fetching games. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false); // Stäng av laddningsindikatorn
      });
  }, []);

  const handlePlay = (gameId: string) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div className="game-list">
      {isLoading ? (
        <p>Loading games...</p> // Laddningsindikator
      ) : (
        categories.map((category) => (
          <div key={category} className="category">
            <h2>{category}</h2>
            <div className="games">
              {games
                .filter((game) => game.category === category)
                .map((game) => (
                  <div key={game.id} className="game-card">
                    <h3>{game.name}</h3>
                    <button className="play-button" onClick={() => handlePlay(game.id)}>
                      Play
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GameList;