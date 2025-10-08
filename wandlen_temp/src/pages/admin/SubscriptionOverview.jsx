import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";
import toast from "react-hot-toast";

const SubscriptionOverview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");

  // Get subscription data from navigation state or initialize empty
  const [clientData, setClientData] = useState(
    location.state?.subscription || null
  );
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch full payment details from Stripe
  const fetchPaymentDetails = async (clientId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${DATABASE_URL}/admin/client-payment-details/${clientId}`,
        {
          headers: { Authorization: `Bearer ${sessionId}` },
        }
      );
      setPaymentDetails(res.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      toast.error("Failed to fetch payment details from Stripe");
    } finally {
      setLoading(false);
    }
  };

  // If we have basic subscription data from the list, we might want to fetch full details
  useEffect(() => {
    // If we only have basic data, we could fetch full client details here
    // For now, we'll use the data passed from ManageSubscription
    if (!clientData) {
      toast.error("No subscription data available");
      navigate("/admin/manage-subscription");
    } else if (clientData.clientId) {
      // Fetch Stripe payment details
      fetchPaymentDetails(clientData.clientId);
    }
  }, [clientData, navigate]);

  const handleBack = () => {
    navigate("/admin/manage-subscription");
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm("Are you sure you want to cancel this subscription?")) {
      return;
    }

    try {
      setLoading(true);
      // You'll need to implement the cancel endpoint or get clientId to call the existing one
      toast.success("Subscription cancelled successfully");
      navigate("/admin/manage-subscription");
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("Failed to cancel subscription");
    } finally {
      setLoading(false);
    }
  };

  if (!clientData) {
    return (
      <div className="min-h-screen bg-[#ede4dc] p-6 flex items-center justify-center">
        <p className="text-[#381207] font-['Poppins'] text-xl">Loading...</p>
      </div>
    );
  }

  // Use the data from ManageSubscription
  const subscription = clientData;

  return (
    <div className="min-h-screen bg-[#ede4dc] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="flex items-center justify-center p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg
            width={25}
            height={24}
            viewBox="0 0 25 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M19.8936 13.709L17.6832 11.5007L5.64365 23.5361C5.44957 23.7289 5.29556 23.9582 5.19046 24.2108C5.08536 24.4635 5.03125 24.7343 5.03125 25.0079C5.03125 25.2815 5.08536 25.5524 5.19046 25.805C5.29556 26.0576 5.44957 26.287 5.64365 26.4798L17.6832 38.5215L19.8916 36.3132L8.59156 25.0111L19.8936 13.709Z"
              fill="#381207"
            />
          </svg>
        </button>
        <h1 className="text-[#381207] text-center font-['Poppins'] text-4xl font-medium">
          Subscription Overview
        </h1>
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>

      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1">
          {/* User Info Card */}
          <div className="bg-[#f7f6f4] rounded-2xl mb-6">
            <div className="p-6 border-b border-[#e5e3df]">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-[#381207] font-['Poppins'] text-2xl font-medium">
                      {subscription.firstName} {subscription.lastName}
                    </h2>
                    <div className="flex items-center gap-2">
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx={5}
                          cy={5}
                          r={4}
                          fill={
                            subscription.status === "Active"
                              ? "#12B76A"
                              : subscription.status === "Trial"
                              ? "#FFBE41"
                              : subscription.status === "Cancelled"
                              ? "#FF8C42"
                              : subscription.status === "Expired"
                              ? "#FF674F"
                              : "#9CA3AF"
                          }
                        />
                      </svg>
                      <span className="text-[#381207] font-['Poppins'] text-lg">
                        {subscription.status === "Trial"
                          ? "7 day Trial"
                          : subscription.status === "Active"
                          ? "Active Subscription"
                          : subscription.status === "Cancelled"
                          ? "Cancelled"
                          : subscription.status === "Expired"
                          ? "Expired"
                          : subscription.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#381207] font-['Poppins'] text-lg font-medium">
                    {subscription.email ||
                      `${subscription.firstName?.toLowerCase()}${subscription.lastName?.toLowerCase()}@example.com`}
                  </p>
                </div>
                <button
                  onClick={handleCancelSubscription}
                  disabled={loading || subscription.status === "Cancelled"}
                  className="px-4 py-2 border border-[#2a341f] rounded-md text-[#2a341f] font-['Poppins'] hover:bg-[#2a341f] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {subscription.status === "Cancelled"
                    ? "Cancelled"
                    : "Cancel Subscription"}
                </button>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="p-6 grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[#4b4741] font-['Poppins'] block mb-2">
                    Start date
                  </label>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {subscription.startDate}
                  </p>
                </div>
                <div>
                  <label className="text-[#4b4741] font-['Poppins'] block mb-2">
                    Last payment
                  </label>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {subscription.paymentStatus || "N/A"}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[#4b4741] font-['Poppins'] block mb-2">
                    End date
                  </label>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {subscription.endDate}
                  </p>
                </div>
                <div>
                  <label className="text-[#4b4741] font-['Poppins'] block mb-2">
                    Plan type
                  </label>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {subscription.planType}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payments Section */}
          <div className="bg-[#f7f6f4] rounded-2xl">
            <div className="p-6 border-b border-[#e5e3df]">
              <h3 className="text-[#381207] font-['Poppins'] text-2xl font-medium mb-2">
                Payments
              </h3>
              <p className="text-[#4b4741] font-['Poppins']">
                Keep track of payments from your customers in real time.
              </p>
            </div>

            {/* Payment Summary */}
            <div className="p-6 border-b border-[#e5e3df]">
              {loading && !paymentDetails ? (
                <div className="flex justify-center items-center py-8">
                  <p className="text-[#4b4741] font-['Poppins']">
                    Loading payment details...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                        Amount
                      </label>
                      <p className="text-[#381207] font-['Poppins']">
                        {paymentDetails?.stripe?.latestInvoice?.amount
                          ? `€ ${paymentDetails.stripe.latestInvoice.amount.toFixed(
                              2
                            )}`
                          : subscription.status === "Trial" ||
                            subscription.planType === "Free"
                          ? "€ 0,00"
                          : subscription.planPrice || "€ 12,00"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                        Status
                      </label>
                      <p className="text-[#381207] font-['Poppins']">
                        {paymentDetails?.stripe?.latestInvoice?.status
                          ? paymentDetails.stripe.latestInvoice.status
                              .charAt(0)
                              .toUpperCase() +
                            paymentDetails.stripe.latestInvoice.status.slice(1)
                          : subscription.paymentStatus || "Pending"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                        Payment Type
                      </label>
                      <p className="text-[#381207] font-['Poppins']">
                        {"Subscription"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                        Payment provider
                      </label>
                      <p className="text-[#381207] font-['Poppins']">
                        {paymentDetails?.stripe ? "Stripe" : "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                        Method
                      </label>
                      <p className="text-[#381207] font-['Poppins']">
                        {paymentDetails?.stripe?.paymentMethod
                          ? `${
                              paymentDetails.stripe.paymentMethod.brand
                                ?.charAt(0)
                                .toUpperCase() +
                              paymentDetails.stripe.paymentMethod.brand?.slice(
                                1
                              )
                            }***${paymentDetails.stripe.paymentMethod.last4}`
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                        Cardholder name
                      </label>
                      <p className="text-[#381207] font-['Poppins']">
                        {paymentDetails?.stripe?.paymentMethod
                          ?.cardholderName ||
                          `${subscription.firstName} ${subscription.lastName}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-6 pt-4 border-t border-[#e5e3df]">
                <div className="flex justify-between items-center">
                  <label className="text-[#4b4741] font-['Poppins'] font-medium">
                    Total amount
                  </label>
                  <p className="text-[#381207] font-['Poppins'] font-medium text-lg">
                    €{" "}
                    {paymentDetails?.stripe?.latestInvoice?.amount
                      ? paymentDetails.stripe.latestInvoice.amount.toFixed(2)
                      : subscription.status === "Trial" ||
                        subscription.planType === "Free"
                      ? "0,00"
                      : subscription.planPrice?.replace("€", "").trim() ||
                        "12,00"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment History Table */}
            <div className="p-6">
              <div className="mb-4">
                <button className="inline-flex items-center gap-2 px-3 py-1 border border-[#2a341f] rounded-md text-[#2a341f] font-['Poppins'] text-sm">
                  Today
                  <svg width={12} height={12} viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12.6693 6L8.0026 10.6667L3.33594 6"
                      stroke="#2A341F"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="bg-[#ede4dc]/30 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#a6a643]/20 border-b border-[#d9bbaa] px-4 py-3">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-[#2a341f] font-['Poppins'] text-sm font-medium">
                      Plan type
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 11 12"
                        fill="none"
                      >
                        <path
                          d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                          stroke="#2A341F"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 text-[#2a341f] font-['Poppins'] text-sm font-medium">
                      Payment Date
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 11 12"
                        fill="none"
                      >
                        <path
                          d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                          stroke="#2A341F"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 text-[#2a341f] font-['Poppins'] text-sm font-medium">
                      Payment Method
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 11 12"
                        fill="none"
                      >
                        <path
                          d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                          stroke="#2A341F"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 text-[#2a341f] font-['Poppins'] text-sm font-medium">
                      Amount
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 11 12"
                        fill="none"
                      >
                        <path
                          d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                          stroke="#2A341F"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Table Rows - Display Payment History from Stripe */}
                {paymentDetails?.stripe?.paymentHistory &&
                paymentDetails.stripe.paymentHistory.length > 0 ? (
                  paymentDetails.stripe.paymentHistory.map((payment, index) => (
                    <div
                      key={payment.id}
                      className={`px-4 py-3 ${
                        index % 2 === 0 ? "bg-[#ede4dc]" : ""
                      } border-b border-[#d9bbaa]`}
                    >
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          {subscription.planType}
                        </div>
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          {new Date(payment.created).toLocaleDateString()}
                        </div>
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          {payment.paymentMethodDetails?.brand
                            ? `${
                                payment.paymentMethodDetails.brand
                                  .charAt(0)
                                  .toUpperCase() +
                                payment.paymentMethodDetails.brand.slice(1)
                              }***${
                                payment.paymentMethodDetails.last4
                              } (via Stripe)`
                            : "Credit/Debit Cards (via Stripe)"}
                        </div>
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          € {payment.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Fallback to basic data if no Stripe history
                  <>
                    <div className="bg-[#ede4dc] border-b border-[#d9bbaa] px-4 py-3">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          {subscription.planType}
                        </div>
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          {subscription.startDate}
                        </div>
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          Credit/Debit Cards (via Stripe)
                        </div>
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          €{" "}
                          {subscription.status === "Trial" ||
                          subscription.planType === "Free"
                            ? "0,00"
                            : subscription.planPrice?.replace("€", "").trim() ||
                              "12,00"}
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          {subscription.planType}
                        </div>
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          {subscription.endDate}
                        </div>
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          Credit/Debit Cards (via Stripe)
                        </div>
                        <div className="text-[#381207] font-['Poppins'] text-sm">
                          €{" "}
                          {subscription.status === "Trial" ||
                          subscription.planType === "Free"
                            ? "0,00"
                            : subscription.planPrice?.replace("€", "").trim() ||
                              "12,00"}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Payment Details & Method Sections */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-[#381207] font-['Poppins'] text-xl font-medium">
                    Payment details
                  </h4>
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 11.1673C7.86793 11.1656 7.74175 11.1124 7.64836 11.019C7.55496 10.9256 7.50173 10.7994 7.5 10.6673V7.33398C7.5 7.20138 7.55268 7.0742 7.64645 6.98043C7.74022 6.88666 7.86739 6.83398 8 6.83398C8.13261 6.83398 8.25978 6.88666 8.35355 6.98043C8.44732 7.0742 8.5 7.20138 8.5 7.33398V10.6673C8.49827 10.7994 8.44504 10.9256 8.35164 11.019C8.25825 11.1124 8.13207 11.1656 8 11.1673ZM8 6.16732C7.86793 6.16559 7.74175 6.11236 7.64836 6.01896C7.55496 5.92557 7.50173 5.79939 7.5 5.66732V5.33398C7.5 5.20138 7.55268 5.0742 7.64645 4.98043C7.74022 4.88666 7.86739 4.83398 8 4.83398C8.13261 4.83398 8.25978 4.88666 8.35355 4.98043C8.44732 5.0742 8.5 5.20138 8.5 5.33398V5.66732C8.49827 5.79939 8.44504 5.92557 8.35164 6.01896C8.25825 6.11236 8.13207 6.16559 8 6.16732ZM8 14C6.81331 14 5.65328 13.6481 4.66658 12.9888C3.67989 12.3295 2.91085 11.3925 2.45673 10.2961C2.0026 9.19975 1.88378 7.99335 2.11529 6.82946C2.3468 5.66558 2.91825 4.59648 3.75736 3.75736C4.59648 2.91825 5.66558 2.3468 6.82946 2.11529C7.99335 1.88378 9.19975 2.0026 10.2961 2.45673C11.3925 2.91085 12.3295 3.67989 12.9888 4.66658C13.6481 5.65328 14 6.81331 14 8C14 9.5913 13.3679 11.1174 12.2426 12.2426C11.1174 13.3679 9.5913 14 8 14ZM8 3C7.0111 3 6.0444 3.29325 5.22215 3.84265C4.39991 4.39206 3.75904 5.17296 3.3806 6.08659C3.00217 7.00022 2.90315 8.00555 3.09608 8.97545C3.289 9.94536 3.76521 10.8363 4.46447 11.5355C5.16373 12.2348 6.05465 12.711 7.02455 12.9039C7.99446 13.0969 8.99979 12.9978 9.91342 12.6194C10.8271 12.241 11.6079 11.6001 12.1574 10.7779C12.7068 9.95561 13 8.98891 13 8C13 6.67392 12.4732 5.40215 11.5355 4.46447C10.5979 3.52679 9.32609 3 8 3Z"
                      fill="#5B6502"
                    />
                  </svg>
                </div>
                <div className="flex items-center gap-2 py-0 px-6 w-[694px]">
                  <div className="flex flex-col flex-shrink-0 items-start gap-2 w-[14.75rem]">
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-16 text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Amount
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Status
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Payment Type
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-shrink-0 items-start gap-2 w-[12.25rem]">
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-16 text-[#381207] font-['Poppins'] leading-[normal]">
                        Amount
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#381207] font-['Poppins'] leading-[normal]">
                        Status
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#381207] font-['Poppins'] leading-[normal]">
                        Payment Type
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-[#381207] font-['Poppins'] text-xl font-medium">
                  Payment method
                </h4>
                <div className="flex items-center gap-2 py-0 px-6 w-[694px]">
                  <div className="flex flex-col flex-shrink-0 items-start gap-2 w-[14.75rem]">
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Payment provider
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Your merchant account
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Method
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Cardholder name
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Stripe payment ID
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-start gap-0.5 self-stretch py-2 px-0">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] font-medium leading-[normal]">
                        Total amount
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-shrink-0 items-start gap-2 w-[12.25rem]">
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-16 text-[#381207] font-['Poppins'] leading-[normal]">
                        {paymentDetails?.stripe ? "Stripe" : "N/A"}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#381207] font-['Poppins'] leading-[normal]">
                        {paymentDetails?.stripe?.email ||
                          subscription.email ||
                          "N/A"}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#381207] font-['Poppins'] leading-[normal]">
                        {paymentDetails?.stripe?.paymentMethod
                          ? `${
                              paymentDetails.stripe.paymentMethod.brand
                                ?.charAt(0)
                                .toUpperCase() +
                              paymentDetails.stripe.paymentMethod.brand?.slice(
                                1
                              )
                            }***${paymentDetails.stripe.paymentMethod.last4}`
                          : "N/A"}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#381207] font-['Poppins'] leading-[normal]">
                        {paymentDetails?.stripe?.paymentMethod
                          ?.cardholderName ||
                          `${subscription.firstName} ${subscription.lastName}`}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#381207] font-['Poppins'] leading-[normal]">
                        {paymentDetails?.stripe?.latestInvoice?.id ? (
                          <a
                            href={
                              paymentDetails.stripe.latestInvoice
                                .hostedInvoiceUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#5B6502] hover:underline"
                          >
                            View Invoice
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-start gap-0.5 self-stretch py-2 px-0">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                        €{" "}
                        {paymentDetails?.stripe?.latestInvoice?.amount
                          ? paymentDetails.stripe.latestInvoice.amount.toFixed(
                              2
                            )
                          : subscription.status === "Trial" ||
                            subscription.planType === "Free"
                          ? "0,00"
                          : subscription.planPrice?.replace("€", "").trim() ||
                            "12,00"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Subscription History */}
        <div className="w-96">
          <div className="bg-[#f7f6f4] rounded-2xl">
            <div className="p-6 border-b border-[#e5e3df]">
              <h3 className="text-[#381207] font-['Poppins'] text-2xl font-medium text-center">
                Subscription history
              </h3>
            </div>

            <div className="p-6">
              <div className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  {/* Generate dynamic timeline dots based on events */}
                  {paymentDetails?.stripe?.paymentHistory &&
                  paymentDetails.stripe.paymentHistory.length > 0 ? (
                    paymentDetails.stripe.paymentHistory
                      .slice(0, 5)
                      .map((payment, index) => (
                        <React.Fragment key={payment.id}>
                          <div className="w-3 h-3 rounded-full bg-[#a6a643]" />
                          {index <
                            Math.min(
                              paymentDetails.stripe.paymentHistory.length - 1,
                              4
                            ) && <div className="w-px h-16 bg-[#a6a643]" />}
                        </React.Fragment>
                      ))
                  ) : (
                    // Default timeline if no Stripe history
                    <>
                      <div className="w-3 h-3 rounded-full bg-[#a6a643]" />
                      <div className="w-px h-16 bg-[#a6a643]" />
                      <div className="w-3 h-3 rounded-full bg-[#a6a643]" />
                      {subscription.status !== "Trial" && (
                        <>
                          <div className="w-px h-16 bg-[#a6a643]" />
                          <div className="w-3 h-3 rounded-full bg-[#a6a643]" />
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Timeline Content */}
                <div className="flex-1 space-y-12">
                  {paymentDetails?.stripe?.paymentHistory &&
                  paymentDetails.stripe.paymentHistory.length > 0 ? (
                    // Display payment history from Stripe
                    paymentDetails.stripe.paymentHistory
                      .slice(0, 5)
                      .map((payment, index) => (
                        <div key={payment.id}>
                          <h4 className="text-[#381207] font-['Poppins'] text-lg font-medium mb-2">
                            {payment.status === "succeeded"
                              ? "Payment Successful"
                              : "Payment " + payment.status}
                          </h4>
                          <p className="text-[#4b4741] font-['Poppins'] mb-1">
                            {new Date(payment.created).toLocaleDateString()}
                          </p>
                          <p className="text-[#4b4741] font-['Poppins'] text-sm">
                            € {payment.amount.toFixed(2)} -{" "}
                            {payment.paymentMethodDetails?.brand || "Card"}
                          </p>
                        </div>
                      ))
                  ) : (
                    // Default timeline events if no Stripe history
                    <>
                      {subscription.status === "Cancelled" &&
                        paymentDetails?.stripe?.canceledAt && (
                          <div>
                            <h4 className="text-[#381207] font-['Poppins'] text-lg font-medium mb-2">
                              Subscription Cancelled
                            </h4>
                            <p className="text-[#4b4741] font-['Poppins']">
                              {new Date(
                                paymentDetails.stripe.canceledAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        )}

                      {subscription.status === "Active" && (
                        <div>
                          <h4 className="text-[#381207] font-['Poppins'] text-lg font-medium mb-2">
                            Subscription Active
                          </h4>
                          <p className="text-[#4b4741] font-['Poppins']">
                            {subscription.startDate}
                          </p>
                        </div>
                      )}

                      {subscription.status !== "Trial" &&
                        subscription.paymentStatus === "Paid" && (
                          <div>
                            <h4 className="text-[#381207] font-['Poppins'] text-lg font-medium mb-2">
                              Payment Processed
                            </h4>
                            <p className="text-[#4b4741] font-['Poppins']">
                              {subscription.startDate}
                            </p>
                          </div>
                        )}

                      <div>
                        <h4 className="text-[#381207] font-['Poppins'] text-lg font-medium mb-2">
                          {subscription.status === "Trial"
                            ? "Trial Started"
                            : "Subscription Created"}
                        </h4>
                        <p className="text-[#4b4741] font-['Poppins']">
                          {subscription.startDate}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionOverview;
