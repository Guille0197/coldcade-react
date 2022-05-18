import React from "react";

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
        rel="noopener noreferrer"
      >
        Github
      </a>
    </div>
  );
};
