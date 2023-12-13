import { shuffle } from "lodash";
import React, { useState, useEffect } from "react"; // useState ve useEffect ekleyin
import { useDispatch, useSelector } from 'react-redux';
import Task from "./Task";
import '../style/Column.css'
function Column({ colIndex }) {
  const colors = [
    "red",
    "orange",
    "blue",
    "purple",
    "green",
    "indigo",
    "yellow",
    "pink",
    "sky",
  ];
  const [color, setColor] = useState(null);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const col = board.columns.find((col, i) => i === colIndex);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  return (
    <div className="TaskCartModal">
      <p>
        <div className={`${color}`} />
        {col.name} ({col.tasks.length})
      </p>

      {/* tutulan taskları kolonlara yerleştiriyo */}
      {
        col.tasks.map((task,index) =>(
            <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))
      }
    </div>
  );
}

export default Column;
