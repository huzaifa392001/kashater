import { Button, Stack, TextField } from "@mui/material"

const Qty = props => {
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        <TextField
          {...props}
          sx={{
            "& .MuiOutlinedInput-root": {
              width: "76px",
              height: "44px",
              borderRadius: "4px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D4D4D4",
              },
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
          }}
        />
        <button
          style={{
            backgroundColor: "#EEEEEE",
            color: "#68686A",
            // borderRadius: "0px",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            border: "1px solid #D4D4D4",
            borderLeft: "none",
            textTransform: "lowercase",
            width: "35px",
          }}
        >
          pcs
        </button>
      </Stack>
    </>
  )
}
export default Qty
