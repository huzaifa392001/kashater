import React from "react"
import { Outlet } from "react-router-dom"

const StoryLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default StoryLayout
