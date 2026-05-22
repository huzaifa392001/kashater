import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  palette: {
    primary: {
      // main: "#ffffffff",
      main: "#212121"
    },
    error: {
      main: "#ee4747",
    },
  },
  text: {
    // color: "#212121",
    color: "#ffffffff",
  },
  typography: {
    fontFamily: "var(--font-regular),sans-serif",

    h1: {
      fontFamily: "var(--font-Medium),sans-serif",
      fontSize: 34,
      fontWeight: "var(--fwt-heavy)",
      textTransform: "capitalize",
    },
    h2: {
      fontFamily: "var(--font-bold),sans-serif",
      fontSize: 28,
      fontWeight: "var(--fwt-bold)",
      textTransform: "capitalize",
    },
    h3: {
      fontFamily: "var(--font-bold),sans-serif",
      fontSize: 24,
      fontWeight: "var(--fwt-bold)",
      textTransform: "capitalize",
    },
    h4: {
      fontFamily: "var(--font-bold),sans-serif",
      fontSize: 20,
      fontWeight: "var(--fwt-semi-bold)",
      textTransform: "capitalize",
    },
    h5: {
      fontFamily: "var(--font-bold),sans-serif",
      fontSize: 16,
      fontWeight: "var(--fwt-semi-bold)",
      textTransform: "capitalize",
    },
    h6: {
      fontFamily: "var(--ffy-semi-bold), sans-serif",
      fontSize: 16,
      fontWeight: "var(--fwt-medium)",
      textTransform: "capitalize",
    },
    subtitle1: {
      fontFamily: "var(--font-regular) ,sans-serif",
      fontSize: 16,
      color: "var(--clr-grey)",
      textTransform: "capitalize",
      lineHeight: 1.2,
    },
    subtitle2: {
      fontFamily: "var(--font-regular) ,sans-serif",
      fontSize: 14,
      color: "var(--clr-grey-200)",
      textTransform: "capitalize",
      lineHeight: 1.2,
    },
    p1: {
      fontFamily: "var(--font-regular) ,sans-serif",
      fontSize: 16,
      color: "var(--clr-grey)",
      display: "block",
    },
    p2: {
      fontFamily: ["var(--font-regular)", "sans-serif"].join(","),
      fontSize: 14,
      display: "block",
    },
    caption: {
      display: "block",
      fontFamily: ["var(--font-regular)", "sans-serif"].join(","),
      fontSize: 12,
      color: "var(--clr-grey-400)",
      marginLeft: 0,
      lineHeight: 1,
    },
    button: {
      fontFamily: "var(--ffy-semi-bold), sans-serif",
      fontSize: 14,
      fontWeight: "var(--fwt-semi-bold)",
      color: "var(--clr-black-100)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          padding: "10px 24px",
          textTransform: "capitalize",
          fontWeight: "normal",
        },
        contained: {
          // color: "#fff", 
          color: "#212121",
        },
        outlined: {
          color: "var(--clr-green)",
          border: "2px solid var(--clr-green)",
          ":hover": {
            border: "2px solid var(--clr-green)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 12,
          borderRadius: "4px",
          fontFamily: "var(--font-regular)",
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          fontSize: "12px !important",
          color: "var(--clr-red-300) !important",
          textTransform: "lowercase",
          textAlign: "left !important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "50px",
          fontSize: "var(--fsz-medium)",
        },
        input: {
          "::placeholder": {
            color: "clr-grey",
          },
        },
        notchedOutline: {
          borderColor: "var(--clr-ash-200)",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          marginLeft: 0,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiAutocomplete-inputRoot": {
            height: "auto",
            marginBottom: "10px",
            paddingBottom: "4px",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 15,
          color: "var(--clr-grey-400)",
        },
        "&.Mui-focused": {
          fontSize: 12,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontFamily: "var(--font-regular),sans-serif",
          fontSize: 14,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "var(--clr-ash-400)",
        },
      },
    },
  },
});
