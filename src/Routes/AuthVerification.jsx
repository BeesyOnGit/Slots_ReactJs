import {Navigate} from 'react-router-dom';
export default function AuthVerification({
    user,
    link,
    children
}){
    if(!user){
        alert("You have to be loged in to Access this Section!")
        return <Navigate to= {link}/>
            
    }
    if (user) {
        return children;
    }

}