import { useEffect, useState } from "react"
import classes from "./Sidebar.module.css"
import logo from "../../assets/image/png/navlogo.png"
import { NavLink, useLocation } from "react-router-dom"
import dashboard from "../../assets/image/svg/dashboard.svg"
import UserList from "../../assets/image/svg/UserList.svg"
import manageorder from "../../assets/image/svg/manage order.svg"
import managestory from "../../assets/image/svg/manage story.svg"
import transactions from "../../assets/image/svg/transactions.svg"
import billings from "../../assets/image/svg/billings.svg"
import rewards from "../../assets/image/svg/rewards.svg"
import subscriptions from "../../assets/image/svg/subscriptions.svg"
import feedback from "../../assets/image/svg/feedback.svg"
import videotestimonial from "../../assets/image/svg/video testimonial.svg"
import servicerequest from "../../assets/image/svg/service request.svg"
import userrole from "../../assets/image/svg/user role.svg"
import privacypolicy from "../../assets/image/svg/privacy policy.svg"
import termsandconditions from "../../assets/image/svg/terms and conditions.svg"
import rightarrow from "../../assets/image/svg/right arrow.svg"
import downarrow from "../../assets/image/svg/down arrow.svg"
import { useDispatch, useSelector } from "react-redux"

function Sidebar({ isOpen, toggleSidebar }) {
  const dispatch = useDispatch()
  const data = useSelector(state => state?.sidbar)

  const [activeItem, setActiveItem] = useState("")
  const [expandedMenus, setExpandedMenus] = useState({})
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)
  const handleOverlayClick = () => setIsMobileOpen(false)

  const toggleSubmenu = key => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }
  const storedUser = localStorage.getItem("adminUserData")
    ? JSON.parse(localStorage.getItem("adminUserData"))
    : null
  const currentPath = location.pathname.replace("/admin/", "")

  useEffect(() => {
    if (!data?.sidbarData) return

    // Track if any menu needs to be expanded
    const newExpandedMenus = {}

    data.sidbarData.forEach(section => {
      section.sub_modules.forEach(item => {
        if (item.sub_menus) {
          // Check if any child matches current path
          const isChildActive = item.sub_menus.some(child =>
            currentPath.startsWith(child.redirect_url)
          )

          if (isChildActive) {
            newExpandedMenus[item.id] = true
            setActiveItem(item.id)
          }
        } else if (item.redirect_url && currentPath === item.redirect_url) {
          setActiveItem(item.id)
        }
      })
    })

    // Update expanded menus in one batch
    setExpandedMenus(prev => ({ ...prev, ...newExpandedMenus }))
  }, [currentPath, data?.sidbarData])

  return (
    <>
      <button className={classes["mobile-toggle"]} onClick={toggleMobile}>
        ☰
      </button>

      <div
        className={`${classes["mobile-overlay"]} ${isMobileOpen ? classes["visible"] : ""
          }`}
        onClick={handleOverlayClick}
      />

      <div
        className={`${classes["sidebar"]} ${isOpen ? classes["open"] : classes["closed"]
          } ${isMobileOpen ? classes["mobile-open"] : ""}`}
      >
        <div className={classes["sidebar-header"]}>
          <div>
            <img src={logo} alt="Logo" className={classes["sidebar-logo"]} />
          </div>
          <button
            style={{ display: "none" }}
            className={classes["toggle-button"]}
            onClick={toggleSidebar}
          >
            {isOpen ? "←" : "→"}
          </button>
        </div>

        <nav className={classes["sidebar-nav"]}>
          {data?.sidbarData?.map((section, index) => (
            <div className={classes["nav-section"]} key={index}>
              <small className={classes["section-title"]}>{section.name}</small>

              {section.sub_modules.map(item => {
                const isParentActive = item.sub_menus?.some(child =>
                  currentPath.startsWith(child.redirect_url)
                )
                return (
                  <div key={item.id}>
                    <NavLink
                      to={
                        item.redirect_url ? `/admin/${item.redirect_url}` : "#"
                      }
                      className={`${classes["nav-item"]} ${activeItem === item.id || isParentActive
                        ? classes["active"]
                        : ""
                        }`}
                      end={!item.sub_menus}
                      onClick={e => {
                        if (item.sub_menus) {
                          e.preventDefault()
                          toggleSubmenu(item.id)
                        } else {
                          setActiveItem(item.id)
                        }
                      }}
                    >
                      {({ isActive }) => (
                        <>
                          <div className={classes["icon_set"]}>
                            <span className={classes["icon"]}>
                              <img
                                src={
                                  activeItem === item.id || isParentActive
                                    ? item?.active_icon
                                    : item?.inactive_icon
                                }
                                alt={item.name}
                              />
                            </span>
                            <span className={classes["label"]}>
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className={classes["badge"]}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.sub_menus && (
                            <span className={classes["arrow"]}>
                              <img
                                src={
                                  expandedMenus[item.id]
                                    ? downarrow
                                    : rightarrow
                                }
                                alt="Arrow"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>

                    {item.sub_menus && expandedMenus[item.id] && (
                      <div className={classes["submenu"]}>
                        {item.sub_menus.map((child, i) => (
                          <NavLink
                            key={i}
                            to={`/admin/${child.redirect_url}`}
                            className={({ isActive }) =>
                              `${classes["submenu-item"]} ${isActive ? classes["active"] : ""
                              }`
                            }
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
