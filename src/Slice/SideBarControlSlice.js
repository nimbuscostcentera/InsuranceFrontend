import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Open: true,
};

export const SideBarControlerSlice = createSlice({
  name: "SideBarControler",
  initialState,
  reducers: {
    CloseSideBarMenu: (state) => {
      state.Open = false;
    },
    OpenSideBarMenu:(state)=>{
       state.Open = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { CloseSideBarMenu, OpenSideBarMenu } = SideBarControlerSlice.actions;

export default SideBarControlerSlice.reducer;
