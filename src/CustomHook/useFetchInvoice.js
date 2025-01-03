import React, { useEffect, useMemo } from "react";
import { getAllInvoiceListList } from "../Slice/InvoiceListSlice";
import { useDispatch, useSelector } from "react-redux";
function useFetchInvoice(obj = {}, dep = []) {
    const dispatch = useDispatch();
      const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllInvoiceListList(obj));
  }, dep);
  const {
    isInvoiceListLoading,
    InvoiceListList,
    InvoiceListErrorMsg,
    isInvoiceListError,
    isInvoiceListSuccess
    } = useSelector((state) => state.invoicelist);
    
  const InvoiceListData = useMemo(() => {
    if (isInvoiceListSuccess) {
      return InvoiceListList || [];
    } else {
      return [];
    }
  }, [isInvoiceListSuccess]);
   // console.log(InvoiceListList);
    
  return {
    isInvoiceListLoading,
    InvoiceListData,
    InvoiceListErrorMsg,
    isInvoiceListError,
    isInvoiceListSuccess,
  };
}

export default useFetchInvoice;
