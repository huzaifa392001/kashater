import { memo, createRef, useEffect, useRef, useState } from "react"
import { TextField, Stack } from "@mui/material"

const otpInputStyle = {
  "& input[type=number]": {
    // Hide the spinner arrows in all browsers
    MozAppearance: "textfield", // Firefox
    WebkitAppearance: "none", // Chrome, Safari, Edge
    appearance: "textfield", // General removal for other browsers
    color: "#fff",
    fontFamily: "var(--font-semibold-Quicksand)",
  },
  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
  {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-moz-appearance": {
    appearance: "textfield", // Firefox workaround for spinner
  },
  width: "40px",
  borderRadius: "8px",
  backgroundColor: "#FFFFFF1A",
  color: "#fff",
  "& .MuiInputBase-input": {
    textAlign: "center",
    height: "40px",
    fontSize: "30px",
    padding: 0,
  },
  "& .MuiInputBase-input::placeholder": {
    fontFamily: "var(--font-semibold)",
    color: "var(--text-color-dark)",
  },
}

const restrictSingleValue = val => {
  return val.target?.value.replace(/[^0-9]/g, "").slice(0, 1)
}

function OtpInputs(props) {
  const boxCount = props.boxCount || 4
  const [otp, setOtp] = useState(Array(boxCount).fill(""))
  const inputRefs = useRef([...Array(boxCount)].map(() => createRef()))

  useEffect(() => {
    inputRefs.current[0].current.focus()
  }, [])

  useEffect(() => {
    if (props.onSuccess) {
      setOtp(Array(boxCount).fill(""))
    }
  }, [props.onSuccess, boxCount])


  useEffect(() => {
    if (props.reset) {
      setOtp(Array(boxCount).fill(""))
    }
  }, [props.reset])

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1].current.focus()
    } else if (e.key === "ArrowLeft" && i > 0) {
      inputRefs.current[i - 1].current.focus()
    } else if (e.key === "ArrowRight" && i < boxCount - 1) {
      inputRefs.current[i + 1].current.focus()
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault()
    }
  }

  const handleChange = (e, i) => {
    e.stopPropagation()
    const value = restrictSingleValue(e)

    setOtp(prev => prev.map((val, ind) => (ind === i ? value : val)))

    props?.onChange(otp.map((val, ind) => (ind === i ? value : val)))

    if (value && i < otp.length - 1) {
      inputRefs.current[i + 1].current.focus()
    }
    if (!value && i > 0) {
      inputRefs.current[i - 1].current.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()

    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "")
    const pasteArray = pasteData.slice(0, boxCount).split("")

    const newOtp = [...otp]

    pasteArray.forEach((num, index) => {
      newOtp[index] = num
    })

    setOtp(newOtp)

    props?.onChange(newOtp)

    const lastIndex = pasteArray.length - 1
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].current.focus()
    }
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing="19px"
      sx={{
        "& > :not(style)": {
          margin: 0,
          "@media (max-width:600px)": {
            marginRight: "-13px !important",
          },
        },
      }}
      {...props}
    >
      {Array(boxCount)
        .fill(null)
        .map((_, i) => (
          <TextField
            inputRef={inputRefs.current[i]}
            key={i}
            type="number"
            placeholder="0"
            value={otp[i]}
            onKeyDown={e => handleKeyDown(e, i)}
            onChange={e => handleChange(e, i)}
            onPaste={handlePaste}   // ✅ add this
            {...props?.inputProps}
            sx={{
              ...otpInputStyle,
              ...props?.inputProps?.sx,
            }}
          />
        ))}
    </Stack>
  )
}

export default memo(OtpInputs)
