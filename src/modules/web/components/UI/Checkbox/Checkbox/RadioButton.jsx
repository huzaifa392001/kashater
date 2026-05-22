import React from "react"
import classes from "./CheckBox.module.css" // You can rename this to RadioButton.module.css

const RadioButton = ({ checked, onChange, label, name }) => {
  return (
    <label
      className={classes.container}
      style={{ lineHeight: "unset", marginBottom: "0px" }}
    >
      {label}
      <input type="radio" checked={checked} onChange={onChange} name={name} />
      <span className={classes.checkmark}></span>
    </label>
  )
}

export default RadioButton
