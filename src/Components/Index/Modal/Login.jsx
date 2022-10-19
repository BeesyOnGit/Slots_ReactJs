import "./Logreg.css"
import {useRef, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Setlogin, Setadmin,SetPP} from '../../../Redux/userinformations'
import {Identification} from '../../../Server/requests.js'
import{SetIdModal} from '../../../Redux/interactionsSlice'
import FormInpute from "../../Inputes/FormInpute"

function Login(props) {
    const [notif2, setNotif2] = useState(0)
    const [message2, setMessage2] = useState("")
    const [loginrequest,setLoginrequest]=useState({
        uname:"",
        pass:""
    })
    const modal = useSelector((state)=>state.interactionsSlice[1])
    
    const id = useRef("")
    const pass = useRef("")
    const dispatch = useDispatch()

    const reqbody=[
        {
            name: 'uname',
            placeholder : "Email or username",
            type:"text",
            required :true,
            error:"Must not be empty"

        },
        {
            name: 'pass',
            placeholder : "Password",
            type:"password",
            required: true,
            error:"Must not be empty"

        },
    ]

    const onChange= (e)=>{
        setLoginrequest({...loginrequest,[e.target.name]: e.target.value})

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await Identification('login', loginrequest)    
            if (res) {
                if (res.status == "successregular") {
                    setNotif2(0)
                    setNotif2(2)
                    setMessage2(res.message)
                    dispatch(Setlogin(res.token))
                    if (res.PP) {
                        if (res.PP =='') {
                            
                        }
                        else{
                            window.sessionStorage.setItem('ProfilePic',res.PP)
                            dispatch(SetPP(true))
                        }
                    }
                    setTimeout(() => {
                        dispatch(SetIdModal(!modal))

                    }, 500);
                    setTimeout(() => {
                        location.reload()
                    }, 700);

                }
                if (res.status == "successadmin") {
                    setNotif2(0)
                    setNotif2(2)
                    setMessage2(res.message)
                    dispatch(Setlogin(res.token))
                    dispatch(Setadmin(true))
                    dispatch(SetIdModal(!modal))
                }
                if (res.status == "error403") {
                    setNotif2(0)
                    setNotif2(1)
                    setMessage2(res.message)
                    
                }
                if (res.status == "error404") {
                    setNotif2(0)
                    setNotif2(1)
                    setMessage2(res.message)
                }
            }
        } 
        catch (error) {

        }
    }
    
/*     async function submite(){
        const refid = id.current
        const refpass = pass.current
        const user = {
            uname: refid.value,
            pass: refpass.value
        }
        if (refid.uname.value ==""|| refid.pass.value == "") {
            setNotif2(0)
            setNotif2(1)
            setMessage2("The fields above MUST NOT BE EMPTY") 
            refid.style.border = "solid #ea3546 2px"
            refpass.style.border = "solid #ea3546 2px"
            
        }
        else{
            try {
                const res= await Identification('login', user)
                console.log(res.status);
                if (res.status == "successregular") {
                    setNotif2(0)
                    setNotif2(2)
                    setMessage2(res.message)
                    refid.style.border = "solid #09bc8a 2px"
                    refpass.style.border = "solid #09bc8a 2px"
                    dispatch(Setlogin(res.token))
                    dispatch(SetIdModal(!modal))
                    if (res.PP) {
                        if (res.PP =='') {
                            
                        }
                        else{
                            window.sessionStorage.setItem('ProfilePic',res.PP)
                            dispatch(SetPP(true))
                        }
                    }
                }
                if (res.status == "successadmin") {
                    setNotif2(0)
                    setNotif2(2)
                    setMessage2(res.message)
                    refid.style.border = "solid #09bc8a 2px"
                    refpass.style.border = "solid #09bc8a 2px"
                    dispatch(Setlogin(res.token))
                    dispatch(Setadmin(true))
                    dispatch(SetIdModal(!modal))
                }
                if (res.status == "error403") {
                    setNotif2(0)
                    setNotif2(1)
                    setMessage2(res.message)
                    refpass.style.border = "solid #bc4749 2px"
                    
                }
                if (res.status == "error404") {
                    setNotif2(0)
                    setNotif2(1)
                    setMessage2(res.message)
                    refid.style.border = "solid #bc4749 2px"
                    refpass.style.border = "solid #bc4749 2px"
                }
            } 
            catch (err) {

            }
    
        }
    
    } */

    return(
        <form onSubmit={handleSubmit} className="accespoint" id="login" >
            <div className="inputeslogin">
            {
                        reqbody.map((req,index)=>{
                            return(
                                <FormInpute key={index} {...req} onChange={onChange} value={req[req.name]}/>
                            )
                        })
                    }

            </div>
{/*             <input className="inp" type="text" ref={id} required placeholder="Email or Username" />
            <input className="inp" type="password" ref={pass} required placeholder="Password"  /> */}
             <h4 className=
                {notif2 == 0 ? "displaynone"
                : 
                notif2 == 1 ? "avertissement"
                : 
                notif2 == 2? "succes"
                :""}
                >
                {notif2 == 0 ? message2
                :
                notif2 == 1 || 2 ? message2
                :""}</h4>
            <input type='submit' className="inpsub" value="Login"/>
            {/* <button className="inpsub" onClick={()=>{submite}}>Login</button> */}
        </form>
    )

}

export default Login