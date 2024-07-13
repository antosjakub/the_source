import { useState } from "react";
import Canvas from "./Canvas"
import Node from "./Node"

const Board = () => {
    const [drag_state, setState] = useState("static");
    return (
        <div>
            <button onClick={() => drag_state == "static" ? setState("movable") : setState("static")}>Drug Mode</button>
            <Canvas></Canvas>
            <Node name="TXT#1" state={drag_state}></Node>
            <Node name="TXT#2" state={drag_state}></Node>
        </div>
    )
}

export default Board;