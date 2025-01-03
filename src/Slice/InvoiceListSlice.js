import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/sales-routes/get-salesinfo`;

export const getAllInvoiceListList = createAsyncThunk(
  "InvoiceListList",
    async ({userInfo}, { rejectWithValue }) => {
        // console.log(userInfo.data.token);
    try {
     let headers = {
       "Content-Type": "application/json",
       Authorization: `Bearer ${userInfo?.data?.token}`,
     };
        // console.log(headers);
        
      const { data } = await axios.get(URL,  { headers });
      return data?.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const InvoiceListSlice = createSlice({
  name: "InvoiceListList",
  initialState: {
    isInvoiceListLoading: false,
    InvoiceListList: [],
    InvoiceListErrorMsg: "",
    isInvoiceListError: false,
    isInvoiceListSuccess: false,
  },
  reducers: {
    ClearStateInvoiceList: (state) => {
      state.InvoiceListErrorMsg = "";
      state.isInvoiceListError = false;
      state.isInvoiceListSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInvoiceListList.pending, (state) => {
        state.isInvoiceListLoading = true;
        state.isInvoiceListError = false;
        state.isInvoiceListSuccess = false;
      })
      .addCase(getAllInvoiceListList.fulfilled, (state, { payload }) => {
        state.isInvoiceListError = false;
        state.isInvoiceListLoading = false;
        state.isInvoiceListSuccess = true;
        state.InvoiceListList = payload;
      })
      .addCase(getAllInvoiceListList.rejected, (state, { payload }) => {
        state.isInvoiceListLoading = false;
        state.isInvoiceListError = true;
        state.isInvoiceListSuccess = false;
        state.InvoiceListErrorMsg = payload;
      });
  },
});
export const { ClearStateInvoiceList } = InvoiceListSlice.actions;
export default InvoiceListSlice.reducer;
