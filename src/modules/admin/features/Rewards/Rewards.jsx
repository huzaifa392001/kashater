// import React, { useEffect, useState } from "react"
// import classes from "./Rewards.module.css"
// import CustomButton from "../../components/UI/Button/Button"
// import useApiHttp from "../../hooks/ues-http"
// import { toast } from "react-toastify"

// const Rewards = () => {
//   const [data, setData] = useState([])
//   const [conversionRate, setConversionRate] = useState("")
//   const [conversionRateAmount, setConversionRateAmount] = useState("")
//   const [minPoints, setMinPoints] = useState("")
//   const [maxPoints, setMaxPoints] = useState("")

//   const {
//     isLoading: sendLoading,
//     success: sendSuccess,
//     error: sendError,
//     sendRequest: sendRequest,
//   } = useApiHttp()
//   const {
//     isLoading: updateLoading,
//     success: updateSuccess,
//     error: updateError,
//     sendRequest: updateRequest,
//   } = useApiHttp()

//   const viewList = () => {
//     sendRequest(
//       {
//         url: `admin/finance-management/config-point/view`,
//       },
//       data => {
//         setData(data?.data)
//         setConversionRate(data?.data?.points)
//         setConversionRateAmount(data?.data?.amount)
//         setMinPoints(data?.data?.min_point)
//         setMaxPoints(data?.data?.max_point_per_order)
//       }
//     )
//   }

//   useEffect(() => {
//     viewList()
//   }, [])

//   const handleSave = () => {
//     // Validation checks
//     const errors = []

//     if (isNaN(conversionRate) || conversionRate <= 0) {
//       errors.push("Conversion Rate Points must be a positive number")
//     }

//     if (isNaN(conversionRateAmount) || conversionRateAmount <= 0) {
//       errors.push("Conversion Rate Amount must be a positive number")
//     }

//     if (isNaN(minPoints) || minPoints < 0) {
//       errors.push("Minimum Points must be a non-negative number")
//     }

//     if (isNaN(maxPoints) || maxPoints < 0) {
//       errors.push("Maximum Points must be a non-negative number")
//     }

//     if (maxPoints < minPoints) {
//       errors.push(
//         "Maximum Points must be greater than or equal to Minimum Points"
//       )
//     }

//     if (errors.length > 0) {
//       toast.error(errors.join("\n"))
//       return
//     }

//     // Proceed with API call if validation passes
//     updateRequest(
//       {
//         url: `admin/finance-management/config-point/update`,
//         method: "PUT",
//         body: {
//           points: conversionRate,
//           amount: conversionRateAmount,
//           min_point: minPoints,
//           max_point_per_order: maxPoints,
//         },
//       },
//       data => {
//         // Optional: Show success message
//         if (!sendError && sendSuccess) {
//           viewList()
//         }
//       }
//     )
//   }
//   useEffect(() => {
//     if (updateSuccess !== "") {
//       toast.success(updateSuccess, {})
//     }
//     if (updateError !== "") {
//       toast.error(updateError, {})
//     }
//   }, [updateSuccess, updateError])
//   return (
//     <div>
//       <div className={classes.header_table}>
//         <h3>Configure Rewards</h3>
//       </div>

//       <div className={classes.configContainer}>
//         <h2 className={classes.main_page_header}>
//           Configure the Reward Points
//         </h2>

//         <div className={classes.conversionRate_section}>
//           <div className={classes.con_section_set}>
//             <h3 className={classes.sectionTitle}>Conversion Rate</h3>
//             <p>(Number of Points = Cash Discount)</p>
//           </div>

//           <div className={classes.conversionRate}>
//             <div className={classes.pointsInput}>
//               <input
//                 type="number"
//                 min="1"
//                 value={conversionRate}
//                 onChange={e => setConversionRate(Number(e.target.value))}
//                 className={classes.inputField}
//               />
//               <span className={classes.pointsText}>Points</span>
//             </div>
//             <div className={classes.pointsInput}>
//               <span className={classes.pointsText}>₹</span>
//               <input
//                 type="number"
//                 min="1"
//                 step="0.01"
//                 value={conversionRateAmount}
//                 onChange={e => setConversionRateAmount(Number(e.target.value))}
//                 className={classes.inputField}
//               />
//             </div>
//           </div>
//         </div>

//         <div className={classes.section}>
//           <div className={classes.pointsRow}>
//             <label className={classes.pointsLabel}>
//               Minimum Points for Redemption
//             </label>
//             <div className={classes.pointsInput}>
//               <input
//                 type="number"
//                 min="1"
//                 value={minPoints}
//                 onChange={e => setMinPoints(Number(e.target.value))}
//                 className={classes.inputField}
//               />
//               <span className={classes.pointsText}>Points</span>
//             </div>
//           </div>

//           <div className={classes.pointsRow}>
//             <label className={classes.pointsLabel}>
//               Maximum Points for Redemption Limit Per Order
//             </label>
//             <div className={classes.pointsInput}>
//               <input
//                 type="number"
//                 min="1"
//                 value={maxPoints}
//                 onChange={e => setMaxPoints(Number(e.target.value))}
//                 className={classes.inputField}
//               />
//               <span className={classes.pointsText}>Points</span>
//             </div>
//           </div>
//         </div>

//         <div className={classes.footr}>
//           <CustomButton
//             variant="contained"
//             customColor="#000000"
//             customBgColor="#F3C11D"
//             custmstyle={{
//               padding: "10px 5px",
//               width: "150px",
//               fontSize: "13px",
//             }}
//             onClick={handleSave}
//             disabled={updateLoading}
//           >
//             {updateLoading ? "Updating..." : "Update Changes"}
//           </CustomButton>
//           {sendError && <p className={classes.error}>Error: {sendError}</p>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Rewards

import React, { useEffect, useState } from "react"
import classes from "./Rewards.module.css"
import CustomButton from "../../components/UI/Button/Button"
import useApiHttp from "../../hooks/ues-http"
import toast from "react-hot-toast"

const Rewards = () => {
  const [initialData, setInitialData] = useState(null)
  const [conversionRate, setConversionRate] = useState("")
  const [conversionRateAmount, setConversionRateAmount] = useState("")
  const [minPoints, setMinPoints] = useState("")
  const [maxPoints, setMaxPoints] = useState("")
  const [hasChanges, setHasChanges] = useState(false) // New state to track changes

  const { isLoading, sendRequest } = useApiHttp()
  const {
    isLoading: updateLoading,
    error: updateError,
    sendRequest: updateRequest,
  } = useApiHttp()

  const viewList = () => {
    sendRequest({ url: `admin/finance-management/config-point/view` }, data => {
      const config = data?.data || {}
      setInitialData(config)
      setConversionRate(config.points?.toString() || "")
      setConversionRateAmount(config.amount?.toString() || "")
      setMinPoints(config.min_point?.toString() || "")
      setMaxPoints(config.max_point_per_order?.toString() || "")
      setHasChanges(false) // Reset changes when we get new data
    })
  }

  useEffect(() => {
    viewList()
  }, [])

  // Check for changes whenever any input changes
  useEffect(() => {
    if (!initialData) return

    const changesDetected =
      conversionRate !== (initialData.points?.toString() || "") ||
      conversionRateAmount !== (initialData.amount?.toString() || "") ||
      minPoints !== (initialData.min_point?.toString() || "") ||
      maxPoints !== (initialData.max_point_per_order?.toString() || "")

    setHasChanges(changesDetected)
  }, [conversionRate, conversionRateAmount, minPoints, maxPoints, initialData])

  const handleInputChange = setter => e => {
    const value = e.target.value
    if (value === "" || /^[1-9]\d*$/.test(value) || value === "0") {
      setter(value.replace(/^0+/, "") || "")
    }
  }

  const handleMinPointsChange = e => {
    const value = e.target.value
    if (value === "" || parseInt(value) > 0) {
      setMinPoints(value.replace(/^0+/, "") || "")
    }
  }

  const handleSave = () => {
    // Only proceed if there are actual changes
    if (!hasChanges) {
      toast.info("No changes to update")
      return
    }

    const points = parseInt(conversionRate)
    const amount = parseFloat(conversionRateAmount)
    const min = parseInt(minPoints)
    const max = parseInt(maxPoints)

    // Validation logic remains the same
    const errors = []
    if (isNaN(points) || points < 1)
      errors.push("Conversion Rate Points must be at least 1")
    if (isNaN(amount) || amount < 1)
      errors.push("Conversion Rate Amount must be at least ₹1")
    if (isNaN(min) || min < 1) errors.push("Minimum Points must be at least 1")
    if (isNaN(max) || max < 0)
      errors.push("Maximum Points must be a non-negative number")
    if (max < min) errors.push("Maximum Points must be ≥ Minimum Points")

    if (errors.length > 0) {
      toast.error(errors.join("\n"))
      return
    }

    updateRequest(
      {
        url: `admin/finance-management/config-point/update`,
        method: "PUT",
        body: { points, amount, min_point: min, max_point_per_order: max },
      },
      () => {
        toast.success("Reward config has been updated")
        viewList() // Refresh data after update
      }
    )
  }

  useEffect(() => {
    if (updateError) toast.error(updateError)
  }, [updateError])

  return (
    <div>
      <div className={classes.header_table}>
        <h3>Configure Rewards</h3>
      </div>

      <div className={classes.configContainer}>
        <h2 className={classes.main_page_header}>
          Configure the Reward Points
        </h2>

        <div className={classes.conversionRate_section}>
          <div className={classes.con_section_set}>
            <h3 className={classes.sectionTitle}>Conversion Rate</h3>
            <p>(Number of Points = Cash Discount)</p>
          </div>

          <div className={classes.conversionRate}>
            <div className={classes.pointsInput}>
              <input
                type="number"
                min="1"
                value={conversionRate}
                onChange={handleInputChange(setConversionRate)}
                className={classes.inputField}
              />
              <span className={classes.pointsText}>Points</span>
            </div>
            <div className={classes.pointsInput}>
              <span className={classes.pointsText}>₹</span>
              <input
                type="number"
                min="1"
                step="0.01"
                value={conversionRateAmount}
                onChange={handleInputChange(setConversionRateAmount)}
                className={classes.inputField}
              />
            </div>
          </div>
        </div>

        <div className={classes.section}>
          <div className={classes.pointsRow}>
            <label className={classes.pointsLabel}>
              Minimum Points for Redemption
            </label>
            <div className={classes.pointsInput}>
              <input
                type="number"
                min="1"
                value={minPoints}
                onChange={handleMinPointsChange}
                className={classes.inputField}
              />
              <span className={classes.pointsText}>Points</span>
            </div>
          </div>

          <div className={classes.pointsRow}>
            <label className={classes.pointsLabel}>
              Maximum Points for Redemption Limit Per Order
            </label>
            <div className={classes.pointsInput}>
              <input
                type="number"
                min="0"
                value={maxPoints}
                onChange={handleInputChange(setMaxPoints)}
                className={classes.inputField}
              />
              <span className={classes.pointsText}>Points</span>
            </div>
          </div>
        </div>

        <div className={classes.footr}>
          <CustomButton
            variant="contained"
            customColor="#000000"
            customBgColor="#F3C11D"
            custmstyle={{
              padding: "10px 5px",
              width: "150px",
              fontSize: "13px",
            }}
            onClick={handleSave}
            disabled={updateLoading || !hasChanges || !initialData}
          >
            {updateLoading ? "Updating..." : "Update Changes"}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default Rewards
