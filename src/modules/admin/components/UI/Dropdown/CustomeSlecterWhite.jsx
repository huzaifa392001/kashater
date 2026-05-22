import React, { useState } from "react"
import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material"
// import arrow from "../../../assets/image/svg/dropdown.svg"
import arrow from "../../../assets/image/svg/down-arrowWhite.svg"
const CustomeSlecterWhite = props => {
  const {
    data,
    title,
    width,
    value,
    onChange,
    borders = false,
    disabled,
    error,
    helperText
  } = props

  // State to control dropdown open/close
  const [open, setOpen] = useState(false)

  const handleIconClick = () => {
    if (!disabled) {
      setOpen(prev => !prev) // Toggle the dropdown menu
    }
  }

  return (
    <FormControl sx={{ minWidth: width, boxShadow: "none", }}
      error={error}
    >
      {props?.lable && (
        <InputLabel
          shrink={true}
          sx={{
            backgroundColor: "#fff", // or any background color you want
            px: "4px", // horizontal padding
            mx: "4px", // margin to prevent cutoff by border
            fontSize: "14px",
            fontFamily: "var(--font-medium-Quicksand)",
            left: "-6px",
          }}
        >
          {props?.lable}
        </InputLabel>
      )}
      <Select
        value={value}
        onChange={onChange}
        // open={open} // Control the open state
        // onOpen={() => setOpen(true)} // Ensure proper behavior when interacting with the dropdown
        // onClose={() => setOpen(false)} // Ensure proper behavior when closing the dropdown
        displayEmpty
        MenuProps={{
          transitionDuration: 0,
          PaperProps: {
            sx: {
              maxHeight: "400px",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",   // iOS smooth scroll
              overscrollBehavior: "none",         // disable bounce on iPhone
              fontFamily: "var(--font-medium-Quicksand)",

              "&::-webkit-scrollbar": {
                width: "6px !important",
                display: "block !important",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            },
          },
        }}
        sx={{
          borderBottom: "1px solid #fff",
          width,
          fontSize: "16px",
          color: "#ffff",
          fontFamily: "var(--font-medium-Quicksand)",
          "& .MuiOutlinedInput-input": {
            padding: "12px 14px",
          },
          ...(!borders
            ? {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border when focused
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border on hover
              },
              boxShadow: "none", // Remove box-shadow
            }
            : {}),
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? "none" : "auto",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        IconComponent={props => (
          <span
            {...props}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "8px",
              pointerEvents: "none" // still important
            }}
          >
            <img
              src={arrow}
              alt="arrow"
              // onClick={handleIconClick} // Attach click handler to icon
              style={{
                width: "12px"
              }}
            />
          </span>
        )}
      >
        <MenuItem value="">
          <span>{title}</span>
        </MenuItem>
        {data.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option?.can_update === false} // disable if can_update is true
            sx={{
              color: option?.can_update === false ? "#ccc" : "inherit",
              cursor: option?.can_update === false ? "not-allowed" : "pointer",
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText
          sx={{
            "&.Mui-error": {
              color: "#fff"
            },
            color: "#fff",
            fontSize: "12px",
            marginLeft: "0px"
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default CustomeSlecterWhite
