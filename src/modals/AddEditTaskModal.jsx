import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector ve useDispatch ekleyin
import { v4 as uuidv4 } from "uuid";
import "../style/TaskModal.css";
import { RxCross2 } from "react-icons/rx";
import boardsSlice from "../redux/boardSlice";

function AddEditTaskModal({

  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const dispatch = useDispatch();

  const board = useSelector((state) => state.boards.find((board) => board.isActive));
  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(col ? columns[prevColIndex].name : ""); // Durumu başlangıçta belirlemek için
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [isValid, setIsValid] = useState(true);

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <div
      className="TaskModal"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
        type === "edit" && setIsTaskModalOpen(false);
      }}
    >
      <div className="TaskModalCart">
        <h3> {type === "edit" ? "Edit" : "Add New"} Task</h3>
        <div className="TaskHeader">
          <label>Task Name</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      

      <div >
        <label >Subtasks</label>
        {subtasks.map((subtask, index) => (
          <div key={index} className="InputForm">
            <input className="TaskInput" 
              onChange={(e) => {
                onChangeSubtasks(subtask.id, e.target.value);
              }}
              type="text"
              value={subtask.title}
              placeholder="e.g Take coffee break"
            />
            <button
              onClick={() => {
                onDelete(subtask.id);
              }}
              className="TaskBtn"
            >
              <RxCross2 size={18} />
            </button>
          </div>
        ))}
        <button
          className="TaskBtnAdd"
          onClick={() => {
            setSubtasks((state) => [
              ...state,
              { title: "", isCompleted: false, id: uuidv4() },
            ]);
          }}
        >
          + Add New Subtask
        </button>
      </div>

      <div className="TaskSection">
        <label className="">Current Status</label>
        <select value={status} onChange={onChangeStatus} className="">
          {columns.map((column, index) => (
            <option key={index}>{column.name}</option>
          ))}
        </select>
        <button
          onClick={() => {
            const isValid = validate();
            if (isValid) {
              onSubmit(type);
              setIsAddTaskModalOpen(false);
              type === "edit" && setIsTaskModalOpen(false);
            }
          }}
          className=""
        >
          {type === "edit" ? "Save Edit" : "Create Task"}
        </button>
      </div>
      </div>


    </div>
  );
}

export default AddEditTaskModal;