import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { GROUPID } from "../../../utils/config";
import { RootState, useAppDispath } from "../../../store/configStore";
import {
  capNhatKhoaHocAction,
  layDanhMucKhoaHoc,
  layDanhSachKhoaHoc,
  layThongTinKhoaHoc,
} from "../../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../../components/Molecules/Loading/Loading";
import { LayDanhMucKhoaHoc } from "../../../types/quanLyKhoaHocTypes";
import { danhSachNguoiDungAction } from "../../../store/quanLyNguoiDung";
import parse from "date-fns/parse";
type SizeType = Parameters<typeof Form>[0]["size"];
const EditCourse = () => {
  const [componentSize, setComponentSize] = useState("default");
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("");
  const [errSrcImg, setErrSrcImg] = useState("");
  const params = useParams();
  const dispatch = useAppDispath();
  const { thongTinKhoaHoc, isFetchingCapNhapKhoaHoc, errCapNhatKhoaHoc } =
    useSelector((state: RootState) => {
      return state.quanLyKhoaHocReducer;
    });
  const { danhMucKhoaHoc } = useSelector((state: RootState) => {
    return state.quanLyKhoaHocReducer;
  });
  const { danhSachKhoaHoc } = useSelector((state: RootState) => {
    return state.quanLyKhoaHocReducer;
  });
  const { arrDanhSachNguoiDung } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });
  useEffect(() => {
    dispatch(danhSachNguoiDungAction(""));
  }, []);
  useEffect(() => {
    dispatch(layDanhMucKhoaHoc());
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/admin/courses");
  };
  useEffect(() => {
    dispatch(layThongTinKhoaHoc(String(params.id)));
  }, []);
  const formik = useFormik({
    initialValues: {
      maKhoaHoc: thongTinKhoaHoc?.maKhoaHoc,
      tenKhoaHoc: thongTinKhoaHoc?.tenKhoaHoc,
      moTa: thongTinKhoaHoc?.moTa,
      biDanh: thongTinKhoaHoc?.biDanh,
      luotXem: thongTinKhoaHoc?.luotXem,
      danhGia: thongTinKhoaHoc?.danhGia,
      hinhAnh: null,
      maNhom: GROUPID,
      ngayTao: moment(thongTinKhoaHoc?.ngayTao).format("DD/MM/YY"),
      maDanhMucKhoaHoc: thongTinKhoaHoc?.danhMucKhoaHoc,
      taiKhoanNguoiTao: thongTinKhoaHoc?.nguoiTao,
    },
    validationSchema: Yup.object({
      maKhoaHoc: Yup.string().required("Mã khóa học không được để trống!"),
      biDanh: Yup.string().required("Bí danh không được để trống!"),
      tenKhoaHoc: Yup.string().required("Tên Phim không được để trống!"),
      moTa: Yup.string().required("mô tả không được để trống!"),
      danhGia: Yup.string().required("đánh giá không được để trống!"),
      luotXem: Yup.string().required("Lượt xem không được bỏ trống"),
      ngayTao: Yup.date()
        .transform(function (value, originalValue) {
          if (this.isType(value)) {
            return value;
          }
          const result = parse(originalValue, "dd.MM.yyyy", new Date());
          return result;
        })
        .typeError("Ngày tạo không được để trống!")
        .required("Ngày tạo không được để trống!"),
    }),
    onSubmit: (values) => {
      console.log( values);
      dispatch(capNhatKhoaHocAction(values))
      .then(()=>showModal)
      .catch(()=>showModal)
      // dispatch(capNhatKhoaHoc(values))
      // .then(()=>setIsModalOpen)
      // .catch(()=>setIsModalOpen)
      // tạo đối tượng formData
      // let formData = new FormData();
      // for (let key in values) {
      //   if (key === "hinhAnh") {
      //     if (values.hinhAnh !== null) {
      //       formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name);
      //     }
      //   }
      //   formData.append(key, values[key]);
      // }
      // console.log(formData.get("maNhom"));
      // navigate("/admin/courses");
      // await dispatch(capNhatKhoaHoc(formData))
      //   .unwrap()
      //   .then(() => {
      //     showModal();
      //   });
    },
    },
  );
  const handleSelectChange = (value: string) => {
    formik.setFieldValue("taiKhoanNguoiTao", value);
  };

  const handleSelectChangeDanhMuc = (value: string) => {
    formik.setFieldValue("maDanhMucKhoaHoc", value);
  };
  // const [layDanhMucKhoaHoc, setDanhMucKhoaHoc] = useState<LayDanhMucKhoaHoc[]>([]);
  const handChangeDataPicker = (value: any) => {
    let ngayTao = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayTao", ngayTao);
  };
  // React.ChangeEvent<HTMLInputElement>
  const handleChangeFile = async (e: any) => {
    // lấy ra file từ e
    let file = e.target.files[0];

    // tạo đối tượng đọc file
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg"
    ) {
      // Đem file vào formik
      await formik.setFieldValue("hinhAnh", file);

      // Tạo đối tượng đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async (e) => {
        // console.log(e.target?.result);
        await setImgSrc(e.target?.result as string);
      };
      // console.log(file);
      await setErrSrcImg("");
    } else {
      await setErrSrcImg("Không hỗ trợ định dạng file này");
    }
  };
  if (isFetchingCapNhapKhoaHoc) {
    return <Loading />;
  }
  return (
    <div>
      {" "}
      <h3 className="capitalize text-4xl">Cập nhật khóa học</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        size={componentSize as SizeType}
      >
        <Form.Item label="Mã Khóa Học">
          <Input
            onChange={formik.handleChange}
            name="maKhoaHoc"
            placeholder="Nhập vào mã khóa học"
            value={formik.values.maKhoaHoc}
          />
          {formik.errors.maKhoaHoc && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.maKhoaHoc}</p>
          )}
        </Form.Item>
        <Form.Item label="Bí danh">
          <Input
            onChange={formik.handleChange}
            name="biDanh"
            placeholder="Nhập vào bí danh"
            value={formik.values.biDanh}
          />
          {formik.errors.biDanh && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.biDanh}</p>
          )}
        </Form.Item>
        <Form.Item label="Tên Khóa Học">
          <Input
            onChange={formik.handleChange}
            name="tenKhoaHoc"
            placeholder="Nhập vào tên khóa học"
            value={formik.values.tenKhoaHoc}
          />
          {formik.errors.tenKhoaHoc && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.tenKhoaHoc}</p>
          )}
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            onChange={formik.handleChange}
            name="moTa"
            placeholder="Nhập vào mô tả"
            value={formik.values.moTa}
          />
          {formik.errors.moTa && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.moTa}</p>
          )}
        </Form.Item>
        <Form.Item label="Đánh giá">
          <Input
            onChange={formik.handleChange}
            name="danhGia"
            placeholder="Nhập vào đánh giá"
            value={formik.values.danhGia}
          />
          {formik.errors.danhGia && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.danhGia}</p>
          )}
        </Form.Item>

        <Form.Item label="Lượt xem">
          <Input
            onChange={formik.handleChange}
            name="luotXem"
            placeholder="Nhập vào lượt xem"
            value={formik.values.luotXem}
          />
          {formik.errors.luotXem && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.luotXem}</p>
          )}
        </Form.Item>
        <Form.Item label="Ngày khỏi tạo">
          <DatePicker format={"DD/MM/YYYY"} onChange={handChangeDataPicker} />
          {formik.errors.ngayTao && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.ngayTao}</p>
          )}
        </Form.Item>

        <Form.Item label="Danh Mục Khóa Học">
          <Select
            onChange={handleSelectChangeDanhMuc}
            placeholder="Chọn loại người dùng"
          >
            {danhMucKhoaHoc?.map((item) => (
              <Select.Option key={item.maDanhMuc} value={`${item.maDanhMuc}`}>
                {item.tenDanhMuc}
              </Select.Option>
            ))}
          </Select>
          {formik.errors.maDanhMucKhoaHoc && formik.touched && (
            <p className="text-red-500 mb-0">
              {formik.errors.maDanhMucKhoaHoc}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Người tạo">
          <Select onChange={handleSelectChange} placeholder="Chọn người tạo">
            {arrDanhSachNguoiDung
              ?.filter((item) => item.maLoaiNguoiDung === "GV")
              .map((item) => (
                <Select.Option key={item.taiKhoan} value={`${item.taiKhoan}`}>
                  {item.taiKhoan}
                </Select.Option>
              ))}
          </Select>
          {formik.errors.taiKhoanNguoiTao && formik.touched && (
            <p className="text-red-500 mb-0">
              {formik.errors.taiKhoanNguoiTao}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} accept="image/*" />
          {errSrcImg !== "" ? (
            <p className="text-red-500 mb-0">{errSrcImg}</p>
          ) : (
            ""
          )}
          <br />
          <img src={imgSrc} alt="..." className="w-[100px] h-[100px]" />
        </Form.Item>

        <Form.Item label="Tác vụ">
          {/* <button className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3  dark:focus:ring-blue-900 mr-2 uppercase">
            Cập nhật khóa học
          </button> */}
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật khóa học
            </Button>
          </Form.Item>
        </Form.Item>
        {errCapNhatKhoaHoc !== "" ? (
          <p className="text-red-500 font-bold">{errCapNhatKhoaHoc}</p>
        ) : (
          ""
        )}
      </Form>
      <Modal
        title={<span className="text-green-500">Cập nhật thành công</span>}
        open={isModalOpen}
        onOk={handleOk}
        destroyOnClose
        closable={false}
        footer={[
          <div className="text-center">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleOk}
            >
              OK
            </button>
          </div>,
        ]}
      >
        <div className="text-center">
          <CheckCircleFilled
            className="text-4xl mb-2 text-green-500"
            style={{ color: "rgb(34 197 94) " }}
          />
          <br />
          <p className="uppercase text-green-500 font-bold text-3xl">
            cập nhật thành công!
          </p>
        </div>
      </Modal>
    </div>
  );
};
export default EditCourse;
// function capNhatKhoaHocAction(formData: FormData): any {
//   throw new Error("Function not implemented.");
// }
