import React, { useEffect, useState } from "react"

import remove from "../../assets/image/svg/remove.svg"
import edit from "../../assets/image/svg/edit.svg"

import styles from "./PersonalInformation.module.css"
import useApiHttp from "../../hooks/ues-http"
import UploadImage from "../../components/UI/ImageUplode/UploadImage"
import Swal from "sweetalert2"
import BoostrapDialog from "../../components/UI/Dialog/BoostrapDialog"
import { Snackbar } from "@mui/material"
import MuiAlert from "@mui/material/Alert"
import CustomTextField from "../../components/UI/TextFiled/TextFiled"
import CustomeSlecter from "../../components/UI/Dropdown/Select"
import CustomRadio from "../../components/UI/CustomRadio/CustomRadio"
import useInput from "../../utils/use-input"
import { validatePhoneNumber } from "../../utils/validation"
import PhoneNumInput from "../../components/UI/PhoneNumInput/PhoneNumInput"
import { authActions } from "../../services/storeSlice/authSlice"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import useIsMobile from "../../hooks/useIsMobile"
import { Country, State } from "country-state-city"

const countryData = [
  { id: "IN", name: "India" },
  { id: "US", name: "United States" },
  { id: "CA", name: "Canada" },
  { id: "GB", name: "United Kingdom" },
]
const stateData = [
  { id: "MH", name: "Maharashtra" },
  { id: "GJ", name: "Gujarat" },
  { id: "KA", name: "Karnataka" },
  { id: "DL", name: "Delhi" },
  { id: "TN", name: "Tamil Nadu" },
  { id: "RJ", name: "Rajasthan" },
]

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
const PersonalInformation = () => {
  const isTablet = useIsMobile(768)
  const isMobile = useIsMobile(500)
  const dispatch = useDispatch()
  const profileImage = useSelector(state => state.auth?.profile_picture)
  const [isMobileEdited, setIsMobileEdited] = useState(false)
  const [orderData, setOrderData] = useState([])
  const [imageUploadAlert, setImageUploadAlert] = useState(false)
  const [fileTypeError, setFileTypeError] = useState("")
  const [errorFileType, setErrorFileType] = useState("")
  const [fileUploadComplied, setFileUploadComplied] = useState(null)

  const [radioValue, setRadioValue] = useState(0)

  const [addressData, setAddressData] = useState({
    default_address: [],
    addresses: [],
  })

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])

  const [openAdduser, setOpenAdduser] = useState(false)
  const [open, setOpen] = useState(false)
  const [addressId, setAddressId] = useState("")
  const [type, setType] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
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

  const {
    value: enteredNum,
    rawPhone,
    dialCode,
    phoneIsValid: enteredNumIsValid,
    phoneHasError: enteredNumHasError,
    reactPhoneChangeHandler: phoneNumChangeHandler,
    inputBlurHandler: phoneNumBlurHandler,
    reset: resetPhoneNum,
  } = useInput(validatePhoneNumber)

  // console.log("rawPhone", rawPhone, dialCode, enteredNum)

  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const {
    isLoading: uplodeLoading,
    success: uplodeSuccess,
    error: uplodeError,
    sendRequest: uplodeRequest,
  } = useApiHttp()

  const {
    isLoading: mobileUpdateLoading,
    success: mobileUpdateSuccess,
    error: mobileUpdateError,
    sendRequest: mobileUpdateRequest,
  } = useApiHttp()

  const listApiCAll = () => {
    sendRequest(
      {
        url: `user/profile/personal-info`,
      },
      data => {
        setOrderData(data?.data)
        dispatch(authActions.setProfilePicture(data?.data?.profile_picture))
        setFileUploadComplied(data?.data?.profile_picture)
        phoneNumChangeHandler(data?.data?.mobile_number)
      }
    )
  }

  const addressListApiCAll = () => {
    sendRequest(
      {
        url: `user/profile/list/address`,
      },
      data => {
        setAddressData(data?.data)
      }
    )
  }
  useEffect(() => {
    listApiCAll()
    addressListApiCAll()
  }, [])

  useEffect(() => {
    if (fileTypeError) {
      handlerUploadStory()
    }
  }, [fileTypeError])

  const userData = {
    name: "Zaire Dokidis",
    joinDate: "May 2025",
    email: "zairedokidis@gmail.com",
    phoneNumbers: ["+91-98594 98593"],
    addresses: [
      {
        name: "Nilamaran Rajangam",
        address:
          "x4, Venu Avenue, Hijack Street, Kelambakkam, Chennai - 669326, Tamil Nadu, India.",
        contact: "nilamrali6993/9@gmail.com | +91-9849534990",
      },
      {
        name: "Nilamaran Rajangam",
        address:
          "x4, Venu Avenue, Hijack Street, Kelambakkam, Chennai - 669326, Tamil Nadu, India.",
        contact: "nilamrali6993/9@gmail.com | +91-9849534990",
      },
    ],
  }
  const handlerAddAndEdite = (type, data) => {
    setOpenAdduser(true)
    setType(type)
    if (type === "edit") {
      setAddressId(data?.id)
      // console.log("data=>data=>", data)

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
    }
  }

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
              addressListApiCAll()
            })
          }
        )
      }
    })
  }
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
  const handleClosesetOpen = () => {
    setOpen(false)
    resetPhoneNum()
    setIsMobileEdited(false)
  }
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
          // console.log("Address Added:", data)
          addressListApiCAll() // Refresh address list
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
          addressListApiCAll() // Refresh address list
          handleClosesetOpenAddUser() // Close modal and reset form
        }
      )
    }
  }
  const handleToggledefaultaddress = () => {
    setRadioValue(radioValue === 1 ? 0 : 1)
  }

  const handlerUploadStory = () => {
    if (!fileTypeError) {
      console.log("Form has errors. Please fix them.")
      return
    }

    const formData = new FormData()

    // Append files

    if (fileTypeError) {
      formData.append("picture", fileTypeError)
    }

    // Log formData contents properly
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value)
    // }
    // console.log("formData", formData)

    uplodeRequest(
      {
        url: "user/profile/update/profile-picture",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Add proper header
        },
      },
      data => {
        // console.log("Success:", data)
        setFileTypeError("")
      }
    )
  }
  const handleChangeNumber = () => {
    if (!rawPhone && !enteredNum) {
      setSnackbarMessage("Please enter your mobile number")
      setOpenSnackbar(true)
      return
    }

    mobileUpdateRequest(
      {
        url: "user/profile/update/mobile-number",
        method: "POST",
        body: {
          country_code: dialCode,
          mobile_number: rawPhone,
        },
      },
      data => {
        if (data.status === "error") {
          setSnackbarMessage(data?.message)
          setOpenSnackbar(true)
        }
        // toast.success("Mobile number updated successfully!")
        listApiCAll() // Refresh user data
        handleClosesetOpen() // Close dialog
        setIsMobileEdited(false)
      }
    )
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
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Personal Information</h2>

        <div className={styles.section_set}>
          <UploadImage
            name="profile_image_file"
            Lodingtime={uplodeLoading}
            onChange={() => handlerUploadStory()}
            setFileTypeError={setFileTypeError}
            setErrorFileType={setErrorFileType}
            setFileUploadComplied={setFileUploadComplied}
            fileUploadComplied={fileUploadComplied}
          />
          <div className={styles.infoBox}>
            <div className={styles.infoBoxHeader}>
              <div>
                <h2 className={styles.userName}>{orderData.name}</h2>
                <p className={styles.infoTitle}>
                  Member Since {orderData.created_date}
                </p>
              </div>
            </div>
            <div className={styles.infoBoxHeader}>
              <div className={styles.infoRow}>
                <h3 className={styles.infoTitle}>Email Address</h3>
                <p className={styles.infoValue}>{orderData.email}</p>
              </div>

              <div className={styles.infoRow}>
                <h3 className={styles.infoTitle}>Mobile Number</h3>
                <div className={styles.Mobile_set}>
                  <p className={styles.infoValue}>
                    +{orderData.country_code}-{orderData.mobile_number}
                  </p>
                  <button
                    className={styles.ChangeButton}
                    onClick={() => {
                      setOpen(true)
                      phoneNumChangeHandler(
                        `+${orderData.country_code}${orderData.mobile_number}`
                      )
                    }}
                  >
                    Change Mobile Number
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider}></div>

      {/* Saved Addresses Section */}
      <div className={styles.section}>
        <div className={styles.addressHeader}>
          <div className={styles.addressHeader_txt}>
            {" "}
            <h2 className={styles.sectionTitle}>Saved Addresses</h2>
            <p>{addressData?.count} Saved addresses</p>
          </div>

          <button
            className={styles.ChangeButton}
            onClick={() => handlerAddAndEdite("add")}
          >
            + Add New Address
          </button>
        </div>

        <div className={styles.addressGrid}>
          {addressData?.default_address?.map((address, index) => (
            <AddressCard
              key={index}
              data={address}
              default_address={true}
              onEdit={() => handlerAddAndEdite("edit", address)}
              onRemove={() => handleRemoveItem(address.id)}
            />
          ))}
          {addressData?.addresses?.map((address, index) => (
            <AddressCard
              key={index}
              data={address}
              onEdit={() => handlerAddAndEdite("edit", address)}
              onRemove={() => handleRemoveItem(address.id)}
            />
          ))}
        </div>
      </div>

      {open && (
        <BoostrapDialog
          open={open}
          handleClose={handleClosesetOpen}
          showCloseIcon={false}
          customWidth={"500px"}
          overflowY={"unset"}
          children={
            <>
              <div className={styles.addUser}>
                <h3
                  className={styles.addUserHeader}
                  style={{ marginBottom: "1rem" }}
                >
                  {"Change Mobile Number"}
                </h3>
                <div className={styles.addUserForm}>
                  <div className={styles.addUserInput}>
                    <PhoneNumInput
                      inputProps={{
                        name: "mobile_number",
                        required: true,
                        placeholder: "Enter your phone number",
                      }}
                      autoFormat={false}
                      value={enteredNum}
                      onChange={(value, data, e) => {
                        phoneNumChangeHandler(value, data, e)
                        setIsMobileEdited(true) // Set edited flag when user types
                      }}
                      defaultValue={orderData.mobile_number}
                      error={enteredNumHasError}
                      helperText={enteredNumHasError && "Invalid phone number"}
                      phoneHasError={enteredNumHasError}
                      onBlur={phoneNumBlurHandler}
                    />
                  </div>

                  <div className={styles.btn_group}>
                    <button
                      className={styles.cancel}
                      onClick={handleClosesetOpen}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.continueBtn} ${styles.width_cont}`}
                      onClick={handleChangeNumber}
                      disabled={
                        !enteredNumIsValid ||
                        !isMobileEdited || // Disable if not edited
                        rawPhone ===
                          `${orderData.country_code}${orderData.mobile_number}` // Disable if same as current
                      }
                    >
                      Change
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
                        error={!!fieldErrors.address}
                        helperText={
                          fieldErrors.address ||
                          `${formDatas.address.length}/${CHAR_LIMITS.address} characters`
                        }
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
                      <CustomeSlecter
                        data={countries.map(a => ({
                          label: a.name,
                          value: a.name,
                        }))}
                        title="Country"
                        width={isTablet ? "100%" : "287px"}
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
                        width={isTablet ? "100%" : "287px"}
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
  )
}
const AddressCard = ({ data, default_address, onRemove, onEdit }) => (
  <div
    className={`${styles.addressCard} ${default_address ? styles.active : ""}`}
  >
    <div className={styles.addressCardHeader}>
      <h3 className={styles.addressName}>{data?.contact_name}</h3>
    </div>
    <p className={styles.addressText}>
      {[
        data?.address_line,
        data?.landmark,
        data?.city,
        data?.state,
        data?.pincode,
        data?.country,
      ]
        .filter(Boolean) // removes null, undefined, and empty string
        .join(", ")}
      {/* {`${data.address_line}, ${data.landmark}, ${data.city}-${data.pincode}, ${data.state}, ${data.country}`} */}
    </p>
    <p className={styles.addressContact}>
      {data?.contact_email} | {`+${data?.country_code}-${data?.contact_number}`}
    </p>

    <div className={styles.btn_group}>
      <p className={styles.delete}>
        <img src={remove} alt="remove" style={{ width: "13px" }} />{" "}
        <a onClick={onRemove}>Remove</a>
      </p>
      <p className={styles.edite}>
        <img src={edit} alt="remove" style={{ width: "13px" }} />{" "}
        <a onClick={onEdit}>Edit</a>
      </p>
    </div>
  </div>
)

export default PersonalInformation
