import { Checkbox, Stack, Typography } from "@mui/material"
import React, { useState, useEffect } from "react"

const ModalChekBoxWithLable = props => {
  const {
    customCheck = false,
    lableProps: {
      header,
      sub_header,
      component: lableComponent = null,
      header_styles,
    } = {},
  } = props
  const [isChecked, setIsChecked] = useState(props.isCheck || false)

  const checkBoxChangeHandle = e => {
    const { value, checked } = e.target
    if (props?.customCheck) {
      setIsChecked(checked)
    }
    props?.onChange?.(value, checked, setIsChecked)
  }
  useEffect(() => {
    setIsChecked(props?.isCheck)
  }, [props?.isCheck])

  return (
    <Stack sx={props?.containerStyles} direction="row">
      <Checkbox
        onChange={checkBoxChangeHandle}
        size="small"
        sx={{
          "&.Mui-checked": {
            color: "#65A547",
          },
        }}
        {...(props?.disabled ? { disabled: props?.disabled } : {})}
        {...(props?.token ? { value: props?.token } : {})}
        {...(props?.customCheck
          ? { checked: props?.isCheck ? props.isCheck : isChecked }
          : {})}
      />
      {props.lableProps ? (
        lableComponent == null ? (
          <Stack sx={props?.lableProps?.lable_div_styles}>
            {header && (
              <Typography
                sx={{
                  fontFamily: "var(--font-bold)",
                  color: "#000000",
                  fontSize: "14px",
                  ...props?.lableProps?.header_styles,
                }}
                id="modal-modal-title"
                variant="h6"
                component="h3"
              >
                {header}
              </Typography>
            )}
            {sub_header && (
              <Typography
                id="modal-modal-description"
                sx={{
                  fontFamily: "var(--font-regular)",
                  color: "#68686A",
                  fontSize: "13px",
                  ...props?.lableProps?.sub_header_styles,
                }}
              >
                {sub_header}
              </Typography>
            )}
          </Stack>
        ) : (
          lableComponent
        )
      ) : (
        ""
      )}
    </Stack>
  )
}

export default ModalChekBoxWithLable
