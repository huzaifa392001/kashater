import * as React from "react"
import classes from "./TextareaWhite.module.css"
export default function MinHeightTextareaWhite(props) {
  return (
    <div
      className={`${classes.textarea_box} ${props.error ? classes.error : ""} `}
    >
      {/* <label htmlFor="">{props.label}</label> */}
      <textarea
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        rows={props.rows}
        cols={40}
        style={props.style}
        disabled={props.disabled}
        {...props}
      />
      {props.showpertext && (
        <p className={classes.texalign_end}>{`${props.showpertext}`}</p>
      )}
      {props.error && props.errorMessage && (
        <p
          style={{
            // color: "#d32f2f",
            color: "#000",
            fontFamily: "var(--font-regular-Quicksand)",
            fontSize: "12px",
          }}
        >
          {props.errorMessage}
        </p>
      )}
    </div>
  )
}
