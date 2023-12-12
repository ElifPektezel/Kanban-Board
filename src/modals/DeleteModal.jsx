import React from "react";
import "../style/DeleteModal.css";

function DeleteModal({ type, title, onDeleteBtnClick, setIsDeleteModalOpen }) {
  return (
    // Modal Container
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
      className="ModalContainer"
    >
      {/* Delete Modal  */}

      <div className="DeleteModal">
        <h3 className="">
          Delete this {type}?
        </h3>
        {type === "task" ? (
          <p className="">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="">
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className="DeleteBtn">
          <button
            onClick={onDeleteBtnClick}
            className=""
          >
            Delete
          </button>
          <button
            onClick={() => {
              setIsDeleteModalOpen(false)
            }}
            className=""
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
