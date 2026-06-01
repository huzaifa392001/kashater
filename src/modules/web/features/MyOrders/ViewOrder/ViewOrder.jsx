import React, { useEffect, useState } from "react"
import styles from "./ViewOrder.module.css"
import dwonload from "../../../assets/image/svg/dwonload.svg"
import Rate from "../../../assets/image/svg/review star(filled).svg"
import close_icon from "../../../assets/image/svg/close(without fill).svg"
import cardIcon from "../../../assets/image/svg/card(payment).svg"
// import unboxing from "../../../assets/image/png/unboxing video.png"
import OrderTrackingStepper from "../../../components/OrderTrackingStepper/OrderTrackingStepper"
import { useLocation, useNavigate, useNavigationType } from "react-router-dom"
import useApiHttp from "../../../hooks/ues-http"
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { addCart, countApi } from "../../../services/storeSlice/addCart"
import CustomRadio from "../../../components/UI/CustomRadio/CustomRadio"
import BoostrapDialog from "../../../components/UI/Dialog/BoostrapDialog"
import MuiAlert from "@mui/material/Alert"
import { Rating, Snackbar } from "@mui/material"
import FileUploadComponent from "../../../components/UI/FileUploadComponent/FileUploadComponent"
import VideoUploadComponent from "../../../components/UI/FileUploadComponent/VideoUploadComponent"
import CustomDialog from "../../../components/UI/Dialog/Dialog"
import CustomCarouselStory from "../../../components/Page/PersonalizeStory/Carousel/CarouselSingle"
import CustomButton from "../../../components/UI/Button/Button"
import ReviewTitleImage from "../../../assets/image/png/feedback_box.png"
import confetti from "../../../assets/image/png/review_confetti.png"
import styled from "styled-components"
import MinHeightTextarea from "../../../components/UI/TextArea/Textarea"
import Swal from "sweetalert2"
import swalSuccessIcon from "../../../assets/image/png/custom-success-icon.png"
import set from "lodash/set"
import CustomSwal from "../../../utils/customSwal"
import OverlayLoding from "../../../components/UI/Loding/OverlayLoding"
import alerts from "../../../assets/image/png/layer.png"
import hang from "../../../assets/image/svg/hang.svg"
import useIsMobile from "../../../hooks/useIsMobile"
import ScreenshotProtection from "../../../../website/components/screenshot-prevent/screenshot-prevent"

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

const StyledRating = styled(Rating)({
  "& .MuiRating-icon": {
    fontSize: "40px", // Increase this value as needed
  },
  "& .MuiRating-iconFilled": {
    color: "#faaf00",
  },
  "& .MuiRating-iconHover": {
    color: "#faaf00",
  },
  "& .MuiRating-iconEmpty": {
    color: "white", // change unfilled star color to white
    opacity: 0.6, // optional: makes it look like an outline
  },
})
const ViewOrder = () => {
  const isTablet = useIsMobile(768)
  const isMobile = useIsMobile(500)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [showRating, setShowRating] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orderId } = location.state || {}
  console.log("orderId", orderId)
  const [orderData, setOrderData] = useState({})
  const [trackOrder, setTrackOrder] = useState([])
  const [selectedItemId, setSelectedItemId] = useState(null)

  const [openAdduser, setOpenAdduser] = useState(false)
  const [modalType, setModalType] = useState("video")
  const [radioValue, setRadioValue] = useState(0) // 0 = unchecked, 1 = checked

  const [openAdduser2, setOpenAdduser2] = useState(false)
  const [data2, setData2] = useState({})

  const [aIMaskedfiles, setAiMaskedfiles] = useState(null)
  const [videoProductId, setVideoProductId] = useState(null)
  const [deliveryRating, setDeliveryRating] = useState(0)
  const [productRating, setProductRating] = useState(0)
  const [reviewComments, setReviewComments] = useState("")

  const [openAdduser5, setOpenAdduser5] = useState(false)
  const [opencontant, setOpencontant] = useState(false)

  const matchedItem = orderData?.items?.find(
    item => item?.id === selectedItemId?.id || selectedItemId
  )

  const navigationType = useNavigationType()

  // useEffect(() => {
  //   if (navigationType === "PUSH") {
  //     // Runs only on normal navigation (like navigate("/page"))
  //     if (selectedItemId?.shipping_detail) {
  //       setOpencontant(true)
  //     } else {
  //       setOpencontant(false)
  //     }
  //   }
  // }, [selectedItemId?.shipping_detail, navigationType])
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
          // type: "my_orders", // summary, my_orders
          id: id, // order detail id
        },
      },
      data => {
        setData2(data?.data)

        setOpenAdduser5(true)
      }
    )
  }

  const handleOpenDialog = id => {
    viewList(id)
  }

  const { sendRequest: uploadVideoRequest, isLoading: isVideoUploading } =
    useApiHttp()
  const { sendRequest: uploadFeedback } = useApiHttp()

  const listApiCAll = () => {
    sendRequest(
      {
        url: `user/order/view/${orderId}`,
      },
      data => {
        setOrderData(data?.data)
        const firstItemId = data?.data?.items?.[0]
        if (firstItemId) {
          setSelectedItemId(firstItemId)
        }
      }
    )
  }

  useEffect(() => {
    if (!orderId) {
      console.warn("No orderId provided in location state")
      return
    }
    // Fetch order details when component mounts or orderId changes
    listApiCAll()
  }, [orderId])

  useEffect(() => {
    if (!selectedItemId?.id) return

    sendRequest(
      {
        url: `user/order/detail/track/${selectedItemId?.id}`,
      },
      data => {
        setTrackOrder(data?.data?.tracker)
      }
    )
  }, [selectedItemId])

  const onDownloadItemClick = id => {
    const currentToken = JSON.parse(
      localStorage.getItem("webAppUserData")
    )?.authToken

    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "")

    axios({
      method: "get",
      url: `${baseUrl}/user/order/invoice/download/${id}`,
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
      responseType: "blob",
    })
      .then(response => {
        if (response.data?.type === "application/json") {
          // Likely a failed response disguised as blob
          const reader = new FileReader()
          reader.onload = () => {
            const json = JSON.parse(reader.result)
            toast.error(json?.message || "Failed to download invoice")
          }
          reader.readAsText(response.data)
          return
        }

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url

        const contentDisposition = response.headers["content-disposition"]
        let fileName = "invoice.pdf"

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?(.+?)"?$/)
          if (match?.[1]) {
            fileName = match[1]
          }
        }

        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
      .catch(error => {
        const message =
          error?.response?.data?.message ||
          "Failed to download invoice. Please try again."
        toast.error(message)
        console.error("Error downloading the invoice:", error)
      })
  }

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

  const { text, className } = getStatusLabel(selectedItemId?.status)
  const handleOpenUplode = (item, modalType) => {
    setModalType(modalType)
    setVideoProductId(item)
    setOpenAdduser(true)
  }
  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    setVideoProductId(null)
    setAiMaskedfiles(null)
    setDeliveryRating(0)
    setProductRating(0)
    setReviewComments("")
    setRadioValue(0) // Reset radio value to unchecked
    setOpenSnackbar(false)
  }
  const handleClosesetOpenAddUser5 = () => {
    setOpenAdduser5(false)
    // handleClearInput()
  }
  const handleClosesetOpencontant = () => {
    setOpencontant(false)
    // handleClearInput()
  }
  const handleChange = event => {
    const { name, value } = event.target
    const maxChar = 200
    const truncatedValue = value.slice(0, maxChar)
    setReviewComments(truncatedValue)
  }

  const submitVideo = () => {
    const formData = new FormData()
    if (aIMaskedfiles && radioValue !== 0) {
      formData.append("file", aIMaskedfiles.file)
      formData.append("id", videoProductId?.id)
      formData.append("consent", radioValue)
    } else {
      setOpenSnackbar(true)
      if (!aIMaskedfiles) {
        setSnackbarMessage("Please select a file.")
        return
      }
      setSnackbarMessage("Please check the consent.")
      return
    }
    uploadVideoRequest(
      {
        url: "user/order/upload/unbox-video",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Add proper header
        },
      },
      data => {
        // console.log("Success:", data)
        setAiMaskedfiles(null)
        handleClosesetOpenAddUser()
        CustomSwal.successIcon(
          {
            title: "Submitted!",
            text: "Your Unboxing video has been submitted.",
          },
          listApiCAll
        )
      }
    )
  }

  const submitFeedback = () => {
    let feedbackData = {
      book_id: videoProductId?.book_id,
      book_rating: productRating,
      order_detail_id: videoProductId?.id,
      delivery_rating: deliveryRating,
      comment: reviewComments,
    }
    uploadFeedback(
      {
        url: "user/product-review/user-feedback",
        method: "POST",
        body: feedbackData,
        // headers: {
        //   "Content-Type": "multipart/form-data", // Add proper header
        // },
      },
      data => {
        // console.log("Success:", data)
        // setAiMaskedfiles(null)
        handleClosesetOpenAddUser()

        // Swal.fire("Submitted!", "Your Feedback has been submitted.", "success").then(() => {
        //   listApiCAll();
        // })
        CustomSwal.successIcon(
          { title: "Submitted!", text: "Your Feedback has been submitted." },
          listApiCAll
        )
        // CustomSwal.successIcon(
        //   {

        // Swal.fire({
        //   title: "Submitted!",
        //   text: "Your Feedback has been submitted.",
        //   // icon: "success",
        //   background: "#000", // black background
        //   color: "#fff",
        //   imageUrl: swalSuccessIcon, // <-- your image here
        //   imageWidth: 100,
        //   imageHeight: 100,
        //   imageAlt: "Success Icon",
        //   confirmButtonColor: "#FFD500",    // white text
        //   customClass: {
        //     popup: "custom-swal-popup",
        //     confirmButton: 'swal-confirm-text-black'
        //     // icon: "custom-swal-icon"
        //   }
        // }).then(() => {
        //   listApiCAll();
        // });
      }
    )
  }

  const handleToggledefaultaddress = () => {
    setRadioValue(prev => (prev === 1 ? 0 : 1))
  }

  const handleAIMaskedUpload = files => {
    console.log("Files selected for AI Masked Upload:", files)
    console.log("Files selected for AI Masked Upload:", files[0])

    // console.log("Upload AI Masked Photo:", files[0])
    setAiMaskedfiles(files[0])
    // Add your upload logic here
  }
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate(-1)}>My Orders</span> &gt;{" "}
        <span className={styles.active}>{orderData?.order_number}</span>
      </div>

      <div className={styles.successContainer}>
        <div className={styles.header_set}>
          <div className={styles.header}>
            <h2>{orderData?.order_number}</h2>
            <p className={styles.label_1}>
              Order placed on {orderData?.order_date}
            </p>
          </div>
          <button
            className={styles.textButton}
            onClick={() => onDownloadItemClick(orderData?.id)}
          >
            <img src={dwonload} alt="dwonload" />
            Download Invoice
          </button>
        </div>
      </div>

      <div className={styles.infoGrid_sets}>
        {" "}
        <div className={styles.infoGrid}>
          <div>
            <p className={styles.label}>Delivery Address</p>
            <p className={styles.name_addres}>
              {orderData?.shipping_address?.contact_name}
            </p>
            <p className={styles.label_cont}>
              {orderData?.shipping_address?.address_line},{" "}
              {orderData?.shipping_address?.landmark},{" "}
              {orderData?.shipping_address?.city},{" "}
              {orderData?.shipping_address?.state},{" "}
              {orderData?.shipping_address?.pincode},{" "}
              {orderData?.shipping_address?.country}
            </p>
            <p className={styles.label_cont}>
              {orderData?.shipping_address?.contact_email} | +
              {orderData?.shipping_address?.country_code}-
              {orderData?.shipping_address?.contact_number}
            </p>
          </div>
          <div>
            <p className={styles.label}>Payment Method</p>
            <div className={styles.cardRow}>
              <img src={cardIcon} alt="card" />
              <span className={styles.name_addres} style={{ margin: 0 }}>
                {orderData?.payment_method}
              </span>
            </div>
            <p className={styles.label_cont}>
              {orderData?.payment?.bank || "-"}
            </p>
          </div>
          <div>
            <p className={styles.label}>Order Summary</p>
            <div className={styles.summary}>
              <div className={styles.label_cont}>
                <span>Sub Total</span>
                <span>₹{orderData?.summary?.sub_total}</span>
              </div>
              <div className={styles.label_cont}>
                <span>Discount</span>
                <span>-₹{orderData?.summary?.discount}</span>
              </div>
              <div className={styles.total}>
                <span>Total Amount</span>
                <span>₹ {orderData?.summary?.total}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.traker_all_set}>
          <div className={styles.orderItem}>
            {showRating && (
              <div className={styles.rating}>
                <div className={styles.rating_set}>
                  <img
                    className={styles.rating_set_img}
                    src={Rate}
                    alt="rating"
                  />
                  Please Rate your experience with us!
                </div>
                <img
                  className={styles.close_icon}
                  src={close_icon}
                  alt="close_icon"
                  onClick={() => setShowRating(false)}
                />
              </div>
            )}

            {/* <div className={styles.deliveryDate}>
            Delivered on Thursday, 23rd Mar 2025
          </div> */}
            {orderData?.items?.map((item, index) => (
              <div
                className={`${styles.orderItem_set} ${selectedItemId?.id === item?.id ? styles.active : ""
                  }`}
                key={index}
              >
                <div className={styles.orderItem_img}>
                  <img src={item?.book_image} alt="img1" />
                </div>
                <div className={styles.orderItem_details}>
                  <div className={styles.order_price_set}>
                    <div
                      className={`${styles.productTitle} ${styles.set_text_ariaaa}`}
                    >
                      {item?.book_name}{" "}
                      <p
                        className={`lable5 ${item.gender.toLowerCase() === "boy" ? "boy" : "girl"
                          }`}
                      >
                        {item.gender.toLowerCase() === "boy" ? "Boy" : "Girl"}
                      </p>
                    </div>
                    <div>
                      <p className={styles.productTitle_price}>
                        ₹ {item?.price}
                      </p>
                      {item?.stricken_price !== 0 && (
                        <p className={styles.stricken_price}>
                          ₹ {item?.stricken_price}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* <div className={styles.productDetails}>
                  {index} Books | Shipping Free
                </div> */}
                  <div className={styles.buttonGroup}>
                    <button
                      className={`${styles.outlineButton}`}
                      onClick={() => {
                        // dispatch(addCart({ body: { book_id: item?.book_id } }))
                        //   .unwrap()
                        //   .then(() => dispatch(countApi()))
                        //   .then(() => navigate("/mycart"))
                        //   .catch(error =>
                        //     console.error("Error in addCart/countApi:", error)
                        //   )
                        navigate("/user/personalize_story", {
                          state: {
                            storyId: item?.book_id, // Your actual ID
                            isdata: item,
                            whatPage: "view_page",
                            // isEdit: "edit",
                          },
                        })
                      }}
                    >
                      Buy It Again
                    </button>

                    {/* <button className={styles.outlineButton}>
                    Raise Request
                  </button> */}
                    <button
                      className={`${styles.outlineButton} ${selectedItemId?.id === item?.id ? styles.active : ""
                        }`}
                      onClick={() => {
                        setSelectedItemId(item)
                      }}
                    >
                      Track Order
                    </button>
                    {item?.show_review && (
                      <button
                        className={styles.outlineButton}
                        onClick={() => handleOpenUplode(item, "feedback")}
                      >
                        Product Review
                      </button>
                    )}
                    {item?.can_unbox && (
                      <button
                        className={styles.outlineButton}
                        onClick={() => handleOpenUplode(item, "video")}
                      >
                        Upload Video
                      </button>
                    )}
                    <button
                      className={`${styles.outlineButton}`}
                      onClick={() => {
                        handleOpenDialog(item?.id)
                      }}
                    >
                      Show Preview
                    </button>
                    {selectedItemId?.shipping_detail && (
                      <button
                        className={`${styles.outlineButton}`}
                        onClick={() => {
                          setOpencontant(true)
                        }}
                      >
                        View Shipping Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.traker}>
            <div className={styles.priceBox1}>
              <div className={styles.details_set}>
                <p className={styles.Details}>Track Order</p>
                <div className={className}>{text}</div>
              </div>

              <div className={styles.butns}>
                <div className={styles.statusStepper}>
                  <OrderTrackingStepper
                    statusTracking={trackOrder || []}
                  // currentStatus={"received"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openAdduser && (
        <BoostrapDialog
          open={openAdduser}
          handleClose={handleClosesetOpenAddUser}
          showCloseIcon={false}
          customWidth={modalType === "feedback" ? "700px" : "936px"}
          overflowY={"auto"}
          children={
            modalType === "feedback" ? (
              <>
                {/* <div className={styles.addUser} style={{ overflowY: "scroll" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={ReviewTitleImage}
                      style={{
                        maxWidth: "15%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                    <h3 className={styles.addUserHeader}>
                      Share your Feedback
                      <img src={confetti} style={{ verticalAlign: "middle" }} />
                    </h3>
                    <div
                      className={styles.main_set_left_header}
                      style={{ padding: "0 24%" }}
                    >
                      <p>
                        Let us know how your experience was! Rate the delivery,
                        review the storybook quality, and share any additional
                        thoughts to help us improve.
                      </p>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: "10rem", marginTop: "25px" }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "merriweather",
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#fff",
                        }}
                      >
                        How was your delivery experience?
                      </h3>
                      <span
                        style={{
                          fontFamily: "merriweather",
                          fontWeight: "300",
                          fontSize: "14px",
                          lineheight: "22px",
                          color: "#b1b3b5",
                        }}
                      >
                        (Consider timeliness and packaging.)
                      </span>
                      <div>
                        <StyledRating
                          name="simple-controlled"
                          value={deliveryRating}
                          size="large"
                          onChange={(event, newValue) => {
                            console.log(event)
                            console.log(newValue)
                            setDeliveryRating(newValue)
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "merriweather",
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#fff",
                        }}
                      >
                        Did the storybook meet your expectations?
                      </h3>
                      <span
                        style={{
                          fontFamily: "merriweather",
                          fontWeight: "300",
                          fontSize: "14px",
                          lineheight: "22px",
                          color: "#b1b3b5",
                        }}
                      >
                        (Rate its quality and accuracy.)
                      </span>
                      <div>
                        <StyledRating
                          name="simple-controlled"
                          value={productRating}
                          size="large"
                          onChange={(event, newValue) => {
                            setProductRating(newValue)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <h3
                      style={{
                        fontFamily: "merriweather",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#fff",
                      }}
                    >
                      Anything else you'd like to share?
                    </h3>
                    <span
                      style={{
                        fontFamily: "merriweather",
                        fontWeight: "300",
                        fontSize: "14px",
                        lineheight: "22px",
                        color: "#b1b3b5",
                      }}
                    >
                      (Optional comments about your experience.)
                    </span>
                    <div style={{ marginTop: "20px" }}>
                      <MinHeightTextarea
                        maxLength={200}
                        placeholder="Write your Comments here..."
                        name="testimonial"
                        rows={10}
                        showpertext={`${reviewComments?.length}/200 words`}
                        onChange={handleChange}
                        value={reviewComments}
                        style={{
                          marginTop: "10px",
                          marginBottom: "20px",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.btn_group}>
                    <button
                      className={styles.cancel}
                      onClick={handleClosesetOpenAddUser}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={submitFeedback}
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div> */}
                <div className={`${styles.addUser} ${styles.scrollContainer}`}>
                  <div className={styles.centeredColumn}>
                    <img
                      src={ReviewTitleImage}
                      className={styles.reviewImage}
                    />
                    <h3 className={styles.addUserHeader}>
                      Share your Feedback
                      <img src={confetti} className={styles.confettiImage} />
                    </h3>
                    <div
                      className={`${styles.main_set_left_header} ${styles.paddedText}`}
                    >
                      <p>
                        Let us know how your experience was! Rate the delivery,
                        review the storybook quality, and share any additional
                        thoughts to help us improve.
                      </p>
                    </div>
                  </div>

                  <div className={styles.feedbackGroup}>
                    <div>
                      <h3 className={styles.feedbackTitle}>
                        How was your delivery experience?
                      </h3>
                      <span className={styles.feedbackNote}>
                        (Consider timeliness and packaging.)
                      </span>
                      <div>
                        <StyledRating
                          name="simple-controlled"
                          value={deliveryRating}
                          size="large"
                          onChange={(event, newValue) => {
                            setDeliveryRating(newValue)
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className={styles.feedbackTitle}>
                        Did the storybook meet your expectations?
                      </h3>
                      <span className={styles.feedbackNote}>
                        (Rate its quality and accuracy.)
                      </span>
                      <div>
                        <StyledRating
                          name="simple-controlled"
                          value={productRating}
                          size="large"
                          onChange={(event, newValue) => {
                            setProductRating(newValue)
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.commentContainer}>
                    <h3 className={styles.feedbackTitle}>
                      Anything else you'd like to share?
                    </h3>
                    <span className={styles.feedbackNote}>
                      (Optional comments about your experience.)
                    </span>
                    <div className={styles.textareaWrapper}>
                      <MinHeightTextarea
                        maxLength={200}
                        placeholder="Write your Comments here..."
                        name="testimonial"
                        rows={10}
                        showpertext={`${reviewComments?.length}/200 words`}
                        onChange={handleChange}
                        value={reviewComments}
                        style={{
                          marginTop: "10px",
                          marginBottom: "20px",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.btn_group}>
                    <button
                      className={styles.cancel}
                      onClick={handleClosesetOpenAddUser}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={submitFeedback}
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.addUser}>
                  <h3 className={styles.addUserHeader}>
                    Upload Unboxing Video{" "}
                  </h3>
                  <div className={styles.addUserForm}>
                    <div className={styles.main_set}>
                      <div className={styles.main_set_left}>
                        <h3>Submit Your Video & Earn Rewards!</h3>
                        <p>
                          Share your video with us and get rewarded! Once
                          submitted, your video will be reviewed and approved by
                          our team. After approval, you’ll receive reward points
                          that can be used on your next order
                        </p>
                      </div>
                      <div className={styles.main_set_right}>
                        <div className={styles.main_set_left_header}>
                          <h3>Upload Video</h3>
                          <p>
                            Share your video with us and get rewarded! Once
                            submitted, your video will be reviewed and approved
                            by our team. After approval, you’ll receive reward
                            points that can be used on your next order
                          </p>
                        </div>
                        <div className={styles.uplode_box}>
                          <VideoUploadComponent
                            acceptedTypes={[
                              "video/mp4",
                              "video/x-msvideo",
                              "video/quicktime",
                            ]}
                            maxSize={100}
                            onFilesChange={files => handleAIMaskedUpload(files)}
                            className="width_min"
                            dropzoneText="Upload Video"
                            box_controlerl={"box_sizeing"}
                            multiple={false} // Ensure single file upload
                            stylesss={{ width: "100%", height: "206px" }}
                          />
                        </div>
                        <div className={styles.Mark}>
                          <div>
                            <CustomRadio
                              selected={radioValue === 1}
                              onToggle={handleToggledefaultaddress}
                            />
                          </div>

                          <p>
                            By submitting, you agree to allow your video to be
                            featured on our website.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.btn_group}>
                      <button
                        className={styles.cancel}
                        onClick={handleClosesetOpenAddUser}
                      >
                        Cancel
                      </button>
                      <button
                        className={`${styles.continueBtn} ${styles.width_cont}`}
                        onClick={submitVideo}
                      >
                        Submit Video
                      </button>
                    </div>
                  </div>
                </div>
                {isVideoUploading && <OverlayLoding />}
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={3000}
                  onClose={() => setOpenSnackbar(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert
                    severity="error"
                    onClose={() => setOpenSnackbar(false)}
                  >
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </>
            )
          }
        />
      )}

      <CustomDialog
        open={openAdduser2}
        handleClose={handleCloseDialog}
        showCloseIcon={true}
        customWidth={"900px"}
        overflowY={"auto"}
        children={
          <>
            <CustomCarouselStory slides={data2?.pages} title={data2?.title} />
            <div className={styles.viw_book_title}>
              <h3>{data2?.header}</h3>
              <p>{data2?.text}</p>
            </div>
            <div className={styles.carouselContainer}>
              {/* <CustomButton
                variant="contained"
                customColor="#000000"
                customBgColor="#F3C11D"
                custmstyle={{
                  padding: "7px",
                  width: "300px",
                  height: "50px",
                  marginTop: "15px",
                  gap: ".5rem",
                  alignItems: "center",
                }}
                onClick={() => navigate("/")}
              >
                Okay, Go Home
              </CustomButton> */}
            </div>
          </>
        }
      />

      {openAdduser5 && (
        <BoostrapDialog
          open={openAdduser5}
          handleClose={handleClosesetOpenAddUser5}
          showCloseIcon={false}
          customWidth={data2.image ? "700px" : "600px"}
          overflowY={"auto"}
          children={
            <>
              <ScreenshotProtection>
                <div className={styles.addUser}>
                  {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
                  <div className={styles.addUserForm}>
                    <div className={styles.addUserInput}>
                      {data2.image ? (
                        <div className={styles.addUserInput__imge_set}>
                          <div className={styles.addUser_img_big}>
                            <img src={data2.image} alt="alert" />
                          </div>
                        </div>
                      ) : (
                        <div className={styles.addUser_img}>
                          <img src={hang} alt="alert" width={"100px"} />
                        </div>
                      )}

                      <div className={styles.input_sets}>
                        <h1 className={styles.title}>
                          {data2.image
                            ? "Meet the Stars of Your Story"
                            : "Hang Tight!"}
                        </h1>
                        <p className={styles.description}>
                          {`${data2.image
                            ? "Introducing the stars of your story, all revolving around your hero!”"
                            : "We’re working on it. Check back soon or view the preview in My Orders after completing your order."
                            }`}
                        </p>
                      </div>
                    </div>

                    <div className={styles.btn_group}>
                      <button
                        className={`${styles.continueBtn} ${styles.width_cont}`}
                        onClick={handleClosesetOpenAddUser5}
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
              </ScreenshotProtection>
            </>
          }
        />
      )}
      {opencontant && (
        <BoostrapDialog
          open={opencontant}
          handleClose={handleClosesetOpencontant}
          showCloseIcon={false}
          customWidth={"520px"}
          overflowY={"auto"}
          children={
            <>
              <div className={styles.main_show}>
                <div className={styles.box_show_set}>
                  <div className={styles.cont_set}>
                    <p className={styles.cont_set_title}>Shipping Partner</p>
                    <p className={styles.cont_set_sub_title}>
                      {selectedItemId?.shipping_detail?.partner}
                    </p>
                  </div>
                  <div className={styles.cont_set}>
                    <p className={styles.cont_set_title}>AWB No</p>
                    <p className={styles.cont_set_sub_title}>
                      {selectedItemId?.shipping_detail?.awb_number}
                    </p>
                  </div>
                  {selectedItemId?.shipping_detail?.track_url && (
                    <div className={styles.cont_set}>
                      <p className={styles.cont_set_title}>Tracking Link</p>

                      <a href={selectedItemId?.shipping_detail?.track_url}>
                        <p className={styles.cont_set_sub_title}>
                          {selectedItemId?.shipping_detail?.track_url}
                        </p>
                      </a>
                    </div>
                  )}
                </div>
                <div className={styles.btn_group_set}>
                  <button
                    className={`${styles.continueBtn} ${styles.width_cont}`}
                    onClick={handleClosesetOpencontant}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </>
          }
        />
      )}
    </div>
  )
}

export default ViewOrder
