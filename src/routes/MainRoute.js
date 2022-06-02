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
        path="/empty"
        element={
          <RequireAuth>
            <EmptyPage />
          </RequireAuth>
        }
      ></Route>
      <Route
        exact
        path="/crud"
        element={
          <RequireAuth>
            <Crud />
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
