import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBalance } from '../../store/slices/playerSlice';
import LoginModal from '../LoginModal/LoginModal';
import Navbar from '../Navbar/Navbar'; // Importera Navbar-komponenten
import './Homepage.css';
const Homepage = () => {
    const [games, setGames] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Ny state för inloggning
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // Mocka speldata eller hämta från backend
        setGames([
            { id: '1', name: 'Slot Machine', description: 'Try your luck with the slot machine!' },
            { id: '2', name: 'Roulette', description: 'Spin the wheel and win big!' },
            { id: '3', name: 'Blackjack', description: 'Beat the dealer in Blackjack!' },
        ]);
    }, []);
    const handlePlay = (gameId) => {
        if (!isLoggedIn) {
            setShowLoginModal(true); // Visa inloggningsmodulen om användaren inte är inloggad
            return;
        }
        navigate(`/games/${gameId}`);
    };
    const handleLogin = () => {
        setShowLoginModal(false);
        setIsLoggedIn(true); // Markera användaren som inloggad
        dispatch(setBalance(1000)); // Exempel: Sätt spelarens saldo vid inloggning
        console.log('User logged in!');
    };
    return (_jsxs("div", { className: "homepage", children: [_jsx(Navbar, {}), " ", _jsx("section", { className: "hero", children: _jsxs("div", { className: "hero-content", children: [_jsx("h1", { children: "Welcome to Lucky Empire \uD83C\uDFB0" }), _jsx("p", { children: "Experience the thrill of casino games from the comfort of your home!" }), _jsx("button", { className: "cta-button", onClick: () => (isLoggedIn ? navigate('/profile') : setShowLoginModal(true)), children: isLoggedIn ? 'Go to Profile' : 'Login or Register' })] }) }), _jsxs("section", { className: "featured-games", children: [_jsx("h2", { children: "Featured Games" }), games.length > 0 ? (_jsx("div", { className: "game-grid", children: games.map((game) => (_jsxs("div", { className: "game-card", children: [_jsx("h3", { children: game.name }), game.description && _jsx("p", { children: game.description }), _jsx("button", { className: "play-button", onClick: () => handlePlay(game.id), children: "Play" })] }, game.id))) })) : (_jsx("p", { className: "no-games", children: "No games available at the moment. Please check back later!" }))] }), _jsxs("footer", { className: "footer", children: [_jsx("p", { children: "\u00A9 2025 Lucky Empire. All rights reserved." }), _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", { href: "/faq", children: "FAQ" }) }), _jsx("li", { children: _jsx("a", { href: "/support", children: "Support" }) }), _jsx("li", { children: _jsx("a", { href: "/terms", children: "Terms & Conditions" }) })] })] }), showLoginModal && _jsx(LoginModal, { onClose: () => setShowLoginModal(false), onLogin: handleLogin })] }));
};
export default Homepage;
// filepath: c:\Users\Erik\lucky-empire\tests\Homepage.test.tsx
test('renders homepage with all sections', () => {
    render(_jsx(MemoryRouter, { children: _jsx(Provider, { store: store, children: _jsx(Homepage, {}) }) }));
    // Updated assertions to match the actual content
    expect(screen.getByText(/Welcome to Lucky Empire 🎰/i)).toBeInTheDocument();
    expect(screen.getByText(/Featured Games/i)).toBeInTheDocument();
    expect(screen.getByText(/Slot Machine/i)).toBeInTheDocument();
    expect(screen.getByText(/Roulette/i)).toBeInTheDocument();
    expect(screen.getByText(/Blackjack/i)).toBeInTheDocument();
});
