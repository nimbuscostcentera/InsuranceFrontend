import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/SetPassword-routes/login`;
//const URL = `/api_v3/SetPassword.aspx`; // Use the relative path for proxy

export const SetPassword = createAsyncThunk(
  "SetPassword",
  async (UserData, { rejectWithValue }) => {
    try {
      let API_Head = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${UserData?.token}`,
        },
      };
      const response = await axios.post(URL, API_Head, UserData); // Convert data to JSON string
      return response?.data;
    } catch (SetPassErrorMsg) {
      console.SetPassErrorMsg("SetPassErrorMsg Response:", SetPassErrorMsg);
      // Return SetPassErrorMsg message to be handled in rejected case
      return rejectWithValue(SetPassErrorMsg.message || "Something went wrong");
    }
  }
);

const SetPasswordSlice = createSlice({
  name: "SetPassword",
  initialState: {
    isSetPassLoading: false,
    SetPassSuccessMsg: "",
    SetPassErrorMsg: "",
    isSetPassErrorMsg: false,
    isSetPassSuccessMsg: false,
  },
  reducers: {
    ClearSetPassword: (state) => {
      state.SetPassErrorMsg = "";
      state.isSetPassErrorMsg = false;
      state.isSetPassSuccessMsg = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SetPassword.pending, (state) => {
        state.isSetPassLoading = true;
        state.isSetPassErrorMsg = false;
        state.isSetPassSuccessMsg = false;
      })
      .addCase(SetPassword.fulfilled, (state, { payload }) => {
        state.isSetPassErrorMsg = false;
        state.isSetPassLoading = false;
        state.isSetPassSuccessMsg = true;
        state.SetPassSuccessMsg = payload;
      })
      .addCase(SetPassword.rejected, (state, { payload }) => {
        state.isSetPassLoading = false;
        state.isSetPassErrorMsg = true;
        state.isSetPassSuccessMsg = false;
        state.SetPassErrorMsg = payload;
      });
  },
});

export const { ClearSetPassword} = SetPasswordSlice.actions;
export default SetPasswordSlice.reducer;
