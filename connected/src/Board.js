import { useState, useRef } from "react";
import './Board.css';

const Board = () => {
    //const [drag_state, setState] = useState("static");
    const [positions, setPositions] = useState([]);
    const canvasRef = useRef(null)

    // array storing the position of clicked elements
    const handleClick = (e, element) => {
        // calculate the center of the clicked element
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width/2;
        const y = rect.top + rect.height/2;
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
    <div id="canvasContainer">
      <canvas ref={canvasRef} id="canvasElement" width="500" height="400"></canvas>
      <div
        className="clickable-element"
        style={{ top: '50px', left: '100px' }}
        onClick={(e) => handleClick(e, e.target)}
      >
        Element 1
      </div>
      <div
        className="clickable-element"
        style={{ top: '200px', left: '300px' }}
        onClick={(e) => handleClick(e, e.target)}
      >
        Element 2
      </div>
    </div>
  );
}

export default Board;