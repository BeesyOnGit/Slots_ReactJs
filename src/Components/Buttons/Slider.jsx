import './Slider.css'
import { Setdarkmode } from "../../Redux/userinformations"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import axios from 'axios';
import { stdEditRequest } from '../../Server/requests';

export default function Slider (props) {
    const token = window.localStorage.user_token
    const Darkmode=useSelector((state)=>state.userinformationsSlice[2])
    const dispatch = useDispatch()

    function classselectslide() {
        if (Darkmode == true) {
            return("Slider active")
        }
        else{
            return("Slider")
        }
    }
    function iconslide() {
        if (Darkmode == true) {
            return("fa fa-moon-o")
        }
        else{
            return("fa fa-sun-o")
        }
    }
    function classselectcont() {
        if (Darkmode == true) {
            return("overlay active")
        }
        else{
            return("overlay")
        }
    }

    async function edit(Darkmode) {
        if (token) {
            const data={
                Darkmode : !Darkmode
            }
            const res = await stdEditRequest('Darkmode',token,data)
            if (res) {
                const {Darkmode}=res
                dispatch(Setdarkmode(Darkmode))
            }
        }
        else{
            dispatch(Setdarkmode(!Darkmode))
        }

    }

    if (props.mode =="dark") {
        
        return(
            <div className='slidercontainer'>
                <div className="sliderbody"><div className={classselectcont()}></div></div>
                <div className={classselectslide()} onClick={()=>{edit(Darkmode)}}><div className={iconslide()}></div></div>
            </div>
        )
    }
    else{
        return(
            <div className='slidercontainer'>
                <div className="sliderbody"><span className={classselectcont()}></span></div>
                <div className={classselectslide()} onClick={()=>{}}></div>
            </div>
        )
    }
    
}