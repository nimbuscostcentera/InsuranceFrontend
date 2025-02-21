import React from "react";
import { Container} from "react-bootstrap";
import AuthNavBar from "../../Component/Header/AuthNavBar";
import Footer from "../../Component/Footer";
import SideBar from "../../Component/Header/SideBar";
import "../../GlobalStyle/GlobalTheme.css";
import "./Test.css";
import { Outlet } from "react-router-dom";


function PrivateWrapper() {
  return (
    <Container fluid className="base-container d-flex">
      <SideBar />
      <div style={{width:"100%"}}>
        {/* <AuthNavBar /> */}
        <Outlet/>
        <Footer />
      </div>
    </Container>
  );
}

export default PrivateWrapper;
