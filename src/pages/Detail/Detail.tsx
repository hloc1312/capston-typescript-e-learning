import { Modal, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispath } from "../../store/configStore";
import {
  dangKyKhoaHoc,
  layThongTinKhoaHoc,
} from "../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";
import { thongTinTaiKhoanActions } from "../../store/quanLyNguoiDung";
import { USER_LOGIN } from "../../utils/config";
import "./detail.css";

const Detail = () => {
  const { thongTinKhoaHoc } = useSelector(
    (state: RootState) => state.quanLyKhoaHocReducer
  );
  const { thongTinTaiKhoan } = useSelector(
    (state: RootState) => state.quanLyNguoiDungReducer
  );

  const indexKhoaHoc = thongTinTaiKhoan?.chiTietKhoaHocGhiDanh.findIndex(
    (item) => item.maKhoaHoc === thongTinKhoaHoc?.maKhoaHoc
  );
  console.log(indexKhoaHoc);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    navigate("/user/login");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

  const showModalLogin = () => {
    setIsModalOpenLogin(true);
  };

  const handleOkLogin = () => {
    dispatch(thongTinTaiKhoanActions());
    setIsModalOpenLogin(false);
  };

  const handleCancelLogin = () => {
    setIsModalOpenLogin(false);
  };
  const dispatch = useAppDispath();
  const params = useParams();
  const user = localStorage.getItem(USER_LOGIN);
  const thongTinUser = JSON.parse(localStorage.getItem(USER_LOGIN) as string);

  const handleDangKy = () => {
    if (user) {
      dispatch(
        dangKyKhoaHoc({
          maKhoaHoc: params.id as string,
          taiKhoan: thongTinUser.taiKhoan,
        })
      ).then(() => showModalLogin());
    } else {
      showModal();
    }
  };
  useEffect(() => {
    dispatch(layThongTinKhoaHoc(params.id as string));
  }, []);

  useEffect(() => {
    dispatch(thongTinTaiKhoanActions());
  }, []);

  return (
    <div className="Detail relative">
      <div
        style={{
          backgroundImage: `url(${thongTinKhoaHoc?.hinhAnh})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          paddingTop: "55%",
          filter: "blur(10px)",
        }}
        className="Detail-background"
      ></div>
      <div className="Detail-content flex justify-between items-center px-8 container mx-auto absolute top-24 left-8">
        <div className="Detail-content-left">
          <h1
            className="text-3xl font-bold uppercase text-white"
            style={{
              textShadow: "5px 5px 10px #000",
            }}
          >
            {thongTinKhoaHoc?.tenKhoaHoc}
          </h1>
          <span
            className="text-[18px] block my-4 text-white"
            style={{
              textShadow: "5px 5px 10px #000",
            }}
          >
            Đánh giá khóa học:{" "}
            <Rate
              disabled
              defaultValue={5}
              style={{ color: "rgb(34 197 94)" }}
            />
          </span>
          {indexKhoaHoc !== -1 ? (
            <button
              className=" relative inline-block px-4 py-2 font-medium group"
              disabled={true}
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1  group-hover:-translate-x-0 group-hover:-translate-y-0" />
              <span className="absolute inset-0 w-full h-full bg-gray-500 border-2 border-gray-500 group-hover:bg-gray-500" />
              <span className="relative text-black group-hover:text-black uppercase cursor-no-drop">
                Đã đăng ký
              </span>
            </button>
          ) : (
            <button
              className=" relative inline-block px-4 py-2 font-medium group"
              onClick={() => {
                handleDangKy();
              }}
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-yellow-500 group-hover:-translate-x-0 group-hover:-translate-y-0" />
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-yellow-500 group-hover:bg-yellow-500" />
              <span className="relative text-black group-hover:text-white uppercase">
                Đăng ký
              </span>
            </button>
          )}
        </div>
        <div className="Detail-content-right">
          <img
            src={`${thongTinKhoaHoc?.hinhAnh}`}
            alt={`${thongTinKhoaHoc?.tenKhoaHoc}`}
            className="w-[350px] h-[350px] rounded-md"
            style={{ border: "1px solid #000" }}
          />
        </div>
      </div>
      <div className="Detail-desc container mx-auto px-4 py-24">
        <h1 className="text-center text-3xl font-bold uppercase">
          Mô tả về khóa học
        </h1>
        <p className="text-2xl">{thongTinKhoaHoc?.moTa}</p>
      </div>
      <Modal
        title={
          <p className="text-yellow-500 font-bold">Đăng ký khóa học thất bại</p>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="text-2xl text-yellow-500 font-bold">
          Bạn cần đăng nhập để đăng ký khóa học này !
        </p>
      </Modal>
      <Modal
        title={
          <p className="text-green-500 font-bold">
            Đăng ký khóa học thành công
          </p>
        }
        open={isModalOpenLogin}
        onOk={handleOkLogin}
        onCancel={handleCancelLogin}
      >
        <p className="text-2xl text-green-500 font-bold">Đăng ký thành công</p>
      </Modal>
    </div>
  );
};

export default Detail;
