import React, { useEffect, useState } from "react"
import styles from "./ViewRequest.module.css"
import dwonload from "../../../assets/image/svg/dwonload.svg"
import Rate from "../../../assets/image/svg/review star(filled).svg"
import close_icon from "../../../assets/image/svg/close(without fill).svg"
import cardIcon from "../../../assets/image/svg/card(payment).svg"
// import unboxing from "../../../assets/image/png/unboxing video.png"
import OrderTrackingStepper from "../../../components/OrderTrackingStepper/OrderTrackingStepper"
import { useLocation, useNavigate } from "react-router-dom"
import useApiHttp from "../../../hooks/ues-http"
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { addCart, countApi } from "../../../services/storeSlice/addCart"
import CustomRadio from "../../../components/UI/CustomRadio/CustomRadio"
import BoostrapDialog from "../../../components/UI/Dialog/BoostrapDialog"
import MuiAlert from "@mui/material/Alert"
import { Snackbar } from "@mui/material"
import FileUploadComponent from "../../../components/UI/FileUploadComponent/FileUploadComponent"
import VideoUploadComponent from "../../../components/UI/FileUploadComponent/VideoUploadComponent"
import CustomDialog from "../../../components/UI/Dialog/Dialog"
import CustomCarouselStory from "../../../components/Page/PersonalizeStory/Carousel/CarouselSingle"
import CustomButton from "../../../components/UI/Button/Button"
import styled from "styled-components"
import testImage from "../../../assets/image/png/feedback_box.png"
import { get } from "lodash"
import FileViewerLightbox from "../../../components/UI/PdfView/Lightbox/LightboxImgPdf"

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      sx={{ color: "red" }}
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  )
})

const StatusWidgetLable = styled.div.attrs(props => ({
  className: props.class,
}))`
  display: inline-block;
  margin-bottom: 10px;
  height: 24px;
  font-family: var(--font-bold);
  line-height: 14px;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 15px;

  &.in_progress {
    background: linear-gradient(
      to right,
      rgba(255, 204, 101, 1),
      rgba(152, 99, 7, 1)
    );
  }

  &.new {
    background: linear-gradient(
      to right,
      rgba(102, 229, 255, 1),
      rgba(61, 138, 153, 1)
    );
  }

  &.resolved {
    background: linear-gradient(
      to right,
      rgba(53, 221, 151, 1),
      rgba(29, 119, 81, 1)
    );
  }

  &.rejected {
    background: linear-gradient(
      to right,
      rgba(255, 101, 103, 1),
      rgba(152, 7, 7, 1)
    );
  }
`
const ViewRequest = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [showRating, setShowRating] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { requestItem } = location.state || {}
  const [requestData, setRequestData] = useState({})
  const [trackOrder, setTrackOrder] = useState([])
  const [selectedItemId, setSelectedItemId] = useState(null)

  const [openAdduser, setOpenAdduser] = useState(false)
  const [radioValue, setRadioValue] = useState(0) // 0 = unchecked, 1 = checked
  console.log("radioValue", radioValue)

  const [openAdduser2, setOpenAdduser2] = useState(false)
  const [data2, setData2] = useState({})

  const [aIMaskedfiles, setAiMaskedfiles] = useState(null)
  const [videoProductId, setVideoProductId] = useState(null)

  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const handleCloseDialog = () => setOpenAdduser2(false)
  const viewList = id => {
    sendRequest(
      {
        url: `user/order/book/preview`,
        method: "POST",
        body: {
          type: "my_orders", // summary, my_orders
          id: id, // order detail id
        },
      },
      data => {
        setData2(data?.data)

        setOpenAdduser2(true)
      }
    )
  }

  const handleOpenDialog = id => {
    viewList(id)
  }

  const listApiCAll = () => {
    sendRequest(
      {
        url: `user/service-request/view/${requestItem?.id}`,
      },
      data => {
        setRequestData(data?.data)
        const firstItemId = data?.data?.items?.[0]
        if (firstItemId) {
          setSelectedItemId(firstItemId)
        }
      }
    )
  }

  useEffect(() => {
    if (!requestItem?.id) {
      console.warn("No ID provided in this detail view")
      return
    }
    listApiCAll()
  }, [requestItem?.id])

  const getStatusLabel = status => {
    if (!status || typeof status !== "string") {
      return { text: "UNKNOWN", className: "status_lable unknown" }
    }

    switch (status.toLowerCase()) {
      case "received":
        return {
          text: "Received",
          className: "status_lable received",
        }
      case "confirmed":
        return {
          text: "Confirmed",
          className: "status_lable passed",
        }
      case "printed":
        return {
          text: "Printed",
          className: "status_lable printed",
        }
      case "shipped":
        return {
          text: "Shipped",
          className: "status_lable shipped",
        }
      case "delivered":
        return {
          text: "Delivered",
          className: "status_lable delivered",
        }
      case "cancelled":
        return {
          text: "Cancelled",
          className: "status_lable failed",
        }
      default:
        return { text: "UNKNOWN", className: "status_lable unknown" }
    }
  }

  const getStatusClass = status => {
    switch (status) {
      case "pending":
      case "new":
        return "new"

      case "in_progress":
      case "in progress":
        return "in_progress"

      case "resolved":
        return "resolved"

      case "rejected":
        return "rejected"

      default:
        return "new"
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate(-1)}>My Orders</span> &gt;{" "}
        <span onClick={() => navigate(-1)}>My Requests</span> &gt;{" "}
        <span
          className={styles.active}
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(210, 192, 0, 1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text", // For Firefox support
            color: "transparent",
          }}
        >
          {requestData?.request_number || "fejdfhvjh"}
        </span>
      </div>

      <div className={styles.successContainer}>
        {/* <div className={styles.header_set}> */}
        <div className={styles.header}>
          <h2
            style={{
              display: "inline-block",
              verticalAlign: "sub",
              marginRight: "10px",
            }}
          >
            {requestData?.request_number || "number"}
          </h2>
          <StatusWidgetLable className={getStatusClass(requestData?.status)}>
            {requestData?.status === "in progress" ||
              (requestData?.status === "in_progress" && "In Progress")}
            {requestData?.status === "new" ||
              (requestData?.status === "pending" && "New Ticket")}
            {requestData?.status === "rejected" && "Rejected"}
            {requestData?.status === "resolved" && "Resolved"}
          </StatusWidgetLable>

          <p className={styles.label_1}>
            Request placed on {requestData?.created_at || "date"}
          </p>
        </div>
        {/* <button
          className={styles.textButton}
          onClick={() => onDownloadItemClick(requestData?.id)}
        >
          <img src={dwonload} alt="dwonload" />
          Download Invoice
        </button> */}
        {/* </div> */}

        <div className={styles.infoGrid} style={{ marginTop: "40px" }}>
          <div>
            <p className={styles.details_modal_field}>Order ID</p>
            <p className={styles.details_modal_values}>
              {requestData?.order_number}
            </p>
          </div>
          <div>
            <p className={styles.details_modal_field}>Category</p>
            <p className={styles.details_modal_values}>
              {requestData?.service_request_type}
            </p>
          </div>

          <div className={styles.full_span}>
            <p className={styles.details_modal_field}>Detailed Description</p>
            <p className={styles.details_modal_values}>
              {requestData?.description || "No description provided."}
            </p>
          </div>
          <div className={styles.full_span}>
            <p className={styles.details_modal_field}>Attachments</p>
            {requestData?.uploads?.length > 0 ? (
              <div className={styles.attachments}>
                {requestData?.uploads.map((item, index) => (
                  <>
                    <FileViewerLightbox
                      fileUrl={item}
                      customComp={
                        <img
                          src={item}
                          style={{
                            marginRight: "15px",
                            height: "150px",
                            width: "150px",
                          }}
                        />
                      }
                    />
                  </>
                ))}
              </div>
            ) : (
              "No attachments provided."
            )}
          </div>

          {requestData?.comment && (
            <div>
              <p className={styles.details_modal_field}>Comment</p>
              <p className={styles.details_modal_values}>
                {requestData?.comment}
              </p>
            </div>
          )}
        </div>
        {/* <CustomButton
          variant="contained"
          customColor="#131313"
          custmstyle={{
            // padding: "10px 15px",
            position: "relative",
            background: `
      linear-gradient(180deg, #fff47a 0%, #ffd500 50%, #f2c200 100%),
      radial-gradient(ellipse at center bottom, #fff 15%, transparent 60%)
    `,
            backgroundBlendMode: "screen",
            color: "#1a1a1a",
            fontWeight: 600,
            fontSize: "16px",
            border: "none",
            borderRadius: "24px",
            padding: "8px 24px",
            width: "140px",
            height: "40px",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
          }}
        // onClick={() => setOpenRequestModal(true)}
        >
          chat now
        </CustomButton> */}
      </div>
    </div>
  )
}

export default ViewRequest
