import Slider from '../../Buttons/Slider'
import './Profileop.css'
import { Setdarkmode,Setlogout,Setadmin,Setbalance,Setusername,SetPP } from "../../../Redux/userinformations"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {SetProfileOp} from '../../../Redux/interactionsSlice'

function Profileop(props) {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const profileop = useSelector((state)=>state.interactionsSlice[0])

    function logout() {
        Navigate("/")
            
        dispatch(Setlogout())
        dispatch(Setbalance(0))
        dispatch(Setusername("Guest"))
        dispatch(Setadmin(false))
        dispatch(SetPP('anything'))

    }
    

    return(
        <div className={profileop == false?"profileop hidden": "profileop"} onMouseLeave={()=>{dispatch(SetProfileOp(false))}}>
            <h3 className="options" onClick={()=>Navigate("/profile")} >Profile</h3>
            <div className='options mode'>
                <p>Dark Mode</p>
                <Slider mode="dark"/>
            </div>
            <h3 className="options" id="logout" onClick={logout}>Logout</h3>
        </div>
    )
    
}
export default Profileop