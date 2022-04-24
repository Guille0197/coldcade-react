import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./index.css";

import MainRoute from "./routes/MainRoute";
import LayoutDashboard from "./pages/Dashboard/Layout";

function App() {
  return <LayoutDashboard />;
}

export default App;
