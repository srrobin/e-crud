/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLanguage } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import AuthUser from "../../utils/AuthUser";
import LangSelector from "../language/LangSelector";

const AdminNav = ({ profile }) => {
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
          {profile && 
          <div className="nav__profile">
            {profile.name}
            <img src={profile.avatar} alt="Avatar" className="profile__image" />
          </div>
          }
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
              to="/admin"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              admin
            </NavLink>
          </li>
          <button className="auth__btn" type="button" onClick={handleSignOut}>
            Logout
          </button>
          {/* <button className="lang__btn" type="button">
            <FaLanguage />
          </button> */}
          <LangSelector />
          <button className="mode__btn" type="button">
            <MdLightMode />
          </button>
        </ul>
      </nav>
    </header>
  );
};
export default AdminNav;
