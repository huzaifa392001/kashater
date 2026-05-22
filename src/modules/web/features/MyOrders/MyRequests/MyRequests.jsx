import React, { useEffect, useState } from "react"
import classes from "./MyRequests.module.css"
import CustomButton from "../../../components/UI/Button/Button"
import BoostrapDialog from "../../../components/UI/Dialog/BoostrapDialog"
import { Alert, Snackbar, TablePagination, TextField } from "@mui/material"
import CustomeSlecter from "../../../components/UI/Dropdown/Select"
import MinHeightTextarea from "../../../components/UI/TextArea/Textarea"
import UploadThumbnail from "../../../components/UI/UploadThumbnail/UploadThumbnail"
import ComplaintCard from "../../../components/UI/Card/ComplaintCard"
import Autocomplete from "../../../components/UI/MultipleSlecter/Autocomplete"
import useApiHttp from "../../../hooks/ues-http"
import { method, set } from "lodash"
import CustomSwal from "../../../utils/customSwal"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Loding from "../../../components/UI/Loding/Loding"
import OverlayLoding from "../../../components/UI/Loding/OverlayLoding"
import useIsMobile from "../../../hooks/useIsMobile"
import SearchBar from "../../../components/UI/Search/Search"

const StatusWidgetLable = styled.div.attrs(props => ({
  className: props.class,
}))`
  display: inline-block;
  margin-bottom: 10px;
  height: 24px;
  font-family: var(--font-bold);
  line-height: 14px;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 15px;
  min-width: 100px;
  text-align: center;

  &.in_progress {
    background: linear-gradient(
      to right,
      rgba(255, 204, 101, 1),
      rgba(152, 99, 7, 1)
    );
  }

  &.new {
    background: linear-gradient(
      to right,
      rgba(102, 229, 255, 1),
      rgba(61, 138, 153, 1)
    );
  }

  &.resolved {
    background: linear-gradient(
      to right,
      rgba(53, 221, 151, 1),
      rgba(29, 119, 81, 1)
    );
  }

  &.rejected {
    background: linear-gradient(
      to right,
      rgba(255, 101, 103, 1),
      rgba(152, 7, 7, 1)
    );
  }
`

const MyRequests = props => {
  // const { searchValue } = props
  const navigate = useNavigate()
  const ismMobile = useIsMobile(768)
  const isMobile = useIsMobile(500)

  const [openRequestModal, setOpenRequestModal] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [orderIdList, setorderIdList] = useState([])
  const [selectedOrderID, setSelectedOrderID] = useState([])
  const [searchOrderID, setsearchOrderID] = useState("")
  const [serviceRequestTypes, setServiceRequestTypes] = useState([])
  const [searchVlue, setSearchVlue] = useState("")
  const [formDatas, setFormDatas] = useState({
    orderId: "",
    category: "",
    description: "",
    attachments: [],
  })

  // open and closed list variables
  const [closedRequests, setclosedRequests] = useState({
    total: 0,
    data: [
      //   {
      //   "id": "01jwr734zk0nm9xc0w10qa2h23",
      //   "request_number": "RID#2784410476",
      //   "order_number": "ORD#5369043",
      //   "service_request_type": "Quality Issues",
      //   "status": "rejected", // resolved,rejected
      //   "created_at": "02 Jun 2025"
      // }
    ],
  })
  const [openRequestList, setOpenRequestList] = useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  //api requests
  //api for raising a request
  const { sendRequest: searchableOrderID } = useApiHttp()
  const { sendRequest: getRequestTypes } = useApiHttp()
  const { isLoading: createRequestLoader, sendRequest: createRequest } =
    useApiHttp()

  //api for open requests
  const { sendRequest: getOpenRequests } = useApiHttp()

  //api for closed requests
  const { sendRequest: getClosedRequests } = useApiHttp()

  // methods

  // Methods for raising a request
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
    } // Check if at least one attachment is provided
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
        CustomSwal.successIcon(
          { title: "Created!", text: data.message },
          fetchOpenRequests
        )
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

  // methods for open and closed requests
  const fetchOpenRequests = () => {
    getOpenRequests(
      {
        url: `user/service-request/list/open`,
        method: "POST",
        body: {
          page: 1,
          per_page: 5,
          search: "",
        },
      },
      response => {
        setOpenRequestList(response?.data?.data || [])
        // Handle the response data as needed
      }
    )
  }

  const fetchClosedRequests = () => {
    getClosedRequests(
      {
        url: `user/service-request/list/closed`,
        method: "POST",
        body: {
          page: page + 1,
          per_page: rowsPerPage,
          search: searchVlue || "",
        },
      },
      response => {
        setclosedRequests({
          total: response?.data?.total || 0,
          data: response?.data?.data || [],
        })
        // Handle the response data as needed
      }
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Effects

  useEffect(() => {
    if (!searchOrderID || searchOrderID.trim().length < 3) return // Prevent API call if searchOrderID is empty
    searchableOrderID(
      {
        url: `user/drop-down/searchable/order-ids`,
        method: "POST",
        body: {
          order: searchOrderID,
        },
      },
      response => {
        setorderIdList(
          response.data.map(item => ({
            id: item.id,
            name: item.order_number,
          }))
        )
        // setSelectedOrderID(response.data[0] || null); // Set the first item as selected if available
        // Handle the response data as needed
        // For example, you can set it to a state variable to use in your component
        // setSearchableOrderIDs(response.data);
      }
    )
    // fetchclosedRequests();
  }, [searchOrderID])

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

    fetchOpenRequests()

    // return () => {
    //   second
    // }
  }, [])

  useEffect(() => {
    fetchClosedRequests()
  }, [searchVlue])

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.header_left}>
          <h3>Open Requests</h3>
          <p>{openRequestList.length || 0} Requests</p>
        </div>
        <div className={classes.header_right}>
          {" "}
          <CustomButton
            variant="contained"
            customColor="#131313"
            custmstyle={{
              background: `
              linear-gradient(180deg, #fff47a 0%, #ffd500 50%, #f2c200 100%),
              radial-gradient(ellipse at center bottom, #fff 15%, transparent 60%)
            `,
            }}
            onClick={() => setOpenRequestModal(true)}
          >
            Raise New Ticket
          </CustomButton>
        </div>
      </div>
      <div className={classes.openRequestList}>
        {openRequestList.map((request, index) => {
          let statusName = request.status === "pending" ? "new" : request.status

          return (
            <ComplaintCard
              key={request?.id}
              status={statusName}
              compDate={request?.created_at}
              compId={request?.request_number}
              item={request}
            />
          )
        })}
      </div>

      <div>
        <div className={classes.header_Closed}>
          <div>
            <p className={classes.productsLabel}>Closed Requests</p>
            <p className={classes.items}>
              ({closedRequests?.total || 0}) Requests
            </p>
          </div>
          <div>
            <SearchBar
              placeholder={"Search for Requests..."}
              value={searchVlue}
              onSearchChange={value => setSearchVlue(value)}
            // maxWidth={maxWidth}
            />
          </div>
        </div>

        <div className={classes.main_Table}>
          <div className={classes.productTable}>
            <div className={classes.tableHeader}>
              <span>REQUEST ID</span>
              <span>ORDER ID</span>
              <span>CATEGORY</span>
              <span>REQUESTED DATE</span>
              <span>STATUS</span>
              <span></span>
            </div>

            {closedRequests?.data.length > 0 ? (
              closedRequests?.data?.map(product => (
                <div className={classes.productRow} key={product.id}>
                  <span>{product?.request_number}</span>
                  <span>{product?.order_number}</span>
                  <span>{product?.service_request_type}</span>
                  <span>{product?.created_at}</span>
                  <span>
                    <StatusWidgetLable class={product.status}>
                      {product?.status === "in progress" && "In Progress"}
                      {product?.status === "new" && "New Ticket"}
                      {product?.status === "rejected" && "Rejected"}
                      {product?.status === "resolved" && "Resolved"}
                    </StatusWidgetLable>
                  </span>
                  <span
                    onClick={() => {
                      // Handle view details click
                      // You can implement a function to show more details about the request
                      navigate("/user/view_request", {
                        state: {
                          requestItem: product, // Your actual ID
                        },
                      })
                    }}
                    style={{
                      fontFamily: "var(--font-semibold)",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontWeight: "700",
                      fontSize: "14px",
                      lineHeight: "163%",
                      letterSpacing: "0%",
                      textDecoration: "underline",
                      textDecorationStyle: "solid",
                      textDecorationOffset: "0%",
                      textDecorationThickness: "0%",
                      textDecorationSkipInk: "auto",
                      color: "#fe9b29",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </span>

                  {/* <span>{product.quantity}</span> */}
                </div>
              ))
            ) : (
              <div
                style={{ textAlign: "center", padding: "20px", width: "100%" }}
              >
                <p>No requests found.</p>
              </div>
            )}
            {closedRequests?.data.length > 0 && (
              <TablePagination
                component="div"
                showFirstButton
                showLastButton
                sx={{
                  color: "#fff",
                  "& .MuiTablePagination-selectLabel": {
                    color: "#fff",
                  },
                  "& .MuiIconButton-root": {
                    color: "#f2f2f2", // <- sets color for all pagination buttons
                  },
                  "& .Mui-disabled": {
                    color: "rgba(255, 255, 255, 0.3)", // disabled button color
                  },
                }}
                count={closedRequests?.total || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[]}
              />
            )}
          </div>
        </div>
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

              <div className={classes.raiseRequest}>
                <h3 className={classes.addUserHeader}>Raise New Ticket</h3>
                <div className={classes.addUserForm}>
                  <div className={classes.addUserInput}>
                    <div className={classes.input_text_filed}>
                      <Autocomplete
                        options={orderIdList}
                        getOptionLabel={option => option.name || ""}
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
                        sx={
                          ismMobile
                            ? {
                              width: "100%",
                            }
                            : {
                              width: "287px",
                            }
                        }
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
                            placeholder="Type and select the order ID"
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
                        width={ismMobile ? "100%" : "287px"}
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
                    <p className={classes.raiseRequestSectionHeader}>
                      Upload Attachments
                    </p>

                    <div className={classes.input_text_filed}>
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
                    {/* <CustomTextField
                      id="Landmark"
                      // label="Story Book Offer Price"
                      placeholder="Landmark"
                      variant="outlined"
                      value={formDatas?.landmark}
                      sx={{
                        width: "100%",
                      }}
                      onChange={handlerLandmark}
                      // error={offerPriceHasError}
                      // onBlur={offerPriceBlurHandler}
                      // // helperText={nameHasError ? "Enter the email" : null}
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      required
                    /> */}
                  </div>
                  {/* <div className={styles.Mark}>
                    <CustomRadio
                      selected={radioValue === 1}
                      onToggle={handleToggledefaultaddress}
                    />
                    <p>Mark as default address</p>
                  </div> */}

                  <div className={classes.btn_group}>
                    <button
                      className={classes.cancel}
                      onClick={handleCancelRaiseRequestModal}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${classes.continueBtn} ${classes.width_cont}`}
                      onClick={handleRequestSubmit}
                    >
                      Raise Request
                    </button>
                  </div>
                </div>
              </div>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
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
            </>
          }
        />
      )}
    </div>
  )
}

export default MyRequests
