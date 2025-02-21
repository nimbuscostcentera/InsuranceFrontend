import React, { useState, useEffect } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, FormCheck } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../../GlobalStyle/GlobalTheme.css";
import "./Admin.css";

import DateRangeInput from "../../Component/DateRangeInput";
import InputBox from "../../Component/InputBox";
import Table from "../../Component/Table";
import SelectOption from "../../Component/SelectOption";

// import useFetchUser from "../../CustomHook/useFetchUser";
import { useDispatch, useSelector } from "react-redux";
// import { ClearStateUserEdit, UserEditFunc } from "../../Slice/UserEditSlice";
// import CrossFilterIcon from "../../Component/icons/CrossFilterIcon";
import CheckBox from "../../Component/CheckBox";

import SortArrayByNumber from "../../GlobalFunctions/SortArrayByNumber";
import SortArrayByDate from "../../GlobalFunctions/SortArrayByDate";
import SortArrayByString from "../../GlobalFunctions/SortarrayByString";
import { getAllCompanyListList } from "../../Slice/CompanyDetailsSlice";
import { CompanyEditFunc } from "../../Slice/CompanyEditSlice";
import { type } from "@testing-library/user-event/dist/type";

function AdminPanel() {
  const currentdate = moment();
  const dispatch = useDispatch();
  const today = moment();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    isloadingCompanyEdit,
    ResultCompanyEdit,
    errorCompanyEdit,
    isErrorCompanyEdit,
    isSuccessCompanyEdit,
  } = useSelector((state) => state.ComEdit);

  const { Open } = useSelector((state) => state.controlSideBar);

  useEffect(() => {
    const tconainer = document.getElementById("tconainer");
    if (!Open) {
      tconainer.classList.add("close");
    } else {
      tconainer.classList.remove("close");
    }
  }, [Open]);

  const [filter, setFilter] = useState({
    EndDate: currentdate.format("YYYY-MM-DD"),
    StartDate: "",
    search: null,
    overdue: 2,
    order: "Asc",
    followUp: 2,
  });

  const [updatedObj, setUpdatedObject] = useState({});
  const [ActionId, SetActionId] = useState(null);
  const [tab, setTab] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const {
    isCompanyListLoading,
    CompanyListList,
    CompanyListErrorMsg,
    isCompanyListError,
    isCompanyListSuccess,
  } = useSelector((state) => state.allCom);

  // console.log(CompanyListList)

  useEffect(() => {
    dispatch(getAllCompanyListList(userInfo)).then((res) => {
      console.log(res);
      setFilteredData(res?.payload);
    });
  }, [isSuccessCompanyEdit]);

  const onChangeHandler = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    console.log(filter.StartDate, value);
    setFilter({ ...filter, [key]: value });
  };

  const UpdateTable = (index, e) => {
    // console.log(e,"update")
    let mainArray = [...filteredData];
    let newobj = { ...mainArray[index] };
    let key = e.target.name;
    let value = e.target.value;
    newobj[key] = value;
    console.log(newobj, "newobj");
    setUpdatedObject(newobj);
    mainArray[index] = newobj;
    setFilteredData(mainArray);
  };
  const SaveChange = (obj, e) => {
    e.preventDefault();
    dispatch(CompanyEditFunc({ updatedObj, userInfo }));
    SetActionId(null);
  };
  // load table data when userlist updated
  useEffect(() => {
    setTab(CompanyListList);
    setFilteredData(CompanyListList);
  }, [isSuccessCompanyEdit]);
  //toaster
  useEffect(() => {
    if (isSuccessCompanyEdit && !isloadingCompanyEdit) {
      toast.success(ResultCompanyEdit.message, {
        autoClose: 5000,
        position: "top-right",
      });
    } else if (isErrorCompanyEdit && !isloadingCompanyEdit) {
      toast.error(errorCompanyEdit.message, {
        autoClose: 5000,
        position: "top-right",
      });
    }
  }, [isSuccessCompanyEdit, isErrorCompanyEdit]);
  //sort table
  const SortMyTable = (header) => {
    console.log(header, "ji");
    if (filter?.order === "Asc") {
      setFilter((prev) => {
        return { ...prev, order: "Desc" };
      });
    } else if (filter?.order === "Desc") {
      setFilter((prev) => {
        return { ...prev, order: "Asc" };
      });
    }
    console.log(filter);
    if (
      header === "company_name" ||
      header === "PANNo" ||
      header === "GSTIN" ||
      header === "company_email"
    ) {
      let result = SortArrayByString(filter?.order, filteredData, header);
      setFilteredData(result);
    } else if (header === "End_Date" || header === "Start_Date") {
      let result = SortArrayByDate(filter?.order, filteredData, header);
      setFilteredData(result);
    } else if (
      header === "DueDays" ||
      header === "Reminder" ||
      header === "company_mobile"
    ) {
      let result = SortArrayByNumber(filter?.order, filteredData, header);
      setFilteredData(result);
    }
  };
  //search table
  const SearchFunction = (e) => {
    e.preventDefault();
    let SearchData = [];
    if (
      e?.target?.value === "" ||
      e?.target?.value === null ||
      e?.target?.value === undefined
    ) {
      setFilteredData(tab);
    } else {
      tab.map((item) => {
        let flag = false;
        let keyArray = Object.keys(item);
        for (let key = 0; key <= keyArray.length - 1; key++) {
          let text = item[`${keyArray[key]}`]?.toString().toUpperCase();
          let inputstring = String(filter?.search).toUpperCase();
          let isin = text?.includes(inputstring);
          console.log(text, inputstring);
          if (isin) {
            flag = true;
            break;
          }
        }
        if (flag === true) {
          SearchData.push(item);
        }
      });
      setFilteredData(SearchData);
    }
  };
  //date filter
  const HandleDateFilter = () => {
    let sdate = moment(filter?.StartDate);
    let edate = moment(filter?.EndDate);

    let table = filteredData.filter((item) => {
      let eitemdate = moment(item?.End_Date);
      let ediff = eitemdate.diff(edate, "days");
      let sdiff = eitemdate?.diff(sdate, "days");

      console.log(
        "range",
        edate.format("DD/MM/YYYY"),
        "item:",
        eitemdate.format("DD/MM/YYYY"),
        "sd:",
        sdiff,
        "ed:",
        ediff
      );
      if (sdiff > 0 && ediff < 0) {
        return item;
      }
    });
    setFilteredData(table);
  };
  //subscription over
  const HandleSubcriptionOver = () => {
    let array = [...tab];
    let table = array.filter((item) => item?.isOver == 1);
    setFilteredData(table);
  };
  //follow up function
  const HandleFollowUpfunc = () => {
    let array = [...tab];
    let table = array.filter((item) => item?.isFollowUp == 1);
    setFilteredData(table);
  };
  //filter overdue
  useEffect(() => {
    if (filter?.overdue == 1) {
      console.log("hi");

      HandleSubcriptionOver();
    }
    if (filter?.overdue == 2) {
      setFilteredData(tab);
    }
  }, [filter?.overdue]);

  //filter follow up
  useEffect(() => {
    if (filter?.followUp == 1) {
      HandleFollowUpfunc();
    }
    if (filter?.followUp == 2) {
      setFilteredData(tab);
    }
  }, [filter?.followUp]);
  //filter date
  useEffect(() => {
    HandleDateFilter();
  }, [filter?.EndDate, filter?.StartDate]);
  const Column = [
    {
      headername: "Company Name",
      fieldname: "company_name",
      type: "string",
      width: "150px",
    },
    {
      headername: "Phone No.",
      fieldname: "company_mobile",
      type: "number",
      width: "150px",
    },
    {
      headername: "Email",
      fieldname: "company_email",
      type: "string",
    },
    { headername: "GSTIN", fieldname: "GSTIN", type: "string", width: "150px" },
    {
      headername: "PAN No.",
      fieldname: "PANNo",
      type: "string",
      width: "150px",
    },
    {
      headername: "Reminder",
      fieldname: "Reminder",
      type: "string",
      width: "150px",
    },
    {
      headername: "Due/OverDue",
      fieldname: "Reminder",
      type: "string",
      width: "150px",
    },
    {
      headername: "Start Date",
      fieldname: "Start_Date",
      type: "string",
      width: "150px",
    },
    {
      headername: "End Date",
      fieldname: "End_Date",
      type: "string",
      width: "150px",
    },
  ];
  return (
    <Row id="tconainer" style={{ height: "80vh" }}>
      <ToastContainer />
      <Col xl={12} lg={12} sm={12} className="pt-3 ps-3">
        <div
          style={{ width: "100%" }}
          className="d-flex justify-content-between align-items-center flex-wrap"
        >
          <div>
            <h5 className="text-secondary-emphasis">Admin Panel</h5>
          </div>
          <div className="d-flex justify-content-end align-items-center">
           
              <CheckBox
                Label={"Subscription Over"}
                onChange={onChangeHandler}
                key={2}
                cname="overdue"
                isChecked={filter?.overdue == 1 ? true : false}
                cvalue={filter?.overdue == 1 ? 2 : 1}
              />
           
              <CheckBox
                Label={"Follow Up"}
                onChange={onChangeHandler}
                key={3}
                cname="followUp"
                isChecked={filter?.followUp == 1 ? true : false}
                cvalue={filter?.followUp == 1 ? 2 : 1}
              />
           
          </div>
        </div>
        <hr className="mb-1 mt-2"/>
      </Col>
      <Col lg={9} md={12} sm={12} xs={12} className="pt-0 mt-0">
        <Row>
          <Col xl={5} md={7} sm={12}>
            <DateRangeInput
              EndDate={"EndDate"}
              EndDateValue={filter?.EndDate}
              InputHandler={onChangeHandler}
              StartDate={"StartDate"}
              StartDateValue={filter?.StartDate}
              maxdate1={currentdate.format("YYYY-MM-DD")}
              mindate1={"1947-01-01"}
              // mindate2={filter?.StartDate}
              mindate2={
                filter?.StartDate
                  ? moment(filter.StartDate, "YYYY-MM-DD")
                      .add(1, "days")
                      .format("YYYY-MM-DD")
                  : null
              }
              maxdate2={"0000-00-00"}
              key={1}
            />
          </Col>
        </Row>
      </Col>
      <Col lg={3} md={12} sm={12} xs={12} className="pt-2 mt-0">
        <div className="d-flex justify-content-end align-items-center pb-2">
          <input
            type="search"
            id="form1"
            className="form-control"
            placeholder="Search...."
            onChange={(e) => {
              let value = e.target.value;
              setFilter({ ...filter, search: value });
              SearchFunction(e);
            }}
            style={{
              padding: "5px 10px",
              width: "300px",
              marginTop: "20px",
            }}
          />
        </div>

        {/* </div> */}
      </Col>
      <Col lg={12} sm={12}>
        <div
          className="table-responsive tconainer"
          style={{ marginLeft: "5px", height: "65vh" }}
        >
          <Table
            tab={filteredData || []}
            isAction={true}
            ActionFunc={(id) => {
              SetActionId(id);
            }}
            isEdit={true}
            EditedData={updatedObj}
            OnChangeHandler={UpdateTable}
            OnSaveHandler={SaveChange}
            ActionId={ActionId}
            Col={Column || []}
            onSorting={SortMyTable}
            today={today}
            isLoading={isCompanyListLoading}
          />
        </div>
      </Col>
    </Row>
  );
}

export default AdminPanel;
