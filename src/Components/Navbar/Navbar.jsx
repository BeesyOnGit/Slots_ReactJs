import "./Navbar.css"
import { Setusername,Setbalance,Setadmin,Setdarkmode,Setlogin, } from "../../Redux/userinformations"
import { SetProfileOp,SetIdModal } from '../../Redux/interactionsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {getinfo,stdEditRequest} from '../../Server/requests'
import { useEffect,useState } from "react";
import * as React from 'react'

function Navbar(props) {

    const userinfos=useSelector((state)=>state.userinformationsSlice)
    const profileop = useSelector((state)=>state.interactionsSlice[0])
    const modal = useSelector((state)=>state.interactionsSlice[1])
    const darkmode=window.localStorage.user_darkmode
    const balreg3 = useSelector((state)=>state.slots3statehandlerSlice[3])
    const balreg4 = useSelector((state)=>state.slots4statehandlerSlice[4])

    const token = window.localStorage.user_token
    const dispatch = useDispatch()
    const PP = userinfos[5]

    const [src, Setsrc] = useState("/Sans titre - 1.png")

    React.useEffect(() => {
        loginstatechange()
        if (darkmode == "true") {
            setTimeout(() => {
                document.documentElement.style.setProperty('--color1', '#ecebe4')
                document.documentElement.style.setProperty('--color2', '#daddd8')
                document.documentElement.style.setProperty('--buttoncolor', '#14213d')
                document.documentElement.style.setProperty('--backgrounfbody', '#14213d')
                document.documentElement.style.setProperty('--backgroundelements', '#051923')
                document.documentElement.style.setProperty('--linecolor', '#ecebe4')
                document.documentElement.style.setProperty('--colorboxchad', 'rgba(66,110,202,0.14)')
                document.documentElement.style.setProperty('--inputshadow' , 'rgba(77, 77, 77, 0.25) 0px 2px 5px -1px, rgba(255, 255, 255, 0.3) 0px 1px 3px -1px')
                
            }, 300);
        }
        else{
            setTimeout(() => {
                document.documentElement.style.setProperty('--color1', '#1c1c1c')
                document.documentElement.style.setProperty('--color2', '#333533')
                document.documentElement.style.setProperty('--buttoncolor', '#daddd8')
                document.documentElement.style.setProperty('--backgrounfbody', '#f0f2f5')
                document.documentElement.style.setProperty('--backgroundelements', '#fafaff')
                document.documentElement.style.setProperty('--linecolor', '#727272')
                document.documentElement.style.setProperty('--colorboxchad', 'rgba(28,28,28,0.14)')
                document.documentElement.style.setProperty('--inputshadow' , 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px')
                
            }, 300);
        }
        if (window.sessionStorage.ProfilePic) { 
            Setsrc(window.sessionStorage.ProfilePic)
        }else{Setsrc("/Sans titre - 1.png")}
    }, [balreg3, balreg4, token, darkmode,PP])

    

    async function loginstatechange(){
        try {
            
            if (window.localStorage.user_token) {
                dispatch(Setlogin(window.localStorage.user_token))
                const  infos = await getinfo(window.localStorage.user_token)
                dispatch(Setusername(infos.userinfo.username))
                dispatch(Setbalance(infos.userinfo.Balance))
                dispatch(Setadmin(infos.userinfo.Admin_status))
                dispatch(Setdarkmode(infos.userinfo.Darkmode))
            }
        } 
        catch (error) {
            
        }

    }

    function setprofileop(params) {
        if (token) {
            dispatch(SetProfileOp(!profileop))
        }
        else{
            null
        }
    }
/*     const user ={
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
    }
    function tst(params) {
        stdEditRequest(token,user)
    } */

    
    

    return(
        <nav className="navbar">

            <div className="logodiv" id="navlogo">
            <Link to="/"><img src={darkmode == "true"?"Logo Slots darkmode.svg":"/Logo Slots.svg"}/></Link>
            </div>

            <div className="user" id="userinfo">
                {
                    userinfos[4]== null ? 
                    <button className={modal==true?"identify modalon":"identify"} onClick={()=>{dispatch(SetIdModal(!modal))}}>Join</button>
                    :
                    null 
                }
                <h4 className="Username" onClick={()=>tst()}>{userinfos[0]} </h4>
                <p className="balancetxt">Balance:</p>
                <h4 className="balance">{userinfos[1]}<img className="coinimg" src="/Slots Coin.png" /></h4>
                <img src={src} className="Profilpic" onClick={()=>setprofileop()}/>
            </div>
        
        </nav>
    )

}

export default Navbar