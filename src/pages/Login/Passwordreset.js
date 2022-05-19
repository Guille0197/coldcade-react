/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { classNames } from "primereact/utils";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/AquiTuLogo.png";

const Passwordreset = () => {
  const [loading1, setLoading1] = useState(false);
  const message = useRef();

  //#region Formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.email) {
        errors.email = "El correo electrónico es obligatorio.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email =
          "Dirección de correo electrónico no válida. Ejm. example@email.com";
      }
      return errors;
    },
    onSubmit: (data) => {
      console.log("data", data);
      formik.resetForm();
      handlePasswordReset(data);
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };
  //#endregion

  const handlePasswordReset = (params) => {
    addErrorMessage();
  };

  const addSuccessMessage = () => {
    message.current.show({
      severity: "success",
      content: "Se ha enviado un correo electrónico a su cuenta de correo.",
    });
  };
  const addErrorMessage = () => {
    message.current.show({
      severity: "error",
      content:
        "Ocurrió un error al enviar el correo electrónico, Intente nuevamente.",
    });
  };

  return (
    <div className="flex align-items-center justify-content-center bckImg">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
          <img src={Logo} alt="LOGO" height={50} className="mb-3" />
          <div className="text-900 text-3xl font-medium mb-3">
            ¿Tienes problemas para iniciar sesión?
          </div>
          <span className="text-600 font-medium line-height-3">
            ¿No tienes una cuenta?
          </span>
          <Link
            to="/register"
            className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          >
            ¡Crear cuenta nueva!
          </Link>
          <div className="pt-3">
            <span className="font-small justify-content-center line-height-3">
              Ingresa tu correo electrónico y te enviaremos un enlace para que
              recuperes tu cuenta.
            </span>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-envelope" />
              <InputText
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("email"),
                })}
              />
              <label
                htmlFor="email"
                className={classNames({ "p-error": isFormFieldValid("email") })}
              >
                Correo electrónico
              </label>
            </span>
            {getFormErrorMessage("email")}
          </div>
          <Messages ref={message} />
          <Button
            type="submit"
            label="Enviar enlace de recuperación de cuenta"
            icon="pi pi-sign-in"
            className="w-full"
            loading={loading1}
          />
        </form>
      </div>
    </div>
  );
};

export default Passwordreset;
