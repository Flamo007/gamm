import gamesReducer, { addGame, toggleFavorite } from '../../src/store/slices/gamesSlice';

describe('gamesSlice', () => {
  const initialState = [
    { id: '1', name: 'Slot Machines', isFavorite: false },
    { id: '2', name: 'Card Games', isFavorite: false },
  ];

  it('should add a new game', () => {
    const newGame = { id: '3', name: 'Roulette', isFavorite: false };
    const nextState = gamesReducer(initialState, addGame(newGame));
    expect(nextState).toHaveLength(3);
    expect(nextState[2]).toEqual(newGame);
  });

  it('should toggle favorite status of a game', () => {
    const nextState = gamesReducer(initialState, toggleFavorite('1'));
    expect(nextState[0].isFavorite).toBe(true);
  });

  it('should not modify state if game ID is not found', () => {
    const nextState = gamesReducer(initialState, toggleFavorite('999'));
    expect(nextState).toEqual(initialState);
  });
});