import React, { useState } from "react"
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import arrow from "../../../assets/image/svg/dropdown.svg"
import Checkbox from "@mui/material/Checkbox"
import ListItemText from "@mui/material/ListItemText"
const CustomeSlecterMultiple = props => {
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
    <FormControl sx={{ minWidth: width, boxShadow: "none" }}>
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
        open={open} // Control the open state
        onOpen={() => setOpen(true)} // Ensure proper behavior when interacting with the dropdown
        onClose={() => setOpen(false)} // Ensure proper behavior when closing the dropdown
        displayEmpty
        multiple
        renderValue={(selected) => {
          if (selected.length === 0) return title

          return data
            .filter(item => selected.includes(item.value))
            .map(item => item.label)
            .join(", ")
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: "400px",
              overflowY: "auto",
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
          width,
          fontSize: "16px",
          color: "#000",
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
            {/* {option.label} */}
            <Checkbox checked={value.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CustomeSlecterMultiple
