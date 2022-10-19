import "./Multibutton.css"
import { Setleverage } from '../../Redux/betSlice';
import { useDispatch, useSelector } from 'react-redux';


function Multibutton(props) {
    
    const dispatch = useDispatch()
    const Selected = useSelector((state)=>state.betSlice[0])
    const buttons = props.children
    return(
        <div className="multibutton">
            {
                buttons.map((element, index) => {
                    return (
                        <>
                        <button className={classe(index,buttons,Selected,element.props.children)} onClick={()=>{dispatch(Setleverage(element.props.children))}}>{element.props.children}</button>
                        <div className="ligne"></div>
                        </>
                    )
                })
            }


        </div>
    )

}
function classe(index,arr,state,curent ) {
    if (index == 0 && state == curent) {
        return("butt begin selected")
    }
    if (index == (arr.length-1) && state == curent) {
        return("butt end selected")
    }
    if (index == 0 ) {
        return("butt begin")
    }
    if (index == (arr.length-1)) {
        return("butt end")
    }
    if (state == curent) {
        return("butt selected")
    }
    else{
        return("butt")
    }
}

export default Multibutton