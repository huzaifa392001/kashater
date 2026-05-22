import React, { useEffect, useState } from "react"
import classes from "./VideosTestimonials.module.css"
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

const VideosTestimonials = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()
  const { sendRequest: setAcceptanceState } = useApiHttp()

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
      code: "#SSSS1",
      id: "#1",
      name: "Hi",
      submission_date: "12-June-2025",
      status: "pending",
      type: "Video",
      content:
        "https://dq05hwkvtjwyy.cloudfront.net/users/01jsnr1vtfzaf7svw28jw8a466/orders/01jv98apf4etfsgxd6e60d7ae3/20250602145118_Video-1Min.mp4",
    },
    {
      sl_no: 2,
      code: "#SSSS2",
      id: "#2",
      name: "Hi",
      submission_date: "12-June-2025",
      status: "approved",
      type: "Video",
      content: "nothing",
    },
    {
      sl_no: 3,
      code: "#SSSS3",
      id: "#3",
      name: "Hi",
      submission_date: "12-June-2025",
      status: "rejected",
      type: "Testimony",
      content:
        "I recently received my order and faced some issues with the product. The quality didn’t meet my expectations, and I experienced some difficulties while using it.I would appreciate it if you could look into this and provide a resolution. Looking forward to your support.",
    },
  ])

  //Dropdwn filter
  const [status, setStatus] = useState("")
  const [type, setType] = useState("")

  //modal variables
  const [openDetailsModal, setOpenDetailsModal] = useState(false)
  const [detailsData, setDetailsData] = useState({ data: {}, checkBox: null })

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false)
    setDetailsData({ data: {}, checkBox: null })
  }

  const videosTestimonialsData = [
    {
      name: "S.No",
      selector: row => row.sl_no,
      sortable: false,
      sortField: 0,
      maxWidth: "76px",
      minWidth: "50px",
    },
    {
      name: "User ID",
      cell: row => (
        <>
          <p
            className="action_text flex"
            style={{ color: "#1D85F3" }}
            onClick={() => {
              setDetailsData(prev => ({ ...prev, data: row }))
              setOpenDetailsModal(true)
            }}
          >
            {row.code}
          </p>
        </>
      ),
      maxWidth: "150px",
      minWidth: "150px",
      sortable: true,
      sortField: 7,
    },
    {
      name: "User Name",
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
      name: "Type",
      selector: row => row.type,
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
      maxWidth: "150px",
      minWidth: "150px",
    },

    {
      name: "Status",
      selector: row => {
        const getStatusClass = status => {
          if (status === "approved") return "active"
          if (status === "rejected") return "inactive"
          return "pending"
        }

        return (
          <p className={`bagestatus ${getStatusClass(row.status)}`}>
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
      name: "Approved",
      token: "approved",
    },
    {
      name: "Rejected",
      token: "rejected",
    },
  ]

  const selectType = [
    {
      name: "Videos",
      token: "video",
    },
    {
      name: "Testimonials",
      token: "testimony",
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
      url: `${baseUrl}/admin/feedback-management/videos-testimonial/video-testimonial-list-download`,
      data: {
        file_type: fileType,
        search: searchValue,
        status: status,
        type: type, // videos, testimonials
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
        let fileName = `${"videosNtestimonials-List"}.${fileType}` // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1]
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"videosNtestimonials-List"}.${fileType}`
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
        url: `admin/feedback-management/videos-testimonial/video-testimonial-list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          status: status, // approved,pending,rejected
          type: type, //videos, testimonials
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
  }, [page, perPage, searchValue, status, type])

  const handleCheckboxToggle = value => {
    setDetailsData(prev => ({
      ...prev,
      checkBox: detailsData.checkBox !== value ? value : "",
    }))
  }
  const handleSubmit = () => {
    setAcceptanceState(
      {
        url: `admin/feedback-management/videos-testimonial/update-status`,
        method: "POST",
        body: {
          id: detailsData?.data?.id || "",
          status: detailsData.checkBox === "approve" ? 1 : 2,
        },
      },
      () => {
        handleCloseDetailsModal()

        Swal.fire({
          title: "Success",
          text: `Content ${
            detailsData.checkBox === "approve" ? "approved" : "rejected"
          }!`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          viewList()
        })
      }
    )
  }

  const getMimeTypeViaFetch = async url => {
    const res = await fetch(url)
    const blob = await res.blob()
    return blob.type
  }

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Videos and Testimonials</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>
                {totalReporting} Transactions
              </p>
              <Slecter
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
              />
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

              {/* <FromToDatePicker
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
              /> */}
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
          columns={videosTestimonialsData}
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
          overflowY={"auto"}
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
                    <button
                      className="btn_submit"
                      disabled={detailsData.checkBox === null}
                      onClick={handleSubmit}
                    >
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

export default VideosTestimonials
