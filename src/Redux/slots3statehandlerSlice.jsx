import { createSlice } from "@reduxjs/toolkit";

export const slots3statehandlerSlice = createSlice({
    name: 'slots3statehandler',
    initialState: [
        1, //Slot1 value
        1, //Slot1 value
        1, //Slot1 value
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
        Balancereg3: (state,action)=>{
            state[3]=action.payload
        }

    }
})

export const { Setslot1, Setslot2, Setslot3,Balancereg3 } = slots3statehandlerSlice.actions;
export default slots3statehandlerSlice.reducer;