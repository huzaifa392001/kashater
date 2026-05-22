import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import InputBase from "@mui/material/InputBase"
import Box from "@mui/material/Box"
import { styled } from "@mui/system"

// SearchBar component with smooth transitions
const SearchBar = styled(InputBase)({
  width: "100%",
  padding: "0 10px",
  transition: "width 0.4s ease, opacity 0.3s ease",
  opacity: 1,
  "&.hidden": {
    width: 0,
    opacity: 0,
  },
})

const SearchExpand = ({
  placeholder = "Search...",
  searchIcon = <SearchIcon />,
  closeIcon = <CloseIcon />,
  onSearchChange,
  searchValue: externalSearchValue = "",
  maxWidth = "400px",
  borderColor = "#ccc",
}) => {
  const [showSearch, setShowSearch] = useState(false)
  // Internal state to capture the search value
  const [internalSearchValue, setInternalSearchValue] =
    useState(externalSearchValue)

  // Toggle search visibility
  const toggleSearch = () => {
    if (showSearch) {
      // Reset search value when closing
      setInternalSearchValue("")
      if (onSearchChange) {
        onSearchChange("")
      }
    }
    setShowSearch(prev => !prev)
  }

  // Handle input change
  const handleSearchChange = e => {
    const value = e.target.value
    setInternalSearchValue(value)
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {!showSearch ? (
        <IconButton onClick={toggleSearch}>{searchIcon}</IconButton>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth, // Use maxWidth prop
            transition: "width 0.4s ease",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: 1,
              border: `1px solid ${borderColor}`,
              borderRadius: "8px",
              padding: "4px",
              backgroundColor: "transparent",
              width: showSearch ? "100%" : "0",
              transition: "width 0.4s ease",
              overflow: "hidden",
            }}
          >
            <SearchBar
              className={showSearch ? "" : "hidden"}
              value={internalSearchValue}
              onChange={handleSearchChange}
              placeholder={placeholder}
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
          <IconButton onClick={toggleSearch}>{closeIcon}</IconButton>
        </Box>
      )}
    </div>
  )
}

export default SearchExpand
