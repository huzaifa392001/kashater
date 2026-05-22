import React, { useEffect, useState } from "react"
import classes from "./UserList.module.css"
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
import CustomeSlecterAdmin from "../../components/UI/Dropdown/CustomeSlecterAdmin"

const UserList = () => {
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
    isLoading: updateeditRoleLoading,
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
  const [type, setType] = useState("")
  console.log("role", role)

  // Search state
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [editUseridmail, setEditUserid] = useState("")
  const [editeList, setEditeList] = useState({})
  console.log("editeList", editeList)
  const [checkVlaue, setCheckVlaue] = useState([])
  console.log("checkVlaue", checkVlaue)

  const [fromDate, setFromDate] = useState(currentDate()) // Set initial from date
  const [toDate, setToDate] = useState(currentDate()) // Set initial to date

  const [roleData, setRoleData] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  console.log("selectedItems", selectedItems)

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

  // Handle checkbox toggle
  const handleCheckboxToggle = item => {
    setSelectedItems(prevSelected => {
      const isSelected = prevSelected.some(selected => selected.id === item.id)

      if (isSelected) {
        // Uncheck = Mark as inactive (status: inactive)
        return prevSelected.filter(selected => selected.id !== item.id)
      } else {
        // Check = Mark as active (status: active)
        return [...prevSelected, { ...item }]
      }
    })
  }
  const arrayOfUsers = [editeList]
  console.log("arrayOfUsers", arrayOfUsers)

  const finalData = arrayOfUsers.map(user => ({
    ...user,
    status: selectedItems.some(selected => selected.id === user.id)
      ? "inactive" // Changed from active
      : "active", // Changed from inactive
  }))

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
      name: "User Name",
      cell: row => (
        <>
          <p
            className="action_text action_text_pointer flex"
            onClick={() => actionHandleClick(row)}
          >
            {row.name}
          </p>
        </>
      ),
      maxWidth: "150px",
      minWidth: "150px",
      sortable: true,
      sortField: 7,
    },
    {
      name: "Email Address",
      selector: row => row.email,
      sortable: false,
      sortField: 5,
    },

    {
      name: "Mobile Number",
      selector: row => (
        <p className="action_text action_text_pointer">{row.mobile_number}</p>
      ),
      sortable: false,
      sortField: 1,
    },
    {
      name: "Role",
      selector: row => row.role,
      sortField: 2,
      sortable: false,
      maxWidth: "150px",
      minWidth: "150px",
    },
    {
      name: "Created Date",
      selector: row => row.created_at,
      sortable: false,
      sortField: 4,
    },

    {
      name: "Status",
      selector: row => (
        <p
          className={`bagestatus ${row.status === "active" ? "active" : "inactive"
            }`}
        >
          {row.status}
        </p>
      ),
      sortField: 3,
      sortable: false,
      maxWidth: "200px",
      minWidth: "200px",
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
              className="action_edit"
              onClick={() => handlerAddAndEdit("edit", row)}
            >
              Edit
            </button>
            <button
              className="action_delete"
              onClick={() => deleteUserRolelistData(row.id)}
            >
              Delete
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

  const slectdata = [
    {
      name: "Active",
      token: "active",
    },
    {
      name: "Inactive",
      token: "inactive",
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
      url: `${baseUrl}/admin/user-management/download`,
      data: {
        type: fileType,
        search: searchValue,
        filter: {
          status: status,
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
        let fileName = `${"UserList"}.${fileType}` // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1]
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"UserList"}.${fileType}`
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
    setEditeList({}) // Clear edit data
  }

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail, {
    type: "text",
    value: editeList.email || "",
  })
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(validateTextInput, {
    type: "text",
    value: editeList.name || "",
  })
  const {
    value: enteredNum,
    rawPhone,
    dialCode,
    phoneIsValid: enteredNumIsValid,
    phoneHasError: enteredNumHasError,
    reactPhoneChangeHandler: phoneNumChangeHandler,
    inputBlurHandler: phoneNumBlurHandler,
    reset: resetPhoneNum,
  } = useInput(validatePhoneNumber, {
    type: "number",
    value: editeList.mobile_number
      ? `${editeList.country_code || ""} ${editeList.mobile_number}`
      : "",
    dialCode: editeList.country_code || "",
    rawPhone: editeList.mobile_number || "",
  })

  const handlerAddAndEdit = (type, rows = null) => {
    setType(type)
    setOpenAdduser(true)
    let data = rows || {}
    if (type === "edit" && rows) {
      setEditUserid(rows.id)
      setEditeList(rows)
      // Initialize selectedItems based on current status (inverted)
      if (rows.status === "inactive") {
        // Changed from active
        setSelectedItems([rows])
      } else {
        setSelectedItems([])
      }
      setRole(rows.admin_role_id.toString())
    } else {
      setRole("")
      setEditeList({})
      setSelectedItems([])
    }
  }
  const handleClearInput = () => {
    resetEmailInput()
    resetNameInput()
    resetPhoneNum()
    setRole("")
    setType("")
    setEditeList({}) // Clear edit data
  }
  const handleAddUser = () => {
    addUserLIstRequest(
      {
        url: `admin/user-management/create`,
        method: "POST",
        body: {
          name: name,
          country_code: dialCode,
          mobile_number: rawPhone,
          email: email,
          role_id: role,
        },
      },
      data => {
        handleClosesetOpenAddUser()
        viewList()
      }
    )
  }
  const handleEditUser = () => {
    updateeditRoleRequest(
      {
        url: `admin/user-management/update/${editUseridmail}`, // use the correct id
        method: "POST",
        body: {
          name: name,
          country_code: dialCode,
          mobile_number: rawPhone,
          email: email,
          role_id: role,
          status: finalData[0]?.status,
        },
      },
      data => {
        handleClosesetOpenAddUser()
        viewList() // reload list
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
            url: `admin/user-management/delete/${id}`,
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
      handleEditUser()
    }
  }
  const viewList = () => {
    sendRequest(
      {
        url: `admin/user-management/list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          filter: {
            status: status, // active,inactive
            from_date: "", // d-m-Y
            to_date: "",
          },
        },
      },
      data => {
        setData(data?.data?.data)
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

  console.log("finalData", finalData[0]?.status)

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>User List</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>{totalReporting} Users</p>
              <Slecter
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
                Add New User
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
                  {type === "add" ? "Add New User" : "Edit User"}
                </h3>
                <div className={classes.dialog_loyout_main}>
                  <CustomTextField
                    id="email"
                    label="Email Address"
                    placeholder="Enter Email Address"
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                    value={email}
                    onChange={emailChangeHandler}
                    error={emailHasError}
                    onBlur={emailBlurHandler}
                    helperText={emailHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <CustomTextField
                    id="name"
                    label="Name"
                    placeholder="Enter your name"
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
                  <PhoneNumInput
                    inputProps={{
                      name: "mobile_number",
                      required: true,
                      placeholder: "Enter your phone number",
                    }}
                    autoFormat={false}
                    value={enteredNum}
                    onChange={(value, data, e) => {
                      phoneNumChangeHandler(value, data, e)
                    }}
                    phoneHasError={enteredNumHasError}
                    onBlur={phoneNumBlurHandler}
                  />
                  <CustomeSlecterAdmin
                    data={
                      roleData?.map(sub => ({
                        label: sub.name,
                        value: sub.id.toString(),
                      })) || []
                    }
                    title="Choose your Role" // Dropdown title
                    lable="Choose Role"
                    width={"100%"}
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    borders={true}
                  />
                </div>
                {type !== "add" &&
                  arrayOfUsers.map(item => (
                    <CheckBox
                      key={item.id}
                      label={`Mark as ${selectedItems.some(selected => selected.id === item.id)
                          ? "Inactive" // Changed from Inactive
                          : "Inactive" // Changed from Inactive
                        } user`}
                      checked={selectedItems.some(
                        selected => selected.id === item.id
                      )}
                      onChange={() => handleCheckboxToggle(item)}
                    />
                  ))}

                <div className="btn_group">
                  <button
                    className="btn_cancel"
                    onClick={handleClosesetOpenAddUser}
                  >
                    Cancel
                  </button>
                  <button className="btn_submit" onClick={handleSubmit}>
                    Submit
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

export default UserList
