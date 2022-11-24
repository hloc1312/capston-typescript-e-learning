import { Spin } from "antd";
import React, { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import HomeTemplate from "../components/Layouts/HomeTemplate/HomeTemplate";
import Contact from "../pages/Contact/Contact";
import CourseList from "../pages/CourseList/CourseList";
import Detail from "../pages/Detail/Detail";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

import News from "../pages/News/News";
import Profile from "../pages/Profile/Profile";
import AddUser from "../pages/Users/AddUser/AddUser";
import EditUser from "../pages/Users/EditUser/EditUser";
import Users from "../pages/Users/Users";

const HomeTemplateLazy = lazy(
  () => import("../components/Layouts/HomeTemplate/HomeTemplate")
);
const UserTemplateLazy = lazy(
  () => import("../components/Layouts/UserTemplate/UserTemplate")
);
const AdminTemplateLazy = lazy(
  () => import("../components/Layouts/AdminTemplate/AdminTemplate")
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
        {
          path: "/detail/:id",
          element: <Detail />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/user",
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
          <UserTemplateLazy />
        </Suspense>
      ),
      children: [
        {
          path: "login",
          element: <Login />,
        },
        // {
        //   path: "register",
        //   element: <Register />,
        // },
      ],
    },
    {
      path: "/admin",
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
          <AdminTemplateLazy />
        </Suspense>
      ),
      children: [
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "users/adduser",
          element: <AddUser />,
        },
        {
          path: "users/edituser/:id",
          element: <EditUser />,
        },
        // {
        //   path: "films",
        //   element: <Films />,
        // },
        // {
        //   path: "films/addfilm",
        //   element: <AddFilm />,
        // },
        // {
        //   path: "films/editfilm/:id",
        //   element: <EditFilm />,
        // },
        // {
        //   path: "films/showtimes/:id",
        //   element: <ShowTime />,
        // },
      ],
    },
    
  ]);
  return routing;
};

export default Routers;
