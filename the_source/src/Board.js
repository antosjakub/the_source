import Node from "./Node"
import './index.css'
import { useState } from "react";

const Board = () => {
    const [node_list, setNodeList] = useState([{top: 100, left: 500}]);
    const addNewNode = () => {
        setNodeList([...node_list, {
            top: 20*Math.floor(10*Math.random()),
            left: 100*Math.floor(10*Math.random())
        }])
    }


    return (
        <div>
            <div id="header">
            <div id="button_bar">
                <div id="BTN_select">
                    <button>Select</button>
                </div>
                <div id="BTN_node">
                    <button onClick={addNewNode}>New Node</button>
                    <button>Delete Node</button>
                    <button>Connect Nodes</button>
                </div>
                <div id="BTN_pen">
                    <button>Pen</button>
                    <button>Eraser</button>
                </div>
                <div id="BTN_board">
                    <button>Clear Board</button>
                    <button>Import Board</button>
                    <button>Export Board</button>
                </div>
            </div>
            </div>
            <div id="canvas">
                <canvas></canvas>
                {node_list.map((node, index) => (
                    <Node
                      key={index}
                      top={node.top}
                      left={node.left}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board;