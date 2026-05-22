import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";

// images
import view_book_thumb_img from "../../website/assets/image/view-book-thumb-img.png";
import order_show_preview_ic from "../../website/assets/image/order-show-preview-ic.png";
import order_track_ic from "../../website/assets/image/order-track-ic.png";
import order_review_ic from "../../website/assets/image/order-review-ic.png";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useApiHttp from "../../web/hooks/ues-http";
import styled from "styled-components";
import MuiAlert from "@mui/material/Alert"
import { Snackbar } from "@mui/material"


const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      sx={{ color: "red" }}
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  )
})

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


const NewTicketDetail = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [showRating, setShowRating] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { requestItem } = location.state || {}
  const [requestData, setRequestData] = useState({})
  const [trackOrder, setTrackOrder] = useState([])
  const [selectedItemId, setSelectedItemId] = useState(null)

  const [openAdduser, setOpenAdduser] = useState(false)
  const [radioValue, setRadioValue] = useState(0) // 0 = unchecked, 1 = checked
  console.log("radioValue", radioValue)

  const [openAdduser2, setOpenAdduser2] = useState(false)
  const [data2, setData2] = useState({})

  const [aIMaskedfiles, setAiMaskedfiles] = useState(null)
  const [videoProductId, setVideoProductId] = useState(null)

  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const handleCloseDialog = () => setOpenAdduser2(false)
  const viewList = id => {
    sendRequest(
      {
        url: `user/order/book/preview`,
        method: "POST",
        body: {
          type: "my_orders", // summary, my_orders
          id: id, // order detail id
        },
      },
      data => {
        setData2(data?.data)

        setOpenAdduser2(true)
      }
    )
  }

  const handleOpenDialog = id => {
    viewList(id)
  }

  const listApiCAll = () => {
    sendRequest(
      {
        url: `user/service-request/view/${requestItem?.id}`,
      },
      data => {
        setRequestData(data?.data)
        const firstItemId = data?.data?.items?.[0]
        if (firstItemId) {
          setSelectedItemId(firstItemId)
        }
      }
    )
  }

  useEffect(() => {
    if (!requestItem?.id) {
      console.warn("No ID provided in this detail view")
      return
    }
    listApiCAll()
  }, [requestItem?.id])

  const getStatusLabel = status => {
    if (!status || typeof status !== "string") {
      return { text: "UNKNOWN", className: "status_lable unknown" }
    }

    switch (status.toLowerCase()) {
      case "received":
        return {
          text: "Received",
          className: "status_lable received",
        }
      case "confirmed":
        return {
          text: "Confirmed",
          className: "status_lable passed",
        }
      case "printed":
        return {
          text: "Printed",
          className: "status_lable printed",
        }
      case "shipped":
        return {
          text: "Shipped",
          className: "status_lable shipped",
        }
      case "delivered":
        return {
          text: "Delivered",
          className: "status_lable delivered",
        }
      case "cancelled":
        return {
          text: "Cancelled",
          className: "status_lable failed",
        }
      default:
        return { text: "UNKNOWN", className: "status_lable unknown" }
    }
  }

  const getStatusClass = status => {
    switch (status) {
      case "pending":
      case "new":
        return "new"

      case "in_progress":
      case "in progress":
        return "in_progress"

      case "resolved":
        return "resolved"

      case "rejected":
        return "rejected"

      default:
        return "new"
    }
  }
  return (
    <>
      <section className="new-ticket-details text-dark">
        <div className="container">

          {/* my order page */}

          <div className="new-ticket-details-cont">
            <h2 className="title-40px">My Orders</h2>
            <div className="df ac">
              <h5>{requestData?.request_number || "number"}</h5><span className={`${requestData?.status === "rejected" ? "status-badge-req-reject" : "status-badge-req-success"}`}>{requestData?.status === "in progress" ||
                (requestData?.status === "in_progress" && "In Progress")}
                {requestData?.status === "new" ||
                  (requestData?.status === "pending" && "New Ticket")}
                {requestData?.status === "rejected" && "Rejected"}
                {requestData?.status === "resolved" && "Resolved"}</span>
            </div>
            <h6>Requested on {requestData?.created_at || "date"}</h6>
            <div className="new-tick-info df as">
              <div className="pe-4">
                <span>Order ID</span>
                <p>{requestData?.order_number}</p>
              </div>
              <div className="">
                <span>Order ID</span>
                <p>{requestData?.service_request_type}</p>
              </div>
            </div>
            <h3>Detailed Description</h3>
            <p>{requestData?.description || "No description provided."}</p>
            <h4>Attachments</h4>
            <div className="ticket-attach">
              {requestData?.uploads?.length > 0 ? requestData?.uploads?.map((item, index) => {
                return (<div className="att-img">
                  <img src={item} alt="" key={index}
                    draggable={false}
                    onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />

                </div>)
              }) : <p className="text-primary">No attachments provided.</p>}
            </div>
            {/* <div className="btn-pur">
              <button>Chat now (need to change in api)</button>
            </div> */}

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default NewTicketDetail;
