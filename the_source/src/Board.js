import Node from "./Node"
import Canvas from "./Canvas";
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
    const reDrawConnections = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnections()
    }
    const canvas = canvasRef.current;
    const parent_div = canvas.parentElement;
    const canvas_width = parent_div.clientWidth;
    const canvas_height = parent_div.clientHeight;
    
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
                <Canvas ref={canvasRef} width={canvas_width} height={canvas_height}></Canvas>
                {node_list.map((node_attr) => (
                    <Node
                      key={node_attr.key}
                      top={node_attr.top}
                      left={node_attr.left}
                      connect_mode={node_attr.connect_mode}
                      onClick={e => node_attr.connect_mode ? handleClick(e.target) : null}
                      onDrag={reDrawConnections}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board;