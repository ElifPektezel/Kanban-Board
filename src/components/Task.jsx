import React, { useState } from "react";
import { useSelector } from "react-redux";

function Task({ taskIndex, colIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  return (
    <div className="TaskCart">
      <div >
        <p className="">{task.title}</p>
        <p className="">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
    </div>
  );
}

export default Task;
