import React from 'react';
import ReactDOM from 'react-dom/client';
import Node from './Node'


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Node top="100px" left="500px"></Node>
  </React.StrictMode>
);