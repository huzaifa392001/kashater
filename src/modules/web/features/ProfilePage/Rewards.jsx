import React, { useEffect, useState } from "react"
import styles from "./Rewards.module.css"
import testimonialIcon from "../../../web/assets/image/png/img33.png" // Update with the correct path to your image
import MinHeightTextarea from "../../components/UI/TextArea/Textarea"
import CustomRadio from "../../components/UI/CustomRadio/CustomRadio"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"

const Rewards = () => {
  const [data, setData] = useState([])
  console.log("data", data)

  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()
  useEffect(() => {
    sendRequest(
      {
        url: `user/profile/reward-point`,
      },
      data => {
        setData(data?.data)
      }
    )
  }, [])

  return (
    // <div className={styles.section}>
    //   <h2 className={styles.sectionTitle}>My Rewards</h2>

    //   <>
    //     <div
    //       style={{
    //         border: "1px solid #E3C417",
    //         borderRadius: "5px",
    //         marginTop: "20px",
    //         marginBottom: "20px",
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           padding: "10px 20px",
    //           gap: "10px",
    //           backgroundColor: "#FBEC991A",
    //           flexWrap: "wrap",
    //         }}
    //       >
    //         <img className={styles.imgset} alt="icon" src={testimonialIcon} />
    //         <div className={styles.text_set}>
    //           <h2>{data?.points}</h2>
    //           <p
    //             style={{
    //               fontFamily: "Merriweather",
    //               fontSize: "16px",
    //               fontWeight: "400",
    //             }}
    //           >
    //             Your redeem points, you can use it in your next order!
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       style={{
    //         marginBottom: "20px",
    //       }}
    //     >
    //       <p
    //         style={{
    //           fontFamily: "Merriweather",
    //           fontWeight: "700",
    //           fontSize: "16px",
    //           lineHeight: "100%",
    //           letterSpacing: "0%",
    //         }}
    //       >
    //         Recent Transactions
    //       </p>
    //       <div className={styles.main_Table}>
    //         <div className={styles.productTable}>
    //           <div className={styles.tableHeader}>
    //             <span>Description</span>
    //             <span>Type</span>
    //             <span>Points</span>
    //             <span>Date/Time</span>
    //           </div>

    //           {data?.recent_transactions?.map((product, index) => (
    //             <div className={styles.productRow} key={index}>
    //               <span>{product.description}</span>
    //               <span>{product.type}</span>
    //               <span>{product.points}</span>
    //               <span>{product.date}</span>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // </div>
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>My Rewards</h2>

      <div className={styles.rewardsContainer}>
        <div className={styles.rewardsBox}>
          <img className={styles.imgset} alt="icon" src={testimonialIcon} />
          <div className={styles.text_set}>
            <h2>{data?.points}</h2>
            <p className={styles.rewardText}>
              Your redeem points, you can use it in your next order!
            </p>
          </div>
        </div>
      </div>

      <div className={styles.transactionsWrapper}>
        <p className={styles.transactionsTitle}>Recent Transactions</p>
        <div className={styles.main_Table}>
          <div className={styles.productTable}>
            <div className={styles.tableHeader}>
              <span>Description</span>
              <span>Type</span>
              <span>Points</span>
              <span>Date/Time</span>
            </div>

            {data?.recent_transactions?.map((product, index) => (
              <div className={styles.productRow} key={index}>
                <span>{product.description}</span>
                <span>{product.type}</span>
                <span>{product.points}</span>
                <span>{product.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rewards
