import React, { useEffect, useState } from "react";
import { Button, Collapse, Form, Input, Modal, Rate } from "antd";
import { RootState, useAppDispath } from "../../store/configStore";
import { useSelector } from "react-redux";
import moment from "moment";

import { useFormik } from "formik";
import { CheckCircleFilled } from "@ant-design/icons";
import * as Yup from "yup";
import Loading from "../../components/Molecules/Loading/Loading";
import {
  capNhatThongTinNguoiDungActions,
  thongTinTaiKhoanActions,
} from "../../store/quanLyNguoiDung";
import { huyGhiDanhAction } from "../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";

const Profile = () => {
  const { Panel } = Collapse;
  const dispatch = useAppDispath();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;

  const { thongTinTaiKhoan } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });
  console.log({ thongTinTaiKhoan });

  const { isFetchingHuyGhiDanh } = useSelector((state: RootState) => {
    return state.quanLyKhoaHocReducer;
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinTaiKhoan?.taiKhoan,
      matKhau: thongTinTaiKhoan?.matKhau,
      email: thongTinTaiKhoan?.email,
      soDt: thongTinTaiKhoan?.soDT,
      maNhom: thongTinTaiKhoan?.maNhom,
      maLoaiNguoiDung: thongTinTaiKhoan?.maLoaiNguoiDung,
      hoTen: thongTinTaiKhoan?.hoTen,
    },
    validationSchema: Yup.object({
      matKhau: Yup.string().required("Mật khẩu không được bỏ trống!"),
      email: Yup.string()
        .email("Định dạng email không đúng!")
        .required("Email không được bỏ trống!"),
      soDt: Yup.string()
        .matches(phoneRegExp, "Định dạng số điện thoại không đúng!")
        .required("Số điện thoại không được bỏ trống!"),
      hoTen: Yup.string().required("Họ tên không được để trống!"),
    }),
    onSubmit: (values: any) => {
      console.log("values", values);
      dispatch(capNhatThongTinNguoiDungActions(values))
        .unwrap()
        .then(() => {
          showModal();
        });
    },
  });
  useEffect(() => {
    dispatch(thongTinTaiKhoanActions());
  }, []);
  if (isFetchingHuyGhiDanh) {
    return <Loading />;
  }
  return (
    <div className="ThongTinCaNhan ">
      <Modal
        title={<span className="text-green-500">Cập nhật thành công</span>}
        open={isModalOpen}
        onOk={handleOk}
        destroyOnClose
        closable={false}
        footer={[
          <div className="text-center">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleOk}
            >
              OK
            </button>
          </div>,
        ]}
      >
        <div className="text-center">
          <CheckCircleFilled
            className="text-4xl mb-2 text-green-500"
            style={{ color: "rgb(34 197 94) " }}
          />
          <br />
          <p className="uppercase text-green-500 font-bold text-3xl">
            cập nhật thành công!
          </p>
        </div>
      </Modal>

      <div
        className="carousel-course uppercase py-[150px] px-10 text-4xl text-white"
        style={{
          background:
            "linear-gradient(90deg, rgba(131,58,180,1) 23%, rgba(253,29,29,1) 86%)",
        }}
      >
        Thông tin cá nhân
      </div>
      <div className="text-lg font-semibold border-b pb-3 flex container mx-auto mt-8 px-4">
        <div>
          <img
            src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg"
            alt=""
            className="w-40"
          />
        </div>
        <div className="pl-5">
          <div>
            <label>Tài khoản: </label>
            <span className="text-amber-500 mr-2">
              {thongTinTaiKhoan?.taiKhoan}
            </span>

            <span className="text-blue-500 text-sm">
              ( {thongTinTaiKhoan?.maLoaiNguoiDung} )
            </span>
          </div>

          <p>
            <span>Email: </span>
            <span className="text-amber-500 mr-2">
              {thongTinTaiKhoan?.email}
            </span>
          </p>
          <p>
            <span>Họ tên: </span>
            <span className="text-amber-500 mr-2">
              {thongTinTaiKhoan?.hoTen}
            </span>
          </p>
          <p>
            <span>Số điện thoại: </span>
            <span className="text-amber-500">{thongTinTaiKhoan?.soDT}</span>
          </p>
        </div>
      </div>
      <Collapse
        accordion
        className="container mx-auto mt-8 px-4"
        style={{ margin: "32px auto" }}
      >
        <Panel
          key={"1"}
          header={
            <span className="text-lg font-semibold text-amber-500">
              Khóa học của tôi
            </span>
          }
        >
          <div>
            {thongTinTaiKhoan?.chiTietKhoaHocGhiDanh.map((khoaHoc, i) => (
              <div key={i} className="py-2 border-b grid grid-cols-12">
                <div className="col-span-4 md:col-span-2 lg:col-span-1">
                  <img src={khoaHoc.hinhAnh} alt="" className="w-full" />
                </div>
                <div className="col-span-8 pl-3 ">
                  <p className="m-0 text-xl font-bold text-amber-500">
                    {khoaHoc.tenKhoaHoc}
                  </p>
                  <p className="m-0 text-green-500">
                    Mô tả:{" "}
                    {khoaHoc.moTa.length > 100 ? (
                      <span>{khoaHoc.moTa.slice(0, 100)} ...</span>
                    ) : (
                      <span>{khoaHoc.moTa}</span>
                    )}
                  </p>
                  <p className="m-0 text-amber-500">
                    Đánh giá:{" "}
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={khoaHoc.danhGia / 2}
                    />
                  </p>
                  <button
                    className="mt-2 relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
                    onClick={() =>
                      dispatch(
                        huyGhiDanhAction({
                          maKhoaHoc: khoaHoc.maKhoaHoc,
                          taiKhoan: thongTinTaiKhoan.taiKhoan,
                        })
                      )
                    }
                  >
                    <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease" />
                    <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                      <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md" />
                      <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md" />
                    </span>
                    <span className="relative text-white">Hủy đăng ký</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          header={
            <span className="text-lg font-semibold text-amber-500">
              Cập nhật thông tin cá nhân
            </span>
          }
          key={"2"}
        >
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onSubmitCapture={formik.handleSubmit}
          >
            <Form.Item label="Tài khoản">
              <Input
                name="taiKhoan"
                value={formik.values.taiKhoan as string}
                onChange={formik.handleChange}
                disabled={true}
              />
            </Form.Item>

            <Form.Item label="Mật khẩu">
              <Input.Password
                name="matKhau"
                value={formik.values.matKhau}
                onChange={formik.handleChange}
              />
              {formik.errors.matKhau && formik.touched ? (
                <p className="text-red-500">{formik.errors?.matKhau}</p>
              ) : null}
            </Form.Item>
            <Form.Item label="Email">
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched ? (
                <p className="text-red-500">{formik.errors?.email}</p>
              ) : null}
            </Form.Item>
            <Form.Item label="Họ tên">
              <Input
                name="hoTen"
                value={formik.values.hoTen}
                onChange={formik.handleChange}
              />
              {formik.errors.hoTen && formik.touched ? (
                <p className="text-red-500">{formik.errors?.hoTen}</p>
              ) : null}
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input
                name="soDt"
                value={formik.values.soDt}
                onChange={formik.handleChange}
              />
              {formik.errors.soDt && formik.touched ? (
                <p className="text-red-500">{formik.errors?.soDt}</p>
              ) : null}
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
              {/* {errCapNhatThongTinNguoiDung !== "" ? (
                <p className="text-red-500 font-bold">
                  {errCapNhatThongTinNguoiDung}
                </p>
              ) : (
                ""
              )} */}
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Profile;
