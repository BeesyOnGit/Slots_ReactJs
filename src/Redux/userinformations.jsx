import { createSlice } from "@reduxjs/toolkit";

export const userinformationsSlice = createSlice({
    name: 'userinformations',
    initialState: [
        "Guest",//sername
        0,      //Balance
        false,  //UserDarkMode
        false,  //UserAdminStatus
        null,   //LoginStatus
        false    //Userprofilepicture
    ],
    reducers: {
        Setusername: (state, action) => {
            state[0] = action.payload
        },
        Setbalance: (state, action) => {
            state[1] = action.payload
        },
        Setdarkmode: (state, action) => {
            state[2] = action.payload
            window.localStorage.setItem('user_darkmode', action.payload)
        },
        SetPP: (state, action) => {
            state[5] = action.payload
        },
        Setadmin: (state, action) => {
            state[3] = action.payload
        },
        Setlogin: (state, action) => {
            window.localStorage.setItem('user_token', action.payload)
            state[4] = action.payload
        },
        Setlogout : (state, action) =>{
            window.localStorage.removeItem('user_token');
            window.sessionStorage.removeItem('ProfilePic');
            state[4] = null
            state[5] = false
        }
    }
})

export const { Setusername,Setbalance,Setadmin,Setdarkmode,Setlogin,Setlogout,SetPP } = userinformationsSlice.actions;
export default userinformationsSlice.reducer;