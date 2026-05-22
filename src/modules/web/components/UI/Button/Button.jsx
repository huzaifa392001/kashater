import React from "react"
import Button from "@mui/material/Button"

const CustomButton = ({
  variant = "contained",
  color = "primary",
  customColor,
  customBgColor,
  size = "medium",
  onClick,
  boxShadow = "none",
  borderColor = "transparent",
  borderRadius = "100px",
  children,
  type = "button",
  custmstyle = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      type={type}
      sx={{
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "var(--font-semibold-Quicksand)",
        lineHeight: "-0.20000000298023224",
        letterSpacing: "-0.20000000298023224",
        textTransform: "capitalize",
        color: customColor,
        // borderImageSource:
        //   "linear-gradient(to bottom, rgba(255, 255, 255, 0.85), #7b7004)",
        // background:
        //   "linear-gradient(93deg, #e4d905 1%, #ffd051 100%), linear-gradient(to bottom, rgba(255, 255, 255, 0.85), #7b7004)",
        borderImageSource:
          "linear-gradient(to bottom, rgba(129, 49, 191, 0.85), #4a176e)",

        background:
          "linear-gradient(93deg, #9d4edb 1%, #c281f0 100%), linear-gradient(to bottom, rgba(129, 49, 191, 0.85), #4a176e)",
        backgroundColor: customBgColor,
        // boxShadow: variant === "contained" ? boxShadow : "none",
        boxShadow: boxShadow,
        borderColor:
          variant === "outlined" ? customColor || borderColor : borderColor,
        borderRadius: borderRadius,
        "&:hover": {
          backgroundColor: variant === "contained" ? customBgColor : undefined,
          borderColor:
            variant === "outlined" ? customColor || borderColor : undefined,
        },
        ...custmstyle,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton

{
  /* 
     <CustomButton
                                variant="outlined"
                                customColor="#32349b" 
                                customWidth="100%" 
                                // onClick={handleClick}
                                >
                                Full-Width Button
                                </CustomButton>
  
  <CustomButton
        variant="contained"
        customColor="white"
        customBgColor="#32349b" // Custom background color
        onClick={handleClick}
      >
        Custom Contained
      </CustomButton>
      <CustomButton
        variant="outlined"
        customColor="#32349b" // Custom text and border color
        onClick={handleClick}
      >
        Custom Outlined
      </CustomButton>
      <CustomButton
        variant="contained"
        customColor="#000000"
        customBgColor="#4CAF50" // Another custom background color
        onClick={handleClick}
      >
        Another Custom Contained
      </CustomButton> */
  // <CustomButton
  //         variant="contained"
  //         customColor="#131313"
  //         custmstyle={{
  //           padding: "10px",
  //         }}
  //         // customBgColor="#32349b" // Custom background color
  //         // onClick={handleClick}
  //       >
  //         Raise New Ticket
  //       </CustomButton>
}
