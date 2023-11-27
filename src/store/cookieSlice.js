import { createSlice } from '@reduxjs/toolkit'
import getCookies from '../helpers/getCookies'


const initalCookies = getCookies();
const initialState = {
  tokens: {
    token: initalCookies.token,
    refreshToken: initalCookies.refreshToken,
  }
}

export const cookiesSlice = createSlice({
  name: 'cookies',
  initialState,
  reducers: {
    update: (state) => {
        const cookies = getCookies();
        state.tokens.token = cookies.token;
        state.tokens.refreshToken = cookies.refreshToken
    },
  },
})

// Action creators are generated for each case reducer function
export const {update} = cookiesSlice.actions

export default cookiesSlice.reducer