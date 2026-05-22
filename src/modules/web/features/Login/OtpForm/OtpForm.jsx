import React, { useMemo, useState, useEffect, useCallback } from "react"
import OtpInputs from "../../../components/UI/Otp/OtpInput"
import useCounter from "../../../utils/use-counter"
import { Button, Stack, Typography } from "@mui/material"
import CustomButton from "../../../components/UI/Button/Button"
import classes from "./OtpForm.module.css"
import { json, useNavigate } from "react-router-dom"

import timerIcon from "../../../assets/image/svg/otp timer.svg"
import useApiHttp from "../../../hooks/ues-http"
import { useSelector, useDispatch } from "react-redux"
import { authActions } from "../../../services/storeSlice/authSlice"
import { isAuthenticated } from "../../../services/isAuthenticated"
import { toast, ToastContainer } from "react-toastify"
import secureLocalStorage from "react-secure-storage"

const OtpForm = () => {
  const { mobile, dialCode, value, type, dealerCode } = useSelector(
    state => state.auth
  )

  const [otp, setOtp] = useState([])
  const [reset, setReset] = useState(false)
  const timer = type === "mobile" ? 180 : 300
  const [otpCounter, startCounter, stopCounter, restartCounter] = useCounter(
    timer,
    0,
    false
  )
  const navigate = useNavigate()
  const {
    isLoading: sendOtpLoading,
    success: sendOtpSucces,
    error: sendOtpError,
    sendRequest: sendOtp,
  } = useApiHttp()
  const {
    isLoading: verifyOtpLoading,
    success: verifyOtpSucces,
    error: verifyOtpError,
    sendRequest: verifyOtp,
  } = useApiHttp()
  const dispatch = useDispatch()
  if (isAuthenticated()) {
    navigate("/user")
  } else if (value === "") {
    navigate("/user/login")
  }
  useEffect(() => {
    startCounter()
  }, [])

  // const otpInputChangeHandler = otp => {
  //   setOtp(otp)
  // }
  const otpInputChangeHandler = useCallback(otp => {
    setOtp(otp)
  }, [])

  const formSubmitHandler = e => {
    e.preventDefault()
    verifyOtp(
      {
        url: `dealer/verify-otp`,
        method: "POST",
        body: {
          type: type,
          mobile_number: value,
          otp: otp.join(""),
          dealer_code: dealerCode,
        },
      },
      data => {
        dispatch(authActions.login(data.data))
        secureLocalStorage.setItem("dealerBearerToken", data?.data?.token)
        localStorage.setItem("userEmail", data?.data?.email)
        localStorage.setItem("userName", data?.data?.name)
        localStorage.setItem("contactName", data?.data?.contact_name)
        navigate("/")
        // Refresh the window to reload the entire page
        // window.location.reload()
        setReset(true)
        setTimeout(() => {
          setReset(false)
        }, 1000) // 1000 ms = 1 second delay
      }
    )
  }
  useEffect(() => {
    if (verifyOtpSucces !== "") {
      toast.success(verifyOtpSucces, {
        // position: toast.POSITION.TOP_RIGHT,
      })
    }
    if (verifyOtpError !== "") {
      toast.error(verifyOtpError, {
        // position: toast.POSITION.TOP_RIGHT,
      })
    }
  }, [verifyOtpSucces, verifyOtpError])

  return (
    <div className={classes.loginFrom}>
      <div className={classes.loginHeader}>
        <h3 style={{ textAlign: "center" }}>Enter OTP</h3>
        <div className={classes.mobil_text}>
          {`${value}`}
          <p onClick={() => navigate("/user/login")}>Change</p>
        </div>
      </div>

      <form action="" onSubmit={formSubmitHandler}>
        <OtpInputs
          mt="20px"
          boxCount={6}
          onChange={otpInputChangeHandler}
          onSuccess={reset}
          reset={reset}
        />
        <Stack direction="row" justifyContent="center" mt="10px">
          {otpCounter > 0 && (
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ display: "flex", gap: "3px", alignItems: "center" }}
            >
              <img src={timerIcon} alt="time icon" width={"16px"} />
              <span className={classes.timer}>{otpCounter} sec</span>
            </Typography>
          )}
          {otpCounter === 0 && (
            <div>
              <Button
                variant="text"
                onClick={() => {
                  restartCounter()
                  setReset(true)
                  setOtp([])
                  sendOtp({
                    url: `dealer/send-otp`,
                    method: "POST",
                    body: {
                      type: type, // Set type as "email" or "mobile"
                      mobile_number: value,
                    },
                  })
                  setTimeout(() => {
                    setReset(false)
                  }, 1000) // 1000 ms = 1 second delay
                }}
                sx={{
                  ml: "-8px",
                  fontSize: "15px",
                  fontFamily: "var(--font-bold)",
                  color: "var(--primary-blue)",
                  textTransform: "capitalize",
                  padding: 0,
                }}
              >
                Resend OTP
              </Button>
            </div>
          )}
        </Stack>

        <CustomButton
          variant="contained"
          customColor="white"
          customBgColor="#32349b"
          custmstyle={{ padding: "7px 7px", width: "100%", marginTop: "15px" }}
          type="submit"
        >
          Verify OTP
        </CustomButton>
      </form>
      <ToastContainer />
    </div>
  )
}

export default OtpForm
