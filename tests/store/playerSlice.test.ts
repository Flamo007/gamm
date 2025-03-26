import playerReducer, { levelUp } from '../../src/store/slices/playerSlice';

describe('playerSlice', () => {
  it('should level up the player', () => {
    const initialState = {
      level: 10,
      balance: 1000, // Lägg till alla obligatoriska egenskaper i PlayerState
    };

    const nextState = playerReducer(initialState, levelUp());
    expect(nextState.level).toBe(11);
  });
});