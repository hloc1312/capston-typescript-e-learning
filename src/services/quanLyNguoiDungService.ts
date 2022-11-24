import { api } from "../constants/api";
import {
  ThemNguoiDung,
  User,
  UserLogin,
  CapNhatNguoiDung,
} from "../types/quanLyNguoiDungTypes";
import { GROUPID } from "../utils/config";

export const quanLyNguoiDungService = {
  getListUser: () => {
    return api.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUPID}`);
  },

  dangNhap: (thongTinDangNhap: UserLogin) => {
    return api.post("QuanLyNguoiDung/DangNhap", thongTinDangNhap);
  },
  layDanhSachNguoiDung: (timKiem: string = "") => {
    if (timKiem.trim() === "") {
      return api.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`);
    }
    return api.get(
      `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${timKiem}`
    );
  },
  xoaNguoiDung: (taiKhoan: string) => {
    return api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  },
  layDanhSachLoaiNguoiDung: () => {
    return api.get("QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  },
  themNguoiDung: (themNguoiDung: ThemNguoiDung) => {
    return api.post(`QuanLyNguoiDung/ThemNguoiDung`, themNguoiDung);
  },
  capNhatThongTinNguoiDungAdmin: (thongTinNguoiDung: CapNhatNguoiDung) => {
    return api.post(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      thongTinNguoiDung
    );
  },
};
