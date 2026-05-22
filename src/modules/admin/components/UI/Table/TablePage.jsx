import React from "react"
import DataTable from "react-data-table-component"
import styled from "styled-components"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import classes from "./Table.module.css"
import DragIcon from "../../../assets/image/svg/drag_icon.svg"

// RESTORE POINT: Working drag and drop implementation
// Date: [Current Date]
// Features:
// - Unique droppableId for each table instance
// - Proper drag handle implementation in specified column
// - Correct cell rendering with col.selector(row)
// - Visual feedback during dragging

const customStyles = {
  rows: {
    style: {
      minHeight: "60px", // override the row height
    },
  },
  headCells: {
    style: {
      padding: "0px 10px ", // override the cell padding for head cells
      backgroundColor: "#191E251A",
      fontSize: "13px",
      textTransform: "uppercase",
      fontFamily: "var(--font-bold)",
      color: "#1E1E1E",
      borderBottomStyle: "unset",
      borderBottomColor: "transparent",
    },
  },
  cells: {
    style: {
      padding: "10px",
      fontSize: "14px",
      fontFamily: "var(--font-regular)",
      color: "#000000",
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      borderTopStyle: "unset",
      position: "relative", // Change from absolute
      bottom: "0", // Reset negative positioning
      paddingRight: "0",
      paddingLeft: "0",
    },
  },
}

const CustomsTable = styled(DataTable)`
  .rdt_TableHeadRow {
    border-bottom: 1px solid transparent;
    min-height: 44px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    overflow: hidden;
  }
  ${({ scrollConfig }) => `
    overflow-x: ${scrollConfig?.horizontal ? "auto" : "hidden"};
    overflow-y: ${scrollConfig?.vertical ? "auto" : "hidden"};

    &::-webkit-scrollbar {
      ${scrollConfig?.horizontal ? "height: 8px;" : "height: 0px;"}
      ${scrollConfig?.vertical ? "width: 8px;" : "width: 0px;"}
      display: block !important;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    scrollbar-width: ${
      scrollConfig?.horizontal || scrollConfig?.vertical ? "thin" : "none"
    };
    scrollbar-color: #888 #f1f1f1;
  `}
`

const paginationComponentOptions = {
  rowsPerPageText: "Shows per page :",
  rangeSeparatorText: "of",
  selectAllRowsItem: false,
}

const CustomTablePage = ({
  children,
  data,
  columns,
  loader,
  onSort,
  paginationTotalRows,
  onChangeRowsPerPage,
  onChangePage,
  enablePagination = true,
  scrollConfig = { horizontal: true, vertical: true },
  isDraggable = false,
  dragHandleColumn = null,
  onDragEnd,
  droppableId = "table-" + Math.random().toString(36).substr(2, 9),
  paginationServer = true,
  // New props for empty state customization
  emptyMessage = "There are no records to display",
  processingMessage = "The story pages are being processed. Please check back shortly",
  isProcessing = false, // Flag to show processing message
}) => {
  // Custom empty component with dynamic messages
  const CustomEmptyComponent = () => (
    <div className={classes.emptyState}>
      {isProcessing ? (
        <>
          <div className={classes.processingSpinner}></div>
          <p>{processingMessage}</p>
        </>
      ) : (
        <p>{emptyMessage}</p>
      )}
    </div>
  )

  const renderTable = () => {
    let tableColumns = [...columns]

    if (isDraggable && !dragHandleColumn) {
      tableColumns = [
        ...columns,
        {
          name: "",
          cell: (row, index, column) => (
            <img
              {...column.dragHandleProps}
              style={{ cursor: "grab" }}
              src={DragIcon}
              alt="drag-icon"
              width={"16px"}
            />
          ),
          sortable: false,
        },
      ]
    }

    const commonProps = {
      customStyles: customStyles,
      pagination: enablePagination,
      paginationComponentOptions: paginationComponentOptions,
      progressPending: loader,
      fixedHeader: true,
      fixedHeaderScrollHeight: "655px",
      subHeader: children ? true : false,
      subHeaderComponent: children && <>{children}</>,
      onSort: onSort,
      sortServer: true,
      paginationServer: paginationServer,
      paginationTotalRows: paginationTotalRows,
      onChangeRowsPerPage: onChangeRowsPerPage,
      onChangePage: onChangePage,
      scrollConfig: scrollConfig,
      noDataComponent: <CustomEmptyComponent />, // Use our custom empty component
    }

    if (!isDraggable) {
      return (
        <CustomsTable columns={tableColumns} data={data} {...commonProps} />
      )
    }

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <CustomsTable
                columns={tableColumns.map(col => {
                  if (
                    col.name === dragHandleColumn ||
                    (!dragHandleColumn && col.name === "")
                  ) {
                    return {
                      ...col,
                      cell: (row, index) => (
                        <Draggable
                          key={row.id}
                          draggableId={row.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                ...provided.draggableProps.style,
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                              }}
                            >
                              <div
                                {...provided.dragHandleProps}
                                style={{
                                  cursor: "grab",
                                  backgroundColor: snapshot.isDragging
                                    ? "#f8f9fa"
                                    : "transparent",
                                  boxShadow: snapshot.isDragging
                                    ? "0 0 8px rgba(0,0,0,0.1)"
                                    : "none",
                                  transform: snapshot.isDragging
                                    ? "scale(1.02)"
                                    : "none",
                                  transition: "all 0.2s ease",
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                  height: "100%",
                                  padding: "0 10px",
                                }}
                              >
                                {col.cell
                                  ? col.cell(row, index, {
                                      dragHandleProps: provided.dragHandleProps,
                                    })
                                  : col.selector(row)}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ),
                    }
                  }
                  return col
                })}
                data={data}
                {...commonProps}
                customStyles={{
                  ...customStyles,
                  rows: {
                    ...customStyles.rows,
                    style: {
                      ...customStyles.rows.style,
                      "&:hover": {
                        backgroundColor: "#f8f9fa",
                      },
                      "&:active": {
                        backgroundColor: "#f1f3f5",
                      },
                    },
                  },
                  cells: {
                    ...customStyles.cells,
                    style: {
                      ...customStyles.cells.style,
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                    },
                  },
                }}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }

  return (
    <div className={classes.relative_table}>
      <div className={classes.table_container}>{renderTable()}</div>
    </div>
  )
}

export default CustomTablePage
