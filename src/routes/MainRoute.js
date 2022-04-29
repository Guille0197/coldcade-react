import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Passwordreset from "../pages/Login/Passwordreset";
import EmptyPage from "../pages/EmptyPage";
import Crud from "../pages/Crud";
import Dashboard from "../pages/Dashboard/Dashboard";

const MainRoute = () => (
  <Routes>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/passwordreset" element={<Passwordreset />}></Route>
    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    <Route path="/" exact element={<Dashboard />}></Route>
    <Route path="/empty" element={<EmptyPage />}></Route>
    <Route path="/crud" element={<Crud />}></Route>
  </Routes>
);

export default MainRoute;
