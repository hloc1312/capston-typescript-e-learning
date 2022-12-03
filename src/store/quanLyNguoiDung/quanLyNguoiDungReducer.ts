import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";
import { quanLyNguoiDungService } from "../../services/quanLyNguoiDungService";
import {
  arrDanhSachNguoiDung,
  CapNhatNguoiDung,
  CapNhatThongTinNguoiDung,
  DanhSachNguoiDung,
  ThemNguoiDung,
  ThongTinTaiKhoan,
  User,
  UserLogin,
} from "../../types/quanLyNguoiDungTypes";
import { TOKEN, USER_LOGIN } from "../../utils/config";
let userLocalStorage = {};
interface InitialState {
  user?: User;
  isFetching: boolean;
  err: any;
  // thongTinNguoiDung?: GetThongTinNguoiDung;
  isFetchingThongTinNguoiDung: boolean;
  errThongTinNguoiDung: any;
  isFetchingRegister: boolean;
  errRegister: any;
  isFetchingCapNhat: boolean;
  errCapNhat: any;
  danhSachNguoiDung: DanhSachNguoiDung[];
  isFetchingDSNguoiDung: boolean;
  errDSNguoiDung: any;
  isFetchingXoaNguoiDung: boolean;
  errXoaNguoiDung: any;
  isFetchingThemNguoiDung: boolean;
  errThemNguoiDung: any;
  isFetchingCapNhatNguoiDungAdmin: boolean;
  errCapNhatNguoiDungAdmin: any;
  thongTinTaiKhoan?: ThongTinTaiKhoan;
  isFetchingThongTinTaiKhoan: boolean;
  errThongTinTaiKhoan: any;

  isFetchingCapNhatThongTinNguoiDung: boolean;
  errCapNhatThongTinNguoiDung: any;
  arrDanhSachNguoiDung: arrDanhSachNguoiDung[];
  isFetchingArrDanhSachNguoiDung: boolean;
  errArrDanhSachNguoiDung: any;
  isFetchingCapNhatAdmin: boolean;
  errCapNhatAdmin: any;
}
if (localStorage.getItem(USER_LOGIN)) {
  userLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN) as string);
}
const initialState: InitialState = {
  err: "",
  isFetching: false,
  user: userLocalStorage,
  errThongTinNguoiDung: "",
  isFetchingThongTinNguoiDung: false,

  isFetchingCapNhat: false,
  errCapNhat: "",
  isFetchingDSNguoiDung: false,
  errDSNguoiDung: "",

  isFetchingXoaNguoiDung: false,
  errXoaNguoiDung: "",
  isFetchingThemNguoiDung: false,
  errThemNguoiDung: "",
  isFetchingCapNhatNguoiDungAdmin: false,
  errCapNhatNguoiDungAdmin: "",
  isFetchingRegister: false,
  errRegister: "",
  isFetchingThongTinTaiKhoan: false,
  errThongTinTaiKhoan: "",
  isFetchingCapNhatThongTinNguoiDung: false,
  errCapNhatThongTinNguoiDung: "",
  arrDanhSachNguoiDung: [
    {
      taiKhoan: "123",
      hoTen: "phongggg",
      email: "asdfasdf@gmail.com",
      soDt: "0926999351",
      maLoaiNguoiDung: "GV",
    },
  ],
  danhSachNguoiDung: [
    {
      taiKhoan: "17211quang",
      hoTen: "Kiet123",
      email: "hienkiet@gmail.com",
      soDt: "0326543543",
      matKhau: "Dragon123",
      maLoaiNguoiDung: "HV",
      tenLoaiNguoiDung: "Học viên",
    },
  ],
  isFetchingArrDanhSachNguoiDung: false,
  errArrDanhSachNguoiDung: "",
  isFetchingCapNhatAdmin: false,
  errCapNhatAdmin: "",
};

export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungActions,
} = createSlice({
  initialState,
  name: "quanLyNguoiDung",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        const thongTinDangNhap = action.payload;
        localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
        localStorage.setItem(
          TOKEN,
          JSON.stringify(action.payload?.accessToken)
        );
        state.isFetching = false;
        state.user = action.payload;
        state.err = "";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isFetching = false;
        state.err = action.payload;
      })

      // ThongTinTaiKhoan
      .addCase(thongTinTaiKhoanActions.pending, (state, action) => {
        state.isFetchingThongTinTaiKhoan = true;
      })
      .addCase(thongTinTaiKhoanActions.fulfilled, (state, action) => {
        state.isFetchingThongTinTaiKhoan = false;
        state.thongTinTaiKhoan = action.payload;
      })
      .addCase(thongTinTaiKhoanActions.rejected, (state, action) => {
        state.isFetchingThongTinTaiKhoan = false;
        state.errThongTinTaiKhoan = action.payload;
      })
      // CapNhatThongTinNguoiDung
      .addCase(capNhatThongTinNguoiDungActions.pending, (state, action) => {
        state.isFetchingCapNhatThongTinNguoiDung = true;
      })
      .addCase(capNhatThongTinNguoiDungActions.fulfilled, (state, action) => {
        state.isFetchingCapNhatThongTinNguoiDung = false;
        state.errCapNhatThongTinNguoiDung = "";
      })
      .addCase(capNhatThongTinNguoiDungActions.rejected, (state, action) => {
        state.isFetchingCapNhatThongTinNguoiDung = false;
        state.errCapNhatThongTinNguoiDung = action.payload;
      })
      // arrDanhSachNguoiDung
      .addCase(danhSachNguoiDungAction.pending, (state, action) => {
        state.isFetchingArrDanhSachNguoiDung = true;
      })
      .addCase(danhSachNguoiDungAction.fulfilled, (state, action) => {
        state.isFetchingArrDanhSachNguoiDung = false;
        state.arrDanhSachNguoiDung = action.payload;
      })
      .addCase(danhSachNguoiDungAction.rejected, (state, action) => {
        state.isFetchingArrDanhSachNguoiDung = false;
        state.errArrDanhSachNguoiDung = action.payload;
      })
      // TÌm kiếm người dùng
      .addCase(timKiemNguoiDungAcTion.pending, (state, action) => {
        state.isFetchingDSNguoiDung = true;
      })
      .addCase(timKiemNguoiDungAcTion.fulfilled, (state, action) => {
        state.isFetchingDSNguoiDung = false;
        state.danhSachNguoiDung = action.payload;
      })
      .addCase(timKiemNguoiDungAcTion.rejected, (state, action) => {
        state.isFetchingDSNguoiDung = false;
        state.errArrDanhSachNguoiDung = action.payload;
      })
      // thêm người dùng
      .addCase(themNguoiDung.pending, (state, action) => {
        state.isFetchingThemNguoiDung = true;
      })
      .addCase(themNguoiDung.fulfilled, (state, action) => {
        state.isFetchingThemNguoiDung = false;
        state.errThemNguoiDung = "";
      })
      .addCase(themNguoiDung.rejected, (state, action) => {
        state.isFetchingThemNguoiDung = false;
        state.errThemNguoiDung = action.payload;
      })
      // cập nhật người dùng
      .addCase(capNhatNguoiDungAdmin.pending, (state, action) => {
        state.isFetchingCapNhatAdmin = true;
      })
      .addCase(capNhatNguoiDungAdmin.fulfilled, (state, action) => {
        state.isFetchingCapNhatAdmin = false;
        state.errCapNhatAdmin = "";
      })
      .addCase(capNhatNguoiDungAdmin.rejected, (state, action) => {
        state.isFetchingCapNhatAdmin = false;
        state.errCapNhatAdmin = action.payload;
      });
  },
  //     initialState,
  //   name: "quanLyNguoiDung",
  //   reducers: {},
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(userLogin.pending, (state, action) => {
  //         state.isFetching = true;
  //       })
  //       .addCase(userLogin.fulfilled, (state, action) => {
  //         const thongTinDangNhap = action.payload;
  //         localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
  //         localStorage.setItem(
  //           TOKEN,
  //           JSON.stringify(action.payload?.accessToken)
  //         );
  //         state.isFetching = false;
  //         state.user = action.payload;
  //         state.err = "";
  //       })
  //       .addCase(userLogin.rejected, (state, action) => {
  //         state.isFetching = false;
  //         state.err = action.payload;
  //       })
});
export const userLogin = createAsyncThunk(
  "quanLyNguoiDung/userLogin",
  async (
    thongTinDangNhap: UserLogin,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const danhSachNguoiDungAction = createAsyncThunk(
  "quanLyNguoiDung/DanhSachNguoiDung",
  async (timKiem: string, { rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(timKiem);
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const xoaNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/xoaNguoiDung",
  async (taiKhoan: string, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      dispatch(timKiemNguoiDungAcTion(""));
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const themNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/themNguoiDung",
  async (themNguoiDung: ThemNguoiDung, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(themNguoiDung);
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const capNhatNguoiDungAdmin = createAsyncThunk(
  "quanLyNguoiDung/capNhatNguoiDungAdmin",
  async (
    thongTinNguoiDung: CapNhatNguoiDung,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDungAdmin(
        thongTinNguoiDung
      );
      dispatch(danhSachNguoiDungAction(""));
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const thongTinTaiKhoanActions = createAsyncThunk(
  "quanLyNguoiDung/thongTinTaiKhoan",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.thongTinTaiKhoan();
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const capNhatThongTinNguoiDungActions = createAsyncThunk(
  "quanLyNguoiDung/capNhatThongTinNguoiDung",
  async (
    data: CapNhatThongTinNguoiDung,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        data
      );
      dispatch(thongTinTaiKhoanActions());
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const timKiemNguoiDungAcTion = createAsyncThunk(
  "quanLyNguoiDung/timKiemNguoiDung",
  async (data: string, { rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.timKiemNguoiDung(data);
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);
