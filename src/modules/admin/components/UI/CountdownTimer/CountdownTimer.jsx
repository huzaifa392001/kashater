// CountdownTimer.js
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  startTimer,
  resetTimer,
  decrementTime,
} from "../../../services/storeSlice/timerSlice"
import classes from "./CountdownTimer.module.css"
import timer from "../../../assets/image/svg/timer.svg"
import useApiHttp from "../../../hooks/ues-http"
import { setSteperVlue } from "../../../services/storeSlice/shopNowSlice"

const CountdownTimer = () => {
  const dispatch = useDispatch()
  const { timeLeft, isActive } = useSelector(state => state.timer)

  // console.log("isActive", isActive)
  const {
    isLoading: reserveLoading,
    success: reserveSucces,
    error: reserveError,
    sendRequest: reserveRequest,
  } = useApiHttp()

  const reserveHandleSelect = () => {
    reserveRequest(
      {
        url: `dealer/shop-now/reserved-products/delete`,
      },
      data => {
        dispatch(resetTimer())
      }
    )
  }
  // Effect to handle the countdown logic
  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch(decrementTime())
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(interval)
      reserveHandleSelect()
      dispatch(resetTimer())
      dispatch(setSteperVlue(0))
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft, dispatch])

  // Format time as MM:SS
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className={classes.session_set}>
      <p style={{ marginBottom: "5px" }}>
        Please complete your order within 7 minutes to keep your Items reserved
      </p>
      <div className={classes.session_exp}>
        <div className={classes.session_icon}>
          <img src={timer} alt="timer" />
        </div>
        <p>
          Session expires in{" "}
          <span className={classes.time_count}> {formatTime(timeLeft)}</span>
        </p>
      </div>
    </div>
  )
}

export default CountdownTimer
