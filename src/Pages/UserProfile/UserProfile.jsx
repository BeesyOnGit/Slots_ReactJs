import { useState, useEffect } from "react";
import * as React from 'react'
import FormInpute from "../../Components/Inputes/FormInpute";
import {getuserinfo,stats,stdEditRequest} from '../../Server/requests'
import "./UserProfile.css";
import PictureUploader from "../../Components/Inputes/PictureUploader";
import { useDispatch } from "react-redux";
import {SetPP} from '../../Redux/userinformations'


export default function UserProfile() {
    const Usertoken = window.localStorage.user_token
    const dispatch = useDispatch()

    const [profile,Setprofile]=useState({
        adress: { 
            country: '',
            city: '', 
            postalcode: '', 
            street: '' 
        },
        email:'',
        password:'',
        firstname: '',
        lastname: '',
        birthdate: '',
        Phone: '',
        Profil_picture:''
    })

    const [profileStats,setProfileStats]=useState(
        {
            username: "",
            Balance: "",
            played_games: "0",
            won: "0",
            Totalwon: "0",
            lastfivegames: [],
        }
    )

    const [notifDisplay,setnotifDisplay]=useState('')
    
    React.useEffect(()=>{
        userinfoupdate()
    },[])

    const {adress}=profile
    const {Profil_picture:PP}=profile
    const {username,Balance,won, Totalwon,played_games:Pgames}=profileStats

    const userinfos =[
        {
            name: 'email',
            placeholder : "E-mail",
            type:"email",
            required :true,
            error:"Enter a valide E-mail adress"

        },
        {
            name: 'password',
            placeholder : "Password",
            type:"password",
            required: true,
/*             pattern : "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$", */
            error:"Must insert your password to update profile"

        },
        {
            name: 'firstname',
            placeholder : "First name",
            type:"texte",

        },
        {
            name: 'lastname',
            placeholder : "Last name",
            type:"texte",

        },
        {
            name: 'birthdate',
            placeholder : "Birthday",
            type:"date",

        },
        {
            name: 'Phone',
            placeholder : "Phone Number",
            type:"number",

        },
    ]

    const useradress=[
        {
            name: 'country',
            placeholder : "Country",
            type:"texte",
    
        },
        {
            name: 'city',
            placeholder : "City",
            type:"texte",
    
        },
        {
            name: 'postalcode',
            placeholder : "Postalcode",
            type:"text",
    
        },
        {
            name: 'street',
            placeholder : "Street",
            type:"texte",
    
        },
    ]

    const onChange= (e)=>{
        Setprofile({...profile,[e.target.name]: e.target.value})

    }

    const onChangeadress= (e)=>{
        Setprofile({...profile,["adress"]:{...adress,[e.target.name]: e.target.value}})

    }

    async function userinfoupdate(){
        try {
            if (Usertoken) {
                const  infosupdate = await getuserinfo(Usertoken)
                const  stat = await stats(Usertoken)
                setProfileStats(stat)
                Setprofile(infosupdate)
                
                
            }
        } 
        catch (error) {
            console.log(error);
        }
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setnotifDisplay('')
        try {
            const res = await stdEditRequest('std',Usertoken, profile)
            if (res){

                if (res.data.status == "Success") {
                    setnotifDisplay(res.data.message)
                    window.sessionStorage.removeItem('ProfilePic')
                    window.sessionStorage.setItem('ProfilePic',PP)
                    dispatch(SetPP('true'))
                    setTimeout(() => {
                        dispatch(SetPP('false'))
                    }, 1500);

                }
                else if (res.data.status == "WrongPassword") {
                    setnotifDisplay(res.data.message)
                }

            }
        }
        catch(err) {
            console.log(err)
        }
    };
    //console.log(PP);
    return(
        <>
            <div className="profileheader">
                <PictureUploader type='img' Setprofile={Setprofile} profile={profile}/>
                {/* <img className="profilePic" src={PP?"PP":"/Sans titre - 1.png"} Setprofile={Setprofile} profile={profile} /> */}
                <div className="statsdisp">
                    <div className="statssectionone">
                    <p className="singlestatsdisp">Balance: <span className="interiordisplay">{Balance}</span>  <img className="cointmini" src="./Slots Coin.png" /> </p>
                    <p className="singlestatsdisp">Played Games: <span className="interiordisplay">{Pgames}</span></p>
                    </div>
                    <h3 className="usernamedisplaystat">{username}</h3>
                    <div className="statssectionone">
                    <p className="singlestatsdisp">Won games: <span className="interiordisplay">{won}</span> </p>
                    <p className="singlestatsdisp">Won Amount: <span className="interiordisplay">{Totalwon}</span>  <img className="cointmini" src="./Slots Coin.png" /> </p>
                    </div>
                    
                </div>
            </div>
            <form onSubmit={handleSubmit} className="infocontainer">
                <h4 className="sectiontitle">User Profile</h4>
                <div className="inputscontainer">
                    {
                        userinfos.map((info,index)=>{
                            return(
                                <FormInpute key={index} {...info} onChange={onChange} value={profile[info.name]}/>

                            )
                        })
                    }
                </div>
                <h4 className="sectiontitle">User adress Informations</h4>
                <div className="inputscontainer">
                    {
                        useradress.map((adres,index)=>{
                            return(
                                <FormInpute key={index} {...adres} onChange={onChangeadress} value={profile.adress[adres.name]}/>

                            )
                        })
                    }
                </div>
                <p className="remember">Please verify your Informations befor Submiting*</p>

                <input className="subButton" type="submit" value="Update Profile"/>
                {notifDisplay?<h6 className={notifDisplay == "Wrong password, Updates failed"&&"errornotification"
                ||
                notifDisplay == "Informations Updated successfully"&&"confirmationnotif"
                }>{notifDisplay}</h6>:null}

            </form>
        </>
    )
}