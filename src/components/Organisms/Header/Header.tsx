import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useAppDispath } from "../../../store/configStore";
import { layDanhSachKhoaHoc } from "../../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";
import { TOKEN, USER_LOGIN } from "../../../utils/config";
const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const user = localStorage.getItem(USER_LOGIN);
  const userLogin = JSON.parse(user as string);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(layDanhSachKhoaHoc(search));
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          className="hover:text-pink-600 block w-full text-left"
          onClick={() => navigate("/profile")}
        >
          Thông tin cá nhân
        </button>
      ),
      key: "0",
    },
    {
      label:
        userLogin?.maLoaiNguoiDung === "GV" ? (
          <button
            className="hover:text-pink-600 block w-full text-left"
            onClick={() => navigate("/admin")}
          >
            Vào trang admin
          </button>
        ) : null,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          className="hover:text-pink-600 block w-full text-left"
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            window.location.reload();
            navigate("/home");
          }}
        >
          Đăng xuất
        </button>
      ),
      key: "3",
    },
  ];
  const handleScrollY = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    setScrollY(scrollY);
  };
  useEffect(() => {
    handleScrollY();
    window.addEventListener("scroll", handleScrollY);
    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  return (
    <header
      className="p-4 dark:text-gray-100"
      style={
        scrollY < 50
          ? {
              position: "fixed",
              top: 0,
              transitionTimingFunction: "ease-in",
              transition: "all .5s",
              zIndex: 10,
              width: "100%",
              background: "transparent",
            }
          : {
              position: "fixed",
              top: 0,
              transitionTimingFunction: "ease-in",
              transition: "all .5s",
              zIndex: 10,
              width: "100%",
              background: "#1f2022",
            }
      }
    >
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2 text-white"
        >
          <img src={logo} alt="..." />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex text-white">
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-yellow-400 border-yellow-400 hover:text-yellow-400 "
                  : "flex items-center px-4 -mb-1 dark:border-transparent text-white hover:text-yellow-400"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/course"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-yellow-400 border-yellow-400 hover:text-yellow-400"
                  : "flex items-center px-4 -mb-1 dark:border-transparent text-white hover:text-yellow-400"
              }
            >
              Course List
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-yellow-400 border-yellow-400 hover:text-yellow-400"
                  : "flex items-center px-4 -mb-1 dark:border-transparent text-white hover:text-yellow-400"
              }
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/news"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-yellow-400 border-yellow-400 hover:text-yellow-400"
                  : "flex items-center px-4 -mb-1 dark:border-transparent text-white hover:text-yellow-400"
              }
            >
              News
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center md:space-x-4">
          <form
            className="relative"
            onSubmit={(e: any) => {
              handleSubmit(e);
            }}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                title="Search"
                className="p-1 focus:outline-none focus:ring"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 dark:text-gray-100"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-32 pr-2 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900"
            />
          </form>
          {user ? (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center">
                Hi! {userLogin.taiKhoan} <DownOutlined className="ml-2" />
              </button>
            </Dropdown>
          ) : (
            <button
              type="button"
              className="hidden px-6 py-2 font-semibold rounded lg:block dark:bg-violet-400 dark:text-gray-900 text-white bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-700  text-sm text-center "
              onClick={() => navigate("/user/login")}
            >
              Log in
            </button>
          )}
        </div>
        <button title="Open menu" type="button" className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
