import React from 'react';
import ReactDOM from 'react-dom/client';
import Node from './Node'


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
//<Draggable><Node></Node></Draggable>
root.render(
  <React.StrictMode>
    <Node></Node>
  </React.StrictMode>
);