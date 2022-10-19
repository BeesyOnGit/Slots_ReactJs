import { createSlice } from "@reduxjs/toolkit";

export const slots4statehandlerSlice = createSlice({
    name: 'slots4statehandler',
    initialState: [
        1,
        1,
        1,
        1,
        0. //Balance regulation state
    ],
    reducers: {
        Setslot1: (state, action) => {
            state[0] = action.payload
        },
        Setslot2: (state, action) => {
            state[1] = action.payload
        },
        Setslot3: (state, action) => {
            state[2] = action.payload
        },
        Setslot4: (state, action) => {
            state[3] = action.payload
        },
        Balancereg4: (state,action)=>{
            state[4]=action.payload
        }

    }
})

export const { Setslot1, Setslot2, Setslot3, Setslot4,Balancereg4 } = slots4statehandlerSlice.actions;
export default slots4statehandlerSlice.reducer;