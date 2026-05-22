import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from "./CarouselSingle.module.css"
import sampleImg from "../../../assets/image/jpg/dummy image 1.jpg"
import sampleImg2 from "../../../assets/image/jpg/dummy image 2.jpg"
import sampleImg3 from "../../../assets/image/jpg/dummy image 3.jpg"
import rightarrow from "../../../assets/image/svg/right arrow(with circle).svg"
import leftarrow from "../../../assets/image/svg/left arrow(with circle).svg"

function NextArrow({ onClick }) {
  return (
    <div className={styles.nextArrow} onClick={onClick}>
      <img src={leftarrow} alt="rightarrow" />
    </div>
  )
}

function PrevArrow({ onClick }) {
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <img src={rightarrow} alt="rightarrow" />
    </div>
  )
}

const CustomCarousel = () => {
  const settings = {
    infinite: true,
    // fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  const slides = [
    {
      title: "In Your Own Backyard",
      subtitle: "Jouw unieke StoryPrint",
      description:
        "Meet Timo, the brave explorer, in a colorful jungle where dinosaurs wander.",
      image: sampleImg,
    },
    {
      title: "In Your Own Backyard",
      subtitle: "Jouw unieke StoryPrint",
      description:
        "Meet Timo, the brave explorer, in a colorful jungle where dinosaurs wander.",
      image: sampleImg2,
    },
    {
      title: "In Your Own Backyard",
      subtitle: "Jouw unieke StoryPrint",
      description:
        "Meet Timo, the brave explorer, in a colorful jungle where dinosaurs wander.",
      image: sampleImg3,
    },
  ]

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.header}>
        <h2>In Your Own Backyard</h2>
        <p>Jouw unieke StoryPrint</p>
      </div>

      <Slider {...settings} className={styles.slider}>
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.imageBox}>
              <img src={slide.image} alt="Slide" />
            </div>
            <div className={styles.textBox}>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CustomCarousel
