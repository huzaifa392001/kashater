// components/UI/Loader/Loader.jsx
import React from "react"
import classes from "./OverlayLoding.module.css"

const OverlayLoding = () => {
  return (
    <div className={classes.loaderOverlay}>
      <div className={classes.loader}></div>
    </div>
  )
}

export default OverlayLoding
