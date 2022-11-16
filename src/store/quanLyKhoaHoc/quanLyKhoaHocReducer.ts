import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyKhoaHocService } from "../../services/quanLyKhoaHocService";
import {
  LayDanhMucKhoaHoc,
  LayDanhSachKhoaHoc,
} from "../../types/quanLyKhoaHocTypes";

interface InitialState {
  danhSachKhoaHoc?: LayDanhSachKhoaHoc[];
  isFetchingDanhSachKhoaHoc: boolean;
  errDanhSachKhoaHoc: any;

  danhMucKhoaHoc?: LayDanhMucKhoaHoc[];
  isFetchingDanhMucKhoaHoc: boolean;
  errDanhMucKhoaHoc: any;
}

const initialState: InitialState = {
  isFetchingDanhSachKhoaHoc: false,
  errDanhSachKhoaHoc: "",
  isFetchingDanhMucKhoaHoc: false,
  errDanhMucKhoaHoc: "",
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
        });
    },
  });

export const layDanhSachKhoaHoc = createAsyncThunk(
  "quanLyKhoaHoc/layDanhSachKhoaHoc",
  async (tenPhim: string, { rejectWithValue }) => {
    try {
      const result = await quanLyKhoaHocService.layDanhSachKhoaHoc(tenPhim);
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
