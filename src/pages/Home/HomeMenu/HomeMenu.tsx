import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./homeMenu.css";
import { NavLink } from "react-router-dom";
const HomeMenu = () => {
  return (
    <div className="HomeMenu py-20 container mx-auto px-4">
      <div className="HomeMenu heading">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl ">Các khóa học mới nhất</h3>
          <NavLink
            to="/"
            className="HomeMenuLink inline-flex items-center w-full text-base font-semibold text-black no-underline align-middle  border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:text-yellow-400"
          >
            Xem tất cả khóa học
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;
