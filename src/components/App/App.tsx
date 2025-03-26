import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Homepage from '../Homepage/Homepage';
import GamePage from '../GamePage/GamePage';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
      </Routes>
    </>
  );
};

export default App;

