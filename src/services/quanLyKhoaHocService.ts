import { api } from "../constants/api";
import { GROUPID } from "../utils/config";

export const quanLyKhoaHocService = {
  layDanhSachKhoaHoc: (tenKhoaHoc: string = "") => {
    if (tenKhoaHoc === "") {
      return api.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${GROUPID}`);
    }
    return api.get(
      `QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=${GROUPID}`
    );
  },

  layDanhMucKhoaHoc: () => {
    return api.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
};
