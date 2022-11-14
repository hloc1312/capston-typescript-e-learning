import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import HomeTemplate from "../components/Layouts/HomeTemplate/HomeTemplate";
import Home from "../pages/Home/Home";

const HomeTemplateLazy = lazy(
  () => import("../components/Layouts/HomeTemplate/HomeTemplate")
);
const Routers = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeTemplateLazy />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
      ],
    },
  ]);
};

export default Routers;
