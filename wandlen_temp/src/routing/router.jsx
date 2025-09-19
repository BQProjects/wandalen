import { createBrowserRouter } from "react-router-dom";

// Layout imports
import AdminLayout from "../pages/admin/AdminLayout";
import ClientLayout from "../pages/client/ClientLayout";
import Layout from "../Layout";
import OrganizationLayout from "../pages/organization/OrganizationLayout";
import VolunteerLayout from "../pages/volunteer/VolunteerLayout";

// Website page imports (alphabetized)
import Aran from "../pages/website/Aran";
import BecomeVolunteer from "../pages/website/BecomeVolunteer";
import CameraTips from "../pages/website/CameraTips";
import ChooseYourExperience from "../pages/website/ChoseYourExperience";
import HowItWorks from "../pages/volunteer/HOwItWork";
import NatureWalking from "../pages/website/NatureWalking";
import OurApproach from "../pages/website/OurApproach";
import PaymentPageForIndividual from "../pages/website/PaymentPageForIndividual";
import RequestAQuoteForm from "../pages/website/RequestAQuoteForm";
import Subscribe from "../pages/website/Subscribe";
import VideoTraining from "../pages/website/VideoTraning";
import VolunteerSignupForm from "../pages/website/VolunteerSignup";
import Blog from "../pages/website/Blog";

// Client page imports (alphabetized)
import Login from "../pages/client/Login";
import PatientProfile from "../pages/client/PatientProfile";
import SelectVideo from "../pages/client/SelectVideo";
import VideoClient from "../pages/client/VideoClient";

// Organization page imports (alphabetized)
import AllVideos from "../pages/organization/AllVideos";
import ManageClients from "../pages/organization/ManageClients";
import OrgLogin from "../pages/organization/Login";
import OrgSignup from "../pages/organization/Signup";
import OrganizationProfile from "../pages/organization/OrganizationProfile";
import VideoOrganization from "../pages/organization/VideoOrganization";

// Volunteer page imports (alphabetized)
import VolunteerCreateVideo from "../pages/volunteer/VolunteerCreateVideo";
import VolunteerHome from "../pages/volunteer/VolunteerHome";
import VolunteerLogin from "../pages/volunteer/VolunteerLogin";
import VolunteerProfile from "../pages/volunteer/VolunteerProfile";
import VolunteerSignup from "../pages/volunteer/VolunteerSignup";
import VideoVolunteer from "../pages/volunteer/VideoVolunteer";

// Admin page imports (alphabetized)
import AddCustomer from "../pages/admin/AddCustomer";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/admin/AdminLogin";
import LocationRequest from "../pages/admin/LocationRequest";
import ManageQuote from "../pages/admin/ManageQuote";
import ManageSubscription from "../pages/admin/ManageSubscription";
import ManageVideos from "../pages/admin/ManageVideos";
import ManageVolunteer from "../pages/admin/ManageVolunteer";
import OrganizationCreated from "../pages/admin/OrganizationCreated";
import SubscriptionOverview from "../pages/admin/SubscriptionOverview";
import VolunteerDetail from "../pages/admin/VolunteerDetail";

// Component imports
import ProtectedRoute from "../components/ProtectedRoute";
import VolunteerOTP from "../pages/volunteer/VolunteerOTP";
import ClientOTP from "../pages/client/ClientOTP";
import WhyNatureMatters from "../pages/website/WhyNatureMatters";
import PowerofWalking from "../pages/website/PowerofWalking";
import HealthandHappiness from "../pages/website/HealthandHappiness";
import NatureBenefits from "../pages/website/NatureBenefits";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Aran />, // Landing page
      },
      {
        path: "ourapproach",
        element: <OurApproach />, // Our Approach page
      },
      {
        path: "become-volunteer",
        element: <BecomeVolunteer />,
      },
      {
        path: "subscribe",
        element: <Subscribe />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "payment",
        element: <PaymentPageForIndividual />,
      },
      {
        path: "video-training",
        element: <VideoTraining />,
      },
      {
        path: "camera-tips",
        element: <CameraTips />,
      },
      {
        path: "nature-walking",
        element: <NatureWalking />,
      },
      {
        path: "volunteer-signup",
        element: <VolunteerSignupForm />,
      },
      {
        path: "request-quote",
        element: <RequestAQuoteForm />,
      },
      {
        path: "choose-experience",
        element: <ChooseYourExperience />,
      },
      {
        path: "nature-matters",
        element: <WhyNatureMatters />,
      },
      {
        path: "power-of-walking",
        element: <PowerofWalking />,
      },
      {
        path: "health-and-happiness",
        element: <HealthandHappiness />,
      },
      {
        path: "nature-benefits",
        element: <NatureBenefits />,
      },
    ],
  },
  // Authentication routes without layouts (no headers)
  {
    path: "/client/login",
    element: <Login />,
  },
  {
    path: "/organization/login",
    element: <OrgLogin />,
  },
  {
    path: "/organization/signup",
    element: <OrgSignup />,
  },
  {
    path: "/volunteer/login",
    element: <VolunteerLogin />,
  },
  {
    path: "/volunteer/signup",
    element: <VolunteerSignup />,
  },
  {
    path: "/volunteer/otp-verify/:email",
    element: <VolunteerOTP />,
  },
  {
    path: "/client/otp-verify/:email",
    element: <ClientOTP />,
  },
  // Protected client routes with layout
  {
    path: "/client",
    element: (
      <ProtectedRoute allowedRoles={["client"]}>
        <ClientLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: <PatientProfile />,
      },
      {
        index: true,
        element: <SelectVideo />,
      },
      {
        path: "video/:id",
        element: <VideoClient />,
      },
    ],
  },
  // Organization routes (some with layout, some without)
  {
    path: "/organization",
    element: (
      <ProtectedRoute allowedRoles={["organization"]}>
        <OrganizationLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ManageClients />,
      },
      {
        path: "profile",
        element: <OrganizationProfile />,
      },
      {
        path: "all-videos",
        element: <AllVideos />,
      },
      {
        path: "all-videos/video/:id",
        element: <VideoOrganization />,
      },
    ],
  },
  // Protected volunteer routes with layout
  {
    path: "/volunteer",
    element: (
      <ProtectedRoute allowedRoles={["volunteer"]}>
        <VolunteerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <VolunteerHome />,
      },
      {
        path: "profile",
        element: <VolunteerProfile />,
      },
      {
        path: "create-video",
        element: <VolunteerCreateVideo />,
      },
      {
        path: "/volunteer/how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "video/:id",
        element: <VideoVolunteer />,
      },
    ],
  },
  // Admin routes can be added here when needed
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "manage",
        element: <ManageQuote />,
      },
      {
        path: "add-customer",
        element: <AddCustomer />,
      },
      {
        path: "organization-created",
        element: <OrganizationCreated />,
      },
      {
        path: "manage-volunteer",
        element: <ManageVolunteer />,
      },
      {
        path: "volunteer-detail",
        element: <VolunteerDetail />,
      },
      {
        path: "location-request",
        element: <LocationRequest />,
      },
      {
        path: "manage-videos",
        element: <ManageVideos />,
      },
      {
        path: "manage-subscription",
        element: <ManageSubscription />,
      },
      {
        path: "subscription-overview",
        element: <SubscriptionOverview />,
      },
    ],
  },
]);
