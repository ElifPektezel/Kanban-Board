import React, { useState } from "react";

import "../style/EmptyBoard.css";
import AddEditBoardModal from "../modals/AddEditBoardModal"; 
function EmptyBoard({ type }) {
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  return (
    <div className="EmptyBoard">
      <h3 className="">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className="EmptyBoardBtn"
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default EmptyBoard;
