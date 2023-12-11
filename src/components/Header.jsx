import React, { useState } from "react";
import "../style/Header.css";
import HeaderDropDown from "./HeaderDropDown";
import logo from "../assets/logo-mobile.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from 'react-redux';

function Header({setBoardModalOpen, boardModalOpen}) {
  const dispatch = useDispatch()
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boadType, setBoadType ] = useState ('add')

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

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

          <button>+</button>
        </div>
      </header>

      {openDropdown && (
        <HeaderDropDown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}
      {boardModalOpen && <AddEditBoardModal type={boadType} setBoardModalOpen={setBoardModalOpen} />}
    </div>
  );
}

export default Header;
