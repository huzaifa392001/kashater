import { useState } from "react"
import classes from "./Sidebar.module.css"
import logo from "../../assets/image/png/navlogo.png"
import { NavLink } from "react-router-dom"
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

function Sidebar({ isOpen, toggleSidebar }) {
  const [activeItem, setActiveItem] = useState("")
  const [expandedMenus, setExpandedMenus] = useState({})
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)
  const handleOverlayClick = () => setIsMobileOpen(false)

  const toggleSubmenu = key => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }
  const accordionItems = [
    {
      section: "",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: "👤",
          active_image: dashboard,
          inactive_image: dashboard,
          redirect_url: "/dashboard",
          children: null,
        },
      ],
    },
    {
      section: "FREQUENT",
      items: [
        {
          id: "userList1",
          label: "User List",
          icon: "👤",
          active_image: UserList,
          inactive_image: UserList,
          children: [
            { label: "Add Storys", redirect_url: "/AddStorys" },
            { label: "Story Lists", redirect_url: "/StoryLists" },
          ],
        },
        {
          id: "manageOrder1",
          label: "Manage Order",
          icon: "📦",
          active_image: manageorder,
          inactive_image: manageorder,
          children: [
            { label: "Add Storys", redirect_url: "/AddStorys" },
            { label: "Story Lists", redirect_url: "/StoryLists" },
          ],
        },
        {
          id: "manageStory1",
          label: "Manage Story",
          icon: "📚",
          active_image: managestory,
          inactive_image: managestory,
          children: [
            { label: "Add Storys", redirect_url: "/AddStorys" },
            { label: "Story Lists", redirect_url: "/StoryLists" },
          ],
        },
      ],
    },

    {
      section: "CONTENT MANAGEMENT",
      items: [
        {
          id: "userList",
          label: "User List",
          icon: "👤",
          active_image: UserList,
          inactive_image: UserList,
          children: null,
        },
        {
          id: "manageOrder",
          label: "Manage Order",
          icon: "📦",
          active_image: manageorder,
          inactive_image: manageorder,
          children: null,
        },
        {
          id: "manageStory",
          label: "Manage Story",
          icon: "📚",
          active_image: managestory,
          inactive_image: managestory,
          children: [
            { label: "Add Storys", redirect_url: "/AddStorys" },
            { label: "Story Lists", redirect_url: "/StoryLists" },
          ],
        },
      ],
    },
    {
      section: "FINANCE MANAGEMENT",
      items: [
        {
          id: "transaction",
          label: "Transactions",
          icon: "🎁",
          active_image: transactions,
          inactive_image: transactions,
          children: null,
        },
        {
          id: "billingpayments",
          label: "Billing & Payments",
          icon: "🎁",
          active_image: billings,
          inactive_image: billings,
          children: null,
        },
        {
          id: "rewards",
          label: "Rewards",
          icon: "🎁",
          active_image: rewards,
          inactive_image: rewards,
          children: ["Coupons", "Points"],
        },
        {
          id: "subscriptions",
          label: "Subscriptions",
          icon: "🔄",
          active_image: subscriptions,
          inactive_image: subscriptions,
          children: [
            { label: "Add Storys", redirect_url: "/AddStorys" },
            { label: "Story Lists", redirect_url: "/StoryLists" },
          ],
        },
      ],
    },
    {
      section: "FEEDBACK MANAGEMENT",
      items: [
        {
          id: "reviewsandfeedback",
          label: "Reviews and Feedback",
          icon: "💬",
          active_image: feedback,
          inactive_image: feedback,
          children: null,
          badge: "+48",
        },
        {
          id: "videosandtestimonials",
          label: "Videos and Testimonials",
          icon: "🎥",
          active_image: videotestimonial,
          inactive_image: videotestimonial,
          children: null,
        },
        {
          id: "servicerequests",
          label: "Service Requests",
          icon: "🧰",
          active_image: servicerequest,
          inactive_image: servicerequest,
          children: null,
        },
      ],
    },
    {
      section: "USER & ROLE MANAGEMENT",
      items: [
        {
          id: "manageUserRole",
          label: "Manage User & Role",
          icon: "🎭",
          active_image: userrole,
          inactive_image: userrole,
          children: [
            { label: "User List", redirect_url: "/UserList" },
            { label: "Role List", redirect_url: "/RoleList" },
          ],
        },
      ],
    },

    {
      section: "COMPLIANCE",
      items: [
        {
          id: "privacypolicy",
          label: "Privacy Policy",
          icon: "💬",
          active_image: privacypolicy,
          inactive_image: privacypolicy,
          children: null,
        },
        {
          id: "termsandconditions",
          label: "Terms and Conditions",
          icon: "🎥",
          active_image: termsandconditions,
          inactive_image: termsandconditions,
          children: null,
        },
      ],
    },
  ]

  return (
    <>
      <button className={classes["mobile-toggle"]} onClick={toggleMobile}>
        ☰
      </button>

      <div
        className={`${classes["mobile-overlay"]} ${
          isMobileOpen ? classes["visible"] : ""
        }`}
        onClick={handleOverlayClick}
      />

      <div
        className={`${classes["sidebar"]} ${
          isOpen ? classes["open"] : classes["closed"]
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
          {/* Accordion Sections */}
          {/* {accordionItems.map((section, index) => (
            <div className={classes["nav-section"]} key={index}>
              <small className={classes["section-title"]}>
                {section.section}
              </small>
              {section?.items.map(item => (
                <div key={item.id}>
                  <div
                    className={`${classes["nav-item"]} ${
                      activeItem === item.id ? classes["active"] : ""
                    }`}
                    onClick={() => {
                      if (item.children) toggleSubmenu(item.id)
                      else setActiveItem(item.id)
                    }}
                  >
                    <span className={classes["icon"]}>{item.icon}</span>
                    <span className={classes["label"]}>{item.label}</span>
                    {item?.badge && (
                      <span className={classes["badge"]}>{item.badge}</span>
                    )}
                    {item.children && (
                      <span className={classes["arrow"]}>
                        {expandedMenus[item.id] ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                  {item.children && expandedMenus[item.id] && (
                    <div className={classes["submenu"]}>
                      {item.children.map((child, i) => (
                        <div key={i} className={classes["submenu-item"]}>
                          {child}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))} */}
          {accordionItems.map((section, index) => (
            <div className={classes["nav-section"]} key={index}>
              <small className={classes["section-title"]}>
                {section.section}
              </small>

              {section.items.map(item => (
                <div key={item.id}>
                  <NavLink
                    to={`/dashboard/${item.id}`}
                    className={({ isActive }) =>
                      `${classes["nav-item"]} ${
                        isActive ? classes["active"] : ""
                      }`
                    }
                    onClick={e => {
                      if (item.children) {
                        e.preventDefault()
                        toggleSubmenu(item.id)
                      } else {
                        setActiveItem(item.id)
                      }
                    }}
                  >
                    {({ isActive }) => (
                      <>
                        <span className={classes["icon"]}>
                          <img
                            src={
                              isActive
                                ? item?.active_image
                                : item?.inactive_image
                            }
                            alt={item.label}
                          />
                        </span>
                        <span className={classes["label"]}>{item.label}</span>
                        {item.badge && (
                          <span className={classes["badge"]}>{item.badge}</span>
                        )}
                        {item.children && (
                          <span className={classes["arrow"]}>
                            {expandedMenus[item.id] ? "▲" : "▼"}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>

                  {item.children && expandedMenus[item.id] && (
                    <div className={classes["submenu"]}>
                      {item.children.map((child, i) => {
                        const label =
                          typeof child === "object" ? child.label : child
                        const url =
                          typeof child === "object"
                            ? child.redirect_url
                            : `/dashboard/${item.id}/${label
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`

                        return (
                          <NavLink
                            key={i}
                            to={url}
                            className={classes["submenu-item"]}
                          >
                            {label}
                          </NavLink>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
