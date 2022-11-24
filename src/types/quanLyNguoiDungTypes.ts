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