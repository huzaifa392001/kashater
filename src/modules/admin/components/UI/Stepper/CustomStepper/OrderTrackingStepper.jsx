import React from "react"
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  styled,
  Typography,
} from "@mui/material"
import Check from "@mui/icons-material/Check"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  marginLeft: 9,
  "&.MuiStepConnector-vertical": {
    padding: 0,
    margin: 0,
  },
  "& .MuiStepConnector-line": {
    minHeight: 30,
    borderLeftWidth: 2,
    borderColor: "#ccc",
  },
}))

const StepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: ownerState.active || ownerState.completed ? "#23A868" : "#ccc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: "50%",
}))

function StepIconComponent(props) {
  const { active, completed } = props

  return (
    <StepIconRoot ownerState={{ active, completed }}>
      {completed ? (
        <Check fontSize="small" style={{ color: "white" }} />
      ) : (
        <RadioButtonUncheckedIcon fontSize="small" />
      )}
    </StepIconRoot>
  )
}

const OrderTrackingStepperMUI = ({ trackingData = [] }) => {
  return (
    <div
      style={{
        maxWidth: 450,
        background: "#fff",
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 10,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Order Tracking Details
      </Typography>

      <Stepper orientation="vertical" connector={<CustomConnector />} nonLinear>
        {trackingData.map((step, index) => (
          <Step key={step.status} active={step.completed}>
            <StepLabel
              StepIconComponent={StepIconComponent}
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1c1c1c",
                },
              }}
            >
              <div>
                Order {step.label}
                {step.completed_at && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#666", fontSize: 12, mt: 0.5 }}
                  >
                    {step.comment
                      ? `${step.comment} on ${step.completed_at}`
                      : `Order ${step.label.toLowerCase()} on ${
                          step.completed_at
                        }`}
                  </Typography>
                )}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default OrderTrackingStepperMUI
