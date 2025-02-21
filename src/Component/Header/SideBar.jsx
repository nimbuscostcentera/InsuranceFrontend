import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Image from "../../Asset/Nimbus_Logo_Transparent_white.png";
import "./authNavBar.css";
import "../../GlobalStyle/authcss.css";
import {
  CloseSideBarMenu,
  OpenSideBarMenu,
} from "../../Slice/SideBarControlSlice";
function SideBar() {
  const { Open } = useSelector((state) => state.controlSideBar);

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo?.data?.compnayDetails?.company_name)

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  function toggleNav() {
    setShow(!show);
    const titlediv = document.getElementById("title-div");
    const title = document.getElementById("title-h");
    const sidebar = document.getElementById("mySidebar");
    if (Open) {
      dispatch(CloseSideBarMenu());
       title.classList.add("close");
      titlediv.classList.add("close");
      sidebar.classList.add("close");
    } else {
      dispatch(OpenSideBarMenu());
       title.classList.remove("close");
      titlediv.classList.remove("close");
       sidebar.classList.remove("close");
    }
  }

  return (
    <div className="sidebar" id="mySidebar">
      <div className="sidebar-header ml-3" id="title-div">
        <h6 className="sidebar-title" id="title-h">
          Menu
          
        </h6>
        <button className="toggle-btn" onClick={toggleNav}>
          <i className="bi bi-list" style={{marginRight:"15px"}}></i>
        </button>
      </div>
      <div>
         
         {userInfo?.data?.compnayDetails?.company_name == "NSPL" ? (
           <Link to={"/insurance/adminpanel"}>
           <i className="bi bi-bar-chart"></i> <span>Admin panel</span>
         </Link>
         ):""}

         
           {userInfo?.data?.compnayDetails?.company_name == "NSPL" ? (
           <Link to={"/insurance/companyreg"}>
            <i className="bi bi-person-fill"></i>
            <span>Company Register</span>
         </Link>
         ):""}

          {/* <Link to={"/insurance/companyreg"}>
            <i className="bi bi-person-fill"></i>
            <span>Company Register</span>
          </Link> */}

        <Link to="/insurance">
        <i className="bi bi-box-arrow-in-down"></i>
          <span>Upload Excel</span>
        </Link>
        <Link to="/insurance/policy">
        <i className="bi bi-hand-index-fill"></i>
          <span>Policy Apply</span>
        </Link>
      </div>{" "}
    </div>
  );
}

export default SideBar;
