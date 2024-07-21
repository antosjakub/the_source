import { useEffect, useState } from "react"

const Node = (props) => {
    const [color, setColor] = useState("white");
    useEffect(() => {
        if (props.connect_mode == "true") {
            setColor("gray");
        } else if (props.connect_mode == "false") {
            setColor("white");
        }
    }, [props.state])
    return (<div 
        style={{background: color, left: props.left, top: props.top}}
        className="clickable-element"
        onClick={props.onClick}>
        <textarea>{props.name}</textarea>
        </div>
    );
}

export default Node;