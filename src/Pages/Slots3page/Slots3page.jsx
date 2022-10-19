import "./Slots3page.css"
import Slotsmachine3 from '../../Components/Slotsmachine3/Slotsmachine3'
import Playsection from "../../Components/Games/Gamecomponents/Playsection/Playsection"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import * as React from 'react'
import { Balancereg3,Setslot1, Setslot2, Setslot3 } from '../../Redux/slots3statehandlerSlice'
import {slotsreq} from '../../Server/requests'
 
export default function Slots3page(props) {
    const dispatch = useDispatch()
    const balreg3 = useSelector((state)=>state.slots3statehandlerSlice[3])
    const token = window.localStorage.user_token
    const betinfo = useSelector((state)=>state.betSlice)
    React.useEffect( ()=>{
        if (balreg3 == 0) {
            null
        }
        if (balreg3 >0) {
            userBet()
        }

    },[balreg3])
    
    return(
        <div className="slots3page">
            <Slotsmachine3/>
            <Playsection sl="3" />
        </div>
    )
    async function userBet() {
        const bet = {
            bet: betinfo[1],
            multiplier: betinfo[0]
        }
        try {
            const res = await slotsreq('3',bet, token)
            if (res) {
                dispatch(Setslot1(res.data.numbers[0]))
                dispatch(Setslot2(res.data.numbers[1]))
                dispatch(Setslot3(res.data.numbers[2]))
                dispatch(Balancereg3(0))
            }

        } 
        catch (error) {
            
        }
    } 
    
}