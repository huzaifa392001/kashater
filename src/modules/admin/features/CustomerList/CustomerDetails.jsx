import React, { useEffect, useState } from "react"
import classes from "./CustomerDetails.module.css"
import Manage from "../../assets/image/svg/UserList.svg"
import CustomButton from "../../components/UI/Button/Button"
import { useNavigate, useLocation } from "react-router-dom"
import book from "../../assets/image/jpg/dummy image 3.png"
import play from "../../assets/image/svg/play(small).svg"
import profile from "../../assets/image/svg/profile(grey).svg"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import TabBar from "../../components/UI/Tabs/Tabs"
import Rewards from "./Rewards"
import SubscriptionDetails from "./SubscriptionDetails"

export default function CustomerDetails() {
  const location = useLocation()
  const { customerId, code } = location.state || {}
  console.log("customerId", customerId)
  const navigate = useNavigate()

  const [booksData, setBooksData] = useState()
  console.log("booksData", booksData)

  const [activeTab, setActiveTab] = useState(0)

  const onTabClick = index => {
    setActiveTab(index) // Update the active tab index
  }

  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const handlerEditStory = () => {
    navigate("/admin/storylists/upload-story", {
      state: { type: "edit" },
    })
  }
  const handlerDeleteStory = () => {
    // navigate("/admin/storylists/upload-story")
    Swal.fire({
      title: "Are you sure?",
      text: `You will be ${booksData?.status === "active" ? "block" : "unblock"
        } this account.`,
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${booksData?.status === "active" ? "Block" : "Unblock"
        }`,
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        sendRequest(
          {
            url: `admin/manage-customer/update-status/${customerId}`,
          },
          data => {
            sendRequest(
              {
                url: `admin/manage-customer/view/${customerId}`,
              },
              data => {
                setBooksData(data?.data)
              }
            )
          }
        )
      }
    })
  }
  useEffect(() => {
    sendRequest(
      {
        url: `admin/manage-customer/view/${customerId}`,
      },
      data => {
        setBooksData(data?.data)
      }
    )
  }, [])
  return (
    <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
      <div className={classes.breadcrumb}>
        <span
          style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
          onClick={() => navigate(-1)}
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src={Manage}
            alt="Manage"
          />{" "}
          Customer List
        </span>{" "}
        &gt; <span className={classes.active}>{code}</span>
      </div>

      <div className={classes.header_table}>
        <div className={classes.header_set}>
          <div className={classes.header_left}>
            <h3>{booksData?.name}</h3>
            <p>{code}</p>
          </div>
        </div>

        <div className={classes.header_right}>
          <div className={classes.header_profile}>
            <div>
              <img src={profile} alt={booksData?.personal_details?.name} />
            </div>
            <div className={classes._profile_deils_set}>
              <div className={classes._profile_deils}>
                <h3>{booksData?.personal_details?.name}</h3>
                <p
                  className={`lables ${booksData?.status === "active" ? "Active" : "Blocked"
                    }`}
                >
                  {booksData?.status === "active" ? "Active" : "Blocked"}
                </p>
              </div>
              <p>{`${booksData?.personal_details?.email} | ${booksData?.personal_details?.phone_number}`}</p>
            </div>
          </div>

          <CustomButton
            variant="contained"
            customColor="#ffffff"
            customBgColor="#f31d1d"
            custmstyle={{
              padding: "5px 20px",
              //   width: "131px",
              fontSize: "14px",
              borderRadius: "8px",
            }}
            onClick={() => handlerDeleteStory()}
          >
            {booksData?.status === "active"
              ? "Block Account"
              : "Unblock Account"}
          </CustomButton>
        </div>

        <div className={classes.main}>
          <div className={classes.main_box_set}>
            <div className={classes.main_box_header}>
              <h3>{booksData?.order_details?.total_orders}</h3>
              <p>Total Orders</p>
            </div>
            <div className={classes.main_box_header}>
              <h3>{booksData?.order_details?.last_order_date || "-"}</h3>
              <p>Last Order Date</p>
            </div>
            <div className={classes.main_box_header}>
              <h3>{booksData?.order_details?.average_order_value}</h3>
              <p>Average Order Value</p>
            </div>
          </div>
        </div>
        <TabBar
          tabs={[
            {
              title: "Personal Details",
              render: () => (
                <>
                  <p className={classes.Details}>Personal Details</p>
                  <div className={classes.main} style={{ margin: "0px" }}>
                    <div className={classes.Details_set}>
                      <div className={classes.Details_set_header}>
                        <p>Full Name</p>
                        <h3>{booksData?.personal_details?.name}</h3>
                      </div>
                      <div className={classes.Details_set_header}>
                        <p>Email Address</p>
                        <h3>{booksData?.personal_details?.email}</h3>
                      </div>
                      <div className={classes.Details_set_header}>
                        <p>Mobile Number</p>
                        <h3>{booksData?.personal_details?.phone_number}</h3>
                      </div>
                      <div className={classes.Details_set_header}>
                        <p>Registration Date</p>
                        <h3>{booksData?.personal_details?.registered_date}</h3>
                      </div>
                    </div>
                  </div>
                </>
              ),
            },
            // {
            //   title: "Subscription Details",
            //   render: () => <SubscriptionDetails customerId={customerId} />,
            // },
            {
              title: "Rewards Details",
              render: () => <Rewards customerId={customerId} />,
            },
          ]}
          onTabClick={onTabClick}
          activeTab={activeTab}
        />
      </div>
    </div>
  )
}
