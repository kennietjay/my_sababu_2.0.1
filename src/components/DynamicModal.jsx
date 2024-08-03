import React from "react";

const DynamicModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center p-10 justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <button onClick={onClose} className="absolute top-4 right-4">
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default DynamicModal;
