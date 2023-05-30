import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Provider } from "react-redux";
// import data from "../data/db.json";
import HomePage from "./components/HomePage/HomePage";
import ScenarioForm from "./components/ScenarioForm/ScenarioForm";
import VehicleForm from "./components/VehicleForm/VehicleForm";
import AllScenario from "./components/AllScenario/AllScenario";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/all-scenario",
        element: <AllScenario />,
      },
      {
        path: "/create-scenario",
        element: <ScenarioForm />,
      },
      {
        path: "/create-vehicle",
        element: <VehicleForm />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
