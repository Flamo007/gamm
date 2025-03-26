import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBalance } from '../../store/slices/playerSlice';
import LoginModal from '../LoginModal/LoginModal';
import Navbar from '../Navbar/Navbar'; // Import Navbar component
import './Homepage.css';

interface Game {
  id: string;
  name: string;
  description?: string; // Add a description for games
}

const Homepage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock game data or fetch from backend
    setGames([
      { id: '1', name: 'Slot Machine', description: 'Try your luck with the slot machine!' },
      { id: '2', name: 'Roulette', description: 'Spin the wheel and win big!' },
      { id: '3', name: 'Blackjack', description: 'Beat the dealer in Blackjack!' },
    ]);
  }, []);

  const handlePlay = (gameId: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // Show login modal if the user is not logged in
      return;
    }
    navigate(`/games/${gameId}`);
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true); // Mark the user as logged in
    dispatch(setBalance(1000)); // Example: Set player's balance on login
    console.log('User logged in!');
  };

  return (
    <div className="homepage">
      <Navbar /> {/* Use Navbar component */}
      {/* Welcome Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Lucky Empire 🎰</h1>
          <p>Experience the thrill of casino games from the comfort of your home!</p>
          <button
            className="cta-button"
            onClick={() => (isLoggedIn ? navigate('/profile') : setShowLoginModal(true))}
          >
            {isLoggedIn ? 'Go to Profile' : 'Login or Register'}
          </button>
        </div>
      </section>

      {/* Featured Games */}
      <section className="featured-games">
        <h2>Featured Games</h2>
        {games.length > 0 ? (
          <div className="game-grid">
            {games.map((game) => (
              <div key={game.id} className="game-card">
                <h3>{game.name}</h3>
                {game.description && <p>{game.description}</p>}
                <button className="play-button" onClick={() => handlePlay(game.id)}>
                  Play
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-games">No games available at the moment. Please check back later!</p>
        )}
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Lucky Empire. All rights reserved.</p>
        <ul>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/support">Support</a></li>
          <li><a href="/terms">Terms & Conditions</a></li>
        </ul>
      </footer>

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />}
    </div>
  );
};

export default Homepage;