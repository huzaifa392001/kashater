import React, { useState } from "react"
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import arrow from "../../../assets/image/svg/dropdown.svg"
const CustomeSlecter = props => {
  const {
    data,
    title,
    width,
    value,
    onChange,
    borders = false,
    disabled,
  } = props

  // State to control dropdown open/close
  const [open, setOpen] = useState(false)

  const handleIconClick = () => {
    if (!disabled) {
      setOpen(prev => !prev) // Toggle the dropdown menu
    }
  }

  return (
    <FormControl
      sx={{
        minWidth: width,
        boxShadow: "none",
        "& .MuiSelect-select": {
          padding: "11px 14px", // Customize padding here
        },
      }}
    >
      {props?.lable && (
        <InputLabel
          shrink={true} // Always keep the label above
          sx={{
            backgroundColor: "#fff", // Matches the background
            fontSize: "14px",
            paddingTop: "2px",
          }}
        >
          {props?.lable}
        </InputLabel>
      )}
      <Select
        value={value}
        onChange={onChange}
        open={open} // Control the open state
        onOpen={() => setOpen(true)} // Ensure proper behavior when interacting with the dropdown
        onClose={() => setOpen(false)} // Ensure proper behavior when closing the dropdown
        displayEmpty
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: "400px",
              overflowY: "auto",

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
          width,
          fontSize: "14px",
          colors: "#9e9e9e",
          fontFamily: "var(--font-Medium)",
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
          <img
            src={arrow}
            alt="arrow"
            onClick={handleIconClick} // Attach click handler to icon
            style={{
              width: "12px",
              marginRight: "0.5rem",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          />
        )}
      >
        {/* <MenuItem value="">
          <span>{title}</span>
        </MenuItem> */}
        {data.map(option => (
          <MenuItem key={option.dealer_code} value={option.dealer_code}>
            {option.dealer_code} - {option.location}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CustomeSlecter
