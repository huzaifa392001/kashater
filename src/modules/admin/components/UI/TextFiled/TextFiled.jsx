import { TextField } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import React, { useEffect } from "react"
import styled from "styled-components"

// const StyleTextField = styled(TextField)({
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "5px",
//     height: "45px",
//     padding: "0px",
//   },
//   "& .MuiInputLabel-root": {
//     transform: "translate(14px, 12px) scale(1)",
//     transition: "all 0.3s ease",
//     fontSize: "14px",
//   },
//   "& .MuiInputBase-input": {
//     padding: "8px 10px",
//     fontSize: "14px",
//   },
//   "& .MuiInputLabel-root.Mui-focused": {
//     transform: "translate(14px, -6px) scale(0.75)",
//   },
//   "& .MuiInputLabel-root.MuiFormLabel-filled": {
//     transform: "translate(14px, -6px) scale(0.75)",
//   },
// })
const StyleTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    height: "45px",
    padding: "0px",
  },
  "& .MuiInputLabel-root": {
    transition: "all 0.3s ease",
    fontSize: "14px",
  },
  "& .MuiInputBase-input": {
    padding: "8px 10px",
    fontSize: "14px",
  },
  // Label shrink behavior handled here
  // "& .MuiInputLabel-root.Mui-focused": {
  //   transform: "translate(14px, -6px) scale(0.75)",
  // },
  "& .MuiInputLabel-root.MuiFormLabel-filled": {
    // transform: "translate(14px, -6px) scale(0.75)",
  },
})

const CustomTextField = props => {
  return <StyleTextField {...props} />
}

export default CustomTextField
