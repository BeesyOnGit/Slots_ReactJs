import React, { useState } from 'react'
import './App.css'
import Gamesdisplay from './Components/Index/Gamesdisplay'
import Index from '../src/Pages/Index/Index'
import Modal from './Components/Index/Modal/Modal'
import Presentation from './Components/Index/Presentation'
import Profileop from './Components/Index/Profileop/Profileop'
import Navbar from './Components/Navbar/Navbar'
import Slots3page from './Pages/Slots3page/Slots3page'
import Slots4page from './Pages/Slots4page/Slots4page'
import Testerpage from './Testerpage'
import {Routes, Route,} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import AuthVerification from './Routes/AuthVerification'
import { useSelector } from 'react-redux'
import UserProfile from './Pages/UserProfile/UserProfile'

function App() {
  //const [modal, setModal] = useState(false)
  //const [profileop, setProfileop] = useState(false)
  let user_loggedin = window.localStorage.user_token
  const login = useSelector((state)=>state.userinformationsSlice[4])

  React.useEffect(()=>{
    user_loggedin=window.localStorage.user_token
},[login])
  const stylem = {
    /* display : "flex",
    flexDirection: "row",
    justifyContent: "center",
    allingItems: "center", */
    width :"90%",
    margin: "auto"
  }
  const stylebody={
    width :"95%",
    margin: "auto"
  }

  return (
    <>
      <Profileop/>
      <Modal/>
      <Navbar  /* setProfileop={setProfileop} profileop={profileop} *//>
      <div style={stylebody}>
        <Routes>
            <Route path ='/' element={
                <Index />
            }/>
            <Route path ='/3slots' element={
              <AuthVerification user ={user_loggedin} link ="/">
                <Slots3page/>
              </AuthVerification>
            }/>
            <Route path ='/4slots' element={
              <AuthVerification user = {user_loggedin} link = "/">
                <Slots4page/>
              </AuthVerification>
            }/>
            <Route path ='/profile' element={
              <AuthVerification user = {user_loggedin} link = "/">
                <UserProfile/>
              </AuthVerification>
            }/>

        </Routes> 
      </div>


    </>
  )
}

export default App
