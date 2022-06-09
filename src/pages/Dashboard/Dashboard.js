/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import LayoutDashboard from "./Layout";

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "#2f4860",
      borderColor: "#2f4860",
      tension: 0.4,
    },
    {
      label: "Second Dataset",
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: "#00bb7e",
      borderColor: "#00bb7e",
      tension: 0.4,
    },
  ],
};

const Dashboard = (props) => {
  const [products, setProducts] = useState(null);
  const menu1 = useRef(null);
  const menu2 = useRef(null);
  const [lineOptions, setLineOptions] = useState(null);

  const applyLightTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  const applyDarkTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#ebedef",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(160, 167, 181, .3)",
          },
        },
        y: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(160, 167, 181, .3)",
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  useEffect(() => {
    if (props.colorMode === "light") {
      applyLightTheme();
    } else {
      applyDarkTheme();
    }
  }, [props.colorMode]);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const listCamiones = [
    {
      name: "Camion 1",
      estatus: "Disponible",
      capacidad: "10 Toneladas",
      conductor: "Juan Perez",
    },
    {
      name: "Camion 2",
      estatus: "Ocupado",
      capacidad: "22 Toneladas",
      conductor: "Carlos Lopez",
    },
    {
      name: "Camion 3",
      estatus: "Mantenimiento",
      capacidad: "15 Toneladas",
      conductor: "Jaime Cruz",
    },
    {
      name: "Camion 4",
      estatus: "Disponible",
      capacidad: "5 Toneladas",
      conductor: "Pedro Perez",
    },
  ];

  return (
    <LayoutDashboard>
      <div className="grid">
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Total Ordenes
                </span>
                <div className="text-900 font-medium text-xl">152</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-blue-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">24 nuevas </span>
            <span className="text-500">desde la última visita</span>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Ingresos
                </span>
                <div className="text-900 font-medium text-xl">$2.100</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-money-bill text-orange-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">%52+ </span>
            <span className="text-500">desde la semana pasada</span>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Clientes
                </span>
                <div className="text-900 font-medium text-xl">281</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-users text-cyan-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">20 </span>
            <span className="text-500">recién registrado</span>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Total Productos
                </span>
                <div className="text-900 font-medium text-xl">
                  152 registrados
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-bag text-purple-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">85 </span>
            <span className="text-500">nuevos</span>
          </div>
        </div>

        <div className="col-12 xl:col-6">
          <div className="card">
            <h5>Estado Camiones</h5>
            <DataTable
              value={listCamiones}
              rows={5}
              paginator
              responsiveLayout="scroll"
            >
              <Column
                field="name"
                header="Name"
                sortable
                style={{ width: "35%" }}
              />
              <Column
                field="estatus"
                header="Estatus"
                sortable
                style={{ width: "35%" }}
              />
              <Column
                field="capacidad"
                header="Capacidad"
                sortable
                style={{ width: "35%" }}
              />
              <Column
                field="conductor"
                header="Conductor"
                sortable
                style={{ width: "35%" }}
              />
            </DataTable>
          </div>
          <div className="card">
            <div className="flex justify-content-between align-items-center mb-5">
              <h5>Productos más vendidos</h5>
            </div>
            <ul className="list-none p-0 m-0">
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Cebolla
                  </span>
                  <div className="mt-1 text-600">Vegetales</div>
                </div>
                <div className="mt-2 md:mt-0 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-orange-500 h-full"
                      style={{ width: "50%" }}
                    />
                  </div>
                  <span className="text-orange-500 ml-3 font-medium">%50</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Fresas
                  </span>
                  <div className="mt-1 text-600">Frutas</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-cyan-500 h-full"
                      style={{ width: "16%" }}
                    />
                  </div>
                  <span className="text-cyan-500 ml-3 font-medium">%16</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Tomates
                  </span>
                  <div className="mt-1 text-600">Vegetales</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-pink-500 h-full"
                      style={{ width: "67%" }}
                    />
                  </div>
                  <span className="text-pink-500 ml-3 font-medium">%67</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Maíz
                  </span>
                  <div className="mt-1 text-600">Granos</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                  <span className="text-green-500 ml-3 font-medium">%35</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Yuca
                  </span>
                  <div className="mt-1 text-600">Tubérculos</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-purple-500 h-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                  <span className="text-purple-500 ml-3 font-medium">%75</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Sandía
                  </span>
                  <div className="mt-1 text-600">Frutas</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-teal-500 h-full"
                      style={{ width: "40%" }}
                    />
                  </div>
                  <span className="text-teal-500 ml-3 font-medium">%40</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 xl:col-6">
          <div className="card">
            <h5>Resumen de ventas</h5>
            <Chart type="line" data={lineData} options={lineOptions} />
          </div>

          <div className="card">
            <h5>Gráfica de pedidos</h5>
            <Chart type="bar" data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default React.memo(Dashboard);
