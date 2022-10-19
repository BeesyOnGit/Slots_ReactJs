import "./Inputenum.css"
import { useSelector,useDispatch } from 'react-redux';
import { Setbet } from '../../Redux/betSlice';
import { useRef } from "react";

export default function Inputenum(props) {
    const dispatch = useDispatch()
    let Bet = useSelector((state)=>state.betSlice[1])
    const input = useRef(null)
    const balance = useSelector((state)=>state.userinformationsSlice)[1]
    if (Bet <= 0) {
        dispatch(Setbet(1))
    }

    function regulatebet(p) {
        if (p >= balance) {
            p= balance
        }
        else if (Bet <= 0) {
            p =1
            
        }
        dispatch(Setbet(p))

    }
    
    return(
        <div className="betsection">
            <div className="bet">
                <h3 className="bettitle">Bet:</h3>
                <input type="number" required  value={Bet} ref={input} onChange={()=>{regulatebet(input.current.value)}} />
                <img src="/Slots Coin.png" alt=""/>
                <div className="increment" onClick={()=>{regulatebet(Bet+1)}} ><span className="fa fa-plus"></span></div>
                <div className="increment" onClick={()=>{regulatebet(Bet-1)}} ><span className="fa fa-minus"></span></div>
            </div>
            <div className="shortbetsection">
                <div className="shortbet" onClick={()=>{regulatebet(10)}}>10</div>
                <div className="shortbet" onClick={()=>{regulatebet(20)}}>20</div>
                <div className="shortbet" onClick={()=>{regulatebet(50)}}>50</div>
                <div className="shortbet" onClick={()=>{regulatebet(100)}}>100</div>
                <div className="shortbet" onClick={()=>{regulatebet(500)}}>500</div>
            </div>
        </div>
    )
    
}