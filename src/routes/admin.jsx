import React, { Suspense } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"

// Synchronous: structural/tiny components that must be available immediately
import MainLayout from "../modules/admin/layout/MainLayout"
import StoryLayout from "../modules/admin/layout/StoryLayout/StoryLayout"
import OrderListLayout from "../modules/admin/layout/OrderListLayout/OrderListLayout"
import QcLayout from "../modules/admin/layout/QcLayout/QcLayout"
import ReportLayout from "../modules/admin/layout/ReportLayout/ReportLayout"
import AuthGuard from "../modules/admin/services/AuthGuard"
import adminStore from "../modules/admin/store/reduxStore"
import { Provider } from "react-redux"

// Lazy-loaded page and feature components
const LoginForm = React.lazy(() => import("../modules/admin/pages/Login/Login"))
const ForgotPassword = React.lazy(() => import("../modules/admin/pages/Login/ForgotPassword"))
const CustomerListPage = React.lazy(() => import("../modules/admin/pages/CustomerList/CustomerListPage"))
const CustomerDetailsPage = React.lazy(() => import("../modules/admin/pages/CustomerList/CustomerDetailsPage"))
const OrderListPage = React.lazy(() => import("../modules/admin/pages/OrderList/OrderListPage"))
const OrderDetailsPage = React.lazy(() => import("../modules/admin/pages/OrderList/OrderDetailsPage"))
const StoryListPage = React.lazy(() => import("../modules/admin/pages/ManageStory/StoryListPage"))
const ConfigureCategoryPage = React.lazy(() => import("../modules/admin/pages/ManageStory/ConfigureCategoryPage"))
const ConfigureLibraryPage = React.lazy(() => import("../modules/admin/pages/ManageStory/ConfigureLibraryPage"))
const ConfigureMetaData = React.lazy(() => import("../modules/admin/pages/ManageStory/ConfigureMetaDataPage"))
const ConfigureBookTypeCategory = React.lazy(() => import("../modules/admin/pages/ManageStory/ConfigureBookTypeCategory/ConfigureBookTypeCategory"))
const ConfigureCharacterType = React.lazy(() => import("../modules/admin/pages/ManageStory/ConfigureCharacterType/ConfigureCharacterType"))
const ConfigureAgeGroup = React.lazy(() => import("../modules/admin/pages/ManageStory/ConfigureAgeGroup/ConfigureAgeGroup"))
const ConfigureCoverImage = React.lazy(() => import("../modules/admin/pages/ManageStory/ConfigureCoverImage/ConfigureCoverImage"))
const ComingSoonPage = React.lazy(() => import("../modules/admin/pages/ManageStory/ComingSoonPage"))
const QcListPage = React.lazy(() => import("../modules/admin/pages/QCList/QcListPage"))
const QcDetailsPage = React.lazy(() => import("../modules/admin/pages/QCList/QcDetailsPage"))
const TransactionsPage = React.lazy(() => import("../modules/admin/pages/Transactions/TransactionsPage"))
const CouponPage = React.lazy(() => import("../modules/admin/pages/Coupon/CouponPage"))
const RewardsPage = React.lazy(() => import("../modules/admin/pages/Rewards/RewardsPage"))
const SubscriptionPage = React.lazy(() => import("../modules/admin/pages/Subscription/SubscriptionPage"))
const ReviewsNFeedback = React.lazy(() => import("../modules/admin/pages/ReviewsNFeedback/ReviewsNFeedback"))
const VideosTestimonials = React.lazy(() => import("../modules/admin/pages/VideosNTestimonials/VideosTestimonials"))
const ServiceRequests = React.lazy(() => import("../modules/admin/pages/ServiceRequests/ServiceRequests"))
const ServiceRequestDetails = React.lazy(() => import("../modules/admin/pages/ServiceRequests/ServiceRequestDetails"))
const ConfigureBanner = React.lazy(() => import("../modules/admin/pages/ConfigureBanner/ConfigureBanner"))
const RoleListPage = React.lazy(() => import("../modules/admin/pages/MangeUser/RoleListPage"))
const UserListPage = React.lazy(() => import("../modules/admin/pages/MangeUser/UserListPage"))
const UploadStory = React.lazy(() => import("../modules/admin/features/ManageStory/StoryLIst/UploadStory"))
const OwnBackyard = React.lazy(() => import("../modules/admin/features/ManageStory/StoryLIst/OwnBackyard"))
const AddStory = React.lazy(() => import("../modules/admin/features/ManageStory/StoryLIst/AddStory"))
const OrderReports = React.lazy(() => import("../modules/admin/features/ReportManagement/OrderReports/OrderReports"))
const StoryPerformance = React.lazy(() => import("../modules/admin/features/ReportManagement/StoryPerformance/StoryPerformance"))
const Subscription = React.lazy(() => import("../modules/admin/features/ReportManagement/Subscription/Subscription"))
const ComingSoon = React.lazy(() => import("../modules/admin/features/ComingSoon/ComingSoon"))
const Failedjobs = React.lazy(() => import("../modules/admin/features/Failedjobs/Failedjobs"))

const AdminPageLoader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
    <div style={{ width: 32, height: 32, border: "3px solid #e0e0e0",
      borderTop: "3px solid #1976d2", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
  </div>
)

const routes = createBrowserRouter([
  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: (
          <AuthGuard requireAuth={false}>
            <LoginForm />
          </AuthGuard>
        ),
      },
      {
        path: "forgotPassword",
        element: (
          <AuthGuard requireAuth={false}>
            <ForgotPassword />
          </AuthGuard>
        ),
      },
      {
        path: "",
        element: (
          <AuthGuard requireAuth={true}>
            <MainLayout />
          </AuthGuard>
        ),
        // <StoryListPage />
        children: [
          { index: true, element: <CustomerListPage /> },
          {
            path: "customerlist",
            children: [
              { index: true, element: <CustomerListPage /> },
              {
                path: "details",
                element: <CustomerDetailsPage />,
              },
            ],
          },
          {
            path: "orderlist",
            element: <OrderListLayout />,
            children: [
              { index: true, element: <OrderListPage /> },
              { path: "order_details", element: <OrderDetailsPage /> },
            ],
          },
          { path: "configure_website_banner", element: <ConfigureBanner /> },
          { path: "failed-jobs", element: <Failedjobs /> },
          {
            path: "storylists",
            element: <StoryLayout />,
            children: [
              { index: true, element: <StoryListPage /> },
              { path: "upload-story", element: <UploadStory /> },
              { path: "add-story", element: <AddStory /> },
              {
                path: "in-your-backyard",
                element: <OwnBackyard />,
              },
            ],
          },
          { path: "configurecategory", element: <ConfigureCategoryPage /> },
          { path: "configure_coming_soon", element: <ComingSoonPage /> },
          {
            path: "configure-book-type",
            element: <ConfigureBookTypeCategory />,
          },
          {
            path: "configure-character-type",
            element: <ConfigureCharacterType />,
          },
          { path: "configure-age-group", element: <ConfigureAgeGroup /> },
          { path: "configure-cover-image", element: <ConfigureCoverImage /> },
          { path: "configure_meta-tag", element: <ConfigureMetaData /> },
          { path: "configurelists", element: <ConfigureLibraryPage /> },
          { path: "transactions", element: <TransactionsPage /> },
          { path: "configure_reward", element: <RewardsPage /> },
          { path: "configure_coupon", element: <CouponPage /> },
          { path: "configure_subscriptions", element: <SubscriptionPage /> },
          {
            path: "qc_list",
            element: <QcLayout />,
            children: [
              { index: true, element: <QcListPage /> },
              { path: "qc_details", element: <QcDetailsPage /> },
            ],
          },
          {
            path: "reports",
            element: <ReportLayout />,
            children: [
              { index: true, element: <OrderReports /> },
              {
                path: "story_performance",
                element: <StoryPerformance />,
              },
              {
                path: "subscription",
                element: <Subscription />,
              },
            ],
          },

          { path: "billing-payments", element: <div>Billing & Payments</div> },
          { path: "rewards", element: <div>Rewards</div> },

          { path: "reviews-feedback", element: <ReviewsNFeedback /> },
          {
            path: "videos-testimonials",
            element: <VideosTestimonials />,
          },
          {
            path: "service-request",
            children: [
              { index: true, element: <ServiceRequests /> },
              {
                path: "details",
                element: <ServiceRequestDetails />,
              },
            ],
          },
          // { path: "userlist", element: <div>Service Requests</div> },
          // { path: "privacy-policy", element: <div>Privacy Policy</div> },
          // {
          //   path: "configure_coming_soon",
          //   // element: <ComingSoon />,
          //   element: <div>Privacy Policy</div>,
          // },
          { path: "role-list", element: <RoleListPage /> },
          { path: "user-list", element: <UserListPage /> },
        ],
      },
    ],
  },
])

export default function Admin() {
  return (
    <Provider store={adminStore}>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<AdminPageLoader />}>
        <RouterProvider router={routes} />
      </Suspense>
    </Provider>
  )
}
