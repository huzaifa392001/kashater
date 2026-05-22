import React, { useEffect, useState } from "react"
import styles from "./ComingSoon.module.css"
import useApiHttp from "../../../../web/hooks/ues-http"

const ComingSoon = () => {
  const { sendRequest: categoryLists } = useApiHttp()
  const [books, setBooks] = useState([])

  const listBookviewData = () => {
    categoryLists(
      {
        url: `user/home/coming-soon-stories`,
      },
      data => {
        setBooks(data?.data)
      }
    )
  }

  useEffect(() => {
    listBookviewData()
  }, [])
  return (
    <section className={styles.comingSoonSection}>
      <h2 className={styles.title}>Coming Soon</h2>
      <div className={styles.booksGrid}>
        {books.map((book, index) => (
          //   <div key={index} className={styles.bookCard}>
          //     <img
          //       src={book.image}
          //       alt={book.title}
          //       className={styles.bookImage}
          //     />
          //     <h3 className={styles.bookTitle}>{book.title}</h3>
          //     {book.author && <p className={styles.bookAuthor}>{book.author}</p>}
          //   </div>
          <div key={index} className={styles.bookCard}>
            <img
              key={index}
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
