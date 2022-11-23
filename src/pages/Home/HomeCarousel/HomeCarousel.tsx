import React from "react";
import { Carousel } from "antd";
import ReactPlayer from "react-player";
import "./homeCarousel.css";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
const HomeCarousel = () => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const navigate = useNavigate();
  return (
    <Carousel>
      <div className="introContainer">
        <ReactPlayer
          url="https://www.youtube.com/embed/kcSEsljlges"
          playing={true}
          width="100%"
          height="100%"
          muted={true}
          volume={1}
          loop
          controls={false}
          className="videoIntro"
        />
        <div className="overlay"></div>
        <div className="introInfo text-white select-none">
          <h1 className="heading text-5xl leading-[50px] text-yellow-500 uppercase tracking-wide">
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Khởi đầu sự nghiệp của bạn")
                  .callFunction(() => {
                    //   console.log("String typed out!");
                  })
                  .pauseFor(1000)
                  .deleteAll()
                  .callFunction(() => {
                    //   console.log("All strings were deleted");
                  })
                  .start();
              }}
            />
          </h1>
          <p className="title text-4xl leading-[50px]">
            Học thật, dự án thật, việc làm thật
            <br />
            Trở thành lập trình chuyên nghiệp
            <br />
            tại CyberLearn
          </p>
          <div>
            <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 uppercase"
              onClick={() => navigate(`/course`)}
            >
              Xem khóa học
            </button>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 uppercase">
                tư vấn và đăng ký
              </span>
            </button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
