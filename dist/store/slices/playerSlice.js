import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
    balance: 1000,
    level: 10,
};
const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        updateBalance: (state, action) => {
            state.balance += action.payload;
        },
        setBalance: (state, action) => {
            state.balance = action.payload;
        },
        levelUp: (state) => {
            state.level += 1;
        },
    },
});
export const { updateBalance, setBalance, levelUp } = playerSlice.actions;
export default playerSlice.reducer;
