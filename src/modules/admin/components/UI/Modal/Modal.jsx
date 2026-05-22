import React from "react"
import { Modal, Box, Typography, Button } from "@mui/material"

// Custom styling for the modal popup

const Popup = ({ open, onClose, title, children, actions, style, height }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="popup-modal-title"
      aria-describedby="popup-modal-description"
    >
      <Box sx={style}>
        {!actions && (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onClose} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        )}
        {title && (
          <Typography
            sx={{
              fontFamily: "var(--font-bold)",
              color: "#000000",
              fontSize: "24px",
              textAlign: "center",
              mb: 1,
            }}
            id="modal-modal-title"
            variant="h6"
            component="h3"
          >
            {title}
          </Typography>
        )}

        <Box id="popup-modal-description" sx={{ mt: 2, ...height }}>
          {children}
        </Box>
      </Box>
    </Modal>
  )
}

export default Popup
