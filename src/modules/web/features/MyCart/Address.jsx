import React, { useEffect, useState } from "react"
import styles from "./Address.module.css"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import CustomCheckbox from "../../components/UI/Checkbox/CustomCheckbox"
import BoostrapDialog from "../../components/UI/Dialog/BoostrapDialog"
import MinHeightTextarea from "../../components/UI/TextArea/Textarea"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import AddresItem from "../../components/Page/Addres/Addres"
import CustomeSlecter from "../../components/UI/Dropdown/Select"
import { useNavigate } from "react-router-dom"
import useApiHttp from "../../hooks/ues-http"
import { useLocation } from "react-router-dom"
import loadRazorpayScript from "../../utils/razorpay"
import { useDispatch } from "react-redux"
import { countApi } from "../../services/storeSlice/addCart"
import Swal from "sweetalert2"
import CustomRadio from "../../components/UI/CustomRadio/CustomRadio"
import { toast } from "react-toastify"
import useIsMobile from "../../hooks/useIsMobile"
import { Country, State } from "country-state-city"

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
const Address = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [allData, setAllDAta] = useState([])
  const [selectedId, setSelectedId] = useState(1)
  const [isChecked, setIsChecked] = useState(false)
  const [openAdduser, setOpenAdduser] = useState(false)
  const [addressId, setAddressId] = useState("")
  const [type, setType] = useState("")
  const [radioValue, setRadioValue] = useState(0) // 0 = unchecked, 1 = checked

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  console.log("countries", countries)
  const ismobile = useIsMobile(768)
  const [formDatas, setFormDatas] = useState({
    name: "",
    mobile: "",
    email_address: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    landmark: "",
  })

  const [fieldErrors, setFieldErrors] = useState({
    address: "",
    city: "",
    landmark: "",
  })

  // Character limits
  const CHAR_LIMITS = {
    address: 100,
    city: 50,
    landmark: 100,
  }
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "address":
        if (value.length > CHAR_LIMITS.address) {
          return `Address cannot exceed ${CHAR_LIMITS.address} characters`
        }
        break
      case "city":
        if (value.length > CHAR_LIMITS.city) {
          return `City cannot exceed ${CHAR_LIMITS.city} characters`
        }
        break
      case "landmark":
        if (value.length > CHAR_LIMITS.landmark) {
          return `Landmark cannot exceed ${CHAR_LIMITS.landmark} characters`
        }
        break
      default:
        return ""
    }
    return ""
  }

  const location = useLocation()
  const { cartItems, cartId, coupon_code, reward_points_used } =
    location.state || {}

  const giftData = localStorage.getItem("Gift")
  const parsedData = JSON.parse(giftData)
  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()
  const {
    isLoading: generateOrderIdLoading,
    success: generateOrderIdSuccess,
    error: generateOrderIdError,
    sendRequest: generateOrderIdRequest,
  } = useApiHttp()
  const {
    isLoading: placeOrderLoading,
    success: placeOrderSuccess,
    error: placeOrderError,
    sendRequest: placeOrderRequest,
  } = useApiHttp()

  const placeOrderHandler = async () => {
    if (cartItems?.subscription_details?.has_subscription) {
      // const formData = new FormData();
      sendRequest(
        {
          url: "user/home/subscription-order-id",
          // method: "post",
          // body: formData,
        },
        response => {
          const formData = new FormData()
          formData.append
          formData.append
          formData.append
          formData.append
          formData.append
          sendRequest(
            {
              url: "user/order/subscription-place",
              method: "post",
              body: {
                order_id: response.data.id,
                payment_id: "fa6sdf6asddf7",
                signature: "675sdf67576",
                address_id: selectedAddress?.id,
                cart_ids: cartId,
              },
            },
            response => {
              //  console.log("Order Placed:", placeData);
              dispatch(countApi())
              navigate("/user/ordersuccess", {
                state: {
                  orderDetails: response?.data,
                },
              })
            }
          )
        }
      )
    } else {
      const res = await loadRazorpayScript()
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?")
        return
      }

      // Step 1: Generate Razorpay Order ID
      generateOrderIdRequest(
        {
          url: `user/order/generate-id`,
          method: "post",
          body: {
            coupon_code: coupon_code,
            points: reward_points_used,
            cart_ids: cartId, // adjust based on how many cart IDs you pass
          },
        },
        response => {
          const currency = "INR"
          const {
            id: orderId,
            key: razorpayKey,
            amount,
            cart_ids,
          } = response.data

          if (!orderId) {
            alert("Failed to create order ID")
            return
          }

          // Step 2: Configure Razorpay Options
          const options = {
            key: razorpayKey, // Replace with your Razorpay key
            amount: amount * 100, // Amount in paise
            currency: currency,
            name: "Kadhaster Books",
            description: "Book Order",
            // image: "/logo192.png", // Optional: your logo
            order_id: orderId,
            handler: function (response) {
              // Step 3: Place Order on Success
              const {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              } = response
              placeOrderRequest(
                {
                  url: `user/order/place`,
                  method: "post",
                  body: {
                    order_id: razorpay_order_id,
                    payment_id: razorpay_payment_id,
                    signature: razorpay_signature,
                    address_id: selectedId, // From your state
                    cart_ids: cartId,
                    coupon_code,
                    reward_points_used,
                    gift_recipient: parsedData || null,
                  },
                },
                placeData => {
                  console.log("Order Placed:", placeData)
                  dispatch(countApi())
                  navigate("/user/ordersuccess", {
                    state: {
                      orderDetails: placeData?.data,
                    },
                  })
                  localStorage.removeItem("Gift")
                }
              )
            },
            prefill: {
              name: selectedAddress?.name,
              email: selectedAddress?.mail,
              contact: selectedAddress?.mobile,
            },
            notes: {
              address: selectedAddress?.addres,
            },
            theme: {
              color: "#3399cc",
            },
          }

          const rzp1 = new window.Razorpay(options)
          rzp1.open()
        }
      )
    }
  }
  const handleAddAddressList = () => {
    sendRequest(
      {
        url: `user/profile/list/address`,
      },
      data => {
        console.log("Book data received:", data)
        const defAddr = data?.data?.default_address?.[0]
        const otherAddr = data?.data?.addresses?.[0]
        setSelectedId(defAddr?.id || otherAddr?.id || null)
        setAllDAta(data?.data)
        // const preSelected = data?.data?.books?.map(book => book.id) || []
        // setSelected(preSelected)
      }
    )
  }
  const handleAddAddressSubmit = () => {
    // Validate character limits first
    const newErrors = {
      address: validateField("address", formDatas.address),
      city: validateField("city", formDatas.city),
      landmark: validateField("landmark", formDatas.landmark),
    }

    setFieldErrors(newErrors)

    // Check if there are any validation errors
    const hasValidationErrors = Object.values(newErrors).some(
      error => error !== ""
    )
    if (hasValidationErrors) {
      return
    }

    const requiredFields = [
      "name",
      "mobile",
      "email_address",
      "address",
      "city",
      "pincode",
      "state",
      "country",
    ]
    const missing = requiredFields.filter(field => !formDatas[field])

    if (missing.length > 0) {
      setSnackbarMessage(
        `Please fill all required fields: ${missing.join(", ")}`
      )
      setOpenSnackbar(true)
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formDatas.email_address)) {
      setSnackbarMessage("Please enter a valid email address.")
      setOpenSnackbar(true)
      return
    }
    const mobileRegex = /^(\+91|0)?[6-9]\d{9}$/
    if (!mobileRegex.test(formDatas.mobile)) {
      setSnackbarMessage("Please enter a valid 10-digit mobile number.")
      setOpenSnackbar(true)
      return
    }

    const pincodeRegex = /^[1-9][0-9]{5}$/
    if (!pincodeRegex.test(formDatas.pincode)) {
      setSnackbarMessage("Please enter a valid 6-digit pincode.")
      setOpenSnackbar(true)
      return
    }

    if (type === "add") {
      sendRequest(
        {
          url: `user/profile/add/address`,
          method: "post",
          body: {
            name: formDatas.name,
            phone_number: formDatas.mobile,
            email: formDatas.email_address,
            address_line: formDatas.address,
            city: formDatas.city,
            state: formDatas.state,
            country: formDatas.country,
            postal_code: formDatas.pincode,
            landmark: formDatas.landmark,
            is_default: radioValue,
          },
        },
        data => {
          console.log("Address Added:", data)
          handleAddAddressList() // Refresh address list
          handleClosesetOpenAddUser() // Close modal and reset form
        }
      )
    } else {
      sendRequest(
        {
          url: `user/profile/update/address`,
          method: "PUT",
          body: {
            address_id: addressId,
            name: formDatas.name,
            phone_number: formDatas.mobile,
            email: formDatas.email_address,
            address_line: formDatas.address,
            city: formDatas.city,
            state: formDatas.state,
            country: formDatas.country,
            postal_code: formDatas.pincode,
            landmark: formDatas.landmark,
            is_default: radioValue,
          },
        },
        data => {
          handleAddAddressList() // Refresh address list
          handleClosesetOpenAddUser() // Close modal and reset form
        }
      )
    }
  }

  useEffect(() => {
    handleAddAddressList()
  }, [])

  const handleToggle = id => {
    setSelectedId(id)
  }
  const allAddresses = [
    ...(allData?.default_address || []),
    ...(allData?.addresses || []),
  ]

  // const allAddresses = [...DefaultAddress, ...OtherAddress]
  const selectedAddress = allAddresses.find(addr => addr.id === selectedId)
  // const selectedAddress = allAddresses.find(addr => addr.id === selectedId)
  // const selectedAddress = allData?.default_address
  //   ?.concat(allData?.addresses || [])
  //   ?.find(addr => addr.id === selectedId)

  // const selectedAddress = OtherAddress.filter(book => selectedId === book.id)
  console.log("selectedAddress", selectedAddress)

  // const total = selectedAddress.reduce((sum, b) => sum + b.price, 0)
  const handleClear = () => {
    setFormDatas({
      name: "",
      mobile: "",
      email_address: "",
      address: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
      landmark: "",
    })

    setFieldErrors({
      address: "",
      city: "",
      landmark: "",
    })
  }
  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
    handleClear()
  }
  //  name: "",
  //     mobile: "",
  //     email_address: "",
  //     address: "",
  //     city: "",
  //     pincode: "",
  //     state: "",
  //     country: "",
  //     landmark: "",
  const handlerRecipientName = e => {
    const { name, value } = e.target
    setFormDatas({ ...formDatas, name: value })
  }
  const handlerMobile = e => {
    const { name, value } = e.target
    setFormDatas({ ...formDatas, mobile: value })
  }
  const handlerEmail = e => {
    const { name, value } = e.target
    setFormDatas({ ...formDatas, email_address: value })
  }
  const handlerAddress = e => {
    const { value } = e.target
    setFormDatas({ ...formDatas, address: value })
    setFieldErrors({ ...fieldErrors, address: validateField("address", value) })
  }
  const handlerCity = e => {
    const { value } = e.target
    setFormDatas({ ...formDatas, city: value })
    setFieldErrors({ ...fieldErrors, city: validateField("city", value) })
  }
  const handlerPincode = e => {
    const { name, value } = e.target
    setFormDatas({ ...formDatas, pincode: value })
  }
  const handlerState = e => {
    const { name, value } = e.target
    // setFormDatas({ ...formDatas, state: value })
    setFormDatas({ ...formDatas, state: value })
  }
  const handlerCountry = e => {
    const { name, value } = e.target

    // setFormDatas({ ...formDatas, country: value })
    setFormDatas({ ...formDatas, country: value, state: "" })
  }
  const handlerLandmark = e => {
    const { value } = e.target
    setFormDatas({ ...formDatas, landmark: value })
    setFieldErrors({
      ...fieldErrors,
      landmark: validateField("landmark", value),
    })
  }

  const handlerAddAndEdite = (type, data) => {
    setOpenAdduser(true)
    setType(type)
    if (type === "edit") {
      setAddressId(data?.id)
      console.log("data=>data=>", data)

      setFormDatas({
        name: data?.contact_name || "",
        mobile: data?.contact_number || "",
        email_address: data?.contact_email || "",
        address: data?.address_line || "",
        city: data?.city || "",
        pincode: data?.pincode || "",
        state: data?.state || "",
        country: data?.country || "",
        landmark: data?.landmark || "",
      })
      setRadioValue(data?.is_default)
    }
  }

  // const handlerAddAndEdite = (type, data) => {
  //   setOpenAdduser(true)
  //   setType(type)

  //   if (type === "edit") {
  //     setAddressId(data?.id)

  //     // Wait until countries are loaded before setting country & state
  //     if (countries.length > 0) {
  //       setFormDatas({
  //         name: data?.contact_name || "",
  //         mobile: data?.contact_number || "",
  //         email_address: data?.contact_email || "",
  //         address: data?.address_line || "",
  //         city: data?.city || "",
  //         pincode: data?.pincode || "",
  //         state: data?.state || "",
  //         country: data?.country || "",
  //         landmark: data?.landmark || "",
  //       })
  //     } else {
  //       // If countries are not loaded yet, set data after loading
  //       const checkCountriesInterval = setInterval(() => {
  //         if (countries.length > 0) {
  //           setFormDatas({
  //             name: data?.contact_name || "",
  //             mobile: data?.contact_number || "",
  //             email_address: data?.contact_email || "",
  //             address: data?.address_line || "",
  //             city: data?.city || "",
  //             pincode: data?.pincode || "",
  //             state: data?.state || "",
  //             country: data?.country || "",
  //             landmark: data?.landmark || "",
  //           })
  //           clearInterval(checkCountriesInterval)
  //         }
  //       }, 50)
  //     }

  //     setRadioValue(data?.is_default)
  //   }
  // }

  const handleRemoveItem = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Address?",
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
        sendRequest(
          {
            url: `user/profile/delete/address`,
            method: "DELETE",
            body: {
              address_id: id,
            },
          },
          res => {
            Swal.fire({
              title: "Deleted!",
              text: "Address deleted successfully.",
              icon: "success",
              background: "#373737",
              customClass: {
                popup: "my-swal-popup",
              },
            }).then(() => {
              // Optionally show success message or toast
              handleAddAddressList()
            })
          }
        )
      }
    })
  }

  const handleToggledefaultaddress = () => {
    setRadioValue(prev => (prev === 1 ? 0 : 1))
  }

  useEffect(() => {
    // Load countries on mount
    const indiaCountry = Country.getAllCountries().find(c => c.isoCode === "IN")
    setCountries(indiaCountry ? [indiaCountry] : [])
    // setCountries(Country.getAllCountries())
  }, [])

  useEffect(() => {
    if (formDatas.country) {
      const selectedCountry = countries.find(c => c.name === formDatas.country)
      if (selectedCountry) {
        setStates(State.getStatesOfCountry(selectedCountry.isoCode))
      }
    }
  }, [formDatas.country, countries])

  return (
    <>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate(-1)}>Cart</span> &gt;{" "}
        <span className={styles.active}>Address</span>
      </div>
      <h3 className={styles.hide}>Select Shipping Address</h3>
      <div className={styles.cartContainer}>
        <div className={styles.cartLeft}>
          <div className={styles.default_set}>
            <p className={styles.default_set_title}>Default Address</p>
            {allData?.default_address?.map(book => (
              <AddresItem
                key={book.id}
                item={book}
                selected={selectedId === book.id}
                onToggle={() => handleToggle(book.id)}
                onEdit={() => handlerAddAndEdite("edit", book)}
                onRemove={() => handleRemoveItem(book.id)}
              />
            ))}
          </div>
          <div>
            <div className={styles.addAddress}>
              <p className={styles.default_set_title}>Other Address</p>
              <p
                className={styles.AddNewAddress}
                onClick={() => handlerAddAndEdite("add")}
              >
                + Add New Address
              </p>
            </div>

            {allData?.addresses?.map(book => (
              <AddresItem
                key={book.id}
                item={book}
                selected={selectedId === book.id}
                onToggle={() => handleToggle(book.id)}
                onEdit={() => handlerAddAndEdite("edit", book)}
                onRemove={() => handleRemoveItem(book.id)}
              />
            ))}
          </div>
        </div>

        <div className={styles.cartRight}>
          <div className={styles.priceBox}>
            <h4>Price Details</h4>

            <div className={styles.total}>
              <p>Sub Total</p>
              <p className={styles.total_span}>
                ₹ {cartItems?.price_details?.sub_total}
              </p>
            </div>
            <div className={styles.discount}>
              <p>Discount</p>
              <p className={styles.discount_price}>
                -₹ {cartItems?.price_details?.discount_amount}
              </p>
            </div>
            <div className={styles.totalLine}>
              <p>Total Amount</p>
              <p className={styles.total_price}>
                ₹ {cartItems?.price_details?.total_price}
              </p>
            </div>
            <button
              className={styles.continueBtn}
              disabled={
                !selectedId || generateOrderIdLoading || placeOrderLoading
              }
              onClick={placeOrderHandler}
            >
              {placeOrderLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
      {openAdduser && (
        <BoostrapDialog
          open={openAdduser}
          handleClose={handleClosesetOpenAddUser}
          showCloseIcon={false}
          customWidth={"650px"}
          overflowY={"auto"}
          children={
            <>
              <div className={styles.addUser}>
                <h3 className={styles.addUserHeader}>
                  {type === "edit" ? "Edit Address" : "Add Address"}
                </h3>
                <div className={styles.addUserForm}>
                  <div className={styles.addUserInput}>
                    <div className={styles.input_text_filed}>
                      <CustomTextField
                        id="Full Name"
                        // label="Story Book Offer Price"
                        placeholder="Full Name"
                        variant="outlined"
                        value={formDatas?.name}
                        sx={{
                          width: "100%",
                        }}
                        onChange={handlerRecipientName}
                        // error={offerPriceHasError}
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
                        onChange={handlerMobile}
                        // error={offerPriceHasError}
                        // onBlur={offerPriceBlurHandler}
                        // // helperText={nameHasError ? "Enter the email" : null}
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                        required
                      />
                    </div>
                    <CustomTextField
                      id="EmailAddress"
                      // label="Story Book Offer Price"
                      placeholder="Email Address"
                      variant="outlined"
                      value={formDatas?.email_address}
                      sx={{
                        width: "100%",
                      }}
                      onChange={handlerEmail}
                      // error={offerPriceHasError}
                      // onBlur={offerPriceBlurHandler}
                      // // helperText={nameHasError ? "Enter the email" : null}
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      required
                    />

                    <div className={styles.input_text_filed}>
                      <CustomTextField
                        id="address"
                        // label="Story Book Offer Price"
                        placeholder="Door No, Street, Locality"
                        variant="outlined"
                        value={formDatas?.address}
                        sx={{
                          width: "100%",
                        }}
                        onChange={handlerAddress}
                        // error={offerPriceHasError}
                        // onBlur={offerPriceBlurHandler}
                        // // helperText={nameHasError ? "Enter the email" : null}
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                        helperText={
                          fieldErrors.address ||
                          `${formDatas.address.length}/${CHAR_LIMITS.address} characters`
                        }
                        error={!!fieldErrors.address}
                        inputProps={{ maxLength: CHAR_LIMITS.address }}
                        required
                      />
                    </div>

                    <div className={styles.input_text_filed}>
                      <CustomTextField
                        id="Town/City"
                        // label="Story Book Offer Price"
                        placeholder="Town/City"
                        variant="outlined"
                        value={formDatas?.city}
                        sx={{
                          width: "100%",
                        }}
                        onChange={handlerCity}
                        error={!!fieldErrors.city}
                        helperText={
                          fieldErrors.city ||
                          `${formDatas.city.length}/${CHAR_LIMITS.city} characters`
                        }
                        inputProps={{ maxLength: CHAR_LIMITS.city }}
                        required
                      />
                      <CustomTextField
                        id="Pincode"
                        // label="Story Book Offer Price"
                        placeholder="Pincode"
                        variant="outlined"
                        value={formDatas?.pincode}
                        sx={{
                          width: "100%",
                        }}
                        onChange={handlerPincode}
                        // error={offerPriceHasError}
                        // onBlur={offerPriceBlurHandler}
                        // // helperText={nameHasError ? "Enter the email" : null}
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                        required
                      />
                    </div>
                    <div className={styles.input_text_filed}>
                      {/* countryData stateData */}

                      <CustomeSlecter
                        data={countries.map(a => ({
                          label: a.name,
                          value: a.name,
                        }))}
                        title="Country"
                        width={ismobile ? "100%" : "287px"}
                        value={formDatas?.country}
                        onChange={e => {
                          handlerCountry(e)
                          // setAge(e.target.value)
                        }}
                        borders={true}
                        required
                      />
                      <CustomeSlecter
                        data={states.map(a => ({
                          label: a.name,
                          value: a.name,
                        }))}
                        title="State"
                        width={ismobile ? "100%" : "287px"}
                        value={formDatas?.state}
                        onChange={e => {
                          handlerState(e)
                          // setAge(e.target.value)
                        }}
                        borders={true}
                        required
                      />
                    </div>
                    <CustomTextField
                      id="Landmark"
                      // label="Story Book Offer Price"
                      placeholder="Landmark"
                      variant="outlined"
                      value={formDatas?.landmark}
                      sx={{
                        width: "100%",
                      }}
                      onChange={handlerLandmark}
                      error={!!fieldErrors.landmark}
                      helperText={
                        fieldErrors.landmark ||
                        `${formDatas.landmark.length}/${CHAR_LIMITS.landmark} characters`
                      }
                      inputProps={{ maxLength: CHAR_LIMITS.landmark }}
                      required
                    />
                  </div>
                  <div className={styles.Mark}>
                    <CustomRadio
                      selected={radioValue === 1}
                      onToggle={handleToggledefaultaddress}
                    />
                    <p>Mark as default address</p>
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
                      onClick={handleAddAddressSubmit}
                    >
                      {type === "edit" ? "Update Address" : " Add Address"}
                    </button>
                  </div>
                </div>
              </div>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </>
          }
        />
      )}
    </>
  )
}

export default Address
