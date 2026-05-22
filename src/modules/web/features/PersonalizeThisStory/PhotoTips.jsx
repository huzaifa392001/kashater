import React, { useEffect, useRef, useState } from "react"
import styles from "./PhotoTips.module.css"
import { FaInfoCircle, FaTimes } from "react-icons/fa"
import image1 from "../../assets/image/png/1.png"
import image2 from "../../assets/image/png/2.png"
import image3 from "../../assets/image/png/3.png"
import image4 from "../../assets/image/png/4.png"
import image5 from "../../assets/image/png/5.png"
import image6 from "../../assets/image/png/6.png"
import image7 from "../../assets/image/png/7.png"
import image8 from "../../assets/image/png/8.png"
import tike from "../../assets/image/png/tike.png"
import BoostrapDialog from "../../components/UI/Dialog/BoostrapDialog"

const PhotoTips = prop => {
  const { isMobile } = prop
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const tipsRef = useRef(null)

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = e => {
      if (tipsRef.current && !tipsRef.current.contains(e.target)) {
        closeTips()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const openTips = () => {
    setIsClosing(false)
    setIsOpen(true)
  }

  const closeTips = () => {
    if (!isOpen) return
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 300)
  }

  return (
    <div className={styles.photoTipsWrapper}>
      <button className={styles.toggleBtn} onClick={openTips}>
        <FaInfoCircle /> Photo Uploading Tips
      </button>
      {isMobile ? (
        <>
          {isOpen && (
            <BoostrapDialog
              open={isOpen}
              handleClose={closeTips}
              showCloseIcon={false}
              customWidth={"600px"}
              overflowY={"auto"}
              children={
                <>
                  <div
                    className={`${styles.tipsBox} ${
                      isMobile && styles.ismobile
                    }`}
                  >
                    <div className={styles.tipsHeader}>
                      <div>
                        <h4>Tips for the Perfect Photo!</h4>
                      </div>
                      <FaTimes
                        className={styles.closeBtn}
                        onClick={closeTips}
                      />
                    </div>
                    <p className={styles.tipsHeader_sub}>
                      To ensure the character appears clearly in the
                      personalised book, follow these photo guidelines:
                    </p>

                    <ul>
                      <li>1 clear headshot of the person</li>
                      <li>Solo photo only — no one else in the frame</li>
                      <li>The face should be looking straight and smiling</li>
                      <li>Use a plain white or light background</li>
                    </ul>
                    <div className={styles.tipsHeader}>
                      <h4>Make sure the photo:</h4>
                    </div>

                    <ul>
                      <li>Is bright, clear, and natural</li>
                      <li>Is front-facing, with shoulders straight</li>
                      <li>Does not include sunglasses, caps, or filters</li>
                      <li>Is not blurry, overexposed, or pixelated</li>
                      <li>Is in JPG or PNG format, under 5MB</li>
                      <li>Has a resolution of at least 1000 x 1000 px</li>
                    </ul>

                    <div className={styles.Helper}>
                      <div
                        className={styles.toggleBtn}
                        style={{
                          width: "100%",
                          textWrap: "wrap",
                          height: "auto",
                          borderRadius: "4px",
                          alignItems: "start",
                        }}
                      >
                        <FaInfoCircle /> Strict data privacy is our commitment.
                        Your information is handled with the utmost care and in
                        accordance with robust standards.
                      </div>
                    </div>
                    <div
                      className={styles.tipsHeader}
                      style={{ marginTop: "20px" }}
                    >
                      <h4>Need Help?</h4>
                    </div>
                    <p className={styles.tipsHeader_sub}>
                      See our sample photo below for an ideal example!
                    </p>
                    <div className={styles.photo_set}>
                      <div className={styles.photo_set_left}>
                        <img src={image1} alt="image1" />

                        <p>
                          <img src={tike} alt="tike" />
                          Perfect Photo!
                        </p>
                      </div>
                      <div className={styles.photo_set_right}>
                        <img src={image2} alt="image1" />
                        <img src={image3} alt="image1" />
                        <img src={image4} alt="image1" />
                        <img src={image5} alt="image1" />
                        <img src={image6} alt="image1" />
                        <img src={image7} alt="image1" />
                        <img src={image8} alt="image1" />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          )}
        </>
      ) : (
        <>
          {isOpen && (
            <div
              ref={tipsRef}
              className={`${styles.tipsBox} 
            ${isClosing ? styles.closing : styles.opening}`}
            >
              <div className={styles.tipsHeader}>
                <div>
                  <h4>Tips for the Perfect Photo!</h4>
                </div>
                <FaTimes className={styles.closeBtn} onClick={closeTips} />
              </div>
              <p className={styles.tipsHeader_sub}>
                To ensure the character appears clearly in the personalised
                book, follow these photo guidelines:
              </p>

              <ul>
                <li>1 clear headshot of the person</li>
                <li>Solo photo only — no one else in the frame</li>
                <li>The face should be looking straight and smiling</li>
                <li>Use a plain white or light background</li>
              </ul>
              <div className={styles.tipsHeader}>
                <h4>Make sure the photo:</h4>
              </div>

              <ul>
                <li>Is bright, clear, and natural</li>
                <li>Is front-facing, with shoulders straight</li>
                <li>Does not include sunglasses, caps, or filters</li>
                <li>Is not blurry, overexposed, or pixelated</li>
                <li>Is in JPG or PNG format, under 5MB</li>
                <li>Has a resolution of at least 1000 x 1000 px</li>
              </ul>

              <div className={styles.Helper}>
                <div
                  className={styles.toggleBtn}
                  style={{
                    width: "100%",
                    textWrap: "wrap",
                    height: "auto",
                    borderRadius: "4px",
                    alignItems: "start",
                  }}
                >
                  <FaInfoCircle /> Strict data privacy is our commitment. Your
                  information is handled with the utmost care and in accordance
                  with robust standards.
                </div>
              </div>
              <div className={styles.tipsHeader} style={{ marginTop: "20px" }}>
                <h4>Need Help?</h4>
              </div>
              <p className={styles.tipsHeader_sub}>
                See our sample photo below for an ideal example!
              </p>
              <div className={styles.photo_set}>
                <div className={styles.photo_set_left}>
                  <img src={image1} alt="image1" />

                  <p>
                    <img src={tike} alt="tike" />
                    Perfect Photo!
                  </p>
                </div>
                <div className={styles.photo_set_right}>
                  <img src={image2} alt="image1" />
                  <img src={image3} alt="image1" />
                  <img src={image4} alt="image1" />
                  <img src={image5} alt="image1" />
                  <img src={image6} alt="image1" />
                  <img src={image7} alt="image1" />
                  <img src={image8} alt="image1" />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default PhotoTips
