import React from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css" // requires a loader

export default function CarouselContainer(props) {
  const { responsive, children, data } = props
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      // partialVisible={data.length > 1}
      responsive={responsive}
      // arrows={data.length > 1}
      minimumTouchDrag={80}
      {...props}
    >
      {children}
    </Carousel>
  )
}
