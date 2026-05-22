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
      sx={{
        width,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto",
        cursor: disabled ? "not-allowed" : "pointer",

        // ✅ input base
        "& .MuiInputBase-root.MuiOutlinedInput-root": {
          backgroundColor: "rgb(46 51 53)",
          borderRadius: "34px",
          color: "#fff",
          padding: "2px",
          paddingLeft: "10px",
        },

        // ✅ user-typed text color
        "& .MuiOutlinedInput-input": {
          color: "#fff !important",
          WebkitTextFillColor: "#fff !important",
        },

        // ✅ placeholder color
        "& .MuiInputBase-input::placeholder": {
          color: "rgba(255, 255, 255, 0.6)",
          opacity: 1,
        },

        // ✅ tag/chip color
        "& .MuiAutocomplete-tag": {
          backgroundColor: "rgba(255,255,255,0.2)",
          color: "#fff",
        },

        // ✅ dropdown icon
        "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall": {
          color: "rgba(255, 255, 255, 0.7)",
        },

        // ✅ no borders (optional)
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
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            "& .MuiAutocomplete-option": {
              padding: "10px 16px",
              fontSize: "14px",
              fontFamily: "var(--font-Medium)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            },
            "& .MuiAutocomplete-option[aria-selected='true']": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#fff",
            },
            "& .MuiAutocomplete-noOptions": {
              padding: "10px 16px",
              fontSize: "16px",
              fontFamily: "var(--font-Medium)",
              color: "rgba(255, 255, 255, 0.7)",
              textAlign: "center",
            },
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "red",
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
      renderInput={(params) => (
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
              backgroundColor: "rgb(46 51 53)",
              px: "4px",
              mx: "4px",
              fontSize: "14px",
              fontFamily: "var(--font-Medium)",
              left: "-6px",
              color: "#fff", // ✅ label color
            },
          }}
          sx={{
            "& .MuiInputBase-root": {
              padding: "12px 14px",
              fontSize: "14px",
              fontFamily: "var(--font-Medium)",
              color: "#fff", // ✅ text white
            },
            "& .MuiFormHelperText-root": {
              color: "#fff", // ✅ helper text white
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
            filter: "brightness(0) invert(1) opacity(0.7)",
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
