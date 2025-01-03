import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, TabContainer } from "react-bootstrap";
import "../../GlobalStyle/GlobalTheme.css";
import { Button, Container } from "react-bootstrap";
import InputBox from "../../Component/InputBox";
import imgupload from "../../Asset/upload.png";
import { LoadAllData, ClearUploadState } from "../../Slice/UploadExcelSlice";

function Sales() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isUploadLoading,
    isUploadSuccess,
    isUploadError,
    UploadDataErrorMsg,
    UploadDataSuccessMsg,
  } = useSelector((state) => state.uploadexcel);
  const { userInfo } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  // console.log(UploadDataSuccessMsg);
  const OnChangeHandler = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile); // Save the file object to state
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload", { position: "top-right" });
      return;
    }

    let formData = new FormData();
    formData.append("file", file);
   formData.append(
     "company_mobile",
     userInfo?.data?.compnayDetails?.company_mobile
   );
    dispatch(LoadAllData({ data: formData, userInfo }));
  };

  useEffect(() => {
    if (isUploadSuccess) {
      toast.success(UploadDataSuccessMsg, {
        autoClose: 5000,
        position: "top-right",
      });
      dispatch(ClearUploadState());
      navigate("/insurance/policy");
    }
    if (isUploadError) {
      toast.error(UploadDataErrorMsg, {
        autoClose: 5000,
        position: "top-right",
      });
    }
  }, [isUploadLoading, isUploadSuccess, isUploadError]);

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
        <h5>Upload Excel</h5>
        <form className="form_wrapper" onSubmit={SubmitHandler}>
          <Row>
            <Col xs={12} lg={12}>
              <input
                type="file"
                accept=".xlsx, .xls, .csv" // Specify file types if needed
                onChange={OnChangeHandler}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  border: "1px solid grey",
                  borderRadius: "8px",
                }}
              />
            </Col>
            <Col
              xs={12}
              lg={12}
              className="d-flex justify-content-center align-items-center mt-5"
            >
              <Button variant="success" type="submit">
                {isUploadLoading ? <>{"Please Wait ..."}</> : "Upload"}
              </Button>
            </Col>
          </Row>
        </form>{" "}
      </div>
    </Container>
  );
}

export default Sales;
