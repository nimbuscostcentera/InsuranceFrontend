import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/company-routes/company-details`;

export const getAllCompanyListList = createAsyncThunk(
  "CompanyListList",
    async ({userInfo}, { rejectWithValue }) => {
        // console.log(userInfo.data.token);
    try {
     let headers = {
       "Content-Type": "application/json",
       Authorization: `Bearer ${userInfo?.data?.token}`,
     };
        console.log(headers);
        
      const { data } = await axios.get(URL,{headers });
      console.log(data)
      return data?.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const CompanyListSlice = createSlice({
  name: "CompanyListList",
  initialState: {
    isCompanyListLoading: false,
    CompanyListList: [],
    CompanyListErrorMsg: "",
    isCompanyListError: false,
    isCompanyListSuccess: false,
  },
  reducers: {
    ClearStateCompanyList: (state) => {
      state.CompanyListErrorMsg = "";
      state.isCompanyListError = false;
      state.isCompanyListSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanyListList.pending, (state) => {
        state.isCompanyListLoading = true;
        state.isCompanyListError = false;
        state.isCompanyListSuccess = false;
      })
      .addCase(getAllCompanyListList.fulfilled, (state, { payload }) => {
        state.isCompanyListError = false;
        state.isCompanyListLoading = false;
        state.isCompanyListSuccess = true;
        state.CompanyListList = payload;
      })
      .addCase(getAllCompanyListList.rejected, (state, { payload }) => {
        state.isCompanyListLoading = false;
        state.isCompanyListError = true;
        state.isCompanyListSuccess = false;
        state.CompanyListErrorMsg = payload;
      });
  },
});
export const { ClearStateCompanyList } = CompanyListSlice.actions;
export default CompanyListSlice.reducer;
