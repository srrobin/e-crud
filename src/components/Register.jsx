/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import AuthUser from "../utils/AuthUser";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setEror] = useState("");
  const navigate = useNavigate();
  const { AxiosInstance } = AuthUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    AxiosInstance.post("/users",
      { name, email, password, avatar: "https://api.lorem.space/image/face?w=640&h=480" })
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        setEror(error.response.data.message);
      });
  };

  return (
    <div className="signin__area">
      <div className="form__area">
        <h2>Make Account</h2>
        <i style={{ textAlign: "center", color: "red", display: "block" }}>{error}</i>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Name</label>
          <input 
            name="name" 
            type="text"
            value={name} 
            placeholder="your name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input 
            name="email" 
            type="email"
            value={email} 
            placeholder="user@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input  
            name="password" 
            type="password" 
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
             
          <button className="type__3" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
