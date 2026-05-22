import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

// Styled Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-container": {
    backdropFilter: "blur(10px)", // 💡 Blur effect
    backgroundColor: "rgba(0, 0, 0, 0.6)", // 💡 Semi-transparent black
    // borderRadius: "20px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

// Reusable Dialog Component
const BoostrapDialog = ({
  open,
  handleClose,
  title = "Modal Title",
  content = "Modal Content",
  actions,
  maxWidth = "sm",
  fullWidth = true,
  customWidth, // New prop
  showCloseIcon = true,
  children,
  style,
  rootStyle = {},
  isOutSideClick = true,

  overflowY = "auto",
}) => {
  return (
    <BootstrapDialog
      open={open}
      onClose={isOutSideClick ? handleClose : () => { }}
      aria-labelledby="customized-dialog-title"
      maxWidth={false} // Disable default maxWidth
      fullWidth={false} // Disable fullWidth to apply custom size
      sx={{
        ...style,
        "& .MuiPaper-root": {
          width: customWidth || "500px", // Apply customWidth or fallback to default
          maxWidth: customWidth || "500px",
          overflowY: overflowY || "auto",
          backgroundColor: "rgba(31, 38, 43, 0.6)",
          ...rootStyle,
        },
      }}
    >
      {/* Close Icon */}
      {showCloseIcon && (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      )}

      {children}
    </BootstrapDialog>
  );
};

export default BoostrapDialog;
