import React, { useEffect, useState, useCallback, useMemo } from "react"
import classes from "./ConfigureCoverImage.module.css"
import CustomTable from "../../../components/UI/Table/TablePage"
import CustomDialog from "../../../components/UI/Dialog/Dialog"
import { IconButton } from "@mui/material"
import edit from "../../../assets/image/svg/edit.svg"
import Swal from "sweetalert2"
import Slecter from "../../../components/UI/Dropdown/Select"
import CustomeSlecter from "../../../components/UI/Dropdown/CustomeSlecter"
import FileViewerLightbox from "../../../components/UI/PdfView/Lightbox/LightboxImgPdf"
import useApiHttp from "../../../hooks/ues-http"
import ImageMapTool, { scaleCoordinatesToOriginal } from "../../../features/ManageStory/StoryLIst/ImageMapGenerator"
import ReusableScrollDialog from "../../../components/UI/Dialog/ReusableScrollDialog"
import MinHeightTextarea from "../../../components/UI/TextArea/Textarea"
import FileViewerLightbox1 from "../../../components/UI/Lightbox/LightboxImgPdf"
import toast, { Toaster } from "react-hot-toast"
import { Box, CircularProgress, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { set } from "lodash"
import CustomButton from "../../../components/UI/Button/Button"
import FileUploadComponent from "../../../components/UI/FileUploadComponent/FileUploadComponent"
import TrashIcon from "../../../assets/image/svg/trash_icon.svg"
import UploadThumbnail from "../../../components/UI/UploadThumbnail/UploadThumbnail"
import OverlayLoding from "../../../components/UI/Loding/OverlayLoding"
import CustomeSlecterAdmin from "../../../components/UI/Dropdown/CustomeSlecterAdmin"



const ConfigureCoverImage = ({ storyId = "01k1aydw94gr5wmjtej7z5qhgb" }) => {
  // State management
  const [page, setPage] = useState(1)
  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [perPage, setPerPage] = useState(30)
  const [column, setColumn] = useState(0)
  const [totalReporting, setTotalReporting] = useState(0)
  const [openAdduser, setOpenAdduser] = useState(false);
  const [openAddCoverImageModal, setopenAddCoverImageModal] = useState(false);
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
  const [errorMsg, setErrorMsg] = useState("");
  const [coverImageErrorMsg, setcoverImageErrorMsg] = useState("");
  const [text, setText] = useState("")
  const [allSize, setAllSize] = useState(null)
  const [editData, setEditData] = useState({})
  const [isPreviewPage, setisPreviewPage] = useState(false)


  const [status, setStatus] = useState("Checking...")
  const [preview, setPreview] = useState("")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState({})


  const isEmpty = useMemo(() => {
    return Object.keys(selectedCharacters).length === 0
  }, [selectedCharacters])

  // API hooks
  const { sendRequest } = useApiHttp()
  const {
    isLoading: uplodeLoading,
    success: uplodeSuccess,
    error: uplodeError,
    sendRequest: uplodeRequest,
  } = useApiHttp();
  const {
    isLoading: setDeleteLoading,
    success: setDeleteSuccess,
    error: setDeleteError,
    sendRequest: setDeleteCoverImage,
  } = useApiHttp()

  // Memoized API call for book characters
  const fetchBookCharacters = useCallback(
    async id => {
      if (!id) return

      try {
        const response = await sendRequest({
          url: `admin/story-management/cover-image/view/${id}`,
        })
        const characters = response?.data || []
        setCharacterNumber(characters?.characters)
        setEditData(characters)



        // Initialize character selections
        const initialSelections = {}
        characters?.characters.forEach(char => {
          // initialSelections[char.sequence] = char.book_character_id
          initialSelections[char.sequence] = char.character_type_id
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
      const [charactersRes] = await Promise.all([
        sendRequest({
          url: `admin/drop-down/character-types`,
        })

      ])


      if (charactersRes?.data) {
        setCharacterTypeOptions(charactersRes.data)
      }
    } catch (error) {
      console.error("Error fetching initial data:", error)
    }
  }, [sendRequest])

  // Memoized API call for page list
  const fetchPageList = useCallback(async () => {
    if (!storyId) return

    try {
      const response = await sendRequest({
        url: `admin/story-management/cover-image/list`,
        method: "POST",
        body: {
          "page": page,
          "per_page": perPage,
          "search": searchValue,
          "filter": {
            "status": "" // pending, mapped
          }
        }
      })
      setData(response?.data?.list || [])
      setTotalReporting(response?.data?.total_count || 0)
    } catch (error) {
      console.error("Error fetching page list:", error)
    }
  }, [sendRequest])

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
      // {
      //   name: "Page No",
      //   cell: row => <p>{row?.page_number}</p>,
      //   maxWidth: "150px",
      //   minWidth: "150px",
      //   sortable: true,
      //   sortField: 7,
      // },
      {
        name: "Image",
        cell: row => <FileViewerLightbox fileUrl={row?.image} customComp={<p
          className={classes.Sample_Preview}
          style={{
            width: "125px",
            height: "90px"
          }}
        // onClick={() => setShowViewer(true)}
        >
          {" "}
          <img style={{
            width: "100%",
          }} src={row?.image} alt="cover_image" />

        </p>} />,
        sortable: false,
        sortField: 5,
      },
      {
        name: "Family Members",
        selector: row => row?.characters,
        sortable: false,
        sortField: 4,
        wrap: true,
        style: {
          whiteSpace: "normal", // Prevents truncation
          wordBreak: "break-word", // Ensures long words wrap
        },

      },
      {
        name: "Uploaded Date",
        selector: row => row?.uploaded_date,
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
                return { text: "CANCELLED", className: "status_lable unknown" }
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
        cell: row => (
          <div className="action_btn">
            <IconButton
              onClick={() => {
                handlerAddAndEdit(row)
                setImage(row.page_path)
              }}
            >
              <img src={edit} alt="edit" />
            </IconButton>

            {/* <IconButton
              disabled={row.status === "mapped" ? false : true}
              sx={{ fontSize: "14px", fontWeight: "800" }}
              onClick={() => handlerPreviewImg(row.id)}
            >
              Preview
            </IconButton> */}
            <IconButton onClick={() => { deleteCoverImage(row?.id) }}>
              <img src={TrashIcon} alt="delete" />
            </IconButton>
          </div>
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
    setCoverImageFile({});
    setcoverImageErrorMsg("")
  }, [])

  const handleCloseCoverImageModal = () => {
    setopenAddCoverImageModal(false);
    handleClosesetOpenAddUser();
  }

  const handleCoverImageCreateHandler = () => {
    const formData = new FormData()
    formData.append("image", coverImageFile.file)

    uplodeRequest({
      url: "admin/story-management/cover-image/create",
      method: "POST",
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },


    }, resp => {
      setopenAddCoverImageModal(false);
      Swal.fire(
        "Added!",
        "Cover Image added successfully",
        "success"
      )
      handleClosesetOpenAddUser();
      fetchPageList()
    })
  }

  const deleteCoverImage = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be delete this Image.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        setDeleteCoverImage(
          {
            url: `admin/story-management/cover-image/delete/${id}`,
            method: "DELETE",
          },
          data => {
            fetchPageList()
          }
        )
      }
    })
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


  const handleSubmit = useCallback(async () => {
    try {
      const mapped_characters = Object.entries(selectedCharacters)
        .filter(([_, character_type_id]) => character_type_id)
        .map(([sequence, character_type_id]) => {
          const character = characterNumber.find(
            char => char.sequence === parseInt(sequence)
          )

          return {
            id: character?.id || "",
            character_type_id,
          }
        })

      if (mapped_characters.length === 0) {
        setErrorMsg("Please select at least one character.")
        return
      }




      await sendRequest(
        {
          url: `admin/story-management/cover-image/map-characters`,
          method: "POST",
          body: {
            id: editCatID,
            characters: mapped_characters,

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
    editCatID,
    text,
  ])



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
    const maxChar = 255
    const truncatedValue = value.slice(0, maxChar)
    setText(truncatedValue)
  }

  const autoRenewalSwitchChange = (e) => {
    console.log("target", e.target.checked);

    setisPreviewPage(e.target.checked)

  };

  const handleThumbnailChange = (file) => {
    setcoverImageErrorMsg('')

    setCoverImageFile(file);

  }



  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Cover Image Library</h3>

          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>
                {totalReporting}{" "}
                {totalReporting > 1 ? "Stories" : "Story"}
              </p>
            </div>
            <div className={classes.header_table_right}>
              {/* <Slecter
                data={categoryOptions}
                label="Choose Orders"
                title="All Orders"
                width={"170"}
                value={category}
                onChange={e => setCategory(e.target.value)}
              /> */}
              <CustomButton
                variant="contained"
                customColor="#000000"
                customBgColor="#F3C11D"
                custmstyle={{
                  padding: "5px 2px",
                  width: "120px",
                  fontSize: "13px",
                }}
                onClick={() => setopenAddCoverImageModal(true)}
              >
                Add New
              </CustomButton>
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
        // isProcessing={true}
        // processingMessage={
        //   "The story pages are being processed. Please check back shortly"
        // }
        />
        {/* <div style={{ marginBottom: "20rem" }}></div> */}
      </div>

      {openAddCoverImageModal && (
        <CustomDialog
          open={openAddCoverImageModal}
          handleClose={handleCloseCoverImageModal}
          showCloseIcon={false}
          customWidth={"500px"}
          overflowY={"auto"}
        >
          <div className="dialog_loyout">
            <h3 className="dialog_loyout_title">{"Add Cover Image "}</h3>
            <div
              style={{
                width: "50%",/* Or any specific width */
                margin: "20px auto" /* This centers the div horizontally */
              }}
            >

              <UploadThumbnail
                label="Upload Cover Image"
                onFileChange={(file, preview) => {
                  handleThumbnailChange(file)
                }}
                id={`thumbnail_${0}_${0}`}
                error={!coverImageFile?.file}
                helperText={coverImageErrorMsg}
                allowedTypes={["image/jpeg", "image/png"]}
                maxSizeMB={5}
              />
            </div>
            <div>
              <div className={classes.fileds_set}>
                {/* {Object.keys(selectedCharacters)
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
                  ))} */}

              </div>{" "}
              {coverImageErrorMsg && <p className="error_msg">{coverImageErrorMsg}</p>}
            </div>

            <div className="btn_group">
              <button
                className="btn_cancel"
                onClick={handleCloseCoverImageModal}
              >
                Cancel
              </button>
              <button
                disabled={!coverImageFile?.file}
                className="btn_submit"
                onClick={handleCoverImageCreateHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </CustomDialog>
      )}
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
            <img
              src={imageUrl?.image}
              alt={`Page ${imageUrl?.page_number}`}
              onError={e => {
                e.target.onerror = null
                e.target.src = "path/to/fallback/image.jpg"
              }}
            />
            {/* <ImageMapTool
              img={imageUrl?.image}
              setAllSize={setAllSize}
              allSize={allSize}
              defaultCoords={allSize}
            /> */}
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
          {/* <div>
            <p className={classes.header_title_set}>
              How to Enter Story Lines with Character Names
            </p>

            <ul className={classes.ul_set}>
              <li>
                When writing the story lines, please enclose all character names
                in square brackets [ ].
              </li>
              <li>
                This ensures that the system can automatically replace character
                names with the personalised names provided by users.
              </li>
              <li>
                Example: [Sophie] and her friend [Ben] love exploring the
                forests. One day, they heard a whisper calling them deeper into
                the woods.
              </li>
              <li>
                If the same character name appears multiple times, enclose it in
                brackets each time.
              </li>
              <li>
                Only use brackets for names that need to be dynamically
                replaced.
              </li>
            </ul>
          </div> */}

          {/* <div className={classes.marg_input_filed}>
            <MinHeightTextarea
              // maxLength="255"
              label="Story Lines"
              title="Story Lines"
              name="Story Lines"
              rows={3}
              value={text}
              placeholder="Enter Story Lines"
              // showpertext={`${charsLeft}/255`}
              onChange={handleChange}
            // error={!!errors.description}
            />
          </div> */}

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
          {/* <div className={classes.autoRenewal}>
            <div className={classes.switchSection}>
              <h4 className={classes.fieldHeader}>Set this as preview page</h4>
              <AutoRenewalSwitch
                checked={isPreviewPage}
                onChange={autoRenewalSwitchChange}
                disabled={editData?.is_preview === 1 || editData?.is_preview === "1" || editData?.is_preview === true}
                // disabled={true}
                inputProps={{ "aria-label": "ant design" }}
              />
            </div>
          </div> */}

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
      {uplodeLoading && <OverlayLoding />}
    </>
  )
}

export default ConfigureCoverImage
