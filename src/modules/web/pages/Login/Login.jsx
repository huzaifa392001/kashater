import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import classes from "./Login.module.css"
import LoginFrom from "../../features/Login/LoginForm/LoginFrom"

const Login = () => {
  return (
    <div className={classes.login_page}>
      <div className={classes.login_container}>
        <LoginFrom />
      </div>
    </div>
  )
}

export default Login
