import React, { useEffect } from 'react';
import './Modal.css';

function Modal({ show, onClose, children, duration = 5000, position = 0 }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" style={{ bottom: `${20 + position * 80}px` }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
        <div className="modal-progress">
          <div className="modal-progress-bar" style={{ animationDuration: `${duration}ms` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Modal;