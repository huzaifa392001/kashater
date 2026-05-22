import React from "react"
import classes from "../Home/HomePage.module.css"
import book1 from "../../../web/assets/image/jpg/dummy image 1.jpg"
import book2 from "../../../web/assets/image/jpg/dummy image 2.jpg"
import book3 from "../../../web/assets/image/jpg/dummy image 3.jpg"
import book4 from "../../../web/assets/image/jpg/dummy image 4.jpg"
import book5 from "../../../web/assets/image/jpg/dummy image 5.jpg"
import book6 from "../../../web/assets/image/jpg/dummy image 6.jpg"
import book7 from "../../../web/assets/image/jpg/dummy image 7.jpg"
import OurProducts from "../../features/Home/OurProducts/OurProducts"

const dummyBooks = [
  {
    title: "Little Monkey",
    image: book1,
    description: "The fun story of a cheeky little monkey.",
  },
  {
    title: "Sulwe",
    image: book2,
    description: "A magical story about finding your inner light.",
  },
  {
    title: "In Your Own Backyard",
    image: book3,
    description:
      "Once upon a time, in a land of make-believe, there was a magical storybook that came to life!",
  },
  {
    title: "Three Naughty Kids",
    image: book4,
    description: "Three mischievous kids on a wild adventure.",
  },
  {
    title: "Colorful Garden",
    image: book5,
    description: "Explore a world of colors and fun.",
  },
  {
    title: "Unseen World",
    image: book6,
    description: "Discover secrets hidden in plain sight.",
  },
  {
    title: "Sam and Pam",
    image: book7,
    description: "Two siblings and their magical red cat!",
  },
  {
    title: "Sulwe",
    image: book2,
    description: "A magical story about finding your inner light.",
  },
  {
    title: "In Your Own Backyard",
    image: book3,
    description:
      "Once upon a time, in a land of make-believe, there was a magical storybook that came to life!",
  },
  {
    title: "Three Naughty Kids",
    image: book4,
    description: "Three mischievous kids on a wild adventure.",
  },
  {
    title: "Colorful Garden",
    image: book5,
    description: "Explore a world of colors and fun.",
  },
  {
    title: "Unseen World",
    image: book6,
    description: "Discover secrets hidden in plain sight.",
  },
  {
    title: "Sam and Pam",
    image: book7,
    description: "Two siblings and their magical red cat!",
  },
  {
    title: "Sulwe",
    image: book2,
    description: "A magical story about finding your inner light.",
  },
  {
    title: "In Your Own Backyard",
    image: book3,
    description:
      "Once upon a time, in a land of make-believe, there was a magical storybook that came to life!",
  },
  {
    title: "Three Naughty Kids",
    image: book4,
    description: "Three mischievous kids on a wild adventure.",
  },
  {
    title: "Colorful Garden",
    image: book5,
    description: "Explore a world of colors and fun.",
  },
  {
    title: "Unseen World",
    image: book6,
    description: "Discover secrets hidden in plain sight.",
  },
  {
    title: "Sam and Pam",
    image: book7,
    description: "Two siblings and their magical red cat!",
  },
]
const HomePage = () => {
  return (
    <>
      <div className={classes.container}>
        <OurProducts items={dummyBooks} />
      </div>
    </>
  )
}

export default HomePage
