import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const [status, setStatus] = useState("processing"); // processing, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isCreating = false; // Prevent duplicate calls
    let isMounted = true; // Track if component is still mounted

    const createAccount = async () => {
      // Prevent duplicate execution
      if (isCreating) {
        console.log("Account creation already in progress, skipping...");
        return;
      }

      isCreating = true;

      try {
        // Get the stored signup data from localStorage
        const pendingData = localStorage.getItem("pendingSignupData");
        const sessionId = searchParams.get("session_id");

        if (!pendingData) {
          if (isMounted) {
            setStatus("error");
            setMessage(t("payment.messages.noDataFound"));
          }
          return;
        }

        if (!sessionId) {
          if (isMounted) {
            setStatus("error");
            setMessage(t("payment.messages.paymentSessionNotFound"));
          }
          return;
        }

        const signupData = JSON.parse(pendingData);

        // Step 1: Verify payment with backend
        const verificationRes = await axios.post(
          `${DATABASE_URL}/utils/verify-stripe-payment`,
          {
            sessionId: sessionId,
            email: signupData.email,
          }
        );

        if (
          !verificationRes.data.success ||
          verificationRes.data.paymentStatus !== "paid"
        ) {
          if (isMounted) {
            setStatus("error");
            setMessage(t("payment.messages.paymentVerificationFailed"));
          }
          return;
        }

        // Calculate end date: 7 days free trial + 30 days paid = 37 days total
        const trialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
        const subscriptionEndDate = new Date(
          Date.now() + 37 * 24 * 60 * 60 * 1000
        ); // 37 days from now

        // Add payment confirmation details
        const completeSignupData = {
          ...signupData,
          paymentStatus: "completed",
          stripeSessionId: sessionId,
          stripeCustomerId: verificationRes.data.customerId,
          stripeSubscriptionId: verificationRes.data.subscriptionId,
          endDate: subscriptionEndDate,
          subscriptionDays: 37,
          trialEndDate: trialEndDate,
          paymentVerified: true,
          subscriptionStatus: "trial",
        };

        // Step 2: Create the account after verification
        const res = await axios.post(
          `${DATABASE_URL}/client/signup`,
          completeSignupData
        );

        if (res.status === 200 || res.status === 201) {
          if (isMounted) {
            setStatus("success");
            setMessage(t("payment.messages.accountCreated"));
          }

          // Clear the stored data
          localStorage.removeItem("pendingSignupData");

          // Redirect to login after 3 seconds
          setTimeout(() => {
            if (isMounted) {
              navigate("/login");
            }
          }, 3000);
        } else {
          throw new Error("Signup failed");
        }
      } catch (error) {
        console.error("Error creating account:", error);

        // Handle duplicate email error specifically
        if (error.response?.status === 409) {
          console.log("Account already exists, redirecting to login...");
          if (isMounted) {
            setStatus("success");
            setMessage("Account already exists. Redirecting to login...");
          }

          // Clear the stored data
          localStorage.removeItem("pendingSignupData");

          // Redirect to login
          setTimeout(() => {
            if (isMounted) {
              navigate("/login");
            }
          }, 2000);
        } else {
          if (isMounted) {
            setStatus("error");
            setMessage(
              error.response?.data?.message ||
                t("payment.messages.signupFailed")
            );
          }
        }
      } finally {
        isCreating = false;
      }
    };

    createAccount();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [DATABASE_URL, navigate, searchParams, t]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#ede4dc] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {status === "processing" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#5b6502]"></div>
            </div>
            <h2 className="text-2xl font-semibold text-[#381207] mb-2">
              {t("payment.processing.title")}
            </h2>
            <p className="text-[#7a756e]">{t("payment.processing.message")}</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#381207] mb-2">
              {t("payment.success.title")}
            </h2>
            <p className="text-[#7a756e] mb-4">{message}</p>
            <p className="text-sm text-[#7a756e]">
              {t("payment.success.redirecting")}
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#381207] mb-2">
              {t("payment.error.title")}
            </h2>
            <p className="text-[#7a756e] mb-6">{message}</p>
            <button
              onClick={() => navigate("/client/subscribe")}
              className="px-6 py-3 bg-[#5b6502] text-white rounded-lg hover:bg-[#4a5502] transition-colors"
            >
              {t("payment.buttons.tryAgain")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
