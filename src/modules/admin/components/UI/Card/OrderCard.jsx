import * as React from "react"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import TickIcon from "../svgComponents/TickIcon"
import PendingIcon from "../svgComponents/pendingIcon"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import ComplaintModal from "../../../features/RaiseComplaint/Modal/ComplaintModal"

export default function OrderCard(props) {
  const {
    status = "Delivered",
    etd = "05-Sep-2024",
    customStyle,
    data,
    id,
    items,
    rate,
    type,
    order_date,
    resetAllData,
  } = props
  const tickColour =
    status === "Order Acknowledged"
      ? "var(--status-magenta)"
      : status === "Completed"
      ? "var(--status-cyan)"
      : status === "Partially Dispatched"
      ? "var(--status-greenbrown)"
      : "var(--status-green)"

  const navigator = useNavigate()
  const [open, setOpen] = useState(false)
  const [orderId, setOrderId] = useState("")
  const handleOpen = id => {
    setOrderId(id)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const onConfirm = () => {
    setOpen(false) // Close the modal after confirming
    if (resetAllData) {
      resetAllData()
    }
  }

  return (
    <>
      {/* <UICard>xczsc</UICard> */}
      <Card
        sx={{
          boxShadow: "var(--box-shadow)",
          borderRadius: "8px",
          border: "1px solid rgba(242, 242, 242, 1)",
          opacity: "1",
          backgroundColor: "rgba(255, 255, 255, 1)",
          ...customStyle,
        }}
      >
        <CardContent sx={{ padding: "14px" }}>
          <Typography
            variant="h6"
            sx={{ fontSize: 16, fontFamily: "var(--font-semibold)" }}
            component="div"
          >
            {id}
          </Typography>
          <Typography
            gutterBottom
            sx={{
              color: "text.secondary",
              fontSize: 13,
              fontFamily: "var(--font-regular)",
              letterSpacing: "-0.18571428954601288",
              marginBottom: "0.5rem",
            }}
          >
            Ordered on {order_date}
          </Typography>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontFamily: "var(--font-semibold)",
                  fontSize: 12,
                  transform: "uppercase",
                }}
              >
                SUMMARY
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "var(--font-regular)",
                  fontSize: 16,
                  letterSpacing: "-0.22857142984867096",
                }}
              >
                <span
                  style={{
                    color: "#000000",
                    fontWeight: "600",
                    fontFamily: "var(--font-semibold)",
                  }}
                >
                  {items} items
                </span>
              </Typography>
            </div>
            {data?.vertical && (
              <div>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontFamily: "var(--font-semibold)",
                    fontSize: 12,
                    transform: "uppercase",
                  }}
                >
                  VERTICAL
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "var(--font-regular)",
                    fontSize: 16,
                    letterSpacing: "-0.22857142984867096",
                  }}
                >
                  <span
                    style={{
                      color: "#000000",
                      fontWeight: "600",
                      fontFamily: "var(--font-semibold)",
                    }}
                  >
                    {data?.vertical}
                  </span>
                </Typography>
              </div>
            )}
          </div>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "var(--font-regular)",
              fontSize: 16,
              mb: 1,
              letterSpacing: "-0.22857142984867096",
            }}
          >
            {"worth"}{" "}
            <span
              style={{
                color: "#000000",
                fontWeight: "600",
                fontFamily: "var(--font-semibold)",
              }}
            >
              Rs.{rate.toLocaleString("en-IN")}
            </span>
          </Typography>

          <Typography
            sx={{ borderBottom: "1px solid var(--light-outline)" }}
            component="div"
          ></Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "14px",
            paddingTop: "0px",
          }}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            component="div"
          >
            {status === "Pending" ? (
              <PendingIcon />
            ) : (
              <TickIcon colour={tickColour} />
            )}
            <Typography
              sx={{
                color: "var(--text-color-dark)",
                fontFamily: "var(--font-semibold)",
                fontSize: 12,
              }}
            >
              {status}
            </Typography>
          </Typography>
          {type === "recent_order" &&
            status === "Completed" &&
            props?.page === "home" &&
            props?.data?.raise_complaint_status === 0 && (
              <Button
                size="small"
                onClick={() => {
                  handleOpen(id)
                }}
                sx={{
                  color: "var(--primary-blue)",
                  fontFamily: "var(--font-semibold)",
                  fontSize: "14px",
                  textTransform: "capitalize",
                }}
              >
                Raise Complaint
              </Button>
            )}
          <div style={{ display: "flex", gap: "5px" }}>
            <Button
              size="small"
              onClick={() => {
                if (props?.cta) {
                  props?.cta()
                }
              }}
              sx={{
                color: "var(--primary-blue)",
                fontFamily: "var(--font-semibold)",
                fontSize: "14px",
                textTransform: "capitalize",
              }}
            >
              Repeat Order
            </Button>
            <Button
              size="small"
              onClick={() => {
                navigator(`/view_my_order/${data?.token}`)
              }}
              sx={{
                color: "var(--primary-blue)",
                fontFamily: "var(--font-semibold)",
                fontSize: "14px",
                textTransform: "capitalize",
              }}
            >
              Track Order
            </Button>
          </div>
        </CardActions>
      </Card>

      {open && (
        <ComplaintModal
          open={open}
          onConfirm={onConfirm}
          handleClose={handleClose}
          po_number={orderId}
        />
      )}
    </>
  )
}
