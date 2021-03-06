import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { classNames } from "primereact/utils";
import { Tooltip } from "primereact/tooltip";
import PrimeReact from "primereact/api";

import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";

import "../../assets/layout/layout.scss";

const LayoutDashboard = ({ children }) => {
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const copyTooltipRef = useRef();
  const location = useLocation();

  PrimeReact.ripple = true;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  useEffect(() => {
    copyTooltipRef &&
      copyTooltipRef.current &&
      copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event) => {
    menuClick = true;

    if (isDesktop()) {
      setStaticMenuInactive((prevState) => !prevState);
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setMobileMenuActive(false);
    }
  };
  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const menu = [
    {
      label: "Inicio",
      items: [
        {
          label: "Inicio",
          icon: "pi pi-fw pi-home",
          to: "/",
        },
      ],
    },
    {
      label: "P??ginas",
      icon: "pi pi-fw pi-clone",
      items: [
        {
          label: "Contenedores",
          icon: "pi pi-box",
          to: "/contenedores",
        },
        { label: "Camiones", icon: "pi pi-car", to: "/camiones" },
        {
          label: "Conductores",
          icon: "pi pi-users",
          to: "/conductores",
        },
        {
          label: "Productos",
          icon: "pi pi-shopping-bag",
          to: "/product",
        },
      ],
    },
  ];

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-static": "static",
    "layout-static-sidebar-inactive": staticMenuInactive,
    "layout-mobile-sidebar-active": mobileMenuActive,
  });

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <Tooltip
        ref={copyTooltipRef}
        target=".block-action-copy"
        position="bottom"
        content="Copied to clipboard"
        event="focus"
      />
      <AppTopbar
        onToggleMenuClick={onToggleMenuClick}
        layoutColorMode="light"
        mobileTopbarMenuActive={mobileTopbarMenuActive}
        onMobileTopbarMenuClick={onMobileTopbarMenuClick}
        onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
      />

      <div className="layout-sidebar" onClick={onSidebarClick}>
        <AppMenu
          model={menu}
          onMenuItemClick={onMenuItemClick}
          layoutColorMode="light"
        />
      </div>

      <div className="layout-main-container">
        <div className="layout-main">{children}</div>
        <AppFooter />
      </div>

      <CSSTransition
        classNames="layout-mask"
        timeout={{ enter: 200, exit: 200 }}
        in={mobileMenuActive}
        unmountOnExit
      >
        <div className="layout-mask p-component-overlay"></div>
      </CSSTransition>
    </div>
  );
};

export default LayoutDashboard;
