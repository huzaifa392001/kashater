import React, { useEffect, useState } from "react";

// images
import add_address_ic from "../../website/assets/image/add-address-ic.png";
import delete_address_ic from "../../website/assets/image/delete-address-ic.png";
import edit_address_ic from "../../website/assets/image/edit-address-ic.png";

import { Footer } from "../components/footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useIsMobile from "../../web/hooks/useIsMobile";
import useApiHttp from "../../web/hooks/ues-http";
import { Country, State } from "country-state-city"
import Swal from "sweetalert2"
import loadRazorpayScript from "../../web/utils/razorpay";
import { countApi } from "../../web/services/storeSlice/addCart";
import AddresItem from "../../web/components/Page/Addres/Addres";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert"
import BoostrapDialog from "../../web/components/UI/Dialog/BoostrapDialog";
import styles from "../../web/features/MyCart/MyCartPage.module.css"
import CustomTextField from "../../web/components/UI/TextFiled/TextFiled";
import CustomeSlecter from "../../web/components/UI/Dropdown/Select"
import CustomRadio from "../../web/components/UI/CustomRadio/CustomRadio";
import { Modal } from "react-bootstrap";
import warning from "../../website/assets/image/warning.png";
import circle from "../../website/assets/image/circle.png";
import CustomTextFieldLogin from "../../web/components/UI/TextFiled/TextFiledLogin";
import CustomeSlecterBlack from "../../admin/components/UI/Dropdown/CustomeSlecterBlack";
import CustomeSlecterWhite from "../../admin/components/UI/Dropdown/CustomeSlecterWhite";
import { countriesList, stateList } from "../../web/utils/Country"

const Alert = React.forwardRef(function Alert(props, ref) {
    return (
        <MuiAlert
            sx={{
                color: "white", width: "100%",
                fontSize: {
                    xs: "16px",
                    sm: "18px",
                    md: "20px",
                },
                "& .MuiAlert-message": {
                    width: "100%",
                },
            }}
            elevation={6}
            ref={ref}
            variant="filled"
            {...props}
        />
    )
})

export default function AddressPage() {
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
    const [openAdduser7, setOpenAdduser7] = useState(false)
    const [openAdduser8, setOpenAdduser8] = useState(false)

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
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

    // const [fieldErrors, setFieldErrors] = useState({
    //     address: "",
    //     city: "",
    //     landmark: "",
    // })

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


    const handleClosesetOpenAddUser7 = () => {
        setOpenAdduser7(false)
    }

    const handleClosesetOpenAddUser8 = (id) => {
        handleAddAddressList()
        setOpenAdduser8(false)
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

    const handleAddAddressSubmitOld = () => {
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

        const selectedCountry = countriesList.find(
            (country) => country.id == formDatas.country
        )

        const selectedState = stateList.find(
            (state) => state.id == formDatas.state
        )

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
                        state: selectedState?.name,
                        country: selectedCountry?.name,
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
                        state: selectedState?.name,
                        country: selectedCountry?.name,
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

    const handleAddAddressSubmit = () => {
        let errors = {}

        // Name validation
        if (!formDatas.name || formDatas.name.trim().length < 3) {
            errors.name = "Name must be at least 3 characters"
        }

        // Mobile validation
        const mobileRegex = /^[6-9]\d{9}$/
        if (!mobileRegex.test(formDatas.mobile)) {
            errors.mobile = "Enter valid 10 digit mobile number"
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formDatas.email_address)) {
            errors.email = "Enter valid email address"
        }

        // Address validation
        if (!formDatas.address || formDatas.address.trim().length < 10) {
            errors.address = "Address must be at least 10 characters"
        }

        // City validation
        if (!formDatas.city || formDatas.city.trim().length < 3) {
            errors.city = "Enter valid city name"
        }

        // Pincode validation
        const pincodeRegex = /^[1-9][0-9]{5}$/
        if (!pincodeRegex.test(formDatas.pincode)) {
            errors.pincode = "Enter valid 6 digit pincode"
        }

        // Country validation
        if (!formDatas.country) {
            errors.country = "Please select country"
        }

        // State validation
        if (!formDatas.state) {
            errors.state = "Please select state"
        }

        // Landmark validation
        if (formDatas.landmark && formDatas.landmark.length > 100) {
            errors.landmark = "Landmark cannot exceed 100 characters"
        }

        // set errors
        setFieldErrors(errors)

        // if errors exist stop submit
        if (Object.keys(errors).length > 0) {
            return
        }


        const selectedCountry = countriesList.find(
            (country) => country.id == formDatas.country
        )

        const selectedState = stateList.find(
            (state) => state.id == formDatas.state
        )

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
                        state: selectedState?.name,
                        country: selectedCountry?.name,
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
                        state: selectedState?.name,
                        country: selectedCountry?.name,
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
        setStates([])
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
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "")
        setFormDatas({ ...formDatas, name: value })

        if (value.trim().length < 3) {
            setFieldErrors({ ...fieldErrors, name: "Name must be at least 3 characters" })
        } else {
            setFieldErrors({ ...fieldErrors, name: "" })
        }
    }
    const handlerMobile = e => {
        let value = e.target.value.replace(/\D/g, "")

        if (value.length === 1 && !/[6-9]/.test(value)) return
        if (value.length > 10) return

        setFormDatas({ ...formDatas, mobile: value })

        if (value.length < 10) {
            setFieldErrors({ ...fieldErrors, mobile: "Enter valid 10 digit mobile number" })
        } else {
            setFieldErrors({ ...fieldErrors, mobile: "" })
        }
    }
    const handlerEmail = e => {
        let value = e.target.value.replace(/\s/g, "")

        setFormDatas({ ...formDatas, email_address: value })

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(value)) {
            setFieldErrors({ ...fieldErrors, email: "Enter valid email address" })
        } else {
            setFieldErrors({ ...fieldErrors, email: "" })
        }
    }
    const handlerAddress = e => {
        const { value } = e.target

        let error = ""

        if (value.trim().length < 10) {
            error = "Address must be at least 10 characters"
        } else if (value.length > 150) {
            error = "Address cannot exceed 150 characters"
        }

        setFormDatas({ ...formDatas, address: value })
        setFieldErrors({ ...fieldErrors, address: error })
    }
    const handlerCity = e => {
        let value = e.target.value.replace(/[^a-zA-Z\s]/g, "")

        let error = ""

        if (value.trim().length < 3) {
            error = "City must be at least 3 characters"
        }

        setFormDatas({ ...formDatas, city: value })
        setFieldErrors({ ...fieldErrors, city: error })
    }
    const handlerPincode = e => {
        let value = e.target.value.replace(/\D/g, "")

        if (value.length === 1 && value === "0") return
        if (value.length > 6) return

        setFormDatas({ ...formDatas, pincode: value })

        if (value.length < 6) {
            setFieldErrors({ ...fieldErrors, pincode: "Enter valid 6 digit pincode" })
        } else {
            setFieldErrors({ ...fieldErrors, pincode: "" })
        }
    }
    const handlerState = e => {
        const { value } = e.target

        let error = ""

        if (!value) {
            error = "Please select a state"
        }

        setFormDatas({ ...formDatas, state: value })
        setFieldErrors({ ...fieldErrors, state: error })
    }
    const handlerCountry = e => {
        const { value } = e.target

        let error = ""

        if (!value) {
            error = "Please select a country"
        }

        setFormDatas({ ...formDatas, country: value, state: "" })

        let finderState = stateList?.filter(i => i?.country_id == value)

        setStates(finderState)

        setFieldErrors({ ...fieldErrors, country: error })
    }
    const handlerLandmark = e => {
        let value = e.target.value.replace(/[^a-zA-Z0-9\s,.-]/g, "")

        let error = ""

        if (value.length > 100) {
            error = "Landmark cannot exceed 100 characters"
        }

        setFormDatas({ ...formDatas, landmark: value })

        setFieldErrors({
            ...fieldErrors,
            landmark: error,
        })
    }

    const handlerAddAndEdite = (type, data) => {
        setOpenAdduser(true)
        setType(type)
        if (type === "edit") {
            setAddressId(data?.id)
            console.log("data=>data=>", data)

            const selectedCountry = countriesList.find((country) => country.name == data?.country)
            const selectedState = stateList.find((state) => state.name == data?.state)

            let finderState = stateList?.filter((i) => i?.country_id == selectedCountry?.id)
            setStates(finderState)

            setFormDatas({
                name: data?.contact_name || "",
                mobile: data?.contact_number || "",
                email_address: data?.contact_email || "",
                address: data?.address_line || "",
                city: data?.city || "",
                pincode: data?.pincode || "",
                state: selectedState?.id || "",
                country: selectedCountry?.id || "",
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
        sendRequest(
            {
                url: `user/profile/delete/address`,
                method: "DELETE",
                body: {
                    address_id: id,
                },
            },
            res => {
                setOpenAdduser7(false)
                setOpenAdduser8(true)
            }
        )
    }

    const handleToggledefaultaddress = () => {
        setRadioValue(prev => (prev === 1 ? 0 : 1))
    }

    useEffect(() => {
        // Load countries on mount
        // const indiaCountry = Country.getAllCountries().find(c => c.isoCode === "IN")
        // setCountries(indiaCountry ? [indiaCountry] : [])
        // setCountries(Country.getAllCountries())
        const indiaCountry = countriesList.filter(c => c.sortname === "IN")
        setCountries(indiaCountry)
    }, [])

    // useEffect(() => {
    //     if (formDatas.country) {
    //         const selectedCountry = countries.find(c => c.name === formDatas.country)
    //         if (selectedCountry) {
    //             setStates(State.getStatesOfCountry(selectedCountry.isoCode))
    //         }
    //     }
    // }, [formDatas.country, countries])



    const customRadio = {
        width: "20px",
        height: "20px",
        border: "2px solid #fff",
        borderColor: "#fff",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        position: "relative",
    }

    const radioSelected = {
        width: "20px",
        height: "20px",
        border: "2px solid #fff",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        position: "relative",
        borderColor: "#fff",
    }

    const radioDot = {
        width: "10px",
        height: "10px",
        backgroundColor: '#fff',
        borderRadius: "50%",
    }

    return (
        <>
            <section className="address-page">
                <div className="container">

                    {/* Breadcrumb */}
                    <p className="breadcrumb-section text-dark">
                        <span className="p_new" onClick={() => navigate(-1)}>Cart</span> &gt; <a href=""><span>Address</span></a>
                    </p>
                    <div className="d-flex flex-wrap ">
                        <div className="col-lg-7 col-12">
                            <div className="address-page-content">
                                <h2 className="title-30px">Select Shipping Address</h2>
                                <div className="default-field mt_25">
                                    <h3 className="title-20px text-dark">Default Address</h3>
                                    <div className="default-address mt_25">
                                        {allData?.default_address?.map(book => {
                                            return (
                                                <AddresItem
                                                    key={book.id}
                                                    item={book}
                                                    selected={selectedId === book.id}
                                                    onToggle={() => handleToggle(book.id)}
                                                    onEdit={() => handlerAddAndEdite("edit", book)}
                                                    // onRemove={() => handleRemoveItem(book.id)}
                                                    onRemove={() => setOpenAdduser7(book.id)}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="line mt-3 mb-3"></div>
                                <h3 className="title-20px mt-3 text-dark">Other Address</h3>
                                <div className="default-address mt_25">
                                    {allData?.addresses?.map(book => {
                                        return (
                                            <AddresItem
                                                key={book.id}
                                                item={book}
                                                selected={selectedId === book.id}
                                                onToggle={() => handleToggle(book.id)}
                                                onEdit={() => handlerAddAndEdite("edit", book)}
                                                // onRemove={() => handleRemoveItem(book.id)}
                                                onRemove={() => setOpenAdduser7(book.id)}
                                            />
                                        )
                                    })}
                                </div>
                                <div className="add-address-section mt_25" role="button" onClick={() => handlerAddAndEdite("add")}>
                                    <img src={add_address_ic} alt="" />
                                    <span className="text-dark">Add a New Delivery Address</span>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-12 ps-lg-3 ps-0 mt-lg-0 mt-4">
                            <div className="price-det-card">
                                <h3 className="text-dark">Price Details</h3>
                                <span className="text-dark">1 Items</span>
                                <div className="price-info">
                                    <h4 className="text-dark">Sub Total</h4>
                                    <h4 className="text-dark">₹ {cartItems?.price_details?.sub_total}</h4>
                                </div>
                                <div className="price-info">
                                    <h4 className="text-dark">Discount</h4>
                                    <h4 className="clr-red">-₹ {cartItems?.price_details?.discount_amount}</h4>
                                </div>
                                <div className="line"></div>
                                <div className="price-info">
                                    <h4 className="text-dark">Total Amount</h4>
                                    <h4 className="text-dark"> ₹ {cartItems?.price_details?.total_price}</h4>
                                </div>
                                <div className="btn-pur text-center" >
                                    <button type="" disabled={
                                        !selectedId || generateOrderIdLoading || placeOrderLoading
                                    }
                                        onClick={placeOrderHandler}> {placeOrderLoading ? "Placing Order..." : "Continue"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                            <h3 className={styles.addUserHeader}>  {type === "edit" ? "Edit Address" : "Add Address"}</h3>
                            <div className={styles.addUserForm}>
                                <div className={styles.addUserInput}>
                                    <div className={styles.input_text_filed}>
                                        <CustomTextFieldLogin
                                            id="Full Name"
                                            // label="Story Book Offer Price"
                                            placeholder="Full Name"
                                            variant="outlined"
                                            value={formDatas?.name}
                                            sx={{
                                                width: "100%",
                                            }}
                                            onChange={handlerRecipientName}

                                            error={!!fieldErrors.name}
                                            helperText={fieldErrors.name}
                                            // error={offerPriceHasError}
                                            // onBlur={offerPriceBlurHandler}
                                            // // helperText={nameHasError ? "Enter the email" : null}
                                            // InputLabelProps={{
                                            //   shrink: true,
                                            // }}
                                            required
                                        />
                                        <CustomTextFieldLogin
                                            id="MobileNumber"
                                            // label="Story Book Offer Price"
                                            placeholder="Mobile Number"
                                            variant="outlined"
                                            value={formDatas?.mobile}
                                            maxLength={10}
                                            sx={{
                                                width: "100%",
                                            }}
                                            onChange={(e) => {
                                                handlerMobile(e)
                                            }}
                                            error={!!fieldErrors.mobile}
                                            helperText={fieldErrors.mobile}

                                            // error={offerPriceHasError}
                                            // onBlur={offerPriceBlurHandler}
                                            // // helperText={nameHasError ? "Enter the email" : null}
                                            // InputLabelProps={{
                                            //   shrink: true,
                                            // }}
                                            required
                                        />
                                    </div>
                                    <CustomTextFieldLogin
                                        id="EmailAddress"
                                        // label="Story Book Offer Price"
                                        placeholder="Email Address"
                                        variant="outlined"
                                        value={formDatas?.email_address}
                                        sx={{
                                            width: "100%",
                                        }}
                                        onChange={handlerEmail}
                                        error={!!fieldErrors.email}
                                        helperText={fieldErrors.email}
                                        // error={offerPriceHasError}
                                        // onBlur={offerPriceBlurHandler}
                                        // // helperText={nameHasError ? "Enter the email" : null}
                                        // InputLabelProps={{
                                        //   shrink: true,
                                        // }}
                                        required
                                    />

                                    <div className={styles.input_text_filed}>
                                        <CustomTextFieldLogin
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
                                        <CustomTextFieldLogin
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
                                        <CustomTextFieldLogin
                                            id="Pincode"
                                            // label="Story Book Offer Price"
                                            placeholder="Pincode"
                                            variant="outlined"
                                            value={formDatas?.pincode}
                                            sx={{
                                                width: "100%",
                                            }}
                                            onChange={handlerPincode}
                                            error={!!fieldErrors.pincode}
                                            helperText={fieldErrors.pincode}
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

                                        {/* <CustomeSlecter
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
                                        /> */}

                                        {/* <CustomeSlecter
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
                                        /> */}
                                        {/* <CustomeSlecterWhite
                                            data={countries.map(a => ({
                                                label: a.name,
                                                value: a.id,
                                            }))}
                                            title="Country"
                                            width={ismobile ? "100%" : "287px"}
                                            value={formDatas?.country}
                                            error={!!fieldErrors.country}
                                            helperText={fieldErrors.country}
                                            onChange={e => {
                                                handlerCountry(e)
                                                // setAge(e.target.value)
                                            }}
                                            borders={true}
                                            required
                                        />
                                        <CustomeSlecterWhite
                                            data={states.map(a => ({
                                                label: a.name,
                                                value: a.id,
                                            }))}
                                            title="State"
                                            width={ismobile ? "100%" : "287px"}
                                            value={formDatas?.state}
                                            onChange={e => {
                                                handlerState(e)
                                                // setAge(e.target.value)
                                            }}
                                            error={!!fieldErrors.state}
                                            helperText={fieldErrors.state}
                                            borders={true}
                                            required
                                        /> */}
                                        <div className="w-100">
                                            <select
                                                id="consent"
                                                name="consent"
                                                className="custom-select-native-transparent"
                                                value={formDatas?.country}
                                                onChange={e => {
                                                    handlerCountry(e)
                                                }}
                                            >
                                                <option value="">Country</option>
                                                {countries?.map((item, ind) => {
                                                    return (
                                                        <option value={item?.id} key={ind}>{item?.name}</option>
                                                    )
                                                })}
                                            </select>
                                            {!!fieldErrors.country && <p className="popup_design-err">{fieldErrors.country}</p>}
                                        </div>
                                        <div className="w-100">
                                            <select
                                                id="consent"
                                                name="consent"
                                                className="custom-select-native-transparent"
                                                value={formDatas?.state}
                                                onChange={e => {
                                                    handlerState(e)
                                                }}
                                            >
                                                <option value="">State</option>
                                                {states?.map((item, ind) => {
                                                    return (
                                                        <option value={item?.id} key={ind}>{item?.name}</option>
                                                    )
                                                })}
                                            </select>
                                            {!!fieldErrors.state && <p className="popup_design-err">{fieldErrors.state}</p>}
                                        </div>
                                    </div>
                                    <CustomTextFieldLogin
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
                                <div className={'d-flex gap-2 align-items-center mt-2'}>
                                    <div
                                        style={radioValue === 1 ? radioSelected : customRadio}
                                        className={`${styles.customRadio} ${radioValue === 1 ? styles.radioSelected : ""
                                            }`}
                                        onClick={() => handleToggledefaultaddress()}
                                    >
                                        {radioValue === 1 && <div style={radioDot} />}
                                    </div>
                                    <p className="text-white">Mark as default address</p>
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
                                        onClick={handleAddAddressSubmit}
                                    >
                                        {type === "edit" ? "Update Address" : " Add Address"}
                                    </button>
                                </div>
                            </div>
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
            </Modal>



            <Modal show={openAdduser7}
                backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
                keyboard={false}
                onHide={() => handleClosesetOpenAddUser7()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
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
                                            Do you want to delete this Address?
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
                size="lg"
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
                                        <h1 className={styles.title}>Deleted!</h1>
                                        <p className={styles.description}>
                                            Address deleted successfully.
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
            <Footer />
        </>
    );
}