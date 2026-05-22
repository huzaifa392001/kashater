import React, { useEffect, useState } from "react"
import classes from "./Rewards.module.css"
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
import Coin from "../../assets/image/svg/Coin.png"

const Rewards = ({ customerId }) => {
  const { isLoading, success, error, sendRequest } = useApiHttp()
  const {
    isLoading: setDeleteLoading,
    success: setDeleteSuccess,
    error: setDeleteError,
    sendRequest: setDeleteUserList,
  } = useApiHttp()
  const navigate = useNavigate()
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
  const [rewardPoints, setRewardPoints] = useState("")

  // Search state
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [moduleCategoryList, setModuleCategoryList] = useState([
    { name: "Used", id: "Used" },
    { name: "Credit", id: "Credit" },
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
  //   useEffect(() => {
  //     sendRequest(
  //       {
  //         url: `admin/drop-down/order-status`,
  //       },
  //       data => {
  //         // setModuleCategoryList(data?.data)
  //       }
  //     )
  //   }, [])
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
    // {
    //   name: "Description",
    //   cell: row => (
    //     <>
    //       <p
    //         className="action_text action_text_pointer flex"
    //         onClick={() =>
    //           navigate("/admin/orderlist/order_details", {
    //             state: {
    //               storyId: row.order_detail_id, // Your actual ID
    //             },
    //           })
    //         }
    //       >
    //         {row.order_number}
    //       </p>
    //     </>
    //   ),
    //   maxWidth: "190px",
    //   minWidth: "150px",
    //   sortable: false,
    //   sortField: 7,
    // },
    {
      name: "Description",
      selector: row => row.description,
      sortable: false,
      sortField: 5,
      //   maxWidth: "300px",
      minWidth: "350px",
    },

    {
      name: "Type",
      selector: row => row.type,
      sortable: false,
      sortField: 1,
      maxWidth: "190px",
      minWidth: "170px",
    },
    {
      name: "Points",
      selector: row => row.points,
      sortField: 2,
      sortable: false,
      maxWidth: "190px",
      minWidth: "150px",
    },
    {
      name: "Date",
      selector: row => row.date,
      sortField: 2,
      sortable: false,
      //   maxWidth: "190px",
      minWidth: "150px",
    },
    // {
    //   name: "Ordered Date",
    //   selector: row => row.order_date,
    //   sortable: false,
    //   sortField: 4,
    //   maxWidth: "190px",
    //   minWidth: "150px",
    // },
    // {
    //   name: "Delivery Date",
    //   selector: row => row.delivered_at,
    //   sortable: false,
    //   sortField: 4,
    //   maxWidth: "190px",
    //   minWidth: "150px",
    // },
    // {
    //   name: "Order Status",
    //   cell: row => {
    //     const getStatusLabel = status => {
    //       switch (status.toLowerCase()) {
    //         case "received":
    //           return {
    //             text: "ORDER RECEIVED",
    //             className: "status_lable received",
    //           }
    //         case "confirmed":
    //           return {
    //             text: "ORDER CONFIRMED",
    //             className: "status_lable confirmed",
    //           }
    //         case "sent_to_qc":
    //           return {
    //             text: "SENT TO QC",
    //             className: "status_lable shipped",
    //           }
    //         case "qc_passed":
    //           return {
    //             text: "QC PASSED",
    //             className: "status_lable shipped",
    //           }
    //         case "printed":
    //           return { text: "PRINTED", className: "status_lable printing" }
    //         case "qc_failed":
    //           return {
    //             text: "QC FAILED",
    //             className: "status_lable shipped",
    //           }
    //         case "printing":
    //           return { text: "PRINTED", className: "status_lable printing" }
    //         case "shipped":
    //           return {
    //             text: "ORDER SHIPPED",
    //             className: "status_lable shipped",
    //           }
    //         case "delivered":
    //           return {
    //             text: "ORDER DELIVERED",
    //             className: "status_lable delivered",
    //           }
    //         case "cancelled":
    //           return {
    //             text: "CANCELLED",
    //             className: "status_lable unknown",
    //           }
    //         default:
    //           return { text: "UNKNOWN", className: "status_lable unknown" }
    //       }
    //     }

    //     const { text, className } = getStatusLabel(row.order_status)

    //     return <div className={className}>{text}</div>
    //   },
    //   sortable: false,
    //   sortField: 7,
    //   maxWidth: "190px",
    //   minWidth: "190px",
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

  const onDownloadItemClick = fileType => {
    const currentToken = JSON.parse(
      localStorage.getItem("adminUserData")
    )?.authToken

    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "")

    axios({
      method: "post",
      url: `${baseUrl}/admin/order-management/download`,
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
        let fileName = `${"management"}.${fileType}` // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1]
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"management"}.${fileType}`
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
      state: { type: "edit" },
    })
  }
  const handleClearInput = () => {
    resetEmailInput()
    resetNameInput()
    resetPhoneNum()
    setRole("")
    setType("")
  }
  const countApiCall = () => {
    sendRequest(
      {
        url: `admin/manage-customer/view/rewards/count/${customerId}`,
      },
      data => {
        setRewardPoints(data?.data?.reward_points)
      }
    )
  }
  useEffect(() => {
    countApiCall()
  }, [])
  const viewList = () => {
    sendRequest(
      {
        url: `admin/manage-customer/view/rewards/${customerId}`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          filter: {
            type: category, // active,inactive
            // from_date: "", // d-m-Y
            // to_date: "",
          },
        },
      },
      data => {
        setData(data?.data?.rewards)
        setTotalReporting(data?.data?.total_count)
      }
    )
  }
  useEffect(() => {
    viewList()
  }, [page, perPage, searchValue, category, fromDate, toDate])

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
        <div className={classes.header_table_1}>
          <h3>Rewards Details</h3>
          <div className={classes.main}>
            <div className={classes.main_box_set}>
              <div className={classes.main_box_header}>
                <img src={Coin} alt="Coin" width={"60px"} />
              </div>
              <div className={classes.main_box_header}>
                <h3>{rewardPoints || 0}</h3>
              </div>
              <div className={classes.main_box_header}>
                <p>Available Points</p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.header_table}>
          <h3>Recent Transactions</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>
                {totalReporting} Transactions
              </p>
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
            </div>
            <div className={classes.header_table_right}>
              {/* <DropDownFile handleFileDownload={onDownloadItemClick} />
              <div className={classes.filters}></div> */}
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

export default Rewards
