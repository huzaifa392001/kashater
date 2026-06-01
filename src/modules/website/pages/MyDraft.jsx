import { useEffect, useRef, useState } from "react";

// images
import edit_cart_ic from "../../website/assets/image/edit-cart-ic.png";
import delete_cart_ic from "../../website/assets/image/delete-cart-ic.png";
import circle from "../../website/assets/image/circle.png";
import warning from "../../website/assets/image/warning.png";
import vecteezy_empty from "../../web/assets/image/svg/cart.svg"
import styles from "../../web/features/MyCart/MyCartPage.module.css"
import { Footer } from "../components/footer/footer";
import { Link, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { useDispatch } from "react-redux";
import useApiHttp from "../../web/hooks/ues-http";
import Swal from "sweetalert2";
import { countApi } from "../../web/services/storeSlice/addCart";
import toast from "react-hot-toast";
import { Modal } from "react-bootstrap";
import "./FlashyButton.css";
export default function MyDraft() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const navigationType = useNavigationType()
  let { whereFrom } = location.state || {}
  const intervalRef = useRef(null)

  const [allData, setAllDAta] = useState({})
  const [refreshData, setRefreshData] = useState([])
  const [giftText, setGiftText] = useState({})
  const [data2, setData2] = useState({})
  const [selected, setSelected] = useState([])
  const [isChecked, setIsChecked] = useState(localStorage.getItem("is_checked"))
  const [openAdduser, setOpenAdduser] = useState(false)
  const [openAdduser5, setOpenAdduser5] = useState(false)
  const [openAdduser6, setOpenAdduser6] = useState(false)
  const [openAdduser7, setOpenAdduser7] = useState(false)
  const [openAdduser8, setOpenAdduser8] = useState(false)
  const [openAdduser9, setOpenAdduser9] = useState(false)
  const [openAdduser10, setOpenAdduser10] = useState(false)
  const [openGiftView, setOpenGiftView] = useState(false)
  const [couponValue, setCouponValue] = useState(
    localStorage.getItem("couponCode")
  )
  const [editCoupon, setEditCoupon] = useState(false)

  const handleClosesetOpenAddUser7 = () => {
    setOpenAdduser7(false)
  }



  const handleClosesetOpenAddUser8 = (id) => {
    dispatch(countApi())
    setAllDAta(prev => ({
      ...prev,
      books: prev.books.filter(book => book.id !== id),
    }))
    setSelected([]) // Also unselect if selected
    setOpenAdduser8(false)
  }

  const clearQueryParams = () => {
    // navigate to same path without query params
    navigate(location.pathname, { replace: true });
  };

  useEffect(() => {
    if (navigationType === "PUSH") {
      // Runs only on normal navigation (like navigate("/page"))
      if (whereFrom === "personalize") {
        setOpenAdduser5(true)
      } else {
        setOpenAdduser5(false)
      }
    }
    let queryParams = new URLSearchParams(location.search);
    let show = queryParams.get("show"); // returns "true"
    if (show) {
      setOpenAdduser5(true)
    }

  }, [whereFrom, navigationType])


  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const {
    isLoading: sendLoadingList,
    success: sendSuccessList,
    error: sendErrorList,
    sendRequest: sendRequestList,
  } = useApiHttp()

  const {
    isLoading: addGiftLoading,
    success: addGiftSuccess,
    error: addGiftError,
    sendRequest: addGiftRequest,
  } = useApiHttp()
  const {
    isLoading: removeGiftLoading,
    success: removeGiftSuccess,
    error: removeGiftError,
    sendRequest: removeGiftRequest,
  } = useApiHttp()
  const {
    isLoading: updateGiftLoading,
    success: updateGiftSuccess,
    error: updateGiftError,
    sendRequest: updateGiftRequest,
  } = useApiHttp()

  const listData = () => {
    sendRequestList(
      {
        url: `user/draft/list`,
        method: "POST",
        body: {},
      },
      data => {
        const is_checked = data?.data?.price_details?.reward_points
        const couponCode = data?.data?.price_details?.coupon
        console.log("is_checked", is_checked?.is_checked)
        console.log("couponCode", couponCode?.code)

        let temp_book = []
        let showPre = []
        data?.data?.map((item, ind) => {
          temp_book.push({
            ...item,
            is_gift: item?.gift_message ? true : false,
          })

          if (item?.preview_status !== 'processed') {
            showPre.push(item?.id)
          }
        })


        let data_final = {
          ...data?.data,
          books: temp_book
        }

        setAllDAta(data_final)
        setRefreshData(showPre)
        localStorage.setItem("is_checked", is_checked?.is_checked)
        localStorage.setItem("couponCode", couponCode?.code)
        // Set checkbox state from API response
        setIsChecked(is_checked?.is_checked)

        // Set coupon value from API response
        if (couponCode?.code) {
          setCouponValue(couponCode?.code)
          setEditCoupon(false)
        } else {
          setCouponValue("")
        }

        const books = data?.data?.books || []
        if (books.length > 0 && selected.length === 0) {
          setSelected([books[0].id])
        }
      }
    )
  }
  useEffect(() => {
    listData()
  }, [selected, isChecked])



  const handleRemoveItem = id => {
    sendRequest(
      {
        url: `user/draft/delete`,
        method: "POST",
        body: {
          draft_id: id,
        },
      },
      res => {
        handleClosesetOpenAddUser7()
        setOpenAdduser8(id)
      }
    )
  }


  return (
    <>
      <div className="my-cart-section  order-end-page"
      // my_50
      >
        <div className="container">
          {/* Page Title */}
          <h2 className="title-40px">My Draft</h2>

          {/* Sub Section */}
          <div className="cartPage ">
            {/* Left Section: Cart Items */}
            <div className="cartItems">
              {allData?.books?.length > 0 ? (
                allData.books.map((book, ind) => {
                  const price = Number(book.price)
                  const mrp = Number(book.mrp)
                  const discount = Math.round(((mrp - price) / mrp) * 100)
                  console.log('book', book);

                  return (
                    <>
                      <div>
                        <div className="cartItem" key={book?.id}>
                          <div></div>
                          <div className="view-cart-thumb">
                            <img src={book?.book?.book_cover} alt={book?.book?.name}
                              draggable={false}
                              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                          </div>
                          <div className="details-cart">
                            <h3 className="text-dark d-flex ac">
                              {book?.book?.name} <span className={`${book?.book?.gender?.toLowerCase() === "boy" ? "tag-cart" : "tag-cartGirl"
                                }`}>{book?.book?.gender?.toLowerCase() === "boy" ? "Boy" : "Girl"}</span>
                            </h3>
                            <p style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}>
                              {book?.book?.description?.replace(/<[^>]*>/g, "")}
                            </p>
                            <div className="actions-cart">
                              <Link to={`/user/personalize_story?story=${encodeURIComponent(book?.book?.name)}&storyId=${book?.book_id}&whatpage=draft&draftId=${book?.id}`}>
                                <button className="linkBtn"
                                // onClick={() => {
                                //   navigate("/user/personalize_story", {
                                //     state: {
                                //       storyId: book?.id,
                                //       isdata: book,
                                //       whatPage: "draft",
                                //     },
                                //   })
                                // }}
                                >
                                  <img src={edit_cart_ic} alt="" /> Edit This Story
                                </button>
                              </Link>
                            </div>
                          </div>
                          <div className="priceBox-cart">
                            <img src={delete_cart_ic} alt="" role="button" onClick={() => setOpenAdduser7(book?.id)} />
                          </div>
                        </div>
                      </div>
                      <hr />
                    </>
                  )
                })
              ) : (
                <div className={styles.emptyCart}>
                  <img
                    src={vecteezy_empty}
                    alt="Empty Draft"
                    className={styles.emptyImage}
                  />
                  <h2>Your Draft is Empty</h2>
                  <p>Looks like you haven’t added anything to your draft yet.</p>
                  <button
                    onClick={() => navigate("/user")}
                    className={styles.browseButton}
                  >
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />


      <Modal show={openAdduser7}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser7()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="md"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={styles.addUser}>
              {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
              <div className={styles.addUserForm}>
                <div className={styles.addUserInput}>
                  <div className={styles.addUser_img}>
                    <img src={warning} alt="alert" width={"100px"} />
                  </div>
                  <div className={styles.input_sets}>
                    <h1 className={styles.title}>Are you sure?</h1>
                    <p className={styles.description}>
                      Do you want to remove this
                      book from cart?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center gap-3 mt-3 mb-3"}>
              <button
                className={'cancel_btn'}
                onClick={handleClosesetOpenAddUser7}
              >
                Cancel
              </button>
              <button
                className={'sumt_btn'}
                onClick={() => handleRemoveItem(openAdduser7)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </Modal>


      <Modal show={openAdduser8}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser8(openAdduser8)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="md"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={styles.addUser}>
              {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
              <div className={styles.addUserForm}>
                <div className={styles.addUserInput}>
                  <div className={styles.addUser_img}>
                    <img src={circle} alt="alert" width={"100px"} />
                  </div>
                  <div className={styles.input_sets}>
                    <h1 className={styles.title}>Removed!</h1>
                    <p className={styles.description}>
                      Book removed from cart successfully.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center mb-3"}>
              <div>
                <button
                  className={'sumt_btn'}
                  onClick={() => handleClosesetOpenAddUser8(openAdduser8)}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
