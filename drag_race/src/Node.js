import { useState, useRef } from "react";
import './Node.css';
import Draggable from "react-draggable";

function return_length(string) {
    return string.length
}

function Node(props) {
    const [n_cols, SetColCount] = useState(4)
    const [n_rows, SetRowCount] = useState(1)
    const [postContent, setPostContent] = useState("");
    const textarea_ref = useRef(null);
    const empty_textarea_width = 4

    function updateSize(value) {
        const input_lines = value.split("\n")
        const n_lines = input_lines.length
        const input_counts = input_lines.map(return_length)
        const n_letters = Math.max.apply(Math, input_counts)
        SetColCount(n_letters + empty_textarea_width)
        SetRowCount(n_lines)
        setPostContent(value)
    }

    return  <Draggable><textarea   ref={textarea_ref}
                        value={postContent}
                        className="node"
                        onChange={e => updateSize(e.target.value)}
                        cols={n_cols}
                        rows={n_rows}
            /></Draggable>
}

export default Node;