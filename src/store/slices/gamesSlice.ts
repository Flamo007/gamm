import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Game {
  id: string;
  name: string;
  isFavorite: boolean;
}

const initialState: Game[] = [];

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<Game>) => {
      state.push(action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const game = state.find((g) => g.id === action.payload);
      if (game) {
        game.isFavorite = !game.isFavorite;
      }
    },
  },
});

export const { addGame, toggleFavorite } = gamesSlice.actions;
export default gamesSlice.reducer;