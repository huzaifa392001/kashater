import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import classes from "./Login.module.css"
import logo from "../../assets/image/png/login logo.png"
import LoginForm from "../../features/Login/LoginForm/LoginFrom"

const Login = () => {
  return (
    <div className={classes.login_page}>
      <div className={classes.login_container}>
        <div className={classes.login_container_heder}>
          <img src={logo} alt="logo" style={{ width: "137px" }} />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
