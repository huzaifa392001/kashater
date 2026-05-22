import React from "react"
import classe from "./Footers.module.css"
const Footers = ({ className }) => {
  return (
    <footer className={`${classe.footer} ${className}`}>
      <div className={classe.footer_container}>
        <a href="#">addison © copyright 2024 | All Right Reserved.</a>
      </div>
    </footer>
  )
}

export default Footers
