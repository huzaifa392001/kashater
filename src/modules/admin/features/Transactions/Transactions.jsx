import React, { useEffect, useState } from "react"
import classes from "./Transactions.module.css"
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
import DashboardBoxes from "../Transactions/DashboardBoxes/DashboardBoxes"
import downlode from "../../assets/image/svg/downlode.png"

const Transactions = () => {
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
  console.log("dashboardBoxesData", dashboardBoxesData)

  const [category, setCategory] = useState("")
  const [role, setRole] = useState("")
  const [page, setPage] = useState(1)
  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [perPage, setPerPage] = useState(10)
  const [column, setColumn] = useState(0)
  const [total, setTotal] = useState([])
  const [totalReporting, setTotalReporting] = useState(8)
  const [type, setType] = useState("")

  // Search state
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [moduleCategoryList, setModuleCategoryList] = useState([])
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
        url: `admin/drop-down/payment-method`,
      },
      data => {
        setModuleCategoryList(data?.data)
      }
    )
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
      // maxWidth: "86px",
      // minWidth: "50px",
    },
    {
      name: "Invoice Number",
      cell: row => (
        <>
          <p className="">{row.invoice_number}</p>
        </>
      ),
      // maxWidth: "190px",
      // minWidth: "150px",
      sortable: false,
      sortField: 7,
    },
    {
      name: "Transaction ID ",
      cell: row => (
        <>
          <p className="">{row.transaction_id}</p>
        </>
      ),
      // maxWidth: "190px",
      // minWidth: "150px",
      sortable: false,
      sortField: 7,
    },

    {
      name: "Order ID",
      selector: row => row.order_number,
      sortable: false,
      sortField: 1,
      // maxWidth: "190px",
      // minWidth: "170px",
    },
    {
      name: "User Name",
      selector: row => row.user_name,
      sortField: 2,
      sortable: false,
      // maxWidth: "190px",
      // minWidth: "150px",
    },

    {
      name: "Amount",
      selector: row => row.amount,
      sortable: false,
      sortField: 4,
      // maxWidth: "190px",
      // minWidth: "150px",
    },
    {
      name: "Payment Method",
      selector: row => row.payment_method,
      sortable: false,
      sortField: 4,
      // maxWidth: "190px",
      // minWidth: "150px",
    },
    {
      name: "Payment Date",
      cell: row => (
        <>
          <p className="">{row.payment_date}</p>
        </>
      ),

      // selector: row => row.payment_date,
      sortable: false,
      sortField: 4,
      maxWidth: "190px",
      minWidth: "190px",
    },
    {
      name: "",
      cell: row => {
        return (
          <div
            className={`Download_Invoice`}
            onClick={() => onDownloadInvoice(row.id)}
          >
            <img src={downlode} alt="downlode" />
            Download Invoice
          </div>
        )
      },
      sortable: false,
      sortField: 7,
      maxWidth: "190px",
      minWidth: "190px",
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
      url: `${baseUrl}/admin/finance-management/transaction/download`,
      data: {
        type: fileType,
        search: searchValue,
        filter: {
          method: category, // active,inactive
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
        let fileName = `${"Transactions"}.${fileType}` // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1]
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"Transactions"}.${fileType}`
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

  const viewList = () => {
    sendRequest(
      {
        url: `admin/finance-management/transaction/list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          filter: {
            method: category, // active,inactive
            from_date: fromDate, // d-m-Y
            to_date: toDate,
          },
        },
      },
      data => {
        setData(data?.data?.transactions)
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
        url: `admin/finance-management/transaction/report`,
      },
      data => {
        setDashboardBoxesData(data?.data)
      }
    )
  }

  useEffect(() => {
    apiBoxesData()
  }, [])

  const onDownloadInvoice = id => {
    const currentToken = JSON.parse(
      localStorage.getItem("adminUserData")
    )?.authToken

    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "")

    axios({
      method: "get",
      url: `${baseUrl}/admin/finance-management/transaction/download-invoice/${id}`,
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
      responseType: "blob",
    })
      .then(response => {
        if (response.data?.type === "application/json") {
          // Likely a failed response disguised as blob
          const reader = new FileReader()
          reader.onload = () => {
            const json = JSON.parse(reader.result)
            toast.error(json?.message || "Failed to download invoice")
          }
          reader.readAsText(response.data)
          return
        }

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url

        const contentDisposition = response.headers["content-disposition"]
        let fileName = "invoice.pdf"

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?(.+?)"?$/)
          if (match?.[1]) {
            fileName = match[1]
          }
        }

        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
      .catch(error => {
        const message =
          error?.response?.data?.message ||
          "Failed to download invoice. Please try again."
        toast.error(message)
        console.error("Error downloading the invoice:", error)
      })
  }

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <DashboardBoxes data={dashboardBoxesData} />
        <div className={classes.header_table}>
          <h3>Transactions</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>
                {totalReporting} Transactions
              </p>
              {/* <Slecter
                data={
                  moduleCategoryList?.map(sub => ({
                    label: sub.name,
                    value: sub.value,
                  })) || []
                }
                label="Choose Orders"
                title="All Orders"
                width={"170"}
                value={category}
                onChange={e => setCategory(e.target.value)}
                // borders={true}
              /> */}
              <Slecter
                data={
                  moduleCategoryList?.map(sub => ({
                    label: sub.name,
                    value: sub.value,
                  })) || []
                }
                label="All Payment Methods"
                title="All Payment Methods"
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

export default Transactions
