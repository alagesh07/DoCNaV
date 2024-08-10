import React, { useEffect } from 'react';
import './Modal1.css';

const Model1 = ({ show, handleClose, children }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  return (
    show && (
      <div className="model1">
        <div className="model1-content">
          {children}
        </div>
      </div>
    )
  );
};

export default Model1;
