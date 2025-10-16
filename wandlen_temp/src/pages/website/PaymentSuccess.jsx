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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setStatus("error");
      setErrorMessage("No session ID found");
      return;
    }

    // Call backend to complete signup
    const completeSignup = async () => {
      try {
        console.log("Completing signup for session:", sessionId);

        const response = await axios.post(
          `${DATABASE_URL}/client/manual-complete-signup`,
          { sessionId }
        );

        if (response.data.success) {
          console.log("Signup completed successfully:", response.data);
          setStatus("success");
        } else {
          console.error("Signup completion failed:", response.data);
          setStatus("error");
          setErrorMessage(response.data.message || "Failed to complete signup");
        }
      } catch (error) {
        console.error("Error completing signup:", error);

        // If account already exists, show success
        if (
          error.response?.status === 409 ||
          error.response?.data?.message?.includes("duplicate") ||
          error.response?.data?.message?.includes("already")
        ) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(
            error.response?.data?.message ||
              "Failed to complete signup. Please contact support."
          );
        }
      }
    };

    // Wait 1 second then complete
    setTimeout(completeSignup, 1000);
  }, [searchParams, DATABASE_URL]);

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f6f4] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {status === "processing" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4">
              <svg
                className="animate-spin h-16 w-16 text-[#5b6502]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-medium text-[#381207] mb-2">
              {t("paymentSuccess.processing.title") || "Processing Payment..."}
            </h2>
            <p className="text-[#7a756e]">
              {t("paymentSuccess.processing.message") ||
                "Please wait while we set up your account."}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-medium text-[#381207] mb-2">
              {t("paymentSuccess.success.title") || "Payment Successful!"}
            </h2>
            <p className="text-[#7a756e] mb-6">
              {t("paymentSuccess.success.message") ||
                "Your account has been created successfully. You can now log in and start your 7-day free trial."}
            </p>
            <button
              onClick={handleGoToLogin}
              className="w-full px-6 py-3 bg-[#5b6502] text-white rounded-lg hover:bg-[#4a5502] transition-colors font-medium"
            >
              {t("paymentSuccess.success.button") || "Go to Login"}
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-medium text-[#381207] mb-2">
              {t("paymentSuccess.error.title") || "Something went wrong"}
            </h2>
            <p className="text-[#7a756e] mb-6">
              {errorMessage ||
                t("paymentSuccess.error.message") ||
                "We couldn't process your payment. Please try again or contact support."}
            </p>
            <button
              onClick={() => navigate("/client/subscribe")}
              className="w-full px-6 py-3 bg-[#5b6502] text-white rounded-lg hover:bg-[#4a5502] transition-colors font-medium"
            >
              {t("paymentSuccess.error.button") || "Try Again"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
