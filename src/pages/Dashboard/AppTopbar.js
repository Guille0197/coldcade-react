import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { classNames } from "primereact/utils";
import { useAuth } from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import logo from "././../../assets/logo.png";

export const AppTopbar = (props) => {
  const authenticated = useAuth();
  const navigate = useNavigate();

  const sweetAlert = () => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Deseas cerrar sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        authenticated.signout(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <img
          src={logo}
          alt="logo"
          height={300}
          width={200}
          style={{ textAlign: "center" }}
        />
      </Link>

      <button
        type="button"
        className="p-link  layout-menu-button layout-topbar-button"
        onClick={props.onToggleMenuClick}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={props.onMobileTopbarMenuClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <ul
        className={classNames("layout-topbar-menu lg:flex origin-top", {
          "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive,
        })}
      >
        <li>
          <button
            className="p-link layout-topbar-button"
            // onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className="pi pi-user" />
            <span>Profile</span>
          </button>
        </li>
        <li>
          <button
            title="Cerrar sesión"
            className="p-link layout-topbar-button"
            onClick={sweetAlert}
          >
            <i className="pi pi-sign-out" />
            <span>Cerrar Sesión</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
