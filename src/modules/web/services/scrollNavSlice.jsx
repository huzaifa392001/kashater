import { createSlice } from "@reduxjs/toolkit"

const scrollNavSlice = createSlice({
  name: "scrollnav",
  initialState: { lastScrollY: 0, classname: "" },
  reducers: {
    setLastScrollY: (state, action) => {
      state.lastScrollY = action.payload
    },
    setCalssesName: (state, action) => {
      state.classname = action.payload
    },
  },
})

export const { setLastScrollY, setCalssesName } = scrollNavSlice.actions
export default scrollNavSlice.reducer
