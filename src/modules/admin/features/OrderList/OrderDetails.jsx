import React, { useCallback, useEffect, useMemo, useState } from "react"
import classes from "./OrderDetails.module.css"
import classes2 from "../ManageStory/StoryLIst/MappingDetails.module.css"
import Manage from "../../assets/image/svg/manage order.svg"
import CustomButton from "../../components/UI/Button/Button"
import { useNavigate, useLocation } from "react-router-dom"
import book from "../../assets/image/jpg/dummy image 3.png"
import play from "../../assets/image/svg/play(small).svg"
import TrashIcon from "../../assets/image/svg/trash_icon.svg"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import CustomeSlecter from "../../components/UI/Dropdown/CustomeSlecter"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import MinHeightTextarea from "../../components/UI/TextArea/Textarea"
import CheckIcon from "@mui/icons-material/Check"
import OrderTrackingStepper from "../../components/OrderTrackingStepper/OrderTrackingStepper"
import CharacterDetails from "../../components/CharacterDetails/CharacterDetails"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import CustomeSlecterAdmin from "../../components/UI/Dropdown/CustomeSlecterAdmin"
import FromToDatePicker from "../../components/UI/DatePicker/FromToDatePicker"
import dayjs from "dayjs"
import { toast } from "react-toastify"
import { IconButton } from "@mui/material"
import edit from "../../assets/image/svg/edit.svg"
import OverlayLoding from "../../components/UI/Loding/OverlayLoding"
import TabBar from "../../components/UI/Tabs/Tabs"
import CustomTablePage from "../../components/UI/Table/TablePage"
import FileViewerLightbox from "../../components/UI/PdfView/Lightbox/LightboxImgPdf"
import { Modal } from "react-bootstrap"
import CloseIcon from '@mui/icons-material/Close';

export default function OrderDetails() {
  const location = useLocation()
  const { storyId } = location.state || {}
  console.log("storyId", storyId)
  const navigate = useNavigate()

  const [booksData, setBooksData] = useState([])
  const [category, setCategory] = useState("")
  const [deliveryDate, setDeliveryDate] = useState(null)
  const [statusData, setStatusData] = useState([])
  const [openAdduser, setOpenAdduser] = useState(false)
  const [openAdduser2, setOpenAdduser2] = useState(false)
  const [openAdduser3, setOpenAdduser3] = useState(false)
  const [openAdduser4, setOpenAdduser4] = useState(false)
  const [pageData, setPageData] = useState([])
  const [imgErrorPage, setImgErrorPage] = useState(null)
  const [loader, setLodaer] = useState(false)

  useEffect(() => {
    const selectedStatus = statusData.find(item => item.id === category)
    if (selectedStatus?.status?.toLowerCase() === "shipped") {
      setOpenAdduser2(true)
    }
  }, [category, statusData])

  const [formDatas, setFormDatas] = useState({
    description: "",
  })

  const [formValues, setFormValues] = useState({
    shippingPartner: "",
    awbNo: "",
    trackingLink: "",
  })

  const [errors, setErrors] = useState({
    shippingPartner: false,
    awbNo: false,
  })

  const charsLeft = formDatas.description.length

  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const {
    isLoading: statusLoading,
    success: statusSuccess,
    error: statusError,
    sendRequest: statusRequest,
  } = useApiHttp()

  const {
    isLoading: regenerateLoading,

    sendRequest: regenerate,
  } = useApiHttp()

  const handlerDeleteStory = () => {
    // navigate("/admin/storylists/upload-story")
    Swal.fire({
      title: "Are you sure?",
      text: "You will be delete this record.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        sendRequest(
          {
            url: `admin/story-management/story/delete/${storyId}`,
            method: "DELETE",
          },
          data => {
            navigate("/admin/storylists")
          }
        )
      }
    })
  }

  const handleOrorderManagementList = () => {
    sendRequest(
      {
        url: `admin/order-management/view/${storyId}`,
      },
      data => {
        setBooksData(data?.data)
        // setTrackingData(data?.data?.status_tracking)
      }
    )
  }
  const handledropdownList = () => {
    sendRequest(
      {
        url: `admin/order-management/list/update-status/${storyId}`,
      },
      data => {
        let temp = []
        data?.data?.map((item, ind) => {
          let obi = { ...item }
          if (item?.label == "Shipped" || item?.label == "Delivered") {
            obi.can_update = false
          }
          temp.push(obi)
        })
        // setStatusData(temp) // live
        setStatusData(data?.data) //dev        
      }
    )
  }

  useEffect(() => {
    handledropdownList()
  }, [])

  useEffect(() => {
    handleOrorderManagementList()
  }, [])

  const handleUpdateStatus = () => {
    if (!category) return

    let body = {
      order_status_id: category,
    }

    // If status is Shipped → add shipping info
    const selectedStatus = statusData.find(item => item.id === category)
    if (selectedStatus?.status?.toLowerCase() === "shipped") {
      body.shipping = {
        awb_number: formValues.awbNo.trim(),
        partner: formValues.shippingPartner.trim(),
        track_url: formValues.trackingLink.trim() || "",
        delivery_date: deliveryDate
      }
    }

    statusRequest(
      {
        url: `admin/order-management/update-status/${storyId}`,
        method: "POST",
        body,
      },
      data => {
        handleOrorderManagementList()
        handledropdownList()
        setCategory("")
        setFormDatas({ ...formDatas, description: "" })
        setFormValues({ shippingPartner: "", awbNo: "", trackingLink: "" }) // reset
        setDeliveryDate(null)
        setOpenAdduser2(false) // close shipping dialog if open
      }
    )
  }

  // const handleUpdateStatus = () => {
  //   if (!category) {
  //     return
  //   }
  //   sendRequest(
  //     {
  //       url: `admin/order-management/update-status/${storyId}`,
  //       method: "POST",
  //       body: {
  //         order_status_id: category,
  //         shipping: {
  //           // if status is Shipped, this should be included
  //           awb_number: "wrfwrfw",
  //           partner: "post",
  //           track_url: "", // optional
  //         },
  //       },
  //     },
  //     data => {
  //       handleOrorderManagementList()
  //       handledropdownList()
  //       setCategory("")
  //       setFormDatas({ ...formDatas, description: "" })
  //     }
  //   )
  // }

  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    setFormDatas({ ...formDatas, description: "" })
  }
  const handleClosesetOpenAddUser2 = () => {
    setOpenAdduser2(false)
    setCategory("")
  }
  const handlerCancel = () => {
    setOpenAdduser(true)
  }

  const handleChange = event => {
    const { name, value } = event.target
    const maxChar = 255
    const truncatedValue = value.slice(0, maxChar)
    setFormDatas(prev => ({ ...prev, [name]: truncatedValue }))
  }

  const hanleSumit = () => {
    formDatas.description

    sendRequest(
      {
        url: `admin/order-management/cancel/${storyId}`,
        method: "POST",
        body: {
          reason: formDatas.description,
        },
      },
      data => {
        handleOrorderManagementList()
        handledropdownList()
        setCategory("")
        setOpenAdduser(false)
      }
    )
  }

  const getStatusLabel = status => {
    if (!status || typeof status !== "string") {
      return { text: "UNKNOWN", className: "status_lable unknown" }
    }

    switch (status.toLowerCase()) {
      case "received":
        return {
          text: "ORDER RECEIVED",
          className: "status_lable received",
        }
      case "confirmed":
        return {
          text: "ORDER CONFIRMED",
          className: "status_lable confirmed",
        }
      case "shipped":
        return {
          text: "ORDER SHIPPED",
          className: "status_lable shipped",
        }
      case "printed":
        return { text: "PRINTED", className: "status_lable printing" }
      case "sent_to_qc":
        return {
          text: "SENT TO QC",
          className: "status_lable shipped",
        }
      case "qc_passed":
        return {
          text: "QC PASSED",
          className: "status_lable shipped",
        }
      case "qc_failed":
        return {
          text: "QC FAILED",
          className: "status_lable shipped",
        }
      case "delivered":
        return {
          text: "ORDER DELIVERED",
          className: "status_lable delivered",
        }
      case "cancelled":
        return {
          text: "CANCELLED",
          className: "status_lable unknown",
        }
      default:
        return { text: "UNKNOWN", className: "status_lable unknown" }
    }
  }

  const { text, className } = getStatusLabel(
    booksData?.order_details?.order_status
  )

  const handleRegeneration = () => {
    Swal.fire({
      title: "Confirm Regeneration ",
      text: "This will initiate a new Dzine Attempt",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F3C11D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        regenerate(
          {
            url: `admin/order-management/regenerate/${storyId}`,
          },
          res => {
            Swal.fire("Success!", res.message, "success")
            setTimeout(() => {
              window.location.reload()
            }, 1000)
            handleOrorderManagementList()
          }
        )
      }
    })
  }

  // useEffect(() => {
  //   if (booksData?.order_details?.order_status && statusData.length > 0) {
  //     const currentStatus = booksData.order_details.order_status.toLowerCase()
  //     const matchedStatus = statusData.find(
  //       status => status.id.toLowerCase() === currentStatus
  //     )
  //     if (matchedStatus) {
  //       setCategory(matchedStatus.id)
  //     }
  //   }
  // }, [booksData, statusData])

  const handleChangeValue = e => {
    const { id, value } = e.target
    setFormValues(prev => ({ ...prev, [id]: value }))
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: false })) // clear error on change
    }
  }

  const handleDateChange = value => {
    const newFromDate = dayjs(value).format("YYYY-MM-DD")
    setDeliveryDate(newFromDate)
  }

  const handleUpdateShippingDetails = () => {
    let body = {
      order_detail_id: openAdduser2,
      awb_number: formValues?.awbNo,
      partner: formValues?.shippingPartner,
      delivery_date: deliveryDate
    }

    if (formValues?.trackingLink) {
      body.track_url = formValues?.trackingLink
    }

    sendRequest(
      {
        url: `admin/order-management/update/shipping_details`,
        method: "POST",
        body,
      },
      data => {
        handleOrorderManagementList()
        handledropdownList()
        setCategory("")
        setFormDatas({ ...formDatas, description: "" })
        setFormValues({ shippingPartner: "", awbNo: "", trackingLink: "" }) // reset
        setDeliveryDate(null)
        setOpenAdduser2(false) // close shipping dialog if open
      }
    )
  }

  const handleSubmit = () => {
    let newErrors = {}

    if (!formValues.shippingPartner) {
      newErrors.shippingPartner = true
    }
    if (!formValues.awbNo) {
      newErrors.awbNo = true
    }

    if (!deliveryDate) {
      toast.error('Select Delivery Date')
      newErrors.delivery_date = true
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formValues)
      if (openAdduser2 == true) {
        handleUpdateStatus()
      } else {
        handleUpdateShippingDetails()
      }
    }
  }

  const handleShipingDetails = (shipping_details) => {
    setFormValues({
      awbNo: shipping_details?.awb_number,
      shippingPartner: shipping_details?.partner,
      trackingLink: shipping_details?.track_url,
    })
    setDeliveryDate(shipping_details?.delivery_date)
    setOpenAdduser2(shipping_details?.order_detail_id)
  }


  const [activeTab, setActiveTab] = useState(0)

  const onTabClick = index => {
    setActiveTab(index) // Update the active tab index
  }

  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(30)
  const [column, setColumn] = useState(0)
  const [totalReporting, setTotalReporting] = useState(0)
  const [pageErrorData, setPageErrorData] = useState([])


  const fetchPageList = useCallback(async () => {
    if (!storyId) return

    try {
      const response = await sendRequest({
        url: `admin/order-management/order-details/${storyId}`,
      })
      setPageData(response?.data || [])
      setTotalReporting(response?.data?.total_count || 0)
    } catch (error) {
      console.error("Error fetching page list:", error)
    }
  }, [sendRequest, storyId])


  useEffect(() => {
    fetchPageList()
  }, [
    page,
    perPage,
    sortDirectionData,
    fetchPageList,
  ])


  const handleErrorPopup = async (row) => {
    try {
      setLodaer(true)
      const response = await sendRequest({
        url: `admin/order-management/order-details/pages/${row?.id}`,
      })
      if (response?.status == 'success') {
        setLodaer(false)
        setPageErrorData(response?.data || [])
        setOpenAdduser3(true)
      }
    } catch (error) {
      setLodaer(false)
      console.error("Error fetching page list:", error)
    }
  }

  const handleRetry = async (row) => {
    try {
      setLodaer(true)
      const response = await sendRequest({
        url: `admin/order-management/order-details/retry-page/${row?.id}`,
      })
      console.log('response', response);

      if (response?.status == 'success') {
        setLodaer(false)
        fetchPageList()
        toast.success(response?.message)
      }

    } catch (error) {
      setLodaer(false)
      console.error("Error fetching page list:", error)
    }
  }



  // Table columns configuration (memoized)
  const MappingDetailsdata = useMemo(
    () => [
      {
        name: "S.No",
        selector: (row, inbox) => inbox + 1,
        sortable: false,
        sortField: 0,
        maxWidth: "76px",
        minWidth: "50px",
      },
      {
        name: "Page No",
        cell: row => <p>{row?.book_page?.page_number}</p>,
        maxWidth: "150px",
        minWidth: "150px",
        sortable: true,
        sortField: 7,
      },
      {
        name: "Image",
        cell: row => <div className={classes.book_boxs2}>
          <img
            role="button"
            onClick={() => { setImgErrorPage(row.page_path_url); setOpenAdduser4(true) }}
            src={row.page_path_url}
            alt="book"
          />
        </div>,
        sortable: false,
        sortField: 5,
      },
      {
        name: "Status",
        cell: row => {
          const getStatusLabel = status => {
            switch (status.toLowerCase()) {
              case "pending":
                return { text: "Pending", className: "status_lable received" }
              case "processed":
                return {
                  text: "Processed",
                  className: "status_lable confirmed",
                }
              case "partial":
                return { text: "Partial", className: "status_lable delivered" }
              case "cancelled":
                return { text: "Cancelled", className: "status_lable unknown" }
              case "failed":
                return { text: "Failed", className: "status_lable failed" }
              default:
                return { text: "UNKNOWN", className: "status_lable unknown" }
            }
          }

          const { text, className } = getStatusLabel(row.status)
          return <div className={className}>{text}</div>
        },
        sortable: false,
        sortField: 7,
        maxWidth: "190px",
        minWidth: "190px",
      },
      {
        name: "",
        cell: row => {
          return (
            <>
              {row.status == "failed" || row.status == "partial" ? <div className="action_btn">
                <button
                  className="action_edit"
                  onClick={() => {
                    handleErrorPopup(row)
                  }}
                >
                  Error
                </button>

                {/* <IconButton
                  onClick={() => deleteUserRolelistData(row.id)}
                >
                  <img src={TrashIcon} alt="edit" />
                </IconButton> */}
              </div> : null}

              {row.status == "processed" || row.status == "failed" || row.status == "partial" ?
                <div className="action_btn">
                  <button
                    className="action_retry"
                    onClick={() => {
                      handleRetry(row)
                    }}
                  >
                    Retry
                  </button>
                </div>
                : null}
            </>
          )
        },
        sortable: false,
        sortField: 7,
      },
    ],
    []
  )

  // Event handlers
  const handleSort = useCallback((column, sortDirection) => {
    setSortDirectionData(sortDirection || "DESC")
    setColumn(column.sortField || 0)
  }, [])

  const handlePageChange = useCallback(page => {
    setPage(page || 1)
  }, [])

  const handlePerRowsChange = useCallback(newPerPage => {
    setPerPage(newPerPage || 10)
  }, [])

  return (
    <>
      {statusLoading && <OverlayLoding />}
      {loader && <OverlayLoding />}
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.breadcrumb}>
          <span
            style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
            onClick={() => navigate(-1)}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              src={Manage}
              alt="Manage"
            />{" "}
            Order List
          </span>{" "}
          &gt;{" "}
          <span className={classes.active}>
            {booksData?.order_details?.order_number}
          </span>
        </div>

        <div className={classes.header_set}>
          <div className={classes.header_left}>
            <div className={classes.header_left_flex}>
              <h3>{booksData?.order_details?.order_number}</h3>
              <div className={className}>{text}</div>
            </div>

            <p>
              Ordered on {booksData?.order_details?.order_date}{" "}
              {/* {booksData?.order_details?.order_date}{" "} */}
            </p>
          </div>
          {activeTab === 0 && <div className={classes.header_right}>
            {booksData?.order_details?.can_cancel === 1 && (
              <CustomButton
                variant="contained"
                customColor="#ffffff"
                customBgColor="#f31d1d"
                custmstyle={{
                  padding: "8px 20px",
                  width: "132px",
                  fontSize: "13px",
                  borderRadius: "10px",
                }}
                onClick={() => handlerCancel()}
              >
                Cancel Order
              </CustomButton>
            )}
          </div>}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <TabBar
            tabs={[
              {
                title: "Order Details",
                render: () => (
                  <>
                    <div className={classes.header_table}>
                      <div>
                        <div className={classes.main}>
                          {/* <p className={classes.Details}>Order Details</p> */}
                          <div className={classes.Details_box}>
                            <div className={classes.Details_box_cont}>
                              <p className={classes.Details_title}>Order ID</p>
                              <p className={classes.Details_sub_title}>
                                {booksData?.order_details?.order_number}
                              </p>
                            </div>
                            <div className={classes.Details_box_cont}>
                              <p className={classes.Details_title}>User ID</p>
                              <p className={classes.Details_sub_title}>
                                {booksData?.order_details?.user_code}
                              </p>
                            </div>
                            <div className={classes.Details_box_cont}>
                              <p className={classes.Details_title}>User Name</p>
                              <p className={classes.Details_sub_title}>
                                {booksData?.order_details?.user_name}
                              </p>
                            </div>
                            <div className={classes.Details_box_cont}>
                              <p className={classes.Details_title}>Order Detail ID</p>
                              <p className={classes.Details_sub_title}>
                                {booksData?.order_details?.order_detail_id}
                              </p>
                            </div>
                            <div className={classes.Details_box_cont}>
                              <p className={classes.Details_title}>Shipping Address</p>
                              <p
                                className={classes.Details_sub_title}
                                style={{
                                  wordBreak: "unset",
                                  textTransform: "capitalize",
                                }}
                              >
                                {booksData?.order_details?.shipping_address?.contact_name},{" "}
                                {booksData?.order_details?.shipping_address?.address_line},{" "}
                                {booksData?.order_details?.shipping_address?.landmark},{" "}
                                {booksData?.order_details?.shipping_address?.state},{" "}
                                {booksData?.order_details?.shipping_address?.city} -{" "}
                                {booksData?.order_details?.shipping_address?.pincode}.
                              </p>
                              {/* <p className={classes.Details_sub_title}> </p>
                  <span className={classes.Details_sub_title}>
                    {booksData?.order_details?.shipping_address?.state},
                  </span> */}
                              {/* <p className={classes.Details_sub_title}>
                    {booksData?.order_details?.shipping_address?.city} -{" "}
                    {booksData?.order_details?.shipping_address?.pincode}.
                  </p> */}
                            </div>
                            <div className={classes.Details_box_cont}>
                              <p className={classes.Details_title}>Dzine Status</p>
                              <p
                                className={`${classes.Details_sub_title} ${classes[`dzine_${booksData?.order_details?.dzine_status}`]
                                  }`}
                              >
                                {booksData?.order_details?.dzine_status}
                              </p>
                            </div>
                          </div>
                          <>
                            {" "}
                            {booksData?.order_details?.shipping_detail && (
                              <div className={classes.left_side}>
                                <div>
                                  <div className="d-flex gap-3 align-items-center">
                                    <p className={classes.Details} style={{ margin: "0px" }}>
                                      Shipping Details
                                    </p>
                                    <IconButton
                                      onClick={() => { handleShipingDetails(booksData?.order_details?.shipping_detail) }}
                                    >
                                      <img src={edit} alt="edit" />
                                    </IconButton>
                                  </div>
                                  <div
                                    className={classes.Details_box}
                                    style={{ marginTop: "15px" }}
                                  >
                                    <div className={classes.Details_box_cont}>
                                      <p className={classes.Details_title}>Awb Number</p>
                                      <p className={classes.Details_sub_title}>
                                        {
                                          booksData?.order_details?.shipping_detail
                                            ?.awb_number
                                        }
                                      </p>
                                    </div>
                                    <div className={classes.Details_box_cont}>
                                      <p className={classes.Details_title}>Partner</p>
                                      <p className={classes.Details_sub_title}>
                                        {booksData?.order_details?.shipping_detail?.partner}
                                      </p>
                                    </div>
                                    <div className={classes.Details_box_cont}>
                                      <p className={classes.Details_title}>Track url</p>
                                      <p className={classes.Details_sub_title}>
                                        <a
                                          href={
                                            booksData?.order_details?.shipping_detail
                                              ?.track_url
                                          }
                                          target="_blank"
                                        >
                                          {
                                            booksData?.order_details?.shipping_detail
                                              ?.track_url
                                          }
                                        </a>
                                      </p>
                                    </div>
                                    <div className={classes.Details_box_cont}>
                                      <p className={classes.Details_title}>Delivery Date</p>
                                      <p className={classes.Details_sub_title}>
                                        {booksData?.order_details?.shipping_detail?.delivery_date ? dayjs(booksData?.order_details?.shipping_detail?.delivery_date).format("DD-MM-YYYY") : ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                          <>
                            {booksData?.order_details?.is_gift === 1 && (
                              <div className={classes.left_side}>
                                <div>
                                  {/* <p className={classes.Details} style={{ margin: "0px" }}>
                        Gift Details
                      </p>
                      <div
                        className={classes.Details_box}
                        style={{ marginTop: "15px" }}
                      >
                        <div className={classes.Details_box_cont}>
                          <p className={classes.Details_title}>Name</p>
                          <p className={classes.name}>
                            {booksData?.order_details?.gift?.name}
                          </p>
                        </div>
                        <div className={classes.Details_box_cont}>
                          <p className={classes.Details_title}>Number</p>
                          <p className={classes.Details_sub_title}>
                            {booksData?.order_details?.gift?.number}
                          </p>
                        </div>
                        <div className={classes.Details_box_cont}>
                          <p className={classes.Details_title}>Message</p>
                          <p className={classes.Details_sub_title}>
                            {booksData?.order_details?.gift?.message}
                          </p>
                        </div>
                      </div> */}
                                  <div className={`${classes.Details_box_cont} mb-4 mt-3`}>
                                    <p className={classes.Details_title}>Gift Message</p>
                                    <p className={classes.Details_sub_title}>
                                      {booksData?.order_details?.gift?.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                          <div className={classes.story_template_set}>
                            <div className={classes.left_side}>
                              <div>
                                <p className={classes.Details} style={{ margin: "0px" }}>
                                  Story Details
                                </p>
                                <p className={classes.Details_sub_title}>
                                  {booksData?.order_details?.book_name}(
                                  {booksData?.order_details?.gender})
                                </p>
                              </div>
                              <div className={classes.book_boxs}>
                                <img
                                  src={booksData?.order_details?.book_cover || book}
                                  alt="book"
                                />
                              </div>
                              {/* <p className={classes.Sample_Preview}>
                    {" "}
                    <img src={play} alt="play" />
                    Sample Preview
                  </p> */}
                            </div>

                            <div
                              className={classes.right_side}
                              style={
                                booksData?.order_details?.dzine_status === "failed"
                                  ? { justifySelf: "flex-end" }
                                  : {}
                              }
                            >
                              {booksData?.order_details?.dzine_status === "failed" && (
                                <CustomButton
                                  variant="contained"
                                  customColor="#000000"
                                  customBgColor="#F3C11D"
                                  custmstyle={{
                                    padding: "10px 20px",
                                    width: "131px",
                                    fontSize: "13px",
                                  }}
                                  onClick={() => handleRegeneration()}
                                >
                                  Re-Generate
                                </CustomButton>
                              )}
                            </div>
                            <div className={classes.uploadedDataSection}>
                              <div>
                                <p
                                  className={classes.Details}
                                  style={{ margin: "10px 0px" }}
                                >
                                  Upload Details
                                </p>
                              </div>
                              <section className={classes.character_image_details_section}>
                                {booksData?.order_details?.character_details?.length > 0 &&
                                  booksData?.order_details?.character_details.map(
                                    (character, index) => (
                                      <CharacterDetails
                                        key={`${character.user_name}_${index}`}
                                        character={character}
                                      />
                                    )
                                  )}
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className={classes.main}>
                          <div className={classes.Details_set}>
                            <div className={classes.priceBox}>
                              <p className={classes.Details}>Order Summary</p>
                              <p className={classes.itemss}>
                                {booksData?.price_details?.item_count || 0} Items
                              </p>
                              <div className={classes.total}>
                                <span>Sub Total</span>
                                <span className={classes.total_span}>
                                  ₹ {booksData?.price_details?.mrp}
                                </span>
                              </div>
                              <div className={classes.discount}>
                                <span>Discount</span>
                                {/* className={classes.discount_price} */}
                                <span>{booksData?.price_details?.discount_precent}</span>
                              </div>
                              <div className={classes.totalLine}>
                                <span className={classes.Details}>Total Amount</span>
                                <span className={classes.Details}>
                                  ₹ {booksData?.price_details?.total_amount}
                                </span>
                              </div>
                            </div>
                            <div className={classes.priceBox1}>
                              <p className={classes.Details}>Order Tracking Details</p>
                              <div className={classes.butns}>
                                <div className={classes.butns_set}>
                                  <CustomeSlecterAdmin
                                    data={
                                      statusData?.map(sub => ({
                                        label: sub.label,
                                        value: sub.id,
                                        can_update: sub.can_update,
                                      })) || []
                                    }
                                    lable="Update Status"
                                    title="All Status"
                                    width={"150px"}
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    borders={true}
                                  // defaultValue={booksData?.order_details?.order_status}
                                  />
                                  <CustomButton
                                    variant="contained"
                                    customColor="#000000"
                                    customBgColor="#F3C11D"
                                    custmstyle={{
                                      padding: "8px 20px",
                                      width: "140px",
                                      fontSize: "13px",
                                      borderRadius: "10px",
                                    }}
                                    onClick={() => handleUpdateStatus()}
                                    disabled={!category ? true : statusLoading ? true : false}
                                  >
                                    Update Status
                                  </CustomButton>
                                </div>
                                <p className={classes.updated}>
                                  Last updated on {booksData?.order_details?.order_date}
                                </p>
                                {/* <OrderTrackingStepper
                      statusTracking={booksData?.status_tracking || []}
                      currentStatus={booksData?.order_details?.order_status}
                    /> */}
                                <div className={classes.statusStepper}>
                                  {booksData?.status_tracking?.map((step, index) => {
                                    const isCompleted = step.completed
                                    const isLast =
                                      index === booksData.status_tracking.length - 1
                                    const currentStatus =
                                      booksData.order_details?.order_status
                                    const isCurrent = step.status === currentStatus

                                    return (
                                      <div
                                        key={step.status}
                                        className={classes.stepperItem}
                                      >
                                        <div className={classes.stepperLeft}>
                                          <div
                                            className={`${classes.stepIcon} ${isCompleted ? classes.completed : ""
                                              } ${isCurrent ? classes.current : ""}`}
                                          >
                                            {isCompleted ? (
                                              <CheckIcon className={classes.checkIcon} />
                                            ) : (
                                              <span className={classes.stepNumber}>
                                                {/* {index + 1} */}
                                              </span>
                                            )}
                                          </div>
                                          {!isLast && (
                                            <div
                                              className={`${classes.verticalLine} ${isCompleted ? classes.lineActive : ""
                                                }`}
                                            />
                                          )}
                                        </div>

                                        <div className={classes.stepperRight}>
                                          <div className={classes.statusHeader}>
                                            <h3 className={classes.statusTitle}>
                                              {step.label}
                                            </h3>
                                            {isCompleted && step.completed_at && (
                                              <span className={classes.statusDate}>
                                                {step.completed_at}
                                              </span>
                                            )}
                                          </div>

                                          {isCurrent && !isCompleted && (
                                            <div className={classes.currentStatus}>
                                              <span className={classes.statusBadge}>
                                                In Progress
                                              </span>
                                            </div>
                                          )}

                                          {step.comment && (
                                            <p className={classes.statusComment}>
                                              {step.comment}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "Order Page Details",
                render: () => (
                  <>
                    <div className={classes2.scanOut} style={{ marginBottom: "3rem" }}>
                      <div className={classes2.header_table}>
                        <div className={classes2.header_table_bo2}>
                          <div className={classes2.header_table_right}>
                            {booksData?.order_details?.dzine_status === "failed" && (
                              <CustomButton
                                variant="contained"
                                customColor="#000000"
                                customBgColor="#F3C11D"
                                custmstyle={{
                                  padding: "10px 20px",
                                  width: "131px",
                                  fontSize: "13px",
                                }}
                                onClick={() => handleRegeneration()}
                              >
                                Re-Generate
                              </CustomButton>
                            )}
                          </div>
                        </div>
                      </div>

                      <CustomTablePage
                        data={pageData}
                        columns={MappingDetailsdata}
                        loader={false}
                        onSort={handleSort}
                        paginationTotalRows={totalReporting}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        enablePagination={false}
                        subHeader={false}
                        children={false}
                        isProcessing={true}
                        processingMessage={
                          "The story pages are being processed. Please check back shortly"
                        }
                      />
                    </div>
                  </>
                ),
              },
            ]}
            onTabClick={onTabClick}
            activeTab={activeTab}
          />
        </div>


      </div>
      {openAdduser && (
        <CustomDialog
          open={openAdduser}
          handleClose={handleClosesetOpenAddUser}
          showCloseIcon={false}
          customWidth={"600px"}
          overflowY={"unset"}
          children={
            <>
              <div className="dialog_loyout">
                <h3 className="dialog_loyout_title">Cancel Order</h3>
                <div className={classes.fileds}>
                  <MinHeightTextarea
                    maxLength="255"
                    label="Cancel Reason"
                    title="Cancel Reason"
                    name="description"
                    rows={7}
                    value={formDatas.description}
                    placeholder="Enter the reason..."
                    showpertext={`${charsLeft}/255`}
                    onChange={handleChange}
                  // error={!errors.description}
                  />
                </div>
                <div className="btn_group">
                  <button
                    className="btn_cancel"
                    onClick={handleClosesetOpenAddUser}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn_submit"
                    onClick={hanleSumit}
                    disabled={!formDatas.description.trim()} // Add disabled condition
                    style={{
                      cursor: !formDatas.description.trim()
                        ? "not-allowed"
                        : "pointer",
                      opacity: !formDatas.description.trim() ? 0.7 : 1,
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          }
        />
      )}

      {openAdduser2 && (
        <CustomDialog
          open={openAdduser2}
          handleClose={handleClosesetOpenAddUser2}
          showCloseIcon={false}
          customWidth={"500px"}
          overflowY={"unset"}
          children={
            <>
              <div className="dialog_loyout">
                <h3 className="dialog_loyout_title">Shipping Details</h3>
                <div className={`${classes.fileds} ${classes.inputalin}`}>
                  <CustomTextField
                    id="shippingPartner"
                    label="Shipping Partner"
                    placeholder="Enter your Shipping Partner"
                    variant="outlined"
                    value={formValues.shippingPartner}
                    onChange={handleChangeValue}
                    error={errors.shippingPartner}
                    // helperText={errors.shippingPartner ? "Required" : ""}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ width: "100%" }}
                  />

                  <CustomTextField
                    id="awbNo"
                    label="AWB NO"
                    placeholder="Enter your AWB NO"
                    variant="outlined"
                    value={formValues.awbNo}
                    onChange={handleChangeValue}
                    error={errors.awbNo}
                    // helperText={errors.awbNo ? "Required" : ""}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ width: "100%" }}
                  />

                  <CustomTextField
                    id="trackingLink"
                    label="Tracking Link"
                    placeholder="Enter your Tracking Link"
                    variant="outlined"
                    value={formValues.trackingLink}
                    onChange={handleChangeValue}
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                  />
                  <div>
                    <FromToDatePicker
                      label={"Delivery Date"}
                      format="DD-MM-YYYY"
                      value={dayjs(deliveryDate)}
                      onChange={handleDateChange}
                      minDate={dayjs(new Date())}
                      error={false}
                      borders={false}
                      width={"50%"}
                    />
                  </div>
                </div>
                {/* <div>
                  <p className={classes.module_text}>Choose Module</p>
                  {!selectedItemsError ? "" : ""}
                  <div className={classes.checkbox_box}>
                    {moduleList.map(item => (
                      <CheckBox
                        key={item.token}
                        label={item.name}
                        checked={selectedItems.includes(item.token)} // Use item.token here
                        onChange={() => handleCheckboxToggle(item.token)}
                      />
                    ))}
                  </div>
                </div>  */}
                <div className="btn_group">
                  <button
                    className="btn_cancel"
                    onClick={handleClosesetOpenAddUser2}
                  >
                    Cancel
                  </button>
                  <button className="btn_submit" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </>
          }
        />
      )}

      <Modal show={openAdduser3}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => setOpenAdduser3(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // size="lg"
        dialogClassName="error-modal-wide"
      >
        <div className="dialog_loyout">
          <div className="d-flex ac-jb">
            <h3 className="dialog_loyout_title">Error Details</h3>
            <button
              className="border-0 bg-transparent"
              onClick={() => { setPageErrorData([]); setOpenAdduser3(false) }}
            >
              <CloseIcon />
            </button>
          </div>
          <div className={`${classes.fileds} ${classes.inputalin}`}>
            <div class="error-table-wrapper">
              <table class="table error-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Failed Message</th>
                    <th>Dzine Input</th>
                    <th>Dzine Output</th>
                  </tr>
                </thead>
                <tbody>
                  {pageErrorData?.map((item, ind) => {
                    return (<tr key={ind}>
                      <td>{ind + 1}</td>
                      <td class="failed-msg">{item?.failed_message}</td>
                      <td class="failed-msg">{item?.dzine_input}</td>
                      <td class="failed-msg">{item?.dzine_output}</td>
                    </tr>)
                  })}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </Modal>

      <Modal show={openAdduser4}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => setOpenAdduser4(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="dialog_loyout">
          <div className="d-flex ac-je">
            <button
              className="border-0 bg-transparent"
              onClick={() => { setPageErrorData([]); setOpenAdduser4(false) }}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={imgErrorPage}
              alt="error-img"
              className="img-fluid"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
