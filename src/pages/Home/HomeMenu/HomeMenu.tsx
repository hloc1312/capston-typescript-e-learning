import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./homeMenu.css";
import { NavLink } from "react-router-dom";
import Card from "../../../components/Molecules/Card/Card";
import { LayDanhSachKhoaHoc } from "../../../types/quanLyKhoaHocTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configStore";
import { Skeleton } from "antd";

type ChilProps = React.HTMLAttributes<HTMLDivElement> & {
  danhSachKhoaHoc?: LayDanhSachKhoaHoc[];
};

const HomeMenu: React.FC<ChilProps> = ({ danhSachKhoaHoc }) => {
  const { isFetchingDanhSachKhoaHoc } = useSelector(
    (state: RootState) => state.quanLyKhoaHocReducer
  );
  const renderCardKhoaHoc = () => {
    return danhSachKhoaHoc?.slice(0, 8)?.map((khoaHoc) => {
      return <Card key={khoaHoc.maKhoaHoc} khoaHoc={khoaHoc} />;
    });
  };

  const renderLoading = () => {
    return (
      <div className="flex flex-wrap">
        {[...Array(8)].map((e, index) => {
          return (
            <div
              className="card-wrapper w-1/4 p-2 box-border relative"
              key={index}
            >
              <div className="card rounded-lg h-full border-[1px] border-[rgba(0, 0, 0, 0.125)] rounded-sm border-solid">
                <div className="card-img-wrapper ">
                  <div className="card-img w-full pt-[100%] relative">
                    <Skeleton.Image
                      active={true}
                      className="object-fill align-bottom absolute top-0 left-0 !w-full !h-full"
                      style={{
                        height: "100% !important",
                        width: "100% !important",
                      }}
                    />
                  </div>
                  <div
                    className="card-content flex flex-col p-4"
                    style={{ flex: "1 0 auto" }}
                  >
                    <Skeleton.Button
                      active={true}
                      size={"default"}
                      shape={"default"}
                      // block={true}
                      style={{
                        height: "40px",
                        marginBottom: "8px",
                        width: "80%",
                      }}
                    />
                    <Skeleton.Button
                      active={true}
                      size={"default"}
                      shape={"default"}
                      // block={true}
                      style={{
                        height: "40px",
                        marginBottom: "8px",
                        width: "50%",
                      }}
                    />
                    <Skeleton.Button
                      active={true}
                      size={"default"}
                      shape={"default"}
                      block={true}
                      style={{ height: "40px", marginBottom: "8px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="bestSeller text-sm uppercase bg-yellow-500 py-1 px-3 absolute top-5 left-2">
                bestseller
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="HomeMenu py-20 container mx-auto px-4">
      <div className="HomeMenu heading">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl ">Các khóa học mới nhất</h3>
          <NavLink
            to="/course"
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
      <div className="HomeMenu Card">
        {isFetchingDanhSachKhoaHoc ? (
          renderLoading()
        ) : (
          <div className="flex flex-wrap">{renderCardKhoaHoc()}</div>
        )}
        {/* <div className="flex flex-wrap">{renderCardKhoaHoc()}</div> */}
      </div>
    </div>
  );
};

export default HomeMenu;
