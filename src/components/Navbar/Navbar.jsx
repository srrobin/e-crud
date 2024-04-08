/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLanguage } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import AuthUser from "../../utils/AuthUser";
import PublicNav from "./PublicNav";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";
import { themeMode } from "../../context/ModeProvider";

const Navbar = () => {
  const { getToken } = AuthUser();
  const { mode, toggleMode } = themeMode();

  if (!getToken()) {
    return <PublicNav mode={mode} toggleMode={toggleMode} />;
  }
  return <AdminNav mode={mode} toggleMode={toggleMode} />;
};
export default Navbar; 
