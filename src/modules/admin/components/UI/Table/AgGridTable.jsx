import React, { useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
    ModuleRegistry, AllCommunityModule, RowDragModule, RowSelectionModule,
    ClientSideRowModelModule,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import DragIcon from '../../../assets/image/svg/drag_icon.svg';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule, RowDragModule, RowSelectionModule,
    ClientSideRowModelModule]);

const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  
  .ag-theme-alpine {
    height: 100%;
    width: 100%;
    --ag-header-height: 44px;
    --ag-row-height: 60px;
    --ag-header-background-color: #191E251A;
    --ag-header-foreground-color: #1E1E1E;
    --ag-font-size: 14px;
    --ag-font-family: var(--font-regular);
    --ag-cell-horizontal-border: none;
    --ag-borders: none;
    --ag-border-color: transparent;
    --ag-header-column-separator-display: none;
    --ag-header-column-resize-handle-color: transparent;
  }

  .ag-header-cell {
    text-transform: uppercase;
    font-family: var(--font-bold);
    font-size: 13px;
  }

  .ag-cell {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .drag-handle {
    cursor: grab;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
  }

  .drag-handle:active {
    cursor: grabbing;
  }
`;

const AgGridTable = ({
    data = [],
    onSort,
    onPageChange,
    onRowsPerPageChange,
    columns = [],
    isDraggable = false,
    dragColumnIndex = null,
    setData,
    ...props
}) => {
    let columnValues = isDraggable ? (dragColumnIndex !== null && dragColumnIndex > -1 && dragColumnIndex < columns.length) ? [...columns.map((item, index) => {
        if (index === dragColumnIndex) {
            return { ...item, rowDrag: true, }
        }
        return item
    })] : [...columns, {
        headerName: "",
        field: "drag",
        width: 80,
        sortable: false,
        filter: false,
        // RowDrag: true,
        rowDrag: true,
        flex: 0,

        cellRenderer: () => (
            <span className=" ag-row-drag">
                {/* <img src={DragIcon} alt="delete-icon" width="16px" /> */}
            </span>
        ),
    }] : columns;

    const columnDefs = useMemo(() => columnValues, [isDraggable, columns]);

    // const columnDefs = useMemo(() => [
    //     {
    //         headerName: "S.No",
    //         field: "sl_no",
    //         sortable: false,
    //         filter: false,
    //         width: 76,
    //         flex: 0,
    //         rowDrag: true,

    //     },
    //     {
    //         headerName: "Story ID",
    //         field: "code",
    //         width: 150,
    //         sortable: true,
    //         filter: false,
    //         flex: 0,
    //     },
    //     {
    //         headerName: "Title",
    //         field: "name",
    //         sortable: true,
    //         filter: false,
    //         flex: 1,
    //     },
    //     {
    //         headerName: "Category",
    //         field: "category",
    //         sortable: true,
    //         filter: false,
    //         flex: 1,
    //     },
    //     {
    //         headerName: "Age Group",
    //         field: "age_group",
    //         sortable: true,
    //         filter: false,
    //         flex: 1,
    //     },
    //     {
    //         headerName: "Actions",
    //         field: "actions",
    //         width: 80,
    //         sortable: false,
    //         filter: false,
    //         // RowDrag: true,
    //         rowDrag: true,
    //         flex: 0,

    //         cellRenderer: (params) => (
    //             <div className="action_btn">
    //                 {/* <button onClick={() => console.log('Delete:', params.data)}> */}
    //                 <img src={DragIcon} alt="delete-icon" width="16px" />
    //                 {/* </button> */}
    //             </div>
    //         ),
    //     },
    // ], []);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: false,
        resizable: true,
        flex: 1,
    }), []);

    const gridOptions = {
        theme: 'legacy',
        pagination: true,
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 20, 50, 100],
        domLayout: 'normal',
        suppressDragLeaveHidesColumns: true,
        animateRows: true,
        // rowSelection: {
        //     type: 'multiple',
        //     suppressRowClickSelection: true
        // },
        rowModelType: 'clientSide',
        suppressPaginationPanel: false,
        suppressScrollOnNewData: true,
        suppressMovableColumns: true,
        rowDragEntireRow: false,
        rowDragManaged: false,
        rowHeight: 60,
    }

    // const gridOptions = useMemo(() => ({
    //     theme: 'legacy',
    //     pagination: true,
    //     paginationPageSize: 10,
    //     paginationPageSizeSelector: [10, 20, 50, 100],
    //     domLayout: 'normal',
    //     suppressDragLeaveHidesColumns: true,
    //     animateRows: true,
    //     // rowSelection: {
    //     //     type: 'multiple',
    //     //     suppressRowClickSelection: true
    //     // },
    //     rowModelType: 'clientSide',
    //     suppressPaginationPanel: false,
    //     suppressScrollOnNewData: true,
    //     suppressMovableColumns: true,
    //     rowDragEntireRow: isDraggable,
    //     rowDragManaged: true,
    //     rowHeight: 60,
    //     headerHeight: 44,
    // }), [isDraggable]);

    const onRowDragEnter = useCallback((e) => {
        console.log("onRowDragEnter", e);
    }, []);

    const onRowDragEnd = useCallback((e) => {
        if (e.overIndex < 0) return
        if (e.overNode.rowIndex === e.node.rowIndex) return;

        props?.handleDragEnd?.(e.node.data, e.overNode.data, e);


        let slicedData = data.slice();
        let sourceRowFilteredArray = slicedData.filter((item, index) => index !== e.node.rowIndex);
        sourceRowFilteredArray.splice(e.overIndex, 0, e.node.data);
        sourceRowFilteredArray = sourceRowFilteredArray.map((item, index) => {
            return {
                ...item,
                sl_no: slicedData[index].sl_no, // Update the serial number from original array
            };

        });
        setData?.(sourceRowFilteredArray);

        // console.log("onRowDragEnd", e);
    }, [data]);

    const onRowDragMove = useCallback((e) => {
        console.log("onRowDragMove", e);
    }, []);

    const onRowDragLeave = useCallback((e) => {
        console.log("onRowDragLeave", e);
    }, []);

    const onRowDragCancel = useCallback((e) => {
        console.log("onRowDragCancel", e);
    }, []);

    const onGridReady = (params) => {
        console.log('Grid Ready with data:', data);
        params.api.sizeColumnsToFit();
        window.addEventListener('resize', () => {
            setTimeout(() => {
                params.api.sizeColumnsToFit();
            });
        });
    };

    return (
        <TableContainer>
            <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                <AgGridReact
                    rowData={data}
                    // rowDragManaged={true}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    gridOptions={gridOptions}
                    onGridReady={onGridReady}
                    onSortChanged={(event) => {

                        let sortedColumnData = event.api.getColumnState().filter(col => col.sort);

                        if (onSort) {
                            onSort({
                                sortField: sortedColumnData[0].colId,
                                sortDirection: sortedColumnData[0].sort.toUpperCase()
                            });
                        }
                    }}
                    onPaginationChanged={(params) => {
                        if (onPageChange) {
                            onPageChange(params.api.paginationGetCurrentPage() + 1);
                        }
                        if (onRowsPerPageChange) {
                            onRowsPerPageChange(params.api.paginationGetPageSize());
                        }
                    }}
                    onRowDragEnter={onRowDragEnter}
                    onRowDragEnd={onRowDragEnd}
                    onRowDragMove={onRowDragMove}
                    onRowDragLeave={onRowDragLeave}
                    onRowDragCancel={onRowDragCancel}
                // dragAndDropImageComponent={DragIcon}
                />
            </div>
        </TableContainer>
    );
};

export default AgGridTable;