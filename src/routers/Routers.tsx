import { Spin } from "antd";
import React, { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import HomeTemplate from "../components/Layouts/HomeTemplate/HomeTemplate";
import Contact from "../pages/Contact/Contact";
import CourseList from "../pages/CourseList/CourseList";
import Home from "../pages/Home/Home";
import News from "../pages/News/News";

const HomeTemplateLazy = lazy(
  () => import("../components/Layouts/HomeTemplate/HomeTemplate")
);
const Routers = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <div
              className="example"
              style={{
                margin: "20px 0",
                marginBottom: "20px",
                padding: "30px 50px",
                textAlign: "center",
                borderRadius: "4px",
              }}
            >
              <Spin />
            </div>
          }
        >
          <HomeTemplateLazy />
        </Suspense>
      ),
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "/",
          element: <Navigate to={"home"} />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "course",
          element: <CourseList />,
        },
      ],
    },
  ]);
  return routing;
};

export default Routers;