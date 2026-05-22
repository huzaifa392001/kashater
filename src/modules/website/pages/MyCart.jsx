import { useEffect, useRef, useState } from "react";

// images
import view_book_thumb from "../../website/assets/image/view-book-thumb-img.png";
import tabler_file_filled from "../../website/assets/image/tabler-file-filled.png";
import edit_cart_ic from "../../website/assets/image/edit-cart-ic.png";
import delete_cart_ic from "../../website/assets/image/delete-cart-ic.png";
import cart_gift_order from "../../website/assets/image/cart-gift-order.png";
import gift_cart_edit from "../../website/assets/image/gift-cart-edit.png";
import gift_cart_detail from "../../website/assets/image/gift-cart-detail.png";
import gift_cart_add from "../../website/assets/image/gift-cart-add.png";
import gift_cart_remove from "../../website/assets/image/gift-cart-remove.png";
import cartImg1 from "../../website/assets/image/Slide 1.png";
import cartImg2 from "../../website/assets/image/02.png";
import cartImg3 from "../../website/assets/image/03.png";
import cartImg4 from "../../website/assets/image/04.png";
import cartImg5 from "../../website/assets/image/05.png";
import cartImg6 from "../../website/assets/image/Slide 6.png";
import cartImg7 from "../../website/assets/image/07.png";
import cartImg8 from "../../website/assets/image/08.png";
import cartImg9 from "../../website/assets/image/Slide 9.png";
import cartImg10 from "../../website/assets/image/10.png";
import cartImg11 from "../../website/assets/image/Slide 11.png";
import cartImg12 from "../../website/assets/image/Slide 12.png";
import cartImg13 from "../../website/assets/image/Slide 13.png";
import cartImg14 from "../../website/assets/image/Slide 14.png";
import cartImg15 from "../../website/assets/image/Slide 15.png";
import cartImg16 from "../../website/assets/image/Slide 16.png";
import cartWhiteLogo from "../../website/assets/image/white_logo.png";
import circle from "../../website/assets/image/circle.png";
import warning from "../../website/assets/image/warning.png";
import gifts from "../../web/assets/image/png/gift wrap.png"
import hang from "../../web/assets/image/svg/hang.svg"
import coupon from "../../web/assets/image/png/coupon.png"
import vecteezy_empty from "../../web/assets/image/svg/cart.svg"
import styles from "../../web/features/MyCart/MyCartPage.module.css"
import { Footer } from "../components/footer/footer";
import { Link, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { useDispatch } from "react-redux";
import useApiHttp from "../../web/hooks/ues-http";
import Swal from "sweetalert2";
import { countApi } from "../../web/services/storeSlice/addCart";
import toast from "react-hot-toast";
import BoostrapDialog from "../../web/components/UI/Dialog/BoostrapDialog";
import { Modal } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ScreenshotProtection from "../components/screenshot-prevent/screenshot-prevent";
import CustomCheckbox from "../../web/components/UI/Checkbox/CustomCheckbox";
import CustomTextField from "../../web/components/UI/TextFiled/TextFiled";
import MinHeightTextarea from "../../web/components/UI/TextArea/Textarea";
import CustomTextFieldLogin from "../../web/components/UI/TextFiled/TextFiledLogin";
import "./FlashyButton.css";
import MinHeightTextareaWhite from "../../web/components/UI/TextArea/TextareaWhite";
import EmblaCarouselAuto2 from "../components/carousel-autoplay/embla-auto2";
import Slider from "react-slick";
export default function MyCart() {
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
  const [openAdduser11, setOpenAdduser11] = useState(false)
  const [openGiftView, setOpenGiftView] = useState(false)

  const openAdduserID = useRef(null)

  const tabWidth = window.innerHeight <= 1024;
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
  const [carouselIndex, setCarouselIndex] = useState(0);

  const hangTightImgScroll = {
    infinite: true,
    speed: 800,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    variableWidth: false,
    adaptiveHeight: true,
    fade: true,
  };


  const hangTightImg = [
    {
      img: cartImg1
    }, {
      img: cartImg2
    }, {
      img: cartImg3
    }, {
      img: cartImg4
    }, {
      img: cartImg5
    }, {
      img: cartImg6
    }, {
      img: cartImg7
    }, {
      img: cartImg8
    }, {
      img: cartImg9
    }, {
      img: cartImg10
    }, {
      img: cartImg11
    }, {
      img: cartImg12
    }, {
      img: cartImg13
    }, {
      img: cartImg14
    }, {
      img: cartImg15
    }, {
      img: cartImg16
    },
  ]

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
    openAdduserID.current = null
    // handleClearInput()
  }

  const handleClosesetOpenAddUser7 = () => {
    setOpenAdduser7(false)
  }

  const handleClosesetOpenAddUser9 = () => {
    setOpenAdduser9(false)
  }

  const handleClosesetOpenAddUser10 = () => {
    listData()
    setOpenAdduser10(false)
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
        // console.log("is_checked", is_checked?.is_checked)
        // console.log("couponCode", couponCode?.code)

        let temp_book = []
        let showPre = []
        data?.data?.books?.map((item, ind) => {
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


  const viewList = id => {
    sendRequest(
      {
        url: `user/cart/preview/${id}`,
      },
      data => {
        if (data?.data?.status == 'processed') {
          if (openAdduserID.current == id) {
            setData2(data?.data)
            setOpenAdduser11(false)
            setOpenAdduser6(true)
          }
          listData()
        } else {
          // setData2(data?.data)
          // setOpenAdduser6(true)
        }

      }
    )
  }

  const reCallFun = () => {
    refreshData?.forEach((item) => {
      viewList(item)
    })
  }

  useEffect(() => {
    // already running interval clear pannum
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // ✅ refreshData irundha mattum interval start
    if (refreshData && refreshData.length > 0) {
      intervalRef.current = setInterval(() => {
        reCallFun();
      }, 20000);
    }

    // cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [refreshData]);


  const handleShowPreview = id => {
    viewList(id)
  }
  const handleRemoveItem = id => {
    sendRequest(
      {
        url: `user/cart/remove`,
        method: "DELETE",
        body: {
          book_id: id,
        },
      },
      res => {
        handleClosesetOpenAddUser7()
        setOpenAdduser8(id)
      }
    )
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
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "Do you want to delete this gift?",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#d33",
    //   cancelButtonColor: "#3085d6",
    //   confirmButtonText: "Delete",
    //   cancelButtonText: "Cancel",
    //   background: "#373737",
    //   customClass: {
    //     popup: "my-swal-popup",
    //   },
    // }).then(result => {
    //   if (result.isConfirmed) {

    //   }
    // })

    removeGiftRequest(
      {
        url: `user/cart/gift/delete/${id}`,
        method: "DELETE",
      },
      res => {
        setOpenAdduser9(false)
        setOpenAdduser10(true)
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Gift deleted successfully.",
        //   icon: "success",
        //   background: "#373737",
        //   customClass: {
        //     popup: "my-swal-popup",
        //   },
        // }).then(() => {
        //   // Optionally show success message or toast
        //   listData()
        // })
      }
    )
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
  // console.log("has_gift", gift?.has_gift)
  // console.log("details", gift?.details)
  // console.log('selected', selected);
  // console.log('allData', allData);


  const handleAddGift = (book_id, ind, type, value) => {
    let temp = [...allData?.books]
    let selectData = temp[ind]
    let custom = {
      ...selectData
    }
    if (type == 'is_gift') {
      custom.is_gift = !selectData?.is_gift
      custom.gift_message = ""
      if (selectData?.is_gift && selectData?.gift_message) {
        giftMsgHandler(selectData?.book_id, "")
      }
    } else {
      custom.gift_message = value
    }
    temp[ind] = custom
    let final_obi = { ...allData }
    final_obi.books = temp
    setAllDAta(final_obi)
  }

  const giftMsgHandler = (book_id, gift_message) => {
    addGiftRequest(
      {
        url: `user/cart/gift/add-update`,
        method: "POST",
        body: {
          book_id: book_id,
          message: gift_message,
        },
      },
      data => {
        if (data?.code === 200) {
          listData()
          toast.success(data?.message || "Gift Message successfully!")
        }
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
          <h2 className="title-40px">My Cart</h2>

          {/* Sub Section */}
          <h3 className="it-sec">{selected?.length}/{allData?.books?.length} items selected</h3>
          <div className="cartPage ">
            {/* Left Section: Cart Items */}
            <div className="cartItems">
              {allData?.books?.length > 0 ? (
                allData.books.map((book, ind) => {
                  const price = Number(book.price)
                  const mrp = Number(book.mrp)
                  const discount = Math.round(((mrp - price) / mrp) * 100)
                  return (
                    <>
                      <div>
                        <div className="cartItem" key={book?.id}>
                          <div
                            className={`customCheckbox ${selected.includes(book?.id) ? 'checked' : ""}`}
                            onClick={() => handleToggle(book?.id)}
                          >
                            {selected.includes(book?.id) && <span className={'checkmark'}>✓</span>}
                          </div>
                          {/* <input type="radio" name="book"
                          checked={selected.includes(book?.id)}
                          onClick={() => handleToggle(book?.id)} /> */}
                          <div className="view-cart-thumb">
                            {/* <LazyLoadImage
                        src={book?.image}
                        alt={book?.title}
                        effect="blur"
                        placeholderSrc={book?.image}
                      /> */}
                            <img src={book?.image} alt={book?.title}
                              draggable={false}
                              onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()} />
                          </div>
                          <div className="details-cart">
                            <h3 className="text-dark d-flex ac">
                              {book.title} <span className={`${book.gender.toLowerCase() === "boy" ? "tag-cart" : "tag-cartGirl"
                                }`}>{book.gender.toLowerCase() === "boy" ? "Boy" : "Girl"}</span>
                            </h3>
                            <p style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}>
                              {book?.description}
                            </p>
                            <div className="actions-cart">
                              <Link reloadDocument to={`/user/personalize_story?story=${encodeURIComponent(book?.title)}&storyId=${book?.book_id}&cartId=${book?.id}&whatpage=my_cart&modify=edit`}>
                                <button className="linkBtn"
                                // onClick={() => {
                                //   navigate("/user/personalize_story", {
                                //     state: {
                                //       storyId: book?.book_id,
                                //       isdata: book,
                                //       whatPage: "my_cart",
                                //       isEdit: "edit",
                                //     },
                                //   })
                                // }}
                                >
                                  <img src={edit_cart_ic} alt="" /> Edit This Story
                                </button>
                              </Link>
                              <div className="d-flex justify-content-center align-items-center gap-1" onClick={() => {
                                handleAddGift(book?.id, ind, 'is_gift')
                              }}>
                                <input type={'checkbox'} checked={book?.is_gift} className="custom-checkbox-color" />
                                <button className="linkBtn">
                                  Make it a gift
                                </button>
                              </div>
                              {/* <button className="outlineBtn" onClick={() => handleShowPreview(book?.id)}>
                              <img src={tabler_file_filled} alt="" /> Show Preview
                            </button> */}
                              {book?.preview_status == 'processed' ?
                                <button className="train-border-btn2"
                                  onClick={() => {
                                    setData2({ image: book?.preview_image, status: book?.preview_status })
                                    setOpenAdduser6(true)

                                  }}> <img src={tabler_file_filled} alt="" />
                                  <span>Show Preview</span>
                                </button>
                                :
                                <button className="train-border-btn" onClick={() => {
                                  openAdduserID.current = book?.id
                                  setOpenAdduser11(true)
                                }}> <img src={tabler_file_filled} alt="" />
                                  <span>Loading Preview</span>
                                </button>
                              }
                            </div>
                          </div>
                          <div className="priceBox-cart">
                            <p className="price-cart">₹ {price}</p>
                            <p className="oldPrice-cart">₹ {mrp}</p>
                            <p className="discount-cart">Save {discount}% (₹{(mrp - price).toFixed(2)})</p>
                            <img src={delete_cart_ic} alt="" role="button" onClick={() => setOpenAdduser7(book?.book_id)} />
                          </div>
                        </div>
                        {book?.is_gift ? <div className="mx-4 fs-5">
                          <p className="text-dark">Gift message</p>
                          <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-start align-items-md-center">
                            <div className="w-100 w-md-75">
                              <MinHeightTextareaWhite
                                maxLength="80"
                                label="Message"
                                title="Message"
                                name="Message"
                                rows={2}
                                value={book?.gift_message}
                                placeholder="Message"
                                showpertext={`${book?.gift_message?.length}/80`}
                                onChange={(val) =>
                                  handleAddGift(book?.id, ind, 'gift_message', val.target.value)
                                }
                                error={!!formErrors.description}
                                helperText={formErrors.description}
                                style={{ backgroundColor: '#fff', color: '#000' }}
                              />
                            </div>

                            <div className="btn-pur w-50 w-md-auto text-center">
                              <button
                                className="primaryBtn gift-btn"
                                onClick={() =>
                                  giftMsgHandler(book?.book_id, book?.gift_message)
                                }
                              >
                                Save gift option
                              </button>
                            </div>
                          </div>

                        </div> : null}
                      </div>
                      <hr />
                    </>
                  )
                })
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

            {/* Right Section: Summary */}
            <div className="cart-price-ct">
              {/* {allData?.books?.length && <div className="summary-cart mb_30">
                <div className="giftBox">
                  <div className="gift-img">
                    <img src={cart_gift_order} alt="" />
                  </div>
                  {/* {gift?.has_gift ? ( *
                  <div className="gift-cont">
                    {gift?.has_gift ? <div><h4 className="text-dark">Gift Packing Added</h4>
                      <p>This order will be packed as a gift with your personalised message.
                      </p></div> : <div><h4 className="text-dark">Make it a Gift?</h4>
                      <p>Gift Packaging and personalized card message on gifts.</p></div>}


                    <div className="d-flex gap-1">

                      {gift?.has_gift ? (
                        <button className="add-btn-cart" onClick={() => handleEditGift()}><img src={gift_cart_edit} alt="" />Edit</button>
                      ) : (
                        <button className="add-btn-cart" onClick={() => setOpenAdduser(true)}><img src={gift_cart_add} alt="" /> Add Gift Package</button>
                      )}
                      {gift?.has_gift === 1 && (
                        <button className="add-btn-cart" onClick={() => setOpenGiftView(true)}><img src={gift_cart_detail} alt="" />View Details</button>
                      )}
                      {gift?.has_gift === 1 && (
                        <button className="add-btn-cart" onClick={() => setOpenAdduser9(gift?.details?.id)}><img src={gift_cart_remove} alt="" />Remove</button>
                      )}
                    </div>
                  </div>
                  {/* ) : ( */}
              {/* <div className="gift-cont">
                      <h4 className="text-dark">Make it a Gift?</h4>
                      <p>
                        Add gift packaging and include a personalised message on a
                        card.
                      </p>
                    </div> */}
              {/* )} *
                </div>
              </div>} */}
              {allData?.price_details?.reward_points?.is_eligible && (
                <div className="cart-price-ct">
                  <div className="summary-cart mb_30">
                    <label className="text-dark">Redeem Points</label>
                    <div className={'d-flex align-items-center gap-2 mt-3'}>
                      <div
                        className={`customCheckbox ${isChecked ? 'checked' : ""}`}
                        onClick={() => setIsChecked(!isChecked)}
                      >
                        {isChecked && <span className={'checkmark'}>✓</span>}
                      </div>
                      <p className="text-dark">{allData?.price_details?.reward_points?.text}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="summary-cart">

                <div className="couponBox">
                  <label>Apply Coupon</label>
                  {allData?.price_details?.coupon === null || editCoupon ? (
                    <div className="couponInput">
                      <input type="text" placeholder="Enter Code" value={couponValue}
                        onChange={onChangeCoupons} style={{ fontFamily: "var(--font-medium-Quicksand)" }} />
                      <button onClick={() => {
                        setEditCoupon(!editCoupon)
                        listData()
                      }}>
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
                        <h4 className="text-dark">1 Coupon applied</h4>
                        <p className="text-dark">
                          You saved additional ₹{" "}
                          {allData?.price_details?.coupon?.saved_amount}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="priceDetails">
                  <h3>Price Details</h3>
                  <p>
                    Subtotal: <span>{`₹ ${allData?.price_details?.sub_total}`}</span>
                  </p>
                  <p>
                    Discount: <span className="clr-red">-₹ {allData?.price_details?.discount_amount}</span>
                  </p>
                  <hr />
                  <h4>
                    Total: <span>₹ {allData?.price_details?.total_price}</span>
                  </h4>
                </div>
                <div className="btn-pur">
                  <button className="primaryBtn" onClick={() => {
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
                      window.location.reload()
                    }
                  }}>Continue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />


      <Modal show={openAdduser}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={styles.addUser}>
              <h3 className={styles.addUserHeader}>{isEditingGift ? "Edit Gift Packaging" : "Gift Packaging"}</h3>
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
                    <CustomTextFieldLogin
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
                    <CustomTextFieldLogin
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
                    maxLength="80"
                    label="Message"
                    title="Message"
                    name="Message"
                    rows={4}
                    value={formDatas.description}
                    placeholder="Message"
                    showpertext={`${charsLeft}/80`}
                    onChange={handleChange}
                    error={!!formErrors.description}
                    helperText={formErrors.description}
                  />
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center gap-3 mt-3 mb-3"}>
              <button
                className={'cancel_btn'}
                onClick={handleClosesetOpenAddUser}
              >
                Cancel
              </button>
              <button
                className={'sumt_btn'}
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
      </Modal>

      <Modal show={openGiftView}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenGiftView()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={styles.addUser}>
              <h3 className={styles.addUserHeader}>Gift Packaging</h3>
              <div className={styles.addUserForm}>
                <div className={styles.addUserInput}>
                  <div className={styles.input_text_filed}>
                    <CustomTextFieldLogin
                      placeholder="Recipient Name"
                      variant="outlined"
                      value={gift?.details?.name}
                      sx={{
                        width: "100%",
                      }}
                      disabled
                    />
                    <CustomTextFieldLogin
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
              </div>
            </div>
            <div className={"d-flex justify-content-center mb-3"}>
              <div>
                <button
                  className={'sumt_btn'}
                  onClick={handleClosesetOpenGiftView}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>


      <Modal show={openAdduser5}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser5()}
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
                    <h1 className={styles.title}>Your Book’s in the Cart!</h1>
                    <p className={styles.description}>
                      Hit the “Show Preview” button in your cart whenever
                      you’re ready to take a sneak peek!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center mb-3"}>
              <div>
                <button
                  className={'sumt_btn'}
                  onClick={() => {
                    handleClosesetOpenAddUser5()
                    clearQueryParams()
                  }}
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal show={openAdduser6}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser6()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={styles.addUser}>
              {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}

              {data2?.status !== "processed" ? (
                <ScreenshotProtection>
                  <div className={"addUser"}>
                    {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
                    <div className={"addUserForm"}>
                      <div className={"addUserInput"}>
                        {data2?.status === "processed" ? (
                          <div className={"addUserInput__imge_set"}>
                            <div className={"addUser_img_big"}>
                              <img src={data2?.image} alt="alert" />
                            </div>
                          </div>
                        ) : (
                          <div className={"addUser_img"}>
                            <img src={hang} alt="alert" width={"100px"} />
                          </div>
                        )}

                        <div className={"input_sets"}>
                          <h1 className={"title"}>
                            {data2?.status === "processed"
                              ? "Meet the Stars of Your Story"
                              : "Hang Tight!"}
                          </h1>
                          <p className={"description mt-3"}>
                            {`${data2?.status === "processed"
                              ? "Introducing the stars of your story, all revolving around your hero! Finish your checkout to receive your personalised book, brimming with enchanting moments, on every page."
                              : "We’re still putting the preview together. Please check back here in a little while!"
                              }`}
                          </p>
                        </div>
                      </div>

                      <div className={"d-flex justify-content-center mb-3"}>
                        <div>
                          <button
                            className={'sumt_btn'}
                            onClick={handleClosesetOpenAddUser6}
                          >
                            Okay
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScreenshotProtection>
              ) : (
                <>
                  <div className={"addUser"}>
                    {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
                    <div className={"addUserForm"}>
                      <div className={"addUserInput"}>
                        {data2?.status === "processed" ? (
                          <div className={"addUserInput__imge_set"}>
                            <div className={"addUser_img_big"}>
                              <img src={data2?.image} alt="alert" />
                            </div>
                          </div>
                        ) : (
                          <div className={"addUser_img"}>
                            <img src={hang} alt="alert" width={"100px"} />
                          </div>
                        )}

                        <div className={"input_sets"}>
                          <h1 className={"title"}>
                            {data2?.status === "processed"
                              ? "Meet the Stars of Your Story"
                              : "Hang Tight!"}
                          </h1>
                          <p className={"description mt-3"}>
                            {`${data2?.status === "processed"
                              ? "Introducing the stars of your story, all revolving around your hero! Finish your checkout to receive your personalised book, brimming with enchanting moments, on every page."
                              : "We’re still putting the preview together. Please check back here in a little while!"
                              }`}
                          </p>
                        </div>
                      </div>

                      <div className={"d-flex justify-content-center mb-3"}>
                        <div>
                          <button
                            className={'sumt_btn'}
                            onClick={handleClosesetOpenAddUser6}
                          >
                            Okay
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>

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


      <Modal show={openAdduser9}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser9()}
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
                      Do you want to delete this gift?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center gap-3 mt-3 mb-3"}>
              <button
                className={'cancel_btn'}
                onClick={handleClosesetOpenAddUser9}
              >
                Cancel
              </button>
              <button
                className={'sumt_btn'}
                onClick={() => removeGitHandler(openAdduser9)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </Modal>


      <Modal show={openAdduser10}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => handleClosesetOpenAddUser10()}
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
                    <h1 className={styles.title}>Deleted!</h1>
                    <p className={styles.description}>
                      Gift deleted successfully.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"d-flex justify-content-center gap-3 mt-3 mb-3"}>
              <button
                className={'sumt_btn'}
                onClick={() => handleClosesetOpenAddUser10()}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </Modal>


      <Modal show={openAdduser11}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => setOpenAdduser11(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={styles.addUser}>
              <div className={"addUser"}>
                <div className={"addUserForm"}>
                  <div className={"addUserInput"}>
                    <section className="container my-2">
                      <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                          <div className="slick-fix-wrapper">
                            <Slider {...hangTightImgScroll}>
                              {hangTightImg?.map((item, ind) => (
                                <div key={ind}>
                                  <img
                                    src={item.img}
                                    alt=""
                                    className="img-fluid hangtight-img"
                                    style={{ marginLeft: '0px' }}
                                    draggable={false}
                                    onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                                  />
                                </div>
                              ))}
                            </Slider>
                          </div>
                        </div>
                      </div>
                    </section>

                    <div className="loader-wrapper">
                      {/* Suthura antha ring */}
                      <div className="loader-ring"></div>

                      {/* Unga Logo (Kadhaster K icon) */}
                      <img
                        src={cartWhiteLogo}
                        alt="loading-logo"
                        className="loader-logo"
                        draggable={false}
                        onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
                      />
                    </div>

                    <div className={"input_sets"}>
                      <h1 className={"title"}>
                        Hang Tight!
                      </h1>
                      <p className={"description mt-3"}>
                        We are still putting the preview together. Please wait a moment.
                      </p>
                    </div>
                  </div>

                  <div className={"d-flex justify-content-center"}>
                    <div>
                      <button
                        className={'sumt_btn'}
                        onClick={() => { openAdduserID.current = null; setOpenAdduser11(false) }}
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>


    </>
  );
}
