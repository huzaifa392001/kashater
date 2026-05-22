// import React, { useEffect, useRef, useState } from "react"
// import styles from "./ProductCarousel.module.css"
// import bookPlaceholder from "../../../web/assets/image/jpg/dummy image 1.jpg"
// import customize from "../../../web/assets/image/svg/customize cta.svg"
// import { NavLink, useNavigate } from "react-router-dom"

// const TooltipText = ({ text }) => {
//   const [showTooltip, setShowTooltip] = useState(false)
//   const [isTruncated, setIsTruncated] = useState(false)
//   const textRef = useRef(null)
//   const [position, setPosition] = useState({ x: 0, y: 0 })

//   useEffect(() => {
//     if (textRef.current) {
//       const isOverflowing =
//         textRef.current.scrollHeight > textRef.current.clientHeight ||
//         textRef.current.scrollWidth > textRef.current.clientWidth
//       setIsTruncated(isOverflowing)
//     }
//   }, [text])

//   const handleMouseMove = e => {
//     setPosition({ x: e.clientX, y: e.clientY })
//   }

//   return (
//     <div className={styles.tooltipContainer}>
//       <p
//         ref={textRef}
//         className={styles.bookDesc}
//         onMouseEnter={() => isTruncated && setShowTooltip(true)}
//         onMouseLeave={() => setShowTooltip(false)}
//         onMouseMove={handleMouseMove}
//       >
//         {text}
//       </p>

//       {isTruncated && showTooltip && (
//         <div
//           className={styles.tooltip}
//           style={{
//             left: `${position.x + 0}px`,
//             top: `${position.y + 0}px`,
//           }}
//         >
//           <div className={styles.tooltipContent}>
//             {text}
//             <div className={styles.tooltipArrow} />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default function ProductCarousel({ title, data = [] }) {
//   const navigate = useNavigate()
//   const [activeIndex, setActiveIndex] = useState(null)

//   const toggleCard = index => {
//     setActiveIndex(prev => (prev === index ? null : index))
//   }

//   return (
//     <section className={styles.carouselSection}>
//       <div className={styles.carouselHeader}>
//         <h2>{title}</h2>
//         {data && data.length > 7 && (
//           <NavLink to="/user/browse_our_products">See all</NavLink>
//         )}
//       </div>
//       <div className={styles.carouselRow}>
//         {Array.isArray(data) &&
//           data
//             .filter((_, i) => i < 7)
//             .map((book, index) => {
//               const isActive = activeIndex === index
//               return (
//                 <div
//                   key={index}
//                   className={`${styles.bookCard} ${
//                     isActive ? styles.expanded : ""
//                   }`}
//                   onClick={() => toggleCard(index)}
//                 >
//                   <div className={styles.bookImageContainer}>
//                     <img
//                       src={book.book_cover || bookPlaceholder}
//                       alt={book.name || "Book cover"}
//                       className={styles.bookImage}
//                     />
//                   </div>

//                   {isActive && (
//                     <div className={styles.bookContent}>
//                       <h4 className={styles.bookTitle}>{book.name}</h4>
//                       <TooltipText text={book.description} />
//                       <div className={styles.buttonGroup}>
//                         <button
//                           className={styles.generateBtn}
//                           onClick={() =>
//                             navigate("/user/personalize_story", {
//                               state: {
//                                 storyId: book.id, // Your actual ID
//                                 isdata: book,
//                               },
//                             })
//                           }
//                         >
//                           <img src={customize} alt="customize" /> Generate
//                         </button>
//                         <button
//                           className={styles.viewBtn}
//                           onClick={() =>
//                             navigate("/user/books", {
//                               state: {
//                                 storyId: book.id, // Your actual ID
//                                 name: book.name,
//                               },
//                             })
//                           }
//                         >
//                           View Book
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
//       </div>
//     </section>
//   )
// }

import React, { useEffect, useRef, useState } from "react"
import styles from "./ProductCarousel.module.css"
import bookPlaceholder from "../../../web/assets/image/jpg/dummy image 1.jpg"
import customize from "../../../web/assets/image/svg/customize cta.svg"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

const TooltipText = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollHeight > textRef.current.clientHeight ||
        textRef.current.scrollWidth > textRef.current.clientWidth
      setIsTruncated(isOverflowing)
    }
  }, [text])

  const handleMouseMove = e => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <div className={styles.tooltipContainer}>
      <p
        ref={textRef}
        className={styles.bookDesc}
        onMouseEnter={() => isTruncated && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseMove={handleMouseMove}
      >
        {text}
      </p>

      {isTruncated && showTooltip && (
        <div
          className={styles.tooltip}
          style={{
            left: `${position.x + 0}px`,
            top: `${position.y + 0}px`,
          }}
        >
          <div className={styles.tooltipContent}>
            {text}
            <div className={styles.tooltipArrow} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProductCarousel({ title, data = [] }) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(null)
  const containerRef = useRef(null)

  const toggleCard = index => {
    setActiveIndex(prev => (prev === index ? null : index))
  }

  // Handle click outside to close expanded card
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <section className={styles.carouselSection} ref={containerRef}>
      <div className={styles.carouselHeader}>
        <h2>{title}</h2>
        {data && data.length > 5 && (
          <NavLink to="/user/browse_our_products">See all</NavLink>
        )}
      </div>
      <div className={styles.carouselRow}>
        {Array.isArray(data) &&
          data.slice(0, 7).map((book, index) => {
            const isActive = activeIndex === index
            return (
              <div
                key={index}
                className={`${styles.bookCard} ${isActive ? styles.expanded : ""
                  }`}
                onClick={e => {
                  e.stopPropagation()
                  toggleCard(index)
                }}
              >
                <div className={styles.bookImageContainer}>
                  {/* <img
                    src={book.book_cover || bookPlaceholder}
                    alt={book.name || "Book cover"}
                    className={styles.bookImage}
                  /> */}
                  <LazyLoadImage
                    alt={book.name || "Book cover"}
                    src={book.book_cover}
                    effect="blur"
                    placeholderSrc={book.book_cover}
                    className={styles.bookImage}
                  />
                </div>

                {isActive && (
                  <div className={styles.bookContent}>
                    <h4 className={styles.bookTitle}>{book.name}</h4>
                    <TooltipText text={book.description} />
                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.generateBtn}
                        onClick={e => {
                          e.stopPropagation()
                          navigate("/user/personalize_story", {
                            state: {
                              storyId: book.id,
                              isdata: book,
                            },
                          })
                        }}
                      >
                        <img src={customize} alt="customize" /> Generate
                      </button>
                      <Link to={`/user/books?storyId=${book.id}&name=${encodeURIComponent(book.name)}`}>
                        <button
                          className={styles.viewBtn}
                          onClick={e => {
                            e.stopPropagation()
                            // navigate("/user/books", {
                            //   state: {
                            //     storyId: book.id,
                            //     name: book.name,
                            //   },
                            // })
                          }}
                        >
                          View Book
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </section>
  )
}
