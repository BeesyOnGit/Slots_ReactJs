import { createSlice } from "@reduxjs/toolkit";

export const betSlice = createSlice({
    name: 'bet',
    initialState: [
        1, // Leverage
        1, // Bet
    ],
    reducers: {
        Setleverage: (state, action) => {
            state[0] = action.payload
        },
        Setbet: (state,action)=>{
            state[1]=action.payload
        },

    }
})

export const { Setleverage,Setbet } = betSlice.actions;
export default betSlice.reducer;