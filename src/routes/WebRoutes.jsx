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
import AuthGuard from "../modules/web/services/AuthGuard"
import MainLayout from "../modules/web/layout/MainLayout"
import ScreenshotProtection from "../modules/website/components/screenshot-prevent/screenshot-prevent"

// ── Website public pages ──────────────────────────────────────────────────────
const Landing             = React.lazy(() => import("../modules/website/pages/Landing/Landing"))
const Terms               = React.lazy(() => import("../modules/website/pages/Privacy/privacy"))
const Privacy             = React.lazy(() => import("../modules/website/pages/Terms/terms"))
const Delivery            = React.lazy(() => import("../modules/website/pages/Delivery/delivery"))
const Refund              = React.lazy(() => import("../modules/website/pages/Refund/refund"))
const About               = React.lazy(() => import("../modules/website/pages/About/About"))
const Faq                 = React.lazy(() => import("../modules/website/pages/Faq/Faq").then(m => ({ default: m.Faq })))
const ViewBook            = React.lazy(() => import("../modules/website/pages/ViewBook"))
const PersonalizeBook     = React.lazy(() => import("../modules/website/pages/PersonalizeBook"))
const EditStory           = React.lazy(() => import("../modules/website/pages/EditStory"))
const MyCart              = React.lazy(() => import("../modules/website/pages/MyCart"))
const AddressPage         = React.lazy(() => import("../modules/website/pages/AddressPage"))
const OrderPlaced         = React.lazy(() => import("../modules/website/pages/OrderPlaced"))
const PopupModel          = React.lazy(() => import("../modules/website/pages/PopupModel"))
const TryNowSamplePreview = React.lazy(() => import("../modules/website/pages/TryNowSamplePreview"))
const MyOrdersNew         = React.lazy(() => import("../modules/website/pages/MyOrdersNew"))
const TrackOrderNew       = React.lazy(() => import("../modules/website/pages/TrackOrderNew"))
const NewTicketDetail     = React.lazy(() => import("../modules/website/pages/NewTicketDetail"))
const MySubscriptions     = React.lazy(() => import("../modules/website/pages/MySubscriptions"))
const MyProfileNew        = React.lazy(() => import("../modules/website/pages/MyProfileNew"))
const MyDraft             = React.lazy(() => import("../modules/website/pages/MyDraft"))

// ── User app pages ────────────────────────────────────────────────────────────
const Login               = React.lazy(() => import("../modules/web/pages/Login/Login"))
const BrowseProductsPage  = React.lazy(() => import("../modules/web/pages/BrowseProducts/BrowseProductsPage"))
const BookPage            = React.lazy(() => import("../modules/web/pages/BookPage/BookPage"))
const Book                = React.lazy(() => import("../modules/web/pages/book/book"))
const TryNow              = React.lazy(() => import("../modules/web/pages/TryNow/TryNow").then(m => ({ default: m.TryNow })))
const TryNowAdmin         = React.lazy(() => import("../modules/web/pages/TryNow/TryNowAdmin").then(m => ({ default: m.TryNowAdmin })))
const FormsPage           = React.lazy(() => import("../modules/web/pages/FormsPage/FormsPage"))
const MySubscriptionsWeb  = React.lazy(() => import("../modules/web/pages/MySubscriptions/MySubscriptions"))
// kept for commented-out routes (no bundle cost since they're never imported at runtime)
const MyCartPage          = React.lazy(() => import("../modules/web/features/MyCart/MyCartPage"))
const Address             = React.lazy(() => import("../modules/web/features/MyCart/Address"))
const OrderSuccess        = React.lazy(() => import("../modules/web/features/MyCart/OrderSuccess"))
const MyOrdersPage        = React.lazy(() => import("../modules/web/pages/MyOrders/MyOrdersPage"))
const ViewOrder           = React.lazy(() => import("../modules/web/features/MyOrders/ViewOrder/ViewOrder"))
const ProfilePage         = React.lazy(() => import("../modules/web/features/ProfilePage/ProfilePage"))
const PersonalizeThisStory = React.lazy(() => import("../modules/web/features/PersonalizeThisStory/PersonalizeThisStory"))
const ViewRequest         = React.lazy(() => import("../modules/web/features/MyOrders/ViewRequest/ViewRequest"))

// ── Shared layout helpers (from WebSite) ─────────────────────────────────────
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
      <ScrollRestoration />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Outlet />
      </Suspense>
    </>
  )
}

// ── Unified router ────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  // ── Public website routes (header/footer via RootLayout) ──────────────────
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
    ],
  },

  // ── Authenticated user app routes (/user/*) ───────────────────────────────
  {
    path: "/user",
    children: [
      {
        path: "login",
        element: (
          <AuthGuard requireAuth={false}>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "forgotPassword",
        element: (
          <AuthGuard requireAuth={false}>
            <div>Forgot Password Page</div>
          </AuthGuard>
        ),
      },
      {
        path: "",
        element: <MainLayout />,
        children: [
          { index: true, element: <BrowseProductsPage /> },
          { path: "books", element: <BookPage /> },
          { path: "book", element: <Book /> },
          { path: "trial-now", element: <TryNowAdmin /> },
          {
            path: "try-now",
            element: (
              <ScreenshotProtection>
                <TryNow />
              </ScreenshotProtection>
            ),
          },
          {
            path: "personalize_story",
            element: (
              <AuthGuard requireAuth={true}>
                <PersonalizeBook />
              </AuthGuard>
            ),
          },
          {
            path: "mycart",
            element: (
              <AuthGuard requireAuth={true}>
                <MyCart />
              </AuthGuard>
            ),
          },
          {
            path: "draft",
            element: (
              <AuthGuard requireAuth={true}>
                <MyDraft />
              </AuthGuard>
            ),
          },
          {
            path: "address",
            element: (
              <AuthGuard requireAuth={true}>
                <AddressPage />
              </AuthGuard>
            ),
          },
          {
            path: "ordersuccess",
            element: (
              <AuthGuard requireAuth={true}>
                <OrderPlaced />
              </AuthGuard>
            ),
          },
          {
            path: "my_orders",
            element: (
              <AuthGuard requireAuth={true}>
                <MyOrdersNew />
              </AuthGuard>
            ),
          },
          {
            path: "view_orders/:orderId",
            element: (
              <AuthGuard requireAuth={true}>
                <TrackOrderNew />
              </AuthGuard>
            ),
          },
          {
            path: "view_request",
            element: (
              <AuthGuard requireAuth={true}>
                <NewTicketDetail />
              </AuthGuard>
            ),
          },
          {
            path: "profile_page",
            element: (
              <AuthGuard requireAuth={true}>
                <MyProfileNew />
              </AuthGuard>
            ),
          },
          {
            path: "forms",
            element: (
              <AuthGuard requireAuth={false}>
                <FormsPage />
              </AuthGuard>
            ),
          },
        ],
      },
      { path: "*", element: <div>404 - Page Not Found</div> },
    ],
  },
])

export default function WebRoutes() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  )
}
