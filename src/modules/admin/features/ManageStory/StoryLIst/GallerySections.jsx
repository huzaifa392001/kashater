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
import CustomeSlecterWhite from "../../../components/UI/Dropdown/CustomeSlecterWhite"
import useIsMobile from "../../../../web/hooks/useIsMobile"
import CustomeSlecterBlack from "../../../components/UI/Dropdown/CustomeSlecterBlack"
import VideoUploadComponent from "../../../../web/components/UI/FileUploadComponent/VideoUploadComponent"

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

const GallerySections = React.memo(({ storyId, booksData }) => {
  // State management
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [perPage, setPerPage] = useState(30)
  const [column, setColumn] = useState(0)
  const [totalReporting, setTotalReporting] = useState(0)
  const [openAdduser, setOpenAdduser] = useState(false)
  const [openAdduser2, setOpenAdduser2] = useState(false)
  const [openAdduserData, setOpenAdduserData] = useState(null)
  const [Editable, setEditable] = useState(false)
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
  const ismobile = useIsMobile(768)
  const [galleryType, setGalleryType] = useState("")

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
    isLoading: setDeleteLoading,
    success: setDeleteSuccess,
    error: setDeleteError,
    sendRequest: setDeleteUserList,
  } = useApiHttp()

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
        url: `admin/story-management/story/book-gallery-list?book_id=${storyId}&page=${page}`,
      })
      let temp = []
      response?.data?.data?.map((item, ind) => {
        temp.push({
          ...item,
          sl_no: (+response?.data?.page - 1) * 10 + ind + 1
        })
      })
      setData(temp || [])
      setTotalReporting(response?.data?.total || 0)
    } catch (error) {
      console.error("Error fetching page list:", error)
    }
  }, [sendRequest, storyId, page])

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
        setDeleteUserList(
          {
            url: `admin/story-management/story/book-gallery-delete/${id}`,
            method: "DELETE",
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
        name: "Type",
        selector: row => row?.type == 2 ? 'Video' : "Image",
        sortable: false,
        sortField: 4,
      },
      {
        name: "Image",
        cell: row => <FileViewerLightbox fileUrl={row.file_url} fileType={row?.type == 2 ? 'video' : 'image'} />,
        sortable: false,
        sortField: 5,
      },

      {
        name: "Action",
        cell: row => (
          <>
            <div className="action_btn">
              <IconButton
                onClick={() => {
                  handlerAddAndEdit(row)
                  setImage(row.page_path)
                }}
              >
                <img src={edit} alt="edit" />
              </IconButton>

              <IconButton
                onClick={() => deleteUserRolelistData(row.id)}
              >
                <img src={TrashIcon} alt="edit" />
              </IconButton>
            </div>
          </>
        ),
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
    setOpenAdduserData(null)
    setFilesUpload(null)
    setGalleryType("")
    setEditable(false)
  }

  const handlerAddAndEdit = (row_data) => {
    setGalleryType(row_data?.type)
    setOpenAdduserData(row_data?.file_url)
    setEditable(true)
    setOpenAdduser2(row_data?.id)
  }



  const handlerAdd = () => {
    setOpenAdduser2(true)
  }

  const handleAddAddressSubmit = () => {
    const formData = new FormData()
    if (!galleryType) {
      toast.error('Select Type')
    } else if (!filesUpload) {
      toast.error(`Upload ${galleryType == 2 ? 'Gallery Video' : 'Gallery Image'}`)
    } else {
      formData.append('type', galleryType)
      if (filesUpload) formData.append("file", filesUpload.file)


      try {
        setLoader(true)

        let path_url = "admin/story-management/story/book-gallery-create"

        if (Editable) {
          path_url = `admin/story-management/story/book-gallery-update/${openAdduser2}`
        } else {
          formData.append('book_id', storyId)
        }

        uplodeRequest(
          {
            url: path_url,
            method: "POST",
            body: formData,
            headers: { "Content-Type": "multipart/form-data" },
          },
          data => {
            console.log('data', data);

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
      <div className="d-flex justify-content-end mb-3">
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
          Add Gallery
        </CustomButton>
      </div>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
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
            "No Data Found"
          }
        />
        {/* <div style={{ marginBottom: "20rem" }}></div> */}
      </div>
      {uplodeLoading && <OverlayLoding />}


      <Modal show={openAdduser2}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser2()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={"addUser"}>
              <h3 className={"addUserHeader"}>Add Gallery</h3>
              <div className={"addUserForm"}>
                <div className={"addUserInput"}>
                  <div className={"input_text_filed d-flex justify-content-center gap-5 mt-5 mb-5"}>
                    <div>
                      <CustomeSlecterWhite
                        data={[{ name: 'Image', value: 1 }, { name: 'Video', value: 2 }].map(a => ({
                          label: a.name,
                          value: a.value,
                        }))}
                        title="Type"
                        width={ismobile ? "100%" : "287px"}
                        value={galleryType}
                        onChange={e => {
                          setGalleryType(e.target.value)
                          setFilesUpload(null)
                          setOpenAdduserData(null)
                        }}
                        borders={true}
                        required
                        disabled={Editable}
                      />
                    </div>

                    {galleryType == 2 ? <VideoUploadComponent
                      acceptedTypes={[
                        "video/mp4",
                        "video/x-msvideo",
                        "video/quicktime",
                      ]}
                      maxSize={100}
                      onFilesChange={(files) =>
                        setFilesUpload(files[0])
                      }
                      className="width_min"
                      dropzoneText="Upload Gallery"
                      box_controlerl={"box_sizeing"}
                      types="Video"
                      multiple={false} // Ensure single file upload
                      method={'gallery'}
                    // stylesss={{ width: "100%", height: "206px" }}
                    /> : <FileUploadComponent
                      acceptedTypes={["image/*"]}
                      maxSize={200}
                      onFilesChange={files => setFilesUpload(files[0])}
                      className="width_min"
                      dropzoneText="Upload Gallery"
                      box_controlerl={"box_sizeing"}
                      multiple={false} // Ensure single file upload
                      types="Image"
                      existingFile={openAdduserData ? existingObject : null}
                    />}
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
      </Modal>
    </>
  )
})

export default GallerySections
