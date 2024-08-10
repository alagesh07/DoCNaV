// src/components/Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, children }) => {
  return (
    show &&(
      <div className={`modal ${show ? 'show' : ''}`}>
        <div className="modal-content">
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
