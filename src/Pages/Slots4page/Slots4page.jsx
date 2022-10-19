import "./Slots4page.css"
import Slotsmachine4 from '../../Components/Slotsmachine4/Slotsmachine4'
import Playsection from "../../Components/Games/Gamecomponents/Playsection/Playsection"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import * as React from 'react'
import { Balancereg4,Setslot1, Setslot2, Setslot3,Setslot4 } from '../../Redux/slots4statehandlerSlice'
import {slotsreq} from '../../Server/requests'

export default function Slots4page(props) {
    const dispatch = useDispatch()
    const balreg4 = useSelector((state)=>state.slots4statehandlerSlice[4])
    const token = window.localStorage.user_token
    const betinfo = useSelector((state)=>state.betSlice)
    
        React.useEffect( ()=>{
            if (balreg4 == 0) {
                null
            }
            if(balreg4 > 0) {
                userBet()
            }
        },[balreg4])
        

    return(
        <div className="slots4page">
            <Slotsmachine4/>
            <Playsection sl="4"/>
        </div>
    )
    
    
    async function userBet() {
        const bet = {
            bet: betinfo[1],
            multiplier: betinfo[0]
        }
        try {
            const res = await slotsreq('4',bet, token)
            if (res) {
                dispatch(Setslot1(res.data.numbers[0]))
                dispatch(Setslot2(res.data.numbers[1]))
                dispatch(Setslot3(res.data.numbers[2]))
                dispatch(Setslot4(res.data.numbers[3]))
                dispatch(Balancereg4(0))
            }

        } 
        catch (error) {
            console.log(error);
        }
    } 
}