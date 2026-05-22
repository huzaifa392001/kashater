import styles from "./CustomRadio.module.css" // Adjust import based on your structure

const CustomRadio = ({ selected, onToggle }) => {
  return (
    <div
      className={`${styles.customRadio} ${
        selected ? styles.radioSelected : ""
      }`}
      onClick={onToggle}
    >
      {selected && <div className={styles.radioDot} />}
    </div>
  )
}

export default CustomRadio
