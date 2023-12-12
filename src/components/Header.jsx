import React, { useState } from "react";
import "../style/Header.css";
import HeaderDropDown from "./HeaderDropDown";
import logo from "../assets/logo-mobile.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsisMenu from "./ElipsisMenu";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardSlice";
import { SlOptionsVertical } from "react-icons/sl";

function Header({ setBoardModalOpen, boardModalOpen }) {
  const dispatch = useDispatch();
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boadType, setBoadType] = useState("add");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const [isElipsisOpen, setIsElipsisOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisOpen(false);
  };

  const onDeleteBtnClick =() => {
    dispatch (boardsSlice.actions.deleteBoard())
    dispatch(boardsSlice.actions.setBoardActive({index : 0}))
    setIsDeleteModalOpen(false)
  }

  return (
    <div className="Navbar">
      <header className="NavbarNav">
        <div className="NavbarLogo">
          <img src={logo} alt="logo" />
          <div className="NavbarHeader">
            <h3>{board.name}</h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className="NavbarIcn"
              onClick={() => setOpenDropdown((state) => !state)}
            />
          </div>
        </div>
        <div className="NavbarBtn">
          <button>+ Add New Task</button>

          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
          >
            +
          </button>

          <button className="DeleteButton"
            onClick={() => {
              setBoadType('edit');
              setOpenDropdown(false);
              setIsElipsisOpen((state) => !state);
            }}
          >
         <SlOptionsVertical color="grey"  size={18}/>
          </button>

          {isElipsisOpen && <ElipsisMenu
            setOpenDeleteModal={setOpenDeleteModal}
            setOpenEditModal={setOpenEditModal}
            type='Boards' />
          }

        </div>
      </header>

      {openDropdown && (
        <HeaderDropDown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}
      {boardModalOpen && (
        <AddEditBoardModal
          type={boadType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}

      {openAddEditTask && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setOpenAddEditTask}
          device="mobile"
          type="add"
        />
      )}
      {
        isDeleteModalOpen && <DeleteModal 
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        onDeleteBtnClick={onDeleteBtnClick}
         title={board.name} type='board'/>
      }
    </div>
  );
}

export default Header;
