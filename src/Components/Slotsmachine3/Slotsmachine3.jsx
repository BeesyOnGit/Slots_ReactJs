import { useSelector } from "react-redux"
import "./Slotsmachine3.css"

function Slotsmachine3(props) {
    const slotsState = useSelector((state)=>state.slots3statehandlerSlice)
    function slotsdisplay(sState) {
        if (sState == 1) {
            return ("/Packicon/cerise.png")
        }
        if (sState == 2) {
            return ("/Packicon/orange.png")
        }
        if (sState == 3) {
            return ("/Packicon/ananas.png")
        }
        if (sState == 4) {
            return ("/Packicon/citron-vert.png")
        }
        if (sState == 5) {
            return ("/Packicon/framboises.png")
        }
        if (sState == 6) {
            return ("/Packicon/grain-de-raisin.png")
        }
        if (sState == 7) {
            return ("/Packicon/citron.png")
        }
        
    }
    
    return(
        <div className="slotcontainer3" id="bodylogo">
        <img className="imgreg" src="/Packicon/cerise.png" />
        <div className="slotsdiv3">
            <div id="slot31"><img  className="img3s" src={slotsdisplay(slotsState[0])}/></div>
            <div className="ligne3"></div>
            <div id="slot32"><img  className="img3s" src={slotsdisplay(slotsState[1])}/></div>
            <div className="ligne3"></div>
            <div id="slot33"><img  className="img3s" src={slotsdisplay(slotsState[2])}/></div>
        </div>
    </div>
    )
    
}

export default Slotsmachine3