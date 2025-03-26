import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance, updateBalance } from '../../store/slices/playerSlice'; // Korrekt import
import './PlayerBalance.css';
const PlayerBalance = () => {
    const dispatch = useDispatch();
    const balance = useSelector((state) => state.player.balance);
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
    return (_jsxs("div", { className: "player-balance", children: [_jsx("h2", { children: "Your Balance" }), _jsxs("p", { children: ["$", balance] }), _jsx("button", { onClick: handleEarn, children: "Earn $100" }), _jsx("button", { onClick: handleSpend, children: "Spend $50" })] }));
};
export default PlayerBalance;
