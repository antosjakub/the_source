import { useState, useRef, useEffect } from "react";
import './index.css';
import Draggable from "react-draggable";

function return_length(string) {
    return string.length
}

function Node(props) {
    const ref = useRef(null);
    const empty_textarea_width = 4
    const [n_cols, setColCount] = useState(empty_textarea_width)
    const [n_rows, setRowCount] = useState(1)
    const [text, setText] = useState("");
    const [prev_text_len, setPrevTextLen] = useState({n_lines: 1, n_letters: 0})
    const [position, setPosition] = useState({left: props.left, top: props.top})
    const backgroundColor = updateBackgoundColor(props)

    function updateBackgoundColor(props) {
        console.log(props.connect_mode, props.delete_mode)
        console.log("background change")
        if (props.connect_mode && !props.delete_mode) {
            return "#cecdcd"
        } else if (!props.connect_mode && props.delete_mode) {
            return "red"
        } else if (!props.connect_mode && !props.delete_mode) {
            return "white"
        } else {
            return "black"
        }
    }

    function updateElement(e) {
        // look at previous n_letters, n_lines - compare with current
        // -> change top / left position
        const value = e.target.value
        const input_lines = value.split("\n")
        const n_lines = input_lines.length
        const input_counts = input_lines.map(return_length)
        const n_letters = Math.max.apply(Math, input_counts)
        setColCount(n_letters + empty_textarea_width)
        setRowCount(n_lines)
        setText(value)

        const delta_lines = n_lines - prev_text_len.n_lines
        const delta_letters = n_letters - prev_text_len.n_letters
        console.log(delta_lines, delta_letters)
        setPosition({left: position.left - 3*delta_letters, top: position.top - 6*delta_lines})

        setPrevTextLen({n_lines: n_lines, n_letters: n_letters})
    }

    return  <Draggable
                onDrag={props.onDrag}
                disabled={props.connect_mode}
                nodeRef={ref}
                bounds="parent">
                <textarea
                    ref={ref}
                    value={text}
                    className="node"
                    onChange={e => updateElement(e)}
                    cols={n_cols}
                    rows={n_rows}
                    style={{left: position.left, top: position.top, backgroundColor: backgroundColor}}
                    onClick={props.onClick}
                />
            </Draggable>
}

export default Node;