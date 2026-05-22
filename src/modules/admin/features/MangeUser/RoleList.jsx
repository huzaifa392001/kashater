import React, { useEffect, useState } from "react"
import classes from "./RoleList.module.css"
import CustomTable from "../../components/UI/Table/TablePage"
import Slecter from "../../../admin/components/UI/Dropdown/Select"
import SearchExpand from "../../components/UI/SearchExpand/SearchExpand"
import CustomButton from "../../components/UI/Button/Button"
import DropDownFile from "../../components/UI/DropDownFile/DropDownFile"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import {
  validateEmail,
  validatePhoneNumber,
  validateTextInput,
} from "../../utils/validation"
import useInput from "../../utils/use-input"
import CheckBox from "../../components/UI/Checkbox/Checkbox/CheckBox"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import OverlayLoding from "../../components/UI/Loding/OverlayLoding"
import { useDispatch } from "react-redux"
import { fetchList } from "../../services/storeSlice/sideBar"

const RoleList = () => {
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
    sendRequest: addRoleRequest,
  } = useApiHttp()
  const {
    isLoading: editRoleLoading,
    success: editRoleSuccess,
    error: editRoleError,
    sendRequest: editRoleRequest,
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
    sendRequest: setDeleteRoleList,
  } = useApiHttp()
  const [page, setPage] = useState(1)
  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [perPage, setPerPage] = useState(10)
  const [column, setColumn] = useState(0)
  const [total, setTotal] = useState([])
  const [totalReporting, setTotalReporting] = useState(0)
  const [openAdduser, setOpenAdduser] = useState(false)
  const [type, setType] = useState("")

  // Search state
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [moduleList, setModuleList] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [names, setNames] = useState("")
  const [editUseridmail, setEditUserid] = useState("")

  console.log("selectedItems", selectedItems)

  const RoleListData = [
    {
      name: "S.No",
      selector: row => row.sl_no,
      sortable: false,
      sortField: 0,
      maxWidth: "76px",
      minWidth: "50px",
    },
    {
      name: "Role Name",
      cell: row => (
        <>
          <p>{row.name}</p>
        </>
      ),
      maxWidth: "150px",
      minWidth: "150px",
      sortable: true,
      sortField: 7,
    },
    {
      name: "Access",
      cell: row => (
        <>
          <p
            className="text_warp"
            // onClick={() => actionHandleClick(row)}
          >
            {row.modules}
          </p>
        </>
      ),
      // selector: row => row.modules,
      sortable: false,
      sortField: 5,
    },
    {
      name: "Created Date",
      selector: row => row.created_at,
      sortable: false,
      sortField: 4,
    },

    {
      name: "",
      cell: row => (
        <>
          <div className="action_btn">
            <button
              className="action_edit"
              onClick={() => handlerAddAndEdit("edit", row.id)}
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

  const onDownloadItemClick = fileType => {
    alert(fileType)
    //  axios({
    //    method: "post",
    //    url: `${baseApiUrl}/${role}/report-list-download`,
    //    data: {
    //      order_type: completedReport.selectedVal,
    //      file_type: fileType,
    //    },
    //    headers: {
    //      Authorization: `Bearer ${apiBearerToken}`,
    //    },
    //    responseType: "blob", // Important for binary data
    //  })
    //    .then(response => {
    //      const url = window.URL.createObjectURL(new Blob([response.data]))
    //      const link = document.createElement("a")
    //      link.href = url

    //      // Extract the filename from the response headers (optional)
    //      const contentDisposition = response.headers["content-disposition"]
    //      let fileName = `${"Report"}.${fileType}` // default file name with correct extension

    //      if (contentDisposition) {
    //        const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
    //        if (fileNameMatch && fileNameMatch.length === 2) {
    //          fileName = fileNameMatch[1]
    //        }
    //      } else {
    //        // Fallback to using the fileType for naming the file
    //        fileName = `${"Report"}.${fileType}`
    //      }

    //      link.setAttribute("download", fileName)
    //      document.body.appendChild(link)
    //      link.click()
    //      link.remove() // cleanup
    //    })
    //    .catch(error => {
    //      console.error("Error downloading the file:", error)
    //    })
  }

  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    handleClearInput()
  }

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(validateTextInput)

  const handlerAddAndEdit = (type, id = null) => {
    setType(type)
    setOpenAdduser(true)
    setEditUserid(id)
    if (type === "edit") {
      editRoleRequest(
        {
          url: `admin/role-management/view/${id}`,
          method: "GET",
        },
        data => {
          console.log("modules", data)

          setNames(data?.data?.name || "")
          setSelectedItems(data?.data?.modules || [])
        }
      )
    } else {
      resetNameInput("")
      setSelectedItems([])
    }
  }
  const handleClearInput = () => {
    setNames("")
    setType("")
    setSelectedItems([])
  }

  const showList = () => {
    sendRequest({ url: `admin/role-management/list` }, data => {
      setData(data?.data?.data || [])
      setTotalReporting(data?.data?.total_count)
    })
  }

  const handleAddUser = () => {
    addRoleRequest(
      {
        url: `admin/role-management/create-role`,
        method: "POST",
        body: {
          name: names,
          modules: selectedItems,
        },
      },
      data => {
        handleClosesetOpenAddUser()
        showList()
        dispatch(fetchList())
      }
    )
  }
  const handleEditUser = id => {
    if (editUseridmail) {
      updateeditRoleRequest(
        {
          url: `admin/role-management/update-role/${editUseridmail}`,
          method: "POST",
          body: {
            name: names,
            modules: selectedItems,
          },
        },
        data => {
          handleClosesetOpenAddUser()
          showList()
          dispatch(fetchList())
        }
      )
    }
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
        setDeleteRoleList(
          {
            url: `admin/role-management/delete/${id}`,
            method: "DELETE",
          },
          data => {
            showList()
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
  // Function to handle checkbox toggle
  const handleCheckboxToggle = item => {
    // if (selectedItems.includes(item)) {
    //   setSelectedItems(
    //     selectedItems.filter(selectedItem => selectedItem !== item)
    //   )
    // } else {
    //   setSelectedItems([...selectedItems, item])
    // }
    setSelectedItems(prev => {
      // Check if item already exists in selection
      const exists = prev.some(selected => selected.id === item.id)
      if (exists) {
        return prev.filter(selected => selected.id !== item.id)
      } else {
        return [...prev, item]
      }
    })
  }

  useEffect(() => {
    showList()
    sendRequest(
      {
        url: `admin/role-management/module-list`,
      },
      data => {
        setModuleList(data?.data)
      }
    )
  }, [])
  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Role List</h3>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <p className={classes.header_titel}>{totalReporting} Roles</p>
            </div>
            <div className={classes.header_table_right}>
              {/* <SearchExpand
                placeholder="Search products..."
                onSearchChange={value => setSearchValue(value)}
                searchValue={searchValue}
                maxWidth="500px"
              />
              <div className={classes.filters}></div>
              <DropDownFile handleFileDownload={onDownloadItemClick} /> */}
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
                Add New Role
              </CustomButton>
            </div>
          </div>
        </div>
        <CustomTable
          data={data}
          columns={RoleListData}
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
          overflowY={"auto"}
          children={
            <>
              <div className="dialog_loyout">
                <h3 className="dialog_loyout_title">
                  {type === "add" ? "Add New Role" : "Edit Role"}
                </h3>
                <div className={classes.fileds}>
                  <CustomTextField
                    id="RoleName"
                    label="Role Name"
                    placeholder="Enter your Role Name"
                    variant="outlined"
                    value={names}
                    sx={{
                      width: "100%",
                    }}
                    onChange={e => setNames(e.target.value)}
                    // error={nameHasError}
                    // onBlur={nameBlurHandler}
                    // helperText={nameHasError ? "Enter the email" : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </div>
                <div>
                  <p className={classes.module_text}>Choose Module</p>
                  {/* {!selectedItemsError ? "" : ""} */}
                  <div className={classes.checkbox_box}>
                    {moduleList.map(item => (
                      <CheckBox
                        key={item.id}
                        label={item.name}
                        // checked={selectedItems.includes(item.id)} // Use item.token here
                        checked={selectedItems.some(
                          selected => selected.id === item.id
                        )}
                        onChange={() => handleCheckboxToggle(item)}
                      />
                    ))}
                  </div>
                </div>
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

              {editRoleLoading && <OverlayLoding />}
            </>
          }
        />
      )}
    </>
  )
}

export default RoleList
