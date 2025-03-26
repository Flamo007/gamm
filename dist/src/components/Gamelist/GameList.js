import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameList.css';
const GameList = () => {
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
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
            .then((data) => {
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
    const handlePlay = (gameId) => {
        navigate(`/games/${gameId}`);
    };
    return (_jsx("div", { className: "game-list", children: isLoading ? (_jsx("p", { children: "Loading games..." }) // Laddningsindikator
        ) : (categories.map((category) => (_jsxs("div", { className: "category", children: [_jsx("h2", { children: category }), _jsx("div", { className: "games", children: games
                        .filter((game) => game.category === category)
                        .map((game) => (_jsxs("div", { className: "game-card", children: [_jsx("h3", { children: game.name }), _jsx("button", { className: "play-button", onClick: () => handlePlay(game.id), children: "Play" })] }, game.id))) })] }, category)))) }));
};
export default GameList;
