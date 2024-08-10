import React from 'react';
import './RemoveDoctorModal.css';

const RemoveDoctorModal4 = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay4">
      <div className="modal-content4">
        <h2>Confirm Removal</h2>
        <p>Are you sure you want to remove this doctor?</p>
        <div className="modal-buttons4">
          <button onClick={onConfirm} className="confirm-button4">Yes, Remove</button>
          <button onClick={onClose} className="cancel-button4">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveDoctorModal4;
