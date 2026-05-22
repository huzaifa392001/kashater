import React from "react"
import classes from "./Login.module.css"
// import OtpFrom from "../../features/Login/OtpForm/OtpForm"
import logo from "../../assets/image/png/logo@2x.png"

const OtpPage = () => {
  return (
    <div className={classes.login_page}>
      <div className={classes.login_container}>
        <div className={classes.login_container_heder}>
          <img src={logo} alt="logo" style={{ width: "156px" }} />
        </div>
        {/* <OtpFrom /> */}
      </div>
    </div>
  )
}

export default OtpPage
