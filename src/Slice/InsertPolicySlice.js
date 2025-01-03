import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/sales-routes/update-policy`;

export const InsertPolicyNo = createAsyncThunk(
  "PolicyInsert",
  async ({UserData,userInfo}, { rejectWithValue }) => {
    // console.log(userInfo.data.token);
    try {
      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.data?.token}`,
      };
      // console.log(headers);

      const { data } = await axios.post(URL,UserData, { headers });
      return data?.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const InsertPolicySlice = createSlice({
  name: "PolicyInsert",
  initialState: {
    isPolicyInsertLoading: false,
    PolicyInsertSuccessMsg: [],
    isPolicyInsertError: false,
    PolicyInsertErrorMsg: "",
    isPolicyInsertSuccess: false,
  },
  reducers: {
    ClearInsertPolicy: (state) => {
      state.PolicyInsertErrorMsg = "";
      state.isPolicyInsertError = false;
      state.isPolicyInsertSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(InsertPolicyNo.pending, (state) => {
        state.isPolicyInsertLoading = true;
        state.PolicyInsertErrorMsg = false;
        state.isPolicyInsertSuccess = false;
      })
      .addCase(InsertPolicyNo.fulfilled, (state, { payload }) => {
        state.PolicyInsertErrorMsg = false;
        state.isPolicyInsertLoading = false;
        state.isPolicyInsertSuccess = true;
        state.PolicyInsertSuccessMsg = payload;
      })
      .addCase(InsertPolicyNo.rejected, (state, { payload }) => {
        state.isPolicyInsertLoading = false;
        state.isPolicyInsertError = true;
        state.isPolicyInsertSuccess = false;
        state.PolicyInsertErrorMsg = payload;
      });
  },
});
export const { ClearInsertPolicy } = InsertPolicySlice.actions;
export default InsertPolicySlice.reducer;
