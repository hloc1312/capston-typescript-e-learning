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
  capNhatKhoaHocUpload,
  layDanhMucKhoaHoc,
  layDanhSachKhoaHoc,
  layThongTinKhoaHoc,
  themKhoaHocUploadHinh,
  uploadHinhAnhAction,
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
  const { thongTinKhoaHoc, isFetchingUploadKhoaHoc, errUploadKhoaHoc } =
    useSelector((state: RootState) => {
      return state.quanLyKhoaHocReducer;
    });

  const { danhMucKhoaHoc } = useSelector((state: RootState) => {
    return state.quanLyKhoaHocReducer;
  });
  const { arrDanhSachNguoiDung } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });

  useEffect(() => {
    dispatch(layThongTinKhoaHoc(params.id as string));
  }, []);
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
  const [fileHinh, setFileHinh] = useState<any>();

  useEffect(() => {
    dispatch(layThongTinKhoaHoc(String(params.id)));
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maKhoaHoc: thongTinKhoaHoc?.maKhoaHoc,
      tenKhoaHoc: thongTinKhoaHoc?.tenKhoaHoc,
      moTa: thongTinKhoaHoc?.moTa,
      luotXem: thongTinKhoaHoc?.luotXem,
      biDanh: thongTinKhoaHoc?.biDanh,
      danhGia: 0,
      hinhAnh: null,
      maNhom: GROUPID,
      ngayTao: moment(thongTinKhoaHoc?.ngayTao).format("DD/MM/YYYY"),
      maDanhMucKhoaHoc: thongTinKhoaHoc?.danhMucKhoaHoc.maDanhMucKhoahoc,
      taiKhoanNguoiTao: thongTinKhoaHoc?.nguoiTao.taiKhoan,
    },
    validationSchema: Yup.object({
      maKhoaHoc: Yup.string().required("M?? kh??a h???c kh??ng ???????c ????? tr???ng!"),
      tenKhoaHoc: Yup.string().required("T??n Phim kh??ng ???????c ????? tr???ng!"),
      moTa: Yup.string().required("m?? t??? kh??ng ???????c ????? tr???ng!"),
      // danhGia: Yup.string().required("????nh gi?? kh??ng ???????c ????? tr???ng!"),
      luotXem: Yup.string().required("L?????t xem kh??ng ???????c b??? tr???ng"),
      ngayTao: Yup.date()
        .transform(function (value, originalValue) {
          if (this.isType(value)) {
            return value;
          }
          const result = parse(originalValue, "dd.MM.yyyy", new Date());
          return result;
        })
        .typeError("Ng??y t???o kh??ng ???????c ????? tr???ng!")
        .required("Ng??y t???o kh??ng ???????c ????? tr???ng!"),
    }),
    onSubmit: async (values: any) => {
      console.log("values", values);
      // t???o ?????i t?????ng formData
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
      // navigate("/admin/films");
      // await dispatch(capNhatKhoaHocUpload(formData))
      //   .unwrap()
      //   .then(() => {
      //     showModal();
      //   });
      console.log({ fileHinh });
      try {
        dispatch(capNhatKhoaHocUpload(values)).unwrap().then();

        let formData = new FormData();
        if (values.hinhAnh !== null) {
          formData.append("hinhAnh", fileHinh, fileHinh.name);
        } else {
          values.hinhAnh = thongTinKhoaHoc?.hinhAnh;
        }
        formData.append("tenKhoaHoc", values.tenKhoaHoc);
        await dispatch(uploadHinhAnhAction(formData))
          .unwrap()
          .then(() => {
            showModal();
          });
      } catch (err) {
        console.log(err);
      }
    },
  });
  const handleSelectChange = (value: string) => {
    formik.setFieldValue("taiKhoanNguoiTao", value);
  };

  const handleSelectChangeDanhMuc = (value: string) => {
    formik.setFieldValue("maDanhMucKhoaHoc", value);
  };
  // const [layDanhMucKhoaHoc, setDanhMucKhoaHoc] = useState<LayDanhMucKhoaHoc[]>([]);
  const handChangeDataPicker = (value: any) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayTao", ngayKhoiChieu);
  };
  // React.ChangeEvent<HTMLInputElement>
  const handleChangeFile = async (e: any) => {
    // l???y ra file t??? e
    let file = e.target.files[0];

    // t???o ?????i t?????ng ?????c file
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg"
    ) {
      // ??em file v??o formik
      await formik.setFieldValue("hinhAnh", file.name);
      setFileHinh(file);

      // T???o ?????i t?????ng ?????c file
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async (e) => {
        // console.log(e.target?.result);
        await setImgSrc(e.target?.result as string);
      };
      // console.log(file);
      setFileHinh(file);
      await setErrSrcImg("");
      // formik.setFieldValue("hinhAnh", file.name);
    } else {
      await setErrSrcImg("Kh??ng h??? tr??? ?????nh d???ng file n??y");
    }
  };
  if (isFetchingUploadKhoaHoc) {
    return <Loading />;
  }
  return (
    <div>
      {" "}
      <h3 className="capitalize text-4xl">C???p nh???t kh??a h???c</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        size={componentSize as SizeType}
      >
        <Form.Item label="M?? Kh??a H???c">
          <Input
            onChange={formik.handleChange}
            name="maKhoaHoc"
            placeholder="Nh???p v??o m?? kh??a h???c"
            value={formik.values.maKhoaHoc}
            disabled={true}
          />
          {formik.errors.maKhoaHoc && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.maKhoaHoc}</p>
          )}
        </Form.Item>

        <Form.Item label="T??n Kh??a H???c">
          <Input
            onChange={formik.handleChange}
            name="tenKhoaHoc"
            placeholder="Nh???p v??o t??n kh??a h???c"
            value={formik.values.tenKhoaHoc}
          />
          {formik.errors.tenKhoaHoc && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.tenKhoaHoc}</p>
          )}
        </Form.Item>
        <Form.Item label="B?? danh">
          <Input
            onChange={formik.handleChange}
            name="biDanh"
            placeholder="Nh???p v??o b?? danh"
            value={formik.values.biDanh}
          />
          {formik.errors.biDanh && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.biDanh}</p>
          )}
        </Form.Item>
        <Form.Item label="M?? t???">
          <Input
            onChange={formik.handleChange}
            name="moTa"
            placeholder="Nh???p v??o m?? t???"
            value={formik.values.moTa}
          />
          {formik.errors.moTa && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.moTa}</p>
          )}
        </Form.Item>
        {/* <Form.Item label="????nh gi??">
          <Input
            onChange={formik.handleChange}
            name="danhGia"
            placeholder="Nh???p v??o ????nh gi??"
            value={formik.values.danhGia}
          />
          {formik.errors.danhGia && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.danhGia}</p>
          )}
        </Form.Item> */}

        <Form.Item label="L?????t xem">
          <Input
            onChange={formik.handleChange}
            name="luotXem"
            placeholder="Nh???p v??o l?????t xem"
            value={formik.values.luotXem}
          />
          {formik.errors.luotXem && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.luotXem}</p>
          )}
        </Form.Item>

        <Form.Item label="L?????t xem">
          <Input
            onChange={formik.handleChange}
            name="danhGia"
            placeholder="Nh???p v??o ????nh gi??"
            value={formik.values.danhGia}
          />
          {/* {formik.errors.luotXem && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.luotXem}</p>
          )} */}
        </Form.Item>
        <Form.Item label="Ng??y kh???i t???o">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={handChangeDataPicker}
            value={moment(formik.values.ngayTao, "DD/MM/YYYY")}
          />
          {formik.errors.ngayTao && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.ngayTao}</p>
          )}
        </Form.Item>

        <Form.Item label="Danh M???c Kh??a H???c">
          <Select
            onChange={handleSelectChangeDanhMuc}
            placeholder="Ch???n danh m???c kh??a h???c"
            value={formik.values.maDanhMucKhoaHoc}
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
        <Form.Item label="Ng?????i t???o">
          <Select
            onChange={handleSelectChange}
            placeholder="Ch???n ng?????i t???o"
            value={formik.values.taiKhoanNguoiTao}
          >
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
        <Form.Item label="H??nh ???nh">
          <input type="file" onChange={handleChangeFile} accept="image/*" />
          {errSrcImg !== "" ? (
            <p className="text-red-500 mb-0">{errSrcImg}</p>
          ) : (
            ""
          )}
          <br />
          <img
            src={imgSrc === "" ? thongTinKhoaHoc?.hinhAnh : imgSrc}
            alt="..."
            className="w-[100px] h-[100px]"
          />
        </Form.Item>

        <Form.Item label="T??c v???">
          <button
            type="submit"
            className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3  dark:focus:ring-blue-900 mr-2 uppercase"
          >
            C???p nh???t kh??a h???c
          </button>
        </Form.Item>
        {errUploadKhoaHoc !== "" ? (
          <p className="text-red-500 font-bold">{errUploadKhoaHoc}</p>
        ) : (
          ""
        )}
      </Form>
      <Modal
        title={<span className="text-green-500">C???p nh???t th??nh c??ng</span>}
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
            c???p nh???t th??nh c??ng!
          </p>
        </div>
      </Modal>
    </div>
  );
};
export default EditCourse;
