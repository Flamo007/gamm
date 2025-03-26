import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../src/store/store';
import Homepage from '../../src/components/Homepage/Homepage';

describe('Homepage Component', () => {
  const renderWithProviders = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders homepage title', () => {
    renderWithProviders();
    const titleElement = screen.getByText(/Welcome to the homepage🎰/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders featured games section', () => {
    renderWithProviders();
    const sectionTitle = screen.getByText(/Featured Games/i);
    expect(sectionTitle).toBeInTheDocument();
  });

  test('renders game options', () => {
    renderWithProviders();
    const slotMachine = screen.getByText(/Slot Machine/i);
    const roulette = screen.getByText(/Roulette/i);
    const blackjack = screen.getByText(/Blackjack/i);
    
    expect(slotMachine).toBeInTheDocument();
    expect(roulette).toBeInTheDocument();
    expect(blackjack).toBeInTheDocument();
  });
});
