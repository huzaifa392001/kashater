import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../web/hooks/useIsMobile";
import useApiHttp from "../../web/hooks/ues-http";
import styled from "styled-components";


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
  text-align: center;

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



const MyRequestPage = () => {
    const navigate = useNavigate()
    const ismMobile = useIsMobile(768)
    const isMobile = useIsMobile(500)

    const [openRequestModal, setOpenRequestModal] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [orderIdList, setorderIdList] = useState([])
    const [selectedOrderID, setSelectedOrderID] = useState([])
    const [searchOrderID, setsearchOrderID] = useState("")
    const [serviceRequestTypes, setServiceRequestTypes] = useState([])
    const [searchVlue, setSearchVlue] = useState("")
    const [formDatas, setFormDatas] = useState({
        orderId: "",
        category: "",
        description: "",
        attachments: [],
    })

    // open and closed list variables
    const [closedRequests, setclosedRequests] = useState({
        total: 0,
        data: [
            //   {
            //   "id": "01jwr734zk0nm9xc0w10qa2h23",
            //   "request_number": "RID#2784410476",
            //   "order_number": "ORD#5369043",
            //   "service_request_type": "Quality Issues",
            //   "status": "rejected", // resolved,rejected
            //   "created_at": "02 Jun 2025"
            // }
        ],
    })
    const [openRequestList, setOpenRequestList] = useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    //api requests
    //api for raising a request
    const { sendRequest: searchableOrderID } = useApiHttp()
    const { sendRequest: getRequestTypes } = useApiHttp()
    const { isLoading: createRequestLoader, sendRequest: createRequest } =
        useApiHttp()

    //api for open requests
    const { sendRequest: getOpenRequests } = useApiHttp()

    //api for closed requests
    const { sendRequest: getClosedRequests } = useApiHttp()

    // methods

    // Methods for raising a request
    const handleCloseRaiseRequestModal = () => {
        setOpenRequestModal(false)
    }

    const handleCancelRaiseRequestModal = () => {
        handleCloseRaiseRequestModal()
        setFormDatas({
            orderId: "",
            category: "",
            description: "",
            attachments: [],
        })
        setsearchOrderID("") // Clear the search input
        setSelectedOrderID([]) // Clear the selected order ID
        setorderIdList([]) // Clear the order ID list
        setSnackbarMessage("") // Clear the snackbar message
        setOpenSnackbar(false) // Close the snackbar if it was open
    }

    const handleFormDataChange = (field, value) => {
        setFormDatas(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSelectionChange = (event, newValue) => {
        setSelectedOrderID(newValue)
        handleFormDataChange("orderId", newValue?.id || "") // Update formDatas with the selected order ID
    }

    const handleThumbnailChange = (index, fileData) => {
        if (!fileData) {
            setFormDatas(prev => {
                const newAttachments = [...prev.attachments]
                newAttachments[index] = undefined
                return {
                    ...prev,
                    attachments: newAttachments,
                }
            })
            return
        }
        const { file, preview } = fileData

        setFormDatas(prev => {
            const newAttachments = [...prev.attachments]
            newAttachments[index] = file
            return {
                ...prev,
                attachments: newAttachments,
            }
        })
    }

    const handleRequestSubmit = () => {
        if (!formDatas.orderId || !formDatas.category || !formDatas.description) {
            handleOpenSnackbar("Please fill in all required fields.")
            return
        } // Check if at least one attachment is provided
        // if (formDatas.attachments.length === 0) {
        //   handleOpenSnackbar("Please upload at least one attachment.");
        //   return;
        // }
        // Check if the selected order ID is valid
        if (!selectedOrderID || !selectedOrderID.id) {
            handleOpenSnackbar("Please select a valid Order ID.")
            return
        } // Check if the selected category is valid

        const formData = new FormData()
        // if (formDatas.attachments.length > 0) {
        let filteredAttachments = formDatas.attachments.filter(
            file => file instanceof File && file.size > 0
        )
        filteredAttachments.forEach((file, index) => {
            formData.append(`files[]`, file)
            // formData.append(`tags[${index}][id]`, null)
        })
        formData.append("order_id", formDatas.orderId)
        formData.append("request_type_id", formDatas.category)
        formData.append("description", formDatas.description)

        createRequest(
            {
                url: "user/service-request/create",
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data", // Add proper header
                },
            },
            data => {
                // console.log("Success:", data)
                handleCancelRaiseRequestModal()
                CustomSwal.successIcon(
                    { title: "Created!", text: data.message },
                    fetchOpenRequests
                )
            }
        )

        // }
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
        setSnackbarMessage("")
    }
    const handleOpenSnackbar = message => {
        setSnackbarMessage(message)
        setOpenSnackbar(true)
    }

    // methods for open and closed requests
    const fetchOpenRequests = () => {
        getOpenRequests(
            {
                url: `user/service-request/list/open`,
                method: "POST",
                body: {
                    page: 1,
                    per_page: 5,
                    search: "",
                },
            },
            response => {
                setOpenRequestList(response?.data?.data || [])
                // Handle the response data as needed
            }
        )
    }

    const fetchClosedRequests = () => {
        getClosedRequests(
            {
                url: `user/service-request/list/closed`,
                method: "POST",
                body: {
                    page: page + 1,
                    per_page: rowsPerPage,
                    search: searchVlue || "",
                },
            },
            response => {
                setclosedRequests({
                    total: response?.data?.total || 0,
                    data: response?.data?.data || [],
                })
                // Handle the response data as needed
            }
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // Effects

    useEffect(() => {
        if (!searchOrderID || searchOrderID.trim().length < 3) return // Prevent API call if searchOrderID is empty
        searchableOrderID(
            {
                url: `user/drop-down/searchable/order-ids`,
                method: "POST",
                body: {
                    order: searchOrderID,
                },
            },
            response => {
                setorderIdList(
                    response.data.map(item => ({
                        id: item.id,
                        name: item.order_number,
                    }))
                )
                // setSelectedOrderID(response.data[0] || null); // Set the first item as selected if available
                // Handle the response data as needed
                // For example, you can set it to a state variable to use in your component
                // setSearchableOrderIDs(response.data);
            }
        )
        // fetchclosedRequests();
    }, [searchOrderID])

    useEffect(() => {
        getRequestTypes(
            {
                url: `user/drop-down/service-request-types`,
            },
            response => {
                setServiceRequestTypes(response?.data || [])
                // Handle the response data as needed
            }
        )

        fetchOpenRequests()

        // return () => {
        //   second
        // }
    }, [])

    useEffect(() => {
        fetchClosedRequests()
    }, [searchVlue])

    return (
        <div id="my_requests_tab" className="my-request-tab text-dark">
            <div className="my-request-info">
                <h4>Open Requests</h4>
                <h6>{openRequestList.length || 0} Requests</h6>
            </div>
            <div className="df f-w">
                {openRequestList.map((request, index) => {
                    let statusName = request?.status === "pending" ? "new" : request?.status
                    return (<div className="col-lg-4 col-12 mt-4 pe-md-4 pe-0" key={index}>
                        <div className="my-request-card ">
                            <div className="df ac j-sb">
                                <div className="request-id">
                                    <h4>{request?.request_number}</h4>
                                    <p>Requested on {request?.created_at}</p>
                                </div>
                                <span className={`${statusName === "in progress" ||
                                    statusName === "in_progress" ? "status-badge" : "status-badge-green"}`}>{statusName === "in progress" ||
                                        (statusName === "in_progress" && "In Progress")}
                                    {statusName === "new" && "New Ticket"}
                                    {statusName === "rejected" && "Rejected"}
                                    {statusName === "resolved" && "Resolved"}</span>
                            </div>
                            <div className="view-tkt-info">
                                <div className="df ae">
                                    <div className="col-4 pe-2 mt-4">
                                        <span>Order ID</span>
                                        <h4>{request?.order_number}</h4>
                                    </div>
                                    <div className="col-4 pe-2 mt-4">
                                        <span>Category</span>
                                        <h4>{request?.service_request_type}</h4>
                                    </div>
                                    <div className="col-4 view-tkt-btn text-end mt-4">
                                        <span className="" onClick={() => {
                                            navigate("/user/view_request", {
                                                state: {
                                                    requestItem: request, // Your actual ID
                                                },
                                            })
                                        }}>View Ticket</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
            <div className="my-request-info mt-4">
                <h4>Closed Requests</h4>
                <h6>Items ({closedRequests?.total || 0})</h6>
            </div>

            <div className="my-request-table mt-4">
                <table>
                    <tr className="request-th">
                        <th>Request ID</th>
                        <th>Order ID</th>
                        <th>Category</th>
                        <th>Requested Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    {closedRequests?.data.length > 0 ?
                        closedRequests?.data?.map((product, ind) => {
                            return (<tr className="request-tr" key={ind}>
                                <td className="req-id">{product?.request_number}</td>
                                <td>{product?.order_number}</td>
                                <td>{product?.service_request_type}</td>
                                <td>{product?.created_at}</td>
                                <td><span className={`${product?.status === "rejected" ? "status-badge-req-reject" : "status-badge-req-success"}`}>
                                    {product?.status === "in progress" && "In Progress"}
                                    {product?.status === "new" && "New Ticket"}
                                    {product?.status === "rejected" && "Rejected"}
                                    {product?.status === "resolved" && "Resolved"}</span></td>
                                <td>
                                    <div onClick={() => {
                                        // Handle view details click
                                        // You can implement a function to show more details about the request
                                        navigate("/user/view_request", {
                                            state: {
                                                requestItem: product, // Your actual ID
                                            },
                                        })
                                    }} role="button" className="view-tkt-btn"><span > View details</span></div></td>
                            </tr>)
                        }) : <div
                            style={{ textAlign: "center", padding: "20px", width: "100%" }}
                        >
                            <p>No requests found.</p>
                        </div>}
                </table>
            </div>
        </div>
    )
}

export default MyRequestPage