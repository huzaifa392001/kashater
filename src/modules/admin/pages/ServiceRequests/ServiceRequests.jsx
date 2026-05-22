import React, { useEffect, useState } from "react"
import classes from "./ServiceRequests.module.css"
import CustomTable from "../../components/UI/Table/TablePage"
import Slecter from "../../components/UI/Dropdown/Select"
import SearchExpand from "../../components/UI/SearchExpand/SearchExpand"
import CustomButton from "../../components/UI/Button/Button"
import DropDownFile from "../../components/UI/DropDownFile/DropDownFile"
import FromToDatePicker from "../../components/UI/DatePicker/FromToDatePicker"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import PhoneNumInput from "../../components/UI/PhoneNumInput/PhoneNumInput"
import CustomeSlecter from "../../components/UI/Dropdown/CustomeSlecter"
import { useDispatch } from "react-redux"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import CheckBox from "../../components/UI/Checkbox/Checkbox/CheckBox"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { currentDate } from "../../utils/helper"

const ServiceRequests = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  // Pagination and Sorting states for Ready To Use
  const [page, setPage] = useState(1)
  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [perPage, setPerPage] = useState(10)
  const [column, setColumn] = useState(0)
  const [total, setTotal] = useState([])
  const [totalReporting, setTotalReporting] = useState(0)

  // Search state
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([
    {
      sl_no: 1,
      request_id: "#SSSS1",
      user_id: "#user1",
      id: "#1",
      name: "Hi",
      submission_date: "12-June-2025",
      status: "new",
      service_request_type: "Video",
      content:
        "https://dq05hwkvtjwyy.cloudfront.net/users/01jsnr1vtfzaf7svw28jw8a466/orders/01jv98apf4etfsgxd6e60d7ae3/20250602145118_Video-1Min.mp4",
    },
    {
      sl_no: 2,
      request_id: "#SSSS2",
      user_id: "#user2",
      id: "#2",
      name: "Hi",
      submission_date: "12-June-2025",
      status: "in progress",
      service_request_type: "Video",
      content: "nothing",
    },
    {
      sl_no: 3,
      request_id: "#SSSS3",
      user_id: "#user3",
      id: "#3",
      name: "Hi",
      submission_date: "12-June-2025",
      status: "rejected",
      service_request_type: "Testimony",
      content:
        "I recently received my order and faced some issues with the product. The quality didn’t meet my expectations, and I experienced some difficulties while using it.I would appreciate it if you could look into this and provide a resolution. Looking forward to your support.",
    },
    {
      sl_no: 4,
      request_id: "#SSSS4",
      user_id: "#user4",
      id: "#4",
      name: "Hi",
      submission_date: "12-June-2025",
      status: "resolved",
      service_request_type: "Testimony",
      content:
        "I recently received my order and faced some issues with the product. The quality didn’t meet my expectations, and I experienced some difficulties while using it.I would appreciate it if you could look into this and provide a resolution. Looking forward to your support.",
    },
  ])

  //Dropdwn filter
  const [status, setStatus] = useState("")

  // Date Change
  const [fromDate, setFromDate] = useState(currentDate()) // Set initial from date
  const [toDate, setToDate] = useState(currentDate()) // Set initial to date
  const handleFromDateChange = value => {
    const newFromDate = dayjs(value).format("YYYY-MM-DD")
    setFromDate(newFromDate)

    // Automatically set "toDate" to be the same or after "fromDate"
    if (dayjs(newFromDate).isAfter(toDate)) {
      setToDate(newFromDate)
    }
  }
  const handleToDateChange = value => {
    const newToDate = dayjs(value).format("YYYY-MM-DD")
    setToDate(newToDate)
  }

  //modal variables
  const [openDetailsModal, setOpenDetailsModal] = useState(false)
  const [detailsData, setDetailsData] = useState({ data: {}, checkBox: null })

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false)
    setDetailsData({ data: {}, checkBox: null })
  }

  const serviceRequestsColumn = [
    {
      name: "S.No",
      selector: row => row.sl_no,
      sortable: false,
      sortField: 0,
      maxWidth: "76px",
      minWidth: "50px",
    },
    {
      name: "Request ID",
      cell: row => (
        <>
          <p
            className="action_text flex"
            style={{ color: "#1D85F3" }}
            onClick={() => {
              navigate("/admin/service-request/details", {
                state: {
                  requestId: row.id,
                  code: row.request_id,
                },
              })
            }}
          >
            {row.request_id}
          </p>
        </>
      ),
      maxWidth: "150px",
      minWidth: "150px",
      sortable: true,
      sortField: 7,
    },
    {
      name: "User ID",
      selector: row => row.user_id,
      sortable: false,
      sortField: 5,
      maxWidth: "150px",
      minWidth: "150px",
      wrap: true,
      style: {
        whiteSpace: "normal", // Prevents truncation
        wordBreak: "break-word", // Ensures long words wrap
      },
    },
    {
      name: "User name",
      selector: row => row.name,
      sortable: false,
      sortField: 5,
      maxWidth: "200px",
      minWidth: "200px",
      wrap: true,
      style: {
        whiteSpace: "normal", // Prevents truncation
        wordBreak: "break-word", // Ensures long words wrap
      },
    },

    {
      name: "Category",
      selector: row => row.service_request_type,
      sortable: false,
      sortField: 1,
      maxWidth: "150px",
      minWidth: "150px",
    },
    // {
    //   name: "Email Address",
    //   selector: row => row.email,
    //   sortable: false,
    //   sortField: 5,
    //   maxWidth: "300px",
    //   minWidth: "300px",
    //   wrap: true,
    //   style: {
    //     whiteSpace: "normal", // Prevents truncation
    //     wordBreak: "break-word", // Ensures long words wrap
    //   },
    // },
    // {
    //   name: "Current Plan",
    //   selector: row => row.current_plan,
    //   sortField: 2,
    //   sortable: false,
    //   maxWidth: "150px",
    //   minWidth: "150px",
    //   wrap: true,
    //   style: {
    //     whiteSpace: "normal", // Prevents truncation
    //     wordBreak: "break-word", // Ensures long words wrap
    //   },
    // },
    {
      name: "Submission Date",
      selector: row => row.submission_date,
      sortable: false,
      sortField: 4,
      // maxWidth: "150px",
      // minWidth: "150px",
    },

    {
      name: "Status",
      selector: row => {
        const getStatusClass = status => {
          if (status === "in progress" || status === "in_progress")
            return "blue"
          if (status === "resolved") return "active"
          if (status === "rejected") return "inactive"
          return "pending"
        }

        return (
          <p
            className={`bagestatus ${getStatusClass(row.status)}`}
            style={{ width: "110px" }}
          >
            {row.status}
          </p>
        )
      },
      sortField: 3,
      sortable: false,
      // maxWidth: "200px",
      // minWidth: "200px",
      wrap: true,
      style: {
        whiteSpace: "normal", // Prevents truncation
        wordBreak: "break-word", // Ensures long words wrap
      },
    },
    // {
    //   name: "",
    //   cell: row => (
    //     <>
    //       <div className="action_btn">
    //         <button
    //           className="action_edit"
    //           onClick={() => handlerAddAndEdit("edit", row)}
    //         >
    //           Edit
    //         </button>
    //         <button
    //           className="action_delete"
    //           onClick={() => deleteUserRolelistData(row.id)}
    //         >
    //           Delete
    //         </button>
    //       </div>
    //     </>
    //   ),
    //   sortable: false,
    //   sortField: 7,
    // },
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

  const slectdata = [
    {
      name: "Pending",
      token: "pending",
    },
    {
      name: "In Progress",
      token: "in_progress",
    },
    {
      name: "Resolved",
      token: "resolved",
    },
    {
      name: "Rejected",
      token: "rejected",
    },
  ]

  const onDownloadItemClick = fileType => {
    const currentToken = JSON.parse(
      localStorage.getItem("adminUserData")
    )?.authToken

    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "")

    axios({
      method: "post",
      url: `${baseUrl}/admin/review-feedback/service-list-download`,
      data: {
        file_type: fileType,
        search: searchValue,
        status: status,
        page: page,
        per_page: perPage,
        sort_dir: "",
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
        let fileName = `${"Service-List"}.${fileType}` // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1]
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"Service-List"}.${fileType}`
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

  const viewList = () => {
    sendRequest(
      {
        url: `admin/review-feedback/service-list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          status: status, // approved,pending,rejected
          from_date: fromDate,
          to_date: toDate,
          sort_column: "",
          // "file_type":"pdf",
          sort_dir: "",
        },
      },
      data => {
        setData(data?.data?.aaData || [])
        setTotalReporting(data?.data?.iTotalRecords || 0)
      }
    )
  }

  useEffect(() => {
    viewList()
  }, [page, perPage, searchValue, status, fromDate, toDate])

  const handleCheckboxToggle = value => {
    setDetailsData(prev => ({
      ...prev,
      checkBox: detailsData.checkBox !== value ? value : "",
    }))
  }
  const handleSubmit = () => {}

  const getMimeTypeViaFetch = async url => {
    const res = await fetch(url)
    const blob = await res.blob()
    return blob.type
  }

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Service Requests</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>{totalReporting} Requests</p>
              {/* <Slecter
                                data={
                                    selectType?.map(sub => ({
                                        label: sub.name,
                                        value: sub.token,
                                    })) || []
                                }
                                label="Choose Type"
                                title="All Types"
                                width={"170"}
                                value={type}
                                onChange={e => setType(e.target.value)}
                            // borders={true}
                            /> */}
              <Slecter
                data={
                  slectdata?.map(sub => ({
                    label: sub.name,
                    value: sub.token,
                  })) || []
                }
                label="Choose Status"
                title="All Status"
                width={"170"}
                value={status}
                onChange={e => setStatus(e.target.value)}
                // borders={true}
              />

              <FromToDatePicker
                label={"From Date"}
                format="DD-MM-YYYY"
                value={dayjs(fromDate)}
                onChange={handleFromDateChange}
                error={false}
                borders={false}
                width={"0px"}
                height={"30px"}
              />

              <FromToDatePicker
                label={"To Date"}
                format="DD-MM-YYYY"
                value={dayjs(toDate)}
                minDate={dayjs(fromDate)}
                onChange={handleToDateChange}
                disabled={!fromDate}
                error={false}
                borders={false}
                width={"0px"}
                height={"40px"}
              />
            </div>
            <div className={classes.header_table_right}>
              <DropDownFile handleFileDownload={onDownloadItemClick} />
              <div className={classes.filters}></div>
              <SearchExpand
                placeholder="Search List..."
                onSearchChange={value => setSearchValue(value)}
                searchValue={searchValue}
                maxWidth="500px"
              />

              {/* <CustomButton
                variant="contained"
                customColor="#000000"
                customBgColor="#F3C11D"
                custmstyle={{
                  padding: "5px 2px",
                  width: "120px",
                  fontSize: "13px",
                }}
                onClick={() => handlerAddAndEdit("add")}
              >
                Add New User
              </CustomButton> */}
            </div>
          </div>
        </div>
        <CustomTable
          data={data}
          columns={serviceRequestsColumn}
          loader={false}
          onSort={handleSort}
          paginationTotalRows={totalReporting}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          subHeader={false}
          children={false}
        />
      </div>
      {openDetailsModal && (
        <CustomDialog
          open={openDetailsModal}
          handleClose={handleCloseDetailsModal}
          showCloseIcon={false}
          customWidth={"600px"}
          overflowY={"unset"}
          children={
            <>
              <div className="dialog_loyout">
                <h3 className="dialog_loyout_title">
                  {detailsData?.data?.code || "Details"}
                </h3>
                <div className={classes.dialog_loyout_main}>
                  <div>
                    <p className={classes.details_modal_field}>User ID</p>
                    <p className={classes.details_modal_values}>
                      {" "}
                      {detailsData?.data?.code || ""}
                    </p>
                  </div>
                  <div>
                    <p className={classes.details_modal_field}>User Name</p>
                    <p className={classes.details_modal_values}>
                      {detailsData?.data?.name || ""}
                    </p>
                  </div>
                  <div>
                    <p className={classes.details_modal_field}>Type</p>
                    <p className={classes.details_modal_values}>
                      {detailsData?.data?.type || ""}
                    </p>
                  </div>
                  <div>
                    <p className={classes.details_modal_field}>
                      Submission Date
                    </p>
                    <p className={classes.details_modal_values}>
                      {detailsData?.data?.submission_date || ""}
                    </p>
                  </div>
                </div>
                <div style={{ marginBottom: "40px", marginTop: "20px" }}>
                  <p
                    className={classes.details_modal_field}
                    style={{ marginBottom: "10px" }}
                  >
                    {detailsData?.data?.type === "Video"
                      ? "Video"
                      : "Testimony"}
                  </p>
                  {detailsData?.data?.type === "Video" ? (
                    <>
                      <div
                        className={`${classes.filePreview}`}
                        style={{ width: "450px", height: "300px" }}
                        key={"video_preview_1"}
                      >
                        <div className={`${classes.videoPreview} box_sizeing`}>
                          <video
                            controls
                            style={{ width: "100%", height: "300px" }}
                          >
                            <source
                              src={detailsData?.data?.content}
                              // {...(getMimeTypeViaFetch(detailsData?.data?.content)
                              //     ? { type: getMimeTypeViaFetch(detailsData.data.content) }
                              //     : {})}
                              // type={file.file.type}
                            />
                            Your browser does not support video playback.
                          </video>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p style={{ fontWeight: "800", fontSize: "14px" }}>
                      {detailsData?.data?.content || ""}
                    </p>
                  )}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <p
                    className={classes.details_modal_field}
                    style={{ marginBottom: "10px" }}
                  >
                    Action
                  </p>
                  {detailsData?.data?.status === "pending" ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <CheckBox
                        label={`Approve`}
                        checked={detailsData?.checkBox === "approve"}
                        onChange={() => handleCheckboxToggle("approve")}
                      />
                      <CheckBox
                        label={`Reject`}
                        checked={detailsData?.checkBox === "reject"}
                        onChange={() => handleCheckboxToggle("reject")}
                      />
                    </div>
                  ) : (
                    <p
                      className={`bagestatus ${
                        detailsData?.data?.status === "rejected"
                          ? "inactive"
                          : "active"
                      }`}
                    >
                      {detailsData?.data?.status}
                    </p>
                  )}
                </div>

                <div className="btn_group">
                  <button
                    className="btn_cancel"
                    onClick={handleCloseDetailsModal}
                  >
                    {detailsData?.data?.status === "pending"
                      ? "Cancel"
                      : "Okay"}
                  </button>
                  {detailsData?.data?.status === "pending" && (
                    <button className="btn_submit" onClick={handleSubmit}>
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </>
          }
        />
      )}
    </>
  )
}

export default ServiceRequests
