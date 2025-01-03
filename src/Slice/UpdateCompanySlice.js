import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/company-routes/company-update`;
//const URL = `/api_v3/UpdateCompany.aspx`; // Use the relative path for proxy

export const UpdateCompany = createAsyncThunk(
  "UpdateCompany",
  async ({ data, userInfo }, { rejectWithValue }) => {
   // console.log(data,userInfo,"in slice");
    
    try {
      let API_Head = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userInfo?.data?.token}`,
        },
      };
      const response = await axios.patch(URL, data, API_Head); // Convert data to JSON string
      return response?.message;
    } catch (UpdateCompanyErrorMsg) {
      console.UpdateCompanyErrorMsg(
        "UpdateCompanyErrorMsg Response:",
        UpdateCompanyErrorMsg
      );
      // Return UpdateCompanyErrorMsg message to be handled in rejected case
      return rejectWithValue(
        UpdateCompanyErrorMsg.message || "Something went wrong"
      );
    }
  }
);

const UpdateCompanySlice = createSlice({
  name: "UpdateCompany",
  initialState: {
    isUpdateCompanyLoading: false,
    UpdateCompanysuccessMsg: "",
    UpdateCompanyErrorMsg: "",
    isUpdateCompanyErrorMsg: false,
    isUpdateCompanysuccessMsg: false,
  },
  reducers: {
    ClearUpdateCompany: (state) => {
      state.UpdateCompanyErrorMsg = "";
      state.isUpdateCompanyErrorMsg = false;
      state.isUpdateCompanysuccessMsg = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateCompany.pending, (state) => {
        state.isUpdateCompanyLoading = true;
        state.isUpdateCompanyErrorMsg = false;
        state.isUpdateCompanysuccessMsg = false;
      })
      .addCase(UpdateCompany.fulfilled, (state, { payload }) => {
        state.isUpdateCompanyErrorMsg = false;
        state.isUpdateCompanyLoading = false;
        state.isUpdateCompanysuccessMsg = true;
        state.UpdateCompanysuccessMsg = payload;
      })
      .addCase(UpdateCompany.rejected, (state, { payload }) => {
        state.isUpdateCompanyLoading = false;
        state.isUpdateCompanyErrorMsg = true;
        state.isUpdateCompanysuccessMsg = false;
        state.UpdateCompanyErrorMsg = payload;
      });
  },
});

export const { ClearUpdateCompany } = UpdateCompanySlice.actions;
export default UpdateCompanySlice.reducer;
