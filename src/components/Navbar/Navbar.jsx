/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLanguage } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import AuthUser from "../../utils/AuthUser";
import PublicNav from "./PublicNav";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";
import { themeMode } from "../../context/ModeProvider";

const Navbar = () => {
  const { getToken, AxiosInstance } = AuthUser();
  const { mode, toggleMode } = themeMode();
 
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const URL = "/auth/profile";
      const res = await AxiosInstance.get(URL);
      return res.data;
    },
  });
  if (!getToken()) {
    return <PublicNav mode={mode} toggleMode={toggleMode} />;
  }
  return <AdminNav mode={mode} toggleMode={toggleMode} profile={data} />;
};
export default Navbar; 
