import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "../../store/configStore";
import { layDanhSachKhoaHoc } from "../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
import HomeMenu from "./HomeMenu/HomeMenu";

const Home = () => {
  const { danhSachKhoaHoc } = useSelector((state: RootState) => {
    return state.quanLyKhoaHocReducer;
  });

  const dispatch = useAppDispath();
  useEffect(() => {
    dispatch(layDanhSachKhoaHoc(""));
  }, []);
  return (
    <div>
      <HomeCarousel />
      <HomeMenu danhSachKhoaHoc={danhSachKhoaHoc} />
    </div>
  );
};

export default Home;
