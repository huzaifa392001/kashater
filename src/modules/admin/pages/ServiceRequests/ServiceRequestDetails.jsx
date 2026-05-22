// import React, { useEffect, useMemo, useState } from "react"
// import classes from "./ServiceRequestDetails.module.css"
// import Manage from "../../assets/image/svg/UserList.svg"
// import CustomButton from "../../components/UI/Button/Button"
// import { useNavigate, useLocation } from "react-router-dom"
// import book from "../../assets/image/jpg/dummy image 3.png"
// import play from "../../assets/image/svg/play(small).svg"
// import profile from "../../assets/image/svg/profile(grey).svg"
// import useApiHttp from "../../hooks/ues-http"
// import Swal from "sweetalert2"
// import TabBar from "../../components/UI/Tabs/Tabs"
// import CustomeSlecter from "../../components/UI/Dropdown/CustomeSlecter"
// import { Button } from "@mui/material"
// import { method } from "lodash"
// import FileViewerLightbox from "../../components/UI/PdfView/Lightbox/LightboxImgPdf"
// import CustomDialog from "../../components/UI/Dialog/Dialog"
// import MinHeightTextarea from "../../components/UI/TextArea/Textarea"

// export default function ServiceRequestDetails() {
//   const location = useLocation()
//   const { requestId, code } = location.state || {}
//   console.log("requestId", requestId)
//   const navigate = useNavigate()

//   const [requestData, setRequestData] = useState({})
//   console.log("requestData", requestData)
//   const [openAdduser, setOpenAdduser] = useState(false)
//   const [bannerText, setBannerText] = useState("")
//   const charsLeft = bannerText.length
//   const {
//     isLoading: sendLoading,
//     success: sendSuccess,
//     error: sendError,
//     sendRequest: sendRequest,
//   } = useApiHttp()

//   const {
//     // isLoading: sendLoading,
//     // success: sendSuccess,
//     // error: sendError,
//     sendRequest: updateRequestStatus,
//   } = useApiHttp()

//   const slectdata = [
//     {
//       label: "Pending",
//       value: "pending",
//       can_update: true,
//     },
//     {
//       label: "In Progress",
//       value: "in_progress",
//       can_update: true,
//     },
//     {
//       label: "Resolved",
//       value: "resolved",
//       can_update: true,
//     },
//     {
//       label: "Rejected",
//       value: "rejected",
//       can_update: true,
//     },
//   ]
//   const [status, setStatus] = useState("")

//   const getStatusClass = status => {
//     if (status === "in progress" || status === "in_progress") return "blue"
//     if (status === "resolved") return "active"
//     if (status === "rejected") return "inactive"
//     return "pending"
//   }

//   const getStatusName = status => {
//     if (status === "in progress" || status === "in_progress")
//       return "In Progress"
//     if (status === "resolved") return "Resolved"
//     if (status === "rejected") return "Rejected"
//     return "Pending"
//   }

//   console.log("status", status)
//   const getDetails = () => {
//     sendRequest(
//       {
//         url: `admin/feedback-management/service-request/view/${requestId}`,
//       },
//       data => {
//         setRequestData(data?.data)
//       }
//     )
//   }

//   const statusUpdateHandler = () => {
//     if (status === requestData?.status) {
//       Swal.fire({
//         title: "No Changes Made",
//         text: "Please select a different status to update.",
//         icon: "info",
//         confirmButtonText: "OK",
//       })
//       return
//     }
//     updateRequestStatus(
//       {
//         url: `admin/feedback-management/service-request/service-update-status`,
//         method: "POST",
//         body: {
//           status: status,
//           comment: bannerText,
//           id: requestId,
//         },
//       },
//       () => {
//         Swal.fire({
//           title: "Status Updated Successfully",
//           icon: "success",
//           confirmButtonText: "OK",
//           customClass: {
//             popup: "my-swal-popup",
//           },
//         }).then(() => {
//           setBannerText("")
//           getDetails()
//         })
//       }
//     )
//   }

//   const updatedStatusOptions = useMemo(() => {
//     if (!requestData?.status) return slectdata || []

//     let canUpdate = false
//     return slectdata?.map(statusItem => {
//       if (statusItem.value === requestData.status) {
//         canUpdate = true
//       }
//       return {
//         ...statusItem,
//         can_update: canUpdate,
//       }
//     })
//   }, [requestData?.status, slectdata])

//   useEffect(() => {
//     getDetails()
//   }, [requestId])

//   useEffect(() => {
//     setStatus(requestData?.status)
//   }, [requestData?.status])

//   const handleClearInput = () => {}

//   const handleClosesetOpenAddUser = () => {
//     setOpenAdduser(false)
//     handleClearInput()
//   }
//   useEffect(() => {
//     if (status === "resolved" || status === "rejected") {
//       setOpenAdduser(true)
//     }
//   }, [status])
//   const handleChange = event => {
//     const { name, value } = event.target
//     const maxChar = 500
//     const truncatedValue = value.slice(0, maxChar)
//     setBannerText(truncatedValue)
//   }

//   return (
//     <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
//       <div className={classes.breadcrumb}>
//         <span
//           style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
//           onClick={() => navigate(-1)}
//         >
//           <img
//             style={{ width: "20px", height: "20px" }}
//             src={Manage}
//             alt="Manage"
//           />{" "}
//           Service Requests
//         </span>{" "}
//         &gt; <span className={classes.active}>{code}</span>
//       </div>

//       <div className={classes.header_table}>
//         <div className={classes.header_set}>
//           <div className={classes.header_left}>
//             <h3>{requestData?.user_name || "Name"}</h3>
//             <p style={{ color: "black" }}>{code}</p>
//           </div>
//         </div>

//         <div className={classes.header_right}>
//           <div className={classes.header_profile}>
//             <div>
//               <img
//                 className={classes.profile_image}
//                 src={requestData?.profile_image || profile}
//                 alt={requestData?.user_name}
//               />
//             </div>
//             <div className={classes._profile_deils_set}>
//               <div className={classes._profile_deils}>
//                 <h3 style={{ color: "black" }}>
//                   {requestData?.user_name || "name"}
//                 </h3>
//                 <p
//                   className={`bagestatus ${getStatusClass(
//                     requestData?.status
//                   )}`}
//                   style={{ width: "110px" }}
//                 >
//                   {getStatusName(requestData?.status) || "Pending"}
//                 </p>
//               </div>
//               <p>{`${requestData?.email} | ${requestData?.mobile}`}</p>
//             </div>
//           </div>
//           {requestData?.status !== "resolved" &&
//             requestData?.status !== "rejected" && (
//               <div>
//                 <span style={{ verticalAlign: "super", marginRight: "10px" }}>
//                   <CustomeSlecter
//                     data={updatedStatusOptions}
//                     label="Update Status"
//                     title="Choose Status"
//                     width={"170"}
//                     value={status}
//                     onChange={e => setStatus(e.target.value)}
//                     borders={true}
//                   />
//                 </span>
//                 <CustomButton
//                   variant="contained"
//                   customColor="black"
//                   customBgColor="#f3c11d"
//                   custmstyle={{
//                     padding: "5px 20px",
//                     //   width: "131px",
//                     fontSize: "14px",
//                     borderRadius: "8px",
//                   }}
//                   onClick={statusUpdateHandler}
//                 >
//                   Update Status
//                 </CustomButton>
//               </div>
//             )}
//         </div>
//         <div style={{ maxWidth: "60%" }}>
//           <p
//             style={{ fontWeight: "700", marginTop: "20px" }}
//             className={classes.Details}
//           >
//             Order Details
//           </p>
//           <div className={classes.dialog_loyout_main}>
//             <div>
//               <p className={classes.details_modal_field}>Order ID</p>
//               <p className={classes.details_modal_values}>
//                 {" "}
//                 {requestData?.order_number || ""}
//               </p>
//             </div>
//             <div>
//               <p className={classes.details_modal_field}>User ID</p>
//               <p className={classes.details_modal_values}>
//                 {requestData?.user_id || ""}
//               </p>
//             </div>
//             <div>
//               <p className={classes.details_modal_field}>User Name</p>
//               <p className={classes.details_modal_values}>
//                 {requestData?.user_name || ""}
//               </p>
//             </div>
//             <div>
//               <p className={classes.details_modal_field}>Category</p>
//               <p className={classes.details_modal_values}>
//                 {requestData?.type || ""}
//               </p>
//             </div>
//             <div>
//               <p className={classes.details_modal_field}>Submission Date</p>
//               <p className={classes.details_modal_values}>
//                 {requestData?.submitted_date || ""}
//               </p>
//             </div>
//             <div className={classes.full_span}>
//               <p className={classes.details_modal_field}>Optional Comment</p>
//               <p className={classes.details_modal_values}>
//                 {requestData?.description || "No Comments Added"}
//               </p>
//             </div>
//           </div>
//           <div style={{ marginTop: "10px" }}>
//             <p className={classes.details_modal_field}> Attachments </p>
//             {requestData?.images?.length > 0 ? (
//               <div className={classes.attachments}>
//                 {requestData?.images?.map((item, index) => (
//                   <FileViewerLightbox
//                     fileUrl={item}
//                     customComp={
//                       <img
//                         src={item}
//                         style={{
//                           marginRight: "15px",
//                           height: "150px",
//                           width: "150px",
//                         }}
//                       />
//                     }
//                   />
//                 ))}
//               </div>
//             ) : (
//               " No Attachments Added"
//             )}
//           </div>
//         </div>
//       </div>

//       {openAdduser && (
//         <CustomDialog
//           open={openAdduser}
//           handleClose={handleClosesetOpenAddUser}
//           showCloseIcon={false}
//           customWidth={"580px"}
//           overflowY={"unset"}
//           children={
//             <>
//               <div className="dialog_loyout">
//                 <h3 className="dialog_loyout_title">Add Comment</h3>
//                 <div className={classes.fileds}>
//                   <MinHeightTextarea
//                     maxLength="500"
//                     // label="Banner Text"
//                     title="Comment"
//                     name="Comment"
//                     rows={8}
//                     value={bannerText}
//                     placeholder="Enter your Comment"
//                     showpertext={`${charsLeft}/500`}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="btn_group">
//                   <button
//                     className="btn_cancel"
//                     onClick={handleClosesetOpenAddUser}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     // disabled={!isFormChanged()}
//                     className="btn_submit"
//                     // onClick={handleSubmit}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </>
//           }
//         />
//       )}
//     </div>
//   )
// }

import React, { useEffect, useMemo, useState } from "react"
import classes from "./ServiceRequestDetails.module.css"
import Manage from "../../assets/image/svg/UserList.svg"
import CustomButton from "../../components/UI/Button/Button"
import { useNavigate, useLocation } from "react-router-dom"
import book from "../../assets/image/jpg/dummy image 3.png"
import play from "../../assets/image/svg/play(small).svg"
import profile from "../../assets/image/svg/profile(grey).svg"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import TabBar from "../../components/UI/Tabs/Tabs"
import CustomeSlecter from "../../components/UI/Dropdown/CustomeSlecter"
import { Button } from "@mui/material"
import { method } from "lodash"
import FileViewerLightbox from "../../components/UI/PdfView/Lightbox/LightboxImgPdf"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import MinHeightTextarea from "../../components/UI/TextArea/Textarea"
import CustomeSlecterAdmin from "../../components/UI/Dropdown/CustomeSlecterAdmin"

export default function ServiceRequestDetails() {
  const location = useLocation()
  const { requestId, code } = location.state || {}
  console.log("requestId", requestId)
  const navigate = useNavigate()

  const [requestData, setRequestData] = useState({})
  console.log("requestData", requestData)
  const [openAdduser, setOpenAdduser] = useState(false)
  const [bannerText, setBannerText] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("") // Track the selected status
  const charsLeft = bannerText.length
  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const {
    // isLoading: sendLoading,
    // success: sendSuccess,
    // error: sendError,
    sendRequest: updateRequestStatus,
  } = useApiHttp()

  const slectdata = [
    {
      label: "Pending",
      value: "pending",
      can_update: true,
    },
    {
      label: "In Progress",
      value: "in_progress",
      can_update: true,
    },
    {
      label: "Resolved",
      value: "resolved",
      can_update: true,
    },
    {
      label: "Rejected",
      value: "rejected",
      can_update: true,
    },
  ]
  const [status, setStatus] = useState("")

  const getStatusClass = status => {
    if (status === "in progress" || status === "in_progress") return "blue"
    if (status === "resolved") return "active"
    if (status === "rejected") return "inactive"
    return "pending"
  }

  const getStatusName = status => {
    if (status === "in progress" || status === "in_progress")
      return "In Progress"
    if (status === "resolved") return "Resolved"
    if (status === "rejected") return "Rejected"
    return "Pending"
  }

  console.log("status", status)
  const getDetails = () => {
    sendRequest(
      {
        url: `admin/feedback-management/service-request/view/${requestId}`,
      },
      data => {
        setRequestData(data?.data)
      }
    )
  }

  const statusUpdateHandler = () => {
    if (status === requestData?.status) {
      Swal.fire({
        title: "No Changes Made",
        text: "Please select a different status to update.",
        icon: "info",
        confirmButtonText: "OK",
      })
      return
    }

    // Check if status requires a comment
    if (
      (status === "resolved" || status === "rejected") &&
      !bannerText.trim()
    ) {
      Swal.fire({
        title: "Comment Required",
        text: "Please add a comment for resolved or rejected status.",
        icon: "warning",
        confirmButtonText: "OK",
      })
      return
    }

    updateRequestStatus(
      {
        url: `admin/feedback-management/service-request/service-update-status`,
        method: "POST",
        body: {
          status: status,
          comment: bannerText,
          id: requestId,
        },
      },
      () => {
        Swal.fire({
          title: "Status Updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            popup: "my-swal-popup",
          },
        }).then(() => {
          setBannerText("")
          setOpenAdduser(false)
          getDetails()
        })
      }
    )
  }

  const handleStatusChange = newStatus => {
    setStatus(newStatus)
    setSelectedStatus(newStatus)

    // Open comment dialog only for resolved or rejected status
    if (newStatus === "resolved" || newStatus === "rejected") {
      setOpenAdduser(true)
    } else {
      setOpenAdduser(false)
      setBannerText("") // Clear comment for other statuses
    }
  }

  const updatedStatusOptions = useMemo(() => {
    if (!requestData?.status) return slectdata || []

    let canUpdate = false
    return slectdata?.map(statusItem => {
      if (statusItem.value === requestData.status) {
        canUpdate = true
      }
      return {
        ...statusItem,
        can_update: canUpdate,
      }
    })
  }, [requestData?.status, slectdata])

  useEffect(() => {
    getDetails()
  }, [requestId])

  useEffect(() => {
    setStatus(requestData?.status)
    setSelectedStatus(requestData?.status)
  }, [requestData?.status])

  const handleClearInput = () => {
    setBannerText("")
  }

  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    // Reset to original status when closing dialog
    setStatus(requestData?.status)
    setSelectedStatus(requestData?.status)
    handleClearInput()
  }

  const handleSubmitComment = () => {
    setOpenAdduser(false)
    // After setting comment, proceed with status update
    statusUpdateHandler()
  }

  const handleChange = event => {
    const { name, value } = event.target
    const maxChar = 500
    const truncatedValue = value.slice(0, maxChar)
    setBannerText(truncatedValue)
  }

  return (
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
          Service Requests
        </span>{" "}
        &gt; <span className={classes.active}>{code}</span>
      </div>

      <div className={classes.header_table}>
        <div className={classes.header_set}>
          <div className={classes.header_left}>
            <h3>{requestData?.user_name || "Name"}</h3>
            <p style={{ color: "black" }}>{code}</p>
          </div>
        </div>

        <div className={classes.header_right}>
          <div className={classes.header_profile}>
            <div>
              <img
                className={classes.profile_image}
                src={requestData?.profile_image || profile}
                alt={requestData?.user_name}
              />
            </div>
            <div className={classes._profile_deils_set}>
              <div className={classes._profile_deils}>
                <h3 style={{ color: "black" }}>
                  {requestData?.user_name || "name"}
                </h3>
                <p
                  className={`bagestatus ${getStatusClass(
                    requestData?.status
                  )}`}
                  style={{ width: "110px" }}
                >
                  {getStatusName(requestData?.status) || "Pending"}
                </p>
              </div>
              <p>{`${requestData?.email} | ${requestData?.mobile}`}</p>
            </div>
          </div>
          {requestData?.status !== "resolved" &&
            requestData?.status !== "rejected" && (
              <div>
                <span style={{ verticalAlign: "super", marginRight: "10px" }}>
                  <CustomeSlecterAdmin
                    data={updatedStatusOptions}
                    label="Update Status"
                    title="Choose Status"
                    width={"170"}
                    value={selectedStatus}
                    onChange={e => handleStatusChange(e.target.value)}
                    borders={true}
                  />
                </span>
                <CustomButton
                  variant="contained"
                  customColor="black"
                  customBgColor="#f3c11d"
                  custmstyle={{
                    padding: "5px 20px",
                    fontSize: "14px",
                    borderRadius: "8px",
                  }}
                  onClick={statusUpdateHandler}
                  disabled={selectedStatus === requestData?.status}
                >
                  Update Status
                </CustomButton>
              </div>
            )}
        </div>
        <div style={{ maxWidth: "60%" }}>
          <p
            style={{ fontWeight: "700", marginTop: "20px" }}
            className={classes.Details}
          >
            Order Details
          </p>
          <div className={classes.dialog_loyout_main}>
            <div>
              <p className={classes.details_modal_field}>Order ID</p>
              <p className={classes.details_modal_values}>
                {" "}
                {requestData?.order_number || ""}
              </p>
            </div>
            <div>
              <p className={classes.details_modal_field}>User ID</p>
              <p className={classes.details_modal_values}>
                {requestData?.user_id || ""}
              </p>
            </div>
            <div>
              <p className={classes.details_modal_field}>User Name</p>
              <p className={classes.details_modal_values}>
                {requestData?.user_name || ""}
              </p>
            </div>
            <div>
              <p className={classes.details_modal_field}>Category</p>
              <p className={classes.details_modal_values}>
                {requestData?.type || ""}
              </p>
            </div>
            <div>
              <p className={classes.details_modal_field}>Submission Date</p>
              <p className={classes.details_modal_values}>
                {requestData?.submitted_date || ""}
              </p>
            </div>
            <div className={classes.full_span}>
              <p className={classes.details_modal_field}>Optional Comment</p>
              <p className={classes.details_modal_values}>
                {requestData?.description || "No Comments Added"}
              </p>
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <p className={classes.details_modal_field}> Attachments </p>
            {requestData?.images?.length > 0 ? (
              <div className={classes.attachments}>
                {requestData?.images?.map((item, index) => (
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
                ))}
              </div>
            ) : (
              " No Attachments Added"
            )}
          </div>
          {requestData?.comment && (
            <div
              className={classes.full_span}
              style={{ paddingBottom: "3rem" }}
            >
              <p className={classes.details_modal_field}>Added Comment</p>
              <p className={classes.details_modal_values}>
                {requestData?.comment || "No Comments Added"}
              </p>
            </div>
          )}
        </div>
      </div>

      <CustomDialog
        open={openAdduser}
        handleClose={handleClosesetOpenAddUser}
        showCloseIcon={false}
        customWidth={"580px"}
        overflowY={"unset"}
        children={
          <>
            <div className="dialog_loyout">
              <h3 className="dialog_loyout_title">
                Add Comment
                {/* {selectedStatus === "resolved" ? "Resolved" : "Rejected"} Status */}
              </h3>
              <p style={{ marginBottom: "10px", color: "#666" }}></p>
              <div className={classes.fileds}>
                <MinHeightTextarea
                  maxLength="500"
                  title="Comment"
                  name="Comment"
                  rows={8}
                  value={bannerText}
                  placeholder={`Enter your comment for ${selectedStatus} status`}
                  showpertext={`${charsLeft}/500`}
                  onChange={handleChange}
                  required
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
                  onClick={handleSubmitComment}
                  disabled={!bannerText.trim()}
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        }
      />
    </div>
  )
}
