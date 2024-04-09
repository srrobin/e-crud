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
import { themeMode } from "./context/ModeProvider";
import DetailsPdf from "./components/DetailsPdf";

const App = () => {
  const { mode } = themeMode();
  console.log("🚀 ~ App ~ mode:", mode);
  
  return (
    <div data-theme={mode ? "dark" : "light"} className="wrapper">
      <Navbar />
      <main>
        <Shape />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Products />} />
          <Route path="/user" element={<User />} />
          <Route path="/details/:id" element={<Products />} />
          <Route path="/details/pdf/:id" element={<DetailsPdf />} />
          <Route path="/update/:id" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
};
export default App;
