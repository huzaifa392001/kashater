import React, { useState } from "react"
import styles from "./HeroSection.module.css"
import SearchBar from "../../components/UI/Search/Search"
export default function HeroSection({ searchValue, setSearchValue }) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Cast your stars to shine in your best-loved stories!
      </h1>
      <p className={styles.subtitle}>
        Browse, personalize, and bring stories to life – delivered to your
        doorstep
      </p>
      <div className={styles.search}>
        <SearchBar
          placeholder="Search products..."
          value={searchValue}
          onSearchChange={setSearchValue}
          maxWidth="500px"
        />
      </div>
    </section>
  )
}
