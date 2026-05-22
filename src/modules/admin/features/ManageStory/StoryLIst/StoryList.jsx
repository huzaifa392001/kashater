import React, { useEffect, useState } from "react"
import classes from "./StoryList.module.css"
import CustomTable from "../../../components/UI/Table/TablePage"
import Slecter from "../../../components/UI/Dropdown/Select"
import SearchExpand from "../../../components/UI/SearchExpand/SearchExpand"
import CustomButton from "../../../components/UI/Button/Button"
import DropDownFile from "../../../components/UI/DropDownFile/DropDownFile"
import FromToDatePicker from "../../../components/UI/DatePicker/FromToDatePicker"
import { currentDate } from "../../../utils/helper"
import dayjs from "dayjs"
import CustomDialog from "../../../components/UI/Dialog/Dialog"
import CustomTextField from "../../../components/UI/TextFiled/TextFiled"
import {
  validateEmail,
  validatePhoneNumber,
  validateTextInput,
} from "../../../utils/validation"
import PhoneNumInput from "../../../components/UI/PhoneNumInput/PhoneNumInput"
import useInput from "../../../utils/use-input"
import CustomeSlecter from "../../../components/UI/Dropdown/CustomeSlecter"
import { useNavigate } from "react-router-dom"
import useApiHttp from "../../../hooks/ues-http"
import Swal from "sweetalert2"
import axios from "axios"
import TrashIcon from "../../../assets/image/svg/trash_icon.svg"
import edit from "../../../assets/image/svg/edit.svg"
import { IconButton } from "@mui/material"
import toast, { Toaster } from "react-hot-toast"
import ToggleSwitch from "../../../components/UI/ToggleSwitch/ToggleSwitch"

const StoryList = () => {
  const { isLoading, success, error, sendRequest } = useApiHttp()
  const {
    isLoading: setDeleteLoading,
    success: setDeleteSuccess,
    error: setDeleteError,
    sendRequest: setDeleteUserList,
  } = useApiHttp()

  const {
    isLoading: categoryTypeLoading,
    success: categoryTypeSuccess,
    error: categoryTypeError,
    sendRequest: categoryTypeRequest,
  } = useApiHttp()
  const navigate = useNavigate()
  // Pagination and Sorting states for Ready To Use
  const [category, setCategory] = useState("")
  const [categoryType, setcategoryType] = useState("");
  const [gender, setGender] = useState("");
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
  const [categoryTypeList, setcategoryTypeList] = useState([])

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
  useEffect(() => {
    sendRequest(
      {
        url: `admin/drop-down/category`,
      },
      data => {
        setModuleCategoryList(data?.data)
      }
    )

    categoryTypeRequest({
      url: `admin/drop-down/book-type-category`,
    }, data => {
      setcategoryTypeList(data?.data)
    })
  }, [])
  const handleToDateChange = value => {
    const newToDate = dayjs(value).format("YYYY-MM-DD")
    setToDate(newToDate)
  }
  const handlerPalish = id => {
    sendRequest(
      {
        url: `admin/story-management/story/publish-book/${id}`,
      },
      data => {
        if (data?.code === 200) {
          toast.success(data?.message)
          viewList()
        }
        // setModuleCategoryList(data?.data)
      }
    )
  }

  const handleChange = (id, type, value) => {
    sendRequest(
      {
        url: `/admin/story-management/story/book-feature`,
        method: "POST",
        body: {
          book_id: id,
          type: type
        },
      },
      data => {
        if (data?.code === 200) {
          if (type == 1) {
            toast.success('Dive into Changed successfully')
          } else if (type == 2) {
            toast.success(`What's New Changed successfully`)
          } else if (type == 3) {
            toast.success('Featured Changed successfully')
          }

          viewList()
        }
        // setModuleCategoryList(data?.data)
      }
    )
  }

  const StoryListData = [
    {
      name: "S.No",
      selector: row => row.sl_no,
      sortable: false,
      sortField: 0,
      maxWidth: "76px",
      minWidth: "50px",
    },
    {
      name: "Story ID",
      cell: row => (
        <>
          <p
            className="action_text action_text_pointer flex"
            onClick={() =>
              navigate("/admin/storylists/in-your-backyard", {
                state: {
                  storyId: row.id, // Your actual ID
                },
              })
            }
          >
            {row.code}
          </p>
        </>
      ),
      maxWidth: "100px",
      minWidth: "100px",
      sortable: true,
      sortField: 7,
    },
    {
      name: "Title",
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
      selector: row => <p>{row.category}</p>,
      sortable: false,
      sortField: 1,
    },
    {
      name: "Category Type",
      selector: row => row.book_type_category,
      sortField: 2,
      sortable: false,
      maxWidth: "150px",
      minWidth: "150px",
    },

    {
      name: "Age Group",
      selector: row => row.age_group,
      sortField: 2,
      sortable: false,
      maxWidth: "150px",
      minWidth: "150px",
      wrap: true,
      style: {
        whiteSpace: "normal", // Prevents truncation
        wordBreak: "break-word", // Ensures long words wrap
      },
    },
    {
      name: "Gender",
      selector: row => row.gender,
      sortField: 2,
      sortable: false,
      maxWidth: "150px",
      minWidth: "150px",
    },
    {
      name: "Uploaded Date",
      selector: row => row.created_at,
      sortable: false,
      sortField: 4,
    },

    {
      name: "Dive into",
      cell: row => {
        return (
          <div className="d-flex justify-content-center mx-3">
            <ToggleSwitch
              checked={row?.dive_stories}
              onChange={e =>
                handleChange(
                  row.id,
                  1,
                  e.target.checked
                )
              }
            />
          </div>
        )
      },
      sortable: false,
      sortField: 7,
      maxWidth: "100px",
      minWidth: "100px",
    },

    {
      name: "Featured book",
      cell: row => {
        return (
          <div className="d-flex justify-content-center mx-3">
            <ToggleSwitch
              checked={row?.feature_book}
              onChange={e =>
                handleChange(
                  row.id,
                  3,
                  e.target.checked
                )
              }
            />
          </div>
        )
      },
      sortable: false,
      sortField: 7,
      maxWidth: "100px",
      minWidth: "100px",
    },

    {
      name: "What's New",
      cell: row => {
        return (
          <div className="d-flex justify-content-center mx-3">
            <ToggleSwitch
              checked={row?.whats_new}
              onChange={e =>
                handleChange(
                  row.id,
                  2,
                  e.target.checked
                )
              }
            />
          </div>
        )
      },
      sortable: false,
      sortField: 7,
      maxWidth: "100px",
      minWidth: "100px",
    },

    {
      name: "",
      cell: row => (
        <>
          <div className="action_btn">
            {/* <button
              className="action_edit"
              onClick={() => handlerAddAndEdit("edit")}
            >
              Edit
            </button> */}

            <IconButton onClick={() => deleteUserRolelistData(row.id)}>
              <img src={TrashIcon} alt="edit" />
            </IconButton>
            {row.status === "pending" && (
              <CustomButton
                variant="contained"
                customColor="#000000"
                customBgColor="#F3C11D"
                custmstyle={{
                  padding: "3px 2px",
                  width: "120px",
                  fontSize: "13px",
                  marginLeft: "10px",
                }}
                onClick={() => handlerPalish(row.id)}
              >
                Publish
              </CustomButton>
            )}

            {/* <button
              className="action_delete"
              onClick={() => deleteUserRolelistData(row.id)}
            >
              Delete
            </button> */}
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

  const onDownloadItemClick = fileType => {
    const currentToken = JSON.parse(
      localStorage.getItem("adminUserData")
    )?.authToken

    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "")

    axios({
      method: "post",
      url: `${baseUrl}/admin/story-management/story/download`,
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
        let fileName = `${"story"}.${fileType}` // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1]
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"story"}.${fileType}`
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
      state: { type: "add" },
    })
  }
  const handleClearInput = () => {
    resetEmailInput()
    resetNameInput()
    resetPhoneNum()
    setRole("")
    setType("")
  }
  const handleSubmit = () => {
    if (type === "add") {
      alert("add")
      // handleAddUser()
    } else {
      // handleEditUser()
      alert("edit")
    }
  }

  const viewList = () => {
    sendRequest(
      {
        url: `admin/story-management/story/list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          filter: {
            category_id: category, // active,inactive
            gender,
            book_type_category_id: categoryType,
            from_date: "", // d-m-Y
            to_date: "",
          },
        },
      },
      data => {
        setData(data?.data?.books)
        setTotalReporting(data?.data?.total_count)
      }
    )
  }
  useEffect(() => {
    viewList()
  }, [page, perPage, searchValue, category, fromDate, toDate, categoryType, gender])

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
            url: `admin/story-management/story/delete/${id}`,
            method: "DELETE",
          },
          data => {
            viewList()
          }
        )
      }
    })
  }

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Story List</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>{totalReporting} Stories</p>
              <Slecter
                data={
                  moduleCategoryList?.map(sub => ({
                    label: sub.name,
                    value: sub.id,
                  })) || []
                }
                label="Choose Category"
                title="All Category"
                width={"170"}
                value={category}
                onChange={e => setCategory(e.target.value)}
              // borders={true}
              />
              <Slecter
                data={
                  categoryTypeList?.map(sub => ({
                    label: sub.name,
                    value: sub.id,
                  })) || []
                }
                label="Choose Category Type"
                title="All Category Types"
                width={"170"}
                value={categoryType}
                onChange={e => setcategoryType(e.target.value)}
              // borders={true}
              />
              <Slecter
                data={
                  ["Boy", "Girl"]?.map(sub => ({
                    label: sub,
                    value: sub,
                  })) || []
                }
                label="Choose Gender"
                title="All Genders"
                width={"170"}
                value={gender}
                onChange={e => setGender(e.target.value)}
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
                placeholder="Search Story..."
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
                Add Story
              </CustomButton>
            </div>
          </div>
        </div>
        <CustomTable
          data={data}
          columns={StoryListData}
          loader={false}
          onSort={handleSort}
          paginationTotalRows={totalReporting}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          subHeader={false}
          children={false}
        />
      </div>
    </>
  )
}

export default StoryList
