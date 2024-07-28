import Node from "./Node"
import './index.css'

const Board = () => {
    return (
        <div>
            <div id="header">
            <div id="button_bar">
                <div id="BTN_select">
                    <button>Select</button>
                </div>
                <div id="BTN_node">
                    <button>New Node</button>
                    <button>Delete Node</button>
                    <button>Connect Nodes</button>
                </div>
                <div id="BTN_pen">
                    <button>Pen</button>
                    <button>Eraser</button>
                </div>
                <div id="BTN_port">
                    <button>Import</button>
                    <button>Export</button>
                </div>
                <div id="BTN_clear">
                    <button>Clear</button>
                </div>
            </div>
            </div>
            <div id="canvas">
                <canvas></canvas>
                <Node top={100} left={500}></Node>
            </div>
        </div>
    )
}

export default Board;