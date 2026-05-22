import React, { useEffect, useLayoutEffect, Suspense } from "react"
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
  Outlet,
  ScrollRestoration,
} from "react-router-dom"
import { Provider } from "react-redux"
import store from "../modules/web/store/reduxStore"

const Landing           = React.lazy(() => import("../modules/website/pages/Landing/Landing"))
const Terms             = React.lazy(() => import("../modules/website/pages/Privacy/privacy"))
const Privacy           = React.lazy(() => import("../modules/website/pages/Terms/terms"))
const Delivery          = React.lazy(() => import("../modules/website/pages/Delivery/delivery"))
const Refund            = React.lazy(() => import("../modules/website/pages/Refund/refund"))
const About             = React.lazy(() => import("../modules/website/pages/About/About"))
const Faq               = React.lazy(() => import("../modules/website/pages/Faq/Faq").then(m => ({ default: m.Faq })))
const ViewBook          = React.lazy(() => import("../modules/website/pages/ViewBook"))
const PersonalizeBook   = React.lazy(() => import("../modules/website/pages/PersonalizeBook"))
const EditStory         = React.lazy(() => import("../modules/website/pages/EditStory"))
const MyCart            = React.lazy(() => import("../modules/website/pages/MyCart"))
const AddressPage       = React.lazy(() => import("../modules/website/pages/AddressPage"))
const OrderPlaced       = React.lazy(() => import("../modules/website/pages/OrderPlaced"))
const PopupModel        = React.lazy(() => import("../modules/website/pages/PopupModel"))
const TryNowSamplePreview = React.lazy(() => import("../modules/website/pages/TryNowSamplePreview"))
const MyOrdersNew       = React.lazy(() => import("../modules/website/pages/MyOrdersNew"))
const TrackOrderNew     = React.lazy(() => import("../modules/website/pages/TrackOrderNew"))
const NewTicketDetail   = React.lazy(() => import("../modules/website/pages/NewTicketDetail"))
const MySubscriptions   = React.lazy(() => import("../modules/website/pages/MySubscriptions"))
const MyProfileNew      = React.lazy(() => import("../modules/website/pages/MyProfileNew"))


// ⬇️ Scroll-to-top that runs on route changes (uses Router context)
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      // Optional: ensure the element exists and scroll into view
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView()
      return
    }
    // Always reset to top for normal route changes
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname, hash])

  return null
}

// ⬇️ Root layout that wraps every page (provides Router context to ScrollToTop)
function RootLayout() {
  return (
    <>
      <ScrollToTop />
      {/* Optional: restore scroll on back/forward instead of jumping to top.
          If you ALWAYS want top, keep ScrollToTop; if you want “back” to restore,
          you can keep this too. */}
      <ScrollRestoration />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Outlet />
      </Suspense>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />, // 👈 layout route
    children: [
      { index: true, element: <Landing /> }, // path: "/"
      { path: "/privacy-policy", element: <Privacy /> },
      { path: "/terms-condition", element: <Terms /> },
      { path: "/Delivery-policy", element: <Delivery /> },
      { path: "/Refund-policy", element: <Refund /> },
      { path: "/about", element: <About /> },
      { path: "/faq", element: <Faq /> },
      { path: "/view-book", element: <ViewBook /> },
      { path: "/personalize-book", element: <PersonalizeBook /> },
      { path: "/edit-this-story", element: <EditStory /> },
      { path: "/my-cart", element: <MyCart /> },
      { path: "/address", element: <AddressPage /> },
      { path: "/order-placed", element: <OrderPlaced /> },
      { path: "/my-popup", element: <PopupModel /> },
      { path: "/try-now-sample-preview", element: <TryNowSamplePreview /> },
      { path: "/new-header", element: <newHeader /> },
      { path: "/my-orders-new", element: <MyOrdersNew /> },
      { path: "/track-order-new", element: <TrackOrderNew /> },
      { path: "/new-ticket-detail", element: <NewTicketDetail /> },
      { path: "/my-subscription-new", element: <MySubscriptions /> },
      { path: "/my-profile-new", element: <MyProfileNew /> },

    ],
  },
])

export default function WebSite() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
