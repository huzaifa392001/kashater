// BookPage.jsx
import React, { useEffect, useState } from "react"
import styles from "./Books.module.css"
import bookImage from "../../assets/image/jpg/dummy image 1.jpg"
import age from "../../assets/image/svg/age gift.svg"
import { useLocation, useNavigate } from "react-router-dom"
import useApiHttp from "../../hooks/ues-http"
import CustomButton from "../../components/UI/Button/Button"
import CarouselSingle from "../../components/UI/Carousel/CarouselSingle"
import CustomDialog from "../../components/UI/Dialog/Dialog"
import customize from "../../../web/assets/image/svg/customize cta.svg"
import play from "../../assets/image/svg/play.svg"
import { useDispatch } from "react-redux"
import { addCart, countApi } from "../../services/storeSlice/addCart"
import FileViewerLightbox from "../../components/UI/PdfView/Lightbox/LightboxImgPdf"
import PdfView from "../../components/UI/PdfView/PdfView"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import QuillDisplay from "../../../admin/components/UI/RichText/QuillDisplay"
import { Footer } from "../../../website/components/footer/footer"

const Books = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  let { storyId, name } = location.state || {}

  storyId = storyId || localStorage.getItem("storyId")
  name = name || localStorage.getItem("name")
  const [booksData, setBooksData] = useState([])
  const [openAdduser, setOpenAdduser] = useState(false)

  console.log("booksData", booksData?.is_added)

  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const listApiCAll = () => {
    sendRequest(
      {
        url: `user/products/book-view`,
        method: "POST",
        body: {
          name: name,
        },
      },
      data => {
        console.log("Book data received:", data)
        setBooksData(data?.data)
      }
    )
  }

  useEffect(() => {
    if (!name) {
      console.warn("No storyId provided in location state")
      return
    }
    listApiCAll()
    // return () => {
    //   localStorage.removeItem("storyId");
    // };
  }, [name])
  const handleClosesetOpenAddUser = () => {
    setOpenAdduser(false)
  }
  const handlePersonalizeStory = () => {
    navigate("/user/personalize_story", {
      state: {
        storyId: booksData?.id, // Your actual ID
        isdata: booksData,
      },
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate(-1)}>Library</span> &gt;{" "}
        <span className={styles.active}>{booksData?.name}</span>
      </div>

      {/* Hero Section with Image and Preview */}
      {booksData && (
        <section className={styles.heroContainer}>
          <div className={styles.heroContent_img}>
            <div className={styles.imageContainer}>
              {booksData?.book_cover && (
                <LazyLoadImage
                  loading="lazy"
                  src={booksData?.book_cover}
                  alt="Book Cover"
                  className={styles.bookImage}
                  effect="blur"
                  placeholderSrc={booksData?.book_cover}
                />
              )}
            </div>

            {/* <FileViewerLightbox fileUrl={booksData?.story_file} /> */}
            {/* <p
              className={styles.Sample_Preview}
              onClick={() => setOpenAdduser(true)}
            >
              {" "}
              <img src={play} alt="play" />
              Sample Preview
            </p> */}
          </div>

          <div className={styles.heroContent}>
            <h1 className={styles.title}>{booksData?.name}</h1>
            <p className={styles.description}>
              {/* {booksData.description} */}
              <QuillDisplay content={booksData?.description} />
            </p>

            <p className={styles.ageRecommendation}>
              <img src={age} alt="age" /> Recommended for ages{" "}
              {booksData.age_group}
            </p>

            {/* <p className={styles.personalize}>
              Personalize it with your child’s name and make their backyard
              adventure unforgettable! 🚀✨
            </p> */}
            {/* <div className={styles.priceContainer}>
              <div className={styles.price}>₹ {booksData?.price}</div>
              <div className={styles.discountBadge}> ₹ {booksData?.mrp}</div>
            </div> */}
            <div className={styles.price_main_box}>
              <div className={styles.price_box}>
                <div className={styles.price_header_set}>
                  <h3>Individual Book</h3>
                  <div className={styles.price_tags}>
                    {booksData?.mrp && booksData?.price && (
                      <p className={`${styles.label_tag} ${styles.save}`}>
                        Save{" "}
                        {Math.round(
                          ((Number(booksData.mrp) - Number(booksData.price)) /
                            Number(booksData.mrp)) *
                          100
                        )}
                        %
                      </p>
                    )}
                    {/* <p className={`${styles.label_tag} ${styles.poular}`}>
                      Most Popular
                    </p> */}
                  </div>
                </div>
                <p className={styles.personalized}>
                  1 personalized storybook from your selected genre
                </p>
                <div className={styles.priceContainer}>
                  <div className={styles.price}>₹ {booksData?.price}</div>
                  <div className={styles.discountBadge}>
                    {" "}
                    ₹ {booksData?.mrp}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.contained_btn}>
              <CustomButton
                variant="contained"
                customColor="#000000"
                customBgColor="#F3C11D"
                custmstyle={{
                  padding: "7px",
                  width: "300px",
                  height: "50px",
                  marginTop: "15px",
                  gap: ".5rem",
                  alignItems: "center",
                  "@media (max-width:500px)": {
                    width: "100%",
                  },
                }}
                onClick={handlePersonalizeStory}
              >
                <img
                  src={customize}
                  alt="customize"
                  style={{ width: "16px", marginBottom: ".3rem" }}
                />
                Personalize This Story
              </CustomButton>
            </div>
            {/* <div className={styles.buttonContainer}>
              {!booksData?.is_added ? (
                <>
                  {" "}
                  <CustomButton
                    variant="contained"
                    customColor="#000000"
                    customBgColor="#F3C11D"
                    custmstyle={{
                      padding: "7px",
                      width: "160px",
                      height: "40px",
                      marginTop: "15px",
                    }}
                    onClick={() => {
                      dispatch(addCart({ body: { book_id: booksData?.id } }))
                        .unwrap()
                        .then(() => {
                          dispatch(countApi())
                          listApiCAll()
                        })
                        .catch(error =>
                          console.error("Error in addCart/countApi:", error)
                        )
                    }}
                    // type="submit"
                    // disabled={otp.some(item => item === "") || otp.length === 0}
                  >
                    Add to Cart
                  </CustomButton>
                  <CustomButton
                    variant="contained"
                    customColor="#000000"
                    customBgColor="#F3C11D"
                    custmstyle={{
                      padding: "7px",
                      width: "160px",
                      height: "40px",
                      marginTop: "15px",
                    }}
                    onClick={() => {
                      dispatch(addCart({ body: { book_id: booksData?.id } }))
                        .unwrap()
                        .then(() => dispatch(countApi()))
                        .then(() => navigate("/mycart"))
                        .catch(error =>
                          console.error("Error in addCart/countApi:", error)
                        )
                    }}
                  >
                    Buy Now
                  </CustomButton>
                </>
              ) : (
                <CustomButton
                  variant="contained"
                  customColor="#000000"
                  customBgColor="#F3C11D"
                  custmstyle={{
                    padding: "7px",
                    width: "160px",
                    height: "40px",
                    marginTop: "15px",
                  }}
                  onClick={() => {
                    navigate("/mycart")
                  }}
                >
                  Go to Cart
                </CustomButton>
              )}
            </div> */}
            {openAdduser && (
              <CustomDialog
                open={openAdduser}
                handleClose={handleClosesetOpenAddUser}
                showCloseIcon={true}
                customWidth={"900px"}
                overflowY={"unset"}
                children={
                  <>
                    <CarouselSingle />
                    <div className={styles.carouselContainer}>
                      <CustomButton
                        variant="contained"
                        customColor="#000000"
                        customBgColor="#F3C11D"
                        custmstyle={{
                          padding: "7px",
                          width: "300px",
                          height: "50px",
                          marginTop: "15px",
                          gap: ".5rem",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={customize}
                          alt="customize"
                          style={{ width: "16px", marginBottom: ".3rem" }}
                        />
                        Personalize This Story
                      </CustomButton>
                    </div>
                  </>
                }
              />
            )}
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}

export default Books
