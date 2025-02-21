import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/company-routes/company-register`;

export const CompanyRegFunc = createAsyncThunk(
  "CompanyReg",
  async (userdata, { rejectWithValue }) => {
    console.log(userdata)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userdata?.token}`,
        },
      };
      const { data } = await axios.post(URL, userdata?.data, config);
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const CompanyRegSlice = createSlice({
  name: "CompanyReg",
  initialState: {
    isloading15: false,
    Result15:"",
    error15: "",
    isError15: false,
    isSuccess15: false,
  },
  reducers: {
    ClearState15: (state) => {
      state.error15 = "";
      state.isError15 = false;
      state.isSuccess15 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CompanyRegFunc.pending, (state) => {
        state.isloading15 = true;
        state.isError15 = false;
        state.isSuccess15 = false;
      })
      .addCase(CompanyRegFunc.fulfilled, (state, { payload }) => {
        state.isError15 = false;
        state.isloading15 = false;
        state.isSuccess15 = true;
        state.Result15 = payload;
      })
      .addCase(CompanyRegFunc.rejected, (state, { payload }) => {
        state.isloading15 = false;
        state.isError15 = true;
        state.isSuccess15 = false;
        state.error15 = payload;
      });
  },
});
export const { ClearState15 } = CompanyRegSlice.actions;
export default CompanyRegSlice.reducer;
