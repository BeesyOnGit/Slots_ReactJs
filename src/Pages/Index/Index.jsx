import Gamesdisplay from '../../Components/Index/Gamesdisplay'
import Modal from '../../Components/Index/Modal/Modal'
import Presentation from '../../Components/Index/Presentation'
import { useEffect } from "react";
import * as React from 'react'

function Index(props) {
  const darkmode=window.localStorage.user_darkmode
  React.useEffect(() => {

  }, [darkmode])
  
    return (
      <div className="Index">
        <Presentation/>
        <Gamesdisplay src='/3slotsmachinenewpres.png' machinename="3 Slot" link="/3slots"/>
        <Gamesdisplay src='/4slotsmachinenewpres.png' machinename="4 Slot" link="/4slots"/>
      </div>
    )
  }
  
  export default Index