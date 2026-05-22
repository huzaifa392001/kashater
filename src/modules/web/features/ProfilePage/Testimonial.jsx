import React, { useEffect, useState } from "react"
import styles from "./Testimonial.module.css"
import testimonialIcon from "../../../web/assets/image/svg/testimony_icon.svg" // Update with the correct path to your image
import MinHeightTextarea from "../../components/UI/TextArea/Textarea"
import CustomRadio from "../../components/UI/CustomRadio/CustomRadio"
import useApiHttp from "../../hooks/ues-http"
import Swal from "sweetalert2"
import { Alert, Snackbar } from "@mui/material"
import CustomSwal from "../../utils/customSwal"

const Testimonial = () => {
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
        CustomSwal.successIcon(
          { title: "Submitted!", text: response.message },
          () => {
            // Reset the form after submission
            setSubmittedTestimonial(testimonial)
            setTestimonial("")
            setRadioValue(false)
            setOpenSnackbar(false)
          }
        )
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

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Testimonial</h2>
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
      ) : (
        <>
          <div
            style={{
              border: "1px solid #E3C417",
              borderRadius: "5px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 20px",
                gap: "10px",
                // backgroundColor: "#FDF6E3",
              }}
            >
              <img alt="icon" src={testimonialIcon} />
              <span
                style={{
                  fontFamily: "Merriweather",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Please submit your testimonial and get exciting reward points!
              </span>
            </div>
          </div>
          <div
            style={{
              marginBottom: "20px",
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
              Share your experience and get reward points!
            </p>
            <span
              style={{
                fontFamily: "Merriweather",
                fontWeight: "300",
                fontSize: "12px",
                lineHeight: "163%",
                letterSpacing: "0%",
                color: "#FFFFFF80",
              }}
            >
              (Comment about your experience.)
            </span>
          </div>
          <MinHeightTextarea
            maxLength={500}
            placeholder="Write your testimonial here..."
            name="testimonial"
            rows={15}
            showpertext={`${testimonial.length}/500 words`}
            onChange={handleChange}
            value={testimonial}
            style={{ marginTop: "10px", marginBottom: "20px" }}
          />
          <div className={styles.Mark}>
            <div>
              <CustomRadio
                selected={radioValue === 1}
                onToggle={handleRadioToggle}
              />
            </div>

            <p>
              By submitting, you agree to allow your testimonial to be featured
              on our website.
            </p>
          </div>
          <button
            className={`${styles.continueBtn} ${styles.width_cont}`}
            onClick={handleSubmitTestimonial}
            disabled={!testimonial.trim() || !radioValue}
          // style={{
          //     backgroundColor: testimonial.trim() && radioValue ? "#E3C417" : "#E3C41780",
          //     cursor: testimonial.trim() && radioValue ? "pointer" : "not-allowed",
          // }}
          >
            Submit
          </button>
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
      )}
    </div>
  )
}

export default Testimonial
