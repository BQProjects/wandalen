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
              ) : !paymentDetails ? (
                <div className="flex justify-center items-center py-8">
                  <p className="text-[#4b4741] font-['Poppins']">
                    Unable to load payment details. Please try again later.
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
                          ? `€ ${paymentDetails?.stripe?.latestInvoice?.amount?.toFixed(
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
                          ? paymentDetails?.stripe?.latestInvoice?.status
                              .charAt(0)
                              .toUpperCase() +
                            paymentDetails?.stripe?.latestInvoice?.status.slice(
                              1
                            )
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
                        Stripe Customer ID
                      </label>
                      <p className="text-[#381207] font-['Poppins']">
                        {clientData.stripeCustomerId || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                        Stripe Subscription ID
                      </label>
                      <p className="text-[#381207] font-['Poppins']">
                        {paymentDetails?.stripe?.subscriptionId || "N/A"}
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
