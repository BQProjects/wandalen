import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PaymentCancelled = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#f7f6f4] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-medium text-[#381207] mb-2">
          {t("paymentCancelled.title") || "Payment Cancelled"}
        </h2>
        <p className="text-[#7a756e] mb-6">
          {t("paymentCancelled.message") ||
            "Your payment was cancelled. You can try again when you're ready."}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/abonneren")}
            className="flex-1 px-6 py-3 bg-[#5b6502] text-white rounded-lg hover:bg-[#4a5502] transition-colors font-medium"
          >
            {t("paymentCancelled.tryAgain") || "Try Again"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            {t("paymentCancelled.goHome") || "Go Home"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
