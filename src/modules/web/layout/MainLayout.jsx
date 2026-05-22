import React, { useState, useEffect, useRef } from "react"
import Header from "../features/Header/Header"
import classes from "./MainLayout.module.css"
import { Outlet, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setCalssesName, setLastScrollY } from "../services/scrollNavSlice"
import { countApi } from "../services/storeSlice/addCart"
import { isAuthenticated } from "../services/isAuthenticated"

const MainLayout = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const isCurrentPath = currentPath === "/user/ordersuccess"
  const extraBackgroundRoutes = [
    // "/user/browse_our_products",
    "/user",
    "/user/mycart",
    "/user/address",
    "/user/view_orders",
    "/user/profile_page",
  ]
  const hasExtraBackground = extraBackgroundRoutes.includes(currentPath)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const navContainerRef = useRef(null)
  const [isNavVisible, setIsNavVisible] = useState(true)

  const lastScrollY = useSelector(state => state?.scrollnav?.lastScrollY)
  // console.log("lastScrollY", lastScrollY)

  const dispatch = useDispatch()

  useEffect(() => {
    const container = navContainerRef.current

    const handleScroll = () => {
      const currentScrollY = container.scrollTop

      if (currentScrollY === 0) {
        setIsNavVisible(true)
        dispatch(setCalssesName(""))
        container.classList.remove("floating-nav")
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false)
        dispatch(setCalssesName("floating-nav"))
        container.classList.add("floating-nav")
      } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true)
        dispatch(setCalssesName("floating-nav"))
      }
      dispatch(setLastScrollY(currentScrollY))
      // setLastScrollY(currentScrollY)
    }

    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [lastScrollY])
  // ${
  //           hasExtraBackground ? classes.extraBackground22222 : ""
  //         }
  const isAuth = isAuthenticated()
  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(countApi())
    }
  }, [dispatch, isAuth])

  const [showButton, setShowButton] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      if (el.scrollTop > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <main
        ref={navContainerRef}
        // className={`${classes.homeContainer} ${
        //   isCurrentPath
        //     ? classes.homeContainer2
        //     : hasExtraBackground
        //     ? classes.homeContainer3
        //     : ""
        // }`}
        className={`${classes.homeContainer}`}
      >
        <Header />
        <div className={classes["main-content"]} ref={scrollRef}>
          <Outlet context={{ showButton, scrollRef }} />
        </div>
      </main>
    </>
  )
}

export default MainLayout
