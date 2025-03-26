import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GamePage from '../../src/components/GamePage/GamePage'; // Importera GamePage
import playerReducer from '../../src/store/slices/playerSlice'; // Importera playerSlice

// Skapa en mock Redux store
const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

describe('GamePage Component', () => {
  test('renders GamePage component and SlotMachine', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/game/123']}>
          <Routes>
            <Route path="/game/:gameId" element={<GamePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Kontrollera att GamePage och SlotMachine renderas korrekt
    expect(screen.getByText(/Game 123/)).toBeInTheDocument(); // Verifiera att GamePage renderas med rätt gameId
    expect(screen.getByText(/Slot Machine/i)).toBeInTheDocument(); // Kontrollera att SlotMachine-komponenten visas
  });

  test('navigates back to homepage when "Back to Homepage" is clicked', async () => {
    const navigate = jest.fn(); // Mocka navigate-funktionen
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/game/123']}>
          <Routes>
            <Route path="/game/:gameId" element={<GamePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Hitta knappen och simulera ett klick
    const backButton = screen.getByText(/Back to Homepage/i);
    fireEvent.click(backButton);

    // Kontrollera att navigate anropas (i.e. att vi navigerar tillbaka till startsidan)
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });

  test('redirects to homepage if gameId is missing in the URL', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/game/']}>
          <Routes>
            <Route path="/game/:gameId" element={<GamePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Vänta på att navigeringen ska hända (eller bara kolla om vi inte renderar GamePage)
    await waitFor(() => {
      expect(screen.queryByText(/Game/)).not.toBeInTheDocument();
      expect(screen.getByText(/Back to Homepage/i)).toBeInTheDocument();
    });
  });
});
