import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/company-routes/company-update`;

export const CompanyEditFunc = createAsyncThunk(
  "CompanyEdit",
  async ({ updatedObj, userInfo }, { rejectWithValue }) => {
    console.log(userInfo);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.patch(URL, updatedObj, config);
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const CompanyEditSlice = createSlice({
  name: "CompanyEdit",
  initialState: {
    isloadingCompanyEdit: false,
    ResultCompanyEdit: {},
    errorCompanyEdit: "",
    isErrorCompanyEdit: false,
    isSuccessCompanyEdit: false,
  },
  reducers: {
    ClearStateCompanyEdit: (state) => {
      state.errorCompanyEdit = "";
      state.isErrorCompanyEdit = false;
      state.isSuccessCompanyEdit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CompanyEditFunc.pending, (state) => {
        state.isloadingCompanyEdit = true;
        state.isErrorCompanyEdit = false;
        state.isSuccessCompanyEdit = false;
      })
      .addCase(CompanyEditFunc.fulfilled, (state, { payload }) => {
        state.isErrorCompanyEdit = false;
        state.isloadingCompanyEdit = false;
        state.isSuccessCompanyEdit = true;
        state.ResultCompanyEdit = payload;
      })
      .addCase(CompanyEditFunc.rejected, (state, { payload }) => {
        state.isloadingCompanyEdit = false;
        state.isErrorCompanyEdit = true;
        state.isSuccessCompanyEdit = false;
        state.errorCompanyEdit = payload;
      });
  },
});
export const { ClearStateCompanyEdit } = CompanyEditSlice.actions;
export default CompanyEditSlice.reducer;
