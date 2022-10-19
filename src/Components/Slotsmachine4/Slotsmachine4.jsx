import { useSelector } from "react-redux"
import "./Slotsmachine4.css"

function Slotsmachine4(props) {
    const slotsState = useSelector((state)=>state.slots4statehandlerSlice)
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
        <div className="slotcontainer4" id="bodylogo">
        <img className="imgreg" src="/Packicon/cerise.png" />
        <div className="slotsdiv4">
            <div id="slot41"><img  className="img" src={slotsdisplay(slotsState[0])}/></div>
            <div className="ligne4"></div>
            <div id="slot42"><img  className="img" src={slotsdisplay(slotsState[1])}/></div>
            <div className="ligne4"></div>
            <div id="slot43"><img  className="img" src={slotsdisplay(slotsState[2])}/></div>
            <div className="ligne4"></div>
            <div id="slot44"><img  className="img" src={slotsdisplay(slotsState[3])}/></div>
        </div>
    </div>
    )
    
}

export default Slotsmachine4