import React, { useEffect, useState } from "react"
import classes from "./QcList.module.css"
import CustomTable from "../../components/UI/Table/TablePage"
import Slecter from "../../components/UI/Dropdown/Select"
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
import { useNavigate } from "react-router-dom"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import axios from "axios"
import DashboardBoxes from "../../components/DashboardBoxes/DashboardBoxes"

const QcList = () => {
  const { isLoading, success, error, sendRequest } = useApiHttp()
  const {
    isLoading: setDeleteLoading,
    success: setDeleteSuccess,
    error: setDeleteError,
    sendRequest: setDeleteUserList,
  } = useApiHttp()
  const navigate = useNavigate()
  const [dashboardBoxesData, setDashboardBoxesData] = useState({})
  // Pagination and Sorting states for Ready To Use
  const [category, setCategory] = useState("")
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
  const [moduleCategoryList, setModuleCategoryList] = useState([
    {
      id: "pending",
      name: "Pending",
    },
    {
      id: "passed",
      name: "Passed",
    },
    {
      id: "failed",
      name: "Failed",
    },
  ])
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
    // sendRequest(
    //   {
    //     url: `admin/drop-down/order-status`,
    //   },
    //   data => {
    //     setModuleCategoryList(data?.data)
    //   }
    // )
  }, [])
  const handleToDateChange = value => {
    const newToDate = dayjs(value).format("YYYY-MM-DD")
    setToDate(newToDate)
  }

  const StoryListData = [
    {
      name: "S.No",
      selector: row => row.sl_no,
      sortable: false,
      sortField: 0,
      maxWidth: "86px",
      minWidth: "50px",
    },
    {
      name: "Order ID",
      cell: row => (
        <>
          <p
            className="action_text action_text_pointer flex"
            onClick={() =>
              navigate("/admin/qc_list/qc_details", {
                state: {
                  storyId: row.id, // Your actual ID
                },
              })
            }
          >
            {row.order_number}
          </p>
        </>
      ),
      // maxWidth: "190px",
      // minWidth: "150px",
      sortable: false,
      sortField: 7,
    },

    {
      name: "Customer Name",
      selector: row => row.user_name,
      sortable: false,
      sortField: 1,
      // maxWidth: "190px",
      // minWidth: "170px",
    },
    {
      name: "Title",
      selector: row => `${row.title}(${row.gender})`,
      sortField: 2,
      sortable: false,
      wrap: true,
      style: {
        whiteSpace: "normal", // Prevents truncation
        wordBreak: "break-word", // Ensures long words wrap
      },
      // maxWidth: "190px",
      // minWidth: "150px",
    },
    // {
    //   name: "Is Gift",
    //   selector: row => <p>{row.is_gift === 0 ? "No" : "Yes"}</p>,
    //   sortField: 2,
    //   sortable: false,
    //   maxWidth: "190px",
    //   minWidth: "150px",
    // },
    {
      name: "Received Date",
      selector: row => row.created_at,
      sortable: false,
      sortField: 4,
      // maxWidth: "190px",
      // minWidth: "150px",
    },

    {
      name: "Order Status",
      cell: row => {
        const getStatusLabel = status => {
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

        const { text, className } = getStatusLabel(row.status)

        return <div className={className}>{text}</div>
      },
      sortable: false,
      sortField: 7,
      maxWidth: "190px",
      minWidth: "150px",
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
      url: `${baseUrl}/admin/quality-management/list/download`,
      data: {
        type: fileType,
        search: searchValue,
        filter: {
          status: category, // active,inactive
          from_date: fromDate, // d-m-Y
          to_date: toDate,
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
        let fileName = `${"Qc"}.${fileType}` // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1]
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"Qc"}.${fileType}`
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

  const viewList = () => {
    sendRequest(
      {
        url: `admin/quality-management/list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          filter: {
            status: category, // active,inactive
            from_date: fromDate, // d-m-Y
            to_date: toDate,
          },
        },
      },
      data => {
        setData(data?.data?.orders)
        setTotalReporting(data?.data?.total_count)
      }
    )
  }
  useEffect(() => {
    viewList()
  }, [page, perPage, searchValue, category, fromDate, toDate])
  const apiBoxesData = () => {
    sendRequest(
      {
        url: `admin/quality-management/count`,
      },
      data => {
        setDashboardBoxesData(data?.data)
      }
    )
  }

  useEffect(() => {
    apiBoxesData()
  }, [])

  const clearAll = () => {
    setCategory("")
    setFromDate(currentDate()) // Set initial from date
    setToDate(currentDate()) // Set initial to date
  }

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        {/* <DashboardBoxes data={dashboardBoxesData} /> */}
        <div className={classes.header_table}>
          <h3>Quality Check</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>{totalReporting} Books</p>
              <Slecter
                data={
                  moduleCategoryList?.map(sub => ({
                    label: sub.name,
                    value: sub.id,
                  })) || []
                }
                label="Choose Orders"
                title="All Orders"
                width={"170"}
                value={category}
                onChange={e => setCategory(e.target.value)}
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

              <span className={classes.clearall} onClick={clearAll}>
                clear all
              </span>
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
            </div>
          </div>
        </div>
        <div style={{ marginBottom: " 2rem" }}>
          <CustomTable
            data={data}
            columns={StoryListData}
            loader={false}
            onSort={handleSort}
            paginationTotalRows={totalReporting}
            paginationServer
            pagination={totalReporting > perPage} // Only enable when needed
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            // subHeader={false}
            children={false}
          />
        </div>
      </div>
    </>
  )
}

export default QcList
