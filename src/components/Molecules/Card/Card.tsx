import { Rate } from "antd";
import React from "react";
import { LayDanhSachKhoaHoc } from "../../../types/quanLyKhoaHocTypes";
import "./card.css";

type ChildProps = React.HTMLAttributes<HTMLDivElement> & {
  khoaHoc: LayDanhSachKhoaHoc;
};
const Card: React.FC<ChildProps> = ({ khoaHoc }) => {
  return (
    <div className="card-wrapper w-1/4 p-2 box-border relative">
      <div className="card rounded-lg h-full border-[1px] border-[rgba(0, 0, 0, 0.125)] rounded-sm border-solid">
        <div className="card-img-wrapper ">
          <div className="card-img w-full pt-[100%] relative">
            <img
              src={khoaHoc.hinhAnh}
              className="object-fill align-bottom absolute top-0 left-0 w-full h-full "
              alt={khoaHoc.tenKhoaHoc}
            />
          </div>
          <div
            className="card-content flex flex-col p-4"
            style={{ flex: "1 0 auto" }}
          >
            <h3 className="text-2xl uppercase card-heading">
              {khoaHoc.tenKhoaHoc}
            </h3>
            <div>
              <Rate allowHalf disabled defaultValue={4.5} />

              <span className="mr-2 ml-1">4.5</span>
              <span>({khoaHoc.luotXem}) lượt xem</span>
            </div>
            <button
              type="button"
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-600 uppercase cursor-pointer mt-4"
            >
              đăng ký
            </button>
          </div>
        </div>
      </div>
      <div className="bestSeller text-sm uppercase bg-yellow-500 py-1 px-3 absolute top-5 left-2">
        bestseller
      </div>
    </div>
  );
};

export default Card;
