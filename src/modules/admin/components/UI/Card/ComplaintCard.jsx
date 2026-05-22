import * as React from "react"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const StatusWidgetLable = styled.div.attrs(props => ({
  className: props.class,
}))`
  display: inline-block;
  margin-bottom: 10px;
  height: 24px;
  font-family: var(--font-bold);
  line-height: 14px;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 2px;
`

export default function ComplaintCard(props) {
  const {
    status = "Closed",
    compDate = "05-Sep-2024",
    compId = "PO24853",
    attachment_url,
    token,
  } = props
  const statusClass =
    status === 0
      ? "status_widget_beige"
      : status === 2
      ? "status_widget_purple"
      : "status_widget_green"

  const navigator = useNavigate()

  const isPdf = url => {
    return url?.toLowerCase()?.endsWith(".pdf")
  }

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 343,
          borderRadius: "8px",
          border: "1px solid rgba(242, 242, 242, 1)",
          opacity: "1",
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
      >
        <CardContent sx={{ paddingBottom: 0.5 }}>
          <div style={{ display: "flex", gap: ".5rem" }}>
            {attachment_url && (
              <>
                {isPdf(attachment_url) ? (
                  ""
                ) : (
                  <img
                    src={attachment_url}
                    alt="log"
                    style={{ width: "50px", height: "60px" }}
                  />
                )}
              </>
            )}

            <div>
              <Typography
                variant="h6"
                sx={{ fontSize: 16, fontFamily: "var(--font-semibold)" }}
                component="div"
              >
                {compId}
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  color: "text.secondary",
                  fontSize: 12,
                  fontFamily: "var(--font-regular)",
                  mb: 0.6,
                }}
              >
                Complaint raised on {compDate}
              </Typography>
              <StatusWidgetLable class={statusClass}>
                {status === 0 && "Sent"}
                {status === 1 && "Yet to be picked"}
                {status === 2 && "Under Investigation"}
                {status === 3 && "Resolved"}
              </StatusWidgetLable>
            </div>
          </div>
          <Typography
            sx={{ border: "1px solid #EBEBEB", marginTop: "8px" }}
            component="div"
          ></Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size="small"
            onClick={() => {
              navigator(`/view_complaint/${token}`)
            }}
            sx={{
              color: "var(--primary-blue)",
              fontFamily: "var(--font-semibold)",
              fontSize: 14,
              textTransform: "capitalize",
            }}
          >
            View Complaint
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
