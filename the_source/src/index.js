import React from 'react';
import ReactDOM from 'react-dom/client';
import Board from './Board'


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Board></Board>
  </React.StrictMode>
);