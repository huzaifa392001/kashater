import React, { useEffect, useState } from "react"
import classes from "./CustomerList.module.css"
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
import { IconButton } from "@mui/material"
import TrashIcon from "../../assets/image/svg/trash_icon.svg"

const CustomerList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const {
    isLoading: setDeleteLoading,
    success: setDeleteSuccess,
    error: setDeleteError,
    sendRequest: setDeleteUserList,
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


  const viewList = () => {
    sendRequest(
      {
        url: `admin/manage-customer/list`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          search: searchValue,
          status: status, // active,inactive
        },
      },
      data => {
        setData(data?.data?.users)
        setTotalReporting(data?.data?.total_count)
      }
    )
  }

  useEffect(() => {
    viewList()
  }, [page, perPage, searchValue, status])



  const deleteUserRolelistData = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete this record and all associated data. This cannot be undone.",
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
            url: `admin/manage-customer/delete/${id}`,
            method: "DELETE",
          },
          data => {
            Swal.fire({
              icon: "success",
              title: "Deleted successfully!",
            }).then(() => {
              viewList();
            });
          }
        )
      }
    })
  }


  const customerListData = [
    {
      name: "S.No",
      selector: row => row.sl_no,
      sortable: false,
      sortField: 0,
      maxWidth: "76px",
      minWidth: "50px",
    },
    {
      name: "User ID",
      cell: row => (
        <>
          <p
            className="action_text flex"
            style={{ color: "#1D85F3" }}
            onClick={() =>
              navigate("/admin/customerlist/details", {
                state: {
                  customerId: row.id,
                  code: row.code,
                },
              })
            }
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
      name: "Full Name",
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
      name: "Mobile Number",
      selector: row => row.mobile_number,
      sortable: false,
      sortField: 1,
      maxWidth: "150px",
      minWidth: "150px",
    },
    {
      name: "Email Address",
      selector: row => row.email,
      sortable: false,
      sortField: 5,
      maxWidth: "300px",
      minWidth: "300px",
      wrap: true,
      style: {
        whiteSpace: "normal", // Prevents truncation
        wordBreak: "break-word", // Ensures long words wrap
      },
    },
    {
      name: "Current Plan",
      selector: row => row.current_plan,
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
      name: "Expiry Date",
      selector: row => row.expiry_date,
      sortable: false,
      sortField: 4,
      maxWidth: "130px",
      minWidth: "130px",
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
            <IconButton onClick={() => deleteUserRolelistData(row.id)}>
              <img src={TrashIcon} alt="edit" />
            </IconButton>
            {/* <button
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

  const slectdata = [
    {
      name: "Active",
      token: "active",
    },
    {
      name: "Blocked",
      token: "blocked",
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
      url: `${baseUrl}/admin/manage-customer/download`,
      data: {
        type: fileType,
        search: searchValue,
        status: status,
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
        let fileName = `${"Customer-List"}.${fileType}` // default file name with correct extension

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1]
          }
        } else {
          // Fallback to using the fileType for naming the file
          fileName = `${"Customer-List"}.${fileType}`
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


  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Customer List</h3>
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
                title="All Users"
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
                placeholder="Search Customer..."
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
      {/* {openAdduser && (
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
                  <CustomeSlecter
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
                        ? "Inactive"
                        : "Active"
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
      )} */}
    </>
  )
}

export default CustomerList
