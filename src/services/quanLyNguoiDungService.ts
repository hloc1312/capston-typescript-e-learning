import { api } from "../constants/api";
import {
  User,
  UserLogin,

} from "../types/quanLyNguoiDungTypes";
import { GROUPID } from "../utils/config";

export const quanLyNguoiDungService = {
  getListUser: () => {
    return api.get<HttpResponse<User[]>>(
      `QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUPID}`
    );
  },

  dangNhap: (thongTinDangNhap: UserLogin) => {
    return api.post<HttpResponse<User>>(
      "QuanLyNguoiDung/DangNhap",
      thongTinDangNhap
    );
  },
}