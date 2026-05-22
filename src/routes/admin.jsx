import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from "../modules/admin/layout/MainLayout"
import LoginForm from "../modules/admin/pages/Login/Login"
import ForgotPassword from "../modules/admin/pages/Login/ForgotPassword"
import Dashboard from "../modules/admin/pages/Dashboard/Dashboard"
import AuthGuard from "../modules/admin/services/AuthGuard"
import StoryListPage from "../modules/admin/pages/ManageStory/StoryListPage"
import ConfigureCategoryPage from "../modules/admin/pages/ManageStory/ConfigureCategoryPage"
import ConfigureLibraryPage from "../modules/admin/pages/ManageStory/ConfigureLibraryPage"
import RoleListPage from "../modules/admin/pages/MangeUser/RoleListPage"
import UserListPage from "../modules/admin/pages/MangeUser/UserListPage"
import StoryLayout from "../modules/admin/layout/StoryLayout/StoryLayout"
import UploadStory from "../modules/admin/features/ManageStory/StoryLIst/UploadStory"
import OwnBackyard from "../modules/admin/features/ManageStory/StoryLIst/OwnBackyard"
import adminStore from "../modules/admin/store/reduxStore"
import { Provider } from "react-redux"
import CustomerListPage from "../modules/admin/pages/CustomerList/CustomerListPage"
import OrderListPage from "../modules/admin/pages/OrderList/OrderListPage"
import OrderDetails from "../modules/admin/features/OrderList/OrderDetails"
import OrderListLayout from "../modules/admin/layout/OrderListLayout/OrderListLayout"
import OrderDetailsPage from "../modules/admin/pages/OrderList/OrderDetailsPage"
import QcListPage from "../modules/admin/pages/QCList/QcListPage"
import QcLayout from "../modules/admin/layout/QcLayout/QcLayout"
import QcDetailsPage from "../modules/admin/pages/QCList/QcDetailsPage"
import TransactionsPage from "../modules/admin/pages/Transactions/TransactionsPage"
import CouponPage from "../modules/admin/pages/Coupon/CouponPage"
import RewardsPage from "../modules/admin/pages/Rewards/RewardsPage"
import CustomerDetailsPage from "../modules/admin/pages/CustomerList/CustomerDetailsPage"
import VideosTestimonials from "../modules/admin/pages/VideosNTestimonials/VideosTestimonials"
import ReviewsNFeedback from "../modules/admin/pages/ReviewsNFeedback/ReviewsNFeedback"
import ServiceRequests from "../modules/admin/pages/ServiceRequests/ServiceRequests"
import ServiceRequestDetails from "../modules/admin/pages/ServiceRequests/ServiceRequestDetails"
import ConfigureMetaData from "../modules/admin/pages/ManageStory/ConfigureMetaDataPage"
import SubscriptionPage from "../modules/admin/pages/Subscription/SubscriptionPage"
import ReportLoyout from "../modules/admin/layout/ReportLoyout/ReportLoyout"
import OrderReports from "../modules/admin/features/ReportManagement/OrderReports/OrderReports"
import StoryPerformance from "../modules/admin/features/ReportManagement/StoryPerformance/StoryPerformance"
import Subscription from "../modules/admin/features/ReportManagement/Subscription/Subscription"
import ConfigureBanner from "../modules/admin/pages/ConfigureBanner/ConfigureBanner"
import ConfigureBookTypeCategory from "../modules/admin/pages/ManageStory/ConfigureBookTypeCategory/ConfigureBookTypeCategory"
import ConfigureCharacterType from "../modules/admin/pages/ManageStory/ConfigureCharacterType/ConfigureCharacterType"
import ConfigureAgeGroup from "../modules/admin/pages/ManageStory/ConfigureAgeGroup/ConfigureAgeGroup"
import ConfigureCoverImage from "../modules/admin/pages/ManageStory/ConfigureCoverImage/ConfigureCoverImage"
import ComingSoon from "../modules/admin/features/ComingSoon/ComingSoon"
import Failedjobs from "../modules/admin/features/Failedjobs/Failedjobs"
import ComingSoonPage from "../modules/admin/pages/ManageStory/ComingSoonPage"
import AddStory from "../modules/admin/features/ManageStory/StoryLIst/AddStory"

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
            element: <ReportLoyout />,
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
      <RouterProvider router={routes} />
    </Provider>
  )
}
