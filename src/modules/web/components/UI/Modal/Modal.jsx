import React from "react"
import { Modal, Box, Typography, Button, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const Popup = ({ open, onClose, title, children, actions, style, height }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="popup-modal-title"
      aria-describedby="popup-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "1000px",
          bgcolor: "rgba(0, 0, 0, 0.1)", // Light black background
          color: "#ffffff", // White text
          // boxShadow: 24,
          p: 4,
          borderRadius: "8px",
          ...style,
        }}
      >
        {/* Close button at top-right */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        {title && (
          <Typography
            sx={{
              fontFamily: "var(--font-bold)",
              fontSize: "24px",
              textAlign: "center",
              mb: 1,
              pt: 2, // Add padding to prevent overlap with close button
            }}
            id="modal-modal-title"
            variant="h6"
            component="h3"
          >
            {title}
          </Typography>
        )}

        {/* Content */}
        <Box id="popup-modal-description" sx={{ mt: 2, ...height }}>
          {children}
        </Box>

        {/* Actions (if provided) */}
        {actions && (
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            {actions}
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default Popup
