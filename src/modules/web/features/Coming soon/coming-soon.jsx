import { useState } from "react";
import './coming-soon.css';
import { Footer } from '../../../website/components/footer/footer';
import background_img from "../../assets/image/png/Coming soon.png";
import desktop_img from "../../assets/image/png/Coming soon.png";
import rocket_img from "../../assets/image/png/rocket.png";
import mobile_img from "../../assets/image/png/mobile-view.png";
import useApiHttp from "../../../web/hooks/ues-http";
import BoostrapDialog from "../../../web/components/UI/Dialog/BoostrapDialog";
import styles from "../../../web/features/MyCart/MyCartPage.module.css"
import { Controller, useForm } from "react-hook-form"
import headphone_icon from "../../assets/image/svg/head-phone.svg";
import CustomTextField from "../../../web/components/UI/TextFiled/TextFiled"
import MinHeightTextarea from "../../../web/components/UI/TextArea/Textarea"
import CustomTextFieldLogin from "../../components/UI/TextFiled/TextFiledLogin";
// import classes from "../../../web/features/Login/LoginForm/LoginForm.module.css"

const TodoList = () => {
  const { isLoading, sendRequest } = useApiHttp()
  const [loading, setLoading] = useState(false);
  const toggleContact = state => {
    return () => setOpen(state)
  }
  const [open, setOpen] = useState(false);
  const form = useForm();
  const onSubmit = async data => {
    await sendRequest(
      {
        url: "user/home/form/contact-us",
        body: {
          name: data.name,
          email: data.email,
          country_code: "91",
          mobile_number: data.mobile,
          subject: data.subject,
          message: data.message,
        },
        method: "POST",
      },
      response => {
        console.log("success")
        toggleContact(false)()
        form.reset() // Reset form after successful submission
        Swal.fire({
          title: "Submitted",
          icon: "success",
          background: "#373737",
          customClass: {
            popup: "my-swal-popup",
          },
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ok",
        })
      },
      error => {
        // Handle error case
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
      {/* <div className={classes.login_page}>
        <div className={classes.login_container}>

        </div>
      </div> */}
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
      {loading && (
        <section style={{
          width: "100%", display: "grid", placeItems: "center", height: "100%", position: "fixed",
          zIndex: "1400", top: "0", left: "0", backgroundColor: "rgba(0,0,0,0.8)",
        }}>
          <CircularProgress color="secondary" size="5rem" />
        </section>
      )}
      <BoostrapDialog
        open={open}
        handleClose={toggleContact(false)}
        showCloseIcon={false}
        customWidth={"620px"}
        overflowY={"unset"}
        rootStyle={{
          borderRadius: "20px",
        }}
        children={
          <div
            className={styles.addUser}
            style={{
              padding: "40px 30px",
              background: "linear-gradient(to bottom, #00000084 0%, #bc51ffb2 100%)",
              borderRadius: "15px",
            }}
          >
            <h3 className={styles.addUserHeader} style={{ fontFamily: "var(--font-regular-Quicksand)" }}>
              Contact Us
            </h3>
            <div className={styles.addUserForm}>
              <div className={styles.gift_header}>
                <div style={{ width: "100%" }}>
                  <p
                    style={{
                      textAlign: "center",

                      fontFamily: "var(--font-regular-Quicksand)",
                      color: "#ffff",
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
                      pattern: {
                        value: /^[0-9+\-\s()]{10,15}$/,
                        message: "Please enter a valid mobile number",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <CustomTextFieldLogin
                        id="mobile"
                        placeholder="Mobile Number"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field}
                      />
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
                <div className={styles.btn_group}>
                  <button
                    className={styles.cancel}
                    onClick={toggleContact(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`${styles.continueBtn} ${styles.width_cont}`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        }
      />
      <div class="coming-wrapper d-flex justify-content-center align-items-center">
        <div class="coming-card text-center p-5">
          <img src={rocket_img} class="coming-icon mb-4" alt="Rocket" />
          <h1 class="fw-bold mb-3 coming-title">We are coming soon</h1>
          <p class="coming-desc mb-4">
            We are almost there! It’s going to be amazing! <br />
            Contact us to find out when it’s ready.
          </p>
          {/* <div className="d-flex justify-content-center">
            <button class="btn coming-btn px-4 py-2" onClick={toggleContact(true)}>
              <img src={headphone_icon} alt="" /> Contact Us
            </button>
          </div> */}
        </div>
      </div>



      {/* <div
        className="coming-bg container-fluid text-white"
        style={{
          backgroundImage: window.innerWidth > 768
            ? `url(${desktop_img})`
            : `url(${mobile_img})`,
        }}
      >
      </div>
      <h1 className="coming-soon-head"> We are coming soon</h1>
      <p className="coming-soon-text">We are almost there! It's going to be amazing! <br />Contact us to find out when it's ready.</p> */}
      {/* <section className="button__primary__container1">
        <button
          className="button-primary"
          style={{ marginBottom: "0", cursor: "pointer" }}
          onClick={toggleContact(true)}
        >
          <img src={headphone_icon} alt="" />
          <p>Contact Us</p>
        </button>

      </section>
      <br /><br /><br /><br /><br /> */}
      <Footer />
    </>
  );
};

export default TodoList;

