import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungService } from "../../services/quanLyNguoiDungService";
import { User, UserLogin } from "../../types/quanLyNguoiDungTypes";
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
