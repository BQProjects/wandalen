import React, { useState, useContext } from "react";
import HoldHands from "../assets/HoldHands.png";
import { useTranslation } from "react-i18next";
import { DatabaseContext } from "../contexts/DatabaseContext";
import axios from "axios";

const SubscribeCard = () => {
  const { t } = useTranslation();
  const { DATABASE_URL } = useContext(DatabaseContext);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setMessage({
        type: "error",
        text:
          t("subscribeCard.validationError") ||
          "Please fill in all required fields",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({
        type: "error",
        text:
          t("subscribeCard.emailError") || "Please enter a valid email address",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        `${DATABASE_URL}/utils/subscribe`,
        formData
      );

      setMessage({
        type: "success",
        text:
          response.data.message ||
          t("subscribeCard.successMessage") ||
          "Successfully subscribed!",
      });

      // Reset form
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        notes: "",
      });
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          t("subscribeCard.errorMessage") ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-[#ede4dc] px-4 sm:px-6 md:px-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 lg:gap-12 xl:gap-16 p-6 sm:p-8 md:p-10 lg:p-12 max-w-[1200px] w-full rounded-xl sm:rounded-2xl md:rounded-3xl bg-white shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-6 sm:gap-8 w-full"
        >
          <h2 className="text-[#381207] font-['Poppins'] text-xl sm:text-2xl font-semibold">
            {t("subscribeCard.title")}
          </h2>

          {/* Message Display */}
          {message.text && (
            <div
              className={`w-full p-3 rounded-lg text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex flex-col gap-4 sm:gap-6 w-full">
            {/* Email Address Field */}
            <div className="flex flex-col gap-1 sm:gap-2 w-full">
              <label className="text-[#381207] font-['Poppins'] text-base sm:text-lg font-medium tracking-[-0.18px]">
                {t("subscribeCard.emailLabel")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("subscribeCard.emailPlaceholder")}
                required
                disabled={isLoading}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#cbcbcb] text-[#333] font-['Poppins'] text-sm sm:text-base placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* First Name and Last Name Fields */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
              <div className="flex flex-col gap-1 sm:gap-2 flex-1">
                <label className="text-[#381207] font-['Poppins'] text-base sm:text-lg font-medium tracking-[-0.18px]">
                  {t("subscribeCard.firstNameLabel")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder={t("subscribeCard.firstNamePlaceholder")}
                  required
                  disabled={isLoading}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#cbcbcb] text-[#333] font-['Poppins'] text-sm sm:text-base placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-1 sm:gap-2 flex-1">
                <label className="text-[#381207] font-['Poppins'] text-base sm:text-lg font-medium tracking-[-0.18px]">
                  {t("subscribeCard.lastNameLabel")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={t("subscribeCard.lastNamePlaceholder")}
                  required
                  disabled={isLoading}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#cbcbcb] text-[#333] font-['Poppins'] text-sm sm:text-base placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Notes Field */}
            <div className="flex flex-col gap-1 sm:gap-2 w-full">
              <label className="text-[#381207] font-['Poppins'] text-base sm:text-lg font-medium tracking-[-0.18px]">
                {t("subscribeCard.notesLabel")}
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder={t("subscribeCard.notesPlaceholder")}
                rows="3"
                disabled={isLoading}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#cbcbcb] text-[#333] font-['Poppins'] text-sm sm:text-base placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Subscribe Button */}
            <div className="flex justify-center sm:justify-end w-full mt-2 sm:mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#5b6502] hover:bg-[#a6a643] text-white font-['Poppins'] text-base sm:text-lg md:text-xl font-medium tracking-[-0.2px] cursor-pointer hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    {"Subscribing..." || "Subscribing..."}
                  </>
                ) : (
                  t("subscribeCard.subscribeButton")
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Image Section */}
        <div className="flex-shrink-0 w-full lg:w-auto h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[545px] rounded-xl sm:rounded-2xl overflow-hidden mt-4 lg:mt-0">
          <img
            src={HoldHands}
            alt={t("subscribeCard.imageAlt")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscribeCard;
