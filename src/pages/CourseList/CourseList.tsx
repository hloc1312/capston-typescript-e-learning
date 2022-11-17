import React, { useEffect, useState } from "react";
import { MenuProps, Pagination, Skeleton } from "antd";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "../../store/configStore";
import {
  layDanhMucKhoaHoc,
  layDanhSachKhoaHoc,
  layDanhSachKhoaHocPhanTrang,
  layDanhSachKhoaHocTheoDanhMuc,
} from "../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";
import CardCourseListAll from "../../components/Molecules/CardCourseListAll/CardCourseListAll";
import CardCourseListDetail from "../../components/Molecules/CardCourseListDetail/CardCourseListDetail";
const CourseList = () => {
  const {
    danhMucKhoaHoc,
    danhSachKhoaHocPhanTrang,
    danhSachKhoaHocTheoDanhMuc,
    isFetchingDanhSachKhoaHocPhanTrang,
    isFetchingDanhSachKhoaHocTheoDanhMuc,
  } = useSelector((state: RootState) => state.quanLyKhoaHocReducer);
  const dispatch = useAppDispath();

  const [searchParams, setSearchParams] = useSearchParams({
    maDanhMuc: "",
    page: "1",
    pageSize: "12",
  });

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [pageSize, setPageSize] = useState(12);
  const arrayDanhMucKhoaHoc = danhMucKhoaHoc?.map((danhMuc) => ({
    label: (
      <button
        onClick={() => {
          setSearchParams({
            maDanhMuc: danhMuc.maDanhMuc,
          });
          dispatch(layDanhSachKhoaHocTheoDanhMuc(danhMuc.maDanhMuc));
        }}
      >
        {danhMuc.tenDanhMuc}
      </button>
    ),

    key: danhMuc.maDanhMuc,
  }));

  const items: MenuProps["items"] = arrayDanhMucKhoaHoc?.concat([
    {
      label: (
        <button
          onClick={() =>
            setSearchParams({
              maDanhMuc: "TatCaKhoaHoc",
            })
          }
        >
          Tất cả khóa học
        </button>
      ),
      key: "none",
    },
  ]);

  const renderDanhSachKhoaHoc = () => {
    return danhSachKhoaHocPhanTrang?.items.map((item) => (
      <CardCourseListAll khoaHoc={item} key={item.maKhoaHoc} />
    ));
  };

  const renderDanhSachKhoaHocTheoDanhMuc = () => {
    return danhSachKhoaHocTheoDanhMuc?.map((khoaHoc) => {
      return <CardCourseListDetail khoaHoc={khoaHoc} key={khoaHoc.maKhoaHoc} />;
    });
  };

  const renderLoading = () => {
    return (
      <div className="flex flex-wrap">
        {[...Array(12)].map((e, index) => {
          return (
            <div
              className="card-wrapper w-1/4 p-2 box-border relative"
              key={index}
            >
              <div className="card rounded-lg h-full border-[1px] border-[rgba(0, 0, 0, 0.125)] rounded-sm border-solid">
                <div className="card-img-wrapper ">
                  <div className="card-img w-full pt-[100%] relative">
                    <Skeleton.Image
                      active={true}
                      className="object-fill align-bottom absolute top-0 left-0 !w-full !h-full"
                      style={{
                        height: "100% !important",
                        width: "100% !important",
                      }}
                    />
                  </div>
                  <div
                    className="card-content flex flex-col p-4"
                    style={{ flex: "1 0 auto" }}
                  >
                    <Skeleton.Button
                      active={true}
                      size={"default"}
                      shape={"default"}
                      // block={true}
                      style={{
                        height: "40px",
                        marginBottom: "8px",
                        width: "80%",
                      }}
                    />
                    <Skeleton.Button
                      active={true}
                      size={"default"}
                      shape={"default"}
                      // block={true}
                      style={{
                        height: "40px",
                        marginBottom: "8px",
                        width: "50%",
                      }}
                    />
                    <Skeleton.Button
                      active={true}
                      size={"default"}
                      shape={"default"}
                      block={true}
                      style={{ height: "40px", marginBottom: "8px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderDanhSachKhoaHoc();
  useEffect(() => {
    if (
      searchParams.get("maDanhMuc") === "" ||
      searchParams.get("maDanhMuc") === "TatCaKhoaHoc"
    ) {
      dispatch(layDanhSachKhoaHocPhanTrang({ page, pageSize }));
    }
  }, [page]);

  useEffect(() => {
    (async () => {
      await dispatch(layDanhMucKhoaHoc());
    })();
  }, []);

  return (
    <div className="Course ">
      <div
        className="carousel-course uppercase p-[150px] text-4xl text-white"
        style={{
          background:
            "linear-gradient(90deg, rgba(131,58,180,1) 23%, rgba(253,29,29,1) 86%)",
        }}
      >
        danh sách các khóa học
      </div>

      <div className="course-content flex items-center justify-between container mx-auto px-4 py-8">
        <p className="text-2xl font-bold">Các khóa học phổ biến</p>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button
            onClick={(e) => e.preventDefault()}
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-600 uppercase cursor-pointer "
          >
            <Space className="flex items-center text-[16px]">
              Danh mục khóa học
              <DownOutlined className="inline-block mb-1" />
            </Space>
          </button>
        </Dropdown>
      </div>

      <div className="course-card container mx-auto px-4 py-2 pb-8">
        {searchParams.get("maDanhMuc") === "" ||
        searchParams.get("maDanhMuc") === "TatCaKhoaHoc" ? (
          <div>
            <div className="flex flex-wrap ">
              {isFetchingDanhSachKhoaHocPhanTrang ||
              isFetchingDanhSachKhoaHocTheoDanhMuc
                ? renderLoading()
                : renderDanhSachKhoaHoc()}
            </div>
            <div className="text-center mt-4">
              <Pagination
                current={page}
                defaultCurrent={Number(searchParams.get("page"))}
                defaultPageSize={Number(searchParams.get("pageSize"))}
                total={danhSachKhoaHocPhanTrang?.totalCount}
                onChange={(page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                  setSearchParams({
                    maDanhMuc: searchParams.get("maDanhMuc") || "",
                    page: page.toString(),
                    pageSize: pageSize.toString(),
                  });
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {isFetchingDanhSachKhoaHocPhanTrang ||
            isFetchingDanhSachKhoaHocTheoDanhMuc
              ? renderLoading()
              : renderDanhSachKhoaHocTheoDanhMuc()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
