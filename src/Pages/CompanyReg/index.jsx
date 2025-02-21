import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import InputBox from "../../Component/InputBox";
import SubmitButton from "../../Component/SubmitButton";
import CheckBox from "../../Component/CheckBox/index.jsx";
import ResetButton from "../../Component/ResetButton";
import JobImg from "../../Asset/adduser.png";
import RadioButton from "../../Component/RadioButton.jsx";
import PhnoValidation from "../../GlobalFunctions/PhnoValidation";
import GSTINValidation from "../../GlobalFunctions/GSTINValidation.js";
import PanCardValidation from "../../GlobalFunctions/PanCardValidation.js";
import EmailValidation from "../../GlobalFunctions/EmailValidation.js";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./companyReg.css";

import { CompanyRegFunc, ClearState15 } from "../../Slice/CompanyRegSlice.js";
import moment from "moment";

function UserReg() {
  const { Open } = useSelector((state) => state.controlSideBar);
  useEffect(() => {
    const boxCon = document.getElementById("boxCon");
    if (!Open) {
      boxCon.classList.add("close");
    } else {
      boxCon.classList.remove("close");
    }
  }, [Open]);

  const [showPass, setShowPass] = useState(false);
  const [regData, setRegData] = useState({
    company_name: null,
    company_mobile: null,
    password: null,
    company_email: null,
    User_Type: null,
    GSTIN: null,
    PANNo: null,
    Reminder: null,
    Start_Date: null,
    End_Date: null,
  });

  const [inputVal, setInputVal] = useState({
    company_mobile: true,
    GSTIN: true,
    PANNo: true,
    company_email: true,
  });

  const dispatch = useDispatch();
  const { isloading15, Result15, error15, isError15, isSuccess15 } =
    useSelector((state) => state.compreg);
  console.log(Result15);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess15 && !isError15 & !isloading15) {
      toast.success(Result15?.message, {
        autoClose: 6000,
        position: "top-right",
      });
      setRegData({
        company_name: null,
        company_mobile: null,
        password: null,
        User_Type: null,
        company_email: null,
        GSTIN: null,
        PANNo: null,
        Reminder: null,
        Start_Date: null,
        End_Date: null,
      });
      setShowPass(false);
    } else if (isError15 && !isSuccess15 && !isloading15) {
      toast.error(error15, { autoClose: 6000, position: "top-right" });
    }
    dispatch(ClearState15());
  }, [isError15, isSuccess15, isloading15]);

  const InputHandler = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    console.log(key, value);

    if (key === "User_Type") {
      if (value === "Admin") {
        setRegData({ ...regData, [key]: 1 });
      } else {
        setRegData({ ...regData, [key]: 2 });
      }
    } else {
      setRegData({ ...regData, [key]: value });
    }
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(regData);
    dispatch(CompanyRegFunc({ data: regData, token: userInfo?.data?.token }));
  };

  return (
    <form id="boxCon" className="box-container">
      <ToastContainer />
      <Row className="ps-3 mx-3">
        <Col xl={12} lg={12} sm={12} xs={12}>
          <div className="title_container">
            <img src={JobImg} alt="reg" width={"10%"} />
            <h5>Company Registration Form</h5>
          </div>
        </Col>
        <Row>
          <Col xl={6} lg={6} md={6} className="py-2">
            <InputBox
              Icon={<i className="bi bi-person fs-6"></i>}
              type={"text"}
              placeholder={"Company Name"}
              label={"company_name"}
              Name={"company_name"}
              value={regData?.company_name || ""}
              maxlen={50}
              error={false}
              errorMsg={"enter Correct name"}
              onChange={InputHandler}
            />
          </Col>{" "}
          <Col xl={6} lg={6} md={6} className="py-2">
            <InputBox
              Icon={<i className="bi bi-telephone fs-6"></i>}
              type={"tel"}
              placeholder={"Company Mobile No."}
              label={"phone"}
              value={regData?.company_mobile || ""}
              Name={"company_mobile"}
              error={!inputVal?.company_mobile}
              errorMsg={"Enter Correct Phone Number"}
              maxlen={10}
              onChange={(e) => {
                if (
                  e?.target?.value !== "" &&
                  e?.target?.value !== null &&
                  e?.target?.value !== undefined
                ) {
                  let res = PhnoValidation(e?.target?.value);
                  setInputVal({ ...inputVal, company_mobile: res });
                } else {
                  setInputVal({ ...inputVal, company_mobile: true });
                }
                InputHandler(e);
              }}
            />
          </Col>{" "}
          <Col md={6}>
            <InputBox
              Icon={<i className="bi bi-building small-icon"></i>}
              type={"text"}
              placeholder={"PAN Number*"}
              label={"PANNo"}
              value={regData?.PANNo || ""}
              Name={"PANNo"}
              error={!inputVal?.PANNo}
              errorMsg={"Enter Correct PAN Number"}
              maxlen={100}
              onChange={(e) => {
                if (
                  e?.target?.value !== "" &&
                  e?.target?.value !== null &&
                  e?.target?.value !== undefined
                ) {
                  let res = PanCardValidation(e?.target?.value);
                  setInputVal({ ...inputVal, PANNo: res });
                } else {
                  setInputVal({ ...inputVal, PANNo: true });
                }
                InputHandler(e);
              }}
            />{" "}
          </Col>
          <Col md={6}>
            <InputBox
              Icon={<i className="bi bi-building small-icon"></i>}
              type={"text"}
              placeholder={"GSTIN*"}
              label={"GSTIN"}
              value={regData?.GSTIN || ""}
              Name={"GSTIN"}
              error={!inputVal?.GSTIN}
              errorMsg={"Enter Correct GSTIN "}
              maxlen={100}
              onChange={(e) => {
                if (
                  e?.target?.value !== "" &&
                  e?.target?.value !== null &&
                  e?.target?.value !== undefined
                ) {
                  let res = GSTINValidation(e?.target?.value);
                  setInputVal({ ...inputVal, GSTIN: res });
                } else {
                  setInputVal({ ...inputVal, GSTIN: true });
                }
                InputHandler(e);
              }}
            />{" "}
          </Col>
          <Col xl={6} lg={6} md={6}>
            <InputBox
              Icon={<i className="bi bi-bell fs-6"></i>}
              type={"number"}
              placeholder={"Reminder Days"}
              label={"Reminder"}
              value={regData?.Reminder || ""}
              Name={"Reminder"}
              error={false}
              errorMsg={"Enter Correct password"}
              maxlen={10}
              onChange={InputHandler}
            />
          </Col>{" "}
          <Col md={6}>
            <InputBox
              Icon={<i className="bi bi-envelope small-icon"></i>}
              type={"email"}
              placeholder={"EmailId*"}
              label={"Email"}
              value={regData?.company_email || ""}
              Name={"company_email"}
              error={!inputVal?.company_email}
              errorMsg={"Enter Correct Email id"}
              maxlen={50}
              onChange={(e) => {
                if (
                  e?.target?.value !== "" &&
                  e?.target?.value !== null &&
                  e?.target?.value !== undefined
                ) {
                  let res = EmailValidation(e?.target?.value);
                  setInputVal({ ...inputVal, company_email: res });
                } else {
                  setInputVal({ ...inputVal, company_email: true });
                }
                InputHandler(e);
              }}
            />{" "}
          </Col>
          <Col xl={6} lg={6} md={6} sm={12}>
            <label style={{ width: "100%" }}>
              Start Date:
              <InputBox
                Icon={<i className="bi bi-calendar fs-6"></i>}
                type={"date"}
                placeholder={"Subscription Starting Date"}
                label={"Start_Date"}
                value={regData?.Start_Date || ""}
                Name={"Start_Date"}
                error={false}
                errorMsg={"Enter Correct password"}
                maxlen={10}
                onChange={InputHandler}
              />
            </label>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12}>
            <label style={{ width: "100%" }}>
              End Date:
              <InputBox
                Icon={<i className="bi bi-calendar fs-6"></i>}
                type="date"
                placeholder="Subscription End Date"
                label="End Date"
                value={regData?.End_Date || ""}
                Name="End_Date"
                maxlen={10}
                min={
                  regData.Start_Date
                    ? moment(regData.Start_Date)
                        .add(1, "days")
                        .format("YYYY-MM-DD")
                    : ""
                }
                onChange={InputHandler}
              />
            </label>
          </Col>
          <Col xl={6} lg={6} md={6} className="py-2">
            <InputBox
              Icon={<i className="bi bi-key fs-6"></i>}
              type={showPass ? "text" : "password"}
              placeholder={"password"}
              label={"password"}
              value={regData?.password || ""}
              Name={"password"}
              error={false}
              errorMsg={"Enter Correct password"}
              maxlen={10}
              onChange={InputHandler}
            />
            <CheckBox
              Label={"Show password"}
              onChange={(e) => {
                setShowPass(!showPass);
              }}
            />
          </Col>{" "}
          <Col xl={6} lg={6} md={6} className="py-2">
            <RadioButton
              OptionArray={[
                { name: "Admin", value: 1 },
                { name: "User", value: 2 },
              ]}
              RName={"User_Type"}
              OnClick={InputHandler}
              value={regData?.User_Type || ""}
            />
          </Col>{" "}
          <Col xl={6} lg={6} md={6} className="py-2"></Col>
        </Row>

        <Row>
          <Col xs={6}>
            <SubmitButton
              OnClickBtn={SubmitHandler}
              type={"submit"}
              isdisable={
                !(
                  regData?.company_mobile !== null &&
                  regData?.company_name !== null &&
                  regData?.password !== null
                )
              }
            />
          </Col>
          <Col xs={6}>
            <ResetButton
              type={"reset"}
              onClick={(e) => {
                setRegData({
                  dashboard_url: null,
                  company_name: null,
                  company_mobile: null,
                  User_Type: null,
                  CompanyCode: null,
                  password: null,
                  LOCID: null,
                  LOGINCODE: null,
                  EndDate: null,
                  Reminder: null,
                });
              }}
            />
          </Col>
        </Row>
      </Row>
    </form>
  );
}

export default UserReg;
