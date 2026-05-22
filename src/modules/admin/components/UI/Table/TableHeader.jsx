import React from 'react'
import classes from './Table.module.css'
const TableHeader = (props) => {
    return (
        <div className={classes.table_header}>
            <p className={classes.table_heder_text}>{props.tableheader}</p>
            <p className={classes.table_total_users}>{props.totalusers}</p>
        </div >
    )
}

export default TableHeader