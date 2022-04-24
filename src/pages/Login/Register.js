/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Messages } from "primereact/messages";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/API";
import Logo from "../../assets/AquiTuLogo.png";

const Register = () => {
  const [loading1, setLoading1] = useState(false);
  const navigate = useNavigate();
  const message = useRef();

  //#region Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      accept: false,
      country: null,
    },
    validate: (data) => {
      let errors = {};
      if (!data.name) {
        errors.name = "Nombre de usuario es obligatorio.";
      }
      if (!data.email) {
        errors.email = "El correo electrónico es obligatorio.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email =
          "Dirección de correo electrónico no válida. Ejm. example@email.com";
      }
      if (!data.password) {
        errors.password = "Contraseña es obligatoria.";
      }
      if (!data.accept) {
        errors.accept = "Es necesario que acepte los términos y condiciones.";
      }
      return errors;
    },
    onSubmit: (data) => {
      formik.resetForm();
      console.log("data", data);
      handleRegister(data);
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

  const handleRegister = (params) => {
    API.post("/register", { params })
      .then((response) => {
        console.log(response.data);
        console.log(params);
        onLoadingClickSubmit();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        addErrorMessage();
      });
  };

  const addErrorMessage = () => {
    message.current.show({
      severity: "error",
      content: "Error al registrarse. Intente nuevamente.",
    });
  };

  const onLoadingClickSubmit = () => {
    setLoading1(true);
    setTimeout(() => {
      alert("Registrando usuario...");
      setLoading1(false);
    }, 2000);
  };

  const header = <h6>Elige una contraseña</h6>;
  const footer = (
    <React.Fragment>
      <Divider />
      <p className="mt-1">Sugerencias</p>
      <ul className="pl-1 ml-1 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Al menos una letra mayúscula</li>
        <li>Al menos una letra minúscula</li>
        <li>Al menos una numérica</li>
        <li>Un mínimo de 8 caracteres</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="flex align-items-center justify-content-center bckImg">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
          <img src={Logo} alt="LOGO" height={50} className="mb-3" />
          <div className="text-900 text-3xl font-medium mb-3">Registrarte</div>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="field pb-2">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-user" />
              <InputText
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                autoFocus
                className={classNames({
                  "p-invalid": isFormFieldValid("name"),
                })}
              />
              <label
                htmlFor="name"
                className={classNames({
                  "p-error": isFormFieldValid("name"),
                })}
              >
                Nombre de usuario
              </label>
            </span>
            {getFormErrorMessage("name")}
          </div>
          <div className="field pb-2">
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
          <div className="field pb-2">
            <span className="p-float-label">
              <Password
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                toggleMask
                className={classNames({
                  "p-invalid": isFormFieldValid("password"),
                })}
                header={header}
                footer={footer}
                weakLabel="Contraseña débil"
                mediumLabel="Contraseña media"
                strongLabel="Contraseña fuerte"
                promptLabel="Ingresa una contraseña"
              />
              <label
                htmlFor="password"
                className={classNames({
                  "p-error": isFormFieldValid("password"),
                })}
              >
                Contraseña nueva
              </label>
            </span>
            {getFormErrorMessage("password")}
          </div>
          <div className="field pb-2">
            <span className="p-float-label">
              <Dropdown
                id="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                // options={countries}
                optionLabel="name"
              />
              <label htmlFor="country">Provincia</label>
            </span>
          </div>
          <div className="field-checkbox">
            <Checkbox
              inputId="accept"
              name="accept"
              checked={formik.values.accept}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("accept"),
              })}
            />
            <label
              htmlFor="accept"
              className={classNames({ "p-error": isFormFieldValid("accept") })}
            >
              Acepto los términos y condiciones
            </label>
          </div>
          <div className="flex align-items-center justify-content-center pb-3">
            <label>Ya tienes una cuenta</label>
            <Link
              to="/login"
              className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
            >
              inicia aquí
            </Link>
          </div>
          <Messages ref={message} />
          <Button
            type="submit"
            label="Registrate"
            icon="pi pi-user"
            className="w-full"
            loading={loading1}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
