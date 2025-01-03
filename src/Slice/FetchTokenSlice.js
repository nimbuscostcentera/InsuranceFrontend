import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/sales-routes/fetch-token`; // Use the relative path for proxy

export const FetchToken = createAsyncThunk(
  "FetchToken",
  async (UserData, { rejectWithValue }) => {
    console.log(UserData);
    
    try {
      let headers = {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${UserData?.token}`,
      };
      const response = await axios.post(URL, UserData?.data, { headers }); // Convert data to JSON string
      return response?.data;
    } catch (FetchTokenErrorMsg) {
      console.FetchTokenErrorMsg("FetchTokenErrorMsg Response:", FetchTokenErrorMsg);
      // Return FetchTokenErrorMsg message to be handled in rejected case
      return rejectWithValue(FetchTokenErrorMsg.message || "Something went wrong");
    }
  }
);

const FetchTokenSlice = createSlice({
  name: "FetchToken",
  initialState :{
  Token: null,
  FetchTokenErrorMsg: null,
  isFetchTokenLoading: false,
},
  reducers: {
    ClearFetchToken: (state) => {
      state.Token = null;
      state.FetchTokenErrorMsg = null;
      state.isFetchTokenLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchToken.pending, (state) => {
         state.isFetchTokenLoading = true;
      })
      .addCase(FetchToken.fulfilled, (state, { payload }) => {
        state.Token = payload; // Only serialized data
        state.isFetchTokenLoading = false;
      })
      .addCase(FetchToken.rejected, (state, { payload }) => {
       state.FetchTokenErrorMsg = payload;
       state.isFetchTokenLoading = false;
      });
  },
});

export const { ClearFetchToken } = FetchTokenSlice.actions;
export default FetchTokenSlice.reducer;
