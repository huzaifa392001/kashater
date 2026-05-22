import React from "react"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import { styled } from "@mui/system"

const SearchContainer = styled("div")(({ maxwidth }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid #000",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "999px",
  padding: "6px 16px",
  width: "100%",
  maxWidth: maxwidth || "600px", // Default 600px if not provided
  color: "#fff",
  backdropFilter: "blur(6px)",
  transition: "max-width 0.3s ease",
  fontFamily: "var(--font-regular-Quicksand)",
}))

const StyledInput = styled(InputBase)({
  marginLeft: "8px",
  flex: 1,
  fontSize: "14px",
  "::placeholder": {
    color: "#000",
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
      <SearchIcon style={{ color: "#000" }} />
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={e => onSearchChange(e.target.value)}
        inputProps={{ "aria-label": "search" }}
      />
    </SearchContainer>
  )
}

export default SearchBar
