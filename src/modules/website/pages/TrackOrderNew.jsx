import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import { FaCheck } from "react-icons/fa";

// images
import view_book_thumb_img from "../../website/assets/image/view-book-thumb-img.png";
import order_show_preview_ic from "../../website/assets/image/order-show-preview-ic.png";
import order_track_ic from "../../website/assets/image/order-track-ic.png";
import order_review_ic from "../../website/assets/image/order-review-ic.png";
import card_ic from "../../website/assets/image/card-ic.png";
import MuiAlert from "@mui/material/Alert";
import { Rating, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import circle from "../../website/assets/image/circle.png";
import styled from "styled-components";
import useIsMobile from "../../web/hooks/useIsMobile";
import { Link, useLocation, useNavigate, useNavigationType, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useApiHttp from "../../web/hooks/ues-http";
import axios from "axios";
import styles from "../../web/features/MyOrders/MyOrdersSet/MyOrdersSet.module.css";
import Rate from "../../web/assets/image/svg/review star(filled).svg";
import ReviewTitleImage from "../../web/assets/image/png/feedback_box.png";
import confetti from "../../web/assets/image/png/review_confetti.png";
import close_icon from "../../web/assets/image/svg/close(without fill).svg";
import BoostrapDialog from "../../web/components/UI/Dialog/BoostrapDialog";
import ScreenshotProtection from "../components/screenshot-prevent/screenshot-prevent";
import CustomCarouselStory from "../../web/components/Page/PersonalizeStory/Carousel/CarouselSingle";
import CustomDialog from "../../web/components/UI/Dialog/Dialog";
import OverlayLoding from "../../web/components/UI/Loding/OverlayLoding";
import VideoUploadComponent from "../../web/components/UI/FileUploadComponent/VideoUploadComponent";
import MinHeightTextarea from "../../web/components/UI/TextArea/Textarea";
import CustomRadio from "../../web/components/UI/CustomRadio/CustomRadio";
import hang from "../../web/assets/image/svg/hang.svg";
import { Modal } from "react-bootstrap";
import CustomSwal from "../../web/utils/customSwal";
import toast from "react-hot-toast";
import styles2 from "../../web/features/MyOrders/ViewOrder/ViewOrder.module.css"

import classes from "../../web/components/OrderTrackingStepper/OrderTrackingStepper.module.css"
import Autocomplete from "../../web/components/UI/MultipleSlecter/Autocomplete";
import CustomeSlecter from "../../admin/components/UI/Dropdown/CustomeSlecter";
import UploadThumbnail from "../../web/components/UI/UploadThumbnail/UploadThumbnail";
import dayjs from "dayjs";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      // sx={{ color: "red" }}
      sx={{ color: "white" }}
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  );
});

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
});

const TrackOrderNew = () => {
  const steps = [
    {
      title: "Order Received",
      description: "Order received on",
      date: "24 May 2025 | 09:24 PM",
      status: "completed",
    },
    {
      title: "Order Confirmed",
      description: "Order confirmed by storybook on",
      date: "24 May 2025 | 10:35 PM",
      status: "completed",
    },
    {
      title: "Quality Check Pending",
      description: "",
      date: "",
      status: "pending",
    },
    {
      title: "Shipped",
      description: "",
      date: "",
      status: "pending",
    },
    {
      title: "Delivered",
      description: "",
      date: "",
      status: "pending",
    },
  ];

  const isTablet = useIsMobile(768);
  const isMobile = useIsMobile(500);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showRating, setShowRating] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams()
  const [all_data, setAll_data] = useState({})
  // const { orderId, all_data } = location.state || {};
  // console.log("all_data", all_data);
  const [orderData, setOrderData] = useState({});
  const [trackOrder, setTrackOrder] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [shippingData, setShippingData] = useState(null);

  const [openAdduser, setOpenAdduser] = useState(false);
  const [modalType, setModalType] = useState("video");
  const [radioValue, setRadioValue] = useState(0); // 0 = unchecked, 1 = checked

  const [openAdduser2, setOpenAdduser2] = useState(false);
  const [data2, setData2] = useState({});

  const [aIMaskedfiles, setAiMaskedfiles] = useState(null);
  const [videoProductId, setVideoProductId] = useState(null);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [reviewComments, setReviewComments] = useState("");

  const [openAdduser5, setOpenAdduser5] = useState(false);
  const [opencontant, setOpencontant] = useState(false);
  const [openAdduser8, setOpenAdduser8] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showPopup2, setShowPopup2] = useState(false)

  const [orderIdList, setorderIdList] = useState([])
  const [selectedOrderID, setSelectedOrderID] = useState([])
  const [searchOrderID, setsearchOrderID] = useState("")
  const [openRequestModal, setOpenRequestModal] = useState(false)
  const [serviceRequestTypes, setServiceRequestTypes] = useState([])

  const [formDatas, setFormDatas] = useState({
    orderId: "",
    category: "",
    description: "",
    attachments: [],
  })
  const handleCloseRaiseRequestModal = () => {
    setOpenRequestModal(false)
  }

  const handleClosesetOpenAddUser8 = (id) => {
    setOpenAdduser8(false)
  }

  const { sendRequest: getRequestTypes } = useApiHttp()
  const { isLoading: createRequestLoader, sendRequest: createRequest } =
    useApiHttp()

  useEffect(() => {
    getRequestTypes(
      {
        url: `user/drop-down/service-request-types`,
      },
      response => {
        setServiceRequestTypes(response?.data || [])
        // Handle the response data as needed
      }
    )

    // return () => {
    //   second
    // }
  }, [])


  const handleFormDataChange = (field, value) => {
    setFormDatas(prev => ({
      ...prev,
      [field]: value,
    }))
  }


  const handleShowPopupClose = () => {
    listApiCAll()
    setShowPopup(false)
  }

  const handleShowPopupCloses = () => {
    listApiCAll()
    setShowPopup2(false)
  }

  const matchedItem = orderData?.items?.find(
    (item) => item?.id === selectedItemId?.id || selectedItemId
  );

  const navigationType = useNavigationType();

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
  } = useApiHttp();

  const handleCloseDialog = () => setOpenAdduser2(false);
  const viewList = (id) => {
    sendRequest(
      {
        url: `user/order/book/preview`,
        method: "POST",
        body: {
          // type: "my_orders", // summary, my_orders
          id: id, // order detail id
        },
      },
      (data) => {
        setData2(data?.data);

        setOpenAdduser5(true);
      }
    );
  };

  const handleOpenDialog = (id) => {
    viewList(id);
  };

  const { sendRequest: uploadVideoRequest, isLoading: isVideoUploading } =
    useApiHttp();
  const { sendRequest: uploadFeedback } = useApiHttp();

  const listApiCAll = () => {
    sendRequest(
      {
        url: `user/order/view/${orderId}`,
      },
      (data) => {
        let obi = { ...data?.data }
        let payment = obi?.payment_method?.split("|")
        // console.log('payment', payment);

        if (payment?.[1]) {
          obi.payment_method = payment?.[0]
          obi.payment_bank = payment?.[1]
        }
        setOrderData(obi);
        setAll_data(obi)
        const firstItemId = data?.data?.items?.[0];
        if (firstItemId) {
          setSelectedItemId(firstItemId);
        }
      }
    );
  };

  useEffect(() => {
    if (!orderId) {
      console.warn("No orderId provided in location state");
      return;
    }
    // Fetch order details when component mounts or orderId changes
    listApiCAll();
  }, [orderId]);

  useEffect(() => {
    if (!selectedItemId?.id) return;

    sendRequest(
      {
        url: `user/order/detail/track/${selectedItemId?.id}`,
      },
      (data) => {
        setTrackOrder(data?.data?.tracker);
      }
    );
  }, [selectedItemId]);

  const onDownloadItemClick = (id) => {
    const currentToken = JSON.parse(
      localStorage.getItem("webAppUserData")
    )?.authToken;

    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "");

    axios({
      method: "get",
      url: `${baseUrl}/user/order/invoice/download/${orderId}`,
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
      responseType: "blob",
    })
      .then((response) => {
        if (response.data?.type === "application/json") {
          // Likely a failed response disguised as blob
          const reader = new FileReader();
          reader.onload = () => {
            const json = JSON.parse(reader.result);
            toast.error(json?.message || "Failed to download invoice");
          };
          reader.readAsText(response.data);
          return;
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        const contentDisposition = response.headers["content-disposition"];
        let fileName = "invoice.pdf";

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?(.+?)"?$/);
          if (match?.[1]) {
            fileName = match[1];
          }
        }

        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        const message =
          error?.response?.data?.message ||
          "Failed to download invoice. Please try again.";
        toast.error(message);
        console.error("Error downloading the invoice:", error);
      });
  };

  const getStatusLabel = (status) => {
    if (!status || typeof status !== "string") {
      return { text: "UNKNOWN", className: "status_lable unknown" };
    }

    switch (status.toLowerCase()) {
      case "received":
        return {
          text: "Received",
          className: "status_lable received",
        };
      case "confirmed":
        return {
          text: "Confirmed",
          className: "status_lable passed",
        };
      case "printed":
        return {
          text: "Printed",
          className: "status_lable printed",
        };
      case "shipped":
        return {
          text: "Shipped",
          className: "status_lable shipped",
        };
      case "delivered":
        return {
          text: "Delivered",
          className: "status_lable delivered",
        };
      case "cancelled":
        return {
          text: "Cancelled",
          className: "status_lable failed",
        };
      default:
        return { text: "UNKNOWN", className: "status_lable unknown" };
    }
  };

  const { text, className } = getStatusLabel(selectedItemId?.status);
  const handleOpenUplode = (item, modalType) => {
    setModalType(modalType);
    setVideoProductId(item);
    setOpenAdduser(true);
  };
  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false);
    setVideoProductId(null);
    setAiMaskedfiles(null);
    setDeliveryRating(0);
    setProductRating(0);
    setReviewComments("");
    setRadioValue(0); // Reset radio value to unchecked
    setOpenSnackbar(false);
  };
  const handleClosesetOpenAddUser5 = () => {
    setOpenAdduser5(false);
    // handleClearInput()
  };
  const handleClosesetOpencontant = () => {
    setOpencontant(false);
    // handleClearInput()
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const maxChar = 200;
    const truncatedValue = value.slice(0, maxChar);
    setReviewComments(truncatedValue);
  };

  const submitVideo = () => {
    const formData = new FormData();
    if (aIMaskedfiles && radioValue !== 0) {
      formData.append("file", aIMaskedfiles.file);
      formData.append("id", videoProductId?.id);
      formData.append("consent", radioValue);
    } else {
      setOpenSnackbar(true);
      if (!aIMaskedfiles) {
        setSnackbarMessage("Please select a file.");
        return;
      }
      setSnackbarMessage("Please check the consent.");
      return;
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
      (data) => {
        // console.log("Success:", data)
        setAiMaskedfiles(null);
        handleClosesetOpenAddUser();
        setShowPopup(true)
        // CustomSwal.successIcon(
        //   {
        //     title: "Submitted!",
        //     text: "Your Unboxing video has been submitted.",
        //   },
        //   listApiCAll
        // );
      }
    );
  };

  const submitFeedback = () => {
    let feedbackData = {
      book_id: videoProductId?.book_id,
      book_rating: productRating,
      order_detail_id: videoProductId?.id,
      delivery_rating: deliveryRating,
      comment: reviewComments,
    };
    uploadFeedback(
      {
        url: "user/product-review/user-feedback",
        method: "POST",
        body: feedbackData,
        // headers: {
        //   "Content-Type": "multipart/form-data", // Add proper header
        // },
      },
      (data) => {
        // console.log("Success:", data)
        // setAiMaskedfiles(null)
        handleClosesetOpenAddUser();

        // Swal.fire("Submitted!", "Your Feedback has been submitted.", "success").then(() => {
        //   listApiCAll();
        // })
        // CustomSwal.successIcon(
        //   { title: "Submitted!", text: "Your Feedback has been submitted." },
        //   listApiCAll
        // );
        setShowPopup2(true)
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
    );
  };

  const handleToggledefaultaddress = () => {
    setRadioValue((prev) => (prev === 1 ? 0 : 1));
  };

  const handleAIMaskedUpload = (files) => {
    console.log("Files selected for AI Masked Upload:", files);
    console.log("Files selected for AI Masked Upload:", files[0]);

    // console.log("Upload AI Masked Photo:", files[0])
    setAiMaskedfiles(files[0]);
    // Add your upload logic here
  };

  const handleThumbnailChange = (index, fileData) => {
    if (!fileData) {
      setFormDatas(prev => {
        const newAttachments = [...prev.attachments]
        newAttachments[index] = undefined
        return {
          ...prev,
          attachments: newAttachments,
        }
      })
      return
    }
    const { file, preview } = fileData

    setFormDatas(prev => {
      const newAttachments = [...prev.attachments]
      newAttachments[index] = file
      return {
        ...prev,
        attachments: newAttachments,
      }
    })
  }

  const handleCancelRaiseRequestModal = () => {
    handleCloseRaiseRequestModal()
    setFormDatas({
      orderId: "",
      category: "",
      description: "",
      attachments: [],
    })
    setsearchOrderID("") // Clear the search input
    setSelectedOrderID([]) // Clear the selected order ID
    setorderIdList([]) // Clear the order ID list
    setSnackbarMessage("") // Clear the snackbar message
    setOpenSnackbar(false) // Close the snackbar if it was open
  }

  const handleOpenSnackbar = message => {
    setSnackbarMessage(message)
    setOpenSnackbar(true)
  }

  const handleRequestSubmit = () => {
    if (!formDatas.orderId || !formDatas.category || !formDatas.description) {
      handleOpenSnackbar("Please fill in all required fields.")
      return
    }
    // Check if at least one attachment is provided
    // if (formDatas.attachments.length === 0) {
    //   handleOpenSnackbar("Please upload at least one attachment.");
    //   return;
    // }
    // Check if the selected order ID is valid
    if (!selectedOrderID || !selectedOrderID.id) {
      handleOpenSnackbar("Please select a valid Order ID.")
      return
    } // Check if the selected category is valid

    const formData = new FormData()
    // if (formDatas.attachments.length > 0) {
    let filteredAttachments = formDatas.attachments.filter(
      file => file instanceof File && file.size > 0
    )
    filteredAttachments.forEach((file, index) => {
      formData.append(`files[]`, file)
      // formData.append(`tags[${index}][id]`, null)
    })
    formData.append("order_id", formDatas.orderId)
    formData.append("request_type_id", formDatas.category)
    formData.append("description", formDatas.description)

    createRequest(
      {
        url: "user/service-request/create",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Add proper header
        },
      },
      data => {
        // console.log("Success:", data)
        handleCancelRaiseRequestModal()
        setOpenAdduser8(data?.message)
        // CustomSwal.successIcon({ title: "Created!", text: data.message })
      }
    )

    // }
  }


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
    setSnackbarMessage("")
  }

  const handleSelectionChange = (event, newValue) => {
    setSelectedOrderID(newValue)
    handleFormDataChange("orderId", newValue?.id || "") // Update formDatas with the selected order ID
  }

  return (
    <>
      <section className="my-order-page-section">
        <div className="container text-dark">
          {/* my order page */}

          <div className="my-order-content track-order-content">
            <h2 className="title-40px">My Orders</h2>
            <h6>Thank you for your order #{orderData?.order_number} </h6>
            <div className="order-placed">
              <span className="text-dark">
                Order placed on {orderData?.order_date}
              </span>
            </div>

            <div className="order-info">
              <div className="d-flex flex-wrap">
                <div className="col-lg-4 col-12 pe-lg-3 pe-0 mt_25">
                  <div className="order-address-cont">
                    <span className="order-span-title">Delivery Address</span>
                    <h4>{orderData?.shipping_address?.contact_name}</h4>
                    <p>
                      {orderData?.shipping_address?.address_line},{" "}
                      {orderData?.shipping_address?.landmark},{" "}
                      {orderData?.shipping_address?.city},{" "}
                      {orderData?.shipping_address?.state},{" "}
                      {orderData?.shipping_address?.pincode},{" "}
                      {orderData?.shipping_address?.country}
                    </p>

                    <div className="d-ac">
                      <span>{orderData?.shipping_address?.contact_email}</span>
                      <span>|</span>
                      <span>
                        +{orderData?.shipping_address?.country_code}-
                        {orderData?.shipping_address?.contact_number}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12 pe-lg-3 pe-0 mt_25">
                  <div className="order-address-cont">
                    <span className="order-span-title">Payment Method</span>
                    <div className="d-ac">
                      <img src={card_ic} alt="" />

                      <h4>{orderData?.payment_method}</h4>
                    </div>
                    {/* <p> {orderData?.payment?.bank || "-"}</p> */}
                    {orderData?.payment_bank && <p> {orderData?.payment_bank}</p>}
                  </div>
                </div>
                <div className="col-lg-4 col-12 pe-lg-3 pe-0 mt_25 text-dark">
                  <div className="order-det-card order-address-cont">
                    <span className="order-span-title">Order Summary</span>
                    <div className="price-info">
                      <h4>Sub Total</h4>
                      <h4>₹{orderData?.summary?.sub_total}</h4>
                    </div>
                    <div className="price-info">
                      <h4>Discount</h4>
                      <h4 className="clr-red">
                        -₹{orderData?.summary?.discount}
                      </h4>
                    </div>
                    <div className="line"></div>
                    <div className="price-info">
                      <h4>Total Amount</h4>
                      <h4>₹{orderData?.summary?.total}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="line my-5"></div>
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

            {orderData?.items?.map((item, index) => {
              const status_current = getStatusLabel(item?.status);
              return (
                <div className="track-order-section mt-2" key={index}>
                  <div className="df f-w as">
                    <div className="col-lg-8 col-12" >
                      <div className="my-orders-card mb-5">
                        <div className="my-order-info">
                          <div className="df f-w">
                            <div className="col-lg-2 col-6 mt-3">
                              <span>Order Placed </span>
                              <h3>{orderData?.order_date}</h3>
                            </div>
                            <div className="col-lg-2 col-6 mt-3">
                              <span>Total Amount </span>
                              <h3>₹ {orderData?.summary?.total}</h3>
                            </div>
                            <div className="col-lg-2 col-6 mt-3">
                              <span>Shipping to </span>
                              <h3>
                                {orderData?.shipping_address?.contact_name}
                              </h3>
                            </div>
                            <div className="col-lg-6 col-6 mt-3">
                              <div className="text-lg-end">
                                <h3>Order#{orderData?.order_number}</h3>
                                <span
                                  className="a-tags"
                                  onClick={() => onDownloadItemClick(item?.id)}
                                >
                                  Download Order Invoice
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="my-order-det-info">
                          {item?.shipping_detail?.delivery_date && <span className="arrive-det">
                            Tentative Delivery Date, {dayjs(item?.shipping_detail?.delivery_date).format("Do MMM YYYY")}
                          </span>}
                          <div className="df f-w ac">
                            <div className="col-md-3 col-12 mt-4">
                              <div className="my-orderimg">
                                <img
                                  className=""
                                  src={item?.book_image}
                                  alt=""
                                  draggable={false}
                                  onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                                />
                              </div>
                            </div>
                            <div className="col-md-9 col-12 mt-4">
                              <div className="df ac">
                                <h2>{item?.book_name}</h2>
                                <span
                                  className={`${item?.gender?.toLowerCase() === "boy"
                                    ? "tag-cart"
                                    : "tag-cartGirl"
                                    }`}
                                >
                                  {item?.gender?.toLowerCase() === "boy"
                                    ? "Boy"
                                    : "Girl"}
                                </span>
                              </div>
                              {/* <p className="mt-3">
                                Grab your hats and get ready for a sunny,
                                seaside quest! 🏖 When two young adventurers find
                                a mysterious map on the beach, they know
                                it...(need to change in api)
                              </p> */}
                              <div className="df f-w as gap-2 mt-2">
                                <Link to={`/user/personalize_story?story=${encodeURIComponent(item?.book_name)}&storyId=${item?.book_id}&whatpage=view_page&orderId=${item?.id}`}>
                                  <button
                                    className={styles.outlineButton}
                                  // onClick={() => {
                                  //   navigate("/user/personalize_story", {
                                  //     state: {
                                  //       storyId: item?.book_id, // Your actual ID
                                  //       isdata: item,
                                  //       whatPage: "view_page",
                                  //       // isEdit: "edit",
                                  //     },
                                  //   })
                                  //   window.location.reload()
                                  // }
                                  // }
                                  >
                                    Buy It Again
                                  </button>
                                </Link>

                                {item?.show_review && (
                                  <button
                                    className={styles.outlineButton}
                                    onClick={() =>
                                      handleOpenUplode(item, "feedback")
                                    }
                                  >
                                    Product Review
                                  </button>
                                )}
                                {item?.can_unbox && (
                                  <button
                                    className={styles.outlineButton}
                                    onClick={() =>
                                      handleOpenUplode(item, "video")
                                    }
                                  >
                                    Upload Video
                                  </button>
                                )}
                                {item?.shipping_detail && (
                                  <button
                                    className={styles.outlineButton}
                                    onClick={() => {
                                      setShippingData(item)
                                      setOpencontant(true)
                                    }
                                    }
                                  >
                                    View Shipping Details
                                  </button>
                                )}
                              </div>
                              <div className="df f-w as ">
                                <div className="col-lg-3 col-6 order-op mt-3">
                                  <span
                                    role="button"
                                    onClick={() => {
                                      handleOpenDialog(item?.id);
                                    }}
                                  >
                                    <img
                                      className=""
                                      src={order_show_preview_ic}
                                      alt=""
                                    />
                                    Show Preview
                                  </span>
                                </div>

                                <div className="col-lg-6 col-12 order-op mt-3">
                                  <p>Having an a issue with this order?</p>
                                  <span role="button" onClick={() => {
                                    setorderIdList([
                                      { id: orderId, name: all_data?.order_number },
                                    ]) // Set the order ID list with the current order
                                    setSelectedOrderID({
                                      id: orderId,
                                      name: all_data?.order_number,
                                    }) // Set the selected order ID
                                    setsearchOrderID(all_data?.order_number) // Set the search input to the current order number
                                    handleFormDataChange("orderId", orderId) // Update form
                                    setOpenRequestModal(true)
                                  }}>Raise a request? </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-12 ps-lg-4 ps-0">
                      <div className="track-container">
                        <div className="track-header">
                          <h4>Track Order</h4>
                          <span className="status-badge">{status_current?.text}</span>
                        </div>

                        <div className="timeline">
                          {item?.tracker?.map((step, indexs) => {
                            const isCompleted = step.completed;
                            const isLast = indexs === item?.tracker?.length - 1;
                            const currentStatus = "received"; // Replace with actual current status from props
                            const isCurrent = step.status === currentStatus;
                            return (
                              <div className="timeline-step" key={indexs}>
                                <div
                                  className={`timeline-marker ${isCompleted ? "completed" : ""
                                    }`}
                                >
                                  {isCompleted ? <FaCheck /> : ""}
                                </div>
                                {indexs !== steps.length - 1 && (
                                  <div
                                    className={`timeline-line ${steps[indexs + 1].status === "completed"
                                      ? "filled"
                                      : ""
                                      }`}
                                  ></div>
                                )}

                                <div className="timeline-content">
                                  <h5
                                    className={`${isCompleted ? "done" : "pending"
                                      }`}
                                  >
                                    {step?.label}
                                  </h5>
                                  {isCompleted && step?.completed_at && (
                                    <>
                                      <p>
                                        {step?.completed_lable}
                                        <br />
                                        <span> {step?.completed_at}</span>
                                        <br />
                                        {step?.comment && <span className="fw-bold">{step?.comment}</span>}
                                      </p>


                                    </>
                                  )}
                                  <hr />
                                </div>
                                {/* {isCurrent && !isCompleted && (
                              <div className={classes.currentStatus}>
                                {/* <span className={classes.statusBadge}>In Progress</span> 
                              </div>
                            )} */}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />

      <Modal
        show={openAdduser}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-3 popup_design">
          <div>
            <>
              {modalType === "feedback" ? (
                <>
                  <div className={styles.addUser}>
                    <div className={styles.headerSection}>
                      <img src={ReviewTitleImage} className={styles.headerImage} />
                      <h3 className={styles.addUserHeader}>
                        Share your Feedback
                        <img src={confetti} className={styles.confetti} />
                      </h3>

                      <div className={styles.description}>
                        <p>
                          Let us know how your experience was! Rate the delivery,
                          review the storybook quality, and share any additional
                          thoughts to help us improve.
                        </p>
                      </div>
                    </div>

                    <div className={styles.ratingRow}>
                      <div className={styles.ratingCard}>
                        <h3>How was your delivery experience?</h3>
                        <span>(Consider timeliness and packaging.)</span>
                        <StyledRating
                          value={deliveryRating}
                          size="large"
                          onChange={(e, v) => setDeliveryRating(v)}
                        />
                      </div>

                      <div className={styles.ratingCard}>
                        <h3>Did the storybook meet your expectations?</h3>
                        <span>(Rate its quality and accuracy.)</span>
                        <StyledRating
                          value={productRating}
                          size="large"
                          onChange={(e, v) => setProductRating(v)}
                        />
                      </div>
                    </div>

                    <div className={styles.commentSection}>
                      <h3>Anything else you'd like to share?</h3>
                      <span>(Optional comments about your experience.)</span>
                      <div style={{ marginTop: "20px" }}>
                        <MinHeightTextarea
                          maxLength={200}
                          placeholder="Write your comments here..."
                          name="testimonial"
                          rows={8}
                          showpertext={`${reviewComments?.length}/200 words`}
                          value={reviewComments}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className={styles.btn_group2}>
                      <button className={styles.cancel} onClick={handleClosesetOpenAddUser}>
                        Cancel
                      </button>
                      <button
                        className={`${styles.continueBtn} ${styles.width_cont}`}
                        onClick={submitFeedback}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* upload video popup */}

                  <div className="up-unbox-vid">
                    <h2 className="title-24px-wh text-center mt-3 mb-3">
                      Upload Unboxing Video
                    </h2>
                    <div className="df up-unbox-cont mt-4">
                      <div className="col-lg-6 pe-lg-4 pe-0">
                        <div className="red-opbg">
                          <h4>Submit Your Video & Earn Rewards!</h4>
                          <p>
                            Share your video with us and get rewarded! Once
                            submitted, your video will be reviewed and approved by
                            our team. After approval, you’ll receive reward points
                            that can be used on your next order
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 ">
                        <h4>Upload Video</h4>
                        <p>
                          Ensure your video is around 2 minutes long and in HD
                          quality for approval. Maintain clear audio, good
                          lighting, and relevant content to meet the guidelines.
                        </p>
                        <div className={styles.uplode_box}>
                          <VideoUploadComponent
                            acceptedTypes={[
                              "video/mp4",
                              "video/x-msvideo",
                              "video/quicktime",
                            ]}
                            maxSize={100}
                            onFilesChange={(files) =>
                              handleAIMaskedUpload(files)
                            }
                            className="width_min"
                            dropzoneText="Upload Video"
                            box_controlerl={"box_sizeing"}
                            multiple={false} // Ensure single file upload
                            stylesss={{ width: "100%", height: "206px" }}
                          />
                        </div>
                        <div className={styles.Mark}>
                          <div className="df mt-4">
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

                  {/* upload video popup ends */}
                  <div className={styles.addUser}>
                    <div className={styles.addUserForm}>
                      <div className={styles.main_set}></div>


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
              )}
            </>
          </div>
        </div>
      </Modal>

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

      <Modal
        show={openAdduser5}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser5()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-3 popup_design">
          <div>
            <ScreenshotProtection>
              <div className={'addUser'}>
                {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
                <div className={'addUserForm'}>
                  <div className={'addUserInput'}>
                    {data2.image ? (
                      <div className={'addUserInput__imge_set'}>
                        <div className={'addUser_img_big'}>
                          <img src={data2.image} alt="alert" />
                        </div>
                      </div>
                    ) : (
                      <div className={'addUser_img'}>
                        <img src={hang} alt="alert" width={"100px"} />
                      </div>
                    )}

                    <div className={'input_sets'}>
                      <h1 className={'title mt-4'}>
                        {data2.image
                          ? "Meet the Stars of Your Story"
                          : "Hang Tight!"}
                      </h1>
                      <p className={'description'}>
                        {`${data2.image
                          ? "Introducing the stars of your story, all revolving around your hero!”"
                          : "We’re working on it. Check back soon or view the preview in My Orders after completing your order."
                          }`}
                      </p>
                    </div>
                  </div>

                  <div className={"d-flex justify-content-center mb-3 mt-3"}>
                    <div>
                      <button
                        className={'sumt_btn'}
                        onClick={() => handleClosesetOpenAddUser5()}
                      >
                        Okay
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </ScreenshotProtection>
          </div>
        </div>
      </Modal>

      <Modal
        show={opencontant}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpencontant()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={styles2.main_show}>
              <div className={styles2.box_show_set}>
                <div className={styles2.cont_set}>
                  <p className={styles2.cont_set_title}>Shipping Partner</p>
                  <p className={styles2.cont_set_sub_title}>
                    {shippingData?.shipping_detail?.partner}
                  </p>
                </div>
                <div className={styles2.cont_set}>
                  <p className={styles2.cont_set_title}>AWB No</p>
                  <p className={styles2.cont_set_sub_title}>
                    {shippingData?.shipping_detail?.awb_number}
                  </p>
                </div>
                <div className={styles2.cont_set}>
                  <p className={styles2.cont_set_title}>Delivery Date</p>
                  <p className={styles2.cont_set_sub_title}>
                    {shippingData?.shipping_detail?.delivery_date ? dayjs(shippingData?.shipping_detail?.delivery_date).format("DD-MM-YYYY") : ''}
                  </p>
                </div>
                {shippingData?.shipping_detail?.track_url && (
                  <div className={styles2.cont_set}>
                    <p className={styles2.cont_set_title}>Tracking Link</p>

                    <a href={shippingData?.shipping_detail?.track_url} target="_blank">
                      <p className={styles2.cont_set_sub_title2}>
                        {shippingData?.shipping_detail?.track_url}
                      </p>
                    </a>
                  </div>
                )}

              </div>
              <div className={"d-flex justify-content-center mb-3"}>
                <div>
                  <button
                    className={'sumt_btn'}
                    onClick={handleClosesetOpencontant}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal show={showPopup}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleShowPopupClose()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={"addUser"}>
              {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
              <div className={"addUserForm"}>
                <div className={"addUserInput"}>
                  <div className={"addUser_img"}>
                    <img src={circle} alt="alert" width={"100px"} />
                  </div>
                  <div className={"input_sets"}>
                    <h1 className={"title"}>Submitted Successfully!</h1>
                    <p className={"description mt-4"}>
                      Your video has been successfully submitted! 🎉
                      Our team will review it soon, and once approved, you'll earn reward points for your next order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center mb-3"}>
              <div>
                <button
                  className={'sumt_btn'}
                  onClick={handleShowPopupClose}
                >
                  Great
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>


      <Modal show={showPopup2}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleShowPopupCloses()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="md"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={"addUser"}>
              {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
              <div className={"addUserForm"}>
                <div className={"addUserInput"}>
                  <div className={"addUser_img"}>
                    <img src={circle} alt="alert" width={"100px"} />
                  </div>
                  <div className={"input_sets"}>
                    <h1 className={"title"}>Submitted!</h1>
                    <p className={"description mt-4"}>
                      Your Feedback has been submitted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center mb-3"}>
              <div>
                <button
                  className={'sumt_btn'}
                  onClick={handleShowPopupCloses}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>


      <Modal show={openRequestModal} backdrop="static" // When backdrop is set to static, modal will not close when
        clicking outside it keyboard={false} onHide={() => handleCloseRaiseRequestModal()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-5 popup_design">
          {createRequestLoader && <OverlayLoding />}
          <div>
            <div className="mb-3 try-flex-col">
              <h3 className="text-center title-24px-wh">Raise New Ticket</h3>
              <div className={'addUserInput'}>
                <div className={'input_text_filed d-flex flex-md-nowrap flex-wrap ac-jb  gap-2 mb-3'}>
                  <div className="w-100">
                    <Autocomplete
                      options={orderIdList}
                      getOptionLabel={option => option.name || ""}
                      disabled={true}
                      value={selectedOrderID}
                      onChange={handleSelectionChange}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      inputValue={searchOrderID}
                      onInputChange={(event, newInputValue) => {
                        if (newInputValue.length < 1) {
                          setorderIdList([]) // Clear the list if input is less than 3 characters
                        }
                        setsearchOrderID(newInputValue)
                      }}
                      sx={{
                        width: isTablet ? "100%" : "287px",
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          // label="Enter Order ID"
                          sx={{
                            color: "#fff",
                            "& .MuiInputBase-input::placeholder": {
                              color: "#fff",
                              opacity: 1, // ensure it shows properly
                              fontSize: "14px",
                              fontFamily: "var(--font-regular), sans-serif",
                            },
                          }}
                          placeholder="Type and select the order"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    // error={!!errors.tags}
                    />
                  </div>
                  <div className="w-100">
                    <CustomeSlecter
                      // data={countryData.map(a => ({
                      //   label: a.name,
                      //   value: a.name,
                      // }))}
                      data={serviceRequestTypes.map(a => ({
                        label: a.name,
                        value: a.id,
                      }))}
                      title="Choose Category"
                      width={isTablet ? "100%" : "287px"}
                      value={formDatas?.category}
                      onChange={e => {
                        handleFormDataChange("category", e.target.value)
                      }}
                      borders={true}
                      required
                    />
                  </div>
                </div>
                <MinHeightTextarea
                  // maxLength={300}
                  placeholder="Enter the detailed description"
                  name="description"
                  rows={6}
                  // showpertext={`${testimonial.length}/500 words`}
                  onChange={e =>
                    handleFormDataChange("description", e.target.value)
                  }
                  value={formDatas?.description}
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                />
                <h6 className={styles.raiseRequestSectionHeader}>
                  Upload Attachments
                </h6>
                <div className={styles.input_text_filed}>
                  <div>
                    <UploadThumbnail
                      label="Upload Photo"
                      onFileChange={file => {
                        handleThumbnailChange(0, file)
                      }}
                      id={`thumbnail_${0}`}
                      allowedTypes={["image/jpeg", "image/png"]}
                      maxSizeMB={5}
                      style={{
                        height: "130px",
                        width: isMobile ? "200px" : "130px",
                      }}
                    // initialImage={character.thumbnail?.file}
                    />
                  </div>
                  <div>
                    <UploadThumbnail
                      label="Upload Photo"
                      onFileChange={file => {
                        handleThumbnailChange(1, file)
                      }}
                      id={`thumbnail_${1}`}
                      allowedTypes={["image/jpeg", "image/png"]}
                      maxSizeMB={5}
                      style={{
                        height: "130px",
                        width: isMobile ? "200px" : "130px",
                      }}
                    // initialImage={character.thumbnail?.file}
                    />
                  </div>
                  <div>
                    <UploadThumbnail
                      label="Upload Photo"
                      onFileChange={file => {
                        handleThumbnailChange(2, file)
                      }}
                      id={`thumbnail_${2}`}
                      allowedTypes={["image/jpeg", "image/png"]}
                      maxSizeMB={5}
                      style={{
                        height: "130px",
                        width: isMobile ? "200px" : "130px",
                      }}
                    // initialImage={character.thumbnail?.file}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className={"d-flex justify-content-center gap-3 mt-3"}>
            <button className={"cancel_btn"} onClick={() => handleCancelRaiseRequestModal()}
            >
              Cancel
            </button>

            <button className={"sumt_btn"} onClick={handleRequestSubmit}>
              Raise Request
            </button>
          </div>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={1000000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              severity="error"
              sx={{
                "& .MuiAlert-message": {
                  // color: "rgb(217 18 14)",
                  color: '#fff'
                },
              }}
              onClose={handleCloseSnackbar}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </Modal>


      <Modal show={openAdduser8}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser8(openAdduser8)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="md"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={'addUser'}>
              {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
              <div className={'addUserForm'}>
                <div className={'addUserInput'}>
                  <div className={'addUser_img'}>
                    <img src={circle} alt="alert" width={"100px"} />
                  </div>
                  <div className={'input_sets'}>
                    <h1 className={'title'}>Created!</h1>
                    <p className={'description'}>
                      {openAdduser8}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center mb-3"}>
              <div>
                <button
                  className={'sumt_btn'}
                  onClick={() => handleClosesetOpenAddUser8()}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default TrackOrderNew;
