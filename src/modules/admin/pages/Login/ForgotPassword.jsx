import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import classes from "./Login.module.css"
import ForgotPswForm from "../../features/Login/ForgotPswForm/ForgotPswForm"

const ForgotPassword = () => {
  return (
    <div className={classes.login_page}>
      <div className={classes.login_container}>
        <ForgotPswForm />
      </div>
    </div>
  )
}

export default ForgotPassword
