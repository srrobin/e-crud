/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLanguage } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import AuthUser from "../../utils/AuthUser";
import PublicNav from "./PublicNav";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";

const Navbar = () => {
  const [profile, setProfile] = useState(null);
  const { token, AxiosInstanse, getToken } = AuthUser();

  const fetchProfile = async () => {
    try {
      const response = await AxiosInstanse.get("/auth/profile");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!getToken()) {
    return <PublicNav />;
  } if (getToken() && profile && profile.role === "customer") {
    return <UserNav profile={profile} />;
  } if (getToken() && profile && profile.role === "admin") {
    return <AdminNav profile={profile} />;
  } 
  // Handle other cases if needed
  return null;
};

export default Navbar; 
