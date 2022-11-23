export interface User {
  taiKhoan?: string;
  email?: string;
  soDT?: string;
  maNhom?: string;
  aLoaiNguoiDung?: string;
  hoTen?: string;
  accessToken?: string;
}
export interface UserLogin {
  taiKhoan: string;
  matKhau: string;
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
