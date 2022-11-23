import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungService } from "../../services/quanLyNguoiDungService";
import {
  CapNhatThongTinNguoiDung,
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
  // isFetchingRegister: boolean;
  // errRegister: any;
  // isFetchingCapNhat: boolean;
  // errCapNhat: any;
  // danhSachNguoiDung: DanhSachNguoiDung[];
  // isFetchingDSNguoiDung: boolean;
  errDSNguoiDung: any;
  // isFetchingXoaNguoiDung: boolean;
  // errXoaNguoiDung: any;
  // isFetchingThemNguoiDung: boolean;
  // errThemNguoiDung: any;
  // // isFetchingCapNhatNguoiDungAdmin: boolean;
  // // errCapNhatNguoiDungAdmin: any;

  thongTinTaiKhoan?: ThongTinTaiKhoan;
  isFetchingThongTinTaiKhoan: boolean;
  errThongTinTaiKhoan: any;

  isFetchingCapNhatThongTinNguoiDung: boolean;
  errCapNhatThongTinNguoiDung: any;
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
  //   isFetchingRegister: false,
  //   errRegister: "",
  //   isFetchingCapNhat: false,
  //   errCapNhat: "",
  //   isFetchingDSNguoiDung: false,
  errDSNguoiDung: "",
  isFetchingThongTinTaiKhoan: false,
  errThongTinTaiKhoan: "",
  isFetchingCapNhatThongTinNguoiDung: false,
  errCapNhatThongTinNguoiDung: "",

  //     danhSachNguoiDung: [
  //     {
  //       taiKhoan: "test1312",
  //       hoTen: "hello1312",
  //       email: "abcHello13121@gmail.com",
  //       soDT: "0909123123",
  //       matKhau: "1312",
  //       maLoaiNguoiDung: "QuanTri",
  //     },
  //   ],
};
//   isFetchingXoaNguoiDung: false,
//   errXoaNguoiDung: "",
//   isFetchingThemNguoiDung: false,
//   errThemNguoiDung: "",
//   isFetchingCapNhatNguoiDungAdmin: false,
//   errCapNhatNguoiDungAdmin: "",

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
