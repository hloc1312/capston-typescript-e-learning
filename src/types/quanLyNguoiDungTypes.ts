export interface User {
  taiKhoan?: string;
  email?: string;
  soDT?: string;
  maNhom?: string;
  maLoaiNguoiDung?: string;
  hoTen?: string;
  accessToken?: string;
}
export interface UserLogin {
  taiKhoan: string;
  matKhau: string;
}
export interface DanhSachNguoiDung {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  matKhau: string;
  maLoaiNguoiDung: string;
}
export interface LoaiNguoiDung {
  maLoaiNguoiDung: string;
  tenLoai: string;
}
export interface ThemNguoiDung {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
}
export interface CapNhatNguoiDung {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
}
export interface ThongTinTaiKhoan {
  chiTietKhoaHocGhiDanh: ChiTietKhoaHocGhiDanh[];
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

interface ChiTietKhoaHocGhiDanh {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: string;
  danhGia: number;
}

export interface CapNhatThongTinNguoiDung {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}