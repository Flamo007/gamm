import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Homepage from '../src/components/Homepage/Homepage';
import playerReducer from '../src/store/slices/playerSlice';
import { MemoryRouter } from 'react-router-dom';
// Create a mock Redux store
const store = configureStore({
    reducer: {
        player: playerReducer,
    },
});
test('renders homepage with all sections', () => {
    render(_jsx(MemoryRouter, { children: _jsx(Provider, { store: store, children: _jsx(Homepage, {}) }) }));
    // Assertions
    expect(screen.getByText(/Game Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Player Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Rewards & News/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
});
describe('playerSlice', () => {
    it('should level up the player', () => {
        const initialState = { level: 10, balance: 1000 }; // Mock initial state
        const nextState = playerReducer(initialState, { type: 'player/levelUp' });
        expect(nextState.level).toBe(11);
    });
});
