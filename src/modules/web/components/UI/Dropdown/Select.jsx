// import React, { useState } from "react"
// import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"
// import arrow from "../../../assets/image/svg/dropdown.svg"

// const Slecter = props => {
//   const {
//     data,
//     title,
//     width,
//     value,
//     onChange,
//     borders = false,
//     disabled,
//     page = false,
//     all = "",
//   } = props

//   const [open, setOpen] = useState(false)

//   const handleIconClick = () => {
//     if (!disabled) setOpen(prev => !prev)
//   }

//   return (
//     <FormControl sx={{ minWidth: width, boxShadow: "none" }}>
//       {props?.lable && <InputLabel>{props?.lable}</InputLabel>}
//       <Select
//         value={value}
//         onChange={onChange}
//         open={open}
//         onOpen={() => setOpen(true)}
//         onClose={() => setOpen(false)}
//         displayEmpty
//         MenuProps={{
//           PaperProps: {
//             sx: {
//               maxHeight: "400px",
//               overflowY: "auto",
//               backgroundColor: "rgba(0, 0, 0, 0.8)",
//               backdropFilter: "blur(6px)",
//               fontFamily: "var(--font-regular-Inter)",
//               color: "#fff",
//               "& .MuiMenuItem-root": {
//                 "&:hover": {
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                 },
//               },
//               "&::-webkit-scrollbar": {
//                 width: "6px !important",
//                 display: "block !important",
//               },
//               "&::-webkit-scrollbar-thumb": {
//                 backgroundColor: "rgba(255, 255, 255, 0.3)",
//                 borderRadius: "10px",
//               },
//             },
//           },
//         }}
//         sx={{
//           width,
//           fontSize: "14px",
//           color: "#fff",
//           fontFamily: "var(--font-regular-Inter)",
//           backgroundColor: `${
//             page ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"
//           }`,
//           borderRadius: "999px",
//           backdropFilter: "blur(6px)",
//           "& .MuiSelect-select": {
//             padding: "10px 16px",
//           },
//           ...(!borders && {
//             "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               border: "none",
//             },
//             "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
//             boxShadow: "none",
//           }),
//           opacity: disabled ? 0.5 : 1,
//           pointerEvents: disabled ? "none" : "auto",
//           cursor: disabled ? "not-allowed" : "pointer",
//         }}
//         IconComponent={props => (
//           <img
//             src={arrow}
//             alt="arrow"
//             onClick={handleIconClick}
//             style={{
//               width: "12px",
//               marginRight: "0.5rem",
//               cursor: disabled ? "not-allowed" : "pointer",
//               filter: "brightness(0) invert(1) opacity(0.7)",
//             }}
//           />
//         )}
//       >
//         <MenuItem value="">
//           <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
//             {all ? "All" : title}
//           </span>
//         </MenuItem>
//         {data.map(option => (
//           <MenuItem
//             key={option.value}
//             value={option.value}
//             sx={{ color: "#fff !important" }}
//           >
//             {option.label}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   )
// }

// export default Slecter

import React, { useState } from "react"
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import arrow from "../../../assets/image/svg/dropdown.svg"

const Slecter = props => {
  const {
    data,
    title,
    width,
    value,
    onChange,
    borders = false,
    disabled,
    page = false,
    all = false, // default false
  } = props

  const [open, setOpen] = useState(false)

  const handleIconClick = () => {
    if (!disabled) setOpen(prev => !prev)
  }

  return (
    <FormControl sx={{ minWidth: width, boxShadow: "none" }}>
      {props?.lable && <InputLabel>{props?.lable}</InputLabel>}
      <Select
        value={value}
        onChange={onChange}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        displayEmpty
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: "400px",
              overflowY: "auto",
              backgroundColor: "rgba(251, 245, 245, 0.8)",
              backdropFilter: "blur(6px)",
              fontFamily: "var(--font-regular-Quicksand)",
              // color: "#fff",
              color: "#000",
              "& .MuiMenuItem-root": {
                "&:hover": {
                  // backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backgroundColor: "#fff",
                },
              },
              "&::-webkit-scrollbar": {
                width: "6px !important",
                display: "block !important",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: "10px",
              },
            },
          },
        }}
        sx={{
          width,
          fontSize: "14px",
          color: "#fff",
          // color: "#000",
          fontFamily: "var(--font-regular-Quicksand)",
          backgroundColor: `${page ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"
            }`,
          borderRadius: "999px",
          backdropFilter: "blur(6px)",
          "& .MuiSelect-select": {
            padding: "10px 16px",
          },
          ...(!borders && {
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
            boxShadow: "none",
          }),
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? "none" : "auto",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        IconComponent={props => (
          <img
            src={arrow}
            alt="arrow"
            onClick={handleIconClick}
            style={{
              width: "12px",
              marginRight: "0.5rem",
              cursor: disabled ? "not-allowed" : "pointer",
              filter: "brightness(0) invert(1) opacity(0.7)",
            }}
          />
        )}
        renderValue={selected => {
          if (!selected) {
            return (
              <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{title}</span>
            )
          }
          const selectedOption = data.find(opt => opt.value === selected)
          return selectedOption ? selectedOption.label : selected
        }}
      >
        <MenuItem value="">
          <span style={{ color: "#fff", fontFamily: "Quicksand, sans-serif" }}>{title}</span>
        </MenuItem>
        {data.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ color: "#000 !important" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default Slecter
