import { useState } from "react";
import Slider from "./Components/Buttons/Slider";
import FormInpute from "./Components/Inputes/FormInpute";
import Inputenum from "./Components/Inputes/Inputenum";

export default function Testerpage(props) {
    function multiinput(params) {
        const [profile, Setprofile] = useState({
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
        })
        const stylsep={
            width :"80%",
            margin : 'auto',
            height : "100vh",
            display : "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            //backgroundColor : 'blue'
        }
        const{adress}=profile
        const inputs =[
            {
            name: 'firstname',
            placeholder : "First name",
            type:"texte",
            error:"First name should not contain special characters and be more than 3 characters"
    
        },
        {
            name: 'lastname',
            placeholder : "Last name",
            type:"texte",
            error:"Last name should not contain special characters and be more than 3 characters"
    
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
            error:"Number should contain betwen 8 and 12 digits"
    
        },
        {
            name: 'country',
            placeholder : "Country",
            type:"texte",
            error : "Should contain more than 3 characters without numbers"
    
        },
        {
            name: 'city',
            placeholder : "City",
            type:"texte",
            error : "Should contain more than 3 characters without numbers"
    
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
            if (e.target.name == "country" ||e.target.name == "city" ||e.target.name == "postalcode" ||e.target.name == "street" ) {
                Setprofile({...profile,["adress"]:{...adress,[e.target.name]: e.target.value}})
                
            }
            else{
                Setprofile({...profile,[e.target.name]: e.target.value})
    
            }
        }
        console.log(profile);
    
        return(
            <>
            <div style={stylsep} >
                {
                    inputs.map((input, index)=>{
                        return(
                            <FormInpute key={index} {...input} onChange={onChange} adress={adress} />  
    
                        )
                    })
                }
    
            </div>
            </>
        )
    }
   
    return(
        <></>
    )

}