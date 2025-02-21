import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthNavBar from "../Component/Header/AuthNavBar";
import Footer from "../Component/Footer";
import SideImg from "../Asset/EMIimg.svg";
import SideBar from "../Component/Header/SideBar";
import "../GlobalStyle/GlobalTheme.css";
import "../GlobalStyle/authcss.css";
import "./AuthLayout.css";
import { Outlet, useLocation } from "react-router-dom";

function PrivateLayout() {
  const location = useLocation();
  return (
    <Container fluid className="base-container d-flex">
      <SideBar />
      <div style={{ width: "100%", height: "95vh" }}>
        <AuthNavBar />
        {/* <Outlet/> */}
        <Row style={{ width: "100%", height: "100%" }}>
          {location.pathname == "/insurance/adminpanel" ||
          location.pathname == "/insurance/companyreg" ? (
            <>
              <Col
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className="d-flex justify-content-center align-items-center p-0 m-0"
              >
                <Outlet />
              </Col>
            </>
          ) : (
            <>
              <Col
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="d-flex justify-content-center align-items-center p-0 m-0"
              >
                <Outlet />
                </Col>
                <Col xl={6} lg={6} md={0} sm={0} xs={0} className="vanising-div">
              <img src={SideImg} width="500" alt="sideimg" />
            </Col>
            </>
          )}
        </Row>
        <Footer />
      </div>
    </Container>
  );
}

export default PrivateLayout;
