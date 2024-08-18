// src/Popup.js
import React from 'react';
import './Popup.css'; // Optional: For styling the popup

const Popup = ({ show, handleClose, children }) => {
  return (
    <div className={`popup ${show ? 'show' : ''}`}>
      <div className="popup-inner">
        <button className="close-btn" onClick={handleClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
