import Node from "./Node"
import TextArea from "./TextArea"
import LatexField from "./LatexField"
import Canvas from "./Canvas";
import './index.css'
import { useState, useRef } from "react";
import Popup from './Popup';

const Board = () => {
    const [connect_mode, setConnectMode] = useState(false);
    const [delete_mode, setDeleteMode] = useState(false);
    const [node_index, setNodeIndex] = useState(1);
    //const [node_list, setNodeList] = useState([{key:node_index-1, top:100, left:500, connect_mode:connect_mode}]);
    const [node_list, setNodeList] = useState([]);
    const [node_pair_connection, setNodePairConnection] = useState([]) // [], [ref_1], [ref_1, ref_3]
    const [node_connections, setNodeConnections] = useState([]) // [], [[ref_1, ref_3]], [[ref_1, ref_3], [ref_2, ref_1]]
    const canvasRef = useRef(null)
    const [text_area_index, setTextAreaIndex] = useState(1);
    const [text_area_list, setTextAreaList] = useState([]);
    const [latex_field_index, setLatexFieldIndex] = useState(1);
    const [latex_field_list, setLatexFieldList] = useState([{key:latex_field_index-1, top:100, left:600, connect_mode:connect_mode, delete_mode:delete_mode}]);
    const [showPopup, setShowPopup] = useState(false);
    const [text_area_internals, setTextAreaInternals] = useState({})
    const [node_internals, setNodeInternals] = useState({})
    const [latex_field_internals, setLatexFieldInternals] = useState({})
    const addNewTextArea = () => {
        setTextAreaIndex(text_area_index+1);
        console.log(text_area_index);
        setTextAreaList([...text_area_list,
            {
              key: text_area_index,
              top: 20*Math.floor(10*Math.random()),
              left: 100*Math.floor(10*Math.random()),
              connect_mode: connect_mode,
              delete_mode: delete_mode,
            }
        ])
    }
    const addNewNode = () => {
        setNodeIndex(node_index+1);
        console.log(node_index);
        setNodeList([...node_list,
            {
              key: node_index,
              top: 20*Math.floor(10*Math.random()),
              left: 100*Math.floor(10*Math.random()),
              connect_mode: connect_mode,
              delete_mode: delete_mode
            }
        ])
    }
    const addNewLatexField = () => {
        setLatexFieldIndex(latex_field_index+1);
        console.log(latex_field_index);
        setLatexFieldList([...latex_field_list,
            {
              key: latex_field_index,
              top: 20*Math.floor(10*Math.random()),
              left: 100*Math.floor(10*Math.random()),
              connect_mode: connect_mode,
              delete_mode: delete_mode
            }
        ])
    }
    const checkForDoubleModeError = (connect_mod, delete_mod) => {
        if (connect_mod && delete_mod) {
            togglePopup()
            return false;
        } else {
            return true;
        }
    }
    const toggleConnectMode = () => {
        if (checkForDoubleModeError(!connect_mode, delete_mode)) {
            for (let i=0; i<node_list.length; ++i) {
                node_list[i].connect_mode = !connect_mode
            }
            for (let i=0; i<text_area_list.length; ++i) {
                text_area_list[i].connect_mode = !connect_mode
            }
            for (let i=0; i<latex_field_list.length; ++i) {
                latex_field_list[i].connect_mode = !connect_mode
            }
            setConnectMode(!connect_mode);
            setNodePairConnection([]);
        }
    }
    const toggleDeleteMode = () => {
        if (checkForDoubleModeError(connect_mode, !delete_mode)) {
            for (let i=0; i<node_list.length; ++i) {
                node_list[i].delete_mode = !delete_mode
            }
            for (let i=0; i<text_area_list.length; ++i) {
                text_area_list[i].delete_mode = !delete_mode
            }
            for (let i=0; i<latex_field_list.length; ++i) {
                latex_field_list[i].delete_mode = !delete_mode
            }
            setDeleteMode(!delete_mode)
        }
    }
    const addNodeConnection = (element) => {
        setNodePairConnection((n_p_c) => {
            if (n_p_c.length == 0) {
                return [element];
            } else if (n_p_c.length == 1) {
                if (n_p_c[0] == element) {
                    console.log("node connected to itself?")
                } else {
                    setNodeConnections([...node_connections, [...n_p_c, element]])
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
    const handleNodeClick = (e, node_attr) => {
        if (node_attr.connect_mode) {
            addNodeConnection(e.target)
        }
        if (node_attr.delete_mode) {
            removeElement(node_attr.key, "Node")
        }
    }
    const removeElement = (target_key, type) => {
        console.log("remove")
        if (type == "TextArea") {
            setTextAreaList(text_area_list.filter(dict => dict.key != target_key))
            setTextAreaInternals(Object.keys(text_area_internals).filter(key => key != target_key).reduce((newObj, key) => {
                newObj[key] = text_area_internals[key];
                return newObj;
            }, {}));

        } else if (type == "LatexField") {
            setLatexFieldList(latex_field_list.filter(dict => dict.key != target_key))
            setLatexFieldInternals(Object.keys(latex_field_internals).filter(key => key != target_key).reduce((newObj, key) => {
                newObj[key] = latex_field_internals[key];
                return newObj;
            }, {}));
        } else if (type == "Node") {
            setNodeList(node_list.filter(dict => dict.key != target_key))
            setNodeInternals(Object.keys(node_internals).filter(key => key != target_key).reduce((newObj, key) => {
                newObj[key] = node_internals[key];
                return newObj;
            }, {}));
        }
    }
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const exportBoard = () => {
        console.log("EXPORT")
        //const exportData = {
        //    "Node": node_internals,
        //    "TextArea": text_area_internals,
        //    "LatexField": latex_field_internals
        //}
        const exportData = {
            "Node": {},
            "TextArea": {},
            "LatexField": {}
        }
        const canvas = canvasRef.current;
        const el_canvas = canvas.getBoundingClientRect();
        let key, internals;
        key = "Node";
        internals = node_internals;
        for (let [index, data] of Object.entries(internals)) {
            exportData[key][index] = {}
            exportData[key][index].left = data.left - el_canvas.left
            exportData[key][index].top = data.top - el_canvas.top
            exportData[key][index].text = data.text
        }
        key = "TextArea";
        internals = text_area_internals;
        for (let [index, data] of Object.entries(internals)) {
            exportData[key][index] = {}
            exportData[key][index].left = data.left - el_canvas.left
            exportData[key][index].top = data.top - el_canvas.top
            exportData[key][index].text = data.text
        }
        key = "LatexField";
        internals = latex_field_internals;
        for (let [index, data] of Object.entries(internals)) {
            exportData[key][index] = {}
            exportData[key][index].left = data.left - el_canvas.left
            exportData[key][index].top = data.top - el_canvas.top
            exportData[key][index].text = data.text
        }
        console.log(exportData)
    }
    
    return (
        <div>
            <div id="header">
            <div id="button_bar">
                <div id="BTN_select">
                    <button className="btn_in_bar">Select</button>
                </div>
                <div id="BTN_node">
                    <button className="btn_in_bar" onClick={addNewLatexField}>New LatexField</button>
                    <button className="btn_in_bar" onClick={addNewTextArea}>New TextArea</button>
                    <button className="btn_in_bar" onClick={addNewNode}>New Node</button>
                    <button className="btn_in_bar" onClick={toggleDeleteMode} style={{background: delete_mode ? "black" : "#969696"}}>Delete Mode</button>
                    <button className="btn_in_bar" onClick={toggleConnectMode} style={{background: connect_mode ? "black" : "#969696"}}>Connect Mode</button>
                </div>
                <div id="BTN_pen">
                    <button className="btn_in_bar">Pen</button>
                    <button className="btn_in_bar">Eraser</button>
                </div>
                <div id="BTN_board">
                    <button className="btn_in_bar">Clear Board</button>
                    <button className="btn_in_bar">Import Board</button>
                    <button className="btn_in_bar" onClick={exportBoard}>Export Board</button>
                </div>
            </div>
            </div>
            <div id="canvas">
                <Canvas ref={canvasRef} width={1000} height={300}></Canvas>
                {node_list.map((node_attr) => (
                    <Node
                      key={node_attr.key}
                      top={node_attr.top}
                      left={node_attr.left}
                      connect_mode={node_attr.connect_mode}
                      delete_mode={node_attr.delete_mode}
                      onClick={e => handleNodeClick(e, node_attr)}
                      onDrag={reDrawConnections}
                      index={node_attr.key}
                      onExport={setNodeInternals}
                    />
                ))}
                {text_area_list.map((node_attr) => (
                    <TextArea
                      key={node_attr.key}
                      top={node_attr.top}
                      left={node_attr.left}
                      connect_mode={node_attr.connect_mode}
                      delete_mode={node_attr.delete_mode}
                      onClick={() => node_attr.delete_mode ? removeElement(node_attr.key, "TextArea") : null}
                      index={node_attr.key}
                      onExport={setTextAreaInternals}
                    />
                ))}
                {latex_field_list.map((node_attr) => (
                    <LatexField
                      key={node_attr.key}
                      top={node_attr.top}
                      left={node_attr.left}
                      connect_mode={node_attr.connect_mode}
                      delete_mode={node_attr.delete_mode}
                      onClick={() => node_attr.delete_mode ? removeElement(node_attr.key, "LatexField") : null}
                      index={node_attr.key}
                      onExport={setLatexFieldInternals}
                    />
                ))}
            </div>
            <Popup show={showPopup} handleClose={togglePopup}>
                <h2>This is a Pop-up!</h2>
                <p>You cannot activate "Delete Mode" and "Connect Mode" at once.</p>
            </Popup>
        </div>
    )
}

export default Board;