import React from "react"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import { styled } from "@mui/system"

const SearchContainer = styled("div")(({ maxwidth }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgb(239 239 239 / 20%)",
  borderRadius: "9px",
  padding: "6px 16px",
  width: "100%",
  maxWidth: maxwidth || "600px", // Default 600px if not provided
  color: "black",
  backdropFilter: "blur(6px)",
  transition: "max-width 0.3s ease",
  fontFamily: "var(--font-regular-Quicksand)",
  border: "1px solid #7f8389",
}))

const StyledInput = styled(InputBase)({
  marginLeft: "8px",
  flex: 1,
  color: "black",
  fontSize: "14px",
  "::placeholder": {
    color: "black",
  },
})

const SearchBar = ({
  placeholder = "Search title, theme...",
  onSearchChange,
  value,
  maxWidth = "600px",
}) => {
  return (
    <SearchContainer maxwidth={maxWidth}>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={e => onSearchChange(e.target.value)}
        inputProps={{ "aria-label": "search" }}
      />
      <SearchIcon style={{ color: "rgba(0, 0, 0, 0.7)" }} />

    </SearchContainer>
  )
}

export default SearchBar
