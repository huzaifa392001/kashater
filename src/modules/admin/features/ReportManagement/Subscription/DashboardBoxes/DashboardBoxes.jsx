import React from "react"
import classes from "./Dashboard.module.css"
import imag1 from "../../../../assets/image/png/total_sub_card_icon.png"
import imag2 from "../../../../assets/image/png/active_sub_card_icon.png"
import imag3 from "../../../../assets/image/png/inactive_sub_card_icon.png"
import imag4 from "../../../../assets/image/png/expiring_sub_card_icon.png"
import subscriptionUpTrend from '../../../../assets/image/png/up_trend_subscription.png'
import subscriptionDownTrend from '../../../../assets/image/png/down_trend_subscription.png'

const DashboardBoxes = ({ data }) => {
  const metrics = [
    {
      key: "processed",
      title: "Total Subscriptions",
      count: data?.total_subscription?.total_count || 0,
      percent: data?.total_subscription?.percent || 0,
      type: data?.total_subscription?.type || "increased",
      img: imag1,
    },
    {
      key: "passed",
      title: "Active Subscriptions",
      count: data?.active_subscription?.total_count || 0,
      percent: data?.active_subscription?.percent || 0,
      type: data?.active_subscription?.type || "increased",
      img: imag2,
    },
    {
      key: "failed",
      title: "Inactive Subscriptions",
      count: data?.inactive_subscription?.total_count || 0,
      percent: data?.inactive_subscription?.percent || 0,
      type: data?.inactive_subscription?.type || "increased",
      img: imag3,
    },
    {
      key: "failed",
      title: "Expiring in 30 Days",
      count: data?.expiry_subscription?.total_count || 0,
      percent: data?.expiry_subscription?.percent || 0,
      type: data?.expiry_subscription?.type || "increased",
      img: imag4,
    },
  ]

  const ArrowIcon = ({ direction }) => (
    <>
      {direction === "up" ? (
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path transform="rotate(180 4 3)" d="M0.317969 1.32891L0.360156 1.37813L3.54766 5.04609C3.65547 5.17031 3.81719 5.24766 3.99766 5.24766C4.17812 5.24766 4.33984 5.16797 4.44766 5.04609L7.63281 1.38516L7.68672 1.32422C7.72656 1.26562 7.75 1.19531 7.75 1.12031C7.75 0.916406 7.57656 0.75 7.36094 0.75H0.639062C0.423437 0.75 0.25 0.916406 0.25 1.12031C0.25 1.19766 0.275781 1.27031 0.317969 1.32891Z" fill="rgba(0, 153, 81, 1)" />
        </svg>
      ) : (
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.317969 1.32891L0.360156 1.37813L3.54766 5.04609C3.65547 5.17031 3.81719 5.24766 3.99766 5.24766C4.17812 5.24766 4.33984 5.16797 4.44766 5.04609L7.63281 1.38516L7.68672 1.32422C7.72656 1.26562 7.75 1.19531 7.75 1.12031C7.75 0.916406 7.57656 0.75 7.36094 0.75H0.639062C0.423437 0.75 0.25 0.916406 0.25 1.12031C0.25 1.19766 0.275781 1.27031 0.317969 1.32891Z" fill="#EC221F" />
        </svg>)}
    </>
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
            <div className={classes.metricRating}>
              <div className={classes.percentContainer}>
                <span
                  className={`${classes.percentValue} ${metric.type === "increased" ? classes.green : classes.red
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


            <img src={metric.type === "increased" ? subscriptionUpTrend : subscriptionDownTrend} />


          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardBoxes
