import { useEffect, useState } from "react";

// images
import card_ic from "../../website/assets/image/card-ic.png";
import view_book_thumb from "../../website/assets/image/view-book-thumb-img.png";

import { Footer } from "../../website/components/footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import useApiHttp from "../../web/hooks/ues-http";
import dayjs from "dayjs";

export default function OrderPlaced() {
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
    <>
      <section className="order-end-page">
        <div className="container text-dark">
          <div className="order-end-content">
            <h2 className="title-40px text-center">
              Order Successfully Placed
            </h2>
            <h4 className="text-dark">Thank you for your order {orderDetails?.order_number} </h4>
            <p className="text-dark">
              We will send you an email with tracking information when your item
              ships.{" "}
            </p>

            <div className="order-placed">
              <span className="text-dark">Order placed on {orderDetails?.date}</span>
            </div>

            <div className="order-info">
              <div className="d-flex flex-wrap">
                <div className="col-lg-4 col-12 pe-lg-3 pe-0 mt_25">
                  <div className="order-address-cont">
                    <span className="order-span-title">Delivery Address</span>
                    <h4>{orderDetails?.address?.contact_name}</h4>
                    <p>
                      {orderDetails?.address?.address_line},{" "}
                      {orderDetails?.address?.landmark}, {orderDetails?.address?.city},{" "}
                      {orderDetails?.address?.state}, {orderDetails?.address?.pincode},{" "}
                      {orderDetails?.address?.country}
                    </p>

                    <div className="d-ac">
                      <span>{orderDetails?.address?.contact_email}</span>
                      <span>|</span>
                      <span>+{orderDetails?.address?.country_code}-
                        {orderDetails?.address?.contact_number}</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12 pe-lg-3 pe-0 mt_25">
                  <div className="order-address-cont">
                    <span className="order-span-title">Payment Method</span>
                    <div className="d-ac">
                      <img src={card_ic} alt=""
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />

                      <h4>{orderDetails?.payment?.method}</h4>
                    </div>
                    <p> {orderDetails?.payment?.bank || "-"}</p>
                  </div>
                </div>
                <div className="col-lg-4 col-12 pe-lg-3 pe-0 mt_25 text-dark">
                  <div className="order-det-card order-address-cont">
                    <span className="order-span-title">Payment Method</span>
                    <div className="price-info">
                      <h4>Sub Total</h4>
                      <h4>₹{orderDetails?.summary?.total_mrp}</h4>
                    </div>
                    <div className="price-info">
                      <h4>Discount</h4>
                      <h4 className="clr-red">-₹{orderDetails?.summary?.total_discount}</h4>
                    </div>
                    <div className="line"></div>
                    <div className="price-info">
                      <h4>Total Amount</h4>
                      <h4>₹{orderDetails?.summary?.total_price}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="line my_30"></div>
            <div className="order-product-info text-dark">
              <h4>Products</h4>
              <h5>Items ({orderDetails?.items?.count})</h5>
              <div className="table-scroll-container">
                <table className="order-summary-table">
                  <thead>
                    <tr>
                      <th>Products</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails?.items?.books?.map((product, ind) => {
                      return <tr key={ind}>
                        <td>
                          {product?.shipping_detail?.delivery_date && <span className="arrive-det" style={{
                            fontSize: '16px',
                            fontFamily: "var(--font-semibold-Quicksand)",
                            color: "#259B37"
                          }}>
                            Tentative Delivery Date, {dayjs(product?.shipping_detail?.delivery_date).format("Do MMM YYYY")}
                          </span>}
                          <div className="order-item mt-2">
                            <div className="order-prod-img">
                              <img src={product?.image} alt=""
                                draggable={false}
                                onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                            </div>

                            <div className="order-prod-cont">


                              <div className="d-ac">
                                <h2>{product?.name}</h2>
                                <span className={`${product?.gender.toLowerCase() === "boy" ? "tag-cart" : "tag-cartGirl"
                                  }`}>{product?.gender?.toLowerCase() === "boy" ? "Boy" : "Girl"}</span>
                              </div>
                              <p>
                                Embark on an unforgettable journey in The Courageous
                                Quest, where bravery meets desti…
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>1</td>
                        <td>₹{product?.price}</td>
                        <td>₹{product?.paid_amount}</td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
              {/* <div className="order-product-list mt_25">
                <div className="d-lg-block d-none">
                  <div className="d-flex order-pr-title">
                    <div className="col-md-6">
                      <h6>Products</h6>
                    </div>
                    <div className="col-md-2">
                      <h6>Qty</h6>
                    </div>
                    <div className="col-md-2">
                      <h6>Price</h6>
                    </div>
                    <div className="col-md-2">
                      <h6>Amount</h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap order-pr-cell">
                  <div className="col-lg-6 col-12 mt_10">
                    <div className="order-prod-card">
                      <div className="d-flex flex-md-nowrap flex-wrap align-items-center">
                        <div className="order-prod-img">
                          <img src={view_book_thumb} alt="" />
                        </div>

                        <div className="order-prod-cont">
                          <div className="d-ac">
                            <h2>The Hidden Island</h2>
                            <span className="tag-cart">Boy</span>
                          </div>
                          <p>
                            Embark on an unforgettable journey in The Courageous
                            Quest, where bravery meets desti…
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-6 col-6 mt_10">
                    <div className="d-ac">
                      <h6 className="d-lg-none d-blockl pe-2">Quantity : </h6>
                      <h6>1</h6>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-6 col-6 mt_10">
                    <div className="d-ac">
                      <h6 className="d-lg-none d-blockl pe-2">Price : </h6>
                      <h6>₹1999</h6>
                    </div>
                  </div>
                  <div className="col-lg-2 mt_10">
                    <div className="d-ac">
                      <h6 className="d-lg-none d-blockl pe-2">Amount :</h6>
                      <h6>₹1599</h6>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
