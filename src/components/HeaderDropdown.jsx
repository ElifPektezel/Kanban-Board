import React from "react";
import { useSelector } from 'react-redux';
import { TbLayoutBoardSplit } from "react-icons/tb";
import "../style/Header.css";
import boardsSlice from "../redux/boardSlice";
import { useDispatch } from 'react-redux';

function HeaderDropDown({setOpenDropdown, setBoardModalOpen}) {
    const dispatch = useDispatch();
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
        <div key={index} className="BoardCart" onClick={() =>{
            dispatch(boardsSlice.actions.setBoardActive({index}))
        }}>
            <TbLayoutBoardSplit className="BoardItem"  />
      
            <p>{board.name} </p>
        </div>
      ))}
      <div className="NewBoard" onClick={() =>{
        setBoardModalOpen(true)
        setOpenDropdown(false)
      } }>
      <TbLayoutBoardSplit className="BoardItem"  />
      <p> Create New Board</p>
       
      </div>
      </div>
    
    </div>
  );
}

export default HeaderDropDown;
