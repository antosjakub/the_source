import { useState } from "react";
import Canvas from "./Canvas"
import Node from "./Node"

const Board = () => {
    const [drag_state, setState] = useState("static");
    return (
        <div>
            <button onClick={() => drag_state == "static" ? setState("movable") : setState("static")}>Drug Mode</button>
            <div style={{position: "relative", marginTop: "10px"}}>
                <Canvas></Canvas>
                <Node name="TXT#1" state={drag_state}></Node>
                <Node name="TXT#2" state={drag_state}></Node>
            </div>
        </div>
    )
}

export default Board;