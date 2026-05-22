import { useEffect, useState } from "react"
import Admin from "./routes/admin"
import WebRoutes from "./routes/WebRoutes"
import "./modules/website/assets/css/style.css"
import "./modules/website/assets/css/custom.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import { ToastContainer } from "react-toastify"
import "sweetalert2/dist/sweetalert2.min.css"
import toast, { Toaster } from "react-hot-toast"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const pathName = window.location.pathname
  const isAdminPath = pathName.includes("admin")
  const [cssLoaded, setCssLoaded] = useState(false)

  useEffect(() => {
    const loadCss = async () => {
      try {
        if (isAdminPath) {
          await import("./globalStyles/admin.css")
        } else {
          await import("./globalStyles/web.css")
        }
        setCssLoaded(true)
      } catch (error) {
        console.error("CSS loading failed:", error)
      }
    }

    loadCss()
  }, [isAdminPath])

  if (!cssLoaded) return null

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {isAdminPath ? <Admin /> : <WebRoutes />}
    </>
  )
}

export default App
