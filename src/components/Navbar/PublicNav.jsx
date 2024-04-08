/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLanguage } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import LangSelector from "../language/LangSelector";

const PublicNav = ({ mode, toggleMode }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              home
            </NavLink>
          </li>
          <Link to="/login"> 
            <button className="auth__btn" type="button">
              Login
            </button>
          </Link>
          {/* <button className="lang__btn" type="button">
            <FaLanguage />
          </button> */}
          <LangSelector />
          <button onClick={toggleMode} className="mode__btn" type="button">
            {mode ? <MdDarkMode /> : <MdLightMode /> }
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default PublicNav;
