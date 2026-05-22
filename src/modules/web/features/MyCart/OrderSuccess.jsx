import React, { useState } from "react"
import styles from "./OrderSuccess.module.css"
import cardIcon from "../../assets/image/svg/card(payment).svg" // use your own icon pathorder success
import order from "../../assets/image/png/order success.png"
import book from "../../assets/image/jpg/dummy image 4.jpg"
import { useLocation, useNavigate } from "react-router-dom"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import CustomCarouselStory from "../../components/Page/PersonalizeStory/Carousel/CarouselSingle"
import CustomButton from "../../components/UI/Button/Button"
import useApiHttp from "../../hooks/ues-http"
const OrderSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderDetails } = location.state || {}
  console.log("orderDetails", orderDetails)
  const [openAdduser, setOpenAdduser] = useState(false)
  const [data, setData] = useState({})
  console.log("data", data)

  const { isLoading, sendLoading, sendRequest } = useApiHttp()
  // Event handlers
  const handleCloseDialog = () => setOpenAdduser(false)

  const viewList = id => {
    sendRequest(
      {
        url: `user/order/book/preview`,
        method: "POST",
        body: {
          type: "summary", // summary, my_orders
          id: id, // order detail id
        },
      },
      data => {
        setData(data?.data)

        setOpenAdduser(true)
      }
    )
  }

  const handleOpenDialog = id => {
    viewList(id)
  }

  return (
    <div className={styles.successContainer}>
      <div className={styles.header}>
        <img src={order} alt="order" width={"120px"} />
        <h2>Order Successfully Placed</h2>
        <p>
          Your order number is <strong>{orderDetails?.order_number}</strong>
        </p>
        <p>
          A confirmation of your order has been sent to{" "}
          <strong>{orderDetails?.address?.contact_email}</strong>
        </p>
      </div>
      <p className={styles.label_1}>Order placed on {orderDetails?.date}</p>
      <div className={styles.infoGrid}>
        {/* <div>
          <p className={styles.label_1}>Order placed on {orderDetails?.date}</p>
          <p></p>
        </div> */}
        <div>
          <p className={styles.label}>Delivery Address</p>
          <p className={styles.name_addres}>
            {orderDetails?.address?.contact_name}
          </p>
          <p className={styles.label_cont}>
            {orderDetails?.address?.address_line},{" "}
            {orderDetails?.address?.landmark}, {orderDetails?.address?.city},{" "}
            {orderDetails?.address?.state}, {orderDetails?.address?.pincode},{" "}
            {orderDetails?.address?.country}
          </p>
          <p className={styles.label_cont}>
            {orderDetails?.address?.contact_email} | +
            {orderDetails?.address?.country_code}-
            {orderDetails?.address?.contact_number}
          </p>
        </div>
        <div>
          <p className={styles.label}>Payment Method</p>
          <div className={styles.cardRow}>
            <img src={cardIcon} alt="card" />
            <span className={styles.name_addres} style={{ margin: 0 }}>
              {orderDetails?.payment?.method}
            </span>
          </div>
          <p className={styles.label_cont}>
            {orderDetails?.payment?.bank || "-"}
          </p>
        </div>
        <div>
          <p className={styles.label}>Order Summary</p>
          <div className={styles.summary}>
            <div className={styles.label_cont}>
              <span>Sub Total</span>
              <span>₹ {orderDetails?.summary?.total_mrp}</span>
            </div>
            <div className={styles.label_cont}>
              <span>Discount</span>
              <span>-₹ {orderDetails?.summary?.total_discount}</span>
            </div>
            <div className={styles.total}>
              <span>Total Amount</span>
              <span>₹ {orderDetails?.summary?.total_price}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      <div>
        <p className={styles.productsLabel}>Products</p>
        <p className={styles.items}>Items ({orderDetails?.items?.count})</p>

        <div className={styles.productTable_main}>
          <div className={styles.productTable}>
            <div className={styles.tableHeader}>
              <span>PRODUCT</span>
              {/* <span>QTY</span> */}
              <span>MRP</span>
              <span>PRICE</span>
              <span>GENDER</span>
            </div>

            {orderDetails?.items?.books?.map(product => (
              <div className={styles.productRow} key={product.id}>
                <div className={styles.productInfo}>
                  <img src={product.image} alt="book" />
                  <div>
                    <p>
                      <strong>{product.name}</strong>
                    </p>
                    {/* <p>{product.pages}</p> */}
                  </div>
                </div>
                {/* <span>{product.quantity}</span> */}
                <span>{product.mrp}</span>
                <span>{product.price}</span>
                <span>
                  {
                    <p
                      className={`lable5 ${product.gender.toLowerCase() === "boy" ? "boy" : "girl"
                        }`}
                    >
                      {product.gender.toLowerCase() === "boy" ? "Boy" : "Girl"}
                    </p>
                  }
                </span>
                {/* <span className={styles.Preview}>
                <a onClick={() => handleOpenDialog(product?.id)}>
                  Show Book Preview
                </a>
              </span> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button
          className={styles.continueBtn}
          onClick={() => navigate("/user")}
        >
          Continue Shopping
        </button>
      </div>

      <CustomDialog
        open={openAdduser}
        handleClose={handleCloseDialog}
        showCloseIcon={true}
        customWidth={"900px"}
        overflowY={"unset"}
        children={
          <>
            <CustomCarouselStory slides={data?.pages} title={data?.title} />
            <div className={styles.viw_book_title}>
              <h3>{data?.header}</h3>
              <p>{data?.text}</p>
            </div>
            <div className={styles.carouselContainer}>
              <CustomButton
                variant="contained"
                customColor="#000000"
                customBgColor="#F3C11D"
                custmstyle={{
                  padding: "7px",
                  width: "300px",
                  height: "50px",
                  marginTop: "15px",
                  gap: ".5rem",
                  alignItems: "center",
                }}
                onClick={() => navigate("/user")}
              >
                Okay, Go Home
              </CustomButton>
            </div>
          </>
        }
      />
    </div>
  )
}

export default OrderSuccess
