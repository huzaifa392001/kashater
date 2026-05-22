import React from "react"

// component
import PhoneInput from "react-phone-input-2"

// css
import "react-phone-input-2/lib/material.css"
import classes from "./PhoneNumInput.module.css"

export default function PhoneNumInput(props) {
  return (
    <PhoneInput
      specialLabel={false}
      containerClass={
        props.phoneHasError
          ? `${classes["phone-input__container"]} ${classes["error"]}`
          : `${classes["phone-input__container"]}`
      }
      inputClass={classes["phone-input__input"]}
      dropdownClass={classes["phone-input__dropdown"]}
      country="in"
      countryCodeEditable={false}
      autoFocus={false}
      inputStyle={{
        borderColor: props.phoneHasError && "red",
      }}
      {...props}
    />
    //   {(props.touched && props.error) && <p style={{ color: 'red' }} className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled MuiFormHelperText-marginDense">{props.error}</p>}
    // </div>
  )
}
