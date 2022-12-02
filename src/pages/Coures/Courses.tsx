import { Button, Modal, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, {
  ChangeEvent,
  Fragment,
  HtmlHTMLAttributes,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import {
  AudioOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Input, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "../../store/configStore";
import { layDanhSachKhoaHoc, xoaKhoaHoc } from "../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";
// import noImages from "../../assets/images/noImages.jpg";
import { NavLink, useNavigate } from "react-router-dom";

interface DataType {
  maKhoaHoc: string;
  // biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };
  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
  };
}

const Courses = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(xoaKhoaHoc(findMaKhoaHoc?.maKhoaHoc as string));
  };  

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [maKhoaHocDelete, setMaKhoaHocDelete] = useState('');
  const {danhSachKhoaHoc} = useSelector((state: RootState) => {
    return state.quanLyKhoaHocReducer;
  });


  const findMaKhoaHoc = danhSachKhoaHoc?.find((item) => item.maKhoaHoc === maKhoaHocDelete);

  const dispatch = useAppDispath();
  const { Search } = Input;
  const onSearch = (value: string) =>  {
    dispatch(layDanhSachKhoaHoc(value));
    
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Khóa Học",
      dataIndex: "maKhoaHoc",
      // sorter: (a, b) => a.maKhoaHoc - b.maKhoaHoc,
      sortDirections: ["descend"],
      width: "15%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      render: (text, course) => {
        return (
          <Fragment>
            <img
              src={course.hinhAnh}
              alt={course.tenKhoaHoc}
              className="w-[50px] h-[50px]"
              onError={(e: any) => {
                e.target.onError = null;
                // e.target.src = { noImages };
              }}
            />
          </Fragment>
        );
      },
      width: "15%",
    },
    {
      title: "Tên Khóa Học",
      dataIndex: "tenKhoaHoc",
      sorter: (a, b) => {
        const phimA = a.tenKhoaHoc.toLocaleLowerCase().trim();
        const phimB = b.tenKhoaHoc.toLocaleLowerCase().trim();
        if (phimA > phimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],
      width: "20%",
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      sorter: (a, b) => {
        const khoaHocA = a.moTa.toLocaleLowerCase().trim();
        const khoaHocB = b.moTa.toLocaleLowerCase().trim();
        if (khoaHocA > khoaHocB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],
      render: (text, course) => {
        return (
          <Fragment>
            <span>
              {course.moTa.length > 50
                ? course.moTa.slice(0, 50) + "..."
                : course.moTa}
            </span>
          </Fragment>
        );
      },
      width: "25%",
    },
  {
      title: "",
      dataIndex: "maKhoaHoc",

      render: (text, course) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/courses/editcourse/${course.maKhoaHoc}`}
              className="focus:outline-none hover:text-white text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-3  dark:focus:ring-yellow-900 mr-2"
            >
              <EditOutlined className="text-2xl" />
            </NavLink>
            <button
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 mr-2 dark:focus:ring-red-900"
              onClick={() => {
                showModal();
                setMaKhoaHocDelete(course.maKhoaHoc);
              }}
            >
              <DeleteOutlined className="text-2xl" />
            </button>
          </Fragment>
        );
      },
      width: "25%",
    },
  ];
  const data = danhSachKhoaHoc;
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  useEffect(() => {
    dispatch(layDanhSachKhoaHoc(""));
  }, []);
  return (
    <div>
      <h3 className="capitalize text-4xl">quản lý khóa học</h3>
      <Button
        className="capitalize mb-5"
        onClick={() => navigate("/admin/courses/addcourse")}
      >
        thêm khóa học
      </Button>
      <Search
        placeholder="Nhập từ khóa..."
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
        className="mb-5"
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maKhoaHoc"}
      />
      <Modal
        title={<span className="text-red-500 font-bold">Xóa khóa học</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="text-2xl">
          Bạn có chắc muốn xóa khóa học này không ?{" "}
          <span className="text-red-500 font-bold">
            ({findMaKhoaHoc?.tenKhoaHoc})
          </span>
        </p>
      </Modal>
    </div>
  );
};

export default Courses;
