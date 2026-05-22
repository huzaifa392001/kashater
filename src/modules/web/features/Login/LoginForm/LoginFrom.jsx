import React, { useEffect, useMemo, useState } from "react"
import OtpInputs from "../../../components/UI/Otp/OtpInput"
import useCounter from "../../../utils/use-counter"
import { Button, Stack, TextField, Typography } from "@mui/material"
import CustomButton from "../../../components/UI/Button/Button"
import classes from "./LoginForm.module.css"

import timerIcon from "../../../assets/image/svg/timer.svg"
import CustomTextField from "../../../components/UI/TextFiled/TextFiled"
import logo from "../../../assets/image/png/company-logo.png"
import logo_wh from "../../../assets/image/png/kadhaster-logo-wh.png"
import { useLocation, useNavigate } from "react-router-dom"
import useInput from "../../../utils/use-input"
import {
  validatePhoneNumber,
  validateTextInput,
  validatePhoneNumber2
} from "../../../utils/validation"
// import LoginServices from "../../../pages/Login/login.service"
import validator from "validator"
import PasswordInput from "../../../components/UI/Inputs/PasswordInput"
import PhoneNumInput from "../../../components/UI/PhoneNumInput/PhoneNumInput"
import useApiHttp from "../../../hooks/ues-http"
import { useDispatch } from "react-redux"
import { authActions } from "../../../services/storeSlice/authSlice"
import CustomTextFieldLogin from "../../../components/UI/TextFiled/TextFiledLogin"
import toast from "react-hot-toast"

const ForgotPswForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { state } = useLocation()
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  const [status, setStatus] = useState("email")
  const [type, setType] = useState("")
  const [otp, setOtp] = useState([])
  // console.log("otp", otp)
  // console.log('state', state);
  const [btnDisable, setBtnDisable] = useState(false)


  const [reset, setReset] = useState(false)
  const [otpCounter, startCounter, stopCounter, restartCounter] = useCounter(
    30,
    0,
    false
  )
  const signin_redirect = localStorage.getItem("signin_redirect")

  const otpInputChangeHandler = otp => {
    setOtp(otp)
  }
  const {
    isLoading: loginLoading,
    success: loginSuccess,
    error: loginError,
    sendRequest: loginpRequest,
  } = useApiHttp()
  const {
    isLoading: sendOtpLoading,
    success: sendOtpSuccess,
    error: sendOtpError,
    sendRequest: sendOtpRequest,
  } = useApiHttp()

  const {
    value: enteredNum,
    rawPhone,
    dialCode,
    phoneIsValid: enteredNumIsValid,
    phoneHasError: enteredNumHasError,
    reactPhoneChangeHandler: phoneNumChangeHandler,
    inputBlurHandler: phoneNumBlurHandler,
    reset: resetPhoneNum,
  } = useInput(validatePhoneNumber2)
  const {
    value: enteredNum2,
    rawPhone: rawPhone2,
    dialCode: dialCode2,
    phoneIsValid: enteredNumIsValid2,
    phoneHasError: enteredNumHasError2,
    reactPhoneChangeHandler: phoneNumChangeHandler2,
    inputBlurHandler: phoneNumBlurHandler2,
    reset: resetPhoneNum2,
  } = useInput(validatePhoneNumber)

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(validateTextInput)
  const validateEmail = value => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  }

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail)

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(e => {
    return (
      e !== "" &&
      validator.isStrongPassword(e, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    )
  })

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput(e => {
    return e === password
  })

  // console.log('enteredNum', enteredNum, 'dialCode', dialCode, 'rawPhone', rawPhone?.length);

  console.log('sendOtpError', sendOtpError);

  useEffect(() => {
    if (sendOtpError || loginError) {
      setBtnDisable(false)
    }
  }, [sendOtpError, loginError])


  const handleEmail = () => {
    if (rawPhone?.length < 8 || rawPhone?.length > 10) {
      toast.error('Please enter a valid phone number with the correct country code.')
      return null
    }

    if (enteredNum) {
      try {
        setBtnDisable(true)
        loginpRequest(
          {
            url: `user/login/send-otp`,
            method: "POST",
            body: {
              country_code: dialCode,
              mobile_number: rawPhone,
            },
          },
          data => {
            setStatus("otp")
            startCounter()
            setBtnDisable(false)
          }
        )
      } catch (error) {
        console.log('handleEmailError', error);
        setBtnDisable(false)
      }

    }
  }
  const handleOtp = () => {
    if (type === "Signup") {
      try {
        setBtnDisable(true)
        sendOtpRequest(
          {
            url: `user/register/verify-otp`,
            method: "POST",
            body: {
              country_code: dialCode2,
              mobile_number: rawPhone2,
              otp: otp.join(""),
              name: name,
              email: email,
            },
          },
          data => {
            setBtnDisable(false)
            dispatch(authActions.setBearerToken(data?.data?.token))
            dispatch(authActions.login({ ...data?.data?.user }))
            navigate("/user")
          }
        )
      } catch (error) {
        console.log('handleOtpSignupError', error);
        setBtnDisable(false)
      }

    } else {
      try {
        setBtnDisable(true)
        sendOtpRequest(
          {
            url: `user/login/verify-otp`,
            method: "POST",
            body: {
              country_code: dialCode,
              mobile_number: rawPhone,
              otp: otp.join(""),
            },
          },
          data => {
            setBtnDisable(false)
            dispatch(authActions.setBearerToken(data?.data?.token))
            dispatch(authActions.login({ ...data?.data?.user }))
            if (signin_redirect) {
              window.location.href = signin_redirect
              localStorage.removeItem("signin_redirect")
            } else {
              // navigate(state?.signin_navigate_redirect || "/user")
              navigate(-1)
            }
          }
        )
      } catch (error) {
        console.log('handleOtpSigninError', error);
        setBtnDisable(false)
      }
    }
  }
  const handlePassword = () => {
    //  disabled={!nameIsValid || !emailIsValid || !enteredNumIsValid2}
    if (!nameIsValid) {
      toast.error('Please enter your name')
      return null
    }
    if (!emailIsValid) {
      toast.error('Please enter a valid Email ID')
      return null
    }
    if (rawPhone2?.length < 8 || rawPhone2?.length > 10) {
      toast.error('Please enter a valid phone number with the correct country code.')
      return null
    }


    try {
      setBtnDisable(true)
      sendOtpRequest(
        {
          url: `user/register/send-otp`,
          method: "POST",
          body: {
            country_code: dialCode2,
            mobile_number: rawPhone2,
          },
        },
        data => {
          setBtnDisable(false)
          setStatus("otp")
          setType("Signup")
          startCounter()
        }
      )
    } catch (error) {
      console.log('handlePasswordError', error);
      setBtnDisable(false)
    }
  }

  // useEffect(() => {
  //   if (loginSuccess !== "") {
  //     toast.success(loginSuccess, {})
  //   }
  //   if (loginError !== "") {
  //     toast.error(loginError, {})
  //   }
  // }, [loginSuccess, loginError])
  useEffect(() => {
    const hasLoggedIn = localStorage.getItem("hasLoggedIn");
    setIsFirstLogin(!hasLoggedIn);
  }, []);
  const handleLogin = () => {
    localStorage.setItem("hasLoggedIn", "true");
    navigate("/operations/login");
  };

  console.log('btnDisable', btnDisable);


  return (
    <>
      <div className={classes.login_container_heder}>
        {status === "success" ? (
          <SuccessSvg />
        ) : (
          <img src={logo_wh} alt="logo" style={{ width: "168px" }} />
        )}
      </div>
      <div className={classes.loginFrom}>
        <div className={classes.loginHeader}>
          <h3>
            {status === "email" && "Welcome To Kadhaster!"}
            {status === "otp" && "Verify OTP"}
            {status === "password" && "Create Your Account"}
            {status === "success" && "Password Changed!"}
          </h3>

          {status === "email" ? (
            <>
              <Typography
                variant="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  textAlign: "center",
                  display: "block",
                  color: "#fff",
                  fontFamily: "var(--font-regular-Quicksand)",
                }}
              >
                <span
                  style={{ textDecoration: "underline", cursor: "pointer", fontWeight: "600", fontFamily: "var(--font-semibold-Quicksand)" }}
                  onClick={() => setStatus("password")}
                >
                  Sign Up
                </span>{"  "}to get started
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  textAlign: "center",
                  display: "block",
                  marginBottom: "20px",
                  marginTop: "8px",
                  color: "#fff",
                  fontFamily: "var(--font-regular-Quicksand)",
                }}
              >
                Already have an account? Login
              </Typography>
            </>
          ) : (
            <Typography
              variant="p"
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                textAlign: "center",
                display: "block",
                marginBottom: "20px",
                color: "#fff",
                fontFamily: "var(--font-regular-Quicksand)",
              }}
            >
              {status === "otp" &&
                "Please enter the OTP(One-Time Password) sent to your mobile number to complete your verification."}
              {status === "password" && "Enter your details to continue"}
              {status === "success" &&
                `Your password has been changed successfully. "Login Now" to access your account.`}
            </Typography>
          )}
        </div>
        {status === "email" && (
          <>
            <PhoneNumInput
              inputProps={{
                name: "mobile_number",
                required: true,
                placeholder: "Enter your phone number",
                maxLength: 13, // +91 + 10 digits
              }}
              autoFormat={false}
              value={enteredNum}
              onChange={(value, data, e) => {
                phoneNumChangeHandler(value, data, e)
              }}
              phoneHasError={enteredNumHasError}
              onBlur={phoneNumBlurHandler}
            />

            <button
              className={`${classes.loginBtn} ${classes.mrg_top_2rem}`}
              type="submit"
              // disabled={!enteredNumIsValid}
              disabled={btnDisable}
              onClick={() => {
                handleEmail()
              }}
            >
              Get OTP
            </button>

          </>
        )}
        {status == "otp" && (
          <>
            <div className="otp-style" style={{ textAlign: "center", marginTop: ".5rem" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "14px", color: "#fff" }}
              >
                {type === "Signup" ? enteredNum2 : enteredNum}
              </Typography>

              <Typography
                variant="span"
                sx={{
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  {
                    type === "Signup"
                      ? setStatus("password")
                      : setStatus("email")
                  }
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
                  color="#fff"
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
                    disabled={btnDisable}
                    onClick={() => {
                      restartCounter()
                      setReset(true)
                      setOtp([])
                      handleEmail()
                    }}
                    sx={{
                      ml: "-8px",
                      fontSize: "15px",
                      fontFamily: "var(--font-semibold-Quicksand)",
                      color: "#fff",
                      textTransform: "capitalize",
                      padding: 0,
                    }}
                  >
                    Resend OTP
                  </Button>
                </div>
              )}
            </Stack>

            <button
              className={`${classes.loginBtn} ${classes.mrg_top_1rem}`}
              type="submit"
              disabled={otp.some(item => item === "") ? true : otp.length === 0 ? true : btnDisable ? true : false}
              onClick={() => {
                handleOtp()
              }}
            >
              Verify OTP
            </button>
          </>
        )}
        {status === "password" && (
          <div className={classes.password_input}>
            <CustomTextFieldLogin
              id="name"
              placeholder="Enter your name"
              variant="outlined"
              textColor={'#ffff'}
              value={name}
              onChange={nameChangeHandler}
              error={nameHasError}
              onBlur={nameBlurHandler}
              InputLabelProps={{ shrink: true }}
              required
            />
            <CustomTextFieldLogin
              id="email"
              textColor={'#ffff'}
              placeholder="Enter your email address"
              variant="outlined"
              value={email}
              onChange={emailChangeHandler}
              error={emailHasError}
              onBlur={emailBlurHandler}
              InputLabelProps={{ shrink: true }}
              required
            />
            <PhoneNumInput
              inputProps={{
                name: "mobile_number",
                required: true,
                placeholder: "Enter your phone number",
              }}
              autoFormat={false}
              value={enteredNum2}
              onChange={(value, data, e) => {
                phoneNumChangeHandler2(value, data, e)
              }}
              phoneHasError={enteredNumHasError2}
              onBlur={phoneNumBlurHandler2}
            />
            <button
              className={`${classes.loginBtn} ${classes.mrg_top_1rem}`}
              type="submit"
              // disabled={!nameIsValid || !emailIsValid || !enteredNumIsValid2}
              disabled={btnDisable}
              onClick={() => {
                handlePassword()
              }}
            >
              Get OTP
            </button>
            <p className={classes.loginFooter} style={{ marginTop: "12px" }}>
              Already have an account?{" "}
              <span
                className={classes.signup}
                onClick={() => setStatus("email")}
              >
                Sign in
              </span>
            </p>
          </div>
        )}

        {status == "success" && (
          <button
            className={`${classes.loginBtn} ${classes.mrg_top_3rem}`}
            disabled={btnDisable}
            type="submit"
            onClick={() => {
              handleLogin()
            }}
          >
            Login Now
          </button>
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
