/* import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'Profile',
    initialState: {
        adress: { 
            country: '',
            city: '', 
            postalcode: '', 
            street: '' 
        },
        firstname: '',
        lastname: '',
        birthdate: '',
        Phone: '',
        Profil_picture:''
    },
    reducers: {
        Setfirstname: (state, action) => {
            state.firstname = action.payload
        },
        Setlastname: (state, action) => {
            state.lastname = action.payload
        },
        Setbirthdate: (state, action) => {
            state.birthdate = action.payload
        },
        SetPhone: (state, action) => {
            state.Phone = action.payload
        },
        SetProfilePicture: (state, action) => {
            state.Profil_picture = action.payload
        },
        Setcountry : (state,action)=>{
            state.adress.country = action.payload
        },
        Setcity : (state,action)=>{
            state.adress.city = action.payload
        },
        Setpostalcode : (state,action)=>{
            state.adress.postalcode = action.payload
        },
        Setstreet : (state,action)=>{
            state.adress.street = action.payload
        }


    }
})

export const { SetPhone,SetProfilePicture,Setbirthdate,Setcity,Setcountry,Setfirstname,Setlastname,Setpostalcode,Setstreet } = profileSlice.actions;
export default profileSlice.reducer; */