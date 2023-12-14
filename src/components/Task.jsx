import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from './TaskModal';

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
  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div className="TaskCart">
      <div  onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}>
        <p className="">{task.title}</p>
        <p className="">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
      {
        isTaskModalOpen && (
          <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
          />
        )
        
      }
    </div>
  );
}

export default Task;
