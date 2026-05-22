import React from "react"
import classes from "./OrderTrackingStepper.module.css"
import CheckIcon from "@mui/icons-material/Check"
// Custom Check Icon Component
// const CheckIcon = () => (
//   <svg
//     className={classes.checkIcon}
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     width="18"
//     height="18"
//   >
//     <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
//   </svg>
// )

const OrderTrackingStepper = ({ statusTracking }) => {
  return (
    <div className={classes.statusStepper}>
      {statusTracking?.map((step, index) => {
        const isCompleted = step.completed
        const isLast = index === statusTracking.length - 1
        const currentStatus = "received" // Replace with actual current status from props
        const isCurrent = step.status === currentStatus

        return (
          <div key={step.status} className={classes.stepperItem}>
            <div className={classes.stepperLeft}>
              <div
                className={`${classes.stepIcon} ${
                  isCompleted ? classes.completed : ""
                } ${isCurrent ? classes.current : ""}`}
              >
                {isCompleted ? (
                  <CheckIcon
                    className={classes.checkIcon}
                    sx={{ width: "12px", height: "12px" }}
                  />
                ) : (
                  <span className={classes.stepNumber}></span>
                )}
              </div>
              {!isLast && (
                <div
                  className={`${classes.verticalLine} ${
                    isCompleted ? classes.lineActive : ""
                  }`}
                />
              )}
            </div>

            <div className={classes.stepperRight}>
              <div className={classes.statusHeader}>
                <h3 className={classes.statusTitle}>{step.label}</h3>
                {isCompleted && step.completed_at && (
                  <>
                    <span className={classes.statusDate}>
                      {step.completed_lable}
                    </span>
                    <span className={classes.statusDate}>
                      {step.completed_at}
                    </span>
                  </>
                )}
              </div>

              {isCurrent && !isCompleted && (
                <div className={classes.currentStatus}>
                  {/* <span className={classes.statusBadge}>In Progress</span> */}
                </div>
              )}

              {step.comment && (
                <p className={classes.statusComment}>{step.comment}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OrderTrackingStepper
