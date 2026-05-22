import React, { useEffect, useRef, useState } from "react"
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
import AgGridTable from "../../../components/UI/Table/AgGridTable"
import SearchBar from "../../../components/UI/Search/Search"

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
  const [searchvalue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [moduleList, setModuleList] = useState([
    // { token: "mod-1", name: "User Management" },
    // { token: "mod-2", name: "Work Orders" },
    // { token: "mod-3", name: "Inventory Control" },
    // { token: "mod-4", name: "Reporting" },
    // { token: "mod-5", name: "Notifications" },
  ])
  const [selectedItems, setSelectedItems] = useState([])
  const [listsTrigger, setlistsTrigger] = useState(false)
  const [addedBooksTrigger, setAddedBooksTrigger] = useState(false)
  const debounceTimeout = useRef(null);

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

  const roleListColumns = [
    {
      headerName: "S.No",
      field: "sl_no",
      sortable: false,
      filter: false,
      width: 76,
      flex: 0,

    },
    {
      headerName: "Story ID",
      field: "code",
      width: 150,
      sortable: false,
      filter: false,
      flex: 0,
    },
    {
      headerName: "Title",
      field: "name",
      sortable: false,
      filter: false,
      flex: 1,
    },
    {
      headerName: "Category",
      field: "category",
      sortable: false,
      filter: false,
      flex: 1,
    },
    {
      headerName: "Age Group",
      field: "age_group",
      sortable: false,
      filter: false,
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      width: 100,
      sortable: false,
      filter: false,
      // RowDrag: true,
      // rowDrag: true,
      flex: 0,

      cellRenderer: (params) => (
        <>
          <div className="action_btn">
            <IconButton onClick={() => handleDelete(params.data)}>
              <img src={TrashIcon} alt="delete-icon" width={"16px"} />
            </IconButton>
          </div>
        </>
      ),

    },
  ]

  const { sendRequest: getNewBooksList } = useApiHttp()
  const { sendRequest: getBooksToAdd } = useApiHttp()
  const { sendRequest: addBook } = useApiHttp()
  const { sendRequest: deleteBook } = useApiHttp()
  const { sendRequest: updateBookOrder, isLoading: bookOrderUpdateInProgress } = useApiHttp()

  const handleSort = (column, sortDirection) => {

    setSortDirectionData(sortDirection || "DESC")
    setColumn(column || 0)
  }

  const handlePageChange = page => {
    setPage(page || 1)
  }

  const handlePerRowsChange = newPerPage => {

    setPerPage(newPerPage || 10)
  }

  const handleDragEnd = (sourceData, destinationData, event) => {

    // if (!result.destination) return;
    if (bookOrderUpdateInProgress) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout);
      debounceTimeout.current = setTimeout(() => handleDragEnd(sourceData, destinationData), 500); // try again after 300ms
      return;
    }

    // let slicedData = data.slice();
    // let sourceRowFilteredArray = slicedData.filter((item, index) => index !== event.node.rowIndex);
    // sourceRowFilteredArray.splice(event.overIndex, 0, event.node.data);
    // sourceRowFilteredArray = sourceRowFilteredArray.map((item, index) => {
    //   return {
    //     ...item,
    //     sl_no: slicedData[index].sl_no, // Update the serial number
    //   };

    // });


    // Update the order in the backend
    updateBookOrder(
      {
        method: "POST",
        url: `admin/story-management/library-config/update-order/whats_new/${sourceData.id}`,
        body: {
          order: destinationData.sl_no,
        },
      },
      () => {
        // Update local state with new order
        // setData(sourceRowFilteredArray);
        setlistsTrigger(prev => !prev);
      }
    );
  };

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
    setSearchValue("")
    setModuleList([])

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
        if (response?.data?.books) {
          const formattedData = response.data.books.map((book, index) => ({
            ...book,
            sl_no: index + 1,
            id: book.id || index // Ensure each row has an id for dragging
          }));
          setData(formattedData);
          setTotalReporting(response.data.total);
        } else {
          setData([]);
          setTotalReporting(0);
        }
      }
    );
  }, [page, perPage, column, sortDirectionData, listsTrigger]);


  const getBooksToAddCall = (searchVal = "") => {
    getBooksToAdd(
      {
        url: `admin/story-management/library-config/all-books/whats_new`,
        method: "POST",
        body: {
          search: searchVal || searchvalue,
        },
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
  }

  // useEffect(() => {
  //   getBooksToAdd(
  //     {
  //       url: `admin/story-management/library-config/all-books/whats_new`,
  //       method: "POST",
  //       body: {
  //         search: searchvalue,
  //       },
  //     },
  //     response => {
  //       let booksList = response.data.map(item => {
  //         if (item?.is_added) {
  //           setSelectedItems(prev => [...prev, item.id])
  //         }
  //         return {
  //           token: item.id,
  //           name: item.name,
  //           is_added: item.is_added,
  //         }
  //       })
  //       setModuleList(booksList)
  //     }
  //   )
  // }, [addedBooksTrigger])


  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        func(...args)
        // timeoutId = null
      }, delay)
    }
  }

  const debouncedSearch = React.useCallback(
    debounce(value => {
      getBooksToAddCall(value)
    }, 500),
    []
  )

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <div className={classes.header_table_box}>
            <div className={classes.header_table_left}>
              <h4>What's New</h4>
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
        <div style={{ flex: 1, minHeight: 0 }}>
          {data && data.length > 0 ? (
            <AgGridTable
              data={data}
              columns={roleListColumns}
              onSort={handleSort}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handlePerRowsChange}
              isDraggable={true}
              setData={setData}
              handleDragEnd={handleDragEnd}
            />
          ) : (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              color: '#666',
              fontSize: '16px'
            }}>
              No data available
            </div>
          )}
        </div>
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
                <div style={{ marginTop: " 1rem" }}>
                  <SearchBar
                    placeholder="Search products..."
                    onSearchChange={value => {
                      setSearchValue(value)
                      debouncedSearch(value)
                    }}
                    value={searchvalue}
                    maxWidth="100%"
                  />
                  {moduleList.length > 0 && (<p className={classes.module_text}>Choose Story</p>)}
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
                <div className="btn_group" style={{ marginTop: "1rem" }}>
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
