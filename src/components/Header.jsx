import React, { useState } from "react";
import '../style/Header.css'
import HeaderDropDown from "./HeaderDropDown";
import logo from "../assets/logo-mobile.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import iconDown from "../assets/icon-chevron-down.svg";


function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="Navbar">
      <header className="NavbarNav">
        <div className="NavbarLogo">
          <img src={logo} alt="logo" />
          <div className="NavbarHeader"  >
            <h3>Kanban Board</h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className="NavbarIcn"
              onClick={() => setOpenDropdown(state => !state)}
            />
          </div>
        </div>
        <div className="NavbarBtn">
            <button>
                + Add New Task
            </button>

            <button>
               +
            </button>
        </div>
      </header>

   
      {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            
          />
        )}
    </div>
  );
}

export default Header;
