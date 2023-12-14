import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardSlice";

function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtask = task.subtasks.find((subtask, i) => i === index);
  const checked = subtask.isCompleted;

  const onChange = (e) => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <div className="">
      <input
        className=""
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={checked && ""}>
      {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;
