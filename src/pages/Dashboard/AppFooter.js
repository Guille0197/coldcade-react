import React from "react";
import { Link } from "react-router-dom";

export const AppFooter = () => {
  return (
    <div className="layout-footer">
      <span className="font-medium ml-2">
        © Copyright {new Date().getFullYear()} |{" "}
      </span>
      <a
        color="inherit"
        href="https://github.com/Guille0197/coldcade-react"
        target="_blank"
      >
        Github
      </a>
    </div>
  );
};
