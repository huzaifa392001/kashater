import React, { useEffect, useState } from "react";
import classes from "./MySubscriptions.module.css";
import { Box, CircularProgress, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import cardIcon from "../../assets/image/svg/card(payment).svg";
import CustomButton from "../../components/UI/Button/Button";
import SubscriptionPlanCard from "../../components/UI/SubscriptionPlanCard/SubscriptionPlanCard";
import useApiHttp from "../../hooks/ues-http";
import loadRazorpayScript from "../../utils/razorpay";
import Swal from "sweetalert2";

const AutoRenewalSwitch = styled((props) => (
  <Switch
    size="small"
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 12,
    height: 12,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

const MySubscriptions = () => {
  const { isLoading, error, sendRequest } = useApiHttp();
  const [loading, setLoading] = useState(false);
  const [subData, setSubData] = useState([]);

  const [currentSubData, setCurrentSubData] = useState(null);

  const autoRenewalSwitchChange = (e) => {
    console.log(e.target.checked);
  };

  useEffect(() => {
    sendRequest({ url: "user/home/current-subscription" }, (response) => {
      setCurrentSubData(response.data);
    });
    sendRequest({ url: "user/home/subscription-plan-list-all" }, (response) => {
      setSubData(response.data);
    });
  }, []);

  const upgradePlanAction = () => {};

  const cancelSubscriptionAction = () => {};

  const handlePlanChangeAction = async (id) => {
    setLoading(true);
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const formData = new FormData();
    formData.append("id", id);

    sendRequest(
      { url: "user/home/generate-id", body: formData, method: "POST" },
      (response) => {
        const { amount, id, key, plan_id } = response.data;
        const currency = "INR";
        if (!id) {
          alert("Failed to create order ID");
          return;
        }
        const options = {
          key: key, // Replace with your Razorpay key
          amount: amount * 100, // Amount in paise
          currency: currency,
          name: "Kadhaster Books",
          description: "User Subscription",
          // image: "/logo192.png", // Optional: your logo
          order_id: id,
          handler: function (response) {
            // Step 3: Place Order on Success
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;
            sendRequest(
              {
                url: `user/home/user-subscription`,
                method: "post",
                body: {
                  order_id: razorpay_order_id,
                  payment_id: razorpay_payment_id,
                  signature_id: razorpay_signature,
                  id: plan_id,
                },
              },
              (placeData) => {
                console.log("Order Placed:", placeData);
                // dispatch(countApi());
                // navigate("/user/ordersuccess", {
                //   state: {
                //     orderDetails: placeData?.data,
                //   },
                // });
                //  localStorage.removeItem("Gift")
                sendRequest(
                  { url: "user/home/current-subscription" },
                  (response) => {
                    setCurrentSubData(response.data);

                    Swal.fire({
                      title: "Subscription plan purchased successfully",

                      icon: "success",
                      background: "#373737",
                      customClass: {
                        popup: "my-swal-popup",
                      },
                      confirmButtonColor: "#3085d6",

                      confirmButtonText: "ok",
                    });
                  }
                );
              }
            );
          },

          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      },
      (err) => {
        if (err.code === 405) {
          Swal.fire({
            title: "Plan Change Not Allowed",
            text: "You’re currently on a higher subscription plan. Downgrading to a lower plan isn’t available right now. Please continue enjoying your current benefits.",
            // icon: "warning",
            icon: "error",
            background: "#373737",
            customClass: {
              popup: "my-swal-popup",
            },
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          });
        }
      }
    ).finally(() => {
      setLoading(false);
      // console.log(error);
    });
  };
  const planBenefits = [
    "1 Book",
    "2 Book",
    "3 Book",

    "1 Book",
    "2 Book",
    "3 Book",
  ];
  const isMobile = window.innerWidth < 600;
  return (
    <div className={classes.container}>
      {(isLoading || loading) && (
        <section
          style={{
            width: "100%",
            display: "grid",
            placeItems: "center",
            height: "100%",
            position: "fixed",
            zIndex: "1400",
            top: "0",
            left: "0",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <CircularProgress color="secondary" size="5rem" />
        </section>
      )}
      {/* <div className={classes.breadcrumb}>
        <span onClick={() => navigate("/")}>Our Products</span> &gt;{" "}
        <span className={classes.active}>Browse our products</span>
      </div> */}

      <h1 className={classes.heading}>My Subscription</h1>
      <h3 className={classes.sub_heading}>Manage your plan and payments</h3>
      {currentSubData && (
        <Box
          component="section"
          className={classes.currentPlanContainer}
          style={
            isMobile
              ? { paddingBottom: `${160 + currentSubData?.length * 25}px` }
              : {}
          }
        >
          <p>Current Plan</p>
          <div style={{ marginTop: "60px", display: "flex" }}>
            <div style={{ width: "40%" }}>
              <div>
                <span className={classes.subscriptionType}>
                  {currentSubData.name}
                </span>
                <p className={classes.subscriptionTimeline}>
                  {currentSubData.validity_period}
                </p>
              </div>
              <div className={classes.planBenefits}>
                <h6 className={classes.fieldHeader}>Plan Benefits:</h6>
                <ul>
                  {currentSubData?.benefits?.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </div>
              {/* <div className={classes.autoRenewal}>
                <div className={classes.switchSection}>
                  <h6 className={classes.fieldHeader}>Auto Renewal</h6>
                  <AutoRenewalSwitch
                    checked={currentSubData.auto_renew}
                    onChange={autoRenewalSwitchChange}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                </div>
                <p>{currentSubData.renew_desc}</p>
              </div> */}
            </div>
            <div className={classes.paymentDetails}>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <img
                      style={{ verticalAlign: "middle", marginRight: "4px" }}
                      src={cardIcon}
                      alt="card"
                    />
                    <span className={classes.fieldHeader}>Payment Details</span>
                    <p className={classes.paymentMethodText}>
                      {currentSubData.payment_details}
                    </p>
                  </div>
                  <div>
                    <p className={classes.paymentAmt}>{currentSubData.price}</p>
                    <span className={classes.gstText}> (Including GST)</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className={classes.nextPaymentDate}>
                  <span>Your subscription will expire on </span>
                  <p>{currentSubData.next_payment}</p>
                </div>
                {/* <div className={classes.btnSection}>
                  <CustomButton
                    variant="contained"
                    customColor="#131313"
                    custmstyle={{
                      // padding: "10px 15px",
                      position: "relative",
                      background: `
              linear-gradient(180deg, #fff47a 0%, #ffd500 50%, #f2c200 100%),
              radial-gradient(ellipse at center bottom, #fff 15%, transparent 60%)
            `,
                      backgroundBlendMode: "screen",
                      color: "#1a1a1a",
                      fontWeight: 600,
                      fontSize: "16px",
                      border: "none",
                      borderRadius: "24px",
                      padding: "8px 24px",
                      width: "190px",
                      height: "40px",
                      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    onClick={() => upgradePlanAction()}
                  >
                    Upgrade Plan
                  </CustomButton>
                  <div style={{ marginTop: "10px" }}>
                    <button
                      className={classes.outlineButton}
                      onClick={() => cancelSubscriptionAction()}
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </Box>
      )}
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Upgrade Plan Now
      </h3>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Where Love Meets Imagination – Subscribe Today!
      </h1>
      <p
        style={{ textAlign: "center", fontSize: "18px", marginBottom: "20px" }}
      >
        Turn screen time into story time – personalized, educational, and fun...
      </p>
      <Box component="section" className={classes.planListSection}>
        {subData?.map((item) => {
          return (
            <SubscriptionPlanCard
              key={item.id}
              data={item}
              handlePlanAction={handlePlanChangeAction}
            />
          );
        })}

        {/* <SubscriptionPlanCard handlePlanAction={handlePlanChangeAction} />
        <SubscriptionPlanCard handlePlanAction={handlePlanChangeAction} /> */}
      </Box>
    </div>
  );
};

export default MySubscriptions;
