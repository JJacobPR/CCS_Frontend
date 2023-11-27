import { createSlice } from "@reduxjs/toolkit";
import getCookies from "../helpers/getCookies";

const initialCookies = getCookies();
const initialState = {
  tokens: {
    ...initialCookies,
  },
};

export const cookiesSlice = createSlice({
  name: "cookies",
  initialState,
  reducers: {
    update: (state) => {
      const cookies = getCookies();
      state.tokens = { ...cookies };
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = cookiesSlice.actions;

export default cookiesSlice.reducer;
