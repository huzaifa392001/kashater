import React, { useEffect, useState } from "react"
import classes from "./ComingSoon.module.css"
import CustomTable from "../../components/UI/Table/TablePage"
import SearchExpand from "../../components/UI/SearchExpand/SearchExpand"
import CustomButton from "../../components/UI/Button/Button"
import DropDownFile from "../../components/UI/DropDownFile/DropDownFile"
import FromToDatePicker from "../../components/UI/DatePicker/FromToDatePicker"
import { currentDate } from "../../utils/helper"
import dayjs from "dayjs"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import {
  validateEmail,
  validatePhoneNumber,
  validateTextInput,
} from "../../utils/validation"
import PhoneNumInput from "../../components/UI/PhoneNumInput/PhoneNumInput"
import useInput from "../../utils/use-input"
import CustomeSlecter from "../../components/UI/Dropdown/CustomeSlecter"
import CheckBox from "../../components/UI/Checkbox/Checkbox/CheckBox"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import FileViewerLightbox from "../../components/UI/PdfView/Lightbox/LightboxImgPdf"
import UploadThumbnail from "../../components/UI/UploadThumbnail/UploadThumbnail"
import toast from "react-hot-toast"
import OverlayLoding from "../../components/UI/Loding/OverlayLoding"

const ComingSoon = () => {
  const [page, setPage] = useState(1)
  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [perPage, setPerPage] = useState(10)
  const [column, setColumn] = useState(0)
  const [total, setTotal] = useState([])
  const [totalReporting, setTotalReporting] = useState(0)
  const [openAdduser, setOpenAdduser] = useState(false)
  const [type, setType] = useState("")
  const [editCatID, setEditCatID] = useState("")
  // Search state
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [listsTrigger, setlistsTrigger] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)

  const [originalData, setOriginalData] = useState(null)

  const ConfigureCategorydata = [
    {
      name: "S.No",
      selector: row => row.sl_no,
      sortable: false,
      sortField: 0,
      maxWidth: "76px",
      minWidth: "50px",
    },
    {
      name: "Title",
      cell: row => (
        <>
          <p className="">{row?.title}</p>
        </>
      ),
      maxWidth: "150px",
      minWidth: "150px",
      sortable: true,
      sortField: 7,
    },
    {
      name: "Image Preview",
      //   selector: row => row?.gif_path,
      cell: row => <FileViewerLightbox fileUrl={row?.gif_path} />,
      sortable: false,
      sortField: 5,
    },
    // {
    //   name: "Created Date",
    //   selector: row => row?.created_date,
    //   sortable: false,
    //   sortField: 4,
    // },

    {
      name: "",
      cell: row => (
        <>
          <div className="action_btn">
            <button
              className="action_edit"
              onClick={() => handlerAddAndEdit("edit", row)}
            >
              Edit
            </button>
            <button className="action_delete" onClick={() => handleDelete(row)}>
              Delete ffff
            </button>
          </div>
        </>
      ),
      sortable: false,
      sortField: 7,
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

  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    handleClearInput()
  }

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(validateTextInput)

  const { sendRequest: categoryLists } = useApiHttp()
  const { isLoading: addLoading, sendRequest: addCategory } = useApiHttp()
  const { isLoading: updateLoading, sendRequest: updateCategory } = useApiHttp()
  const { sendRequest: deleteCategory } = useApiHttp()

  const handlerAddAndEdit = (type, row = {}) => {
    setType(type)
    if (type === "edit") {
      nameChangeHandler({ target: { value: row?.title } })
      setEditCatID(row?.id)
      const original = {
        title: row?.title || "",
        image1: row?.image1_path || null,
        image2: row?.image2_path || null,
      }
      setOriginalData(original)

      setImage1(
        row?.image1_path ? { file: null, preview: row.image1_path } : null
      )
      setImage2(
        row?.image2_path ? { file: null, preview: row.image2_path } : null
      )
    } else {
      resetNameInput()
      setImage1(null)
      setImage2(null)
      setOriginalData(null)
    }
    setOpenAdduser(true)
  }
  const handleClearInput = () => {
    resetNameInput()
    setType("add")
    setEditCatID("")
    setImage1(null)
    setImage2(null)
  }

  const isFormChanged = () => {
    if (type === "add") {
      return name.trim() !== "" && image1?.file && image2?.file
    }

    if (type === "edit" && originalData) {
      const titleChanged = name !== originalData.title
      const image1Changed =
        image1?.file || image1?.preview !== originalData.image1
      const image2Changed =
        image2?.file || image2?.preview !== originalData.image2

      return titleChanged || image1Changed || image2Changed
    }

    return false
  }

  const handleDelete = row => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this category.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        deleteCategory(
          {
            method: "DELETE",
            url: `admin/configure-coming-soon/delete/${row?.id}`,
          },
          () => {
            Swal.fire(
              "Deleted!",
              "Your category has been deleted.",
              "success"
            ).then(() => {
              // Optionally, refresh the category list or perform any other action
              setlistsTrigger(prev => !prev)
            })
          }
        )
      }
    })
  }

  const handleSubmit = () => {
    const formData = new FormData()

    if (!nameIsValid) {
      toast.error("Please enter a valid title.")
      return
    }

    // Require images (file OR existing url)
    if (!(image1?.file || image1?.preview)) {
      toast.error("Image 1 is required.")
      return
    }
    if (!(image2?.file || image2?.preview)) {
      toast.error("Image 2 is required.")
      return
    }

    formData.append("title", name)

    if (type === "add") {
      formData.append("image1", image1.file)
      formData.append("image2", image2.file)

      addCategory(
        {
          url: `admin/configure-coming-soon/create`,
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        },
        () => {
          setOpenAdduser(false)
          // Swal.fire("Added!", "Your category has been added.", "success").then(
          //   () => {

          //   }
          // )
          listBookviewData()
          handleClosesetOpenAddUser()
        }
      )
    } else {
      formData.append("id", editCatID)

      if (image1.file) formData.append("image1", image1.file)
      else formData.append("image1", image1.url)

      if (image2.file) formData.append("image2", image2.file)
      else formData.append("image2", image2.url)

      updateCategory(
        {
          url: `admin/configure-coming-soon/update`,
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        },
        () => {
          setOpenAdduser(false)
          // Swal.fire(
          //   "Updated!",
          //   "Your category has been updated.",
          //   "success"
          // ).then(() => {
          //   handleClosesetOpenAddUser()
          // })
          listBookviewData()
          handleClosesetOpenAddUser()
        }
      )
    }
  }

  // Function to handle checkbox toggle
  const handleCheckboxToggle = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter(selectedItem => selectedItem !== item)
      )
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const listBookviewData = () => {
    categoryLists(
      {
        url: `admin/configure-coming-soon/list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          sort_column: column,
          sort_order: sortDirectionData,
        },
      },
      data => {
        console.log(data, "hi")

        setData(data.data.data)
        // setTotal(data.data.length)
        setTotalReporting(data.data.total_count)
      }
    )
  }

  useEffect(() => {
    listBookviewData()
  }, [page, perPage, searchValue, sortDirectionData, listsTrigger])

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Configure Coming soon</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>
                {totalReporting}{" "}
                {totalReporting > 1 ? "Book Previews" : "Book Previews"}
              </p>
            </div>
            <div className={classes.header_table_right}>
              {/* <DropDownFile handleFileDownload={onDownloadItemClick} /> */}
              {/* <div className={classes.filters}></div> */}
              <SearchExpand
                placeholder="Search Category..."
                onSearchChange={value => setSearchValue(value)}
                searchValue={searchValue}
                maxWidth="500px"
              />

              <CustomButton
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
                Add New
              </CustomButton>
            </div>
          </div>
        </div>
        <CustomTable
          data={data}
          columns={ConfigureCategorydata}
          loader={false}
          onSort={handleSort}
          paginationTotalRows={totalReporting}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          subHeader={false}
          children={false}
        />
      </div>
      {openAdduser && (
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
                  {type === "add" ? "Add Coming Soon" : "Edit Coming Soon"}
                </h3>
                <div className={classes.fileds}>
                  <CustomTextField
                    id="Title"
                    label="Title"
                    placeholder="Enter your Title"
                    variant="outlined"
                    value={name}
                    sx={{
                      width: "100%",
                    }}
                    onChange={nameChangeHandler}
                    error={nameHasError}
                    onBlur={nameBlurHandler}
                    // helperText={nameHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </div>
                <h3 className={classes.uplodeset_header}>Upload Images</h3>
                <div className={classes.uplodeset}>
                  <UploadThumbnail
                    id="upload-image-1" // unique id
                    headerLabel="Upload Image 1"
                    label="Supports JPG, PNG, JPEG"
                    onFileChange={file => setImage1(file)}
                    custmstyle={{ width: "241px" }}
                    allowedTypes={["image/jpeg", "image/png"]}
                    maxSizeMB={5}
                    initialImage={image1}
                  />
                  <UploadThumbnail
                    id="upload-image-2" // unique id
                    headerLabel="Upload Image 2"
                    label="Supports JPG, PNG, JPEG"
                    onFileChange={file => setImage2(file)}
                    custmstyle={{ width: "241px" }}
                    allowedTypes={["image/jpeg", "image/png"]}
                    maxSizeMB={5}
                    initialImage={image2}
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
                    disabled={!isFormChanged()}
                    className="btn_submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          }
        />
      )}

      {(addLoading || updateLoading) && <OverlayLoding />}
    </>
  )
}

export default ComingSoon
