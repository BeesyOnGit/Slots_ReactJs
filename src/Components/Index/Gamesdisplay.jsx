import "./Gamesdisplay.css"
import {Navigate, useNavigate} from 'react-router-dom';

function Gamesdisplay(props) {
    const Navigate = useNavigate()

    function handleClick() {
        Navigate(props.link)
    }

    return(
        <section className="presentation">
            <h1>The {props.machinename} Machine
            </h1>
            <p>It's a {props.machinename} Machine that have 7 Possible outcoms in every slot, which are represented by fruits, Clic on the Picture For further Infos!!</p>
            <img className="presentationimg" src={props.src} onClick={(e)=>{handleClick()}}/>
            <hr className="presentationseparator"/>
        
        </section>
    )
}

export default Gamesdisplay