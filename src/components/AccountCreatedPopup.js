// src/components/AccountCreatedPopup.js
import React from 'react';
import './AccountCreatedPopup.css';

const AccountCreatedPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>Account Created Successfully!</p>
        <button onClick={onClose} className="close-popup-btn" Link to='/acc'>OK</button>
      </div>
    </div>
  );
};

export default AccountCreatedPopup;
