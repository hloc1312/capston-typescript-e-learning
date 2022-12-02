export interface LayDanhSachKhoaHoc {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };
  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
  };
}

export interface LayDanhMucKhoaHoc {
  maDanhMuc: string;
  tenDanhMuc: string;
}

export interface LayDanhSachKhoaHocPhanTrang {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: ArrayLayDanhSachKhoaHocPhanTrang[];
}

interface ArrayLayDanhSachKhoaHocPhanTrang {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };
  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
  };
}

export interface LayKhoaHocTheoDanhMuc {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };
  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
  };
}

export interface LayThongTinKhoaHoc {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  danhGia:string,
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };
  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
  };
}

export interface DangKyKhoaHoc {
  maKhoaHoc: string;
  taiKhoan: string;
}

export interface HuyGhiDanh {
  maKhoaHoc: string;
  taiKhoan: string;
}

export interface ThemKhoaHoc {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  danhGia: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
}
export interface capNhatKhoaHoc{
  maKhoaHoc: string,
  biDanh: string,
  tenKhoaHoc: string,
  moTa: string,
  luotXem: 0,
  danhGia: 0,
  hinhAnh: string,
  maNhom: string,
  ngayTao: string,
  maDanhMucKhoaHoc: string,
  taiKhoanNguoiTao: string
}
export interface danhSachKhoaHoc{
  maKhoaHoc: string,
  biDanh: string,
  tenKhoaHoc: string,
  moTa: string,
  luotXem: 0,
  danhGia: 0,
  hinhAnh: string,
  maNhom: string,
  ngayTao: string,
  maDanhMucKhoaHoc: string,
  taiKhoanNguoiTao: string
}