import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, TabContainer } from "react-bootstrap";
import "../../GlobalStyle/GlobalTheme.css";
import { Button, Container } from "react-bootstrap";
import InputBox from "../../Component/InputBox";
import imgupload from "../../Asset/upload.png";
import { LoadAllData, ClearUploadState } from "../../Slice/UploadExcelSlice";

function LinkPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isPolicyLoading,
    GeneratePolicySuccessMsg,
    PolicyErrorMsg,
    isPolicyError,
    isPolicySuccess,
  } = useSelector((state) => state.genpolicy);
  const { userInfo } = useSelector((state) => state.auth);
console.log(GeneratePolicySuccessMsg,"url");

  return (
    <Container
      fluid
      style={{
        height: "95%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "55px",
      }}
    >
      <ToastContainer />
      <div
        className="d-flex flex-column align-items-center pt-4"
        style={{
          backgroundColor: "#f8f8ff",
          borderRadius: "10px",
          boxShadow: "1px 1px 2px grey",
          padding: "18px",
          width: "350px",
          height: "350px",
        }}
      >
        <img src={imgupload} alt="pic" width={"20%"} />
        <h5>Download Certificate</h5>

        <Row className="form_wrapper">
          <Col
            xs={12}
            lg={12}
            className="d-flex justify-content-center align-items-center mt-5"
          >
            <a target="_blank" href={GeneratePolicySuccessMsg[0]?.url}>
              <Button variant="success" type="button">
                Download{" "}
              </Button>
            </a>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default LinkPage;
