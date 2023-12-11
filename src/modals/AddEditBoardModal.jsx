import React, { useState } from "react";
import "../style/Board.css";
import { v4 as uuidv4, validate } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import boardsSlices from "../redux/boardSlice";

function AddEditBoardModal({ setBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);
  // kolon adını değişitiriyo
  const onChange = (id, newValue) => {
    setNewColumns((pervState) => {
      const newState = [...pervState];
      const column = newState.find((col) => col.id == id);
      column.name = newValue;
      return newState;
    });
  };

  //kolon silme işlevi
  const onDelete = (id) => {
    setNewColumns((prevColumns) => prevColumns.filter((el) => el.id !== id));
  };
// Doğrulama işlevi
  const validate = () => {
    setIsValid(false);
     // Board adının boş olmaması kontrolü
    if (!name.trim()) {
      return false;
    }
    // Kolon isimlerinin boş olmaması kontrolü
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onsubmit = (type) => {
    setBoardModalOpen(false);
     // Tür kontrolü yaparak uygun dispatch işlemini gerçekleştirme
    if (type === "add") {
     dispatch(boardsSlices.actions.addBoard({name,newColumns }))
    } else {
        dispatch(boardsSlices.actions.editBoard({name,newColumns }))
    }
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
        <h3 className="">{type === "edit" ? "Edit" : "Add New"}Board</h3>
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
            setNewColumns((state) => [
              ...state,
              { name: "", task: [], id: uuidv4() },
            ]);
          }}
          className="NewCol"
        >
          + Add New Column
        </button>
        {/*type === 'add' Header*/}
        <button
          className="SaveCol"
          onClick={() => {
            const isValid = validate();
            if (isValid === true) onsubmit(type);
          }}
        >
          {type === "add" ? "Create New Board" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
