import * as React from "react"
import PropTypes from "prop-types"
import { styled } from "@mui/material/styles"
import Stack from "@mui/material/Stack"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Check from "@mui/icons-material/Check"
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector"
import {
  fetchList,
  setSteperVlue,
} from "../../../services/storeSlice/shopNowSlice"
import { useDispatch } from "react-redux"
import { resetTimer } from "../../../services/storeSlice/timerSlice"

// Custom Connector Component
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 12,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "var(--primary-blue)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "var(--primary-blue)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    borderStyle: "dashed", // Dashed line style
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...(theme.palette.mode === "dark" && {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}))

// Custom Step Icon Component
const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    ownerState?.completed || ownerState?.active
      ? "var(--primary-blue)"
      : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 23, // Icon size set to 12px
  height: 23, // Icon size set to 12px
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 12, // Ensure the font size matches the icon size
  ...(theme.palette.mode === "dark" && {
    backgroundColor:
      ownerState?.completed || ownerState?.active
        ? "var(--primary-blue)"
        : theme.palette.grey[700],
  }),
}))

// Custom Step Label styling
const CustomStepLabel = styled(StepLabel)(({ theme, ownerState }) => ({
  color:
    ownerState.completed || ownerState.active ? "var(--primary-blue)" : "#ccc",
  fontSize: 12, // Font size for step label
  ...(theme.palette.mode === "dark" && {
    color:
      ownerState.completed || ownerState.active
        ? "var(--primary-blue)"
        : theme.palette.grey[700],
  }),
}))

// StepIcon Component
function CustomStepIcon(props) {
  const { active, completed, icon } = props

  const icons = {
    1: <Check fontSize="small" />, // Resize the Check icon
    2: <Check fontSize="small" />,
    3: <Check fontSize="small" />,
  }

  return (
    <CustomStepIconRoot ownerState={{ completed, active }}>
      {icons[String(icon)]}
    </CustomStepIconRoot>
  )
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
}

// Steps Component
export default function CustomizedStepper({ steps, activeStep }) {
  const dispatch = useDispatch()
  const item = localStorage.getItem("active")
  const changeStep = index => {
    if (item === "1") {
      if (index === 1) {
        dispatch(setSteperVlue(1))
      }
      if (index === 0) {
        dispatch(setSteperVlue(0))
        dispatch(fetchList())
        localStorage.removeItem("active")
      }
    } else {
      localStorage.removeItem("active")
    }
  }

  return (
    <Stack spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<CustomConnector />}
      >
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}

          if (activeStep === index) {
            labelProps.active = true
          }

          if (activeStep > index) {
            stepProps.completed = true
            labelProps.completed = true
          }

          return (
            <Step
              key={label}
              {...stepProps}
              onClick={() => changeStep(index)}
              sx={{ cursor: "pointer" }}
            >
              <CustomStepLabel
                ownerState={labelProps}
                StepIconComponent={CustomStepIcon}
              >
                {label}
              </CustomStepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Stack>
  )
}

CustomizedStepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number.isRequired,
}
