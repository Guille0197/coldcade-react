import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Passwordreset from "../pages/Login/Passwordreset";

const MainRoute = () => (
  <Routes>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/passwordreset" element={<Passwordreset />}></Route>
    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
  </Routes>
);

export default MainRoute;
