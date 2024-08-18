import { useEffect, useState, useRef } from "react"

function return_length(string) {
    return string.length
}

const Node = (props) => {
    const textarea_ref = useRef(null);
    const [color, setColor] = useState("white");
    const [n_cols, setColCount] = useState(4)
    const [n_rows, setRowCount] = useState(1)
    const [textContent, setTextContent] = useState("");
    const empty_textarea_width = 4
    function updateSize(value) {
        const input_lines = value.split("\n")
        const n_lines = input_lines.length
        const input_counts = input_lines.map(return_length)
        const n_letters = Math.max.apply(Math, input_counts)
        setColCount(n_letters + empty_textarea_width)
        setRowCount(n_lines)
        setTextContent(value)
    }
    useEffect(() => {
        if (props.connect_mode == "true") {
            setColor("gray");
        } else if (props.connect_mode == "false") {
            setColor("white");
        }
    }, [props.state])
    return (
        <div 
        style={{background: color, left: props.left, top: props.top}}
        className="clickable-element"
        onClick={props.onClick}
        ><textarea 
        ref={textarea_ref}
        style={{resize:"none", textAlign:"center"}}
                        value={textContent}
                        className="node"
                        onChange={e => updateSize(e.target.value)}
                        cols={n_cols}
                        rows={n_rows}
                        >
            {props.name}</textarea>
        </div>
    );
}

export default Node;