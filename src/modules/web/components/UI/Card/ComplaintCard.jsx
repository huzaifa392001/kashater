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
  border-radius: 15px;
  min-width: 100px;

  &.in_progress {
    background: linear-gradient(
      to right,
      rgba(255, 204, 101, 1),
      rgba(152, 99, 7, 1)
    );
  }

  &.new {
    background: linear-gradient(
      to right,
      rgba(102, 229, 255, 1),
      rgba(61, 138, 153, 1)
    );
  }

  &.resolved {
    background: linear-gradient(
      to right,
      rgba(53, 221, 151, 1),
      rgba(29, 119, 81, 1)
    );
  }

  &.rejected {
    background: linear-gradient(
      to right,
      rgba(255, 101, 103, 1),
      rgba(152, 7, 7, 1)
    );
  }
`

export default function ComplaintCard(props) {
  const {
    status = "new",
    compDate = "",
    compId = "",
    attachment_url,
    token,
    item = {},
  } = props
  const statusClass = status === "in progress" ? "in_progress" : status

  const navigate = useNavigate()

  const isPdf = url => {
    return url?.toLowerCase()?.endsWith(".pdf")
  }

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 400,
          borderRadius: "8px",
          border: "1px solid #666",
          opacity: "1",
          backgroundColor: "black",
          color: " rgba(242, 242, 242, 1)",
        }}
      >
        <CardContent sx={{ paddingBottom: 0.5 }}>
          <div style={{ display: "flex", gap: "3rem" }}>
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

            {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
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
                  color: "#ffffffab",
                  fontSize: "12px !important",
                  fontFamily: "merriweather",
                  mb: 0.6,
                }}
              >
                Complaint raised on {compDate}
              </Typography>
            </div>
            <StatusWidgetLable class={statusClass}>
              {status === "in progress" ||
                (status === "in_progress" && "In Progress")}
              {status === "new" && "New Ticket"}
              {status === "rejected" && "Rejected"}
              {status === "resolved" && "Resolved"}
            </StatusWidgetLable>
            {/* </div> */}
          </div>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-end",
              marginTop: "20px",
            }}
          >
            <div>
              <Typography
                gutterBottom
                sx={{
                  color: "#ffffffab",
                  fontSize: "12px !important",
                  fontFamily: "merriweather",
                  mb: 0.6,
                }}
              >
                Order ID
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: 14, fontFamily: "var(--font-semibold)" }}
                component="div"
              >
                {item?.order_number}
              </Typography>
            </div>

            <div>
              <Typography
                gutterBottom
                sx={{
                  color: "#ffffffab",
                  fontSize: "12px !important",
                  fontFamily: "merriweather",
                  mb: 0.6,
                }}
              >
                Category
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: 14, fontFamily: "var(--font-semibold)" }}
                component="div"
              >
                {item?.service_request_type}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "var(--font-semibold)",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "163%",
                  letterSpacing: "0%",
                  textDecoration: "underline",
                  textDecorationStyle: "solid",
                  textDecorationOffset: "0%",
                  textDecorationThickness: "0%",
                  textDecorationSkipInk: "auto",
                  color: "#fe9b29",
                  cursor: "pointer",
                }}
                component="div"
                onClick={() => {
                  navigate("/user/view_request", {
                    state: {
                      requestItem: item, // Your actual ID
                    },
                  })
                }}
              >
                View Details
              </Typography>
            </div>
          </div>
        </CardContent>

        {/* <CardActions sx={{ justifyContent: "center" }}>
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
        </CardActions> */}
      </Card>
    </>
  )
}
