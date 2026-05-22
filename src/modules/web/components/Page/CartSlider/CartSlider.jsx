import React, { useEffect, useRef, useState } from "react"
import styles from "./CartSlider.module.css"
import remove from "../../../assets/image/svg/remove.svg"
import Layer from "../../../assets/image/svg/Layer.svg"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

const TooltipText = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollHeight > textRef.current.clientHeight ||
        textRef.current.scrollWidth > textRef.current.clientWidth
      setIsTruncated(isOverflowing)
    }
  }, [text])

  const handleMouseMove = e => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <div className={styles.tooltipContainer}>
      <p
        ref={textRef}
        className={styles.description}
        onMouseEnter={() => isTruncated && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseMove={handleMouseMove}
      >
        {text}
      </p>

      {isTruncated && showTooltip && (
        <div
          className={styles.tooltip}
          style={{
            left: `${position.x + 0}px`,
            top: `${position.y + 0}px`,
          }}
        >
          <div className={styles.tooltipContent}>
            {text}
            <div className={styles.tooltipArrow} />
          </div>
        </div>
      )}
    </div>
  )
}

const CartItem = ({
  book,
  selected,
  onToggle,
  onRemove,
  onEdit,
  onShowPreview,
}) => {
  const price = Number(book.price)
  const mrp = Number(book.mrp)
  const discount = Math.round(((mrp - price) / mrp) * 100)

  return (
    <div className={styles.itemContainer}>
      <div
        className={`${styles.customCheckbox} ${selected ? styles.checked : ""}`}
        onClick={onToggle}
      >
        {selected && <span className={styles.checkmark}>✓</span>}
      </div>

      <LazyLoadImage
        src={book.image}
        alt={book.title}
        effect="blur"
        placeholderSrc={book.image}
      />
      <div className={styles.details}>
        <div className={styles.set_text_ariaaa}>
          <h4>{book.title}</h4>
          <p
            className={`lable5 ${
              book.gender.toLowerCase() === "boy" ? "boy" : "girl"
            }`}
          >
            {book.gender.toLowerCase() === "boy" ? "Boy" : "Girl"}
          </p>
        </div>

        <TooltipText text={book.description} />
        <div className={styles.typogarpy_set}>
          <p className={styles.edite} onClick={onEdit}>
            <img src={Layer} alt="Layer" style={{ width: "19px" }} />{" "}
            <p>Edit This Story</p>
          </p>
          <div className={styles.edite}>
            <p className={styles.text_Preview} onClick={onShowPreview}>
              Show Preview
            </p>
          </div>
        </div>
      </div>

      <div className={styles.price}>
        ₹ {price}
        <div className={styles.original}>₹ {mrp}</div>
        <div className={styles.discount}>
          Save {discount}% (₹{(mrp - price).toFixed(2)})
        </div>
        <button className={styles.removeBtn} onClick={onRemove}>
          <img src={remove} alt="remove" style={{ width: "13px" }} /> Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem
