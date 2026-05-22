import * as React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material"

const ReusableScrollDialog = ({
  open,
  onClose,
  title = "Dialog Title",
  content = "",
  actions = [],
  scroll = "body",
  children,
  dialogWidth = "500px", // <-- New prop
  maxWidth = false, // optional if you use MUI maxWidth presets
  fullWidth = false, // disable full width to apply custom width
  sx = {}, // <-- allow additional custom styling
}) => {
  const descriptionElementRef = React.useRef(null)

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      disableScrollLock={scroll === "body"}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={{
        "& .MuiPaper-root": {
          width: dialogWidth,
          maxWidth: dialogWidth,
        },
        ...sx,
      }}
    >
      {children}
    </Dialog>
  )
}

export default ReusableScrollDialog
