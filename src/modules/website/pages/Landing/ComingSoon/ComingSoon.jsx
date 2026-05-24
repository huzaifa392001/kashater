import React, { useEffect, useRef, useState } from "react"
import styles from "./ComingSoon.module.css"
import axios from "axios"

const LazyGif = ({ src, alt, className }) => {
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      src={loaded ? src : undefined}
      alt={alt}
      className={className}
    />
  )
}

const ComingSoon = () => {
  const [books, setBooks] = useState([])

  const listBookviewData = async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    try {
      const response = await axios.get(`${baseUrl}user/home/coming-soon-stories`)
      setBooks(response.data?.data ?? [])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    listBookviewData()
  }, [])

  return (
    <section className={styles.comingSoonSection}>
      <h2 className={styles.title}>Coming Soon</h2>
      <div className={styles.booksGrid}>
        {books.map((book, index) => (
          <div key={index} className={styles.bookCard}>
            <LazyGif
              src={book.gif_path}
              alt={book.title}
              className={styles.bookImage}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ComingSoon
