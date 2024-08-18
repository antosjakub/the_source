import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './App.css';

function App() {
  const [latex, setLatex] = useState('');
  const [renderedLatex, setRenderedLatex] = useState('');

  const handleInputChange = (event) => {
    setLatex(event.target.value);
  };

  const handleRenderClick = () => {
    setRenderedLatex(latex);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LaTeX Renderer</h1>
        <textarea
          value={latex}
          onChange={handleInputChange}
          placeholder="Enter LaTeX expression"
          rows="4"
          cols="50"
        />
        <br />
        <button onClick={handleRenderClick}>Render LaTeX</button>
        <div className="latex-output">
          {renderedLatex && <BlockMath math={renderedLatex} />}
        </div>
      </header>
    </div>
  );
}

export default App;