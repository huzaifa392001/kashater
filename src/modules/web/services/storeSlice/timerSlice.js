
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    timeLeft: 7 * 60, // 7 minutes in seconds
    isActive: false,
}

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        startTimer: state => {
            state.isActive = true
        },
        resetTimer: state => {
            state.isActive = false
            state.timeLeft = 7 * 60 // Reset to 7 minutes
        },
        decrementTime: state => {
            if (state.timeLeft > 0) {
                state.timeLeft -= 1
            }
        },
    },
})

export const { startTimer, resetTimer, decrementTime } = timerSlice.actions
export default timerSlice.reducer
