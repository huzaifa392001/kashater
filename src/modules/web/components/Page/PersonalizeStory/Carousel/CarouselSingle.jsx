import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from "./CarouselSingle.module.css"
import sampleImg from "../../../../assets/image/jpg/dummy image 1.jpg"
import sampleImg2 from "../../../../assets/image/jpg/dummy image 2.jpg"
import sampleImg3 from "../../../../assets/image/jpg/dummy image 3.jpg"
import rightarrow from "../../../../assets/image/svg/right arrow(with circle).svg"
import leftarrow from "../../../../assets/image/svg/left arrow(with circle).svg"

function NextArrow({ onClick }) {
  return (
    <div className={styles.nextArrow} onClick={onClick}>
      <img src={leftarrow} alt="Next slide" />
    </div>
  )
}

function PrevArrow({ onClick }) {
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <img src={rightarrow} alt="Previous slide" />
    </div>
  )
}

const CustomCarouselStory = ({ slides, title }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  // Sample data - change this to test different cases
  // const slides = [
  //   {
  //     title: "In Your Own Backyard",
  //     subtitle: "Jouw unieke StoryPrint",
  //     description: "Meet Timo, the brave explorer",
  //     image: sampleImg,
  //   },
  //   // Uncomment to test multiple slides
  //   // {
  //   //   title: "Second Slide",
  //   //   subtitle: "Another StoryPrint",
  //   //   description: "Adventure continues",
  //   //   image: sampleImg2,
  //   // },
  //   // {
  //   //   title: "Third Slide",
  //   //   subtitle: "Final StoryPrint",
  //   //   description: "Journey ends",
  //   //   image: sampleImg3,
  //   // },
  // ]

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.header}>
        <h2>{title}</h2>
        {/* <p>Jouw unieke StoryPrint</p> */}
      </div>

      {/* Conditional rendering based on number of slides */}
      {slides?.length === 0 ? (
        <div className={styles.noSlides}>
          <p>No slides available</p>
        </div>
      ) : slides?.length === 1 ? (
        // Single slide without slider
        <div className={styles.singleSlide_img} style={{ marginTop: "20px" }}>
          <div className={styles.imageBox2}>
            <img
              src={slides[0].image}
              alt="Slide"
              className={styles.slideImage}
            />
          </div>
          {/* Uncomment if you want to show description for single slide */}
          {/* <div className={styles.textBox}>
            <p>{slides[0].description}</p>
          </div> */}
        </div>
      ) : (
        // Multiple slides with slider
        <Slider {...settings} className={styles.slider}>
          {slides?.map((slide, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.imageBox}>
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className={styles.slideImage}
                />
              </div>
              {/* Uncomment if you want to show description in slider */}
              {/* <div className={styles.textBox}>
                <p>{slide.description}</p>
              </div> */}
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default CustomCarouselStory
