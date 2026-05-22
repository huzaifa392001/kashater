// import React from "react"
// import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material"

// const Autocomplete = ({
//   options = [],
//   getOptionLabel,
//   multiple = false,
//   value,
//   defaultValue,
//   onChange,
//   label,
//   placeholder,
//   filterSelectedOptions = false,
//   error = false,
//   helperText,
//   required = false,
//   className,
//   sx,
//   ...props
// }) => {
//   return (
//     <MuiAutocomplete
//       multiple={multiple}
//       options={options}
//       getOptionLabel={getOptionLabel}
//       value={value}
//       defaultValue={defaultValue}
//       onChange={onChange}
//       filterSelectedOptions={filterSelectedOptions}
//       className={className}
//       sx={sx}
//       renderInput={params => (
//         <TextField
//           {...params}
//           label={label}
//           placeholder={placeholder}
//           error={error}
//           helperText={helperText}
//           required={required}
//         />
//       )}
//       {...props}
//     />
//   )
// }

// export default Autocomplete
import React from "react"
import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material"
import arrow from "../../../assets/image/svg/dropdown.svg"

const Autocomplete = ({
  options = [],
  getOptionLabel,
  multiple = false,
  value,
  defaultValue,
  onChange,
  label,
  placeholder,
  filterSelectedOptions = false,
  error = false,
  helperText,
  required = false,
  className,
  sx,
  width = "100%",
  borders = true,
  disabled = false,
  ...props
}) => {
  return (
    <MuiAutocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      filterSelectedOptions={filterSelectedOptions}
      className={className}
      disabled={disabled}
      shrink={true}
      // isOptionEqualToValue={
      //   (option, value) => option.name === value.name // Use unique identifier
      // }
      // Add valueKey for better object comparison
      // getOptionKey={option => option.id || option.name} // Add if using IDs
      sx={{
        width,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto",
        cursor: disabled ? "not-allowed" : "pointer",

        ...(!borders && {
          "& .MuiOutlinedInput-root": {
            padding: 0,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
        }),
        ...sx,
      }}
      componentsProps={{
        paper: {
          sx: {
            maxHeight: "400px",
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: "6px !important",
              display: "block !important",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          },
        },
        popper: {
          sx: {
            "& .MuiAutocomplete-listbox": {
              padding: 0,
            },
          },
        },
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          required={required}
          InputLabelProps={{
            shrink: true,
            sx: {
              backgroundColor: "#fff",
              px: "4px",
              mx: "4px",
              fontSize: "14px",
              fontFamily: "var(--font-Medium)",
              left: "-6px",
            },
          }}
          sx={{
            "& .MuiInputBase-root": {
              padding: "12px 14px",
              fontSize: "14px",
              fontFamily: "var(--font-Medium)",
              color: "#9e9e9e",
            },
          }}
        />
      )}
      popupIcon={
        <img
          src={arrow}
          alt="dropdown"
          style={{
            width: "12px",
            marginRight: "0.5rem",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        />
      }
      {...props}
    />
  )
}

export default Autocomplete

{
  /* <Autocomplete
  options={users}
  getOptionLabel={(option) => option.name}
  renderInput={(params) => (
    <TextField {...params} label="Users" placeholder="Search users" />
  )}
  renderOption={(props, option) => (
    <li {...props}>
      <img 
        src={option.avatar} 
        alt={option.name}
        style={{ width: 24, height: 24, marginRight: 8 }}
      />
      {option.name} ({option.role})
    </li>
  )}
/> */
}

{
  /* <Autocomplete
  multiple
  options={tags}
  getOptionLabel={option => option}
  renderInput={params => (
    <TextField {...params} label="Skills" placeholder="Select skills" />
  )}
/> */
}
