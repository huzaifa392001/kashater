import React from "react"
import DataTable from "react-data-table-component"
import styled from "styled-components"
import classes from "./Table.module.css"
// import Loader from '../Loader/Loader';

const customStyles = {
  rows: {
    style: {
      minHeight: "64px", // override the row height
    },
  },
  headCells: {
    style: {
      padding: "0px 8px ", // override the cell padding for head cells
      backgroundColor: "#EFEFEF",
      fontSize: "13px",
      textTransform: "capitalize",
      fontFamily: "Medium",
      color: "#68686A",
      borderBottomStyle: "unset",
      // borderTopRightRadius: "5px",
      // borderTopLeftRadius: "5px",
      borderBottomColor: "transparent",
      // minWidth: "136px !important",
    },
  },
  cells: {
    style: {
      padding: "8px",
      fontSize: "14px",
      fontFamily: "Regular",
      color: "#000000", // override the cell padding for data cells
      // border: '2px dashed #D0D5D8 ',
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      borderTopStyle: "unset",
      position: "absolute",
      bottom: "-55px",
      left: "0",
      paddingRight: "0",
      paddingLeft: "0",
    },
  },
}

const CustomsTable = styled(DataTable)`
  &::-webkit-scrollbar {
    height: 8px;
    width: 0px;
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

  .rdt_TableHeadRow {
    border-bottom: 1px solid transparent;
    min-height: 44px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    overflow: hidden;
  }

  .kdMScy {
    font-size: 13px;
    text-transform: capitalize;
    font-family: var(--medium);
  }

  .rdt_TableRow:not(:last-of-type) {
    border-bottom-style: dashed;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0, 0, 0, 0.12);
  }

  .rdt_TableCell {
    font-family: var(--regular);
    font-size: 14px;
    color: #000000;
  }
`

const paginationComponentOptions = {
  rowsPerPageText: "Shows per page :",
  rangeSeparatorText: "of",
  selectAllRowsItem: false,
  // selectAllRowsItemText: 'All',
}

const CustomTable = ({
  children,
  data,
  columns,
  loader,
  onSort,
  paginationTotalRows,
  onChangeRowsPerPage,
  onChangePage,
}) => {
  return (
    <div className={classes.relative_table}>
      <div className={classes.table_container}>
        <CustomsTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          progressPending={loader}
          // progressComponent={<Loader />}
          fixedHeader
          fixedHeaderScrollHeight="655px"
          subHeader
          subHeaderComponent={<>{children}</>}
          onSort={onSort}
          sortServer
          paginationServer
          paginationTotalRows={paginationTotalRows}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangePage={onChangePage}
        />
      </div>
    </div>
  )
}

export default CustomTable
