import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/sales-routes/get-alldetails`;
//const URL = `/api_v3/SalesDetail.aspx`; // Use the relative path for proxy

export const SalesDetail = createAsyncThunk(
  "SalesDetail",
  async (UserData, { rejectWithValue }) => {
    try {
      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserData?.token}`,
      };
      const response = await axios.post(URL, UserData?.data, { headers }); // Convert data to JSON string
      console.log(response?.data);
      
      return response?.data?.data;
    } catch (err) {
      console.log("SalesDetailErrorMsg Response:", err);
      // Return SalesDetailErrorMsg message to be handled in rejected case
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

const SalesDetailSlice = createSlice({
  name: "SalesDetail",
  initialState: {
    isSalesDetailLoading: false,
    SalesDetailData: [],
    SalesDetailErrorMsg: "",
    isSalesDetailError: false,
    isSalesDetailSuccess: false,
  },
  reducers: {
    ClearSalesDetailSlice: (state) => {
      state.SalesDetailErrorMsg = "";
      state.isSalesDetailError = false;
      state.isSalesDetailSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SalesDetail.pending, (state) => {
        state.isSalesDetailLoading = true;
      })
      .addCase(SalesDetail.fulfilled, (state, { payload }) => {
        state.isSalesDetailSuccess = true;
        state.SalesDetailData = payload;
      })
      .addCase(SalesDetail.rejected, (state, { payload }) => {
        state.isSalesDetailError = true;
        state.SalesDetailErrorMsg = payload;
      });
  },
});

export const { ClearSalesDetailSlice } = SalesDetailSlice.actions;
export default SalesDetailSlice.reducer;
