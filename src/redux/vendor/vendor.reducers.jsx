import {createSlice} from "@reduxjs/toolkit"
// import {VendorReducer} from "./vendor.types"

const INITIAL_STATE = {
  vendors: [],
  vendor: {},
  categories: [],
  review: {},
  loading: false,
}

export const vendorSlice = createSlice({
  name: "admin",
  initialState: INITIAL_STATE,

  reducers: {
    getVendors(state, action) {
      state.vendors = action.payload
    },
  },
})
const {reducer, actions} = vendorSlice
export const {getVendors} = actions
export default reducer
