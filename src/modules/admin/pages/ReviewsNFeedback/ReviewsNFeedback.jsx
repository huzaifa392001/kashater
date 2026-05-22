import React, { useEffect, useState } from "react"
import classes from "./ReviewsNFeedback.module.css"
import CustomTable from "../../components/UI/Table/TablePage"
import Slecter from "../../components/UI/Dropdown/Select"
import SearchExpand from "../../components/UI/SearchExpand/SearchExpand"
import CustomButton from "../../components/UI/Button/Button"
import DropDownFile from "../../components/UI/DropDownFile/DropDownFile"
import FromToDatePicker from "../../components/UI/DatePicker/FromToDatePicker"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import PhoneNumInput from "../../components/UI/PhoneNumInput/PhoneNumInput"
import CustomeSlecter from "../../components/UI/Dropdown/CustomeSlecter"
import { useDispatch } from "react-redux"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import CheckBox from "../../components/UI/Checkbox/Checkbox/CheckBox"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { currentDate } from "../../utils/helper"
import RatingStar from '../../assets/image/png/rating_star.png'
import { Icon } from "@mui/material"

const ReviewsNFeedback = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        isLoading: sendLoading,
        success: sendSuccess,
        error: sendError,
        sendRequest: sendRequest,
    } = useApiHttp()
    const {
        // isLoading: sendLoading,
        // success: sendSuccess,
        // error: sendError,
        sendRequest: getFeedBackDetails,
    } = useApiHttp()

    // Pagination and Sorting states for Ready To Use
    const [page, setPage] = useState(1)
    const [sortDirectionData, setSortDirectionData] = useState("DESC")
    const [perPage, setPerPage] = useState(10)
    const [column, setColumn] = useState(0)
    const [total, setTotal] = useState([])
    const [totalReporting, setTotalReporting] = useState(0)

    // Search state
    const [searchValue, setSearchValue] = useState("")
    const [data, setData] = useState([
        {
            sl_no: 1,
            order_id: "#SSSS1",
            product_id: "prod1",
            user_id: "#user1",
            product_name: "Title1",
            category: "category1",
            rating: "4",
            id: "#1",
            user_name: "Hi",
            submitted_date: "12-June-2025",
            comment: "I recently received my order and faced some issues with the product. The quality didn’t meet my expectations, and I experienced some difficulties while using it. I would appreciate it if you could look into this and provide a resolution. Looking forward to your support."

        },
        {
            si_no: 2,
            order_id: "#SSSS2",
            product_id: "prod4",
            user_id: "#user1",
            title: "Title2",
            category: "category2",
            rating: "4",
            id: "#2",
            name: "Hi",
            submission_date: "12-June-2025",
            comment: "I recently received my order and faced some issues with the product. The quality didn’t meet my expectations, and I experienced some difficulties while using it. I would appreciate it if you could look into this and provide a resolution. Looking forward to your support."


        },
        {
            si_no: 3,
            order_id: "#SSSS1",
            product_id: "prod3",
            user_id: "#user1",
            title: "Title3",
            category: "category1",
            rating: "3",
            id: "#3",
            name: "Hi",
            submission_date: "12-June-2025",
            comment: "I recently received my order and faced some issues with the product. The quality didn’t meet my expectations, and I experienced some difficulties while using it. I would appreciate it if you could look into this and provide a resolution. Looking forward to your support."



        },
    ])

    //Dropdwn filter
    const [rating, setRating] = useState("");


    // Date Change
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
    const handleToDateChange = value => {
        const newToDate = dayjs(value).format("YYYY-MM-DD")
        setToDate(newToDate)
    }
    //modal variables
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [detailsData, setDetailsData] = useState({});

    const handleCloseDetailsModal = () => {
        setOpenDetailsModal(false);
        setDetailsData({});
    }




    const reviewFeedbackColumns = [
        {
            name: "S.No",
            selector: row => row.sl_no,
            sortable: false,
            sortField: 0,
            maxWidth: "76px",
            minWidth: "50px",
        },
        {
            name: "Order ID",
            cell: row => (
                <>
                    <p
                        className="action_text flex"
                        style={{ color: "#1D85F3" }}
                        onClick={() => {
                            getFeedBackDetails({
                                url: `admin/feedback-management/review-feedback/feedback-list-view`,
                                method: "POST",
                                body: {
                                    id: row.id,
                                },
                            }, (data) => {
                                setDetailsData(data.data)
                                setOpenDetailsModal(true)
                            })

                        }
                        }
                    >
                        {row.order_id}
                    </p>
                </>
            ),
            maxWidth: "150px",
            minWidth: "150px",
            sortable: true,
            sortField: 7,
        },
        {
            name: "Product ID",
            selector: row => row.product_id,
            sortable: false,
            sortField: 5,
            maxWidth: "150px",
            minWidth: "150px",
            wrap: true,
            style: {
                whiteSpace: "normal", // Prevents truncation
                wordBreak: "break-word", // Ensures long words wrap
            },
        },
        {
            name: "Product Title",
            selector: row => `${row.product_name}(${row.gender})`,
            sortable: false,
            sortField: 5,
            maxWidth: "250px",
            minWidth: "250px",
            wrap: true,
            style: {
                whiteSpace: "normal", // Prevents truncation
                wordBreak: "break-word", // Ensures long words wrap
            },
        },
        {
            name: "User ID",
            selector: row => row.user_id,
            sortable: false,
            sortField: 5,
            maxWidth: "150px",
            minWidth: "150px",
            wrap: true,
            style: {
                whiteSpace: "normal", // Prevents truncation
                wordBreak: "break-word", // Ensures long words wrap
            },
        },
        {
            name: "User Name",
            selector: row => row.user_name,
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
            name: "Ratings",
            selector: row => row.rating,
            sortable: false,
            sortField: 5,
            // maxWidth: "200px",
            // minWidth: "200px",
            wrap: true,
            style: {
                whiteSpace: "normal", // Prevents truncation
                wordBreak: "break-word", // Ensures long words wrap
            },
        },


        {
            name: "Submission Date",
            selector: row => row.submitted_date,
            sortable: false,
            sortField: 4,
            maxWidth: "150px",
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


    const selectRatings = [
        // {
        //     name: "0 Star",
        //     token: "0",
        // },
        {
            name: "1 Star",
            token: "1",
        },
        {
            name: "2 Star",
            token: "2",
        },
        {
            name: "3 Star",
            token: "3",
        },
        {
            name: "4 Star",
            token: "4",
        },
        {
            name: "5 Star",
            token: "5",
        },

    ]

    const onDownloadItemClick = fileType => {
        const currentToken = JSON.parse(
            localStorage.getItem("adminUserData")
        )?.authToken

        const baseUrl = (
            import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
        ).replace(/\/$/, "")

        axios({
            method: "post",
            url: `${baseUrl}/admin/feedback-management/review-feedback/feedback-list-download`,
            data: {
                file_type: fileType,
                search: searchValue,
                rating: rating,
                from_date: fromDate,
                to_date: toDate,

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
                let fileName = `${"Feedback-List"}.${fileType}` // default file name with correct extension

                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
                    if (fileNameMatch && fileNameMatch.length === 2) {
                        fileName = fileNameMatch[1]
                    }
                } else {
                    // Fallback to using the fileType for naming the file
                    fileName = `${"Feedback-List"}.${fileType}`
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
                url: `admin/feedback-management/review-feedback/feedback-list`,
                method: "POST",
                body: {
                    page: page,
                    per_page: perPage,
                    search: searchValue,
                    rating: rating,
                    from_date: fromDate,
                    to_date: toDate
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
    }, [page, perPage, searchValue, rating, fromDate, toDate])



    return (
        <>
            <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
                <div className={classes.header_table}>
                    <h3>Reviews and Feedback</h3>
                    <div className={classes.header_table_box}>
                        <div className={classes.header_table_left}>
                            <p className={classes.header_titel}>{totalReporting} Feedbacks</p>
                            <Slecter
                                data={
                                    selectRatings?.map(sub => ({
                                        label: sub.name,
                                        value: sub.token,
                                    })) || []
                                }
                                label="Choose Rating"
                                title="All Ratings"
                                width={"170"}
                                value={rating}
                                onChange={e => setRating(e.target.value)}
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
                                placeholder="Search List..."
                                onSearchChange={value => setSearchValue(value)}
                                searchValue={searchValue}
                                maxWidth="500px"
                            />

                            {/* <CustomButton
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
                Add New User
              </CustomButton> */}
                        </div>
                    </div>
                </div>
                <CustomTable
                    data={data}
                    columns={reviewFeedbackColumns}
                    loader={false}
                    onSort={handleSort}
                    paginationTotalRows={totalReporting}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    subHeader={false}
                    children={false}
                />
            </div>
            {openDetailsModal && (
                <CustomDialog
                    open={openDetailsModal}
                    handleClose={handleCloseDetailsModal}
                    showCloseIcon={false}
                    customWidth={"600px"}
                    overflowY={"unset"}
                    children={
                        <>
                            <div className="dialog_loyout">
                                <h3 className="dialog_loyout_title">
                                    {detailsData?.order_id || "Details"}
                                </h3>
                                <div className={classes.dialog_loyout_main}>
                                    <div>
                                        <p className={classes.details_modal_field} >Order ID</p>
                                        <p className={classes.details_modal_values}> {detailsData?.order_id || ''}</p>
                                    </div>
                                    <div>
                                        <p className={classes.details_modal_field}>Product ID</p>
                                        <p className={classes.details_modal_values}>{detailsData?.product_id || ''}</p>
                                    </div>
                                    <div>
                                        <p className={classes.details_modal_field}>Product Title</p>
                                        <p className={classes.details_modal_values}>{detailsData?.product_name ? `${detailsData?.product_name}(${detailsData?.gender})` : ''}</p>
                                    </div>
                                    <div>
                                        <p className={classes.details_modal_field}>User ID</p>
                                        <p className={classes.details_modal_values}>{detailsData?.user_id || ''}</p>
                                    </div>
                                    <div>
                                        <p className={classes.details_modal_field}>User Name</p>
                                        <p className={classes.details_modal_values}>{detailsData?.user_name || ''}</p>
                                    </div>
                                    {/* <div>
                                        <p className={classes.details_modal_field}>Category</p>
                                        <p className={classes.details_modal_values}>{detailsData?.category || ''}</p>
                                    </div> */}
                                    <div>
                                        <p className={classes.details_modal_field}>Ratings</p>
                                        <p className={classes.details_modal_values}>{detailsData?.rating ? (<Icon sx={{
                                            display: 'flex', alignItems: 'center', width: 'auto',
                                            height: 'auto',
                                            overflow: 'visible',
                                        }}><img alt="star" style={{ width: 16, height: 16 }} src={RatingStar} /><span style={{ marginLeft: 4, fontSize: "14px", fontWeight: "800" }}>{detailsData?.rating}</span> </Icon>) : ""}</p>
                                    </div>
                                    <div>
                                        <p className={classes.details_modal_field}>Submission Date</p>
                                        <p className={classes.details_modal_values}>{detailsData?.submitted_date || ''}</p>
                                    </div>
                                    {detailsData?.comment !== null && (
                                        <div className={classes.full_span}>
                                            <p className={classes.details_modal_field}>Optional Comment</p>
                                            <p className={classes.details_modal_values}>{detailsData?.comment || ''}</p>
                                        </div>
                                    )}



                                </div>
                                {/* <div style={{ marginTop: "20px" }}>
                                    <p className={classes.details_modal_field} style={{ marginBottom: "10px" }}>Action</p>
                                    {detailsData?.status === 'pending' ?
                                        (
                                            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>


                                                <CheckBox

                                                    label={`Approve`}
                                                    checked={detailsData?.checkBox === "approve"}
                                                    onChange={() => handleCheckboxToggle("approve")}
                                                />
                                                <CheckBox

                                                    label={`Reject`}
                                                    checked={detailsData?.checkBox === "reject"}
                                                    onChange={() => handleCheckboxToggle("reject")}
                                                />
                                            </div>
                                        ) : (
                                            <p className={`bagestatus ${detailsData?.status === 'rejected' ? "inactive" : "active"}`}>
                                                {detailsData?.status}
                                            </p>
                                        )
                                    }

                                </div> */}


                                <div className="btn_group">
                                    <button
                                        className="btn_submit"
                                        onClick={handleCloseDetailsModal}
                                    >
                                        Okay
                                    </button>

                                </div>
                            </div>
                        </>
                    }
                />
            )}
        </>
    )
}

export default ReviewsNFeedback
