import React, { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from "./Carousel.module.css"
import { NavLink } from "react-router-dom"
// import "./Carousel.css"

const Carousel = ({ title, items }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 3,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1254, settings: { slidesToShow: 5, slidesToScroll: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }

  return (
    <section className="my-8 px-6">
      <div className={styles.carouselHeader}>
        <h2>{title}</h2>
        <NavLink to="/user/browse_our_products">See all</NavLink>
      </div>
      <Slider {...settings}>
        {items.map((item, index) => {
          const isExpanded = activeIndex === index
          return (
            <div key={index} className="p-2">
              <div
                className={`${styles["book-card"]} ${
                  isExpanded ? styles.expanded : ""
                }`}
                onClick={() => setActiveIndex(isExpanded ? null : index)}
              >
                <div className={styles.bookImageContainer}>
                  <img src={item.image} alt={item.title} />
                </div>

                {isExpanded && (
                  <div className={styles["book-info"]}>
                    <p className={styles["book-title"]}>{item.title}</p>
                    <p className={styles["book-desc"]}>{item.description}</p>
                    <div className={styles["book-buttons"]}>
                      <button className={styles["btn-generate"]}>
                        ⚡ Generate
                      </button>
                      <button className={styles["btn-view"]}>View Book</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </Slider>
    </section>
  )
}

export default Carousel
