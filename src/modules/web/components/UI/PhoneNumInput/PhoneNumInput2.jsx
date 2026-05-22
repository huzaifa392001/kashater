import React from "react"

// component
import PhoneInput from "react-phone-input-2"

// css
import "react-phone-input-2/lib/material.css"
import "./phone.css"

export default function PhoneNumInput2({ value = "", onChange = () => { }, error }) {
  return (
    <PhoneInput
      specialLabel={false}
      country="in"
      countryCodeEditable={false}
      autoFocus={false}
      inputClass={error ? "phone-input eror-line" : "phone-input"}
      buttonClass="phone-flag"
      containerClass="phone-container"
      placeholder="Mobile Number"
      value={value}
      onChange={onChange}
    />
    //   {(props.touched && props.error) && <p style={{ color: 'red' }} className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled MuiFormHelperText-marginDense">{props.error}</p>}
    // </div>
  )
}
