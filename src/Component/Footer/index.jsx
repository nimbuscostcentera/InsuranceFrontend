import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./Footer.css"
function Footer() {
  return (
    <div className="d-flex justify-content-center align-items-center footer py-2" style={{overflow:"hidden",width:"100vw"}}>
      Copyright
      <a href="#"> Nimbus System Pvt. Ltd. </a>
      2024
    </div>
  );
}

export default Footer;
