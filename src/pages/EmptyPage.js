import React from "react";
import  LayoutDashboard  from "../pages/Dashboard/Layout";

const EmptyPage = () => {
  return (
    <LayoutDashboard>
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Empty Page</h5>
            <p>
              Use this page to start from scratch and place your custom content.
            </p>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default React.memo(EmptyPage);
