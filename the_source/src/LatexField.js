import Draggable from "react-draggable";


function LatexField(props) {
  return (
    <Draggable>
    <div className="container" style={{left: props.left, top: props.top}}>
      <div className="divInput">
        <textarea className="textarea"></textarea>
      </div>
      <div className="divCompile">
        <button className="compileButton">Compile</button>
      </div>
      <div className="divOutput"></div>
    </div></Draggable>
  );
}

export default LatexField;