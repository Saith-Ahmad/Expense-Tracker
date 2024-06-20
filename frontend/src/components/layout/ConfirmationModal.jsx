import React from "react";

const ConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-8 rounded-lg text-center">
        <p className="text-white text-lg mb-4">Are you sure you want to delete this transaction?</p>
        <div className="flex justify-center">
          <button
            className="bg-red-500 text-white px-4 py-2 mr-4 rounded-md"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
