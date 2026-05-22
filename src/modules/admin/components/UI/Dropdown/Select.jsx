import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { styled } from "@mui/system"

import arrow from "../../../assets/image/svg/dropdown.svg"

const CustomFormControl = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    colors: "#363636",
    fontFamily: "var(--font-Medium)",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
})

const CustomDropdownIcon = React.forwardRef((props, ref) => (
  <span
    {...props}
    ref={ref}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none", // <-- keep image transparent to clicks
    }}
  >
    <img
      src={arrow}
      alt="arrow"
      style={{
        width: "12px",
        height: "12px",
        pointerEvents: "none", // let clicks go through image to Select
      }}
    />
  </span>
))

export default function SelectSmall(props) {
  const {
    data,
    title,
    onChange,
    value,
    onClick,
    width,
    AllLable = false,
  } = props

  return (
    <CustomFormControl sx={{ m: 1, minWidth: width }} size="small">
      <Select
        label={false}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value || ""}
        onChange={onChange}
        displayEmpty
        IconComponent={CustomDropdownIcon}
        sx={{
          fontFamily: "var(--font-Medium)",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:focus-visible": {
            outline: "none",
          },
        }}
      >
        <MenuItem value="" disabled={AllLable}>
          <p
            style={{
              opacity: 1,
              color: "rgb(70, 70, 70)",
              fontFamily: "var(--font-regular)",
              fontSize: "14px",
              fontWeight: 400,
              letterSpacing: "0px",
            }}
          >
            {title}
          </p>{" "}
          {/* Placeholder text here */}
        </MenuItem>
        {data.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </CustomFormControl>
  )
}
