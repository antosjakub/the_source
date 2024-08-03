import Node from "./Node"
import './index.css'
import { useState, useRef } from "react";

const Board = () => {
    const [node_index, setNodeIndex] = useState(1);
    const [node_list, setNodeList] = useState([<Node key={node_index-1} top={100} left={500}></Node>])
    const addNewNode = () => {
        setNodeIndex(node_index+1);
        console.log(node_index);
        setNodeList([...node_list,
            <Node
              key={node_index}
              top={20*Math.floor(10*Math.random())}
              left={100*Math.floor(10*Math.random())}
            />
        ])
    }

    // click button -> extract button ref - get positon - left, top; width, 
    const canvasRef = useRef(null)
    const [connect_mode, setConnectMode] = useState("true");
    const [node_connections, setNodeConection] = useState([]); // [[ref_1, ref_2], [ref_3, ref_1], ...]
    
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
                {node_list}
            </div>
        </div>
    )
}

export default Board;

    // HANDLE THE CREATION OF NEW CONNECTIONS IN CONNECT MODE
    //const [node_pair, setNodePair] = useState([]); // [] or [ref_3] or [ref_3, ref_1]
    //const handleClick = (element) => {
    //    setNodePair((prev_node_pair) => {
    //        if (prev_node_pair.length < 1) {
    //            return [element];
    //        } else {
    //            //drawLine([prev_node_pair[0], {x, y}]);
    //            return [...prev_node_pair, element];
    //            return [];
    //        }
    //    })
    //}


    // MIGHT COME IN HANDY
    //const drawNodeConnections = (node_connections) => {
    //    const canvas = canvasRef.current;
    //    const ctx = canvas.getContext("2d")
    //    for (let i = 0; i < node_connections.length; i++) { 
    //        ctx.beginPath();
    //        ctx.moveTo(node_connections[i][0].left, node_connections[i][0].top);
    //        ctx.lineTo(node_connections[i][1].left, node_connections[i][1].top);
    //        ctx.stroke();
    //    }
    //}
    //const nodeClick = (element) => {
    //    setPositions((prev_pos_array) => {
    //        if (prev_pos_array.length < 1) {
    //            return [{x, y}];
    //        } else {
    //            drawLine([prev_pos_array[0], {x, y}]);
    //            return [];
    //        }
    //    })
    //}
    //    // calculate the center of the clicked element
    //    const canvas = canvasRef.current;
    //    const el_canvas = canvas.getBoundingClientRect();
    //    const el_rect = element.getBoundingClientRect();
    //    const x = el_rect.left + el_rect.width/2 - el_canvas.left;
    //    const y = el_rect.top + el_rect.height/2 - el_canvas.top;
    //    // append to an array
    //    // draw line if array contains one point already

