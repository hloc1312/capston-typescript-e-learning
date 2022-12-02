import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyKhoaHocService } from "../../services/quanLyKhoaHocService";
import {
  DangKyKhoaHoc,
  HuyGhiDanh,
  LayDanhMucKhoaHoc,
  LayDanhSachKhoaHoc,
  LayDanhSachKhoaHocPhanTrang,
  LayKhoaHocTheoDanhMuc,
  LayThongTinKhoaHoc,
  ThemKhoaHoc,
} from "../../types/quanLyKhoaHocTypes";
import { thongTinTaiKhoanActions } from "../quanLyNguoiDung";

interface InitialState {
  danhSachKhoaHoc?: LayDanhSachKhoaHoc[];
  isFetchingDanhSachKhoaHoc: boolean;
  errDanhSachKhoaHoc: any;
  danhMucKhoaHoc?: LayDanhMucKhoaHoc[];
  isFetchingDanhMucKhoaHoc: boolean;
  errDanhMucKhoaHoc: any;
  danhSachKhoaHocPhanTrang?: LayDanhSachKhoaHocPhanTrang;
  isFetchingDanhSachKhoaHocPhanTrang: boolean;
  errDanhSachKhoaHocPhanTrang: any;
  danhSachKhoaHocTheoDanhMuc?: LayKhoaHocTheoDanhMuc[];
  isFetchingDanhSachKhoaHocTheoDanhMuc: boolean;
  errDanhSachKhoaHocTheoDanhMuc: any;
  thongTinKhoaHoc?: LayThongTinKhoaHoc;
  isFetchingThongTinKhoaHoc: boolean;
  errThongTinKhoaHoc: any;
  isFetchingDangKyKhoaHoc: boolean;
  errDangKyKhoaHoc: any;
  isFetchingHuyGhiDanh: boolean;
  errHuyGhiDanh: any;
  isFetchingKhoaHoc: boolean;
  errThemKhoaHoc: any;
  isFetchingUploadKhoaHoc: boolean;
  errUploadKhoaHoc: any;
  isFetchingXoaKhoaHoc: boolean;
  errXoaKhoaHoc: any;
  isFetchingCapNhapKhoaHoc: boolean;
  errCapNhatKhoaHoc: any;
  isFetchingThemKhoaHoc: boolean;

  isFetchingUploadHinhAnhCapNhat: boolean;
  errUploadHinhAnhCapNhat: any;
}

const initialState: InitialState = {
  isFetchingDanhSachKhoaHoc: false,
  errDanhSachKhoaHoc: "",
  isFetchingDanhMucKhoaHoc: false,
  errDanhMucKhoaHoc: "",
  isFetchingDanhSachKhoaHocPhanTrang: false,
  errDanhSachKhoaHocPhanTrang: "",

  isFetchingDanhSachKhoaHocTheoDanhMuc: false,
  errDanhSachKhoaHocTheoDanhMuc: "",

  isFetchingThongTinKhoaHoc: false,
  errThongTinKhoaHoc: "",

  isFetchingDangKyKhoaHoc: false,
  errDangKyKhoaHoc: "",

  isFetchingHuyGhiDanh: false,
  errHuyGhiDanh: "",
  isFetchingKhoaHoc: false,
  isFetchingThemKhoaHoc: false,

  errThemKhoaHoc: "",
  isFetchingUploadKhoaHoc: false,
  errUploadKhoaHoc: "",
  isFetchingXoaKhoaHoc: false,
  errXoaKhoaHoc: "",
  isFetchingCapNhapKhoaHoc: false,
  errCapNhatKhoaHoc: "",

  isFetchingUploadHinhAnhCapNhat: false,
  errUploadHinhAnhCapNhat: "",
};
export const { reducer: quanLyKhoaHocReducer, actions: quanLyKhoaHocAction } =
  createSlice({
    initialState,
    name: "quanLyKhoaHoc",
    reducers: {},
    extraReducers: (builder) => {
      builder
        // layDanhSachKhoaHoc
        .addCase(layDanhSachKhoaHoc.pending, (state, action) => {
          state.isFetchingDanhSachKhoaHoc = true;
        })
        .addCase(layDanhSachKhoaHoc.fulfilled, (state, action) => {
          state.isFetchingDanhSachKhoaHoc = false;
          state.danhSachKhoaHoc = action.payload;
        })
        .addCase(layDanhSachKhoaHoc.rejected, (state, action) => {
          state.isFetchingDanhSachKhoaHoc = false;
          state.errDanhSachKhoaHoc = action.payload;
        })
        // layDanhMucKhoaHoc
        .addCase(layDanhMucKhoaHoc.pending, (state, action) => {
          state.isFetchingDanhMucKhoaHoc = true;
        })
        .addCase(layDanhMucKhoaHoc.fulfilled, (state, action) => {
          state.isFetchingDanhMucKhoaHoc = false;
          state.danhMucKhoaHoc = action.payload;
        })
        .addCase(layDanhMucKhoaHoc.rejected, (state, action) => {
          state.isFetchingDanhMucKhoaHoc = false;
          state.errDanhMucKhoaHoc = action.payload;
        })
        // layDanhSachKhoaHocPhanTrang
        .addCase(layDanhSachKhoaHocPhanTrang.pending, (state, action) => {
          state.isFetchingDanhSachKhoaHocPhanTrang = true;
        })
        .addCase(layDanhSachKhoaHocPhanTrang.fulfilled, (state, action) => {
          state.isFetchingDanhSachKhoaHocPhanTrang = false;
          state.danhSachKhoaHocPhanTrang = action.payload;
        })
        .addCase(layDanhSachKhoaHocPhanTrang.rejected, (state, action) => {
          state.isFetchingDanhSachKhoaHocPhanTrang = false;
          state.errDanhSachKhoaHocPhanTrang = action.payload;
        })
        // layDanhSachKhoaHocTheoDanhMuc
        .addCase(layDanhSachKhoaHocTheoDanhMuc.pending, (state, action) => {
          state.isFetchingDanhSachKhoaHocTheoDanhMuc = true;
        })
        .addCase(layDanhSachKhoaHocTheoDanhMuc.fulfilled, (state, action) => {
          state.isFetchingDanhSachKhoaHocTheoDanhMuc = false;
          state.danhSachKhoaHocTheoDanhMuc = action.payload;
        })
        .addCase(layDanhSachKhoaHocTheoDanhMuc.rejected, (state, action) => {
          state.isFetchingDanhSachKhoaHocTheoDanhMuc = false;
          state.errDanhSachKhoaHocTheoDanhMuc = action.payload;
        })
        // layThongTinKhoaHoc
        .addCase(layThongTinKhoaHoc.pending, (state, action) => {
          state.isFetchingThongTinKhoaHoc = true;
        })
        .addCase(layThongTinKhoaHoc.fulfilled, (state, action) => {
          state.isFetchingThongTinKhoaHoc = false;
          state.thongTinKhoaHoc = action.payload;
        })
        .addCase(layThongTinKhoaHoc.rejected, (state, action) => {
          state.isFetchingThongTinKhoaHoc = false;
          state.errThongTinKhoaHoc = action.payload;
        })
        // dangKyKhoaHoc
        .addCase(dangKyKhoaHoc.pending, (state, action) => {
          state.isFetchingDangKyKhoaHoc = true;
        })
        .addCase(dangKyKhoaHoc.fulfilled, (state, action) => {
          state.isFetchingDangKyKhoaHoc = false;
        })
        .addCase(dangKyKhoaHoc.rejected, (state, action) => {
          state.isFetchingDangKyKhoaHoc = false;
          state.errDangKyKhoaHoc = action.payload;
        })
        // huyGhiDanh
        .addCase(huyGhiDanhAction.pending, (state, action) => {
          state.isFetchingHuyGhiDanh = true;
        })
        .addCase(huyGhiDanhAction.fulfilled, (state, action) => {
          state.isFetchingHuyGhiDanh = false;
        })
        .addCase(huyGhiDanhAction.rejected, (state, action) => {
          state.isFetchingHuyGhiDanh = false;
          state.errHuyGhiDanh = action.payload;
        })
        //xóa khóa học
        .addCase(xoaKhoaHoc.pending, (state, action) => {
          state.isFetchingXoaKhoaHoc = true;
        })
        .addCase(xoaKhoaHoc.fulfilled, (state, action) => {
          state.isFetchingXoaKhoaHoc = false;
        })
        .addCase(xoaKhoaHoc.rejected, (state, action) => {
          state.isFetchingXoaKhoaHoc = false;
          state.errXoaKhoaHoc = action.payload;
        })
        //Cập nhật khóa học
        .addCase(capNhatKhoaHocUpload.pending, (state, action) => {
          state.isFetchingCapNhapKhoaHoc = true;
        })
        .addCase(capNhatKhoaHocUpload.fulfilled, (state, action) => {
          state.isFetchingCapNhapKhoaHoc = false;
        })
        .addCase(capNhatKhoaHocUpload.rejected, (state, action) => {
          state.isFetchingCapNhapKhoaHoc = false;
          state.errCapNhatKhoaHoc = action.payload;
        })
        //thêm khóa học
        .addCase(themKhoaHocUploadHinh.pending, (state, action) => {
          state.isFetchingThemKhoaHoc = true;
        })
        .addCase(themKhoaHocUploadHinh.fulfilled, (state, action) => {
          state.isFetchingThemKhoaHoc = false;
          state.errThemKhoaHoc = "";
        })
        .addCase(themKhoaHocUploadHinh.rejected, (state, action) => {
          state.isFetchingThemKhoaHoc = false;
          state.errThemKhoaHoc = action.payload;
        })
        //upload hình khóa học
        .addCase(uploadHinhAnhAction.pending, (state, action) => {
          state.isFetchingUploadHinhAnhCapNhat = true;
        })
        .addCase(uploadHinhAnhAction.fulfilled, (state, action) => {
          state.isFetchingUploadHinhAnhCapNhat = false;
          state.errUploadHinhAnhCapNhat = "";
        })
        .addCase(uploadHinhAnhAction.rejected, (state, action) => {
          state.isFetchingUploadHinhAnhCapNhat = false;
          state.errUploadHinhAnhCapNhat = action.payload;
        });
    },
  });

export const layDanhSachKhoaHoc = createAsyncThunk(
  "quanLyKhoaHoc/layDanhSachKhoaHoc",
  async (tenKhoaHoc: string, { rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.layDanhSachKhoaHoc(tenKhoaHoc);
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const layDanhMucKhoaHoc = createAsyncThunk(
  "quanLyKhoaHoc/layDanhMucKhoaHoc",
  async (data, { rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.layDanhMucKhoaHoc();
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const layDanhSachKhoaHocPhanTrang = createAsyncThunk(
  "quanLyKhoaHoc/layDanhSachKhoaHocPhanTrang",
  async (
    { page, pageSize }: { page: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const result = await quanLyKhoaHocService.layDanhSachKhoaHocPhanTrang(
        page,
        pageSize
      );
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const layDanhSachKhoaHocTheoDanhMuc = createAsyncThunk(
  "quanLyKhoaHoc/layDanhSachKhoaHocTheoDanhMuc",
  async (danhMuc: string, { rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.layKhoaHocTheoDanhMuc(danhMuc);
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const layThongTinKhoaHoc = createAsyncThunk(
  "quanLyKhoaHoc/layThongTinKhoaHoc",
  async (maKhoaHoc: string, { rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.layThongTinKhoaHoc(maKhoaHoc);
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const dangKyKhoaHoc = createAsyncThunk(
  "quanLyKhoaHoc/dangKyKhoaHoc",
  async (data: DangKyKhoaHoc, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.dangKyKhoaHoc(data);
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const huyGhiDanhAction = createAsyncThunk(
  "quanLyKhoaHoc/huyGhiDanh",
  async (huyGhiDanh: HuyGhiDanh, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.huyGhiDanh(huyGhiDanh);
      dispatch(thongTinTaiKhoanActions());
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
// export const getListCourse=createAsyncThunk(
//   "quanLyKhoaHoc/getListCourse",
//   async (tenKhoaHoc: string, { dispatch, getState, rejectWithValue }) => {
//     try {
//       const result = await quanLyKhoaHocService.layDanhSachKhoaHoc(tenKhoaHoc);
//       return result.data.content;
//     } catch (err: any) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// )
export const themKhoaHocUploadHinh = createAsyncThunk(
  "quanLyKhoaHoc/themKhoaHocUploadHinh",
  async (formData: ThemKhoaHoc, { rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.themKhoaHocUploadHinh(formData);
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const capNhatKhoaHocUpload = createAsyncThunk(
  "quanLyKhoaHoc/capNhatKhoaHocUpload",
  async (formData: FormData, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.capNhatKhoaHocUpload(formData);
      await dispatch(layDanhSachKhoaHoc(""));
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const xoaKhoaHoc = createAsyncThunk(
  "quanLyKhoaHoc/xoaKhoaHoc",
  async (maKhoaHoc: string, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.xoaKhoaHoc(maKhoaHoc);
      dispatch(layDanhSachKhoaHoc(""));
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const uploadHinhAnhAction = createAsyncThunk(
  "quanLyKhoaHoc/uploadHinhAnh",
  async (formData: FormData, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.uploadHinhAnhKhoaHoc(formData);
      dispatch(layDanhSachKhoaHoc(""));
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
