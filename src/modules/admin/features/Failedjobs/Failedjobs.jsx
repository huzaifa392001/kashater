import React, { useEffect, useState } from "react"
import classes from "../CustomerList/CustomerList.module.css"
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
import OverlayLoding from "../../components/UI/Loding/OverlayLoding"
import toast from "react-hot-toast"

const Failedjobs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        isLoading: sendLoading,
        success: sendSuccess,
        error: sendError,
        sendRequest: sendRequest,
    } = useApiHttp()

    const {
        isLoading: getListLoder,
        sendRequest: retrySubmit,
    } = useApiHttp()

    // Pagination and Sorting states for Ready To Use
    const [status, setStatus] = useState("")
    const [page, setPage] = useState(1)
    const [sortDirectionData, setSortDirectionData] = useState("DESC")
    const [perPage, setPerPage] = useState(10)
    const [column, setColumn] = useState(0)
    const [total, setTotal] = useState([])
    const [totalReporting, setTotalReporting] = useState(0)

    // Search state
    const [searchValue, setSearchValue] = useState("")
    const [data, setData] = useState([])

    const customerListData = [
        {
            name: "S.No",
            cell: (row, index) => index + 1,
            sortable: false,
            sortField: 0,
            maxWidth: "76px",
            minWidth: "50px",
        },
        {
            name: "Payload",
            cell: row => (
                <>
                    <p
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                        }}
                    >
                        {row.payload.length > 200 ? row.payload.substring(0, 200) + "..." : row.payload}
                    </p>
                </>
            ),
            maxWidth: "40%",
            minWidth: "40%",
            sortable: true,
            sortField: 7,
        },
        {
            name: "Exception",
            cell: row => (
                <>
                    <p
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                        }}
                    >
                        {row.exception.length > 200 ? row.exception.substring(0, 200) + "..." : row.exception}
                    </p>
                </>
            ),
            maxWidth: "40%",
            minWidth: "40%",
            sortable: true,
            sortField: 7,
        },
        {
            name: "Action",
            cell: row => (
                <>
                    <div className="action_btn">
                        <button
                            className={`btn btn-warning`}
                            onClick={() => handleRetry(row.id)}
                        >
                            Retry
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

    const viewList = () => {
        sendRequest(
            {
                url: `admin/failed-jobs`,
                method: "GET",
            },
            data => {
                setData(data?.failed_jobs)
                setTotalReporting(data?.failed_jobs?.length)
            }
        )
    }

    useEffect(() => {
        viewList()
    }, [page, perPage, searchValue, status])


    const handleRetry = (id) => {
        retrySubmit(
            {
                url: `admin/failed-jobs/retry/${id}`,
                method: "POST",
                body: {}
            },
            data => {
                if (data?.success) {
                    toast.success(data?.message)
                    viewList()
                }
            }
        )
    }

    return (
        <>
            <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
                <div className={classes.header_table}>
                    <h3>Failed Job List</h3>
                    <div className={classes.header_table_box}>
                        <div className={classes.header_table_left}>
                            <p className={classes.header_titel}>{totalReporting} Total</p>
                        </div>
                        {/* <div className={classes.header_table_right}>
                            {/* <DropDownFile handleFileDownload={onDownloadItemClick} />
                            <div className={classes.filters}></div>
                            <SearchExpand
                                placeholder="Search Customer..."
                                onSearchChange={value => setSearchValue(value)}
                                searchValue={searchValue}
                                maxWidth="500px"
                            />
                        </div> */}
                    </div>
                </div>
                <CustomTable
                    data={data}
                    columns={customerListData}
                    loader={false}
                    onSort={handleSort}
                    paginationTotalRows={totalReporting}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    subHeader={false}
                    children={false}
                />
            </div>
            {getListLoder && <OverlayLoding />}
        </>
    )
}

export default Failedjobs
