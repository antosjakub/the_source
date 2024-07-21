import { useEffect, useState } from "react"
import './Node.css'

const Node = (props) => {
    const [color, setColor] = useState("white");
    useEffect(() => {
        if (props.state == "movable") {
            setColor("gray");
        } else if (props.state == "static") {
            setColor("white");
        }
    }, [props.state])
    return <button 
        style={{background: color}}
        className="canvas-button">
        {props.name}</button>
}

export default Node;