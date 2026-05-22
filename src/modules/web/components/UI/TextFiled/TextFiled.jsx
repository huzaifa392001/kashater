import { TextField } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import React, { useEffect } from "react"
import styled from "styled-components"

const StyleTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "0px",
    height: "45px",
    padding: "0px",
    background: "none",
    // color: "var(--text-color-dark)",
    color: "#000",
    border: "none",

    // Styles for disabled state
    "&.Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FFFFFF4D", // Optional: lighter border when disabled
      },
      "& .MuiInputBase-input": {
        color: "#01050c", // White text color when disabled
        "-webkit-text-fill-color": "#01050c", // For Safari compatibility
      },
    },
  },
  "& .MuiInputLabel-root": {
    transition: "all 0.3s ease",
    fontSize: "14px",
  },
  "& .MuiInputBase-input": {
    padding: "12px 20px",
    fontSize: "16px",
    background: "none !important",
    border: "none",
    borderRadius: "0px",
    borderBottom: "1px solid #fff",
    color: "#000",
    fontFamily: "var(--font-medium-Quicksand)",
  },
  // Label shrink behavior handled here
  // "& .MuiInputLabel-root.Mui-focused": {
  //   transform: "translate(14px, -6px) scale(0.75)",
  // },
  "& .MuiInputLabel-root.MuiFormLabel-filled": {
    // transform: "translate(14px, -6px) scale(0.75)",
  },

  "& .MuiFormHelperText-root": {
    color: "#fff !important", // white color for helper text
  },
})

const CustomTextField = props => {
  return <StyleTextField {...props} />
}

export default CustomTextField
