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
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { GROUPID } from "../../../utils/config";
import { RootState, useAppDispath } from "../../../store/configStore";
// import { Dan, themKhoaHocUploadHinh } from "../../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";
import { useSelector } from "react-redux";
import Loading from "../../../components/Molecules/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { LayDanhMucKhoaHoc } from "../../../types/quanLyKhoaHocTypes";
import {
  layDanhMucKhoaHoc,
  themKhoaHocUploadHinh,
  uploadHinhAnhAction,
} from "../../../store/quanLyKhoaHoc/quanLyKhoaHocReducer";
import { danhSachNguoiDungAction } from "../../../store/quanLyNguoiDung";
import Item from "antd/lib/list/Item";
import parse from "date-fns/parse";

type SizeType = Parameters<typeof Form>[0]["size"];
const Addcoure = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const [errSrcImg, setErrSrcImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenErr, setIsModalOpenErr] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    navigate("/admin/courses");
    setIsModalOpen(false);
    // dispatch(xoaPhim(findMaPhim?.maPhim as number));
  };

  const showModalErr = () => {
    setIsModalOpenErr(true);
  };

  const handleOkErr = () => {
    setIsModalOpenErr(false);
    // dispatch(xoaPhim(findMaPhim?.maPhim as number));
  };
  const {
    isFetchingKhoaHoc,
    danhMucKhoaHoc,
    errThemKhoaHoc,

    errUploadHinhAnhCapNhat,
  } = useSelector((state: RootState) => {
    return state.quanLyKhoaHocReducer;
  });
  const { arrDanhSachNguoiDung } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });
  useEffect(() => {
    dispatch(danhSachNguoiDungAction(""));
  }, []);
  // console.log({arrDanhSachNguoiDung});
  useEffect(() => {
    dispatch(layDanhMucKhoaHoc());
  }, []);

  const [fileHinh, setFileHinh] = useState<any>();
  const dispatch = useAppDispath();
  const formik = useFormik({
    initialValues: {
      maKhoaHoc: "",
      tenKhoaHoc: "",
      moTa: "",
      biDanh: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: {},
      maNhom: GROUPID,
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: "",
    },
    validationSchema: Yup.object({
      maKhoaHoc: Yup.string().required("M?? kh??a h???c kh??ng ???????c ????? tr???ng!"),
      biDanh: Yup.string().required("B?? danh kh??ng ???????c ????? tr???ng!"),
      tenKhoaHoc: Yup.string().required("T??n Phim kh??ng ???????c ????? tr???ng!"),
      moTa: Yup.string().required("m?? t??? kh??ng ???????c ????? tr???ng!"),
      danhGia: Yup.string().required("????nh gi?? kh??ng ???????c ????? tr???ng!"),
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
      // formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name);
      // formData.append("tenKhoaHoc", values.tenKhoaHoc);

      // for (let key in values) {
      //   if (key === "hinhAnh") {
      //     formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name);
      //   }
      //   formData.append(key, values[key]);
      // }
      // console.log(formData.get("maNhom"));
      try {
        await dispatch(themKhoaHocUploadHinh(values))
          .unwrap()
          .then((result) => {});

        let formData = new FormData();
        console.log(fileHinh.name);
        formData.append("hinhAnh", fileHinh, fileHinh.name);
        formData.append("tenKhoaHoc", values.tenKhoaHoc);
        await dispatch(uploadHinhAnhAction(formData))
          .unwrap()
          .then(() => {
            showModal();
          });
      } catch (err: any) {
        showModalErr();
      }

      // dispatch(uploadHinhAnhAction(formData));
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
  const handleChangeFile = (e: any) => {
    // l???y ra file t??? e
    let file = e.target.files[0];

    // t???o ?????i t?????ng ?????c file
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target?.result);
        setImgSrc(e.target?.result as string);
      };
      // console.log(file);
      // ??em file v??o formik
      setErrSrcImg("");
      setFileHinh(file);
      formik.setFieldValue("hinhAnh", file.name);
    } else {
      setErrSrcImg("Kh??ng h??? tr??? ?????nh d???ng file n??y");
    }
  };

  if (isFetchingKhoaHoc) {
    return <Loading />;
  }

  return (
    <div>
      {" "}
      <h3 className="capitalize text-4xl">Th??m m???i kh??a h???c</h3>
      <Form
        onSubmitCapture={() => {
          formik.handleSubmit();
        }}
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
          />
          {formik.errors.maKhoaHoc && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.maKhoaHoc}</p>
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
        <Form.Item label="????nh gi??">
          <Input
            onChange={formik.handleChange}
            name="danhGia"
            placeholder="Nh???p v??o ????nh gi??"
            value={formik.values.danhGia}
          />
          {formik.errors.danhGia && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.danhGia}</p>
          )}
        </Form.Item>

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
        <Form.Item label="Ng??y kh???i t???o">
          <DatePicker format={"DD/MM/YYYY"} onChange={handChangeDataPicker} />
          {formik.errors.ngayTao && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.ngayTao}</p>
          )}
        </Form.Item>

        <Form.Item label="Danh M???c Kh??a H???c">
          <Select
            onChange={handleSelectChangeDanhMuc}
            placeholder="Ch???n lo???i ng?????i d??ng"
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
          <Select onChange={handleSelectChange} placeholder="Ch???n ng?????i t???o">
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
          <img src={imgSrc} alt="..." className="w-[100px] h-[100px]" />
        </Form.Item>

        <Form.Item label="T??c v???">
          <button className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3  dark:focus:ring-blue-900 mr-2 uppercase">
            Th??m Kh??a H???c
          </button>
          {/* <Button type="primary" htmlType="submit">
            Submit
          </Button> */}
          {/* <button type="submit">click me</button> */}
        </Form.Item>
      </Form>
      {errThemKhoaHoc || errUploadHinhAnhCapNhat ? (
        <Modal
          title={<span className="text-red-500">Th??m kh??a h???c th???t b???i</span>}
          open={isModalOpenErr}
          onOk={handleOkErr}
          destroyOnClose
          closable={false}
          footer={[
            <div className="text-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleOkErr}
              >
                OK
              </button>
            </div>,
          ]}
        >
          <div className="text-center">
            <CloseCircleFilled
              className="text-4xl mb-2 text-red-500"
              style={{ color: "rgb(239 68 68) " }}
            />
            <br />
            <p className="uppercase text-red-500 font-bold text-3xl">
              {errThemKhoaHoc || errUploadHinhAnhCapNhat}
            </p>
          </div>
        </Modal>
      ) : (
        <Modal
          title={
            <span className="text-green-500">Th??m kh??a h???c th??nh c??ng</span>
          }
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
              TH??m kh??a h???c th??nh c??ng!
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default Addcoure;
