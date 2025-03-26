import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SlotMachine from '../../src/components/SlotMachine/SlotMachine';
import playerReducer from '../../src/store/slices/playerSlice';
import { MemoryRouter } from 'react-router-dom';

// Create a mock Redux store
const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

describe('SlotMachine component', () => {
  it('renders SlotMachine component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SlotMachine />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Slot Machine/i)).toBeInTheDocument();
  });
});

export default SlotMachine;
