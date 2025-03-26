import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBalance } from '../../store/slices/playerSlice';
import './Login.css';
const Login = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const handleLogin = () => {
        if (!name.trim()) {
            setError('Name cannot be empty.');
            return;
        }
        fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        })
            .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to login. Please try again.');
            }
            return res.json();
        })
            .then((data) => {
            console.log('Login successful:', data); // Logga svaret från backend
            setMessage(data.message);
            dispatch(setBalance(data.balance));
            setError(''); // Rensa eventuella tidigare fel
        })
            .catch((err) => {
            console.error('Login error:', err); // Logga eventuella fel
            setError(err.message);
        });
    };
    return (_jsxs("div", { className: "login-container", children: [_jsx("h2", { children: "Login" }), _jsx("input", { type: "text", placeholder: "Enter your name", value: name, onChange: (e) => setName(e.target.value), className: "login-input" }), _jsx("button", { onClick: handleLogin, className: "login-button", children: "Login" }), message && _jsx("p", { className: "login-message", children: message }), error && _jsx("p", { className: "login-error", children: error })] }));
};
export default Login;
