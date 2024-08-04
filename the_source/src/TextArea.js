import { useState, useRef, useEffect } from "react";
import './index.css';
import Draggable from "react-draggable";

function return_length(string) {
    return string.length
}

function TextArea(props) {
    const textarea_ref = useRef(null);
    const empty_textarea_width = 4
    const [n_cols, setColCount] = useState(empty_textarea_width)
    const [n_rows, setRowCount] = useState(1)
    const [text, setText] = useState("");
    const [prev_text_len, setPrevTextLen] = useState({n_letters: 0})
    const [position, setPosition] = useState({left: props.left, top: props.top})
    const backgroundColor = props.connect_mode ? "#cecdcd" : "white";

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
        const delta_letters = n_letters - prev_text_len.n_letters
        setPosition({left: position.left - 3*delta_letters, top: position.top})
        setPrevTextLen({n_letters: n_letters})
    }

    return  <Draggable
                disabled={props.connect_mode}
                nodeRef={textarea_ref}
                bounds="parent">
                <textarea
                    ref={textarea_ref}
                    value={text}
                    className="text_area"
                    onChange={e => updateElement(e)}
                    cols={n_cols}
                    rows={n_rows}
                    style={{left: position.left, top: position.top, backgroundColor: backgroundColor}}
                />
            </Draggable>
}

export default TextArea;