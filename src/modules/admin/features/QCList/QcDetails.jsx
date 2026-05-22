import React, { useEffect, useState } from "react"
import classes from "./QcDetails.module.css"
import Manage from "../../assets/image/svg/rewards.svg"
import CustomButton from "../../components/UI/Button/Button"
import { useNavigate, useLocation } from "react-router-dom"
import book from "../../assets/image/jpg/dummy image 3.png"
import play from "../../assets/image/svg/play(small).svg"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import CustomeSlecter from "../../components/UI/Dropdown/CustomeSlecter"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import MinHeightTextarea from "../../components/UI/TextArea/Textarea"
import CheckIcon from "@mui/icons-material/Check"
import OrderTrackingStepper from "../../components/OrderTrackingStepper/OrderTrackingStepper"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import FileViewerLightbox from "../../../web/components/UI/PdfView/Lightbox/LightboxImgPdf"
import CharacterDetails from "../../components/CharacterDetails/CharacterDetails"
import CustomeSlecterAdmin from "../../components/UI/Dropdown/CustomeSlecterAdmin"
import OverlayLoding from "../../../web/components/UI/Loding/OverlayLoding";
// import { Document, Page } from "react-pdf"
// import { pdfjs } from "react-pdf"

export default function QcDetails() {
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  const location = useLocation()
  const { storyId } = location.state || {}
  console.log("storyId", storyId)
  const navigate = useNavigate()
  // const [showViewer, setShowViewer] = useState(false)
  // const [numPages, setNumPages] = useState(null)

  const [booksData, setBooksData] = useState([])
  const [category, setCategory] = useState("")
  const [statusData, setStatusData] = useState([
    { label: "Pass", id: "pass" },
    { label: "Fail", id: "fail" },
  ])
  const [openAdduser, setOpenAdduser] = useState(false)
  const [formDatas, setFormDatas] = useState({
    description: "",
  })
  const [comments, setComments] = useState("")
  const [loader, setLoader] = useState(false)
  console.log("booksData", booksData)

  const charsLeft = formDatas.description.length
  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages)
  // }

  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
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
        url: `admin/quality-management/view/${storyId}`,
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
        // setStatusData(data?.data)
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
    setLoader(true)
    sendRequest(
      {
        url: `admin/quality-management/update-status`,
        method: "POST",
        body: {
          id: storyId,
          status: category,
          comment: category === "fail" ? comments : "", // Send comments only for failed status
        },
      },
      data => {
        setLoader(false)
        handleOrorderManagementList()
        handledropdownList()
        setCategory("")
        setComments("")
      }
    )

    setLoader(false)
  }

  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    setFormDatas({ ...formDatas, description: "" })
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
      case "pending":
        return {
          text: "Pending",
          className: "status_lable received",
        }
      case "passed":
        return {
          text: "Passed",
          className: "status_lable passed",
        }
      case "failed":
        return {
          text: "Failed",
          className: "status_lable failed",
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

  const { text, className } = getStatusLabel(booksData?.order_status)

  return (
    <>

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
            QC List
          </span>{" "}
          &gt; <span className={classes.active}>{booksData?.order_number}</span>
        </div>

        <div className={classes.header_table}>
          <div>
            <div className={classes.header_set}>
              <div className={classes.header_left}>
                <div className={classes.header_left_flex}>
                  <h3>{booksData?.order_number}</h3>
                  <div className={className}>{text}</div>
                </div>

                <p>
                  Ordered on {booksData?.order_date}{" "}
                  {/* {booksData?.order_date}{" "} */}
                </p>
              </div>
              <div className={classes.header_right}>
                {booksData?.can_cancel === 1 && (
                  <CustomButton
                    variant="contained"
                    customColor="#ffffff"
                    customBgColor="#f31d1d"
                    custmstyle={{
                      padding: "8px 20px",
                      width: "131px",
                      fontSize: "13px",
                      borderRadius: "10px",
                    }}
                    onClick={() => handlerCancel()}
                  >
                    Cancel Order
                  </CustomButton>
                )}
              </div>
            </div>
            <div className={classes.main}>
              <p className={classes.Details}>Order Details</p>
              <div className={classes.Details_box}>
                <div className={classes.Details_box_cont}>
                  <p className={classes.Details_title}>Order ID</p>
                  <p className={classes.Details_sub_title}>
                    {booksData?.order_number}
                  </p>
                </div>
                <div className={classes.Details_box_cont}>
                  <p className={classes.Details_title}>User ID</p>
                  <p className={classes.Details_sub_title}>
                    {booksData?.user_code}
                  </p>
                </div>
                <div className={classes.Details_box_cont}>
                  <p className={classes.Details_title}>User Name</p>
                  <p className={classes.Details_sub_title}>
                    {booksData?.user_name}
                  </p>
                </div>
              </div>
              <div className={classes.story_template_set}>
                <div className={classes.left_side}>
                  <div>
                    <p className={classes.Details} style={{ margin: "0px" }}>
                      {booksData?.book_name}
                    </p>
                    {/* <p className={classes.Details_sub_title}>
                      {booksData?.book_name}
                    </p> */}
                  </div>
                  <div className={classes.book_boxs_main}>
                    <div className={classes.book_boxs}>
                      <img src={booksData?.book_cover || book} alt="book" />
                    </div>
                    <div className={classes.Sample_Preview_main}>
                      <div>
                        <div className={classes.Details_box_cont}>
                          <p className={classes.Details_sub_title}>
                            {booksData?.book_name}({booksData?.gender})
                          </p>
                          <p
                            className={classes.Details_title}
                            style={{ marginTop: ".5rem" }}
                          >
                            {booksData?.order_date}
                          </p>
                        </div>
                      </div>
                      <div className={classes.pdf_downlode}>
                        <FileViewerLightbox
                          fileUrl={booksData?.view_book}
                          customComp={
                            <p
                              className={classes.Sample_Preview}
                            // onClick={() => setShowViewer(true)}
                            >
                              {" "}
                              <img src={play} alt="play" />
                              View Book
                            </p>
                          }
                        />

                        {booksData?.front_cover && (
                          <FileViewerLightbox
                            fileUrl={booksData?.front_cover}
                            customComp={
                              <p
                                className={classes.Sample_Preview}
                              // onClick={() => setShowViewer(true)}
                              >
                                {" "}
                                <img src={play} alt="play" />
                                Front Cover
                              </p>
                            }
                          />
                        )}
                        {booksData?.back_cover && (
                          <FileViewerLightbox
                            fileUrl={booksData?.back_cover}
                            customComp={
                              <p
                                className={classes.Sample_Preview}
                              // onClick={() => setShowViewer(true)}
                              >
                                {" "}
                                <img src={play} alt="play" />
                                Back Cover
                              </p>
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.right_side}></div>
                <div>
                  <p className={classes.Details} style={{ margin: "0px" }}>
                    Upload Details
                  </p>
                </div>
                <section className={classes.character_image_details_section}>
                  {booksData?.character_details?.length > 0 &&
                    booksData?.character_details.map((character, index) => (
                      <CharacterDetails
                        key={`${character.user_name}_${index}`}
                        character={character}
                      />
                    ))}
                </section>
                {/* <CharacterDetails /> */}
                {/* <div className={classes.left_side}>

                    <div className={classes.character_details_box}>
                      <div className={classes.book_boxs}>
                        <img src={booksData?.book_cover || book} alt="book_character" />
                      </div>
                      <div className={classes.character_details}>
                        <h5>Main Character  - Shiny Jane</h5>
                        <p>Sara Pettersen</p>
                      </div>
                    </div>
                    <div className={classes.book_boxs_main}>
                      <div className={classes.book_boxs}>
                        <img src={booksData?.book_cover || book} alt="book" />
                      </div>

                    </div>

                  </div> */}
              </div>
            </div>
          </div>
          <div>
            <div className={classes.main}>
              <div className={classes.Details_set}>
                {text === "Pending" && (
                  <div className={classes.priceBox1}>
                    <p className={classes.Details}>Update Status</p>
                    <div className={classes.butns}>
                      <div className={classes.butns_set}>
                        <CustomeSlecterAdmin
                          data={
                            statusData?.map(sub => ({
                              label: sub.label,
                              value: sub.id,
                            })) || []
                          }
                          lable="Update Status"
                          title="All Status"
                          width={"100%"}
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                          borders={true}
                        />
                      </div>
                      {category === "fail" && (
                        <div
                          className={classes.butns_set}
                          style={{ marginTop: "20px" }}
                        >
                          <CustomTextField
                            id="Comments"
                            label="Add Comments"
                            placeholder="Enter your Comments"
                            variant="outlined"
                            value={comments}
                            sx={{ width: "100%" }}
                            onChange={e => setComments(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            required
                          // error={category === "fail" && !comments.trim()}
                          // helperText={
                          //   category === "fail" && !comments.trim()
                          //     ? "Comments are required for failed status"
                          //     : null
                          // }
                          />
                        </div>
                      )}

                      <CustomButton
                        variant="contained"
                        customColor="#000000"
                        customBgColor="#F3C11D"
                        custmstyle={{
                          padding: "8px 20px",
                          width: "140px",
                          fontSize: "13px",
                          borderRadius: "10px",
                          marginTop: "20px",
                        }}
                        onClick={() => handleUpdateStatus()}
                        disabled={
                          !category || // Category is always required
                          (category === "fail" && !comments.trim()) // Comments required only for failed status
                        }
                      >
                        Update Status
                      </CustomButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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

      {/* {showViewer && (
        <CustomDialog
          open={showViewer}
          handleClose={() => setShowViewer(false)}
          customWidth="90%"
          maxWidth="lg"
          overflowY="auto"
          children={
            <div className={classes.pdfViewerContainer}>
              <div className={classes.pdfHeader}>
                <h3>{booksData?.book_name}</h3>
                <a
                  href={booksData?.story_file}
                  download
                  className={classes.downloadButton}
                >
                  Download PDF
                </a>
              </div>

              <Document
                file={booksData?.story_file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div>Loading PDF...</div>}
                error={<div>Failed to load PDF</div>}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={1200}
                    className={classes.pdfPage}
                  />
                ))}
              </Document>
            </div>
          }
        />
      )} */}
    </>
  )
}
