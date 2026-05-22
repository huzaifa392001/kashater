import React, { useCallback, useEffect, useRef, useState } from "react"
import styles from "./MyOrdersSet.module.css"
import img1 from "../../../assets/image/jpg/dummy image 1.jpg"
import img2 from "../../../assets/image/jpg/dummy image 2.jpg"
import img3 from "../../../assets/image/jpg/dummy image 3.jpg"
import img4 from "../../../assets/image/jpg/dummy image 4.jpg"
import Rate from "../../../assets/image/svg/review star(filled).svg"
import close_icon from "../../../assets/image/svg/close(without fill).svg"
import { Alert, Paper, Snackbar, TextField } from "@mui/material"
import useApiHttp from "../../../hooks/ues-http"
import { debounce } from "lodash"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { countApi } from "../../../services/storeSlice/addCart"
import { useDispatch } from "react-redux"
import CustomSwal from "../../../utils/customSwal"
import BoostrapDialog from "../../../components/UI/Dialog/BoostrapDialog"
import Autocomplete from "../../../components/UI/MultipleSlecter/Autocomplete"
import CustomeSlecter from "../../../components/UI/Dropdown/Select"
import MinHeightTextarea from "../../../components/UI/TextArea/Textarea"
import UploadThumbnail from "../../../components/UI/UploadThumbnail/UploadThumbnail"
import OverlayLoding from "../../../components/UI/Loding/OverlayLoding"
import useIsMobile from "../../../hooks/useIsMobile"

const MyOrdersSet = ({ searchVlue, setMyOrderCount }) => {
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

  const [formDatas, setFormDatas] = useState({
    orderId: "",
    category: "",
    description: "",
    attachments: [],
  })

  const { sendRequest: getRequestTypes } = useApiHttp()
  const { isLoading: createRequestLoader, sendRequest: createRequest } =
    useApiHttp()

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
      refCurrent.addEventListener("scroll", handleScroll)
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
        CustomSwal.successIcon({ title: "Created!", text: data.message })
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

  return (
    <>
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
      >
        {data?.map((item, index) => (
          <div className={styles.container} key={index}>
            <div className={styles.orderSummary}>
              <div className={styles.summaryRow}>
                <span>Order Placed</span>
                <span>{item?.order_date}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Total Amount</span>
                <span>₹ {item?.total_amount}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping to</span>
                <span>{item?.shipping_to}</span>
              </div>
              <div className={styles.summaryRow}>
                <div className={styles.orderId}>{item?.order_number}</div>
                <div className={styles.linkGroup}>
                  <button
                    className={styles.textButton}
                    onClick={() =>
                      navigate("/user/view_orders", {
                        state: {
                          orderId: item.id, // Your actual ID
                        },
                      })
                    }
                  >
                    View Order Details
                  </button>
                  <button
                    className={styles.textButton}
                    onClick={() => onDownloadItemClick(item?.id)}
                  >
                    Download Order Invoice
                  </button>
                </div>
              </div>
            </div>

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

              <div className={styles.orderItem_set}>
                <div className={styles.orderItem_img}>
                  {item?.book_images?.map((img, index) => (
                    <img src={img} alt="img1" key={index} />
                  ))}
                </div>
                <div className={styles.orderItem_details}>
                  <div className={styles.productTitle}>{item?.book_names}</div>
                  <div className={styles.productDetails}>
                    {item?.book_count} Books | Shipping Free
                  </div>
                  <div className={styles.buttonGroup}>
                    {/* <button
                      className={`${styles.outlineButton} ${styles.active}`}
                      onClick={() => {
                        buyItAgin(item?.id)
                      }}
                    >
                      Buy It Again
                    </button> */}
                    {item?.allow_request && (
                      <button
                        className={styles.outlineButton}
                        onClick={() => {
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
                        }}
                      >
                        Raise Request
                      </button>
                    )}

                    <button
                      className={styles.outlineButton}
                      onClick={() =>
                        navigate("/user/view_orders", {
                          state: {
                            orderId: item.id, // Your actual ID
                          },
                        })
                      }
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openRequestModal && (
        <BoostrapDialog
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
      )}
    </>
  )
}

export default MyOrdersSet
