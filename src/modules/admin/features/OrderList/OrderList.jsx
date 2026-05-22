import React, { useEffect, useState } from "react"
import classes from "./OrderList.module.css"
import CustomTable from "../../components/UI/Table/TablePage"
import Slecter from "../../components/UI/Dropdown/Select"
import SearchExpand from "../../components/UI/SearchExpand/SearchExpand"
import CustomButton from "../../components/UI/Button/Button"
import DropDownFile from "../../components/UI/DropDownFile/DropDownFile"
import FromToDatePicker from "../../components/UI/DatePicker/FromToDatePicker"
import { currentDate } from "../../utils/helper"
import dayjs from "dayjs"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import csvimage from "../../assets/image/svg/upload.svg"
import download from "../../assets/image/svg/CSVDownload.svg"
import csverror from "../../assets/image/svg/CSV Error.svg"
import tick from "../../assets/image/svg/Success.svg"
import removered from "../../assets/image/svg/Failederor.svg"
import {
  validateEmail,
  validatePhoneNumber,
  validateTextInput,
} from "../../utils/validation"
import PhoneNumInput from "../../components/UI/PhoneNumInput/PhoneNumInput"
import useInput from "../../utils/use-input"
import CustomeSlecter from "../../components/UI/Dropdown/CustomeSlecter"
import { useNavigate } from "react-router-dom"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import axios from "axios"
import FileDropBox from "../../components/UI/CsvUplode/FileDropBox"
import { Alert, Box } from "@mui/material"
import OverlayLoding from "../../components/UI/Loding/OverlayLoding"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import toast from "react-hot-toast"

const OrderList = () => {
  const { isLoading, success, error, sendRequest } = useApiHttp()
  const {
    isLoading: uplodeLoding,
    success: uplodesucces,
    error: uplodeeroro,
    sendRequest: uplodeRequest,
  } = useApiHttp()

  useEffect(() => {
    if (uplodesucces === "All records processed successfully") {
      toast.success(uplodesucces)
    }
  }, [uplodesucces])
  const {
    isLoading: setDeleteLoading,
    success: setDeleteSuccess,
    error: setDeleteError,
    sendRequest: setDeleteUserList,
  } = useApiHttp()
  const navigate = useNavigate()
  // Pagination and Sorting states for Ready To Use
  const [category, setCategory] = useState("")
  const [role, setRole] = useState("")
  const [page, setPage] = useState(1)
  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [perPage, setPerPage] = useState(10)
  const [column, setColumn] = useState(0)
  const [total, setTotal] = useState([])
  const [totalReporting, setTotalReporting] = useState(0)
  const [type, setType] = useState("")

  // Search state
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [moduleCategoryList, setModuleCategoryList] = useState([])
  const [fromDate, setFromDate] = useState(currentDate()) // Set initial from date
  const [toDate, setToDate] = useState(currentDate()) // Set initial to date

  const [openAdduser, setOpenAdduser] = useState(false)
  const [csvFile, setCsvFile] = useState(null)
  const [errorCsv, setErrorCsv] = useState("")

  const [openAdduser2, setOpenAdduser2] = useState(false)
  const [csvErrorData, setCsvErrorData] = useState({})
  const [tooltipContent, setTooltipContent] = useState("")
  console.log("csvErrorData", csvErrorData)

  useEffect(() => {
    sendRequest(
      {
        url: `admin/drop-down/order-status`,
      },
      data => {
        setModuleCategoryList(data?.data)
      }
    )
  }, [])
  const handleMouseEnter = value => {
    // Only update tooltip if needed to prevent excessive re-renders
    if (value === "enter") {
      setTooltipContent(
        "“Upload a CSV file to bulk update orders from Printed to Shipped, including shipping details. Other statuses cannot be updated using this option.”"
      )
    } else {
      setTooltipContent("")
    }
  }

  const StoryListData = [
    {
      name: "S.No",
      selector: row => row.sl_no,
      sortable: false,
      sortField: 0,
      maxWidth: "86px",
      minWidth: "50px",
    },
    {
      name: "Order ID",
      cell: row => (
        <>
          <p
            className="action_text action_text_pointer flex"
            onClick={() =>
              navigate("/admin/orderlist/order_details", {
                state: {
                  storyId: row.order_detail_id, // Your actual ID
                },
              })
            }
          >
            {row.order_number}
          </p>
        </>
      ),
      maxWidth: "190px",
      minWidth: "150px",
      sortable: false,
      sortField: 7,
    },
    {
      name: "User ID",
      selector: row => row.user_code,
      sortable: false,
      sortField: 5,
      maxWidth: "190px",
      minWidth: "150px",
    },

    {
      name: "User Name",
      selector: row => row.user_name,
      sortable: false,
      sortField: 1,
      maxWidth: "190px",
      minWidth: "170px",
    },
    {
      name: "Hero Name",
      selector: row => row.hero_name,
      sortable: false,
      sortField: 1,
      maxWidth: "190px",
      minWidth: "170px",
    },
    {
      name: "Hero DOB",
      selector: row => <div>
        {row?.dob ? dayjs(row?.dob).format("DD-MM-YYYY") : ""}
      </div>,
      sortable: false,
      sortField: 1,
      maxWidth: "190px",
      minWidth: "170px",
    },
    {
      name: "Relationship",
      selector: row => row.hero_relation,
      sortable: false,
      sortField: 1,
      maxWidth: "190px",
      minWidth: "170px",
    },
    {
      name: "Story Template",
      selector: row => `${row.book_name}(${row?.gender})`,
      sortField: 2,
      sortable: false,
      maxWidth: "200px",
      minWidth: "200px",
      wrap: true,
      style: {
        whiteSpace: "normal", // Prevents truncation
        wordBreak: "break-word", // Ensures long words wrap
      },
    },
    {
      name: "Is Gift",
      selector: row => <p>{row.is_gift === 0 ? "No" : "Yes"}</p>,
      sortField: 2,
      sortable: false,
      maxWidth: "190px",
      minWidth: "150px",
    },
    {
      name: "Ordered Date",
      selector: row => row.order_date,
      sortable: false,
      sortField: 4,
      maxWidth: "190px",
      minWidth: "150px",
    },
    {
      name: "Delivery Date",
      cell: row => (
        <div>
          {row?.shipping_detail?.delivery_date ? dayjs(row?.shipping_detail?.delivery_date).format("DD-MM-YYYY") : ""}
        </div>
      ),
      sortable: false,
      sortField: 4,
      maxWidth: "190px",
      minWidth: "150px",
    },
    {
      name: "Shipping Partner",
      selector: row => row?.shipping_detail?.partner,
      sortField: 2,
      sortable: false,
      maxWidth: "200px",
      minWidth: "200px",
      wrap: true,
      style: {
        whiteSpace: "normal", // Prevents truncation
        wordBreak: "break-word", // Ensures long words wrap
      },
    },
    {
      name: "AWB No",
      selector: row => row?.shipping_detail?.awb_number,
      sortField: 2,
      sortable: false,
      maxWidth: "200px",
      minWidth: "200px",
      wrap: true,
      style: {
        whiteSpace: "normal", // Prevents truncation
        wordBreak: "break-word", // Ensures long words wrap
      },
    },

    {
      name: "Order Status",
      cell: row => {
        const getStatusLabel = status => {
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
            case "printed":
              return { text: "PRINTED", className: "status_lable printing" }
            case "qc_failed":
              return {
                text: "QC FAILED",
                className: "status_lable shipped",
              }
            case "printing":
              return { text: "PRINTED", className: "status_lable printing" }
            case "shipped":
              return {
                text: "ORDER SHIPPED",
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

        const { text, className } = getStatusLabel(row.order_status)

        return <div className={className}>{text}</div>
      },
      sortable: false,
      sortField: 7,
      maxWidth: "190px",
      minWidth: "190px",
    },
    {
      name: "Dzine Status",
      cell: row => {
        const getStatusLabel = status => {
          switch (status.toLowerCase()) {
            case "pending":
              return {
                text: "PENDING",
                className: "status_lable received",
              }
            // case "confirmed":
            //   return {
            //     text: "Confirmed",
            //     className: "status_lable confirmed",
            //   }
            case "processing":
              return {
                text: "PROCESSING",
                className: "status_lable shipped",
              }
            // case "qc_passed":
            //   return {
            //     text: "QC PASSED",
            //     className: "status_lable shipped",
            //   }
            // case "printed":
            //   return { text: "PRINTED", className: "status_lable printing" }
            case "failed":
              return {
                text: "FAILED",
                className: "status_lable failed",
              }
            // case "printing":
            //   return { text: "PRINTED", className: "status_lable printing" }
            // case "shipped":
            //   return {
            //     text: "ORDER SHIPPED",
            //     className: "status_lable shipped",
            //   }
            case "completed":
              return {
                text: "COMPLETED",
                className: "status_lable delivered",
              }
            // case "cancelled":
            //   return {
            //     text: "CANCELLED",
            //     className: "status_lable unknown",
            //   }
            default:
              return { text: "UNKNOWN", className: "status_lable unknown" }
          }
        }

        const { text, className } = getStatusLabel(row.dzine_status)

        return <div className={className}>{text}</div>
      },
      sortable: false,
      sortField: 7,
      maxWidth: "190px",
      minWidth: "190px",
    },
  ]
  // Sorting and pagination handlers for Ready To Use table
  const handleSort = (column, sortDirection) => {
    setSortDirectionData(sortDirection || "DESC")
    setColumn(column.sortField || 0)
  }

  const handlePageChange = page => {
    setPage(page || 1)
  }

  const handlePerRowsChange = newPerPage => {
    setPerPage(newPerPage || 10)
  }

  const onDownloadItemClick = fileType => {
    const currentToken = JSON.parse(
      localStorage.getItem("adminUserData")
    )?.authToken

    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "")

    axios({
      method: "post",
      url: `${baseUrl}/admin/order-management/download`,
      data: {
        type: fileType,
        search: searchValue,
        filter: {
          category_id: category,
          from_date: "",
          to_date: "",
        },
      },
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
      responseType: "blob", // Important for binary data
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url

        // Extract the filename from the response headers (optional)
        const contentDisposition = response.headers["content-disposition"]
        let fileName = `${"management"}.${fileType}` // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1]
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"management"}.${fileType}`
        }

        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
        link.remove() // cleanup
      })
      .catch(error => {
        console.error("Error downloading the file:", error)
      })
  }
  // const csvHandleDownload = () => {
  //   const currentToken = JSON.parse(
  //     localStorage.getItem("adminUserData")
  //   )?.authToken

  //   const baseUrl = (
  //     import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
  //   ).replace(/\/$/, "")

  //   axios({
  //     method: "get",
  //     url: `${baseUrl}/admin/order-management/download`,

  //     headers: {
  //       Authorization: `Bearer ${currentToken}`,
  //     },
  //     responseType: "blob", // Important for binary data
  //   })
  //     .then(response => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]))
  //       const link = document.createElement("a")
  //       link.href = url

  //       // Extract the filename from the response headers (optional)
  //       const contentDisposition = response.headers["content-disposition"]
  //       let fileName = `${"management"}.${fileType}`

  //       if (contentDisposition) {
  //         const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
  //         if (fileNameMatch && fileNameMatch.length === 2) {
  //           fileName = fileNameMatch[1]
  //         }
  //       } else {
  //         // Fallback to using the fileType for naming the file
  //         // fileName = `${"management"}.${fileType}`
  //       }

  //       link.setAttribute("download", fileName)
  //       document.body.appendChild(link)
  //       link.click()
  //       link.remove() // cleanup
  //     })
  //     .catch(error => {
  //       console.error("Error downloading the file:", error)
  //     })
  // }
  const csvHandleDownload = async () => {
    const currentToken = JSON.parse(
      localStorage.getItem("adminUserData")
    )?.authToken

    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "")

    try {
      const response = await fetch(
        `${baseUrl}/admin/order-management/bulk/sample-csv/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Cache-Control": "no-cache",
          },
        }
      )

      if (!response.ok) throw new Error("Network response was not ok")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = "sample.csv" // fallback
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading file:", error)
    }
  }

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail)
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(validateTextInput)
  const {
    value: enteredNum,
    rawPhone,
    dialCode,
    phoneIsValid: enteredNumIsValid,
    phoneHasError: enteredNumHasError,
    reactPhoneChangeHandler: phoneNumChangeHandler,
    inputBlurHandler: phoneNumBlurHandler,
    reset: resetPhoneNum,
  } = useInput(validatePhoneNumber)

  const handlerAddAndEdit = type => {
    setType(type)
    navigate("/admin/storylists/upload-story", {
      state: { type: "edit" },
    })
  }
  const handleClearInput = () => {
    resetEmailInput()
    resetNameInput()
    resetPhoneNum()
    setRole("")
    setType("")
  }

  const viewList = () => {
    sendRequest(
      {
        url: `admin/order-management/list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          filter: {
            order_status_id: category, // active,inactive
            // from_date: "", // d-m-Y
            // to_date: "",
          },
        },
      },
      data => {
        setData(data?.data?.orders)
        setTotalReporting(data?.data?.total_count)
      }
    )
  }
  useEffect(() => {
    viewList()
  }, [page, perPage, searchValue, category, fromDate, toDate])

  const handleUpload = () => {
    if (!csvFile) {
      return
    }
    const formData = new FormData()
    formData.append("csv", csvFile)
    uplodeRequest(
      {
        url: `admin/order-management/bulk/shipping`,
        method: "post",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      },
      data => {
        if (data?.data?.status === "fail") {
          setOpenAdduser(false)
          setTimeout(() => {
            setOpenAdduser2(true)
          }, 500)
          setCsvFile(null)
          setCsvErrorData(data?.data)
          setTooltipContent("")
        } else {
          viewList()
          setOpenAdduser(false)
          setCsvFile(null)
          setTooltipContent("")
          setCsvErrorData({})
        }
      }
    )
  }

  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    setErrorCsv("")
    setCsvFile(null)
  }
  const handleClosesetOpenAddUser2 = () => {
    setOpenAdduser2(false)
    setCsvErrorData({})
  }

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Order List</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>{totalReporting} Orders</p>
              <Slecter
                data={
                  moduleCategoryList?.map(sub => ({
                    label: sub.name,
                    value: sub.id,
                  })) || []
                }
                label="Choose Orders"
                title="All Orders"
                width={"170"}
                value={category}
                onChange={e => setCategory(e.target.value)}
              // borders={true}
              />
            </div>
            <div className={classes.header_table_right}>
              <CustomButton
                variant="contained"
                customColor="#000000"
                customBgColor="#F3C11D"
                custmstyle={{
                  padding: "5px 10px",
                  // width: "120px",
                  fontSize: "13px",
                }}
                onClick={() => setOpenAdduser(true)}
                onMouseEnter={() => handleMouseEnter("enter")}
                onMouseLeave={() => handleMouseEnter("leave")}
                data-tooltip-id="tab-tooltip"
                data-tooltip-content={tooltipContent} // ✅ attach content directly
              >
                Upload Shipping CSV
              </CustomButton>
              <Tooltip
                id="tab-tooltip"
                place="top"
                className={classes.tooltipBox}
              />
              <DropDownFile handleFileDownload={onDownloadItemClick} />
              <div className={classes.filters}></div>
              <SearchExpand
                placeholder="Search Story..."
                onSearchChange={value => setSearchValue(value)}
                searchValue={searchValue}
                maxWidth="500px"
              />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: " 2rem" }}>
          <CustomTable
            data={data}
            columns={StoryListData}
            loader={false}
            onSort={handleSort}
            paginationTotalRows={totalReporting}
            paginationServer
            pagination={totalReporting > perPage} // Only enable when needed
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            // subHeader={false}
            children={false}
          />
        </div>
      </div>
      {openAdduser && (
        <CustomDialog
          open={openAdduser}
          handleClose={handleClosesetOpenAddUser}
          showCloseIcon={false}
          customWidth={"530px"}
          overflowY={"unset"}
          children={
            <>
              <div className="dialog_loyout">
                <h3 className="dialog_loyout_title">Upload CSV</h3>
                <div className={`${classes.fileds} ${classes.inputalin}`}>
                  <div
                    className={classes.downlod_csv}
                    style={{ marginBottom: "10px" }}
                  >
                    <p>Upload CSV File</p>
                  </div>

                  <FileDropBox
                    onFileSelect={file => setCsvFile(file)}
                    title="Select a CSV file to upload"
                    subtitle="or drag and drop it here"
                    icon={csvimage}
                    maxSize={10 * 1024 * 1024}
                    onError={msg => setErrorCsv(msg)}
                    sx={{ height: "265px" }}
                  />
                  {errorCsv && (
                    <Box width="100%" sx={{ color: "red" }}>
                      {errorCsv}
                    </Box>
                  )}
                  <div className={classes.downlod_csv}>
                    <p>
                      Note:CSV structure should match the sample provided
                      Download the sample file here.
                    </p>
                    <div
                      className={classes.downlod_csv_button}
                      onClick={csvHandleDownload}
                    >
                      <img src={download} alt="download" />
                      <p>Download CSV</p>
                    </div>
                  </div>
                </div>

                <div className="btn_group">
                  <button
                    className="btn_cancel"
                    onClick={handleClosesetOpenAddUser}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!csvFile}
                    className="btn_submit"
                    onClick={handleUpload}
                  >
                    Upload
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
          customWidth={"530px"}
          overflowY={"unset"}
          children={
            <>
              <div className="dialog_loyout">
                <div className={`${classes.fileds} ${classes.inputalin}`}>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <img src={csverror} alt="csverror" />
                    <p className={classes.title_alert}>CSV Error Alert!</p>
                  </div>

                  <p
                    className={classes.sub_title}
                    style={{ marginTop: "15px" }}
                  >
                    Error Importing CSV File
                  </p>
                  <div
                    className={classes.item_check}
                    style={{ marginTop: "12px" }}
                  >
                    <div
                      className={classes.item_check_set}
                      style={{ marginTop: "5px" }}
                    >
                      <img src={tick} alt="csverror" />
                      <p className={classes.sub_title_alert}>
                        {csvErrorData?.updated_count} out of{" "}
                        {csvErrorData?.total_count} item codes successfully
                        validated
                      </p>
                    </div>
                    <div
                      className={classes.item_check_set}
                      style={{ marginTop: "5px" }}
                    >
                      <img src={removered} alt="csverror" />
                      <p className={classes.sub_title_alert}>
                        {csvErrorData?.rejected_count} out of{" "}
                        {csvErrorData?.total_count} item codes were not imported
                        due to incorrect data.
                      </p>
                    </div>
                  </div>

                  <p
                    className={classes.sub_title_alert}
                    style={{ marginTop: "20px", marginBottom: "10px" }}
                  >
                    The following item codes are not valid and will be dropped
                    if you proceed.{" "}
                  </p>
                  <div className={classes.iteme_code_box}>
                    <h5>Item Code</h5>
                    <p>{csvErrorData?.rejected_records.join(", ")}</p>
                  </div>
                </div>

                <div className="btn_group">
                  <button
                    className="btn_submit"
                    onClick={handleClosesetOpenAddUser2}
                  >
                    Okay
                  </button>
                </div>
              </div>
              {uplodeLoding && <OverlayLoding />}
            </>
          }
        />
      )}
    </>
  )
}

export default OrderList
