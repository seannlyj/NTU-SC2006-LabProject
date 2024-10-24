import React from "react";
import "../../styling/CustomModal.css";

function CustomModal({ isOpen, message, onClose, backgroundColor }) {
  if (!isOpen) return null;


  // When user clicks on any part of the modal, the modal should close
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{backgroundColor: backgroundColor || "#ec5353"}}>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default CustomModal;