import { IconButton, TextField, InputAdornment } from "@mui/material"
import { useState, useRef } from "react"
import eyeOpen from "../../../assets/image/svg/eye-open.svg"
import eyeClose from "../../../assets/image/svg/eye-close.svg"

export default function PasswordInput(props) {
  const [visible, setVisible] = useState(false)
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.blur() // Blur the input field
    setVisible(!visible) // Toggle visibility after blurring
  }

  return (
    <TextField
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "45px",
          padding: "0px",
          background: "#fff",
          border: "none",
        },
        "& .MuiInputLabel-root": {
          fontSize: "14px",
        },
        "& .MuiInputBase-input": {
          padding: "8px 10px",
          fontSize: "14px",
          border: "none",
        },
      }}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClick}
            >
              {visible ? (
                <img src={eyeOpen} alt="password visibility icon" />
              ) : (
                <img src={eyeClose} alt="password visibility icon" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink: true,
      }}
      inputRef={inputRef} // Attach ref to the input field
      type={visible ? "text" : "password"}
      {...props}
    />
  )
}
