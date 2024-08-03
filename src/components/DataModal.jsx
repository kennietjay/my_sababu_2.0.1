import React from "react";
import styles from "./DataModal.module.css";

const DataModal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
};

export default DataModal;
