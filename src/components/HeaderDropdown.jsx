import React from "react";
import { useSelector } from 'react-redux';
import { TbLayoutBoardSplit } from "react-icons/tb";
import "../style/Header.css";


function HeaderDropDown(setOpenDropdown) {

    const boards = useSelector((state) => state.boards);
   console.log('boards=',boards)
  return (
    <div className="HeaderDropdown" onClick={(e) =>{
        if(e.target !== e.currentTarget){
            return
        }
        setOpenDropdown(false)
    }}>
      <div className="DropdownModal">
        <h3>All Boards
            ({boards?.length})
        </h3>
        {boards.map((board, index) => (
        <div key={index} className="BoardCart">
            <TbLayoutBoardSplit className="BoardItem"  />
      
            <p>{board.name} </p>
        </div>
      ))}
      <div className="NewBoard">
      <TbLayoutBoardSplit className="BoardItem"  />
      <p> Create New Board</p>
       
      </div>
      </div>
    
    </div>
  );
}

export default HeaderDropDown;
