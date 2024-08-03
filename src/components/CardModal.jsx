// Modal.js
import React from "react";
import styles from "./CardModal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;
