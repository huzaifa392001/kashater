import React from "react"
import classes from "./CheckBox.module.css"
const CheckBox = ({ checked, onChange, label, subLabel }) => {
  return (
    <label className={classes.container}>
      <p className={classes.label}>{label}</p>
      <p className={classes.sub_label}>{subLabel}</p>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={classes.checkmark}></span>
    </label>
  )
}

export default CheckBox
