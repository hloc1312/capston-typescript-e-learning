import { api } from "../constants/api";
import {
  DangKyKhoaHoc,
  HuyGhiDanh,
  ThemKhoaHoc,
} from "../types/quanLyKhoaHocTypes";
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

  layDanhSachKhoaHocPhanTrang: (page: number, pageSize: number) => {
    return api.get(
      `QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${page}&pageSize=${pageSize}&MaNhom=${GROUPID}`
    );
  },

  layKhoaHocTheoDanhMuc: (maDanhMuc: string) => {
    return api.get(
      `QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${GROUPID}`
    );
  },

  layThongTinKhoaHoc: (maKhoaHoc: string) => {
    return api.get(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
  },

  dangKyKhoaHoc: (dangKyKhoaHoc: DangKyKhoaHoc) => {
    return api.post("QuanLyKhoaHoc/DangKyKhoaHoc", dangKyKhoaHoc);
  },

  huyGhiDanh: (huyGhiDanh: HuyGhiDanh) => {
    return api.post(`QuanLyKhoaHoc/HuyGhiDanh`, huyGhiDanh);
  },
  xoaKhoaHoc: (maKhoaHoc: string) => {
    return api.delete(`QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`);
  },
  themKhoaHocUploadHinh: (formData: ThemKhoaHoc) => {
    return api.post(`QuanLyKhoaHoc/ThemKhoaHoc`, formData);
  },
  capNhatKhoaHocUpload: (formData: FormData) => {
    return api.post(`QuanLyKhoaHoc/CapNhatKhoaHocUpload`, formData);
  },

  uploadHinhAnhKhoaHoc: (formData: FormData) => {
    return api.post(`QuanLyKhoaHoc/UploadHinhAnhKhoaHoc`, formData);
  },
};
