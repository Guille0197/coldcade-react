import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Passwordreset from "../pages/Login/Passwordreset";
import EmptyPage from "../pages/EmptyPage";
import Crud from "../pages/Crud";
import Dashboard from "../pages/Dashboard/Dashboard";
import { RequireAuth } from "./RequireAuth";
import { AuthProvider } from "./AuthProvider";
import Product from "../pages/CRUD/Product/Product";
import Contenedores from "../pages/contenedores";
import Camiones from "../pages/Camiones";
import Conductores from "../pages/Conductores";

const MainRoute = () => (
  <AuthProvider>
    <Routes>
      <Route exact path="*" element={<Navigate to="/login" replace />} />
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/passwordreset" element={<Passwordreset />}></Route>

      {/* ROUTES PRIVATES */}
      <Route
        exact
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      ></Route>
      <Route
        exact
        path="/contenedores"
        element={
          <RequireAuth>
            <Contenedores />
          </RequireAuth>
        }
      ></Route>
      <Route
        exact
        path="/camiones"
        element={
          <RequireAuth>
            <Camiones />
          </RequireAuth>
        }
      ></Route>
      <Route
        exact
        path="/conductores"
        element={
          <RequireAuth>
            <Conductores />
          </RequireAuth>
        }
      ></Route>
      <Route
        exact
        path="/product"
        element={
          <RequireAuth>
            <Product />
          </RequireAuth>
        }
      ></Route>
    </Routes>
  </AuthProvider>
);

export default MainRoute;
