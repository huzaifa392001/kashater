import React, { useEffect, useMemo, useState } from "react"
import OtpInputs from "../../../components/UI/Otp/OtpInput"
import useCounter from "../../../utils/use-counter"
import { Button, Stack, TextField, Typography } from "@mui/material"
import CustomButton from "../../../components/UI/Button/Button"
import classes from "./ForgotPswForm.module.css"

import timerIcon from "../../../assets/image/svg/otp timer.svg"
import CustomTextField from "../../../components/UI/TextFiled/TextFiled"
import logo from "../../../assets/image/png/login logo.png"
import { useNavigate } from "react-router-dom"
import useInput from "../../../utils/use-input"
import { validateEmail } from "../../../utils/validation"
// import LoginServices from "../../../pages/Login/login.service"
import validator from "validator"
import PasswordInput from "../../../components/UI/Inputs/PasswordInput"
import useApiHttp from "../../../hooks/ues-http"

const ForgotPswForm = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState("email")
  const [otp, setOtp] = useState([])
  console.log("otp", otp)

  const [reset, setReset] = useState(false)
  const [otpCounter, startCounter, stopCounter, restartCounter] = useCounter(
    30,
    0,
    false
  )
  const {
    isLoading: sendOtpLoading,
    success: sendOtpSuccess,
    error: sendOtpError,
    sendRequest: sendOtpRequest,
  } = useApiHttp()
  const {
    isLoading: UpdatePasswordLoading,
    success: UpdatePasswordSuccess,
    error: UpdatePasswordError,
    sendRequest: UpdatePasswordRequest,
  } = useApiHttp()
  // const { SendOtpService, VerifyOtpService, UpdatePasswordService } =
  //   LoginServices()
  // const { sendRequest: sendOtp } = SendOtpService()
  // const { sendRequest: verifyOtp } = VerifyOtpService()
  // const { sendRequest: updatePassword } = UpdatePasswordService()

  const otpInputChangeHandler = otp => {
    setOtp(otp)
  }

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail)

  const passwordValidation = value => {
    const minLength = value.length >= 8
    const hasLowercase = /[a-z]/.test(value)
    const hasUppercase = /[A-Z]/.test(value)
    const hasNumber = /[0-9]/.test(value)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)

    return (
      minLength && hasLowercase && hasUppercase && hasNumber && hasSpecialChar
    )
  }

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(passwordValidation)
  const confirmPasswordValidation = value => {
    return value === password && password !== ""
  }
  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput(confirmPasswordValidation)

  useEffect(() => {
    if (confirmPassword !== "") {
      const isValid = confirmPasswordValidation(confirmPassword)
      // Trigger validation update
      confirmPasswordBlurHandler()
    }
  }, [password])

  const handleEmail = () => {
    if (emailIsValid) {
      sendOtpRequest(
        {
          url: `admin/forgot-password`,
          method: "POST",
          body: {
            email: email,
          },
        },
        data => {
          console.log("data", data)
          setStatus("otp")
          startCounter()
        }
      )
    }
  }
  const handleOtp = () => {
    sendOtpRequest(
      {
        url: `admin/verify-otp`,
        method: "POST",
        body: {
          email: email,
          otp: otp.join(""),
        },
      },
      data => {
        setStatus("password")
      }
    )
  }
  const handlePassword = () => {
    UpdatePasswordRequest(
      {
        url: `admin/reset-password`,
        method: "POST",
        body: {
          email: email,
          password: password,
          confirm_password: confirmPassword,
        },
      },
      data => {
        setStatus("success")
      }
    )
  }
  const handleLogin = () => {
    navigate("/admin/login")
  }

  return (
    <>
      <div className={classes.login_container_heder}>
        {status === "success" ? (
          <SuccessSvg />
        ) : (
          <img src={logo} alt="logo" style={{ width: "137px" }} />
        )}
      </div>
      <div className={classes.loginFrom}>
        <div className={classes.loginHeader}>
          <h3>
            {status === "email" && "Forgot Password"}
            {status === "otp" && "Enter OTP"}
            {status === "password" && "Reset Password"}
            {status === "success" && "Password Changed!"}
          </h3>

          <Typography
            variant="p"
            sx={{
              color: "#646465",
              fontSize: "14px",
              fontWeight: "400",
              textAlign: "start",
              display: "block",
            }}
          >
            {status === "email" &&
              "Enter your registered email address to reset your password"}
            {status === "otp" &&
              "We have sent a One Time Password(OTP) to your registered email address."}
            {status === "password" && "Enter your new Password"}

            {status === "success" &&
              `Your password has been changed successfully. “Login Now” to access your account.`}
          </Typography>
        </div>
        {status === "email" && (
          <>
            <CustomTextField
              id="email"
              label="Email Address"
              placeholder="Enter Email Address"
              variant="outlined"
              sx={{
                marginTop: "30px",
                width: "100%",
              }}
              value={email}
              onChange={emailChangeHandler}
              error={emailHasError}
              onBlur={emailBlurHandler}
              helperText={emailHasError ? "Enter the email" : null}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CustomButton
              variant="contained"
              customColor="#000000"
              customBgColor="#F3C11D"
              custmstyle={{
                padding: "7px",
                width: "100%",
                marginTop: "20px",
              }}
              type="submit"
              // disabled={!emailIsValid}
              onClick={() => {
                handleEmail()
              }}
            >
              Send OTP
            </CustomButton>
          </>
        )}
        {status == "otp" && (
          <>
            <div style={{ textAlign: "start", marginTop: ".5rem" }}>
              <Typography variant="p">{email}</Typography>
              <Typography
                variant="span"
                sx={{
                  color: "#376FD0",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setStatus("email")
                }}
              >
                {" "}
                Change
              </Typography>
            </div>
            <OtpInputs
              mt="20px"
              onChange={otpInputChangeHandler}
              boxCount={6}
              reset={reset}
            //   onSuccess={isSuccess || isError || reset ? "true" : "false"}
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
                      handleEmail()
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
              customColor="#000000"
              customBgColor="#F3C11D"
              custmstyle={{
                padding: "7px",
                width: "100%",
                marginTop: "15px",
              }}
              type="submit"
              // disabled={otp.some(item => item === "") || otp.length === 0}
              onClick={() => {
                handleOtp()
              }}
            >
              Verify OTP
            </CustomButton>
          </>
        )}
        {status === "password" && (
          <div className={classes.password_input}>
            <PasswordInput
              id="new-password"
              label="New Password"
              placeholder="Enter Password"
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={
                passwordHasError && (
                  <div>
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ fontSize: "12px" }}
                    >
                      Password must be at least 8 characters, including an
                      uppercase, lowercase, number, and symbol
                    </Typography>
                    {/* <ul style={{ margin: "4px 0 0 16px", paddingLeft: "8px" }}>
                      <li
                        style={{
                          color: password.length >= 8 ? "green" : "red",
                        }}
                      >
                        At least 8 characters
                      </li>
                      <li
                        style={{
                          color: /[a-z]/.test(password) ? "green" : "red",
                        }}
                      >
                        One lowercase letter
                      </li>
                      <li
                        style={{
                          color: /[A-Z]/.test(password) ? "green" : "red",
                        }}
                      >
                        One uppercase letter
                      </li>
                      <li
                        style={{
                          color: /[0-9]/.test(password) ? "green" : "red",
                        }}
                      >
                        One number
                      </li>
                      <li
                        style={{
                          color: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                            password
                          )
                            ? "green"
                            : "red",
                        }}
                      >
                        One special character
                      </li>
                    </ul> */}
                  </div>
                )
              }
              required
            />
            <PasswordInput
              id="confirm-password"
              label="Confirm Password"
              placeholder="Enter Password"
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              error={confirmPasswordHasError}
              onBlur={confirmPasswordBlurHandler}
              helperText={
                confirmPasswordHasError
                  ? "Ensure confirm password matches new password "
                  : null
              }
              required
            />

            <CustomButton
              variant="contained"
              customColor="#000000"
              customBgColor="#F3C11D"
              custmstyle={{
                padding: "7px",
                width: "100%",
                // marginTop: "15px",
              }}
              type="submit"
              // disabled={!passwordIsValid || !confirmPasswordIsValid}
              onClick={() => {
                handlePassword()
              }}
            >
              Change Password
            </CustomButton>
          </div>
        )}
        {status == "success" && (
          <CustomButton
            variant="contained"
            customColor="#000000"
            customBgColor="#F3C11D"
            custmstyle={{
              padding: "7px",
              width: "100%",
              marginTop: "15px",
            }}
            type="submit"
            onClick={() => {
              handleLogin()
            }}
          >
            Login Now
          </CustomButton>
        )}
      </div>
    </>
  )
}

export default ForgotPswForm

const SuccessSvg = () => {
  return (
    <svg
      width="120px"
      height="120px"
      viewBox="0 0 120 120"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>web/md/svg/success popup</title>
      <g
        id="web/md/svg/success-popup"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="Group"
          transform="translate(10, 10)"
          fill="#65A547"
          fill-rule="nonzero"
        >
          <path
            d="M50,0 C22.5,0 0,22.5 0,50 C0,77.5 22.5,100 50,100 C77.5,100 100,77.5 100,50 C100,22.5 77.5,0 50,0 L50,0 Z M40,75 L15,50 L22,43 L40,61 L78,23 L85,30 L40,75 L40,75 Z"
            id="Shape"
          ></path>
        </g>
      </g>
    </svg>
  )
}
