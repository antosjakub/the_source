import { useState, useRef } from "react";
import './Board.css';
import Node from "./Node";

const Board = () => {
    const [connect_mode, setConnectMode] = useState("true"); // states: true / false

    const [positions, setPositions] = useState([]);
    const canvasRef = useRef(null)

    // array storing the position of clicked elements
    const handleClick = (element) => {
        // calculate the center of the clicked element
        const canvas = canvasRef.current;
        const el_canvas = canvas.getBoundingClientRect();
        const el_rect = element.getBoundingClientRect();
        const x = el_rect.left + el_rect.width/2 - el_canvas.left;
        const y = el_rect.top + el_rect.height/2 - el_canvas.top;
        // append to an array
        // draw line if array contains one point already
        setPositions((prev_pos_array) => {
            if (prev_pos_array.length < 1) {
                return [{x, y}];
            } else {
                drawLine([prev_pos_array[0], {x, y}]);
                return [];
            }
        })
    }
    const drawLine = (pos_arr) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")
        ctx.beginPath();
        ctx.moveTo(pos_arr[0].x, pos_arr[0].y);
        ctx.lineTo(pos_arr[1].x, pos_arr[1].y);
        ctx.stroke();
    }

return (
    <div>
        <button onClick={() => connect_mode == "true" ? setConnectMode("false") : setConnectMode("true")}>Connect Mode</button>
        <div id="canvasContainer">
          <canvas ref={canvasRef} id="canvasElement" width="500" height="400"></canvas>
          <Node 
            connect_mode={connect_mode}
            name="TXT1"
            onClick={(e) => connect_mode == "true" ? handleClick(e.target) : null}
            top="100px"
            left="50px"
          ></Node>
          <Node 
            connect_mode={connect_mode}
            name="TXT2"
            onClick={(e) => connect_mode == "true" ? handleClick(e.target) : null}
            top="200px"
            left="200px"
          ></Node>
        </div>
    </div>
  );
}

export default Board;