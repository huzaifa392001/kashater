import { styled, TextField } from "@mui/material"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

const StyledDatePicker = styled(DatePicker)({})

const FromToDatePicker = props => {
  const { borders = true } = props
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DatePicker"]}
        sx={{
          overflow: "hidden !important",
        }}
      >
        <StyledDatePicker
          {...props}
          slotProps={{
            textField: {
              onBlur: props.onBlur || null,
              error: props.error,
              helperText: props.error ? props.helperText : null,
              sx: {
                width: props?.width || "150px", // Custom width of DatePicker
                minWidth: "150px !important", // Force minimum width
                "& .MuiFormControl-root": {
                  minWidth: "150px !important", // Override minWidth
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  height: props?.height || "40px", // Custom height of DatePicker
                },
                "& .MuiPickersInputBase-sectionsContainer": {
                  padding: "10px 0px",
                },
                "& .MuiStack-root": {
                  overflow: "hidden !important", // Force override with !important
                },
                "& .MuiInputLabel-root": {
                  // paddingBottom: "8px",
                  // border: "1px solid black",
                  // transform: "translate(14px, 12px) scale(1)",
                  // transition: "all 0.3s ease",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  transform: "translate(14px, -6px) scale(0.75)",
                },
                "& .MuiInputLabel-root.MuiFormLabel-filled": {
                  transform: "translate(14px, -6px) scale(0.75)",
                },
                "& .MuiOutlinedInput-input": {
                  paddingTop: "12px",
                  paddingBottom: "8px",
                },
                "& .MuiInputAdornment-root": {
                  marginLeft: "4px",
                },
                ...(!borders
                  ? {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove border
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove border when focused
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove border on hover
                    },
                    boxShadow: "none", // Remove box-shadow
                  }
                  : {}),
              },

              inputProps: {
                readOnly: true, // Prevent manual typing
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default FromToDatePicker
