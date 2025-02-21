import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "../../GlobalStyle/GlobalTheme.css";
import "./login.css";

import ImgLogo from "../../Asset/nimbussystems_logo.jfif";

import InputBox from "../../Component/InputBox";
import SubmitButton from "../../Component/SubmitButton";
import CheckBox from "../../Component/CheckBox";

import { authenticate, ClearState } from "../../Slice/AuthSlice";

import PhnoValidation from "../../Validators/PhnoValidation";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isloading, userInfo, error, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  //states
  const [validate, setValidate] = useState({
    company_mobile: true,
  });
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    company_mobile: null,
    password: null,
  });
console.log(userInfo);

  useEffect(() => {
    if (isSuccess && userInfo?.data?.token) {
      navigate("/insurance");
    }
    else {
      navigate("/");
      dispatch(ClearState());
     }
    if (isError) {
      toast.error(error, { autoClose: 6000, position: "top-right" });
    }
  }, [isSuccess, isloading,isError]);

  //functions
  const InputHandler = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setData({ ...data, [key]: value });
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
   dispatch(authenticate(data));
     console.log("hi",data);
  };
 
  return (
    <Form className="form_wrapper border form-width-height">
      <ToastContainer />
      <Row className="justify-content-center align-items-center px-2">
        <Col xs={12} className="title_container mt-2">
          <img src={ImgLogo} width="15%" />
          <p className="my-0 fs-5 fw-normal color-header">Login Here</p>
        </Col>
        <Col xs={12} className="py-4">
          <InputBox
            Icon={<i className="bi bi-person fs-5"></i>}
            type={"text"}
            password={data?.company_mobile || ""}
            label={"company_mobile"}
            placeholder={"Company Mobile"}
            onChange={(e) => {
              let value = e.target.value;
              if (value !== "" && value !== null && value !== undefined) {
                let res = PhnoValidation(value);
                setValidate({ company_mobile: res });
              } else {
                setValidate({ company_mobile: true });
              }
              InputHandler(e);
            }}
            Name={"company_mobile"}
            error={!validate?.company_mobile}
            errorMsg={"Enter Correct Mobile Number"}
            maxlen={10}
          />
        </Col>
        <Col xs={12} className="pb-3">
          <InputBox
            Icon={<i className="bi bi-key-fill fs-5"></i>}
            type={showPass ? "text" : "password"}
            label={"password"}
            onChange={InputHandler}
            password={data?.password || ""}
            placeholder={"password"}
            Name={"password"}
            maxlen={16}
          />
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          className="d-flex justify-content-md-start justify-content-center"
        >
          <CheckBox
            Label={"Show password"}
            Name={"showPass"}
            Value={showPass}
            checkid={showPass}
            key={3}
            onChange={(e) => {
              setShowPass(!showPass);
            }}
          />
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          className="d-flex justify-content-md-end justify-content-center"
        >
          <a href="#" style={{ fontSize: "12px" }}>
            Forgot password ?
          </a>
        </Col>
        <Col xs={12} className="mt-4">
          <SubmitButton
            OnClickBtn={SubmitHandler}
            type={"submit"}
            isdisable={!(data?.company_mobile && data?.password)}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default Login;
