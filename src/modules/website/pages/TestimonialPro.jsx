import React, { useEffect, useState } from "react";
import close_ic from "../../website/assets/image/close-ic.png";
import profile_test_ic from "../../website/assets/image/profile-test-ic.png";
import useApiHttp from "../../web/hooks/ues-http";
import { Modal } from "react-bootstrap";
import styles from "../../web/features/MyOrders/MyOrdersSet/MyOrdersSet.module.css";
import circle from "../../website/assets/image/circle.png";
import { Alert, Snackbar } from "@mui/material"

const TestimonialPro = () => {
    const [testimonial, setTestimonial] = useState("")
    const [radioValue, setRadioValue] = useState(0) // false for unchecked, true for checked
    const [submittedTestimonial, setSubmittedTestimonial] = useState(null) // Submitted Testimonial
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const { sendRequest: submitTestimony } = useApiHttp()
    const { sendRequest: getTestimony } = useApiHttp()

    const handleChange = event => {
        const { name, value } = event.target
        const maxChar = 500
        const truncatedValue = value.slice(0, maxChar)
        setTestimonial(truncatedValue)
    }

    const handleRadioToggle = () => {
        setRadioValue(prev => (prev === 1 ? 0 : 1)) // Toggle between 0 and 1
    }

    const [showPopup, setShowPopup] = useState(false)


    const handleShowPopupClose = () => {
        setSubmittedTestimonial(testimonial)
        setTestimonial("")
        setRadioValue(false)
        setOpenSnackbar(false)
        setShowPopup(false)
    }

    const handleSubmitTestimonial = () => {
        if (testimonial.trim() === "") {
            setOpenSnackbar(true)
            setSnackbarMessage("Please write your testimonial before submitting.")
            return
        }
        if (!radioValue) {
            setOpenSnackbar(true)
            setSnackbarMessage("Please agree to the terms before submitting.")
            return
        }
        // Handle the submission logic here
        submitTestimony(
            {
                url: `user/testimonial/user-testimonial`,
                method: "POST",
                body: {
                    description: testimonial,
                    consent: radioValue, // Convert to boolean
                },
            },
            response => {
                setShowPopup(true)
            }
        )
    }

    function getSubmittedTestimonial() {
        getTestimony(
            {
                url: `user/testimonial/get-testimonial`,
            },
            data => {
                setSubmittedTestimonial(data?.data)
            }
        )
    }

    useEffect(() => {
        //api to get submitted testimonial
        getSubmittedTestimonial()
        //   return () => {
        //     second
        //   }
    }, [])


    const customRadio = {
        width: "20px",
        height: "20px",
        border: "2px solid #8131bf",
        borderColor: "#000",
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
        border: "2px solid #8131bf",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        position: "relative",
        borderColor: '#8131bf',
    }

    const radioDot = {
        width: "10px",
        height: "10px",
        backgroundColor: '#8131bf',
        borderRadius: "50%",
    }

    return (
        <>
            <div className="rewards-info-cont">
                <h3>Testimonial</h3>
                {submittedTestimonial ? (
                    <div
                        style={{
                            marginTop: "50px",
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "Merriweather",
                                fontWeight: "700",
                                fontSize: "16px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                            }}
                        >
                            {submittedTestimonial}
                        </p>
                    </div>
                ) : <div>
                    <div className="testimo-alert my-4">
                        <div className="">
                            <div className="df">
                                <img className="prof-test" src={profile_test_ic} alt="" />
                                <p>
                                    Please submit your testimonial and get exiting reward
                                    points!
                                </p>
                            </div>
                        </div>
                        {/* <button>
                        <img className="" src={close_ic} alt="" />
                    </button> */}
                    </div>
                    <div className="testimo-cont">
                        <h4>  Share your experience and get reward points!</h4>
                        <p>(Comments about your experience.)</p>

                        <form action="" className="mt-4">
                            <textarea className="form-control" rows={14} placeholder="Enter your testimonial..." name="" id="" onChange={handleChange}
                                value={testimonial}>
                            </textarea>
                        </form>
                        <div className="words-count text-end">
                            {testimonial?.length}/500 words
                        </div>
                        <div className={'d-flex gap-2 align-items-center mt-2 mb-3'}>
                            <div
                                style={radioValue === 1 ? radioSelected : customRadio}
                                className={`${styles.customRadio} ${radioValue === 1 ? styles.radioSelected : ""
                                    }`}
                                onClick={() => handleRadioToggle()}
                            >
                                {radioValue === 1 && <div style={radioDot} />}
                            </div>
                            <p className="text-dark">By submitting, you agree to allow your testimonial to be featured on our website.</p>
                        </div>
                        <div className="btn-pur">
                            <button onClick={handleSubmitTestimonial}
                                disabled={!testimonial.trim() || !radioValue}>Submit</button>
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
                    </div>
                </div>}
            </div>

            <Modal show={showPopup}
                backdrop="static" // When backdrop is set to static, modal will not close when clicking outside it
                keyboard={false}
                onHide={() => handleShowPopupClose()}
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
                                        <h1 className={styles.title}>Submitted Successfully!</h1>
                                        <p className={styles.description}>
                                            Your testimonial has been successfully submitted! 🎉
                                            Our team will review it soon, and once approved, you'll earn reward points for your next order.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"d-flex justify-content-center mb-3"}>
                            <div>
                                <button
                                    className={'sumt_btn'}
                                    onClick={handleShowPopupClose}
                                >
                                    Great
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default TestimonialPro