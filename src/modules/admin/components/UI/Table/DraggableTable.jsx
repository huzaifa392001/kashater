import React from "react"
import DataTable from "react-data-table-component"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import classes from "./Table.module.css"
import DragIcon from "../../../assets/image/svg/drag_icon.svg"

const DraggableRow = styled.div`
  display: flex;
  width: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
  border-bottom: 1px solid #eee;
  background: white;

  &:hover {
    background: #f8f9fa;
  }

  &.dragging {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
    z-index: 100;
  }
`

const CustomTablePage = ({
  data,
  columns,
  paginationTotalRows,
  onChangePage,
  onChangeRowsPerPage,
  onDragEnd,
  enablePagination = true,
  isDraggable = false,
  ...props
}) => {
  const enhancedColumns = isDraggable
    ? [
        {
          name: "",
          cell: (row, index, column) => (
            <div className="drag-handle" {...column.dragHandleProps}>
              <img src={DragIcon} alt="drag" style={{ cursor: "grab" }} />
            </div>
          ),
          width: "70px",
          ignoreRowClick: true,
        },
        ...columns,
      ]
    : columns

  return (
    <div className={classes.relative_table}>
      <div className={classes.table_container}>
        {isDraggable ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="draggable-table">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <DataTable
                    columns={enhancedColumns}
                    data={data}
                    customStyles={{
                      rows: {
                        style: {
                          minHeight: "60px",
                          padding: "0 !important",
                          backgroundColor: "transparent !important",
                        },
                      },
                      cells: {
                        style: {
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                        },
                      },
                    }}
                    rowStyles={(row, index) => ({
                      className: row.dragging ? "dragging" : "",
                    })}
                    subHeaderWrap={false}
                    responsive
                    pagination={enablePagination}
                    paginationServer
                    paginationTotalRows={paginationTotalRows}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    {...props}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            pagination={enablePagination}
            paginationServer
            paginationTotalRows={paginationTotalRows}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            {...props}
          />
        )}
      </div>
    </div>
  )
}

export default CustomTablePage
