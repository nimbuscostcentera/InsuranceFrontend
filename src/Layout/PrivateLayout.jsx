import React from "react";
import NavigationBar from "../Component/Header/NavigationBar";
import Footer from "../Component/Footer";
import "../GlobalStyle/GlobalTheme.css";
import "./AuthLayout.css";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import imgsrc from "../Asset/insure.png";

function PrivateLayout() {
  return (
    <Container fluid className="base-Container">
      <NavigationBar />
      <Row style={{ height: "100%", width: "100%" }}>
        <Col sm={12} md={6} lg={6} style={{ height: "100%", padding: 0 }}>
          <Outlet />
        </Col>
        <Col
          sm={12}
          md={6}
          lg={6}
          style={{ height: "100%" }}
          className="vanising-div"
        >
          <img src={imgsrc} alt="pic" width={"100%"} />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default PrivateLayout;
