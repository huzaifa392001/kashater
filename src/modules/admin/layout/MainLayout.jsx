import React, { useState, useEffect } from "react"
import Sidebar from "../features/Sidebar/Sidebar"
import Header from "../features/Header/Header"
import classes from "./MainLayout.module.css"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchList } from "../services/storeSlice/sideBar"
import "quill/dist/quill.snow.css"

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const dispatch = useDispatch()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768)
  //     if (window.innerWidth > 768) setIsOpen(false)
  //   }

  //   handleResize()
  //   window.addEventListener("resize", handleResize)
  //   return () => window.removeEventListener("resize", handleResize)
  // }, [])

  useEffect(() => {
    dispatch(fetchList())
  }, [])

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`${classes.dashboard} ${
          isSidebarOpen ? `${classes["sidebar-open"]}` : ""
        }`}
      >
        <Header />
        <div className={classes["dashboard-content"]}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
