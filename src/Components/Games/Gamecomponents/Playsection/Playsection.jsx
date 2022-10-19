import Button from "../../../Buttons/Button"
import Multibutton from "../../../Buttons/Multibutton"
import Inputenum from "../../../Inputes/Inputenum"
import "./Playsection.css"

function Playsection(props) {

    if (props.sl == "3") {
        return(
            <div className="playdiv">
                <Inputenum/>
                <h3 className="titlemultipliers">Multipliers</h3>
                <Multibutton>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>5</div>
                    <div>10</div>
                </Multibutton>
                <Button name="Spin !" sl="3" />
                <p className="displaynone" id="errtag"></p>
            </div>
        )
        
    }
    if (props.sl == "4") {
        return(
            <div className="playdiv">
                <Inputenum/>
                <h3>Multipliers</h3>
                <Multibutton>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>5</div>
                    <div>10</div>
                </Multibutton>
                <Button name="Spin !" sl="4"/>
                <p className="displaynone" id="errtag"></p>
            </div>
        )
        
    }



    
}
export default Playsection