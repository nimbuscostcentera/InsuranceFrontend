import React, { useEffect, useMemo, useState } from "react";
import { ClearState16, UserListFunc } from "../Slice/UserListSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
const useFetchUser = (obj = {}, dep = []) => {
  const today = moment();
  const dispatch = useDispatch();
  const { isloading16, Result16, error16, isError16, isSuccess16 } =
    useSelector((state) => state.userlist);
  useEffect(() => {
    dispatch(UserListFunc(obj));
  }, dep);

  let UserList = useMemo(() => {
    let list = Result16?.map((item) => {
      let obj = { ...item };
      let Reminder = item?.Reminder || 0;
      let StartDate = moment(item?.Start_Date);
      let EndDate = moment(item?.End_Date);
      let DueDays = EndDate.diff(today, "days");
      obj.DueDays = DueDays;
      obj.isOver = 0;
      if (DueDays < Reminder && DueDays > 0) {
        obj.color = "#ffc290";
        obj.border = " #fa7202";
        obj.isFollowUp=1
      } else if (DueDays <= 0) {
        obj.color = "#ff8b8b";
        obj.border = "#ff0000";
        obj.isOver = 1;
      }
      else if (StartDate.diff(today,"days") === 0) {
        obj.color = "#c8fadf";
      obj.border = "#3ee07a"; }
      return obj || {};
    });
    return list||[];
  }, [isSuccess16, Result16]);

  return { UserList, isSuccess16, isError16, isloading16, error16 };
};

export default useFetchUser;
