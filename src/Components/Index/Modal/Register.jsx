import { useState, useRef } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import {Identification} from '../../../Server/requests.js'
import FormInpute from "../../Inputes/FormInpute.jsx"
import "./Logreg.css"


function Register(props) {
    const [notif, setNotif] = useState(0)
    const [message, setMessage] = useState("")
    const [regreq,setRegreq]= useState({
        uname:"",
        mail:"",
        pass:""
    })

/*     async function handleSubmit(e) {
        e.preventDefault()
        const username = e.target.username
        const email = e.target.email    
        const password = e.target.password    
        
        try {
            if (username.value == "" || email.value == "" || password.value == "" ) {
                setNotif(0)
                setNotif(1)
                username.style.border = "solid #ea3546 2px"
                email.style.border = "solid #ea3546 2px"
                password.style.border = "solid #ea3546 2px"
            }
            else{
                const res = await axios.post('/Signin', {
                    username : username.value,
                    email : email.value,
                    password : password.value
                })
                if (res.status == 200) {
                    setNotif(0)
                    setNotif(2)
                    username.style.border = "solid #09bc8a 2px"
                    email.style.border = "solid #09bc8a 2px"
                    password.style.border = "solid #09bc8a 2px"
    
                }
    
            }
        } 
        catch (err) {
            if (err.response.status == 403 && err.response.data == 'Username Already exists') {
                message.className = ""
                message.classList.toggle('avertissement')
                message.innerText = err.response.data
                username.style.border = "solid #bc4749 2px"
                
            }
            if (err.response.status == 403 && err.response.data == 'E-mail Already exists') {
                message.className = ""
                message.classList.toggle('avertissement')
                message.innerText = err.response.data
                email.style.border = "solid #bc4749 2px"
                
            }
        }
        
        
    } */
    
/*     const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const new_user = {
            uname: data.get('username'),
            mail: data.get('email'),
            pass: data.get('password')

        }
        if (new_user.uname =="" || new_user.mail == "" || new_user.pass == "") {
            setNotif(0)
            setNotif(1)
            setMessage("The fields above MUST NOT BE EMPTY") 
            event.currentTarget.username.style.border = "solid #ea3546 2px"
            event.currentTarget.email.style.border = "solid #ea3546 2px"
            event.currentTarget.password.style.border = "solid #ea3546 2px"
            
        }
        else{
            try {
                const res= await Identification('register', new_user)
                if (res.status == "success") {
                    setNotif(0)
                    setNotif(2)
                    setMessage(res.message)
                    console.log(event.target.username);
                    event.target.username.style.border = "solid #09bc8a 2px"
                    event.target.email.style.border = "solid #09bc8a 2px"
                    event.target.password.style.border = "solid #09bc8a 2px"

        
                }
                if (res.status == "failedcode1") {
                    setNotif(0)
                    setNotif(1)
                    setMessage(res.message)
                    event.target.username.style.border = "solid #bc4749 2px"
                    
                }
                if (res.status == "failedcode2") {
                    setNotif(0)
                    setNotif(1)
                    setMessage(res.message)
                    event.target.username.style.border = "solid #bc4749 2px"
                    
                }
                
            } catch (err) {
                console.error(err);
            }

                



        }
    
    } */

    const registerreq=[
        {
            name: 'mail',
            placeholder : "E-mail",
            type:"email",
            required :true,
            error:"Enter a valide E-mail adress"

        },
        {
            name: 'uname',
            placeholder : "Username",
            type:"text",
            required :true,
            pattern:"^[a-zA-Z0-9]{4,}$",
            error:"Must not have special characters andbe more than 4 in length"

        },
        {
            name: 'pass',
            placeholder : "Password",
            type:"password",
            required: true,
            pattern : "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$",
            error:"Must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character "

        },
        {
            name: 'confirmpass',
            placeholder : " Confirm Password",
            type:"password",
            required: true,
            pattern : regreq.pass,
            error:"Doesn't match Password"

        },
    ]

    const onChange= (e)=>{
        setRegreq({...regreq,[e.target.name]: e.target.value})

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await Identification('register', regreq)    
            if (res) {
                if (res.status == "success") {
                    setNotif(0)
                    setNotif(2)
                    setMessage(res.message)

                }

                if (res.status == "failedcode1") {
                    setNotif(0)
                    setNotif(1)
                    setMessage(res.message)
                    
                }
                if (res.status == "failedcode2") {
                    setNotif(0)
                    setNotif(1)
                    setMessage(res.message)
                    
                }
            }
        } 
        catch (error) {

        }
    }
    return(
        <div className="accespoint" id ="signin" >
            <form className="form" onSubmit={handleSubmit}>
            <div className="inputeslogin">
            {
                        registerreq.map((req,index)=>{
                            return(
                                <FormInpute key={index} {...req} onChange={onChange} value={req[req.name]}/>
                            )
                        })
                    }

            </div>
{/*                 <input className="inp"  type="text"  placeholder="Username" name="username" />
                <input className="inp"  type="email"  placeholder="Email" name="email"/>
                <input className="inp"  type="password"  placeholder="Password" name="password"/> */}
                <h4 className=
                {notif == 0 ? "displaynone"
                : 
                notif == 1 ? "avertissement"
                : 
                notif == 2? "succes"
                :""}
                >
                {notif == 0 ? message
                :
                notif == 1 || 2 ? message
                :""}</h4>
                <input type="submit" className="inpsub" value="Register" />

            </form>
        </div>
    )
    
}


export default Register