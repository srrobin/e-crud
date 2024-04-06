import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
  const navigate = useNavigate();
  const getToken = () => {
    const userToken = JSON.parse(sessionStorage.getItem("token"));
    return userToken;
  };
  const [token, setToken] = useState(getToken());
  const [profile, setProfile] = useState(null);

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const BASE_URL = "https://api.escuelajs.co/api/v1";
  const AxiosInstanse = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const fetchProfile = async () => {
    try {
      const res = await AxiosInstanse.get("/auth/profile");
      setProfile(res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  const saveToken = async (token) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    setToken(token);
    await fetchProfile(); 
    
    if (getToken() && profile && profile.role === "customer") {
      navigate("/user"); 
    } else if (getToken() && profile && profile.role === "admin") {
      navigate("/admin"); 
    } else {
      navigate("/login"); 
    }
  };
  
  return {
    setToken: saveToken,
    token,
    logout,
    profile,
    getToken,
    AxiosInstanse
  };
};

export default AuthUser;
