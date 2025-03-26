import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './Leaderboards.css';
const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        fetch('/api/leaderboard')
            .then((res) => res.json())
            .then((data) => setPlayers(data));
    }, []);
    return (_jsxs("div", { className: "leaderboards", children: [_jsx("h2", { children: "Leaderboard" }), _jsx("ul", { children: players.map((player) => (_jsxs("li", { children: [player.name, ": $", player.balance] }, player.id))) })] }));
};
export default Leaderboard;
