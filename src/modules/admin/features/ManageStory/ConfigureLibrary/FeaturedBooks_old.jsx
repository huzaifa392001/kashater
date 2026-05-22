import React, { useEffect, useState } from "react"
import classes from "./FeaturedBooks.module.css"
import CustomTable from "../../../components/UI/Table/TablePage"
// import Slecter from "../../../admin/components/UI/Dropdown/Select"
import SearchExpand from "../../../components/UI/SearchExpand/SearchExpand"
import CustomButton from "../../../components/UI/Button/Button"
import DropDownFile from "../../../components/UI/DropDownFile/DropDownFile"
import CustomDialog from "../../../components/UI/Dialog/Dialog"
import CustomTextField from "../../../components/UI/TextFiled/TextFiled"
import { validateTextInput } from "../../../utils/validation"
import useInput from "../../../utils/use-input"
import CheckBox from "../../../components/UI/Checkbox/Checkbox/CheckBox"
import TabBar from "../../../components/UI/Tabs/Tabs"
import useApiHttp from "../../../hooks/ues-http"
import Swal from "sweetalert2"
import TrashIcon from "../../../assets/image/svg/trash_icon.svg"
import DragIcon from "../../../assets/image/svg/drag_icon.svg"
import { IconButton } from "@mui/material"

const FeaturedBooks = () => {
  //   const { isLoading, success, error, sendRequest } = useApiHttp()

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
  const [listsTrigger, setlistsTrigger] = useState(false)
  const [addedBooksTrigger, setAddedBooksTrigger] = useState(false)
  const [data, setData] = useState([])
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
      name: "Story ID",
      cell: row => (
        <>
          {/* <p
            className="action_text action_text_pointer flex"
            onClick={() => actionHandleClick(row)}
          >
            {row?.code}
          </p> */}
          <p className="">{row?.code}</p>
        </>
      ),
      maxWidth: "150px",
      minWidth: "150px",
      sortable: true,
      sortField: 7,
    },
    {
      name: "Title",
      selector: row => row.name,
      sortable: false,
      sortField: 5,
    },
    {
      name: "Category",
      selector: row => row.category,
      sortable: false,
      sortField: 4,
    },
    {
      name: "Age Group",
      selector: row => row.age_group,
      sortable: false,
      sortField: 4,
    },

    {
      name: "Actions",
      cell: row => (
        <>
          <div className="action_btn">
            <IconButton onClick={() => handleDelete(row)}>
              <img src={TrashIcon} alt="delete-icon" width={"16px"} />
            </IconButton>
            {/* <IconButton onClick={() => actionHandleClick(row)}>
              <img
                src={DragIcon}
                alt="drag-icon"
                width={"16px"}
              />
            </IconButton> */}
            {/* <button
              className="action_edit"
              onClick={() => handlerAddAndEdit("edit")}
            >
              Edit
            </button>
            <button className="action_delete">Delete</button> */}
          </div>
        </>
      ),
      sortable: false,
      sortField: 7,
      minWidth: "80px",
      maxWidth: "80px",
    },
  ]

  const { sendRequest: getNewBooksList } = useApiHttp()
  const { sendRequest: getBooksToAdd } = useApiHttp()
  const { sendRequest: addBook } = useApiHttp()
  const { sendRequest: deleteBook } = useApiHttp()
  const { sendRequest: updateBookOrder } = useApiHttp()

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

  const handlerAddAndEdit = type => {
    setType(type)
    let selectedBooks = moduleList
      .filter(item => item?.is_added === true)
      .map(item => item.token)
    setSelectedItems(selectedBooks)
    setOpenAdduser(true)
  }
  const handleClearInput = () => {
    resetNameInput()
    setSelectedItems([])
    setType("add")
  }
  const handleSubmit = () => {
    if (selectedItems.length > 0) {
      addBook(
        {
          method: "POST",
          url: `admin/story-management/library-config/add-book/featured_month_books`,
          body: {
            book_ids: selectedItems,
          },
        },
        () => {
          handleClosesetOpenAddUser()

          Swal.fire("Success!", "Book has been added.", "success").then(() => {
            // Optionally, refresh the category list or perform any other action
            setlistsTrigger(prev => !prev)
            //initiate trigger after emptying the selected items
            setAddedBooksTrigger(prev => !prev)
          })
        }
      )
    } else {
      setOpenAdduser(false)
      Swal.fire("Error!", "Please select at least one book.", "error").then(
        () => {
          // // Optionally, refresh the category list or perform any other action
          // setlistsTrigger((prev) => (!prev))
          // handleClosesetOpenAddUser()
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

  const handleDelete = row => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Book.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        deleteBook(
          {
            method: "DELETE",
            url: `admin/story-management/library-config/remove-book/featured_month_books/${row?.id}`,
          },
          () => {
            handleClearInput()
            Swal.fire("Deleted!", "Book has been deleted.", "success").then(
              () => {
                // Optionally, refresh the category list or perform any other action
                setlistsTrigger(prev => !prev)

                //initiate trigger after emptying the selected items
                setAddedBooksTrigger(prev => !prev)
              }
            )
          }
        )
      }
    })
  }

  const handleDragEnd = result => {
    if (!result.destination) return

    const items = Array.from(data)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    console.log(items, "items")

    updateBookOrder(
      {
        method: "POST",
        url: `admin/story-management/library-config/update-order/featured_month_books/${result.draggableId}`,
        body: {
          order: result.destination.index + 1,
        },
      },
      () => {
        setlistsTrigger(prev => !prev)
      }
    )
    // setData(items);
  }

  useEffect(() => {
    getNewBooksList(
      {
        url: `/admin/story-management/library-config/books/featured_month_books`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          sort_column: column,
          sort_direction: sortDirectionData,
          search_value: searchValue,
        },
      },
      response => {
        setData(response.data.books)
        // setTotal(response.data.length)
        setTotalReporting(response.data.total)
      }
    )
  }, [page, perPage, column, sortDirectionData, searchValue, listsTrigger])

  useEffect(() => {
    getBooksToAdd(
      {
        url: `admin/story-management/library-config/all-books/featured_month_books`,
        method: "GET",
      },
      response => {
        let booksList = response.data.map(item => {
          if (item?.is_added) {
            setSelectedItems(prev => [...prev, item.id])
          }
          return {
            token: item.id,
            name: item.name,
            is_added: item.is_added,
          }
        })
        setModuleList(booksList)
        // setTotal(response.data.length)
      }
    )

    // return () => {
    //   second
    // }
  }, [addedBooksTrigger])

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <h4>Featured Books for the Month</h4>
              <p className={classes.header_titel}>{totalReporting} books</p>
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
                Add New
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
          isDraggable={false}
          onDragEnd={handleDragEnd}
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
                  {type === "add" ? "Add New" : "Edit Role"}
                </h3>
                {/* <div className={classes.fileds}>
                  <CustomTextField
                    id="RoleName"
                    label="Story Name"
                    placeholder="Search your Story"
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

                  />
                </div> */}
                <div>
                  <p className={classes.module_text}>Choose Books</p>
                  {/* {!selectedItemsError ? "" : ""} */}
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
            </>
          }
        />
      )}
    </>
  )
}

export default FeaturedBooks
