import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './PictureUploader.css'

export default function PictureUploader(props) {
    const [src, Setsrc] = useState("/Sans titre - 1.png")
    const [overlay, Setoverlay] = useState(false)
    let inppic= useRef(null)
    let trigger
    let picres =null
    const {Setprofile,profile}=props
    const PP = useSelector((state)=>{state.userinformationsSlice[5]})
    React.useEffect(()=>{
        if (window.sessionStorage.ProfilePic) { 
            Setsrc(window.sessionStorage.ProfilePic)
        }
        console.log("PPchange Picupload",PP);
    },[PP])

    async function encode() {
        const{files} = inppic.current
        trigger = inppic.current
        const file = files[0]

        const reader = new FileReader()
        reader.addEventListener("load", ()=>{
          Setsrc(reader.result)
          Setprofile({...profile,["Profil_picture"]: reader.result})
        })
        reader.readAsDataURL(file)
    }
    function trigg() {
        inppic.current.click()
      }

    const imgbg="/Sans titre - 1.png"

      if (props.type == 'button') {
          
        return(
            <>
                <button onClick={()=>trigg()} style={{"borderRadius":"15px"}}>Upload</button>
                <input type="file" style={{"display": "none"}} ref={inppic} onChange={()=>encode()}/>
            </>
        )

      }
      else if (props.type == 'img') {
          
        return(
            <div className='uploaddiv'onMouseEnter={()=>Setoverlay(!overlay)} onMouseLeave={()=>Setoverlay(!overlay)}>
                {
                    overlay == true? <div className='overlayprofilepic'>Click to change profile Picture</div>
                    :
                    null
                }
                <img  className="profilePic" src={src} onClick={()=>trigg()}/>
                
                <input type="file" style={{"display": "none"}} ref={inppic} onChange={()=>encode()}/>
            </div>
        )

      }

    
}