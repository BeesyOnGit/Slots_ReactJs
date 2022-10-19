import { useState } from 'react'
import './FormInpute.css'

export default function FormInpute(props) {
    const [focused, Setfocused]=useState('false')
    const {onChange,value, placeholder,error, ...Rest } = props
    const {name}=props
    return(
        <div className='divgeneral'>
            <div className='divinput'>
                <input className='inputeform' {...Rest} placeholder="." onChange={name == "confirmpass"?null:onChange} focused={focused} onClick={name == "confirmpass"?()=>Setfocused("true"):null} value={value} onBlur={()=>Setfocused("true")} ></input>
                <div>{placeholder}</div>
                <label>{placeholder}</label>
                {error?<span className='errorsdispinput'>{error}</span>:null}
            </div>
        </div>
    )
}