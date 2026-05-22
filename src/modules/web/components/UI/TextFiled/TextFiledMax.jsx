import { TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyleTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "0px",
    height: "45px",
    padding: "0px",
    background: "none",
    color: "#000",
    border: "none",

    "&.Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FFFFFF4D",
      },
      "& .MuiInputBase-input": {
        color: "#01050c",
        WebkitTextFillColor: "#01050c",
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
  "& .MuiFormHelperText-root": {
    color: "#fff !important",
  },
});

const CustomTextField = (props) => {
  return (
    <StyleTextField
      {...props}
      inputProps={{
        maxLength: 15, // ✅ Limit text to 15 characters
        ...props.inputProps, // preserve other custom props
      }}
    />
  );
};

export default CustomTextField;
