import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "../../store/configStore";
import { layDanhSachKhoaHoc } from "../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
import HomeCountUp from "./HomeCountUp/HomeCountUp";
import HomeMenu from "./HomeMenu/HomeMenu";
import RoadMap from "./RoadMap/RoadMap";

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
      <HomeCountUp />
      <RoadMap />
    </div>
  );
};

export default Home;
