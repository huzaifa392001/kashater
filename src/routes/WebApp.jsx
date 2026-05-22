import React, { useEffect, Suspense } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AuthGuard from "../modules/web/services/AuthGuard"
import MainLayout from "../modules/web/layout/MainLayout"
import store from "../modules/web/store/reduxStore"
import { Provider } from "react-redux"
import ScreenshotProtection from "../modules/website/components/screenshot-prevent/screenshot-prevent"

// Page chunks — loaded only when the route is visited
const Login               = React.lazy(() => import("../modules/web/pages/Login/Login"))
const HomePage            = React.lazy(() => import("../modules/web/pages/Home/HomePage"))
const BrowseProductsPage  = React.lazy(() => import("../modules/web/pages/BrowseProducts/BrowseProductsPage"))
const BookPage            = React.lazy(() => import("../modules/web/pages/BookPage/BookPage"))
const MyCartPage          = React.lazy(() => import("../modules/web/features/MyCart/MyCartPage"))
const Address             = React.lazy(() => import("../modules/web/features/MyCart/Address"))
const OrderSuccess        = React.lazy(() => import("../modules/web/features/MyCart/OrderSuccess"))
const MyOrdersPage        = React.lazy(() => import("../modules/web/pages/MyOrders/MyOrdersPage"))
const ViewOrder           = React.lazy(() => import("../modules/web/features/MyOrders/ViewOrder/ViewOrder"))
const ProfilePage         = React.lazy(() => import("../modules/web/features/ProfilePage/ProfilePage"))
const PersonalizeThisStory = React.lazy(() => import("../modules/web/features/PersonalizeThisStory/PersonalizeThisStory"))
const ViewRequest         = React.lazy(() => import("../modules/web/features/MyOrders/ViewRequest/ViewRequest"))
const MySubscriptions     = React.lazy(() => import("../modules/web/pages/MySubscriptions/MySubscriptions"))
const TryNow              = React.lazy(() => import("../modules/web/pages/TryNow/TryNow").then(m => ({ default: m.TryNow })))
const TryNowAdmin         = React.lazy(() => import("../modules/web/pages/TryNow/TryNowAdmin").then(m => ({ default: m.TryNowAdmin })))
const FormsPage           = React.lazy(() => import("../modules/web/pages/FormsPage/FormsPage"))
const PersonalizeBook     = React.lazy(() => import("../modules/website/pages/PersonalizeBook"))
const MyCart              = React.lazy(() => import("../modules/website/pages/MyCart"))
const AddressPage         = React.lazy(() => import("../modules/website/pages/AddressPage"))
const OrderPlaced         = React.lazy(() => import("../modules/website/pages/OrderPlaced"))
const MyOrdersNew         = React.lazy(() => import("../modules/website/pages/MyOrdersNew"))
const TrackOrderNew       = React.lazy(() => import("../modules/website/pages/TrackOrderNew"))
const NewTicketDetail     = React.lazy(() => import("../modules/website/pages/NewTicketDetail"))
const MyProfileNew        = React.lazy(() => import("../modules/website/pages/MyProfileNew"))
const Book                = React.lazy(() => import("../modules/web/pages/book/book"))
const MyDraft             = React.lazy(() => import("../modules/website/pages/MyDraft"))
const routes = createBrowserRouter([
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
          {
            index: true,
            element: <BrowseProductsPage />,
          },
          // {
          //   index: true,
          //   element: <HomePage />,
          // },
          // {
          //   path: "browse_our_products",
          //   element: <BrowseProductsPage />,
          // },
          {
            path: "books",
            element: <BookPage />
          },
          {
            path: "book",
            element: <Book />,
          },
          {
            path: "trial-now",
            element: (
              <TryNowAdmin />
            ),
          },
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
                {/* <PersonalizeThisStory /> */}
                <PersonalizeBook />
              </AuthGuard>
            ),
          },

          {
            path: "mycart",
            element: (
              <AuthGuard requireAuth={true}>
                {/* <MyCartPage /> */}
                <MyCart />
              </AuthGuard>
            ),
          },
          {
            path: "draft",
            element: (
              <AuthGuard requireAuth={true}>
                {/* <MyCartPage /> */}
                <MyDraft />
              </AuthGuard>
            ),
          },
          {
            path: "address",
            element: (
              <AuthGuard requireAuth={true}>
                {/* <Address /> */}
                <AddressPage />
              </AuthGuard>
            ),
          },
          {
            path: "ordersuccess",
            element: (
              <AuthGuard requireAuth={true}>
                {/* <OrderSuccess /> */}
                <OrderPlaced />
              </AuthGuard>
            ),
          },
          {
            path: "my_orders",
            element: (
              <AuthGuard requireAuth={true}>
                {/* <MyOrdersPage /> */}
                <MyOrdersNew />
              </AuthGuard>
            ),
          },
          {
            path: "view_orders/:orderId",
            element: (
              <AuthGuard requireAuth={true}>
                {/* <ViewOrder /> */}
                <TrackOrderNew />
              </AuthGuard>
            ),
          },
          // {
          //   path: "coming-soon",
          //   element: (
          //     <AuthGuard requireAuth={false}>
          //       <Coming_soon />
          //     </AuthGuard>
          //   ),
          // },

          // {
          //   path: "my_subscriptions",
          //   element: (
          //     <AuthGuard requireAuth={true}>
          //       <MySubscriptions />
          //     </AuthGuard>
          //   ),
          // },
          {
            path: "view_request",
            element: (
              <AuthGuard requireAuth={true}>
                {/* <ViewRequest /> */}
                <NewTicketDetail />
              </AuthGuard>
            ),
          },

          {
            path: "profile_page",
            element: (
              <AuthGuard requireAuth={true}>
                {/* <ProfilePage /> */}
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

      {
        path: "*",
        element: <div>404 - Page Not Found</div>,
      },
    ],
  },
])
export default function WebApp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Provider store={store}>
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <RouterProvider router={routes} />
      </Suspense>
    </Provider>
  )
}
