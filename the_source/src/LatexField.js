import Draggable from "react-draggable";
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './index.css';


function LatexField(props) {
  const [latex, setLatex] = useState('');
  const [renderedLatex, setRenderedLatex] = useState('');

  const handleInputChange = (event) => {
    setLatex(event.target.value);
  };

  const handleRenderClick = () => {
    setRenderedLatex(latex);
  };

  return (
    <Draggable>
    <div className="container" style={{left: props.left, top: props.top}}>
      <div className="divInput">
        <textarea 
          className="textarea"
          rows="1"
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="divCompile">
        <button 
          className="compileButton"
          onClick={handleRenderClick}
        >Render</button>
      </div>
      <div className="divOutput">
        {renderedLatex && <BlockMath math={renderedLatex} />}
      </div>
    </div></Draggable>
  );
}

export default LatexField;