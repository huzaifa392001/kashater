import React, { useState, useEffect } from "react"
import {
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useNavigate, useSearchParams } from "react-router-dom"

import CustomButton from "../../../components/UI/Button/Button"
import useInput from "../../../utils/use-input"
import {
  validateEmail,
  validatePhoneNumber,
  validatePassword,
} from "../../../utils/validation"
import classes from "./LoginForm.module.css"
import PasswordInput from "../../../components/UI/Inputs/PasswordInput"
import CustomTextField from "../../../components/UI/TextFiled/TextFiled"
import useApiHttp from "../../../hooks/ues-http"
import { authActions } from "../../../services/storeSlice/authSlice"
import { useDispatch } from "react-redux"

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [checkvalue, setCheckValue] = useState(false)

  const {
    isLoading: loginLoading,
    success: loginSuccess,
    error: loginError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail)

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: enteredPasswordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(validatePassword)

  const handleLogin = e => {
    e.preventDefault()
  }

  const handleChange = event => {
    setCheckValue(event.target.checked)
  }
  const handleLoginNow = () => {
    sendRequest(
      {
        url: `admin/login`,
        method: "POST",
        body: {
          email: email,
          password: enteredPassword,
        },
      },
      data => {
        console.log("data", data)

        dispatch(authActions.setBearerToken(data?.data?.token))
        dispatch(
          authActions.login({
            token: data?.data?.token,
            name: data?.data?.admin?.name,
            email: data?.data?.admin?.email,
            modules: data?.data?.modules,
            is_reset_password: data?.data?.is_reset_password,
          })
        )

        navigate("/admin/customerlist")
      }
    )
  }

  return (
    <div className={classes.loginFrom}>
      <div className={classes.loginHeader}>
        <h3>Admin Dashboard</h3>
        <p>To access your account, Please enter your credentials below:</p>
      </div>
      <form onSubmit={handleLogin}>
        <CustomTextField
          id="email"
          label="Email Address"
          placeholder="Enter Email Address"
          variant="outlined"
          value={email}
          onChange={emailChangeHandler}
          error={emailHasError}
          onBlur={emailBlurHandler}
          helperText={emailHasError ? "Enter the email" : null}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />

        <PasswordInput
          id="new-password"
          label="Password"
          placeholder="Enter Password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={enteredPasswordHasError}
          helperText={
            enteredPasswordHasError
              ? "Please enter a valid password (minimum 6 characters)"
              : null
          }
          required
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "13px",
              color: "#376FD0",
              fontWeight: "400",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/admin/forgotPassword")
            }}
          >
            Forgot Password?
          </Typography>
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
          disabled={!emailIsValid || !enteredPasswordIsValid}
          onClick={handleLoginNow}
        >
          Sign in
        </CustomButton>
      </form>

      {/* {isLoggedIn && <p>Welcome back!</p>} */}
    </div>
  )
}

export default LoginForm
