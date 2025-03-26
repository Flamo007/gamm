import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBalance } from '../../store/slices/playerSlice';
import './DailyBonus.css';
const DailyBonus = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleClaimBonus = () => {
        setIsLoading(true);
        fetch('/api/player/daily-bonus', {
            method: 'POST',
        })
            .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to claim daily bonus.');
            }
            return res.json();
        })
            .then((data) => {
            if (data.bonus) {
                dispatch(updateBalance(data.bonus));
                setMessage(`You received $${data.bonus} as a daily bonus!`);
            }
            else {
                setMessage(data.message);
            }
        })
            .catch((err) => {
            console.error('Error claiming daily bonus:', err);
            setMessage('An error occurred while claiming your daily bonus. Please try again later.');
        })
            .finally(() => {
            setIsLoading(false);
        });
    };
    return (_jsxs("div", { className: "daily-bonus", children: [_jsx("button", { onClick: handleClaimBonus, className: "daily-bonus-button", disabled: isLoading, children: isLoading ? 'Claiming...' : 'Claim Daily Bonus' }), message && _jsx("p", { children: message })] }));
};
export default DailyBonus;
