import React from "react";
import CountUp, { useCountUp } from "react-countup";
import ReactPlayer from "react-player";
import backGround from "../../../assets/images/bg-count-up.png";
import backGroundFixed from "../../../assets/images/bg-fixed-count-up.jpg";
const HomeCountUp = () => {
  return (
    <div className="HomeCountUp py-8 mb-12">
      <div className="bg-[#ecf0f3]">
        <div
          className="h-[200px] flex items-center"
          style={{
            backgroundImage: `url(${backGround})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "scroll",
          }}
        >
          <div className="flex justify-between items-center container mx-auto px-4">
            <span className="text-center ">
              <CountUp
                enableScrollSpy={true}
                duration={2}
                end={5014}
                className="font-bold text-5xl mb-4 inline-block text-yellow-500"
              />
              <span className="block text-3xl">Khóa học & video</span>
            </span>
            <span className="text-center ">
              <CountUp
                enableScrollSpy={true}
                duration={2}
                end={3890}
                className="font-bold text-5xl mb-4 inline-block text-yellow-500"
              />
              <span className="block text-3xl">Học viên offline</span>
            </span>
            <span className="text-center ">
              <CountUp
                enableScrollSpy={true}
                duration={2}
                end={15}
                className="font-bold text-5xl mb-4 inline-block text-yellow-500"
              />
              <span className="block text-3xl">Năm kinh nghiệm</span>
            </span>
            <span className="text-center ">
              <CountUp
                enableScrollSpy={true}
                duration={2}
                end={54}
                className="font-bold text-5xl mb-4 inline-block text-yellow-500"
              />
              <span className="block text-3xl">Đối tác</span>
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${backGroundFixed})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          transform: "translate3d(0px, 1px, 0px)",
          backgroundAttachment: "fixed",
        }}
        className="py-[100px]"
      >
        <h1
          className="text-3xl uppercase text-center py-8 text-yellow-500 tracking-wider"
          style={{ textShadow: "2px 2px 6px #222" }}
        >
          Học viên nói gì về CYBERLEARN
        </h1>
        <div className="flex justify-center">
          <ReactPlayer
            controls={true}
            url={"https://www.youtube.com/embed/686mNAJVXzA"}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeCountUp;
