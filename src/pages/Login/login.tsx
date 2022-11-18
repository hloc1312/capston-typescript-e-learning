import React, { useEffect } from "react";
import { FormikErrors, useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState, useAppDispath } from "../../store/configStore";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/quanLyNguoiDung";
import { UserLogin } from "../../types/quanLyNguoiDungTypes";
// import _ from "lodash";
import * as Yup from "yup";
import Loading from "../../components/Molecules/Loading/Loading";
interface FormValues {
  taiKhoan: string;
  matKhau: string;
}
const Login = () => {
  const dispatch = useAppDispath();

  const { user, err, isFetching } = useSelector(
    (state: RootState) => state.quanLyNguoiDungReducer
  );

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values: UserLogin) => {
      dispatch(userLogin(values))
        .unwrap()
        .then(() => navigate(-2));
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống"),
      matKhau: Yup.string().required("Mật khẩu không được bỏ trống"),
    }),
    // validate: (values: FormValues) => {
    //   const error: FormikErrors<FormValues> = {};
    //   if (!values.taiKhoan) {
    //     error.taiKhoan = "Required";
    //   }
    //   return error;
    // },
  });
  if (isFetching) {
    return <Loading />;
  }
  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <svg
              className="w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 225 225"
              xmlSpace="preserve"
            >
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
                }}
              />
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path
                    id="Layer0_0_1_STROKES"
                    className="st0"
                    d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div
            onClick={() => {
              navigate("/home");
            }}
            className="uppercase text-2xl text-indigo-800 tracking-wide ml-2 font-semibold"
          >
            cyberlearn
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-4 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold uppercase"
        >
          đăng nhập
        </h2>
        <div className="mt-12">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Tài khoản
              </div>
              <input
                name="taiKhoan"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Nhập vào tài khoản"
                value={formik.values.taiKhoan}
                onBlur={formik.handleBlur}
              />
              {formik.errors.taiKhoan && formik.touched ? (
                <p className="text-red-500">{formik.errors.taiKhoan}</p>
              ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Mật khẩu
                </div>
                <div>
                  <NavLink
                    to={"/"}
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer"
                  >
                    Quên mật khẩu ?
                  </NavLink>
                </div>
              </div>
              <input
                name="matKhau"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Nhập vào password"
                value={formik.values.matKhau}
                onBlur={formik.handleBlur}
              />
              {formik.errors.matKhau && formik.touched ? (
                <p className="text-red-500">{formik.errors.matKhau}</p>
              ) : null}
            </div>
            <div className="mt-10">
              {err !== "" ? (
                <p className="text-center text-red-500 font-bold">
                  {err.content}
                </p>
              ) : (
                ""
              )}
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
              >
                Đăng Nhập
              </button>
            </div>
          </form>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Bạn chưa có tài khoản ?{" "}
            <NavLink
              to={"/user/register"}
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Đăng ký
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;