import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/company-routes/company-login`;
//const URL = `/api_v3/authenticate.aspx`; // Use the relative path for proxy

export const authenticate = createAsyncThunk(
  "Auth/login",
  async (UserData, { rejectWithValue }) => {
    try {
        let headers= {
          "Content-Type": "application/json",
        }
      const response = await axios.post(URL, UserData, headers); // Convert data to JSON string
      console.log(response)
      return response?.data;
    }
    catch (error) {
      console.error("Error Response:", error);
      // Return error message to be handled in rejected case
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isloading: false,
    userInfo: {},
    error: "",
    toasterBool: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {
    ClearState: (state) => {
      state.error = "";
      state.isError = false;
      state.isSuccess = false;
    },
    ClearToaster: (state) => {
      state.toasterBool = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.isloading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(authenticate.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isloading = false;
        state.isSuccess = true;
        state.userInfo = payload;
        state.toasterBool = true;
      })
      .addCase(authenticate.rejected, (state, { payload }) => {
        state.isloading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = payload;
      });
  },
});

export const { ClearState, ClearToaster } = AuthSlice.actions;
export default AuthSlice.reducer;
