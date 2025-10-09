import { createBrowserRouter } from "react-router-dom";

// Layout imports
import AdminLayout from "../pages/admin/AdminLayout";
import ClientLayout from "../pages/client/ClientLayout";
import Layout from "../Layout";
import OrganizationLayout from "../pages/organization/OrganizationLayout";
import VolunteerLayout from "../pages/volunteer/VolunteerLayout";
import AllVideosAdmin from "../pages/admin/AllVideo";
import VideoAdmin from "../pages/admin/VideoAdmin";
import CreateVideo from "../pages/admin/CreateVideo";

// Website page imports (alphabetized)
import Agreement from "../pages/website/Agreement";
import TermnCondition from "../pages/website/TermnCondition";
import Aran from "../pages/website/Aran";
import BecomeVolunteer from "../pages/website/BecomeVolunteer";
import ChooseYourExperience from "../pages/website/ChoseYourExperience";
import ForgotPassword from "../pages/website/ForgotPassword";
import HowItWorks from "../pages/volunteer/HowItWorks";
import OurApproach from "../pages/website/OurApproach";
import PaymentPageForIndividual from "../pages/website/PaymentPageForIndividual";
import PaymentSuccess from "../pages/website/PaymentSuccess";
import RequestAQuoteForm from "../pages/website/RequestAQuoteForm";
import Subscribe from "../pages/website/Subscribe";
import Training from "../pages/website/Traning";
import VolunteerSignupForm from "../pages/website/VolunteerSignup";
import ViewBlog from "../pages/website/ViewBlog";
import Blog from "../pages/website/Blog";
import GeneratePassword from "../pages/website/GeneratePassword";
import ReadMoreAboutTina from "../pages/website/ReadMoreAboutTina";

// Client page imports (alphabetized)
import Login from "../pages/website/Login";
import PatientProfile from "../pages/client/PatientProfile";
import SelectVideo from "../pages/client/SelectVideo";
import VideoClient from "../pages/client/VideoClient";

// Organization page imports (alphabetized)
import AllVideos from "../pages/organization/AllVideos";
import ManageClients from "../pages/organization/ManageClients";
import OrganizationProfile from "../pages/organization/OrganizationProfile";
import VideoOrganization from "../pages/organization/VideoOrganization";

// Volunteer page imports (alphabetized)
import VolunteerCreateVideo from "../pages/volunteer/VolunteerCreateVideo";
import VolunteerHome from "../pages/volunteer/VolunteerHome";
//import VolunteerLogin from "../pages/volunteer/VolunteerLogin"; not used anymore
import VolunteerProfile from "../pages/volunteer/VolunteerProfile";
//import VolunteerSignup from "../pages/volunteer/VolunteerSignup"; not used anymore
import VideoVolunteer from "../pages/volunteer/VideoVolunteer";

// Admin page imports (alphabetized)
import AddCustomer from "../pages/admin/AddCustomer";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/admin/AdminLogin";
import AllBlog from "../pages/admin/allblog";
import BlogForm from "../pages/admin/BlogForm";
import LocationRequest from "../pages/admin/LocationRequest";
import ManageQuote from "../pages/admin/ManageQuote";
import ManageSubscription from "../pages/admin/ManageSubscription";
import ManageSubscribers from "../pages/admin/ManageSubscribers";
import ManageVideos from "../pages/admin/ManageVideos";
import ManageVolunteer from "../pages/admin/ManageVolunteer";
import OrganizationCreated from "../pages/admin/OrganizationCreated";
import SubscriptionOverview from "../pages/admin/SubscriptionOverview";
import UpdateCredentials from "../pages/admin/UpdateCredentail";
import VolunteerDetail from "../pages/admin/VolunteerDetail";
import TrainingDetails from "../pages/admin/VolunteerTrainingDetails";

// Component imports
import ProtectedRoute from "../components/ProtectedRoute";
import Otp from "../pages/website/OTP";
import FutureVideos from "../pages/volunteer/FutureVideos";

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
        path: "ourVission",
        element: <OurApproach />, // Our Vision page
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
        path: "blog/:id",
        element: <ViewBlog />,
      },
      {
        path: "payment",
        element: <PaymentPageForIndividual />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "training/:id",
        element: <Training />,
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
        path: "generate-pass/:id",
        element: <GeneratePassword />,
      },
      {
        path: "agreement",
        element: <Agreement />,
      },
      {
        path: "terms",
        element: <TermnCondition />,
      },
      {
        path: "read-more",
        element: <ReadMoreAboutTina />,
      }
    ],
  },
  // Authentication routes without layouts (no headers)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/organization/signup",
    element: <RequestAQuoteForm />,
  },
  {
    path: "/client/otp-verify/:email",
    element: <Otp />, // Client OTP verification
  },
  {
    path: "/volunteer/otp-verify/:email",
    element: <Otp />, // Volunteer OTP verification
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
      {
        path: "future-videos",
        element: <FutureVideos />,
      }
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
        path: "volunteer/:id",
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
        path: "manage-subscribers",
        element: <ManageSubscribers />,
      },
      {
        path: "subscription-overview",
        element: <SubscriptionOverview />,
      },
      {
        path: "all-videos",
        element: <AllVideosAdmin />,
      },
      {
        path: "video/:id",
        element: <VideoAdmin />,
      },
      {
        path: "create-video",
        element: <CreateVideo />,
      },
      {
        path: "all-blog",
        element: <AllBlog />,
      },
      {
        path: "blog-form",
        element: <BlogForm />,
      },
      {
        path: "blog-form/:id",
        element: <BlogForm />,
      },
      {
        path: "training-details",
        element: <TrainingDetails />,
      },
      {
        path: "update-credentials",
        element: <UpdateCredentials />,
      },
    ],
  },
]);
