import React, { Suspense, useLayoutEffect } from "react"
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
  Outlet,
} from "react-router-dom"
import { Provider } from "react-redux"
import store from "../modules/web/store/reduxStore"
import { userRoutesConfig } from "./WebApp"

// Hot-path pages — loaded eagerly
import Landing from "../modules/website/pages/Landing/Landing"

// Cold-path pages — lazy loaded
const Terms = React.lazy(() => import("../modules/website/pages/Privacy/privacy"))
const Privacy = React.lazy(() => import("../modules/website/pages/Terms/terms"))
const Delivery = React.lazy(() => import("../modules/website/pages/Delivery/delivery"))
const Refund = React.lazy(() => import("../modules/website/pages/Refund/refund.jsx"))
const About = React.lazy(() => import("../modules/website/pages/About/About"))
const Faq = React.lazy(() => import("../modules/website/pages/Faq/Faq").then(m => ({ default: m.Faq })))
const ViewBook = React.lazy(() => import("../modules/website/pages/ViewBook"))
const PersonalizeBook = React.lazy(() => import("../modules/website/pages/PersonalizeBook"))
const EditStory = React.lazy(() => import("../modules/website/pages/EditStory"))
const MyCart = React.lazy(() => import("../modules/website/pages/MyCart"))
const AddressPage = React.lazy(() => import("../modules/website/pages/AddressPage"))
const OrderPlaced = React.lazy(() => import("../modules/website/pages/OrderPlaced"))
const PopupModel = React.lazy(() => import("../modules/website/pages/PopupModel"))
const TryNowSamplePreview = React.lazy(() => import("../modules/website/pages/TryNowSamplePreview.jsx"))
const MyOrdersNew = React.lazy(() => import("../modules/website/pages/MyOrdersNew.jsx"))
const TrackOrderNew = React.lazy(() => import("../modules/website/pages/TrackOrderNew.jsx"))
const NewTicketDetail = React.lazy(() => import("../modules/website/pages/NewTicketDetail.jsx"))
const MySubscriptions = React.lazy(() => import("../modules/website/pages/MySubscriptions.jsx"))
const MyProfileNew = React.lazy(() => import("../modules/website/pages/MyProfileNew.jsx"))

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView()
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname, hash])

  return null
}

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Landing /> },
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
      { path: "/my-orders-new", element: <MyOrdersNew /> },
      { path: "/track-order-new", element: <TrackOrderNew /> },
      { path: "/new-ticket-detail", element: <NewTicketDetail /> },
      { path: "/my-subscription-new", element: <MySubscriptions /> },
      { path: "/my-profile-new", element: <MyProfileNew /> },
      ...userRoutesConfig,
    ],
  },
])

export default function WebSite() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  )
}
