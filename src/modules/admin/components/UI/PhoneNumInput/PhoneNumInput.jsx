import React from "react"

// component
import PhoneInput from "react-phone-input-2"

// css
import "react-phone-input-2/lib/material.css"
import classes from "./PhoneNumInput.module.css"

export default function PhoneNumInput(props) {
  const { phoneHasError, showFlag = true, ...rest } = props

  return (
    <PhoneInput
      containerClass={
        phoneHasError
          ? `${classes["phone-input__container"]} ${classes["error"]}`
          : `${classes["phone-input__container"]}`
      }
      inputClass={classes["phone-input__input"]}
      country="in"
      countryCodeEditable={false}
      autoFocus={false}
      inputStyle={{
        borderColor: phoneHasError && "red",
      }}
      disableDropdown={!showFlag}
      buttonClass={!showFlag ? classes["hide-flag"] : ""}
      {...rest}
    />
  )
}
// export default function PhoneNumInput(props) {
//   const {
//     phoneHasError,
//     showFlag = true,
//     country = "in", // default country
//     ...rest
//   } = props

//   return (
//     <PhoneInput
//       country={country}
//       countryCodeEditable={false}
//       disableDropdown={!showFlag} // disable dropdown only when flag hidden
//       inputClass={classes["phone-input__input"]}
//       containerClass={
//         phoneHasError
//           ? `${classes["phone-input__container"]} ${classes["error"]}`
//           : classes["phone-input__container"]
//       }
//       buttonClass={!showFlag ? classes["hide-flag"] : ""}
//       inputStyle={{
//         borderColor: phoneHasError ? "red" : "#ccc",
//       }}
//       {...rest}
//     />
//   )
// }
