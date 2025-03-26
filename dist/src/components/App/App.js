import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Homepage from '../Homepage/Homepage';
import GamePage from '../GamePage/GamePage';
import './App.css';
const App = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Homepage, {}) }), _jsx(Route, { path: "/games/:gameId", element: _jsx(GamePage, {}) })] })] }));
};
export default App;
