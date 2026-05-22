import React, { useEffect, useState, useCallback, useMemo } from "react"
import classes from "./MappingDetails.module.css"
import CustomTable from "../../../components/UI/Table/TablePage"
import CustomDialog from "../../../components/UI/Dialog/Dialog"
import { IconButton } from "@mui/material"
import edit from "../../../assets/image/svg/edit.svg"
import TrashIcon from "../../../assets/image/svg/trash_icon.svg"
import Swal from "sweetalert2"
import Slecter from "../../../components/UI/Dropdown/Select"
import CustomeSlecter from "../../../components/UI/Dropdown/CustomeSlecter"
import FileViewerLightbox from "../../../components/UI/PdfView/Lightbox/LightboxImgPdf"
import useApiHttp from "../../../hooks/ues-http"
import ImageMapTool, { scaleCoordinatesToOriginal } from "./ImageMapGenerator"
import ReusableScrollDialog from "../../../components/UI/Dialog/ReusableScrollDialog"
import MinHeightTextarea from "../../../components/UI/TextArea/Textarea"
import FileViewerLightbox1 from "../../../components/UI/Lightbox/LightboxImgPdf"
import toast, { Toaster } from "react-hot-toast"
import { Box, CircularProgress, Switch } from "@mui/material"
import { styled } from "@mui/material/styles"
import { set } from "lodash"
import CustomeSlecterAdmin from "../../../components/UI/Dropdown/CustomeSlecterAdmin"
import CustomButton from "../../../components/UI/Button/Button"
import { useNavigate } from "react-router-dom"
import { Modal } from "react-bootstrap"
import FileUploadComponent from "../../../components/UI/FileUploadComponent/FileUploadComponent"
import OverlayLoding from "../../../components/UI/Loding/OverlayLoding"
import CustomTextField from "../../../components/UI/TextFiled/TextFiled"
import CustomTextFieldLogin from "../../../../web/components/UI/TextFiled/TextFiledLogin"
import FileUploadComponentGif from "../../../components/UI/FileUploadComponent/FileUploadComponentGif"

const AutoRenewalSwitch = styled(props => (
  <Switch
    size="small"
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 12,
    height: 12,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}))

const MappingDetails = React.memo(({ storyId, booksData }) => {
  // State management
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [perPage, setPerPage] = useState(30)
  const [column, setColumn] = useState(0)
  const [totalReporting, setTotalReporting] = useState(0)
  const [openAdduser, setOpenAdduser] = useState(false)
  const [openAdduser2, setOpenAdduser2] = useState(false)
  const [openAdduserData, setOpenAdduserData] = useState({})
  const [editCatID, setEditCatID] = useState("")
  const [imageUrl, setImageUrl] = useState({})
  const [characterTypeOptions, setCharacterTypeOptions] = useState([])
  const [characterNumber, setCharacterNumber] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [listsTrigger, setlistsTrigger] = useState(false)
  const [moduleCategoryList, setModuleCategoryList] = useState([])
  const [category, setCategory] = useState("")
  const [selectedCharacters, setSelectedCharacters] = useState({})
  const [image, setImage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [text, setText] = useState("")
  const [allSize, setAllSize] = useState(null)
  const [editData, setEditData] = useState({})
  const [isPreviewPage, setisPreviewPage] = useState(false)
  const [filesUpload, setFilesUpload] = useState(null)
  const [page_number, setpage_number] = useState(null)

  const [status, setStatus] = useState("Checking...")
  const [preview, setPreview] = useState("")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)

  const isEmpty = useMemo(() => {
    return editData?.is_cover
      ? characterNumber.length > 0 &&
      Object.values(selectedCharacters).filter(x => x).length === 0
      : characterNumber.length > 0 &&
      Object.values(selectedCharacters).filter(x => x).length === 0
  }, [selectedCharacters, editData?.is_cover, allSize])

  // API hooks
  const { sendRequest } = useApiHttp()

  const {
    isLoading: uplodeLoading,
    success: uplodeSuccess,
    error: uplodeError,
    sendRequest: uplodeRequest,
  } = useApiHttp()

  // Memoized API call for book characters
  const fetchBookCharacters = useCallback(
    async id => {
      if (!id) return

      try {
        const response = await sendRequest({
          url: `admin/story-management/story/page/content/${id}`,
        })
        const characters = response?.data || []
        setCharacterNumber(characters?.characters)
        setEditData(characters)

        setisPreviewPage(characters?.is_preview || false)
        setText(characters?.text)
        setAllSize(characters?.front_end_coordinates)
        // Initialize character selections
        const initialSelections = {}
        characters?.characters.forEach(char => {
          initialSelections[char.sequence] = char.book_character_id
        })
        setSelectedCharacters(initialSelections)
      } catch (error) {
        console.error("Error fetching characters:", error)
        Swal.fire("Error", "Failed to load character data", "error")
      }
    },
    [sendRequest]
  )

  // Memoized API call for initial data
  const fetchInitialData = useCallback(async () => {
    try {
      const [statusRes, charactersRes] = await Promise.all([
        sendRequest({ url: `admin/drop-down/order-status` }),
        storyId
          ? sendRequest({
            url: `admin/story-management/story/list/book/characters/${storyId}`,
          })
          : Promise.resolve(null),
      ])

      setModuleCategoryList(statusRes?.data || [])
      if (charactersRes?.data) {
        setCharacterTypeOptions(charactersRes.data)
      }
    } catch (error) {
      console.error("Error fetching initial data:", error)
    }
  }, [sendRequest, storyId])

  // Memoized API call for page list
  const fetchPageList = useCallback(async () => {
    if (!storyId) return

    try {
      const response = await sendRequest({
        url: `admin/story-management/story/list/page/${storyId}`,
      })
      setData(response?.data || [])
      setTotalReporting(response?.data?.total_count || 0)
    } catch (error) {
      console.error("Error fetching page list:", error)
    }
  }, [sendRequest, storyId])

  // Initial data fetch
  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  // Page list fetch
  useEffect(() => {
    fetchPageList()
  }, [
    page,
    perPage,
    searchValue,
    sortDirectionData,
    listsTrigger,
    fetchPageList,
  ])


  const handlerPreviewImg = async id => {
    setLoading(true)
    setLightboxOpen(false)

    const token = JSON.parse(localStorage.getItem("adminUserData"))?.authToken
    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "")
    const requestUrl = `${baseUrl}/admin/story-management/story/page/text-swap/preview/${id}`

    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "image/png",
        },
      })

      // if (!response.ok) {
      //   const errText = await response.text()
      //   throw new Error(
      //     `HTTP ${response.status}: ${response.statusText} - ${errText}`
      //   )
      // }
      if (!response.ok) {
        // Try to parse JSON error message first
        let errorMessage = ``
        try {
          const errorBody = await response.json()
          if (errorBody?.message) {
            errorMessage += `${errorBody.message}`
          } else {
            errorMessage += `${JSON.stringify(errorBody)}`
          }
        } catch (jsonErr) {
          try {
            // fallback to text if not JSON
            const errorText = await response.text()
            errorMessage += `${errorText}`
          } catch (textErr) {
            // fallback again
            errorMessage += "Unknown error body"
          }
        }
        throw new Error(errorMessage)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      setPreview(url)
      setLightboxOpen(true)
    } catch (err) {
      toast.error(err.message || "Preview image failed")
      console.error("Preview image failed:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleEditPage = (row) => {
    let spiler = row.page_number.split(" ")
    if (spiler[2]) {
      setpage_number(spiler[2]);
      setOpenAdduserData(row?.page_path);
      setOpenAdduser2(row?.id)
    }
  }


  const deleteUserRolelistData = id => {
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
            url: `admin/story-management/story/book/page/delete`,
            method: "POST",
            body: {
              book_page_id: id
            },
          },
          data => {
            if (data?.status == 'success') {
              toast.success(data?.message)
              fetchPageList()
            }

          }
        )
      }
    })
  }


  const existingObject = useMemo(
    () =>
      openAdduserData
        ? {
          url: openAdduserData,
          name: "Existing cover",
          type: "image/jpeg",
        }
        : null,
    [openAdduserData]
  )

  // Table columns configuration (memoized)
  const MappingDetailsdata = useMemo(
    () => [
      {
        name: "S.No",
        selector: row => row.sl_no,
        sortable: false,
        sortField: 0,
        maxWidth: "76px",
        minWidth: "50px",
      },
      {
        name: "Page No",
        cell: row => <p>{row?.page_number}</p>,
        maxWidth: "150px",
        minWidth: "150px",
        sortable: true,
        sortField: 7,
      },
      {
        name: "Image",
        // cell: row => <FileViewerLightbox fileUrl={row.page_path} />,
        cell: row => <div className={classes.book_boxs2}>
          <img
            src={row.page_path}
            alt="book"
          />
        </div>,
        sortable: false,
        sortField: 5,
      },
      {
        name: "No. OF Characters",
        selector: row => row?.characters,
        sortable: false,
        sortField: 4,
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
              case "mapped":
                return { text: "Mapped", className: "status_lable delivered" }
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
              {row.status != "Pending" && <div className="action_btn">
                <button
                  className="action_edit"
                  onClick={() => {
                    handleEditPage(row)
                  }}
                >
                  Edit
                </button>
                <IconButton
                  onClick={() => {
                    handlerAddAndEdit(row)
                    setImage(row.page_path)
                  }}
                >
                  <img src={edit} alt="edit" />
                </IconButton>

                <IconButton
                  disabled={row.status === "mapped" ? false : true}
                  sx={{ fontSize: "14px", fontWeight: "800" }}
                  onClick={() => handlerPreviewImg(row.id)}
                >
                  Preview
                </IconButton>
                {row.page_number == "Page - 0" || row.page_number == "Page - 0.5" ? null : <IconButton
                  onClick={() => deleteUserRolelistData(row.id)}
                >
                  <img src={TrashIcon} alt="edit" />
                </IconButton>}
              </div>}
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

  const handleClosesetOpenAddUser = useCallback(() => {
    setOpenAdduser(false)
    setCharacterNumber([])
    setSelectedCharacters({})
    setErrorMsg("")
    setAllSize(null)
  }, [])

  const handleClosesetOpenAddUser2 = () => {
    setOpenAdduser2(false)
    setOpenAdduserData({})
    setFilesUpload(null)
  }

  const handlerAddAndEdit = useCallback(
    async row => {
      setEditCatID(row.id)
      setImageUrl(row)
      setOpenAdduser(true)
      await fetchBookCharacters(row.id)
    },
    [fetchBookCharacters]
  )
  // const originalCoords = scaleCoordinatesToOriginal(
  //   [x1, y1, x2, y2],
  //   allSize.displayWidth,
  //   allSize.displayHeight,
  //   allSize.naturalWidth,
  //   allSize.naturalHeight
  // )

  const handleSubmit = useCallback(async () => {
    try {
      let nonCoverPayload = {}
      // if (editData?.is_cover) {
      const mapped_characters = Object.entries(selectedCharacters)
        // .filter(([_, book_character_id]) => book_character_id)
        .map(([sequence, book_character_id]) => {
          const character = characterNumber.find(
            char => char.sequence === parseInt(sequence)
          )

          return {
            page_character_id: character?.id || "",
            book_character_id,
          }
        })

      let validMappedCharacters = Object.entries(selectedCharacters).filter(
        ([_, book_character_id]) => book_character_id
      ).length

      if (validMappedCharacters <= 0 && characterNumber.length > 0) {
        setErrorMsg("Please select at least one character.")
        return
      }
      // if (!editData?.is_cover) {
      if (allSize && !text?.trim()) {
        setErrorMsg("Please enter story lines when coordinates are selected.")
        return
      }
      // }
      nonCoverPayload = {
        mapped_characters,
        // text: !editData?.is_cover ? text : "",
        text: text ? text : "",
        is_preview: isPreviewPage,
      }
      // }

      let originalCoords = null
      if (allSize?.x1 !== undefined) {
        originalCoords = scaleCoordinatesToOriginal(
          [allSize.x1, allSize.y1, allSize.x2, allSize.y2],
          allSize.displayWidth,
          allSize.displayHeight,
          allSize.naturalWidth,
          allSize.naturalHeight
        )
      }
      await sendRequest(
        {
          url: `admin/story-management/story/map/characters`,
          method: "POST",
          body: {
            ...nonCoverPayload,
            book_id: storyId,
            book_page_id: editCatID,
            is_cover: editData?.is_cover,
            coordinates: originalCoords,
            front_end_coordinates: allSize,
            // is_preview: isPreviewPage,
            // mapped_characters,
          },
        },
        () => {
          setText("")
          setAllSize(null)
          setErrorMsg("")
          setOpenAdduser(false)
          Swal.fire(
            "Updated!",
            "Character mapping updated successfully",
            "success"
          )
          setlistsTrigger(prev => !prev)
        }
      )
    } catch (error) {
      console.error("Mapping error:", error)
      Swal.fire("Error", "Failed to update character mapping", "error")
    }
  }, [
    selectedCharacters,
    characterNumber,
    sendRequest,
    storyId,
    editCatID,
    text,
    allSize,
    isPreviewPage,
  ])

  // const handleSubmit = useCallback(async () => {
  //   try {
  //     const mapped_characters = Object.entries(selectedCharacters)
  //       .filter(([_, book_character_id]) => book_character_id)
  //       .map(([sequence, book_character_id]) => {
  //         const character = characterNumber.find(
  //           char => char.sequence === parseInt(sequence)
  //         )

  //         return {
  //           page_character_id: character?.id || "",
  //           book_character_id,
  //         }
  //       })

  //     if (mapped_characters.length === 0) {
  //       setErrorMsg("Please select at least one character.")
  //       return
  //     }

  //     await sendRequest(
  //       {
  //         url: `admin/story-management/story/map/characters`,
  //         method: "POST",
  //         body: {
  //           book_id: storyId,
  //           book_page_id: editCatID,
  //           mapped_characters,
  //           text: text,
  //           coordinates: allSize,
  //         },
  //       },
  //       () => {
  //         setErrorMsg("")
  //         setOpenAdduser(false)
  //         Swal.fire(
  //           "Updated!",
  //           "Character mapping updated successfully",
  //           "success"
  //         )
  //         setlistsTrigger(prev => !prev)
  //       }
  //     )
  //   } catch (error) {
  //     console.error("Mapping error:", error)
  //     Swal.fire("Error", "Failed to update character mapping", "error")
  //   }
  // }, [selectedCharacters, characterNumber, sendRequest, storyId, editCatID])

  const handleCharacterChange = useCallback((sequence, value) => {
    setSelectedCharacters(prev => ({
      ...prev,
      [sequence]: value,
    }))
  }, [])

  // Memoized dropdown options
  const categoryOptions = useMemo(
    () =>
      moduleCategoryList?.map(sub => ({
        label: sub.name,
        value: sub.id,
      })) || [],
    [moduleCategoryList]
  )

  const characterOptions = useMemo(
    () =>
      characterTypeOptions?.map(sub => ({
        label: sub.name,
        value: sub.id,
      })) || [],
    [characterTypeOptions]
  )
  const areCharactersRecognized = useMemo(() => {
    return characterOptions.length > 0
  }, [characterOptions])

  const handleChange = event => {
    const { name, value } = event.target
    const maxChar = 1000
    const truncatedValue = value.slice(0, maxChar)
    setText(truncatedValue)
  }

  const autoRenewalSwitchChange = e => {
    setisPreviewPage(e.target.checked)
  }


  const handlerAdd = () => {
    navigate("/admin/storylists/add-story", {
      state: { booksData: booksData },
    })
  }

  const handleAddAddressSubmit = () => {
    const formData = new FormData()
    if (!page_number) {
      toast.error('Enter your Page Number')
    } else {
      formData.append('book_page_id', openAdduser2)
      formData.append('page_number', page_number)
      if (filesUpload) formData.append("page_pdf", filesUpload.file)


      try {
        setLoader(true)
        uplodeRequest(
          {
            url: "admin/story-management/story/book/page/edit",
            method: "POST",
            body: formData,
            headers: { "Content-Type": "multipart/form-data" },
          },
          data => {
            setLoader(false)
            if (data?.status == 'success') {
              toast.success(data?.message)
              handleClosesetOpenAddUser2()
              fetchPageList()
            }

          }
        )
      } catch (error) {
        setLoader(false)
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        <CustomButton
          variant="contained"
          customColor="#000000"
          customBgColor="#F3C11D"
          custmstyle={{
            padding: "5px 2px",
            width: "120px",
            fontSize: "13px",
          }}
          onClick={() => handlerAdd()}
        >
          Add Page
        </CustomButton>
      </div>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_right}>
              {/* <Slecter
                data={categoryOptions}
                label="Choose Orders"
                title="All Orders"
                width={"170"}
                value={category}
                onChange={e => setCategory(e.target.value)}
              /> */}
            </div>
          </div>
        </div>

        <CustomTable
          data={data}
          columns={MappingDetailsdata}
          loader={false}
          onSort={handleSort}
          paginationTotalRows={totalReporting}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          subHeader={false}
          children={false}
          isProcessing={true}
          processingMessage={
            "The story pages are being processed. Please check back shortly"
          }
        />
        {/* <div style={{ marginBottom: "20rem" }}></div> */}
      </div>

      {/* {openAdduser && (
        <CustomDialog
          open={openAdduser}
          handleClose={handleClosesetOpenAddUser}
          showCloseIcon={false}
          customWidth={"800px"}
          overflowY={"auto"}
        >
          <div className="dialog_loyout">
            <h3 className="dialog_loyout_title">{imageUrl?.page_number}</h3>
            <div className={classes.fileds_img}>
              <img
                src={imageUrl?.page_path}
                alt={`Page ${imageUrl?.page_number}`}
                onError={e => {
                  e.target.onerror = null
                  e.target.src = "path/to/fallback/image.jpg"
                }}
              />
            </div>
            <div>
              <div className={classes.fileds_set}>
                {Object.keys(selectedCharacters)
                  .sort()
                  .map(sequence => (
                    <CustomeSlecter
                      key={sequence}
                      data={characterOptions}
                      lable={`Character ${sequence}`}
                      title="Choose Character"
                      width={"200px"}
                      value={selectedCharacters[sequence] || ""}
                      onChange={e =>
                        handleCharacterChange(sequence, e.target.value)
                      }
                      borders={true}
                    />
                  ))}
              </div>{" "}
              {errorMsg && <p className="error_msg">{errorMsg}</p>}
            </div>

            <div className="btn_group">
              <button
                className="btn_cancel"
                onClick={handleClosesetOpenAddUser}
              >
                Cancel
              </button>
              <button
                disabled={isEmpty}
                className="btn_submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </CustomDialog>
      )} */}

      {loader && <OverlayLoding />}


      <CustomDialog
        open={openAdduser2}
        handleClose={handleClosesetOpenAddUser2}
        showCloseIcon={false}
        customWidth={"500px"}
        overflowY={"unset"}
        children={
          <>
            <>
              <div className="dialog_loyout">
                <h3 className="dialog_loyout_title">Edit Page</h3>
                <div className={`${classes.fileds} ${classes.inputalin}`}>
                  <CustomTextField
                    id="shippingPartner"
                    label="Page Number"
                    placeholder="Enter your Page Number"
                    variant="outlined"
                    value={page_number}
                    onChange={(e) => setpage_number(e.target.value)}
                    // helperText={errors.shippingPartner ? "Required" : ""}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ width: "100%" }}
                  />
                  <div>
                    <p>PDF</p>
                    <FileUploadComponent
                      acceptedTypes={["application/pdf"]}
                      maxSize={200}
                      onFilesChange={files => setFilesUpload(files[0])}
                      className="width_min"
                      dropzoneText="Upload Page PDF"
                      box_controlerl={"box_sizeing"}
                      multiple={false} // Ensure single file upload
                      types="PDF"
                      existingFile={existingObject}
                    />
                  </div>
                </div>
                <div className="btn_group">
                  <button
                    className="btn_cancel"
                    onClick={handleClosesetOpenAddUser2}
                  >
                    Cancel
                  </button>
                  <button className="btn_submit" onClick={handleAddAddressSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </>
          </>
        }
      />


      {/* <Modal show={openAdduser2}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser2()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="md"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={"addUser"}>
              <h3 className={"addUserHeader"}>Edit PDF</h3>
              <div className={"addUserForm"}>
                <div className={"addUserInput"}>
                  <div className={"input_text_filed d-flex justify-content-center mt-5 mb-5"}>

                    <CustomTextFieldLogin
                      id="awbNo"
                      label="AWB NO"
                      placeholder="Enter your AWB NO"
                      variant="outlined"
                      // value={formValues.awbNo}
                      // onChange={handleChangeValue}
                      // error={errors.awbNo}
                      // helperText={errors.awbNo ? "Required" : ""}
                      InputLabelProps={{ shrink: true }}
                      required
                      sx={{ width: "100%" }}
                    />
                    <FileUploadComponent
                      acceptedTypes={["application/pdf"]}
                      maxSize={200}
                      onFilesChange={files => setFilesUpload(files[0])}
                      className="width_min"
                      dropzoneText="Upload Page PDF"
                      box_controlerl={"box_sizeing"}
                      multiple={false} // Ensure single file upload
                      types="PDF"
                      existingFile={existingObject}
                    />
                  </div>
                </div>

                <div className={"d-flex justify-content-center gap-3 mt-3 mb-3"}>
                  <button
                    className={'cancel_btn'}
                    onClick={handleClosesetOpenAddUser2}
                  >
                    Cancel
                  </button>
                  <button
                    className={'sumt_btn'}
                    onClick={handleAddAddressSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Modal> */}


      <ReusableScrollDialog
        open={openAdduser}
        onClose={handleClosesetOpenAddUser}
        scroll="body" // or "paper"
        dialogWidth="900px"
      >
        <div className="dialog_loyout">
          <h3 className="dialog_loyout_title" style={{ marginBottom: "1rem" }}>
            {imageUrl?.page_number}
          </h3>
          <div className={classes.fileds_img}>
            {/* {imageUrl?.is_cover && (
              <img
                src={imageUrl?.page_path}
                alt={`Page ${imageUrl?.page_number}`}
                onError={e => {
                  e.target.onerror = null
                  e.target.src = "path/to/fallback/image.jpg"
                }}
              />
            )} */}
            {/* <img
              src={imageUrl?.page_path}
              alt={`Page ${imageUrl?.page_number}`}
              onError={e => {
                e.target.onerror = null
                e.target.src = "path/to/fallback/image.jpg"
              }}
            /> */}
            <ImageMapTool
              img={imageUrl?.page_path}
              setAllSize={setAllSize}
              allSize={allSize}
              defaultCoords={allSize}
            />

            {/* <FileViewerLightbox1
              fileUrl={imageUrl?.page_path}
              children={
                <ImageMapTool
                  img={imageUrl?.page_path}
                  setAllSize={setAllSize}
                  allSize={allSize}
                />
              }
            /> */}
          </div>
          {/* {!editData?.is_cover && ( */}
          <>
            {/* {!editData?.is_cover && ( */}
            <>
              <div>
                <p className={classes.header_title_set}>
                  How to Enter Story Lines with Character Names
                </p>

                <ul className={classes.ul_set}>
                  <li>
                    When writing the story lines, please enclose all character
                    names in square brackets [ ].
                  </li>
                  <li>
                    This ensures that the system can automatically replace
                    character names with the personalised names provided by
                    users.
                  </li>
                  <li>
                    Example: [Sophie] and her friend [Ben] love exploring the
                    forests. One day, they heard a whisper calling them deeper
                    into the woods.
                  </li>
                  <li>
                    If the same character name appears multiple times, enclose
                    it in brackets each time.
                  </li>
                  <li>
                    Only use brackets for names that need to be dynamically
                    replaced.
                  </li>
                </ul>
              </div>

              <div className={classes.marg_input_filed}>
                <MinHeightTextarea
                  // maxLength="255"
                  label="Story Lines"
                  title="Story Lines"
                  name="Story Lines"
                  rows={4}
                  value={text}
                  placeholder="Enter Story Lines"
                  // showpertext={`${charsLeft}/255`}
                  onChange={handleChange}
                // error={!!errors.description}
                />
              </div>
            </>
            {/* )} */}

            {/* <div className={classes.line_set}></div> */}
            <div>
              <div className={classes.fileds_set}>
                {Object.keys(selectedCharacters)
                  .sort()
                  .map(sequence => (
                    <CustomeSlecterAdmin
                      key={sequence}
                      data={characterOptions}
                      lable={`Character ${sequence}`}
                      title="Choose Character"
                      width={"200px"}
                      value={selectedCharacters[sequence] || ""}
                      onChange={e =>
                        handleCharacterChange(sequence, e.target.value)
                      }
                      borders={true}
                    />
                  ))}
              </div>{" "}
              {errorMsg && <p className="error_msg">{errorMsg}</p>}
            </div>
            <div className={classes.autoRenewal}>
              <div className={classes.switchSection}>
                <h4 className={classes.fieldHeader}>
                  Set this as preview page
                </h4>
                <AutoRenewalSwitch
                  checked={isPreviewPage}
                  onChange={autoRenewalSwitchChange}
                  disabled={
                    editData?.is_preview === 1 ||
                    editData?.is_preview === "1" ||
                    editData?.is_preview === true
                  }
                  // disabled={true}
                  inputProps={{ "aria-label": "ant design" }}
                />
              </div>
            </div>
          </>
          {/* // )} */}

          <div className="btn_group">
            <button className="btn_cancel" onClick={handleClosesetOpenAddUser}>
              Cancel
            </button>
            <button
              disabled={isEmpty}
              className="btn_submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </ReusableScrollDialog>
      <FileViewerLightbox1
        fileUrl={preview}
        isOpen={lightboxOpen}
        isLoading={loading}
        onClose={() => setLightboxOpen(false)}
      >
        {preview && (
          <img
            className={classes["modal-content"]}
            src={preview}
            alt="Preview"
          />
        )}
      </FileViewerLightbox1>
    </>
  )
})

export default MappingDetails
