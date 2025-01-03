import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/sales-routes/generate-policy`;
// const URL = `/api_v3/generatePolicies.aspx`; // Use the relative path for proxy

export const GeneratePolicy = createAsyncThunk(
  "GeneratePolicy",
  async ({userdata,authtoken}, { rejectWithValue }) => {
    console.log(userdata);
    
    try {
      let API_Head = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${authtoken}`,
        },
      };
      const response = await axios.post(URL, userdata, API_Head); // Convert data to JSON string
     return response.data.policies;
    } catch (err) {
      console.log("PolicyErrorMsg Response:", err);
      // Return PolicyErrorMsg message to be handled in rejected case
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

const GeneratePolicySlice = createSlice({
  name: "GeneratePolicy",
  initialState: {
    isPolicyLoading: false,
    GeneratePolicySuccessMsg: "",
    PolicyErrorMsg: "",
    isPolicyError: false,
    isPolicySuccess: false,
  },
  reducers: {
    ClearPolicyState: (state) => {
      state.PolicyErrorMsg = "";
      state.isPolicyError = false;
      state.isPolicySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GeneratePolicy.pending, (state) => {
        state.isPolicyLoading = true;
        state.isPolicyError = false;
        state.isPolicySuccess = false;
      })
      .addCase(GeneratePolicy.fulfilled, (state, { payload }) => {
        state.isPolicyError = false;
        state.isPolicyLoading = false;
        state.isPolicySuccess = true;
        state.GeneratePolicySuccessMsg = payload;
      })
      .addCase(GeneratePolicy.rejected, (state, { payload }) => {
        state.isPolicyLoading = false;
        state.isPolicyError = true;
        state.isPolicySuccess = false;
        state.PolicyErrorMsg = payload;
      });
  },
});

export const { ClearPolicyState } = GeneratePolicySlice.actions;
export default GeneratePolicySlice.reducer;
