import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../Component/Header/NavigationBar";
import SideImg from "../../src/Asset/meeting.webp";
import "./AuthLayout.css";
import Footer from "../Component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import "../GlobalStyle/GlobalTheme.css";

function AuthLayout() {
  return (
    <Container fluid className="base-Container">
      <NavigationBar />
      <Row className="inner-container">
        <Col xl={6} lg={6} md={6} className="vanising-div ">
          <img src={SideImg} width="100%" alt="sideimg" id="sideimg" />
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          className="m-0 p-0 d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div style={{width:"auto"}}>
            <Outlet />
          </div>
          {/* {children} */}
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default AuthLayout;
