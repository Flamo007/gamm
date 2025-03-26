import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
  balance: number;
  level: number;
}

export const initialState: PlayerState = {
  balance: 1000,
  level: 10,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    levelUp: (state) => {
      state.level += 1;
    },
  },
});

export const { updateBalance, setBalance, levelUp } = playerSlice.actions;
export default playerSlice.reducer;