/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLanguage } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import AuthUser from "../../utils/AuthUser";
import LangSelector from "../language/LangSelector";
import { ModeProvider } from "../../context/ModeProvider";

const UserNav = ({ mode, toggleMode }) => {
  const { token, logout } = AuthUser();
  const handleSignOut = () => {
    if (token !== undefined) {
      logout();
    }
  };
  return (
    <header>
      <nav>
        <ul>
          {/* {profile && 
          <div className="nav__profile">
            {profile.name}
            <img src={profile.avatar} alt="Avatar" className="profile__image" />
          </div>
          } */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Users
            </NavLink>
          </li>
          <button className="auth__btn" type="button" onClick={handleSignOut}>
            Logout
          </button>
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

export default UserNav;
