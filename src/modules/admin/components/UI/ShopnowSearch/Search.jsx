import * as React from "react"
import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"

const Search = styled("div")(({ theme, fullWidth }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: fullWidth ? "100%" : "auto", // Make it full width or auto based on props
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#363636",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "var(--font-Medium)",
  },
}))

const SearchComponent = ({
  placeholder = "Search...",
  fullWidth = false,
  onChange,
  value,
}) => {
  return (
    <Search fullWidth={fullWidth}>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: "var(--secondary-dark)" }} />
      </SearchIconWrapper>
      <StyledInputBase
        sx={{ width: "100%" }}
        placeholder={placeholder}
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={onChange}
      />
    </Search>
  )
}

export default SearchComponent
