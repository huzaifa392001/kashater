import {
  Box,
  Checkbox,
  Modal,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material"
import React, { useState, useEffect } from "react"
import ModalChekBoxWithLable from "../Checkbox/modalCheckBox/ModalChekBoxWithLable"
import MuiTextarea from "../Inputs/TextArea/TextAreaInput"
import { Input } from "@mui/material"
import UploadIcon from "../svgComponents/UploadIcon"

const ComplaintModal = props => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  }

  const handleClose = () => {
    props.modalHandle(false)
  }

  return (
    <Modal
      open={props.open}
      onClose={false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{
            fontFamily: "var(--font-bold)",
            color: "#000000",
            fontSize: "24px",
            textAlign: "center",
            mb: 5,
          }}
          id="modal-modal-title"
          variant="h6"
          component="h3"
        >
          Raise New Complaint
        </Typography>
        <TextField
          label="PO Number"
          value={props?.orderNo || ""}
          disabled={props?.orderNo ? true : false}
          color="#D4D4D4"
          fullWidth
        />
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 2,
            mb: 3,
            fontFamily: "var(--font-Medium)",
            color: "#68686A",
            fontSize: "12px",
          }}
        >
          Choose Products
        </Typography>
        <Stack direction="row" sx={{ mb: 3 }}>
          <ModalChekBoxWithLable />
        </Stack>
        <Stack direction="row">
          <MuiTextarea sx={{ width: "100%" }} label="Complaint Details" />
          <Stack>
            <label htmlFor="complaint-file">
              <UploadIcon />
            </label>
            <Input type="file" id="complaint-file" />
          </Stack>
        </Stack>
        <Stack>
          <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
            <Button
              style={{
                color: "#68686A",
                fontSize: "14px",
                fontFamily: "var(--font-bold)",
                textTransform: "capitalize",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              style={{
                color: "#32349B",
                fontSize: "14px",
                fontFamily: "var(--font-bold)",
                textTransform: "capitalize",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ComplaintModal
