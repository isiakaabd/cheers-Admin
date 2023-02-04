import {createSlice} from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    token: localStorage.getItem("access-token") || null,
  },

  reducers: {
    getToken(state, action) {
      state.token = action.payload
      localStorage.setItem("access-token", action.payload)
    },

    logOut(state, action) {
      state.token = null
      localStorage.removeItem("access-token")
    },
  },
})

const {reducer, actions} = authSlice
export const {getToken, logOut} = actions
export default reducer
