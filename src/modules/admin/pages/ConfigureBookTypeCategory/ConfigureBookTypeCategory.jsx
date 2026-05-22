import React, { useEffect, useState } from "react"
import classes from "./ConfigureBookTypeCategory.module.css"
import CustomTable from "../../components/UI/Table/TablePage"
// import Slecter from "/../../admin/components/UI/Dropdown/Select"
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
import CheckBox from "../../components/UI/Checkbox/Checkbox/CheckBox"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"

const ConfigureBookTypeCategory = () => {
    //   const { isLoading, success, error, sendRequest } = useApiHttp()

    const [page, setPage] = useState(1)
    const [sortDirectionData, setSortDirectionData] = useState("DESC")
    const [perPage, setPerPage] = useState(10)
    const [column, setColumn] = useState(0)
    const [total, setTotal] = useState([])
    const [totalReporting, setTotalReporting] = useState(0)
    const [openAdduser, setOpenAdduser] = useState(false)
    const [type, setType] = useState("")
    const [editCatID, setEditCatID] = useState("")

    // Search state
    const [searchValue, setSearchValue] = useState("")
    const [data, setData] = useState([])
    const [listsTrigger, setlistsTrigger] = useState(false)
    const [moduleList, setModuleList] = useState([
        { token: "mod-1", name: "User Management" },
        { token: "mod-2", name: "Work Orders" },
        { token: "mod-3", name: "Inventory Control" },
        { token: "mod-4", name: "Reporting" },
        { token: "mod-5", name: "Notifications" },
    ])
    const [selectedItems, setSelectedItems] = useState([])
    // const [selectedItemsError, setSelectedItemsError] = useState(true);
    const [newRole, setNewRole] = useState({
        role: "",
    })

    const ConfigureCategorydata = [
        {
            name: "S.No",
            selector: row => row.sl_no,
            sortable: false,
            sortField: 0,
            maxWidth: "76px",
            minWidth: "50px",
        },
        {
            name: "category ID",
            cell: row => (
                <>
                    <p className="">{row?.code}</p>
                </>
            ),
            maxWidth: "150px",
            minWidth: "150px",
            sortable: true,
            sortField: 7,
        },
        {
            name: "category name",
            selector: row => row?.name,
            sortable: false,
            sortField: 5,
            wrap: true,
            style: {
                whiteSpace: "normal", // Prevents truncation
                wordBreak: "break-word", // Ensures long words wrap
            },
        },
        // {
        //     name: "Created Date",
        //     selector: row => row?.created_date,
        //     sortable: false,
        //     sortField: 4,
        // },

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
                        <button className="action_delete" onClick={() => handleDelete(row)}>
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
            name: "5",
            token: "1",
        },
        {
            name: "12",
            token: "2",
        },
        {
            name: "16",
            token: "3",
        },
        {
            name: "18",
            token: "4",
        },
    ]
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

    const { sendRequest: categoryLists } = useApiHttp()
    const { sendRequest: addCategory } = useApiHttp()
    const { sendRequest: updateCategory } = useApiHttp()
    const { sendRequest: deleteCategory } = useApiHttp()

    const handlerAddAndEdit = (type, row = {}) => {
        setType(type)
        if (type === "edit") {
            nameChangeHandler({ target: { value: row?.name } })
            setEditCatID(row?.id)
        } else {
            resetNameInput()
        }
        setOpenAdduser(true)
    }
    const handleClearInput = () => {
        resetNameInput()
        setType("add")
        setEditCatID("")
    }

    const handleDelete = row => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this category.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then(result => {
            if (result.isConfirmed) {
                deleteCategory(
                    {
                        method: "DELETE",
                        url: `admin/story-management/book-type-category/delete/${row?.id}`,
                    },
                    () => {
                        Swal.fire(
                            "Deleted!",
                            "Your category has been deleted.",
                            "success"
                        ).then(() => {
                            // Optionally, refresh the category list or perform any other action
                            setlistsTrigger(prev => !prev)
                        })
                    }
                )
            }
        })
    }

    const handleSubmit = () => {
        if (type === "add") {
            addCategory(
                {
                    url: `admin/story-management/book-type-category/create`,
                    method: "POST",
                    body: {
                        name: name,
                    },
                },
                () => {
                    setOpenAdduser(false)
                    Swal.fire("Added!", "Your category has been added.", "success").then(
                        () => {
                            handleClearInput()
                            setlistsTrigger(prev => !prev)
                        }
                    )
                }
            )
        } else {
            updateCategory(
                {
                    // url: `admin/story-management/book-type-category/update/${editCatID}`,
                    url: `admin/story-management/book-type-category/update`,
                    method: "PUT",
                    body: {
                        name: name,
                        id: editCatID
                    },
                },
                () => {
                    setOpenAdduser(false)
                    Swal.fire(
                        "Updated!",
                        "Your category has been updated.",
                        "success"
                    ).then(() => {
                        handleClearInput()
                        setlistsTrigger(prev => !prev)
                    })
                }
            )
        }
    }
    // Function to handle checkbox toggle
    const handleCheckboxToggle = item => {
        if (selectedItems.includes(item)) {
            setSelectedItems(
                selectedItems.filter(selectedItem => selectedItem !== item)
            )
        } else {
            setSelectedItems([...selectedItems, item])
        }
    }

    useEffect(() => {
        categoryLists(
            {
                url: `admin/story-management/book-type-category/list`,
                method: "POST",
                body: {
                    page: page,
                    per_page: perPage,
                    search: searchValue,
                    sort_column: column,
                    sort_order: sortDirectionData,
                },
            },
            data => {

                setData(data.data.list)
                // setTotal(data.data.length)
                setTotalReporting(data.data.total_count)
            }
        )

        // return () => {
        //   second
        // }
    }, [page, perPage, searchValue, sortDirectionData, listsTrigger])

    return (
        <>
            <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
                <div className={classes.header_table}>
                    <h3>Configure Book Type Category</h3>
                    <div className={classes.header_table_box}>
                        <div className={classes.header_table_left}>
                            <p className={classes.header_titel}>
                                {totalReporting}{" "}
                                {totalReporting > 1 ? "Categories" : "Category"}
                            </p>
                        </div>
                        <div className={classes.header_table_right}>
                            {/* <DropDownFile handleFileDownload={onDownloadItemClick} /> */}
                            {/* <div className={classes.filters}></div> */}
                            <SearchExpand
                                placeholder="Search Book Type Category..."
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
                    columns={ConfigureCategorydata}
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
                                    {type === "add" ? "Add New" : "Edit Category"}
                                </h3>
                                <div className={classes.fileds}>
                                    <CustomTextField
                                        id="RoleName"
                                        label="Book Type Category Name"
                                        placeholder="Enter your Book Type Category"
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
                                </div>
                                {/* <div>
                  <p className={classes.module_text}>Choose Module</p>
                  {!selectedItemsError ? "" : ""}
                  <div className={classes.checkbox_box}>
                    {moduleList.map(item => (
                      <CheckBox
                        key={item.token}
                        label={item.name}
                        checked={selectedItems.includes(item.token)} // Use item.token here
                        onChange={() => handleCheckboxToggle(item.token)}
                      />
                    ))}
                  </div>
                </div>  */}
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

export default ConfigureBookTypeCategory
