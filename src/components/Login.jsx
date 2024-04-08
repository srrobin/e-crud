/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import AuthUser from "../utils/AuthUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setEror] = useState("");

  const { setToken, AxiosInstance } = AuthUser();
  const handleSubmit = (e) => {
    e.preventDefault();
    AxiosInstance.post("/auth/login", { email, password })
      .then((res) => {
        setToken(res.data.access_token);
      })
      .catch((error) => {
        setEror(error.response.data.message);
      });
  };

  return (
    <div className="signin__area">
      <div className="form__area">
        <h2>welcome back</h2>
        <i style={{ textAlign: "center", color: "red", display: "block" }}>
          {error}
        </i>

        <form onSubmit={handleSubmit}>
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
          <small>forgot passwor ?</small>
          <button className="type__3" type="submit">
            Login
          </button>
          <div className="">
            Don&lsquo;t have an account ?
            <a href="/register" className="link__1">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
