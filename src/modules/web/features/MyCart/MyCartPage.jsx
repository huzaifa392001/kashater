import React, { useEffect, useState } from "react"
import styles from "./MyCartPage.module.css"
import CartItem from "../../components/Page/CartSlider/CartSlider"
import vecteezy_empty from "../../assets/image/svg/cart.svg"
import img2 from "../../assets/image/jpg/dummy image 2.jpg"
import img3 from "../../assets/image/jpg/dummy image 3.jpg"
import img4 from "../../assets/image/jpg/dummy image 4.jpg"
import gifts from "../../assets/image/png/gift wrap.png"
import coupon from "../../assets/image/png/coupon.png"
import CustomCheckbox from "../../components/UI/Checkbox/CustomCheckbox"
import BoostrapDialog from "../../components/UI/Dialog/BoostrapDialog"
import MinHeightTextarea from "../../components/UI/TextArea/Textarea"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import { useLocation, useNavigate, useNavigationType } from "react-router-dom"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import { countApi } from "../../services/storeSlice/addCart"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import alerts from "../../assets/image/png/layer.png"
import imgsssss from "../../assets/image/jpg/imgsssss.png"
import hang from "../../assets/image/svg/hang.svg"

import OverlayLoding from "../../components/UI/Loding/OverlayLoding"
import ScreenshotProtection from "../../../website/components/screenshot-prevent/screenshot-prevent"
// import OverlayLoding from "../../../components/UI/Loding/OverlayLoding"

const MyCartPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const navigationType = useNavigationType()
  let { whereFrom } = location.state || {}

  const [allData, setAllDAta] = useState([])
  const [data2, setData2] = useState({})
  const [selected, setSelected] = useState([])
  const [isChecked, setIsChecked] = useState(localStorage.getItem("is_checked"))
  const [openAdduser, setOpenAdduser] = useState(false)
  const [openAdduser5, setOpenAdduser5] = useState(false)
  const [openAdduser6, setOpenAdduser6] = useState(false)
  const [openGiftView, setOpenGiftView] = useState(false)
  const [couponValue, setCouponValue] = useState(
    localStorage.getItem("couponCode")
  )
  const [editCoupon, setEditCoupon] = useState(false)
  const [formDatas, setFormDatas] = useState({
    name: "",
    mobile: "",
    description: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    mobile: "",
    description: "",
  })

  const [isEditingGift, setIsEditingGift] = useState(false) // Track if we're editing existing gift
  const [currentGiftId, setCurrentGiftId] = useState(null)

  const handleClosesetOpenGiftView = () => {
    setOpenGiftView(false)
    // handleClearInput()
  }
  const handleClosesetOpenAddUser5 = () => {
    setOpenAdduser5(false)
    // handleClearInput()
  }
  const handleClosesetOpenAddUser6 = () => {
    setOpenAdduser6(false)
    // handleClearInput()
  }

  useEffect(() => {
    if (navigationType === "PUSH") {
      // Runs only on normal navigation (like navigate("/page"))
      if (whereFrom === "personalize") {
        setOpenAdduser5(true)
      } else {
        setOpenAdduser5(false)
      }
    }
  }, [whereFrom, navigationType])

  const charsLeft = formDatas.description.length

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
        url: `user/cart/view`,
        method: "POST",
        body: {
          coupon: couponValue,
          is_points_checked: isChecked ? 1 : 0,
          cart_ids: selected,
        },
      },
      data => {
        const is_checked = data?.data?.price_details?.reward_points
        const couponCode = data?.data?.price_details?.coupon
        console.log("is_checked", is_checked?.is_checked)
        console.log("couponCode", couponCode?.code)
        setAllDAta(data?.data)
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

  const viewList = id => {
    sendRequest(
      {
        url: `user/cart/preview/${id}`,
      },
      data => {
        setData2(data?.data)

        setOpenAdduser6(true)
      }
    )
  }
  const handleShowPreview = id => {
    viewList(id)
  }
  const handleRemoveItem = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this book from cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      background: "#373737",
      customClass: {
        popup: "my-swal-popup",
      },
    }).then(result => {
      if (result.isConfirmed) {
        sendRequest(
          {
            url: `user/cart/remove`,
            method: "DELETE",
            body: {
              book_id: id,
            },
          },
          res => {
            Swal.fire({
              title: "Removed!",
              text: "Book removed from cart successfully.",
              icon: "success",
              background: "#373737",
              customClass: {
                popup: "my-swal-popup",
              },
            }).then(() => {
              // Optionally show success message or toast
              dispatch(countApi())
              setAllDAta(prev => ({
                ...prev,
                books: prev.books.filter(book => book.id !== id),
              }))
              setSelected([]) // Also unselect if selected
            })
          }
        )
      }
    })
  }

  const handleToggle = id => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const selectedBooks =
    allData?.books?.filter(book => selected.includes(book.id)) || []
  const total = selectedBooks?.reduce((sum, b) => sum + b.price, 0)
  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    setOpenAdduser(false)
    setIsEditingGift(false)
    setCurrentGiftId(null)
    setFormDatas({
      name: "",
      mobile: "",
      description: "",
    })
    setFormErrors({
      name: "",
      mobile: "",
      description: "",
    })
  }
  const handleEditGift = () => {
    const gift = getGiftData()
    if (gift?.has_gift && gift?.details) {
      setIsEditingGift(true)
      setCurrentGiftId(gift.details.id)
      setFormDatas({
        name: gift.details.name || "",
        mobile: gift.details.mobile_number || "",
        description: gift.details.message || "",
      })
      setOpenAdduser(true)
    }
  }

  const HandlerRecipientName = e => {
    const { name, value } = e.target
    setFormDatas({ ...formDatas, name: value })
    setFormErrors(prev => ({ ...prev, name: "" }))
  }
  const HandlerMobile = e => {
    const { name, value } = e.target
    setFormDatas({ ...formDatas, mobile: value })
    setFormErrors(prev => ({ ...prev, mobile: "" }))
  }
  const handleChange = event => {
    const { name, value } = event.target
    const maxChar = 255
    const truncatedValue = value.slice(0, maxChar)
    setFormDatas(prev => ({ ...prev, description: truncatedValue }))
    setFormErrors(prev => ({ ...prev, description: "" }))
  }

  const onChangeCoupons = e => {
    setCouponValue(e.target.value)
  }

  // const handleGiftSubmit = () => {
  //   let errors = {}
  //   let isValid = true

  //   // Name validation
  //   if (!formDatas.name.trim()) {
  //     errors.name = "Recipient name is required"
  //     isValid = false
  //   }

  //   // Mobile validation
  //   if (!formDatas.mobile.trim()) {
  //     errors.mobile = "Mobile number is required"
  //     isValid = false
  //   } else if (!/^\d{10}$/.test(formDatas.mobile)) {
  //     errors.mobile = "Invalid mobile number (10 digits required)"
  //     isValid = false
  //   }

  //   // Description validation
  //   if (!formDatas.description.trim()) {
  //     errors.description = "Message is required"
  //     isValid = false
  //   }

  //   setFormErrors(errors)
  //   if (isValid) {
  //     formDatas
  //     addGiftRequest(
  //       {
  //         url: `user/cart/gift/add`,
  //         method: "POST",
  //         body: {
  //           name: formDatas.name,
  //           mobile_number: formDatas.mobile,
  //           message: formDatas.description,
  //         },
  //       },
  //       data => {
  //         if (data?.code === 200) {
  //           handleClosesetOpenAddUser()
  //           setFormDatas({
  //             ...formDatas,
  //             name: "",
  //             mobile: "",
  //             description: "",
  //           })
  //           listData()
  //           toast.success(data?.message)
  //         }
  //       }
  //     )

  //     // localStorage.setItem(
  //     //   "Gift",
  //     //   JSON.stringify({
  //     //     name: formDatas.name,
  //     //     phone: formDatas.mobile,
  //     //     message: formDatas.description,
  //     //   })
  //     // )
  //   }
  // }

  const handleGiftSubmit = () => {
    let errors = {}
    let isValid = true

    // Name validation
    if (!formDatas.name.trim()) {
      errors.name = "Recipient name is required"
      isValid = false
    }

    // Mobile validation
    if (!formDatas.mobile.trim()) {
      errors.mobile = "Mobile number is required"
      isValid = false
    } else if (!/^\d{10}$/.test(formDatas.mobile)) {
      errors.mobile = "Invalid mobile number (10 digits required)"
      isValid = false
    }

    // Description validation
    if (!formDatas.description.trim()) {
      errors.description = "Message is required"
      isValid = false
    }

    setFormErrors(errors)

    if (!isValid) return

    if (isEditingGift && currentGiftId) {
      // Update existing gift
      updateGiftRequest(
        {
          url: `user/cart/gift/update`,
          method: "PUT",
          body: {
            id: currentGiftId,
            name: formDatas.name,
            mobile_number: formDatas.mobile,
            message: formDatas.description,
          },
        },
        data => {
          if (data?.code === 200) {
            handleClosesetOpenAddUser()
            listData()
            toast.success(data?.message || "Gift updated successfully!")
          }
        }
      )
    } else {
      // Add new gift
      addGiftRequest(
        {
          url: `user/cart/gift/add`,
          method: "POST",
          body: {
            name: formDatas.name,
            mobile_number: formDatas.mobile,
            message: formDatas.description,
          },
        },
        data => {
          if (data?.code === 200) {
            handleClosesetOpenAddUser()
            listData()
            toast.success(data?.message || "Gift added successfully!")
          }
        }
      )
    }
  }

  const removeGitHandler = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this gift?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#373737",
      customClass: {
        popup: "my-swal-popup",
      },
    }).then(result => {
      if (result.isConfirmed) {
        removeGiftRequest(
          {
            url: `user/cart/gift/delete/${id}`,
            method: "DELETE",
          },
          res => {
            Swal.fire({
              title: "Deleted!",
              text: "Gift deleted successfully.",
              icon: "success",
              background: "#373737",
              customClass: {
                popup: "my-swal-popup",
              },
            }).then(() => {
              // Optionally show success message or toast
              listData()
            })
          }
        )
      }
    })
  }
  const point = allData?.price_details?.reward_points?.points
  // console.log("point", point)
  function getGiftData() {
    const data = allData?.gift
    if (!data) return null

    try {
      return data
    } catch {
      return null
    }
  }
  const gift = getGiftData()
  console.log("has_gift", gift?.has_gift)
  console.log("details", gift?.details)

  return (
    <>
      <h2 className={styles.cartContainer_title}>My Cart</h2>
      <p className={styles.cartContainer_sub_title}>
        {selected?.length}/{allData?.books?.length} items selected
      </p>
      <div className={styles.cartContainer}>
        <div className={styles.cartLeft}>
          {allData?.books?.length > 0 ? (
            allData.books.map(book => (
              <CartItem
                key={book.id}
                book={book}
                selected={selected.includes(book.id)}
                onToggle={() => handleToggle(book.id)}
                onRemove={() => handleRemoveItem(book.book_id)}
                onShowPreview={() => handleShowPreview(book.id)}
                onEdit={() => {
                  navigate("/user/personalize_story", {
                    state: {
                      storyId: book.book_id,
                      isdata: book,
                      whatPage: "my_cart",
                      isEdit: "edit",
                    },
                  })
                }}
              />
            ))
          ) : (
            <div className={styles.emptyCart}>
              <img
                src={vecteezy_empty}
                alt="Empty Cart"
                className={styles.emptyImage}
              />
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven’t added anything to your cart yet.</p>
              <button
                onClick={() => navigate("/user")}
                className={styles.browseButton}
              >
                Browse Products
              </button>
            </div>
          )}
        </div>

        <div className={styles.cartRight}>
          {allData?.books?.length > 0 && (
            <div className={styles.giftBox}>
              <div className={styles.gift_header}>
                <div>
                  <img src={gifts} alt="gift" />
                </div>
                {gift.has_gift ? (
                  <div>
                    <h4>Gift Packaging Added</h4>
                    <p>
                      This order will be packed as a gift with your personalised
                      message.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h4>Make it a Gift?</h4>
                    <p>
                      Add gift packaging and include a personalised message on a
                      card.
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.button_gift}>
                {gift.has_gift ? (
                  <a onClick={() => handleEditGift()}>Edit Gift</a>
                ) : (
                  <a onClick={() => setOpenAdduser(true)}>Add Gift</a>
                )}
                {gift?.has_gift === 1 && (
                  <a onClick={() => setOpenGiftView(true)}>View Details</a>
                )}
                {gift?.has_gift === 1 && (
                  <a onClick={() => removeGitHandler(gift?.details?.id)}>
                    Remove Gift
                  </a>
                )}
              </div>
            </div>
          )}

          <div className={styles.couponBox}>
            <div className={styles.couponBox_header}>
              <label>Coupons</label>
              {allData?.price_details?.coupon !== null && !editCoupon && (
                <p
                  onClick={() => {
                    setEditCoupon(!editCoupon)
                    if (editCoupon) setCouponValue("") // Clear input when cancelling edit
                  }}
                >
                  Edit Coupon
                </p>
              )}
            </div>
            {allData?.price_details?.coupon === null || editCoupon ? (
              <div className={styles.couponInput}>
                <input
                  placeholder="Enter Code"
                  value={couponValue}
                  onChange={onChangeCoupons}
                />
                <button
                  onClick={() => {
                    setEditCoupon(!editCoupon)
                    listData()
                  }}
                >
                  {editCoupon ? "Update" : "Apply"}
                </button>
              </div>
            ) : (
              <div
                className={styles.gift_header}
                style={{ marginTop: ".5rem" }}
              >
                <div>
                  <img
                    src={coupon}
                    alt="coupon"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div>
                  <h4>1 Coupon applied</h4>
                  <p>
                    You saved additional ₹{" "}
                    {allData?.price_details?.coupon?.saved_amount}
                  </p>
                </div>
              </div>
            )}
          </div>

          {allData?.price_details?.reward_points?.is_eligible && (
            <div className={styles.redeemBox}>
              <label>Redeem Points</label>
              <div className={styles.redeemInput}>
                <CustomCheckbox
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <p>{allData?.price_details?.reward_points?.text}</p>
              </div>
            </div>
          )}

          <div className={styles.priceBox}>
            <h4>Price Details</h4>
            <p className={styles.itemss}>
              {allData?.price_details?.item_count || 0} Items
            </p>
            <div className={styles.total}>
              <p>Sub Total</p>
              <p className={styles.total_span}>
                {`₹ ${allData?.price_details?.sub_total}`}
              </p>
            </div>
            <div className={styles.discount}>
              <p>Discount</p>
              {/* className={styles.discount_price} */}
              <p className={styles.discount_price}>
                -₹ {allData?.price_details?.discount_amount}
              </p>
            </div>
            <div className={styles.totalLine}>
              <p>Total Amount</p>
              <p className={styles.total_price}>
                {" "}
                ₹ {allData?.price_details?.total_price}
              </p>
            </div>
            <button
              className={styles.continueBtn}
              onClick={() => {
                if (selected.length === 0) {
                  Swal.fire({
                    icon: "warning",
                    title: "No Items Selected",
                    text: "Please select at least one item before continuing.",
                    background: "#373737",
                    customClass: {
                      popup: "my-swal-popup",
                    },
                  })
                  return
                }
                if (
                  allData?.subscription_details?.has_subscription &&
                  allData?.subscription_details
                    ?.available_books_under_subscription < selected.length
                ) {
                  Swal.fire({
                    title: "Warning?",
                    text: `please unselect some items to continue, your book limit is ${allData?.subscription_details?.available_books_under_subscription}`,
                    icon: "warning",
                    background: "#373737",
                    customClass: {
                      popup: "my-swal-popup",
                    },
                  })
                } else {
                  navigate("/user/address", {
                    state: {
                      cartItems: allData,
                      cartId: selected,
                      coupon_code: couponValue,
                      reward_points_used: isChecked ? point : "",
                    },
                  })
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {/* {openAdduser && (
        <BoostrapDialog
          open={openAdduser}
          handleClose={handleClosesetOpenAddUser}
          showCloseIcon={false}
          customWidth={"650px"}
          overflowY={"unset"}
          children={
            <>
              <div className={styles.addUser}>
                <h3 className={styles.addUserHeader}>Gift Packaging</h3>
                <div className={styles.addUserForm}>
                  <div className={styles.gift_header}>
                    <div>
                      <img src={gifts} alt="gift" />
                    </div>
                    <div>
                      <h4>Make It Special</h4>
                      <p>
                        Your message will be printed on a card placed inside the
                        package.
                      </p>
                    </div>
                  </div>
                  <div className={styles.addUserInput}>
                    <div className={styles.input_text_filed}>
                      <CustomTextField
                        id="RecipientName"
                        // label="Story Book Offer Price"
                        placeholder="Recipient Name"
                        variant="outlined"
                        value={formDatas?.name}
                        sx={{
                          width: "100%",
                        }}
                        onChange={HandlerRecipientName}
                        error={!!formErrors.name}
                        // onBlur={offerPriceBlurHandler}
                        // // helperText={nameHasError ? "Enter the email" : null}
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                        required
                      />
                      <CustomTextField
                        id="MobileNumber"
                        // label="Story Book Offer Price"
                        placeholder="Mobile Number"
                        variant="outlined"
                        value={formDatas?.mobile}
                        sx={{
                          width: "100%",
                        }}
                        onChange={HandlerMobile}
                        error={!!formErrors.mobile}
                        // onBlur={offerPriceBlurHandler}
                        // // helperText={nameHasError ? "Enter the email" : null}
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                        required
                      />
                    </div>
                    <MinHeightTextarea
                      maxLength="255"
                      label="Message"
                      title="Message"
                      name="Message"
                      rows={4}
                      value={formDatas.description}
                      placeholder="Message"
                      showpertext={`${charsLeft}/255`}
                      onChange={handleChange}
                      error={!!formErrors.description}
                    />
                  </div>
                  <div className={styles.btn_group}>
                    <button
                      className={styles.cancel}
                      onClick={handleClosesetOpenAddUser}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={handleGiftSubmit}
                    >
                      Apply Gift Packaging
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )} */}
      {openAdduser && (
        <BoostrapDialog
          open={openAdduser}
          handleClose={handleClosesetOpenAddUser}
          showCloseIcon={false}
          customWidth={"650px"}
          overflowY={"unset"}
          children={
            <>
              <div className={styles.addUser}>
                <h3 className={styles.addUserHeader}>
                  {isEditingGift ? "Edit Gift Packaging" : "Gift Packaging"}
                </h3>
                <div className={styles.addUserForm}>
                  <div className={styles.gift_header}>
                    <div>
                      <img src={gifts} alt="gift" />
                    </div>
                    <div>
                      <h4>Make It Special</h4>
                      <p>
                        Your message will be printed on a card placed inside the
                        package.
                      </p>
                    </div>
                  </div>
                  <div className={styles.addUserInput}>
                    <div className={styles.input_text_filed}>
                      <CustomTextField
                        id="RecipientName"
                        placeholder="Recipient Name"
                        variant="outlined"
                        value={formDatas?.name}
                        sx={{ width: "100%" }}
                        onChange={HandlerRecipientName}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                        required
                      />
                      <CustomTextField
                        id="MobileNumber"
                        placeholder="Mobile Number"
                        variant="outlined"
                        value={formDatas?.mobile}
                        sx={{ width: "100%" }}
                        onChange={HandlerMobile}
                        error={!!formErrors.mobile}
                        helperText={formErrors.mobile}
                        required
                      />
                    </div>
                    <MinHeightTextarea
                      maxLength="255"
                      label="Message"
                      title="Message"
                      name="Message"
                      rows={4}
                      value={formDatas.description}
                      placeholder="Message"
                      showpertext={`${charsLeft}/255`}
                      onChange={handleChange}
                      error={!!formErrors.description}
                      helperText={formErrors.description}
                    />
                  </div>
                  <div className={styles.btn_group}>
                    <button
                      className={styles.cancel}
                      onClick={handleClosesetOpenAddUser}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={handleGiftSubmit}
                      disabled={addGiftLoading || updateGiftLoading}
                    >
                      {addGiftLoading || updateGiftLoading
                        ? "Processing..."
                        : isEditingGift
                          ? "Update Gift Packaging"
                          : "Apply Gift Packaging"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}
      {openGiftView && (
        <BoostrapDialog
          open={openGiftView}
          handleClose={handleClosesetOpenGiftView}
          showCloseIcon={false}
          customWidth={"650px"}
          overflowY={"unset"}
          children={
            <>
              <div className={styles.addUser}>
                <h3
                  className={styles.addUserHeader}
                  style={{ marginBottom: "2rem" }}
                >
                  Gift Packaging
                </h3>
                <div className={styles.addUserForm}>
                  <div className={styles.addUserInput}>
                    <div className={styles.input_text_filed}>
                      <CustomTextField
                        placeholder="Recipient Name"
                        variant="outlined"
                        value={gift?.details?.name}
                        sx={{
                          width: "100%",
                        }}
                        disabled
                      />
                      <CustomTextField
                        placeholder="Mobile Number"
                        variant="outlined"
                        value={gift?.details?.mobile_number}
                        sx={{
                          width: "100%",
                        }}
                        disabled
                      />
                    </div>
                    <MinHeightTextarea
                      maxLength="255"
                      label="Message"
                      title="Message"
                      name="Message"
                      rows={4}
                      value={gift?.details?.message}
                      disabled
                    // placeholder="Message"
                    // showpertext={`${charsLeft}/255`}
                    // onChange={handleChange}
                    // error={!!formErrors.description}
                    />
                  </div>
                  <div className={styles.btn_group}>
                    {/* <button
                      className={styles.cancel}
                      onClick={handleClosesetOpenGiftView}
                    >
                      Cancel
                    </button> */}
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={handleClosesetOpenGiftView}
                    >
                      Okay
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}

      {/* CART */}
      {openAdduser5 && (
        <BoostrapDialog
          open={openAdduser5}
          handleClose={handleClosesetOpenAddUser5}
          showCloseIcon={false}
          customWidth={"600px"}
          overflowY={"unset"}
          children={
            <>
              <div className={styles.addUser}>
                {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
                <div className={styles.addUserForm}>
                  <div className={styles.addUserInput}>
                    <div className={styles.addUser_img}>
                      <img src={alerts} alt="alert" width={"100px"} />
                    </div>
                    <div className={styles.input_sets}>
                      <h1 className={styles.title}>Your Book’s in the Cart!</h1>
                      <p className={styles.description}>
                        Hit the “Show Preview” button in your cart whenever
                        you’re ready to take a sneak peek!
                      </p>
                    </div>
                  </div>

                  <div className={styles.btn_group}>
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={handleClosesetOpenAddUser5}
                    >
                      Okay
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}

      {openAdduser6 && (
        <BoostrapDialog
          open={openAdduser6}
          handleClose={handleClosesetOpenAddUser6}
          showCloseIcon={false}
          customWidth={data2?.status === "processed" ? "700px" : "600px"}
          overflowY={"auto"}
          children={
            <>
              {data2?.status === "processed" ? (
                <ScreenshotProtection>
                  <div className={styles.addUser}>
                    {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
                    <div className={styles.addUserForm}>
                      <div className={styles.addUserInput}>
                        {data2?.status === "processed" ? (
                          <div className={styles.addUserInput__imge_set}>
                            <div className={styles.addUser_img_big}>
                              <img src={data2?.image} alt="alert" />
                            </div>
                          </div>
                        ) : (
                          <div className={styles.addUser_img}>
                            <img src={hang} alt="alert" width={"100px"} />
                          </div>
                        )}

                        <div className={styles.input_sets}>
                          <h1 className={styles.title}>
                            {data2?.status === "processed"
                              ? "Meet the Stars of Your Story"
                              : "Hang Tight!"}
                          </h1>
                          <p className={styles.description}>
                            {`${data2?.status === "processed"
                              ? "Introducing the stars of your story, all revolving around your hero! Finish your checkout to receive your personalised book, brimming with enchanting moments, on every page."
                              : "We’re still putting the preview together. Please check back here in a little while!"
                              }`}
                          </p>
                        </div>
                      </div>

                      <div className={styles.btn_group}>
                        <button
                          className={`${styles.continueBtn} ${styles.width_cont}`}
                          onClick={handleClosesetOpenAddUser6}
                        >
                          Okay
                        </button>
                      </div>
                    </div>
                  </div>
                </ScreenshotProtection>
              ) : (
                <>
                  <div className={styles.addUser}>
                    {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
                    <div className={styles.addUserForm}>
                      <div className={styles.addUserInput}>
                        {data2?.status === "processed" ? (
                          <div className={styles.addUserInput__imge_set}>
                            <div className={styles.addUser_img_big}>
                              <img src={data2?.image} alt="alert" />
                            </div>
                          </div>
                        ) : (
                          <div className={styles.addUser_img}>
                            <img src={hang} alt="alert" width={"100px"} />
                          </div>
                        )}

                        <div className={styles.input_sets}>
                          <h1 className={styles.title}>
                            {data2?.status === "processed"
                              ? "Meet the Stars of Your Story"
                              : "Hang Tight!"}
                          </h1>
                          <p className={styles.description}>
                            {`${data2?.status === "processed"
                              ? "Introducing the stars of your story, all revolving around your hero! Finish your checkout to receive your personalised book, brimming with enchanting moments, on every page."
                              : "We’re still putting the preview together. Please check back here in a little while!"
                              }`}
                          </p>
                        </div>
                      </div>

                      <div className={styles.btn_group}>
                        <button
                          className={`${styles.continueBtn} ${styles.width_cont}`}
                          onClick={handleClosesetOpenAddUser6}
                        >
                          Okay
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          }
        />
      )}
    </>
  )
}

export default MyCartPage
