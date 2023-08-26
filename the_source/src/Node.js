import { useState, useRef } from "react";

function return_length(string) {
    return string.length
}

function Node(props) {
    const [n_cols, SetColCount] = useState(4)
    const [n_rows, SetRowCount] = useState(1)
    const [postContent, setPostContent] = useState("");
    const textarea_ref = useRef(null);

    function updateSize(value) {
        const input_lines = value.split("\n")
        const n_lines = input_lines.length
        const input_counts = input_lines.map(return_length)
        const n_letters = Math.max.apply(Math, input_counts)
        SetColCount(4 + n_letters)
        SetRowCount(n_lines)
        setPostContent(value)
    }

    return  <textarea   ref={textarea_ref}
                        value={postContent}
                        placeholder="type smthg ..."
                        className="node"
                        onChange={e => updateSize(e.target.value)}
                        cols={n_cols}
                        rows={n_rows}
            />
}

export default Node;