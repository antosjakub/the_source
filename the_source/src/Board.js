import Node from "./Node"
import './index.css'
import { useState, useRef } from "react";

const Board = () => {
    const [node_index, setNodeIndex] = useState(1);
    const [connect_mode, setConnectMode] = useState(false);
    const [node_list, setNodeList] = useState([{key:node_index-1, top:100, left:500, connect_mode:connect_mode}]);
    const [node_pair_connection, setNodePairConnection] = useState([]) // [], [ref_1], [ref_1, ref_3]
    const [node_connections, setNodeConnections] = useState([]) // [], [[ref_1, ref_3]], [[ref_1, ref_3], [ref_2, ref_1]]
    const canvasRef = useRef(null)
    const addNewNode = () => {
        setNodeIndex(node_index+1);
        console.log(node_index);
        setNodeList([...node_list,
            {
              key: node_index,
              top: 20*Math.floor(10*Math.random()),
              left: 100*Math.floor(10*Math.random()),
              connect_mode: connect_mode
            }
        ])
    }
    const toggleNodes = () => {
        for (let i=0; i<node_list.length; ++i) {
            node_list[i].connect_mode = !connect_mode
        }
        setConnectMode(!connect_mode);
        setNodePairConnection([]);
    }
    const handleClick = (element) => {
        console.log("clicked!", element)
        setNodePairConnection((n_n_c) => {
            if (n_n_c.length == 0) {
                return [element];
            } else if (n_n_c.length == 1) {
                if (n_n_c[0] == element) {
                    console.log("node connected to itself?")
                } else {
                    setNodeConnections([...node_connections, [...n_n_c, element]])
                    console.log("new node conection established", element)
                }
                return [];
            }
        })
    }
    const drawConnections = () => {
        const canvas = canvasRef.current;
        const el_canvas = canvas.getBoundingClientRect();
        let pos_arr = []
        const ctx = canvas.getContext("2d")
        for (let i=0; i<node_connections.length; ++i) {
            pos_arr = []
            for (let j=0; j<2; ++j) {
                const el_rect = node_connections[i][j].getBoundingClientRect();
                const x = el_rect.left + el_rect.width/2 - el_canvas.left;
                const y = el_rect.top + el_rect.height/2 - el_canvas.top;
                pos_arr.push([x, y])
                console.log([x, y])
            }
            ctx.beginPath();
            ctx.moveTo(pos_arr[0][0], pos_arr[0][1]);
            ctx.lineTo(pos_arr[1][0], pos_arr[1][1]);
            ctx.stroke();
        }
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
                    <button onClick={toggleNodes}>Connect Nodes</button>
                    <button onClick={drawConnections}>Draw Connections</button>
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
                <canvas ref={canvasRef}></canvas>
                {node_list.map((node_attr) => (
                    <Node
                      key={node_attr.key}
                      top={node_attr.top}
                      left={node_attr.left}
                      connect_mode={node_attr.connect_mode}
                      onClick={e => node_attr.connect_mode ? handleClick(e.target) : null}
                    />
                ))}
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

