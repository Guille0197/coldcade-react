/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Messages } from "primereact/messages";
import { classNames } from "primereact/utils";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/AquiTuLogo.png";
import { getAccessLogin } from "../../services/API";
import { useAuth } from "../../Hooks/useAuth";

const Login = () => {
  const authenticated = useAuth();
  const [loading1, setLoading1] = useState(false);
  const navigate = useNavigate();
  const message = useRef();

  //#region Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.username) {
        errors.username = "Nombre de usuario obligatorio.";
      }
      if (!data.password) {
        errors.password = "Contraseña obligatoria.";
      }
      return errors;
    },
    onSubmit: (data) => {
      formik.resetForm();
      handleLogin(data);
    },
  });

  const isFormFieldValid = (username) =>
    !!(formik.touched[username] && formik.errors[username]);
  const getFormErrorMessage = (username) => {
    return (
      isFormFieldValid(username) && (
        <small className="p-error">{formik.errors[username]}</small>
      )
    );
  };
  //#endregion

  // Login
  const handleLogin = (params) => {
    getAccessLogin(params)
      .then(() => {
        authenticated.signin(params, () => {
          navigate("/");
        });
        setLoading1(true);
      })
      .catch(() => {
        addErrorMessage();
      });
  };

  const addErrorMessage = () => {
    message.current.show({
      severity: "error",
      content: "Usuario o contraseña incorrectos.",
    });
  };

  return (
    <div className="flex align-items-center justify-content-center bckImg">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
          <img src={Logo} alt="LOGO" height={50} className="mb-3" />
          <div className="text-900 text-3xl font-medium mb-3">Bienvenido</div>
          <span className="text-600 font-medium line-height-3">
            ¿No tienes una cuenta?
          </span>
          <Link
            to="/register"
            className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          >
            ¡Crear cuenta nueva!
          </Link>
        </div>
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="field pb-3">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-user" />
              <InputText
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                autoFocus
                className={classNames({
                  "p-invalid": isFormFieldValid("username"),
                })}
              />
              <label
                htmlFor="username"
                className={classNames({
                  "p-error": isFormFieldValid("username"),
                })}
              >
                Nombre de usuario
              </label>
            </span>
            {getFormErrorMessage("username")}
          </div>
          <div className="field">
            <span className="p-float-label">
              <Password
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                toggleMask
                feedback={false}
                className={classNames({
                  "p-invalid": isFormFieldValid("password"),
                })}
              />
              <label
                htmlFor="password"
                className={classNames({
                  "p-error": isFormFieldValid("password"),
                })}
              >
                Contraseña
              </label>
            </span>
            {getFormErrorMessage("password")}
          </div>
          <div className="flex align-items-center justify-content-between mb-12  pb-3">
            <Link
              to="/passwordreset"
              className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Messages ref={message} />
          <Button
            type="submit"
            label="Iniciar Sesión"
            icon="pi pi-sign-in"
            className="w-full"
            loading={loading1}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
