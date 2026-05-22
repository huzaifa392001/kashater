import React, { useEffect, useRef, useState } from "react"
import HeroSection from "../HeroSection"
import ProductCarousel from "../ProductCarousel"
import useApiHttp from "../../../hooks/ues-http"
import OverlayLoding from "../../../components/UI/Loding/OverlayLoding"

const OurProducts = () => {
  const { isLoading, success, error, sendRequest } = useApiHttp()
  const [searchValue, setSearchValue] = useState("")
  const firstTimeloading = useRef(true)

  const [data, setData] = useState({
    browse_list: [],
    whats_new: [],
    featured_month_books: [],
  })
  console.log("searchValue", searchValue)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      sendRequest(
        {
          url: `user/products/home`,
          method: "POST",
          body: {
            search: searchValue,
          },
        },
        response => {
          if (firstTimeloading.current === true) {
            firstTimeloading.current = false
          }

          const resData = response?.data || {}
          setData({
            browse_list: resData.browse_list || [],
            whats_new: resData.whats_new || [],
            featured_month_books: resData.featured_month_books || [],
          })
        }
      )
    }, 500) // debounce API call

    return () => clearTimeout(delayDebounce)
  }, [searchValue])

  const isAllEmpty =
    data.browse_list.length === 0 &&
    data.whats_new.length === 0 &&
    data.featured_month_books.length === 0
  return (
    <>
      <HeroSection searchValue={searchValue} setSearchValue={setSearchValue} />
      {firstTimeloading.current === true ? (
        <OverlayLoding />
      ) : isAllEmpty ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>No data found.</p>
      ) : (
        <>
          {data.browse_list.length > 0 && (
            <ProductCarousel
              title="Browse our products"
              data={data.browse_list}
            />
          )}
          {data.whats_new.length > 0 && (
            <ProductCarousel title="What's New" data={data.whats_new} />
          )}
          {data.featured_month_books.length > 0 && (
            <ProductCarousel
              title="Featured Books of the Month"
              data={data.featured_month_books}
            />
          )}
        </>
      )}
    </>
  )
}

export default OurProducts
