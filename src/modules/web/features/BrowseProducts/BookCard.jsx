// import React, { useEffect, useRef, useState } from "react" // Remove { useState }
// import classes from "./BookCard.module.css"
// import bookPlaceholder from "../../../web/assets/image/jpg/dummy image 1.jpg"
// import customize from "../../../web/assets/image/svg/customize cta.svg"
// import { useNavigate } from "react-router-dom"
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
//     <div className={classes.tooltipContainer}>
//       <p
//         ref={textRef}
//         className={classes.bookDesc}
//         onMouseEnter={() => isTruncated && setShowTooltip(true)}
//         onMouseLeave={() => setShowTooltip(false)}
//         onMouseMove={handleMouseMove}
//       >
//         {text}
//       </p>

//       {isTruncated && showTooltip && (
//         <div
//           className={classes.tooltip}
//           style={{
//             left: `${position.x + 0}px`,
//             top: `${position.y + 0}px`,
//           }}
//         >
//           <div className={classes.tooltipContent}>
//             {text}
//             <div className={classes.tooltipArrow} />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// function BookCard({
//   name,
//   book_cover,
//   description,
//   index,
//   isActive,
//   onToggle,
//   id,
//   data,
// }) {
//   const navigate = useNavigate()
//   return (
//     <div
//       className={`${classes.bookCard} ${isActive ? classes.expanded : ""}`}
//       onClick={() => onToggle(index)} // Trigger parent handler
//     >
//       <div className={classes.bookImageContainer}>
//         <img
//           src={book_cover || bookPlaceholder}
//           alt={name}
//           className={classes.bookImage}
//         />
//       </div>

//       {isActive && ( // Use prop to control visibility
//         <div className={classes.bookContent}>
//           <h4 className={classes.bookTitle}>{name}</h4>
//           <TooltipText text={description} />
//           {/* <p className={classes.bookDesc}>{description}</p> */}
//           <div className={classes.buttonGroup}>
//             <button
//               className={classes.generateBtn}
//               onClick={() =>
//                 navigate("/user/personalize_story", {
//                   state: {
//                     storyId: id, // Your actual ID
//                     isdata: data,
//                   },
//                 })
//               }
//             >
//               <img src={customize} alt="customize" /> Generate
//             </button>
//             <button
//               className={classes.viewBtn}
//               onClick={() =>
//                 navigate("/user/books", {
//                   state: {
//                     storyId: id, // Your actual ID
//                   },
//                 })
//               }
//             >
//               View Book
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default BookCard

import React, { forwardRef, useEffect, useRef, useState } from "react"
import classes from "./BookCard.module.css"
import bookPlaceholder from "../../../web/assets/image/jpg/dummy image 1.jpg"
import customize from "../../../web/assets/image/svg/customize cta.svg"
import { Link, useNavigate } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

// Tooltip component remains unchanged
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
    <div className={classes.tooltipContainer}>
      <p
        ref={textRef}
        className={classes.bookDesc}
        onMouseEnter={() => isTruncated && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseMove={handleMouseMove}
      >
        {text}
      </p>

      {/* {isTruncated && showTooltip && (
        <div
          className={classes.tooltip}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <div className={classes.tooltipContent}>
            {text}
            <div className={classes.tooltipArrow} />
          </div>
        </div>
      )} */}
    </div>
  )
}

// Main BookCard with ref forwarding
const BookCard = forwardRef(function BookCard(
  {
    name,
    book_cover,
    description,
    index,
    isActive,
    onToggle,
    id,
    data,
    age_group,
    category,
    age_groups
  },
  ref
) {
  const navigate = useNavigate()

  const personalizeNav = (id, data) => {
    navigate("/user/personalize_story", {
      state: { storyId: id, isdata: data },
    })
  }

  const viewBookNav = (id, name) => {
    navigate("/user/books", {
      state: {
        storyId: id,
        name: name,
      },
    })
  }

  const ageFormeter = (age_) => {
    const nums = age_.match(/\d+/g).map(Number);
    const result = `${Math.min(...nums)} - ${Math.max(...nums)}`;
    return result
  }


  return (
    <div
      ref={ref}
      className={`${classes.bookCard} ${isActive ? classes.expanded : classes.expanded
        }`}
      onClick={() => onToggle(index)}
    >
      <div className={classes.bookImageContainer}>
        {/* <img
          loading="lazy"
          src={book_cover || bookPlaceholder}
          alt={name}
          className={classes.bookImage}
        /> */}
        <LazyLoadImage
          alt={name}
          src={book_cover}
          effect="blur"
          placeholderSrc={book_cover}
          className={classes.bookImage}
          draggable={false}
          onContextMenu={(e) => import.meta.env.VITE_IMG_METHOD == 'dev' ? undefined : e.preventDefault()}
        />
      </div>

      {/* {isActive && ( */}
      <div className={classes.bookContent}>
        <h4 className={classes.bookTitle}>{name}</h4>
        <TooltipText text={description} />
        <p className={classes.bookDesc}>Perfect for Ages {age_groups ? ageFormeter(age_groups) : ""}</p>
        <h6>"{category}"</h6>

        <div className={classes.buttonGroup}>
          <Link
            to={`/user/personalize_story?story=${encodeURIComponent(data?.name)}`}
            onClick={e => e.stopPropagation()}
          >
            <button className={classes.generateBtn}>
              <img src={customize} alt="customize" /> Personalize
            </button>
          </Link>
          <Link
            to={`/user/books?storyId=${id}&name=${encodeURIComponent(name)}`}
            onClick={e => e.stopPropagation()}
          >
            <button className={classes.viewBtn}>
              View Book
            </button>
          </Link>
        </div>
      </div>
      {/* )} */}
    </div>
  )
})

export default BookCard
