import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Button, Container } from "react-bootstrap";
import "../../GlobalStyle/GlobalTheme.css";
import Loader from "../../Component/Loader";
import SelectOption from "../../Component/SelectOption";
import imgupload from "../../Asset/upload.png";

import useFetchInvoice from "../../CustomHook/useFetchInvoice";
import {
  GeneratePolicy,
  ClearPolicyState,
} from "../../Slice/GeneratePolicyNoSlice";
import {
  SalesDetail,
  ClearSalesDetailSlice,
} from "../../Slice/SalesDetailSlice";
import { FetchToken } from "../../Slice/FetchTokenSlice";
import { UpdateCompany } from "../../Slice/UpdateCompanySlice";
import { InsertPolicyNo } from "../../Slice/InsertPolicySlice";
import { Toast } from "bootstrap/dist/js/bootstrap.min";
const PolicyGen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  //console.log(userInfo);
  const [data, setData] = useState({
    inv_no: null,
    API_Token: userInfo?.data?.compnayDetails?.API_Token || null,
    array: [],
  });
  const dispatch = useDispatch();
  const { InvoiceListData, isInvoiceListSuccess } = useFetchInvoice(
    { userInfo },
    []
  );
  const {
    isPolicyLoading,
    GeneratePolicySuccessMsg,
    PolicyErrorMsg,
    isPolicyError,
    isPolicySuccess,
  } = useSelector((state) => state.genpolicy);

  const { Token } = useSelector((state) => state.token);

  const {
    SalesDetailData,
    isSalesDetailSuccess,
    SalesDetailErrorMsg,
    isSalesDetailError,
  } = useSelector((state) => state.salesdetail);
  //console.log(SalesDetailData);
  //toaster for item
  useEffect(() => {
    if (isSalesDetailError) {
      toast.error(SalesDetailErrorMsg, {
        autoClose: 3000,
        position: "top-right",
      });
    }
  }, [isSalesDetailError, SalesDetailErrorMsg]);
  //toaster for policy gen

  useEffect(() => {
    // if (isPolicyLoading) {
    //   toast.loading("Please wait ....", { position: "top-right" });
    // }
    if (isPolicySuccess) {
      if (!GeneratePolicySuccessMsg[0]?.url) {
        toast.error(GeneratePolicySuccessMsg[0]?.message, {
          autoClose: 3000,
          position: "top-right",
        });
      } else {
        toast.success("Policy generated successfully", {
          autoClose: 3000,
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/insurance/certificate");
        }, [2000]);
      }
    }
    if (isPolicyError) {
      toast.error("Error occur", {
        autoClose: 3000,
        position: "top-right",
      });
    }
    dispatch(ClearPolicyState());
    dispatch(ClearSalesDetailSlice());
  }, [isPolicyError, isPolicySuccess]);

  const OnChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const FetchAPIToken = async (data) => {
    let newObj = { data, token: userInfo?.data?.token };
     setData((prev) => {
       return { ...prev, API_Token: null };
     });
    dispatch(FetchToken(newObj))
      .unwrap()
      .then(async (res) => {
        setData((prev) => {
          return { ...prev, API_Token: res?.token };
        });
        FetchSalesDetails(res?.token);
      })
      .catch((err) => {
        toast.error(err, { autoClose: 5000, position: "top-right" });
      });
  };

  const FetchSalesDetails = async (apitoken) => {
    let objdata = {
      data: { inv_no: data?.inv_no },
      token: userInfo?.data?.token,
    };
    console.log(objdata);
    dispatch(SalesDetail(objdata))
      .unwrap()
      .then(async (res2) => {
        if (apitoken) {
          GenerateItemPolicy(apitoken, res2);
        } 
      });
  };

  const GenerateItemPolicy = async (tokenargs, salesdata) => {
    let array = [];
    let primaryArray = [...salesdata];
    array = primaryArray.map((item) => {
      let obj = {
        token: tokenargs,
        id: item?.id,
        name: item?.name,
        grosswt: item?.grosswt,
        metaldetails: [
          {
            wt: item?.wt,
            unitofwt: item?.unitofwt,
            type: item?.type,
            purity: item?.purity,
          },
        ],
        hallmarked: item?.hallmarked,
        stonedetails: [],
        decovativeitem: [],
        jewellerycertificatedetails: [],
        cust_email: item?.cust_email || "",
        inv_no: item?.inv_no,
        inv_dt: item?.inv_dt,
        inv_itemsrno: item?.inv_itemsrno,
        cust_name: item?.cust_name,
        cust_mobile: item?.cust_mobile,
        inv_amt: item?.inv_amt,
        insurance: item?.insurance,
      };
      return obj;
    });
    let userdata = {
      TagList: array,
    };
    dispatch(GeneratePolicy({ userdata, authtoken: userInfo?.data?.token }))
      .unwrap()
      .then((res) => {
        let arr = res?.map((item) => {
          return { policy: item?.policy };
        });
        let arr2 = array?.map((item) => {
          return { inv_itemsrno: item?.inv_itemsrno, inv_no: item?.inv_no };
        });
        let UserData = arr?.map((item, index) => {
          return { ...arr[index], ...arr2[index] };
        });
        //console.log(UserData);
        dispatch(InsertPolicyNo({ UserData, userInfo }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (data?.inv_no !== null && data?.inv_no !== undefined) {
      FetchAPIToken({
        key: userInfo?.data?.compnayDetails?.key,
        hash_value: userInfo?.data?.compnayDetails?.hash_value,
      });
    } else {
      toast.error("Please Select The Invoice Number First", {
        autoClose: 3000,
        position: "top-right",
      });
    }
  };

  // useEffect(() => {
  //   if (isSalesDetailSuccess) {
  //     GenerateItemPolicy();
  //   }
  //   console.log("hello 2 ");
  // }, [isSalesDetailSuccess]);

  const selectiondata = useMemo(() => {
    let objArr = [{ Name: "--Select Invoice Number---", Value: -1 }];
    InvoiceListData?.map((item) => {
      let subobj = {
        Name: item?.inv_no,
        Value: item?.inv_no,
      };
      objArr.push(subobj);
    });
    return objArr || [];
  }, [isInvoiceListSuccess]);

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
        <h5 className="text-center">Apply for Insurance</h5>
        <form className="form_wrapper">
          <Row>
            <Col xs={12} lg={12}>
              <SelectOption
                OnSelect={OnChangeHandler}
                PlaceHolder={"Select Invoice Number"}
                SName={"inv_no"}
                SelectStyle={{
                  padding: "8px",
                }}
                Value={data?.inv_no} // Ensure it points to the correct key
                Soptions={selectiondata}
                key={1}
              />
            </Col>
            <Col
              xs={12}
              lg={12}
              className="mt-4 d-flex justify-content-center align-items-center"
            >
              <Button variant="success" type="submit" onClick={SubmitHandler}>
                {isPolicyLoading ? <>{"Please Wait ..."}</> : "Apply"}
              </Button>
            </Col>
          </Row>
        </form>{" "}
      </div>
    </Container>
  );
};

export default PolicyGen;
