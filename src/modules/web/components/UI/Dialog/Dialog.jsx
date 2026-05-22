import React from "react"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@mui/material/Button"

// Styled Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-container": {
    backdropFilter: "blur(10px)", // 💡 Blur effect
    backgroundColor: "rgba(0, 0, 0, 0.6)", // 💡 Semi-transparent black
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}))

// Reusable Dialog Component
const CustomDialog = ({
  open,
  handleClose = false,
  title = "Modal Title",
  content = "Modal Content",
  actions,
  maxWidth = "sm",
  fullWidth = true,
  customWidth, // New prop
  showCloseIcon = true,
  children,
  style,
  overflowY = "auto",
}) => {
  return (
    <BootstrapDialog
      open={open}
      onClose={false}
      aria-labelledby="customized-dialog-title"
      maxWidth={false} // Disable default maxWidth
      fullWidth={false} // Disable fullWidth to apply custom size
      sx={{
        ...style,
        "& .MuiPaper-root": {
          width: customWidth || "500px", // Apply customWidth or fallback to default
          maxWidth: customWidth || "500px",
          overflowY: overflowY || "auto",
          bgcolor: "transparent",
        },
      }}
    >
      {/* Close Icon */}
      {showCloseIcon && (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={theme => ({
            position: "absolute",
            right: 8,
            top: 8,
            // color: theme.palette.grey[500],
            backgroundColor: "white",
            color: "black",
            // borderRadius: "50%",
            // width: 36,
            // height: 36,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              boxShadow: "0 0 34px 0 rgba(255, 255, 255, 0.67)",
            },
          })}
        >
          <CloseIcon />
        </IconButton>
      )}

      {children}
    </BootstrapDialog>
  )
}

export default CustomDialog
