import gsap from "gsap";
import React, { SVGProps, useEffect, useLayoutEffect, useRef } from "react";
import Vector from "../../../assets/Icons/Vector";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./roadMap.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "../../../store/configStore";
import { layDanhMucKhoaHoc } from "../../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";
import { NavLink } from "react-router-dom";
const RoadMap = () => {
  const { danhMucKhoaHoc } = useSelector(
    (state: RootState) => state.quanLyKhoaHocReducer
  );

  const dispatch = useAppDispath();
  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useLayoutEffect(() => {
    let element = ref.current;
    let svg: any = document.getElementById("svg-path");

    const length = svg?.getTotalLength();

    svg!.style.strokeDasharray = JSON.stringify(length);
    // //hide svg before scrolling start
    svg!.style.strokeDashoffset = JSON.stringify(length);

    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom bottom",
        onUpdate: (self) => {
          //   console.log(self);
          const draw = Number(length) * self.progress;
          svg!.style.strokeDashoffset = JSON.stringify(Number(length) - draw);
        },
      },
    });
  }, []);

  useEffect(() => {
    dispatch(layDanhMucKhoaHoc());
  }, []);

  return (
    <div className="RoadMap relative py-8">
      <h1 className="text-2xl flex justify-center items-center w-fit uppercase mx-auto my-4 border-b-2 pb-2 border-black border-solid ">
        Lộ trình học
      </h1>
      <div className="RoadMap-container relative w-[70%] h-[200vh] mx-auto flex justify-center items-center">
        <div className="RoadMap-sgvContainer flex justify-center items-center">
          <div
            className="RoadMap-drawSvg absolute top-2 left-[50%] w-full h-full overflow-hidden "
            ref={ref}
            style={{ transform: "translateX(-50%)" }}
          >
            <div
              className="RoadMap-ball w-6 h-6 absolute bg-black left-[50%] rounded-full"
              style={{ transform: "translateX(-50%)" }}
            ></div>
            <Vector className="mx-auto" />
          </div>
        </div>
        <ul className="RoadMap-items list-none w-full h-full flex justify-center items-center flex-col ">
          <li className="flex w-full h-full">&nbsp;</li>
          {danhMucKhoaHoc?.map((item) => {
            return (
              <li className="flex w-full h-full" key={item.maDanhMuc}>
                <div
                  className="Item-container w-[40%] h-fit p-4"
                  style={{ border: "3px solid rgb(254 240 138)" }}
                >
                  <div
                    className="box h-fit bg-yellow-500 text-white p-4 relative "
                    style={{ border: "1px solid #fff" }}
                  >
                    <span className="subText block text-3xl capitalize ">
                      {item.tenDanhMuc}
                    </span>
                    <span className="text  block text-2xl capitalize my-2">
                      {item.tenDanhMuc}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-2 text-center">
        <NavLink
          to="/course"
          className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 inline-block text-center"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease" />
          <span className="relative">Xem khóa học</span>
        </NavLink>
      </div>
    </div>
  );
};

export default RoadMap;
