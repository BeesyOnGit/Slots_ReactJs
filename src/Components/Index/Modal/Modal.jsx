import { useState } from "react"
import "./Modal.css"
import Register from './Register'
import Login from './Login'
import { useDispatch, useSelector } from "react-redux"
import{SetIdModal} from '../../../Redux/interactionsSlice'


function Modal(props) {
    let [choice, setChoice] = useState(0)
     const modal = useSelector((state)=>state.interactionsSlice[1])
     const dispatch = useDispatch()

    return(
    <div className={modal == false ?"Modal hidden":"Modal"}>        
            <div className={modal == false ?"overlaymodal hidden":"overlaymodal"} onClick={()=>{dispatch(SetIdModal(!modal))}} ></div>
            <div className= {modal ==false ?"divmodal hidden":"divmodal"}>
                <div className="divchoice">
                    <h2 className={`titlemodal ${choice == 1 ? 'active': ""}`} id="logintitle" onClick={()=>{setChoice(choice = 1 )}} >Login</h2>
                    <h2 className={`titlemodal ${choice == 0 ? 'active': ""}`}  id="signintitle" onClick={()=>{setChoice(choice = 0)}} >Register</h2>
                </div>
                <div className="divacces" >
                    {
                        choice == 0 ?
                        <Register />
                        :
                        <Login/>
                    }
                </div>

            </div>

    </div>
    )
}

export default Modal