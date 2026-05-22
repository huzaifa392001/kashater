import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useState } from "react"
import downlodeImge from "../../../assets/image/svg/download.svg"

const DropDownFile = ({ handleFileDownload }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = fileType => {
    handleFileDownload(fileType)
    handleClose()
  }

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img src={downlodeImge} alt="download" />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("pdf")}>PDF</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("csv")}>CSV</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("xlsx")}>XLSX</MenuItem>
      </Menu>
    </div>
  )
}

export default DropDownFile
