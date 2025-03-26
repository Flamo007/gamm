import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SlotMachine from '../SlotMachine/SlotMachine';
import './GamePage.css';
const GamePage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!gameId) {
            alert('Invalid game ID. Redirecting to homepage.');
            navigate('/');
        }
    }, [gameId, navigate]);
    const handleBack = () => {
        navigate('/');
    };
    return (_jsxs("div", { className: "game-page", children: [_jsxs("h1", { children: ["Game ", gameId] }), _jsx(SlotMachine, {}), _jsx("button", { className: "back-button", onClick: handleBack, children: "Back to Homepage" })] }));
};
export default GamePage;
