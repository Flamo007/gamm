import { createSlice } from '@reduxjs/toolkit';
const initialState = [];
const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        addGame: (state, action) => {
            state.push(action.payload);
        },
        toggleFavorite: (state, action) => {
            const game = state.find((g) => g.id === action.payload);
            if (game) {
                game.isFavorite = !game.isFavorite;
            }
        },
    },
});
export const { addGame, toggleFavorite } = gamesSlice.actions;
export default gamesSlice.reducer;
