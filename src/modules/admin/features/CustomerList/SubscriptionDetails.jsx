import React, { useEffect, useState } from "react"
import classes from "./SubscriptionDetails.module.css"
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
import InvoiceIcon from "../../assets/image/png/invoice-download.png"

const SubscriptionDetails = ({ customerId }) => {
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
    const [currentSubscriptionData, setCurrentSubscriptionData] = useState({})

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

        {
            name: "Plan",
            selector: row => row.name,
            sortable: false,
            sortField: 5,
            //   maxWidth: "300px",
            minWidth: "200px",
            wrap: true,
            style: {
                whiteSpace: "normal", // Prevents truncation
                wordBreak: "break-word", // Ensures long words wrap
            },
        },

        {
            name: "Plan Price",
            selector: row => row.price,
            sortable: false,
            sortField: 1,
            maxWidth: "190px",
            minWidth: "170px",
        },
        {
            name: "Subscription Date",
            selector: row => row?.created_at,
            sortField: 2,
            sortable: false,
            maxWidth: "200px",
            minWidth: "200px",
        },
        {
            name: "Expiry Date",
            selector: row => row.expiry_at,
            sortField: 2,
            sortable: false,
            maxWidth: "190px",
            minWidth: "150px",
        },
        {
            name: "",
            cell: (row) => {
                return (
                    <div className={classes.invoice_box} onClick={() => downloadFileFromUrl({ url: row?.invoice, fileType: "pdf", customfileName: `Invoice-${row?.name}-${row?.created_at}` })}>
                        <img src={InvoiceIcon} alt="invoice" />
                        <span className={classes.invoice}>Invoice</span>
                    </div>
                )
            },
            sortField: 2,
            sortable: false,
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

    const downloadFileFromUrl = ({ url, fileType, customfileName }) => {
        const link = document.createElement("a")
        link.href = url

        // Extract the filename from the response headers (optional)
        let fileName = `${customfileName}.${fileType}` // default file name with correct extension



        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
        link.remove() // cleanup
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
            url: `${baseUrl}/admin/manage-customer/subscription-details-download`,
            data: {

                "page": page,
                "per_page": perPage,
                "search": searchValue,
                // "from_date": fromDate,
                // "to_date": toDate,
                "from_date": "",
                "to_date": "",
                "plan": category,
                "user_id": customerId
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
                let fileName = `${"subscription_history"}.${fileType}` // default file name with correct extension

                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
                    if (fileNameMatch && fileNameMatch.length === 2) {
                        fileName = fileNameMatch[1]
                    }
                } else {
                    // Fallback to using the fileType for naming the file
                    fileName = `${"subscription_history"}.${fileType}`
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

    useEffect(() => {
        sendRequest(
            {
                url: `admin/manage-customer/subscription-details`,
                method: "POST",
                body: {


                    "page": page,
                    "per_page": perPage,
                    "search": searchValue,
                    // "from_date": fromDate,
                    // "to_date": toDate,
                    "from_date": "",
                    "to_date": "",
                    "plan": category,
                    "user_id": customerId
                },
            },
            data => {

                setCurrentSubscriptionData(data?.data?.current_plan_Details[0])
            }
        )
    }, [])
    const viewList = () => {
        sendRequest(
            {
                url: `admin/manage-customer/subscription-details`,
                method: "POST",
                body: {


                    "page": page,
                    "per_page": perPage,
                    "search": searchValue,
                    // "from_date": fromDate,
                    // "to_date": toDate,
                    "from_date": "",
                    "to_date": "",
                    "plan": category,
                    "user_id": customerId
                },
            },
            data => {

                setData(data?.data?.aaData)
                setTotalReporting(data?.data?.iTotalRecords)
            }
        )
    }
    useEffect(() => {
        viewList()
    }, [page, perPage, searchValue, category, fromDate, toDate])



    return (
        <>
            <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
                {currentSubscriptionData && (
                    <div className={classes.header_table_1}>
                        <h3>Current Subscription Details</h3>
                        <div className={classes.main}>
                            <div className={classes.main_box_header}>
                                <p>{currentSubscriptionData?.current_period}</p>
                            </div>
                            <div className={classes.main_box_set}>
                                <div className={classes.main_box_header}>
                                    <p>Current Plan</p>
                                    <span>{currentSubscriptionData?.name}</span>
                                </div>
                                <div className={classes.main_box_header}>
                                    <p>Plan Price</p>
                                    <span>{currentSubscriptionData?.price}</span>
                                </div>
                                <div className={classes.main_box_header}>
                                    <p>Expiry Date</p>
                                    <span>{currentSubscriptionData?.next_payment}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className={classes.header_table}>
                    <h3>Subscription Transactions</h3>
                    <div className={classes.header_table_box}>
                        <div className={classes.header_table_left}>
                            <p className={classes.header_titel}>
                                {totalReporting} Subscription{totalReporting > 1 ? "s" : ""}
                            </p>
                            {/* <Slecter
                                data={
                                    moduleCategoryList?.map(sub => ({
                                        label: sub.name,
                                        value: sub.id,
                                    })) || []
                                }
                                label="Choose Plan"
                                title="All Plans"
                                width={"170"}
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            // borders={true}
                            /> */}
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
                                placeholder="Search Subscriptions..."
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

export default SubscriptionDetails
