import React from "react"
import styles from "./CustomCheckbox.module.css"

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <div
      className={`${styles.checkbox} ${checked ? styles.checked : ""}`}
      onClick={onChange}
    >
      {checked && <span className={styles.checkmark}>✓</span>}
    </div>
  )
}

export default CustomCheckbox
