import { styled, TextField } from "@mui/material"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

const StyledDatePicker = styled(DatePicker)({})

const CustomDatePicker = props => {
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
                width: "150px", // Custom width of DatePicker
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  height: "40px", // Custom height of DatePicker
                },
                "& .MuiInputLabel-root": {
                  paddingBottom: "8px",
                  border: "1px solid black",
                },
                "& .MuiInputLabel-root": {
                  transform: "translate(14px, 12px) scale(1)",
                  transition: "all 0.3s ease",
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
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default CustomDatePicker
