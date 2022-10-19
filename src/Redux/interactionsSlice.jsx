import { createSlice } from "@reduxjs/toolkit";

export const interactionsSlice = createSlice({
    name: 'interactions',
    initialState: [
        false, // Profil options
        false, // Identification Modal
    ],
    reducers: {
        SetProfileOp: (state, action) => {
            state[0] = action.payload
        },
        SetIdModal: (state,action)=>{
            state[1]=action.payload
        },

    }
})

export const { SetProfileOp,SetIdModal } = interactionsSlice.actions;
export default interactionsSlice.reducer;