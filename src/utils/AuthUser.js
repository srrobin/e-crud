import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthUser = () => {
  const navigate = useNavigate();
  
  const getToken = () => {
    const userToken = JSON.parse(sessionStorage.getItem("token"));
    return userToken;
  };
  
  const [token, setToken] = useState(getToken());

  const saveToken = async (token) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    setToken(token);
    navigate("/admin");
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const BASE_URL = "https://api.escuelajs.co/api/v1";
  const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  return {
    setToken: saveToken,
    token,
    logout,
    getToken,
    AxiosInstance
  };
};

export default useAuthUser;
