import { useDispatch, useSelector } from "react-redux"
import { Balancereg3 } from '../../Redux/slots3statehandlerSlice'
import { Balancereg4 } from '../../Redux/slots4statehandlerSlice'
import "./Button.css"

export default function Button(props) {
    const dispatch = useDispatch()
    
    if (props.sl == "3") {
        
        let balreg3 = useSelector((state)=>state.slots3statehandlerSlice[3])
        return(
            <button className="buttonspin" onClick={()=>{dispatch(Balancereg3(++balreg3))}}>{props.name}</button>
        )
    }
    if (props.sl == "4") {
        
        let balreg4 = useSelector((state)=>state.slots4statehandlerSlice[4])
        return(
            <button className="buttonspin" onClick={()=>{dispatch(Balancereg4(balreg4+1))}}>{props.name}</button>
        )
    }
            

}