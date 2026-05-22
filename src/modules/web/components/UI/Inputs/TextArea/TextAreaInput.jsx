import * as React from "react"
import classes from "./Textarea.module.css"

export default function MuiTextarea(props) {
  const [lengthPerText, setLengthPerText] = React.useState(
    `0/${props?.maxLength}`
  )

  const handleOnChange = e => {
    // Pass the event to the parent onChange handler, so the parent can access the value
    if (props?.onChange) props.onChange(e)

    if (props?.maxLength) {
      let currentValLength = e.target.value.length
      let maxLength = Number(props.maxLength)
      const charLength = Math.min(maxLength, currentValLength)
      setLengthPerText(`${charLength}/${maxLength}`)
    }
  }

  return (
    <div className={classes.textarea_box} style={props?.sx}>
      <label htmlFor="textarea">{props.label}</label>
      <textarea
        maxLength={props.maxLength}
        placeholder={props.placeholder || "Type Message..."}
        name={props.name}
        value={props.value}
        onChange={handleOnChange} // Forward the event to handleOnChange
        rows={props.rows || 8}
        cols={props.columns || 10}
      />
      {props.maxLength && (
        <p className={classes.textalign_end}>{`${lengthPerText}`}</p>
      )}
    </div>
  )
}
