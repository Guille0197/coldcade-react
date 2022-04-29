import React from "react";
import { Link, Navigate } from "react-router-dom";
import { classNames } from "primereact/utils";

export const AppTopbar = (props) => {
  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        {/* <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="logo"/> */}
        <span>Cadena de suministro</span>
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
          {/* <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}> */}
          <Link
            to="/login"
            className="p-link layout-topbar-button"
            // onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className="pi pi-user" />
            <span>Profile</span>
          </Link>
          {/* </button> */}
        </li>
      </ul>
    </div>
  );
};
