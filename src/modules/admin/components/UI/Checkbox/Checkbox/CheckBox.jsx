import React from 'react'
import classes from './CheckBox.module.css'
const CheckBox = ({ checked, onChange, label }) => {
    return (
        <label className={classes.container}>{label}
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className={classes.checkmark}></span>
        </label>
    )
}

export default CheckBox
