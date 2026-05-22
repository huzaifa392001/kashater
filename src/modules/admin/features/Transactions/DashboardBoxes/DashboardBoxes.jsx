import React from "react"
import classes from "./Dashboard.module.css"
import imag1 from "../../../assets/image/svg/revenue.svg"
import imag2 from "../../../assets/image/svg/transaction.svg"
import imag3 from "../../../assets/image/svg/refund.svg"
const DashboardBoxes = ({ data }) => {
  const metrics = [
    {
      key: "processed",
      title: "Total Revenue",
      count: data?.total_revenue?.total_count || 0,
      percent: data?.total_revenue?.precent || 0,
      type: data?.total_revenue?.type || "increased",
      img: imag1,
    },
    {
      key: "passed",
      title: "Total Transactions",
      count: data?.total_transaction?.total_count || 0,
      percent: data?.total_transaction?.precent || 0,
      type: data?.total_transaction?.type || "increased",
      img: imag2,
    },
    {
      key: "failed",
      title: "Refunds Processed",
      count: data?.total_refund?.total_count || 0,
      percent: data?.total_refund?.precent || 0,
      type: data?.total_refund?.type || "increased",
      img: imag3,
    },
  ]

  const ArrowIcon = ({ direction }) => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke={direction === "up" ? "#4CAF50" : "#F44336"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "up" ? (
        <path d="M12 19V6M5 14l7-7 7 7" />
      ) : (
        <path d="M12 5v13M5 12l7 7 7-7" />
      )}
    </svg>
  )

  return (
    <div className={classes.dashboardContainer}>
      {metrics.map((metric, index) => (
        <div key={index} className={classes.metricBox}>
          <div className={classes.metricHeader}>
            <div className={`box_img ${metric.key}`}>
              <img src={metric.img} alt="img" />
            </div>

            <h3 className={classes.metricTitle}>{metric.title}</h3>
          </div>
          <div className={classes.metricCount}>
            <p className={classes.totalCount}>{metric.count}</p>
          </div>
          <div className={classes.metricContent}>
            <div className={classes.percentContainer}>
              <span
                className={`${classes.percentValue} ${
                  metric.type === "increased" ? classes.green : classes.red
                }`}
              >
                {metric.percent}%
                <ArrowIcon
                  direction={metric.type === "increased" ? "up" : "down"}
                />
              </span>
            </div>
            <div className={classes.comparisonText}>
              {metric.type === "increased" ? "Greater than" : "Less than"} Last
              Month
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardBoxes
