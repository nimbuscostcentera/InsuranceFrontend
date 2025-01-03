import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}/sales-routes/add-salesinfo`;

export const LoadAllData = createAsyncThunk(
  "LoadAllData",
  async ({ data, userInfo }, { rejectWithValue }) => {
    console.log(data);
    let headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${userInfo?.data?.token}`,
    };

    try {
      const response = await axios.post(URL, data, { headers });

      return response?.data?.message; // Assuming `response.data.message` contains the success message
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const UploadExcelSlice = createSlice({
  name: "LoadAllData",
  initialState: {
    isUploadLoading: false,
    UploadDataSuccessMsg: "",
    UploadDataErrorMsg: "",
    isUploadError: false,
    isUploadSuccess: false,
  },
  reducers: {
    ClearUploadState: (state) => {
      state.UploadDataErrorMsg = "";
      state.isUploadError = false;
      state.isUploadSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoadAllData.pending, (state) => {
        state.isUploadLoading = true;
        state.isUploadError = false;
        state.isUploadSuccess = false;
      })
      .addCase(LoadAllData.fulfilled, (state, { payload }) => {
        state.isUploadError = false;
        state.isUploadLoading = false;
        state.isUploadSuccess = true;
        state.UploadDataSuccessMsg = payload;
      })
      .addCase(LoadAllData.rejected, (state, { payload }) => {
        state.isUploadLoading = false;
        state.isUploadError = true;
        state.isUploadSuccess = false;
        state.UploadDataErrorMsg = payload;
      });
  },
});

export const { ClearUploadState } = UploadExcelSlice.actions;
export default UploadExcelSlice.reducer;
