import React, { useEffect, useState } from "react";
import SideBar from '../components/SideBar'
import Column from "./Column";
import { useSelector } from "react-redux";
import '../style/Center.css'

function Center({boardModalOpen, setBoardModalOpen}) {
  const [windowSize, setWindowSize] =useState(
    [
      window.innerWidth,
      window.innerHeight
    ]
  )
const [isSideBarOpen, setIsSideBarOpen] = useState(false)
const boards = useSelector((state) => state.boards)
const board = boards.find((board) => board.isActive === true)
const columns = board.columns

useEffect(() => {
  const handleWindowResize = () => {
    setWindowSize([window.innerWidth, window.innerHeight])
  }
  window.addEventListener("resize", handleWindowResize)
  return() => {
    window.removeEventListener("resize", handleWindowResize)
  }
}, []

)

  return (
<div 
className={`TaskModals ${windowSize[0] >= 768 && isSideBarOpen}`}
>
{
  windowSize[0] >= 768 && (
    <SideBar/>
  )
}

{
  columns.map((col, index) => (
    <Column key={index} colIndex={index} />
  ))
}
</div>
  );
}

export default Center;
