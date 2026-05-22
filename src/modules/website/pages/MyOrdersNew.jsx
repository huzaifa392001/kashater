import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";

// images
import view_book_thumb_img from "../../website/assets/image/view-book-thumb-img.png";
import order_show_preview_ic from "../../website/assets/image/order-show-preview-ic.png";
import order_track_ic from "../../website/assets/image/order-track-ic.png";
import order_review_ic from "../../website/assets/image/order-review-ic.png";
import Rate from "../../web/assets/image/svg/review star(filled).svg"
import close_icon from "../../web/assets/image/svg/close(without fill).svg"
import { useCallback, useEffect, useRef, useState } from "react";
import useIsMobile from "../../web/hooks/useIsMobile";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useApiHttp from "../../web/hooks/ues-http";
import { countApi } from "../../web/services/storeSlice/addCart";
import { debounce } from "lodash";
import CustomSwal from "../../web/utils/customSwal";
import styles from "../../web/features/MyOrders/MyOrdersSet/MyOrdersSet.module.css"
import axios from "axios";
import { Alert, Paper, Snackbar, TextField } from "@mui/material"
import BoostrapDialog from "../../web/components/UI/Dialog/BoostrapDialog";
import Autocomplete from "../../web/components/UI/MultipleSlecter/Autocomplete";
import CustomeSlecter from "../../admin/components/UI/Dropdown/CustomeSlecter";
import MinHeightTextarea from "../../web/components/UI/TextArea/Textarea";
import UploadThumbnail from "../../web/components/UI/UploadThumbnail/UploadThumbnail";
import { Modal } from "react-bootstrap";
import OverlayLoding from "../../web/components/UI/Loding/OverlayLoding";
import MyRequestPage from "./MyRequestPage";
import ScreenshotProtection from "../components/screenshot-prevent/screenshot-prevent";
import hang from "../../web/assets/image/svg/hang.svg";
import circle from "../../website/assets/image/circle.png";


const MyOrdersNew = () => {
  const navigate = useNavigate()
  const isLaptap = useIsMobile(1024)
  const isTablet = useIsMobile(768)
  const isMobile = useIsMobile(500)
  const dispatch = useDispatch()
  const [showRating, setShowRating] = useState(false)
  const [data, setData] = useState([])
  const [isFetching, setIsFetching] = useState(false) // Add loading state
  const [page, setPage] = useState(1) // Track current page
  const [total, setTotal] = useState(0) // Track current page
  const containerRef = useRef(null)
  const [searchVlue, setSearchVlue] = useState("")
  const [activeTab, setActiveTab] = useState(0)
  const [myOrderCount, setMyOrderCount] = useState(0)
  const [tabs, setTabs] = useState(1)
  const { isLoading, success, error, sendRequest } = useApiHttp()

  const {
    isLoading: ListDataLoading,
    success: ListDataSucces,
    error: ListDataError,
    sendRequest: ListDataRequest,
  } = useApiHttp()

  const [openRequestModal, setOpenRequestModal] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [orderIdList, setorderIdList] = useState([])
  const [selectedOrderID, setSelectedOrderID] = useState([])
  const [searchOrderID, setsearchOrderID] = useState("")
  const [serviceRequestTypes, setServiceRequestTypes] = useState([])
  const [data2, setData2] = useState({});
  const [openAdduser5, setOpenAdduser5] = useState(false);

  const [openAdduser8, setOpenAdduser8] = useState(false)

  const [formDatas, setFormDatas] = useState({
    orderId: "",
    category: "",
    description: "",
    attachments: [],
  })

  const { sendRequest: getRequestTypes } = useApiHttp()
  const { isLoading: createRequestLoader, sendRequest: createRequest } =
    useApiHttp()


  const handleClosesetOpenAddUser8 = (id) => {
    setOpenAdduser8(false)
  }

  const buyItAgin = id => {
    sendRequest(
      {
        url: `user/order/book-again/${id}`,
      },
      response => {
        dispatch(countApi())
        navigate("/user/mycart")
      }
    )
  }
  const debouncedFetchData = useCallback(
    debounce(() => {
      ListDataRequest(
        {
          url: `user/order/list`,
          method: "POST",
          body: {
            page: page,
            per_page: 10,
            search: searchVlue,
          },
        },
        response => {
          if (page === 1) {
            setData(response?.data?.orders || [])
          } else {
            setData(prev => [...prev, ...(response?.data?.orders || [])])
          }
          setTotal(response?.data?.total_count || 0)
          setMyOrderCount(response?.data?.total_count || 0)
          setIsFetching(false)
        }

        // setData(response?.data?.orders)
        // setTotal(response?.data?.total_count)
        // setIsFetching(false)
        // }
      )
    }, 500),
    [page, searchVlue]
  )
  useEffect(() => {
    setIsFetching(true)
    debouncedFetchData()
    setPage(1)
  }, [searchVlue])

  // Scroll event listener to detect when user reaches end of list
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      if (scrollHeight - scrollTop <= clientHeight) {
        setPage(prevPage => prevPage + 1)
        debouncedFetchData()
      }
    }

    const refCurrent = containerRef.current
    if (refCurrent) {
      refCurrent.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("scroll", handleScroll)
      }
    }
  }, [debouncedFetchData])

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

  const handleClosesetOpenAddUser5 = () => {
    setOpenAdduser5(false);
    // handleClearInput()
  };

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

  // Function to handle raise Request data changes
  const handleCloseRaiseRequestModal = () => {
    setOpenRequestModal(false)
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

  const handleFormDataChange = (field, value) => {
    setFormDatas(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSelectionChange = (event, newValue) => {
    setSelectedOrderID(newValue)
    handleFormDataChange("orderId", newValue?.id || "") // Update formDatas with the selected order ID
  }

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
  const handleOpenSnackbar = message => {
    setSnackbarMessage(message)
    setOpenSnackbar(true)
  }

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

  const viewOrdersNav = (item) => {
    // navigate("/user/view_orders", {
    //   state: {
    //     orderId: item.id, // Your actual ID
    //     all_data: item
    //   },
    // })
    navigate(`/user/view_orders/${item?.id}`)
    window.location.reload()
  }

  return (
    <>
      <section className="my-order-page-section">
        <div className="container">
          <div
            ref={containerRef}
            className={styles.suggestion_paper}
            style={{
              maxWidth: "100%",
              marginTop: "5px",
              position: "relative",
              zIndex: 50,
              marginBottom: "20px",
              maxHeight: "100vh",
              overflow: "auto",
              backgroundColor: "transparent",
            }}
          ></div>
          {/* Breadcrumb */}
          <p className="breadcrumb-section text-dark">
            <Link to="/user/profile_page">
              <span className="p_new">My Profile</span> </Link> &gt;{" "}
            <a href="">
              <span>My Orders</span>
            </a>
          </p>

          {/* my order page */}

          <div className="my-order-content">
            <h2 className="title-40px">My Orders</h2>
            <div className="mis-tab py-4">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${tabs == 1 ? 'active' : ''}`}
                    href="#my_orders_tab"
                    data-bs-toggle="pill"
                    onClick={() => setTabs(1)}
                  >
                    My Orders
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${tabs == 2 ? 'active' : ''}`}
                    href="#my_requests_tab"
                    data-bs-toggle="pill"
                    onClick={() => setTabs(2)}
                  >
                    My Requests
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
              {tabs == 1 && <div id="my_orders_tab" className="tab-pane active dat_left holder">
                <div className="my-orders-list">
                  {data?.map((item, index) => {
                    return (<div className="my-orders-card mb-5" key={index}>

                      <div className="my-order-info text-dark">
                        <div className="df f-w">
                          <div className="col-lg-2 col-6 mt-3">
                            <span>Order Placed </span>
                            <h3>{item?.order_date}</h3>
                          </div>
                          <div className="col-lg-2 col-6 mt-3">
                            <span>Total Amount </span>
                            <h3>₹ {item?.total_amount}</h3>
                          </div>
                          <div className="col-lg-2 col-6 mt-3">
                            <span>Shipping to </span>
                            <h3>{item?.shipping_to}</h3>
                          </div>
                          <div className="col-lg-6 col-6 mt-3">
                            <div className="text-lg-end">
                              <h3>Order#{item?.order_number}</h3>
                              <span className="a-tags" onClick={() => onDownloadItemClick(item?.id)}>Download Order Invoice</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {showRating && (
                        <div className={`${styles.rating} text-white bg-dark`}>
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
                      <div className="my-order-det-info">
                        {/* <span className="arrive-det">Arriving on Thursday, 27th Sep 2025(need to change in api)</span> */}
                        <div className="df f-w ac">
                          <div className="col-md-3 col-12 mt-4">
                            <div className="my-orderimg">
                              {item?.book_images?.map((img, index) => (
                                <img className="" src={img} alt="" key={index}
                                  draggable={false}
                                  onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                              ))}
                              <img className="" src={view_book_thumb_img} alt="" />
                            </div>
                          </div>
                          <div className="col-md-9 col-12 mt-4">
                            <div className="df ac" role="button" onClick={() =>
                              viewOrdersNav(item)
                              // navigate("/user/view_orders", {
                              //   state: {
                              //     orderId: item.id, // Your actual ID
                              //     all_data: item
                              //   },
                              // })
                            }>
                              <h2>{item?.book_names}</h2>
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
                            {/* <p className="mt-3 text-dark">Grab your hats and get ready for a sunny, seaside quest! 🏖 When two young adventurers find a mysterious map on the beach, they know it...(need to change in api)</p> */}
                            <div className="df f-w as ">
                              {/* <div className="col-lg-2 col-6 order-op mt-3">
                                <span role="button"
                                // onClick={() => {
                                //   handleOpenDialog(item?.id);
                                // }}
                                ><img className="" src={order_show_preview_ic} alt="" />Show Preview (need to change in api)</span>
                              </div> */}
                              <div className="col-lg-2 col-6 order-op mt-3">
                                <span role="button" onClick={() =>
                                  viewOrdersNav(item)
                                  // navigate("/user/view_orders", {
                                  //   state: {
                                  //     orderId: item.id, // Your actual ID
                                  //   },
                                  // })
                                }><img className="" src={order_track_ic} alt="" />Track Order </span>
                              </div>
                              <div className="col-lg-4 col-12 order-op mt-3">
                                <p>Having an a issue with this order?</p><span role="button" onClick={() => {
                                  console.log(
                                    "Raise Request clicked for order ID:",
                                    item.id
                                  )
                                  setorderIdList([
                                    { id: item.id, name: item.order_number },
                                  ]) // Set the order ID list with the current order
                                  setSelectedOrderID({
                                    id: item.id,
                                    name: item.order_number,
                                  }) // Set the selected order ID
                                  setsearchOrderID(item.order_number) // Set the search input to the current order number
                                  handleFormDataChange("orderId", item.id) // Update form
                                  setOpenRequestModal(true)
                                }}>Raise a request? </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>)
                  })}
                  {/* <div className="my-orders-card mb-5">
                    <div className="my-order-info">
                      <div className="df f-w">
                        <div className="col-lg-2 col-6 mt-3">
                          <span>Order Placed </span>
                          <h3>20 Sep 2025</h3>
                        </div>
                        <div className="col-lg-2 col-6 mt-3">
                          <span>Total Amount </span>
                          <h3>₹ 1599.00</h3>
                        </div>
                        <div className="col-lg-2 col-6 mt-3">
                          <span>Shipping to </span>
                          <h3>Kiran Kumar</h3>
                        </div>
                        <div className="col-lg-6 col-6 mt-3">
                          <div className="text-lg-end">
                            <h3>Order#0540-280325001905</h3>
                            <a href="">Download Order Invoice</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-order-det-info">
                      <span className="arrive-det">Arriving on Thursday, 27th Sep 2025</span>
                      <div className="df f-w ac ">
                        <div className="col-md-3 col-12 mt-4">
                          <div className="my-orderimg">
                            <img className="" src={view_book_thumb_img} alt="" />
                          </div>
                        </div>
                        <div className="col-md-9 col-12 mt-4">
                          <div className="df ac">
                            <h2>The Hidden Island</h2>
                            <span className="tag-cartGirl">Girl</span>
                          </div>
                          <p className="mt-3">Grab your hats and get ready for a sunny, seaside quest! 🏖 When two young adventurers find a mysterious map on the beach, they know it...</p>
                          <div className="df f-w as ">
                            <div className="col-lg-2 col-6 order-op mt-3">
                              <span><img className="" src={order_show_preview_ic} alt="" />Show Preview</span>
                            </div>
                            <div className="col-lg-2 col-6 order-op mt-3">
                              <span><img className="" src={order_track_ic} alt="" />Track Order </span>
                            </div>
                            <div className="col-lg-3 col-12 order-op mt-3">
                              <span><img className="" src={order_review_ic} alt="" />Write a Product Review </span>
                            </div>
                            <div className="col-lg-4 col-12 order-op mt-3">
                              <p>Having an a issue with this order?</p><span>Raise a request? </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>}
              {tabs == 2 && <MyRequestPage />}
            </div>
          </div>
        </div>
      </section >
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
                  color: "rgb(217 18 14)",
                },
              }}
              onClose={handleCloseSnackbar}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </Modal>

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
                      <h1 className={'title'}>
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
          </div>
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

      {/* {openRequestModal&& (
        <>   <BoostrapDialog
          open={openRequestModal}
          handleClose={handleCloseRaiseRequestModal}
          showCloseIcon={false}
          customWidth={"650px"}
          overflowY={"auto"}
          children={
            <>
              {createRequestLoader && <OverlayLoding />}
              <div className={styles.raiseRequest}>
                <h3 className={styles.addUserHeader}>Raise New Ticket</h3>
                <div className={styles.addUserForm}>
                  <div className={styles.addUserInput}>
                    <div className={styles.input_text_filed}>
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
                              color: "rgba(255, 255, 255, 0.7)",
                              "& .MuiInputBase-input::placeholder": {
                                color: "rgba(255, 255, 255, 0.7)",
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
                    <p className={styles.raiseRequestSectionHeader}>
                      Upload Attachments
                    </p>
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

                  <div className={styles.btn_group}>
                    <button
                      className={styles.cancel}
                      onClick={handleCancelRaiseRequestModal}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={handleRequestSubmit}
                    >
                      Raise Request
                    </button>
                  </div>
                </div>
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
                      color: "rgb(217 18 14)",
                    },
                  }}
                  onClose={handleCloseSnackbar}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </>
          }
        />
        </>
      )} */}
      <Footer />
    </>
  );
};
export default MyOrdersNew;
