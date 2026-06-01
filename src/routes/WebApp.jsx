import React, { Suspense } from "react"
import AuthGuard from "../modules/web/services/AuthGuard"
import MainLayout from "../modules/web/layout/MainLayout"
import ScreenshotProtection from "../modules/website/components/screenshot-prevent/screenshot-prevent"

// Lazy-loaded route components
const Login = React.lazy(() => import("../modules/web/pages/Login/Login"))
const BrowseProductsPage = React.lazy(() => import("../modules/web/pages/BrowseProducts/BrowseProductsPage"))
const BookPage = React.lazy(() => import("../modules/web/pages/BookPage/BookPage"))
const Book = React.lazy(() => import("../modules/web/pages/book/book"))
const TryNowAdmin = React.lazy(() => import("../modules/web/pages/TryNow/TryNowAdmin").then(m => ({ default: m.TryNowAdmin })))
const TryNow = React.lazy(() => import("../modules/web/pages/TryNow/TryNow").then(m => ({ default: m.TryNow })))
const PersonalizeBook = React.lazy(() => import("../modules/website/pages/PersonalizeBook"))
const MyCart = React.lazy(() => import("../modules/website/pages/MyCart"))
const MyDraft = React.lazy(() => import("../modules/website/pages/MyDraft"))
const AddressPage = React.lazy(() => import("../modules/website/pages/AddressPage"))
const OrderPlaced = React.lazy(() => import("../modules/website/pages/OrderPlaced"))
const MyOrdersNew = React.lazy(() => import("../modules/website/pages/MyOrdersNew"))
const TrackOrderNew = React.lazy(() => import("../modules/website/pages/TrackOrderNew"))
const NewTicketDetail = React.lazy(() => import("../modules/website/pages/NewTicketDetail"))
const MyProfileNew = React.lazy(() => import("../modules/website/pages/MyProfileNew"))
const FormsPage = React.lazy(() => import("../modules/web/pages/FormsPage/FormsPage"))

const lazySuspense = (element) => (
  <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>{element}</Suspense>
)

export const userRoutesConfig = [
  {
    path: "/user",
    children: [
      {
        path: "login",
        element: (
          <AuthGuard requireAuth={false}>
            {lazySuspense(<Login />)}
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
          {
            index: true,
            element: lazySuspense(<BrowseProductsPage />),
          },
          {
            path: "books",
            element: lazySuspense(<BookPage />),
          },
          {
            path: "book",
            element: lazySuspense(<Book />),
          },
          {
            path: "trial-now",
            element: lazySuspense(<TryNowAdmin />),
          },
          {
            path: "try-now",
            element: (
              <ScreenshotProtection>
                {lazySuspense(<TryNow />)}
              </ScreenshotProtection>
            ),
          },
          {
            path: "personalize_story",
            element: (
              <AuthGuard requireAuth={true}>
                {lazySuspense(<PersonalizeBook />)}
              </AuthGuard>
            ),
          },
          {
            path: "mycart",
            element: (
              <AuthGuard requireAuth={true}>
                {lazySuspense(<MyCart />)}
              </AuthGuard>
            ),
          },
          {
            path: "draft",
            element: (
              <AuthGuard requireAuth={true}>
                {lazySuspense(<MyDraft />)}
              </AuthGuard>
            ),
          },
          {
            path: "address",
            element: (
              <AuthGuard requireAuth={true}>
                {lazySuspense(<AddressPage />)}
              </AuthGuard>
            ),
          },
          {
            path: "ordersuccess",
            element: (
              <AuthGuard requireAuth={true}>
                {lazySuspense(<OrderPlaced />)}
              </AuthGuard>
            ),
          },
          {
            path: "my_orders",
            element: (
              <AuthGuard requireAuth={true}>
                {lazySuspense(<MyOrdersNew />)}
              </AuthGuard>
            ),
          },
          {
            path: "view_orders/:orderId",
            element: (
              <AuthGuard requireAuth={true}>
                {lazySuspense(<TrackOrderNew />)}
              </AuthGuard>
            ),
          },
          {
            path: "view_request",
            element: (
              <AuthGuard requireAuth={true}>
                {lazySuspense(<NewTicketDetail />)}
              </AuthGuard>
            ),
          },
          {
            path: "profile_page",
            element: (
              <AuthGuard requireAuth={true}>
                {lazySuspense(<MyProfileNew />)}
              </AuthGuard>
            ),
          },
          {
            path: "forms",
            element: (
              <AuthGuard requireAuth={false}>
                {lazySuspense(<FormsPage />)}
              </AuthGuard>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <div>404 - Page Not Found</div>,
      },
    ],
  },
]
