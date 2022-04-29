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
    <Route exact path="/" element={<Dashboard />}></Route>
    <Route exact path="/login" element={<Login />}></Route>
    <Route exact path="/register" element={<Register />}></Route>
    <Route exact path="/passwordreset" element={<Passwordreset />}></Route>
    <Route exact path="/empty" element={<EmptyPage />}></Route>
    <Route exact path="/crud" element={<Crud />}></Route>
    <Route exact path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default MainRoute;
