import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import Shape from "./components/Shape";
import UserNav from "./components/Navbar/UserNav";
import User from "./components/User";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Shape />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Products />} />
          <Route path="/user" element={<User />} />
          <Route path="/details/:id" element={<Products />} />
          <Route path="/update/:id" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
};
export default App;
