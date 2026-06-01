// import linkedin_icon from "../../assets/image/svg/linkedin.svg"
// import facebook_icon from "../../assets/image/svg/facebook.svg"
// import twitter_icon from "../../assets/image/svg/twitter.svg"
// import logo_l from "../../assets/image/png/logo-l.png"
// import classes from "../../pages/Landing/landing.module.css"
// import CustomTextField from "../../../web/components/UI/TextFiled/TextFiled"
// import MinHeightTextarea from "../../../web/components/UI/TextArea/Textarea"
// import styles from "../../../web/features/MyCart/MyCartPage.module.css"
// import BoostrapDialog from "../../../web/components/UI/Dialog/BoostrapDialog"
// import { Controller, useForm } from "react-hook-form"
// import useApiHttp from "../../../web/hooks/ues-http"
// import Swal from "sweetalert2"
// import { CircularProgress } from "@mui/material"
// import { useState } from "react"
// import { NavLink } from "react-router-dom"
// export const Footer = () => {
//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     },
//   })
//   const { isLoading, sendRequest } = useApiHttp()
//   const [open, setOpen] = useState(false)
//   const toggleContact = state => {
//     return () => setOpen(state)
//   }
//   const onSubmit = async data => {
//     const formData = new FormData()
//     formData.append("name", data.name)
//     formData.append("email", data.email)
//     formData.append("subject", data.subject)
//     formData.append("message", data.message)
//     await sendRequest(
//       {
//         url: "user/home/new-contact",
//         body: formData,
//         method: "POST",
//       },
//       response => {
//         console.log("success")
//         toggleContact(false)()
//         Swal.fire({
//           title: "Submitted",

//           icon: "success",
//           background: "#373737",
//           customClass: {
//             popup: "my-swal-popup",
//           },
//           confirmButtonColor: "#3085d6",

//           confirmButtonText: "ok",
//         })
//       }
//     )
//   }
//   return (
//     <>
//       {isLoading && (
//         <section
//           style={{
//             width: "100%",
//             display: "grid",
//             placeItems: "center",
//             height: "100%",
//             position: "fixed",
//             zIndex: "1400",
//             top: "0",
//             left: "0",
//             backgroundColor: "rgba(0,0,0,0.8)",
//           }}
//         >
//           <CircularProgress color="secondary" size="5rem" />
//         </section>
//       )}
//       <BoostrapDialog
//         open={open}
//         handleClose={toggleContact(false)}
//         showCloseIcon={false}
//         customWidth={"620px"}
//         overflowY={"unset"}
//         rootStyle={{
//           borderRadius: "20px",
//         }}
//         children={
//           <div className={styles.addUser} style={{ padding: "40px 30px" }}>
//             <h3 className={styles.addUserHeader}>
//               We’d Love to Hear From You!
//             </h3>
//             <div className={styles.addUserForm}>
//               <div className={styles.gift_header}>
//                 <div style={{ width: "100%" }}>
//                   {/* <h4>We’d Love to Hear From You!</h4> */}
//                   <p
//                     style={{
//                       textAlign: "center",

//                       fontFamily: "var(--font-regular-Inter)",
//                       color: "#ffffff60",
//                       maxWidth: "450px",
//                       margin: "10px auto",
//                     }}
//                   >
//                     Have a question, feedback, or need help? Fill out the form
//                     below and our team will get back to you as soon as possible.
//                   </p>
//                 </div>
//               </div>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 autoComplete="off"
//                 noValidate
//               >
//                 <div className={styles.addUserInput}>
//                   <div className={styles.input_text_filed}>
//                     <Controller
//                       name="name"
//                       control={form.control}
//                       rules={{
//                         required: "Full Name is required",
//                       }}
//                       render={({ field, fieldState }) => {
//                         return (
//                           <CustomTextField
//                             id="RecipientName"
//                             // label="Full Name"
//                             placeholder="Full Name"
//                             variant="outlined"
//                             // value={formDatas?.name}
//                             sx={{
//                               width: "100%",
//                             }}
//                             // onChange={HandlerRecipientName}
//                             error={fieldState?.error}
//                             // onBlur={offerPriceBlurHandler}
//                             helperText={fieldState?.error?.message}
//                             // InputLabelProps={{
//                             //   shrink: true,
//                             // }}
//                             {...field}
//                             //   required
//                           />
//                         )
//                       }}
//                     />
//                     <Controller
//                       name="email"
//                       control={form.control}
//                       rules={{
//                         validate: {
//                           isValid: value => {
//                             return (
//                               /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
//                                 value
//                               ) || "invalid email format"
//                             )
//                           },
//                         },
//                       }}
//                       render={({ field, fieldState }) => {
//                         return (
//                           <CustomTextField
//                             id=""
//                             // label="Email Address"
//                             placeholder="Email Address"
//                             variant="outlined"
//                             // value={formDatas?.mobile}
//                             sx={{
//                               width: "100%",
//                             }}
//                             {...field}
//                             error={fieldState.error}
//                             helperText={fieldState.error?.message}
//                           />
//                         )
//                       }}
//                     />
//                   </div>
//                   <Controller
//                     name="subject"
//                     rules={{
//                       required: "Subject is required",
//                     }}
//                     control={form.control}
//                     render={({ field, fieldState }) => {
//                       return (
//                         <CustomTextField
//                           id=""
//                           //   label="Subject"
//                           placeholder="Subject"
//                           variant="outlined"
//                           // value={formDatas?.mobile}
//                           sx={{
//                             width: "100%",
//                             mb: 2,
//                           }}
//                           {...field}
//                           error={fieldState.error}
//                           helperText={fieldState.error?.message}
//                           // rules={{
//                           //   required: "Full Name is required",
//                           // }}
//                         />
//                       )
//                     }}
//                   />
//                   <Controller
//                     rules={{
//                       required: "message is required",
//                     }}
//                     control={form.control}
//                     name="message"
//                     render={({ field, fieldState }) => {
//                       return (
//                         <MinHeightTextarea
//                           maxLength="255"
//                           label="Message"
//                           title="Message"
//                           name="Message"
//                           rows={4}
//                           //   value={formDatas.description}
//                           placeholder="Message"
//                           //   showpertext={`${charsLeft}/255`}
//                           //   onChange={handleChange}
//                           error={!!fieldState.error}
//                           errorMessage={fieldState.error?.message}
//                           style={{ borderRadius: "12px" }}
//                           {...field}
//                         />
//                       )
//                     }}
//                   />
//                 </div>
//                 <div className={styles.btn_group}>
//                   <button
//                     className={styles.cancel}
//                     onClick={toggleContact(false)}
//                     type="button"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className={`${styles.continueBtn} ${styles.width_cont}`}
//                     //   onClick={handleGiftSubmit}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         }
//       />
//       <footer className={`${classes.footer}`}>
//         <section className={`${classes.container} `}>
//           <nav
//             className={`${classes.footer__navigation}  ${classes.section__space} `}
//           >
//             <section>
//               <img
//                 src={logo_l}
//                 className={`${classes.footer__logo}`}
//                 alt="company logo"
//               />
//               <ul className={`${classes.footer__icons}`}>
//                 <li>
//                   <a href="#">
//                     <img src={facebook_icon} alt="facebook icon" />
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#">
//                     <img src={linkedin_icon} alt="linkedin icon" />
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#">
//                     <img src={twitter_icon} alt="twitter icon" />
//                   </a>
//                 </li>
//               </ul>
//             </section>
//             <section>
//               <h6>Site</h6>
//               <ul>
//                 <li>
//                   <a href="/#">Home</a>
//                 </li>
//                 <li>
//                   <a href="/#howitworks">How it Works ?</a>
//                 </li>
//                 <li>
//                   <a href="/#features">Our Features</a>
//                 </li>
//                 <li>
//                   <a href="/#stories">Our Stories</a>
//                 </li>
//                 {/* <li>
//                   <a href="/#pricing">Pricing & Plans</a>
//                 </li> */}
//                 <li>
//                   <a href="/#testimonial">Testimonial</a>
//                 </li>
//               </ul>
//             </section>
//             <section>
//               <h6>Explore</h6>
//               <ul>
//                 <li>
//                   <NavLink to="/about">About Us</NavLink>
//                 </li>
//                 <li>
//                   <p
//                     style={{ marginBottom: "0" }}
//                     onClick={toggleContact(true)}
//                   >
//                     Contact Us
//                   </p>
//                 </li>
//                 <li>
//                   <NavLink to="/terms-condition">Terms and Conditions</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/privacy-policy">Privacy Policy</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/faq">Frequently Asked Questions</NavLink>
//                 </li>
//               </ul>
//             </section>
//             <section>
//               <h6>OFFICE LOCATION</h6>
//               <p>ABC Company, 123 East, 17th Street, St. louis 10001</p>
//               <a href="mailto:support@kadhaster.com">support@kadhaster.com</a>
//               <a href="#">(123) 456-7890</a>
//             </section>
//           </nav>
//           <div className={`${classes.divider}`}></div>
//           <section>Copyright © 2025 Kadhaster. All Rights Reserved.</section>
//         </section>
//       </footer>
//     </>
//   )
// }

import linkedin_icon from "../../assets/image/svg/linkedin.svg"
import facebook_icon from "../../assets/image/svg/facebook.svg"
import instagram_icon from "../../assets/image/svg/instagram.png"
import youtube_icon from "../../assets/image/svg/youtube.png"
import twitter_icon from "../../assets/image/svg/twitter.svg"
import logo_l from "../../assets/image/png/logo-l.png"
import classes from "../../pages/Landing/landing.module.css"
import CustomTextField from "../../../web/components/UI/TextFiled/TextFiled"
import MinHeightTextarea from "../../../web/components/UI/TextArea/Textarea"
import styles from "../../../web/features/MyCart/MyCartPage.module.css"
import BoostrapDialog from "../../../web/components/UI/Dialog/BoostrapDialog"
import { Controller, useForm } from "react-hook-form"
import useApiHttp from "../../../web/hooks/ues-http"
import Swal from "sweetalert2"
import { CircularProgress } from "@mui/material"
import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { Modal } from "react-bootstrap"
import CustomTextFieldLogin from "../../../web/components/UI/TextFiled/TextFiledLogin"
import circle from "../../../website/assets/image/circle.png";
import PhoneNumInput2 from "../../../web/components/UI/PhoneNumInput/PhoneNumInput2"

export const Footer = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      mobile: "", // Added mobile field
    },
  })

  const { isLoading, sendRequest } = useApiHttp()
  const [open, setOpen] = useState(false)

  const toggleContact = state => {
    return () => setOpen(state)
  }

  const phoneNumPattern = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{9})$/;


  const [openAdduser8, setOpenAdduser8] = useState(false);

  const handleClosesetOpenAddUser8 = (id) => {
    setOpenAdduser8(false)
  }

  const onSubmit = async data => {
    await sendRequest(
      {
        url: "user/home/form/contact-us",
        body: {
          name: data.name,
          email: data.email,
          country_code: data.mobile.dialCode,
          mobile_number: data.mobile.mobile,
          subject: data.subject,
          message: data.message,
        },
        method: "POST",
      },
      response => {
        console.log("success")
        toggleContact(false)()
        form.reset() // Reset form after successful submission
        setOpenAdduser8('Submitted!')
        // Swal.fire({
        //   title: "Submitted",
        //   icon: "success",
        //   background: "#373737",
        //   customClass: {
        //     popup: "my-swal-popup",
        //   },
        //   confirmButtonColor: "#3085d6",
        //   confirmButtonText: "ok",
        // })
      },
      error => {
        // Handle error case
        setOpenAdduser8('Failed to submit form. Please try again.')
        Swal.fire({
          title: "Error",
          text: "Failed to submit form. Please try again.",
          icon: "error",
          background: "#373737",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        })
      }
    )

  }

  return (
    <>
      {isLoading && (
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


      <Modal show={open}
        backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
        keyboard={false}
        onHide={() => toggleContact(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div className="p-3 popup_design">
          <div>
            <div className={styles.addUser}>
              <h3 className={styles.addUserHeader}>We'd Love to Hear From You!</h3>
              <div className={styles.addUserForm}>
                <div className={styles.gift_header}>
                  <div style={{ width: "100%" }}>
                    <p
                      style={{
                        textAlign: "center",

                        fontFamily: "var(--font-regular-Quicksand)",
                        color: "#ffffff60",
                        maxWidth: "450px",
                        margin: "10px auto",
                      }}
                    >
                      Have a question, feedback, or need help? Fill out the form
                      below and our team will get back to you as soon as possible.
                    </p>
                  </div>
                </div>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  autoComplete="off"
                  noValidate
                >
                  <div className={styles.addUserInput}>
                    <div className={styles.input_text_filed}>
                      {/* Name Field */}
                      <Controller
                        name="name"
                        control={form.control}
                        rules={{
                          required: "Full Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <CustomTextFieldLogin
                            id="name"
                            placeholder="Full Name"
                            variant="outlined"
                            sx={{ width: "100%" }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            {...field}
                          />
                        )}
                      />

                      {/* Email Field */}
                      <Controller
                        name="email"
                        control={form.control}
                        rules={{
                          required: "Email is required",
                          validate: {
                            isValid: value => {
                              return (
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                                  value
                                ) || "Invalid email format"
                              )
                            },
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <CustomTextFieldLogin
                            id="email"
                            placeholder="Email Address"
                            variant="outlined"
                            sx={{ width: "100%" }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            {...field}
                          />
                        )}
                      />
                    </div>
                    {/* Mobile Field */}
                    <Controller
                      name="mobile"
                      control={form.control}
                      rules={{
                        required: "Mobile number is required",
                        validate: (value) => {
                          const digits = value?.full?.replace(/\D/g, "") || "";

                          const countryCodeLength = value?.dialCode?.length || 0;
                          const nationalNumber = digits.slice(countryCodeLength);

                          if (nationalNumber.length < 8 || nationalNumber.length > 13) {
                            return "Enter valid mobile number";
                          }

                          return true;
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <div className="mb-4">
                          <PhoneNumInput2
                            value={field.value?.full || ""}
                            onChange={(value, country) => {
                              const digits = value.replace(/\D/g, "");

                              const countryCodeLength = country.dialCode.length;
                              const nationalNumber = digits.slice(countryCodeLength);

                              field.onChange({
                                full: value,
                                dialCode: country.dialCode,
                                mobile: nationalNumber, // ✅ ONLY local number (no 91)
                              });
                            }}
                            error={fieldState.error}
                          />

                          {fieldState.error && (
                            <p style={{ fontSize: "12px" }}>
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                    {/* Subject Field */}
                    <Controller
                      name="subject"
                      control={form.control}
                      rules={{
                        required: "Subject is required",
                        minLength: {
                          value: 3,
                          message: "Subject must be at least 3 characters",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <CustomTextFieldLogin
                          id="subject"
                          placeholder="Subject"
                          variant="outlined"
                          sx={{ width: "100%", mb: 2 }}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      )}
                    />

                    {/* Message Field */}
                    <Controller
                      name="message"
                      control={form.control}
                      rules={{
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                        maxLength: {
                          value: 255,
                          message: "Message must not exceed 255 characters",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <MinHeightTextarea
                          maxLength="255"
                          label="Message"
                          title="Message"
                          name="message"
                          rows={4}
                          placeholder="Your message..."
                          error={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          style={{ borderRadius: "12px" }}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div className={"d-flex justify-content-center gap-3 mt-3 mb-3"}>
                    <button
                      className={'cancel_btn'}
                      onClick={toggleContact(false)}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className={'sumt_btn'}
                      type="submit"
                      // onClick={() => onSubmit()}
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>


              </div>
            </div>

          </div>
        </div>
      </Modal>


      <footer className={`${classes.footer}`}>
        <section className={`${classes.container} `}>
          <nav
            className={`${classes.footer__navigation}  ${classes.section__space} `}
          >
            <div className="df f-w jc as">
              <div className="col-lg-3 col-12 mt-4">
                <section>
                  <img
                    src={logo_l}
                    className={`${classes.footer__logo}`}
                    alt="company logo"
                  />
                  <ul className={`${classes.footer__icons}`} style={{ listStyleType: 'none' }}>
                    <li>
                      <a target={'_blank'} href="https://www.facebook.com/kadhaster">
                        <img src={facebook_icon} alt="facebook icon" />
                      </a>
                    </li>
                    <li>
                      <a target={'_blank'} href="https://www.linkedin.com/company/kadhaster-by-comicode/?viewAsMember=true">
                        <img src={linkedin_icon} alt="linkedin icon" />
                      </a>
                    </li>
                    <li>
                      <a target={'_blank'} href="https://www.instagram.com/kadhaster/">
                        <img src={instagram_icon} alt="instagram icon" />
                      </a>
                    </li>
                    <li>
                      <a target={'_blank'} href="https://www.youtube.com/@Kadhaster-s6">
                        <img src={youtube_icon} alt="youtube icon" />
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="col-lg-3 col-sm-6 col-12 mt-4">
                <section>
                  <h6>Site</h6>
                  <ul style={{ listStyleType: 'none' }}>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <a href="/#howitworks">How it Works ?</a>
                    </li>
                    <li>
                      <a href="/#features">Our Features</a>
                    </li>
                    <li>
                      <a href="/#stories">Our Stories</a>
                    </li>
                    <li>
                      <a href="/#testimonial">Testimonial</a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="col-lg-3 col-sm-6 col-12 mt-4 ">
                <section>
                  <h6>Explore</h6>
                  <ul >
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <p
                        style={{ marginBottom: "0", cursor: "pointer" }}
                        onClick={toggleContact(true)}
                      >
                        Contact Us
                      </p>
                    </li>
                    <li>
                      <Link to="/terms-condition">Terms and Conditions</Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="/faq">Frequently Asked Questions</Link>
                    </li>
                    <li>
                      <Link to="/Delivery-policy">Shipping & Delivery Policy</Link>
                    </li>
                    <li>
                      <Link to="/Refund-policy">Return, Refund & Cancellation Policy</Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="col-lg-3 col-12 mt-4">
                <section>
                  <h6>OFFICE</h6>
                  <p>
                    Comicode AI Solutions Pvt Ltd <br />
                    Reglo Group of Companies <br />
                    Unit No:505, 5th Floor, Gamma Block, SSPDL Alpha City IT Park, <br />
                    Building No:25, OMR(Rajiv Gandhi IT Express Highway) Navalur, <br />Chengalpattu Dt – 600130, Tamil Nadu. <br />
                  </p>
                  <a style={{ fontSize: '14px' }} href="mailto:support@kadhaster.com">support@kadhaster.com</a>
                  <a style={{ fontSize: '14px' }} href="tel:+91 8925925009">+91 8925925009</a>
                </section>
              </div>
            </div>
          </nav>
          <div className="text-center cop-rig mt-5">
            <section><p>Copyright © 2026 Comicode AI Solutions. All Rights Reserved.</p></section>
          </div>
        </section>
      </footer>


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
            <div className={'addUser'}>
              {/* <h3 className={styles.addUserHeader}>Choose Photo</h3> */}
              <div className={'addUserForm'}>
                <div className={'addUserInput'}>
                  <div className={'addUser_img'}>
                    <img src={circle} alt="alert" width={"100px"} />
                  </div>
                  <div className={'input_sets'}>
                    <h1 className={'title'}>{openAdduser8}</h1>
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
  )
}
