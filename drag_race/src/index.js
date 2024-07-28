import React from 'react';
import ReactDOM from 'react-dom/client';
import Node from './Node'
import './index.css';


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <>
    <div id="header"></div>
    <div id="canvas">
      <Node top="100px" left="500px"></Node>
    </div>
    </>
  </React.StrictMode>
);