import React, { useEffect, useState } from "react"
import classes from "./Coupon.module.css"
import CustomTable from "../../components/UI/Table/TablePage"
import Slecter from "../../../admin/components/UI/Dropdown/Select"
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
import { useDispatch } from "react-redux"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import CheckBox from "../../components/UI/Checkbox/Checkbox/CheckBox"
import axios from "axios"

const Coupon = () => {
  const dispatch = useDispatch()
  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()
  const {
    isLoading: addRoleLoading,
    success: addRoleSuccess,
    error: addRoleError,
    sendRequest: addUserLIstRequest,
  } = useApiHttp()
  const {
    isLoading: editRoleLoading,
    success: editRoleSuccess,
    error: editRoleError,
    sendRequest: editUserListRequest,
  } = useApiHttp()
  const {
    isLoading: updateCouponLoading,
    success: updateeditRoleSuccess,
    error: updateeditRoleError,
    sendRequest: updateeditRoleRequest,
  } = useApiHttp()
  const {
    isLoading: DeleteRoleLoading,
    success: DeleteRoleSuccess,
    error: DeleteRoleError,
    sendRequest: setDeleteUserList,
  } = useApiHttp()

  // Pagination and Sorting states for Ready To Use
  const [status, setStatus] = useState("")
  const [role, setRole] = useState("")
  const [page, setPage] = useState(1)
  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [perPage, setPerPage] = useState(10)
  const [column, setColumn] = useState(0)
  const [total, setTotal] = useState([])
  const [totalReporting, setTotalReporting] = useState(0)
  const [openAdduser, setOpenAdduser] = useState(false)
  const [editCouponId, setEditCouponId] = useState("")
  const [type, setType] = useState("")

  // Search state
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [editUseridmail, setEditUserid] = useState("")
  const [editeList, setEditeList] = useState({})
  const [roleData, setRoleData] = useState([])

  const [fromDate, setFromDate] = useState(currentDate()) // Set initial from date
  const [toDate, setToDate] = useState(currentDate()) // Set initial to date

  const [validfromDate, setValidFromDate] = useState(currentDate()) // Set initial from date
  const [ValidtoDate, setValidToDate] = useState(currentDate()) // Set initial to date

  // Form states
  const [couponCode, setCouponCode] = useState("")
  const [discountType, setDiscountType] = useState("percent")
  const [discountValue, setDiscountValue] = useState("")
  const [minOrderValue, setMinOrderValue] = useState("")
  const [validFrom, setValidFrom] = useState(currentDate())
  const [validTo, setValidTo] = useState(currentDate())
  const [usageLimit, setUsageLimit] = useState("")

  // Form validation
  const [errors, setErrors] = useState({
    couponCode: false,
    discountValue: false,
    minOrderValue: false,
    usageLimit: false,
  })
  const [dateErrors, setDateErrors] = useState({
    validFrom: false,
    validTo: false,
    rangeError: "",
  })

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

  const handleValidFromDateChange = value => {
    const newFromDate = dayjs(value).format("YYYY-MM-DD")
    setValidFromDate(newFromDate)
    setDateErrors(prev => ({ ...prev, validFrom: false, rangeError: "" }))
    // Automatically set "toDate" to be the same or after "fromDate"
    // if (dayjs(newFromDate).isAfter(toDate)) {
    //   setValidToDate(newFromDate)
    // }
  }

  const handleValidToDateChange = value => {
    const newToDate = dayjs(value).format("YYYY-MM-DD")
    setValidToDate(newToDate)
    setDateErrors(prev => ({ ...prev, validTo: false, rangeError: "" }))
  }

  const UserListData = [
    {
      name: "S.No",
      selector: row => row.sl_no,
      sortable: false,
      sortField: 0,
      maxWidth: "76px",
      minWidth: "50px",
    },
    {
      name: "Coupon Code",
      cell: row => (
        <>
          <p
            className="action_text action_text_pointer flex"
            // onClick={() => actionHandleClick(row)}
          >
            {row.code}
          </p>
        </>
      ),
      maxWidth: "150px",
      minWidth: "150px",
      sortable: true,
      sortField: 7,
    },
    {
      name: "Discount Type(%/₹)",
      selector: row => row.type,
      sortable: false,
      sortField: 5,
    },

    {
      name: "Discount Value",
      selector: row => (
        <p className="action_text action_text_pointer">{row.value}</p>
      ),
      sortable: false,
      sortField: 1,
    },
    {
      name: "Min. Order Value",
      selector: row => row.min_order_value,
      sortField: 2,
      sortable: false,
      maxWidth: "150px",
      minWidth: "150px",
    },
    {
      name: "Valid From",
      selector: row => row.valid_from,
      sortable: false,
      sortField: 4,
    },
    {
      name: "Valid TO",
      selector: row => row.valid_till,
      sortable: false,
      sortField: 4,
    },
    {
      name: "Usage Limit",
      selector: row => row.usage_per_user,
      sortable: false,
      sortField: 4,
    },
    {
      name: "",
      selector: row => (
        <p
          className={`couponstatus ${
            row.status === "active" ? "active" : "inactive"
          }`}
        >
          {row.status === "active" ? "Active" : "Deactivated"}
        </p>
      ),
      sortField: 3,
      sortable: false,
      //   maxWidth: "200px",
      //   minWidth: "200px",
      wrap: true,
      style: {
        whiteSpace: "normal", // Prevents truncation
        wordBreak: "break-word", // Ensures long words wrap
      },
    },
    {
      name: "",
      cell: row => (
        <>
          <div className="action_btn">
            <button
              className="action_delete"
              onClick={() => deleteUserRolelistData(row.id)}
            >
              Delete
            </button>
            <button
              className="action_delete"
              onClick={() => handlerAddAndEdit("edit", row)} // Pass row data here
            >
              edit
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

  const onDownloadItemClick = fileType => {
    const currentToken = JSON.parse(
      localStorage.getItem("adminUserData")
    )?.authToken

    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
    ).replace(/\/$/, "")

    axios({
      method: "post",
      url: `${baseUrl}/admin/finance-management/config-coupon/download`,
      data: {
        type: fileType,
        search: searchValue,
        filter: {
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
        let fileName = `${"coupon"}.${fileType}` // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1]
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"coupon"}.${fileType}`
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

  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    handleClearInput()
  }

  const handlerAddAndEdit = (type, row = null) => {
    setType(type)
    setOpenAdduser(true)

    if (type === "edit" && row) {
      setEditCouponId(row.id)
      setCouponCode(row.code || "")
      setDiscountType(row.type === "Flat" ? "amount" : "percent")
      const extractNumericValue = value => {
        // Remove all non-digit characters except decimal point
        return value.replace(/[^\d.]/g, "")
      }

      setDiscountValue(extractNumericValue(row.value))
      setMinOrderValue(extractNumericValue(row.min_order_value))
      setUsageLimit(row.usage_per_user ? row.usage_per_user.toString() : "")
      setValidFromDate(row.valid_from || currentDate())
      setValidToDate(row.valid_till || currentDate())
    } else {
      // Clear inputs for add mode
      handleClearInput()
    }
  }
  const handleClearInput = () => {
    setCouponCode("")
    setDiscountType("percent")
    setDiscountValue("")
    setMinOrderValue("")
    setUsageLimit("")
    setValidFrom(currentDate())
    setValidTo(currentDate())
    setValidFromDate(currentDate())
    setValidToDate(currentDate())
    setDateErrors({
      ...dateErrors,
      rangeError: "",
    })
  }

  // const validateForm = () => {
  //   const newErrors = {
  //     couponCode: !couponCode.trim(),
  //     discountValue: !discountValue || isNaN(discountValue),
  //     minOrderValue: !minOrderValue || isNaN(minOrderValue),
  //     usageLimit: !usageLimit || isNaN(usageLimit),
  //   }
  //   setErrors(newErrors)
  //   return !Object.values(newErrors).some(error => error)
  // }
  const validateForm = () => {
    // Reset date errors
    setDateErrors({
      validFrom: false,
      validTo: false,
      rangeError: "",
    })

    const newErrors = {
      couponCode: !couponCode.trim(),
      discountValue: !discountValue || isNaN(discountValue),
      minOrderValue: !minOrderValue || isNaN(minOrderValue),
      usageLimit: !usageLimit || isNaN(usageLimit),
    }

    // Validate dates
    let hasDateError = false
    const newDateErrors = { validFrom: false, validTo: false, rangeError: "" }

    if (!validfromDate) {
      newDateErrors.validFrom = true
      hasDateError = true
    }

    if (!ValidtoDate) {
      newDateErrors.validTo = true
      hasDateError = true
    }

    if (dayjs(validfromDate).isAfter(dayjs(ValidtoDate))) {
      newDateErrors.rangeError = "Valid To date must be after Valid From date"
      hasDateError = true
    }

    setDateErrors(newDateErrors)
    setErrors(newErrors)

    return !Object.values(newErrors).some(error => error) && !hasDateError
  }

  const handleAddUser = () => {
    if (!validateForm()) return
    const couponData = {
      coupon_code: couponCode,
      type: discountType,
      value: parseFloat(discountValue),
      min_order_value: parseFloat(minOrderValue),
      limit_per_person: parseInt(usageLimit),
      valid_from: dayjs(validfromDate).format("YYYY-MM-DD"),
      valid_to: dayjs(ValidtoDate).format("YYYY-MM-DD"),
    }
    addUserLIstRequest(
      {
        url: `admin/finance-management/config-coupon/create`,
        method: "POST",
        body: couponData,
      },
      data => {
        handleClosesetOpenAddUser()
        viewList()
      }
    )
  }
  const handleEditCoupon = () => {
    if (!validateForm()) return

    const couponData = {
      id: editCouponId,
      coupon_code: couponCode,
      type: discountType,
      value: parseFloat(discountValue),
      min_order_value: parseFloat(minOrderValue),
      limit_per_person: parseInt(usageLimit),
      valid_from: dayjs(validfromDate).format("YYYY-MM-DD"),
      valid_to: dayjs(ValidtoDate).format("YYYY-MM-DD"),
    }

    updateeditRoleRequest(
      {
        url: `admin/finance-management/config-coupon/update`,
        method: "post", // Or PATCH depending on API
        body: couponData,
      },
      data => {
        handleClosesetOpenAddUser()
        viewList()
      }
    )
  }

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
            url: `admin/finance-management/config-coupon/delete/${id}`,
            method: "DELETE",
          },
          data => {
            viewList()
          }
        )
      }
    })
  }
  const handleSubmit = () => {
    if (type === "add") {
      handleAddUser()
    } else {
      handleEditCoupon() // Use the new edit handler
    }
  }
  const viewList = () => {
    sendRequest(
      {
        url: `admin/finance-management/config-coupon/list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          filter: {
            from_date: fromDate, // d-m-Y
            to_date: toDate,
          },
        },
      },
      data => {
        setData(data?.data?.coupons)
        setTotalReporting(data?.data?.total_count)
      }
    )
  }
  useEffect(() => {
    sendRequest(
      {
        url: `admin/drop-down/admin-roles`,
      },
      data => {
        const formattedRoles = data?.data?.map(role => ({
          ...role,
          id: role.id.toString(),
        }))
        setRoleData(formattedRoles)
        // setRoleData(data?.data)
      }
    )
  }, [])
  useEffect(() => {
    viewList()
  }, [page, perPage, searchValue, status, fromDate, toDate])

  useEffect(() => {
    if (editeList?.admin_role_id) {
      // Match the type with roleData IDs
      setRole(editeList.admin_role_id.toString())
    }
  }, [editeList])

  const handleDiscountValueChange = e => {
    const value = e.target.value

    if (discountType === "percent") {
      // Allow only 2-digit numbers (0-99)
      if (/^\d{0,2}$/.test(value)) {
        setDiscountValue(value)
      }
    } else {
      // Allow any numeric value for flat amount
      setDiscountValue(value)
    }
  }

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Coupon List</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>{totalReporting} Coupons</p>
              {/* <Slecter
                data={
                  slectdata?.map(sub => ({
                    label: sub.name,
                    value: sub.token,
                  })) || []
                }
                label="Choose Status"
                title="All Status"
                width={"170"}
                value={status}
                onChange={e => setStatus(e.target.value)}
                // borders={true}
              /> */}
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
                placeholder="Search User..."
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
          columns={UserListData}
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
          customWidth={"600px"}
          overflowY={"unset"}
          children={
            <>
              <div className="dialog_loyout">
                <h3 className="dialog_loyout_title">
                  {type === "add" ? "Add Coupon" : "Edit Coupon"}
                </h3>
                <div className={classes.dialog_Coupon_input}>
                  <CustomTextField
                    id="name"
                    label="Coupon Code"
                    placeholder="Enter Coupon Code"
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    error={errors.couponCode}
                    // helperText={errors.couponCode && "Required field"}
                    fullWidth
                    required
                  />
                </div>
                <div className={classes.dialog_loyout_main}>
                  <div className={classes.CheckBox_Set}>
                    <p className={classes.Discount}>Discount Type</p>
                    <div className={classes.CheckBox_Loyout}>
                      <CheckBox
                        label={`Percentage(%)`}
                        checked={discountType === "percent"}
                        onChange={() => setDiscountType("percent")}
                      />
                      <CheckBox
                        label={`Flat(₹)`}
                        checked={discountType === "amount"}
                        onChange={() => setDiscountType("amount")}
                      />
                    </div>
                  </div>
                  <CustomTextField
                    id="name"
                    placeholder="Enter Discount Value"
                    variant="outlined"
                    label="Discount Value"
                    type="number"
                    value={discountValue}
                    onChange={handleDiscountValueChange}
                    error={errors.discountValue}
                    // helperText={errors.discountValue && "Invalid value"}
                    fullWidth
                    sx={{
                      width: "100%",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      max: discountType === "percent" ? 99 : undefined,
                      min: 0,
                    }}
                    required
                  />
                  <CustomTextField
                    id="name"
                    placeholder="Enter Minimum Order Value"
                    variant="outlined"
                    label="Minimum Order Value"
                    type="number"
                    value={minOrderValue}
                    onChange={e => setMinOrderValue(e.target.value)}
                    error={errors.minOrderValue}
                    // helperText={errors.minOrderValue && "Invalid value"}
                    fullWidth
                    sx={{
                      width: "100%",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                  <CustomTextField
                    id="name"
                    placeholder="Enter Usage Limit"
                    variant="outlined"
                    label="Usage Limit"
                    type="number"
                    value={usageLimit}
                    onChange={e => setUsageLimit(e.target.value)}
                    error={errors.usageLimit}
                    // helperText={errors.usageLimit && "Invalid value"}
                    fullWidth
                    sx={{
                      width: "100%",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                  <div>
                    <FromToDatePicker
                      label={"Valid From"}
                      format="DD-MM-YYYY"
                      value={dayjs(validfromDate)}
                      onChange={handleValidFromDateChange}
                      error={dateErrors.validFrom}
                      borders={false}
                      width={"100%"}
                      height={"30px"}
                    />
                    {dateErrors.validFrom && (
                      <p className={classes.errorMessage}>
                        Valid From date is required
                      </p>
                    )}
                  </div>
                  <div>
                    <FromToDatePicker
                      label={"Valid To"}
                      format="DD-MM-YYYY"
                      value={dayjs(ValidtoDate)}
                      minDate={dayjs(validfromDate)}
                      onChange={handleValidToDateChange}
                      disabled={!validfromDate}
                      error={dateErrors.validTo || !!dateErrors.rangeError}
                      borders={false}
                      width={"100%"}
                      height={"40px"}
                    />
                    {dateErrors.validTo ? (
                      <p className={classes.errorMessage}>
                        Valid To date is required
                      </p>
                    ) : dateErrors.rangeError ? (
                      <p className={classes.errorMessage}>
                        {dateErrors.rangeError}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="btn_group">
                  <button
                    className="btn_cancel"
                    onClick={handleClosesetOpenAddUser}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn_submit"
                    onClick={handleSubmit}
                    disabled={updateCouponLoading || addRoleLoading} // Disable during loading
                  >
                    {updateCouponLoading ? "Updating..." : "Submit"}
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

export default Coupon
