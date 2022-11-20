import { api } from "../constants/api";
import { User, UserLogin } from "../types/quanLyNguoiDungTypes";
import { GROUPID } from "../utils/config";

export const quanLyNguoiDungService = {
  getListUser: () => {
    return api.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUPID}`);
  },

  dangNhap: (thongTinDangNhap: UserLogin) => {
    return api.post("QuanLyNguoiDung/DangNhap", thongTinDangNhap);
  },

  thongTinTaiKhoan: () => {
    return api.post("QuanLyNguoiDung/ThongTinTaiKhoan");
  },
};
