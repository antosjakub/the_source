import { useEffect, useState } from "react"


const Node = (props) => {
    const [color, setColor] = useState("white");
    useEffect(() => {
        if (props.state == "movable") {
            setColor("gray");
        } else if (props.state == "static") {
            setColor("white");
        }
    }, [props.state])
    return <button style={{background: color}}>{props.name}</button>
}

export default Node;