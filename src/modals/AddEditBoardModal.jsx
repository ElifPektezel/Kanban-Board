import React, { useState } from "react";
import "../style/Board.css";
import { v4 as uuidv4 } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardSlice";

function AddEditBoardModal({ setBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isFirstLoad, setisFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const board = useSelector((state) => state.boards.find((board) => board.isActive));
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);

  if (type === 'edit' && isFirstLoad && board) {
    setNewColumns(
      board.columns.map((col) => ({ ...col, id: uuidv4() }))
    );
    setName(board.name);
    setisFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      if (column) {
        column.name = newValue;
      }
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((col) => col.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
   
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, columns: newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, columns: newColumns }));
    }
    setBoardModalOpen(false); // işlem tamamlanana kadar yeni durumu görmek için sona attık. yoksa değişikliği göremiyrm.
  };

  return (
    <div
      className="Board"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
    >
      <div className="ModalSection">
        <h3 className="">{type === "edit" ? "Edit" : "Add New"} Board</h3>
        <div className="TaskName">
          <label>Board Column</label>
          <input
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
          />
        </div>
        <div className="BoardColumns">
          <label>Board Columns</label>
          {newColumns.map((column, index) => (
            <div key={index} className="column">
              <input
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                value={column.name}
                type="text"
              />
              <button
                onClick={() => {
                  onDelete(column.id);
                }}
              >
                <RxCross2 size={24} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setNewColumns((prevState) => [
              ...prevState,
              { name: "", tasks: [], id: uuidv4() },
            ]);
          }}
          className="NewCol"
        >
          + Add New Column
        </button>
        <button
          className="SaveCol"
          onClick={() => {
            const isValid = validate();
            if (isValid) {
              onSubmit(type);
            }
          }}
        >
          {type === "add" ? "Create New Board" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
