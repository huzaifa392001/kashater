import React, { useEffect, useState } from "react"
import classes from "./WhatNew.module.css"
import CustomTable from "../../../components/UI/Table/TablePage"
import CustomButton from "../../../components/UI/Button/Button"
import CustomDialog from "../../../components/UI/Dialog/Dialog"
import CheckBox from "../../../components/UI/Checkbox/Checkbox/CheckBox"
import useApiHttp from "../../../hooks/ues-http"
import { IconButton } from "@mui/material"
import TrashIcon from "../../../assets/image/svg/trash_icon.svg"
import DragIcon from "../../../assets/image/svg/drag_icon.svg"
import Swal from "sweetalert2"

// RESTORE POINT: Working drag and drop implementation
// Date: [Current Date]
// Features:
// - Proper column configuration with Actions as drag handle
// - Working handleDragEnd implementation
// - Correct table props for drag and drop

const WhatNew = () => {
  const [page, setPage] = useState(1)
  const [sortDirectionData, setSortDirectionData] = useState("DESC")
  const [perPage, setPerPage] = useState(10)
  const [column, setColumn] = useState(0)
  const [totalReporting, setTotalReporting] = useState(0)
  const [openAdduser, setOpenAdduser] = useState(false)
  const [type, setType] = useState("")
  const [data, setData] = useState([])
  const [moduleList, setModuleList] = useState([
    { token: "mod-1", name: "User Management" },
    { token: "mod-2", name: "Work Orders" },
    { token: "mod-3", name: "Inventory Control" },
    { token: "mod-4", name: "Reporting" },
    { token: "mod-5", name: "Notifications" },
  ])
  const [selectedItems, setSelectedItems] = useState([])
  const [listsTrigger, setlistsTrigger] = useState(false)
  const [addedBooksTrigger, setAddedBooksTrigger] = useState(false)

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
          {/* <p className="action_text action_text_pointer flex">
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
          </div>
        </>
      ),
      sortable: false,
      sortField: 7,
      minWidth: "80px",
      maxWidth: "80px",
    },
    // {
    //   name: "action",
    //   cell: (row, index, column) => (

    //     <img {...column.dragHandleProps} style={{ cursor: 'grab' }} src={DragIcon} alt="drag-icon" width={"16px"} />

    //   ),
    //   sortable: false,
    //   sortField: 8,
    // },
  ]

  const { sendRequest: getNewBooksList } = useApiHttp()
  const { sendRequest: getBooksToAdd } = useApiHttp()
  const { sendRequest: addBook } = useApiHttp()
  const { sendRequest: deleteBook } = useApiHttp()
  const { sendRequest: updateBookOrder } = useApiHttp()

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

  const handleDragEnd = result => {
    if (!result.destination) return

    const items = Array.from(data)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    console.log(items, "items")

    updateBookOrder(
      {
        method: "POST",
        url: `admin/story-management/library-config/update-order/whats_new/${result.draggableId}`,
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
            url: `admin/story-management/library-config/remove-book/whats_new/${row?.id}`,
          },
          () => {
            handleClearInput()
            Swal.fire("Deleted!", "Book has been deleted.", "success").then(
              () => {
                setlistsTrigger(prev => !prev)
                setAddedBooksTrigger(prev => !prev)
              }
            )
          }
        )
      }
    })
  }

  const handleClearInput = () => {
    setSelectedItems([])
    setType("add")
  }

  const handlerAddAndEdit = type => {
    setType(type)
    setOpenAdduser(true)
    let selectedBooks = moduleList
      .filter(item => item?.is_added === true)
      .map(item => item.token)
    setSelectedItems(selectedBooks)
  }

  const handleSubmit = () => {
    if (selectedItems.length > 0) {
      addBook(
        {
          method: "POST",
          url: `admin/story-management/library-config/add-book/whats_new`,
          body: {
            book_ids: selectedItems,
          },
        },
        () => {
          handleClosesetOpenAddUser()
          Swal.fire("Success!", "Book has been added.", "success").then(() => {
            setlistsTrigger(prev => !prev)
            setAddedBooksTrigger(prev => !prev)
          })
        }
      )
    } else {
      setOpenAdduser(false)
      Swal.fire("Error!", "Please select at least one book.", "error")
    }
  }

  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    handleClearInput()
  }

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
    getNewBooksList(
      {
        url: `/admin/story-management/library-config/books/whats_new`,
        method: "POST",
        body: {
          page: page,
          per_page: perPage,
          sort_column: column,
          sort_direction: sortDirectionData,
        },
      },
      response => {
        setData(response.data.books)
        setTotalReporting(response.data.total)
      }
    )
  }, [page, perPage, column, sortDirectionData, listsTrigger])

  useEffect(() => {
    getBooksToAdd(
      {
        url: `admin/story-management/library-config/all-books/whats_new`,
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
      }
    )
  }, [addedBooksTrigger])

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <h4> What’s New</h4>
              <p className={classes.header_titel}>{totalReporting} books</p>
            </div>
            <div className={classes.header_table_right}>
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
          dragHandleColumn=""
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
                <div>
                  <p className={classes.module_text}>Choose Story</p>
                  <div className={classes.checkbox_box}>
                    {moduleList.map(item => (
                      <CheckBox
                        key={item.token}
                        label={item.name}
                        checked={selectedItems.includes(item.token)}
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

export default WhatNew
