import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import LoginImg from "../../assets/LoginImg.png";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const { t } = useTranslation();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email || !selectedRole) {
      toast.error("Please fill in email and select your role");
      return;
    }

    try {
      const res = await axios.post(
        `${DATABASE_URL}/utils/forgot-password-send-otp`,
        {
          email,
          role: selectedRole,
        }
      );
      if (res.status === 200) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("An error occurred while sending OTP. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${DATABASE_URL}/utils/forgot-password-reset`,
        {
          email,
          otp,
          newPassword,
          role: selectedRole,
        }
      );
      if (res.status === 200) {
        toast.success(
          "Password reset successful! Please log in with your new password."
        );
        navigate("/login");
      } else {
        toast.error("Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred during password reset. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(
        `${DATABASE_URL}/utils/forgot-password-send-otp`,
        {
          email,
          role: selectedRole,
        }
      );
      if (res.status === 200) {
        toast.success("OTP resent to your email!");
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("An error occurred while resending OTP. Please try again.");
    }
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image Section - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:flex justify-center items-center order-2 lg:order-1">
          <img
            src={LoginImg}
            alt={t("forgotPassword.loginImageAlt")}
            className="w-full h-[100vh] object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center py-8 px-4 sm:px-6 md:px-8 lg:px-12 order-1 lg:order-2">
          <form
            onSubmit={otpSent ? handleResetPassword : handleSendOtp}
            className="w-full max-w-md mx-auto flex flex-col justify-center items-center gap-6 sm:gap-8"
          >
            <div className="flex flex-col items-start gap-6 sm:gap-8 w-full">
              {/* Header */}
              <div className="flex flex-col items-start w-full text-center sm:text-left">
                <h1 className="text-[#381207] font-['Poppins'] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-2 sm:mb-3">
                  {otpSent
                    ? t("forgotPassword.resetPasswordTitle")
                    : t("forgotPassword.forgotPasswordTitle")}
                </h1>
                <p className="text-[#7a756e] font-['Poppins'] text-sm sm:text-base md:text-lg">
                  {otpSent
                    ? t("forgotPassword.resetPasswordDescription")
                    : t("forgotPassword.forgotPasswordDescription")}
                </p>
              </div>

              {/* Email Input - Always shown */}
              <div className="flex flex-col items-start gap-2 sm:gap-3 w-full">
                <label className="text-[#381207] font-['Poppins'] font-medium text-sm sm:text-base">
                  {t("forgotPassword.email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={otpSent}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#4b4741] font-['Poppins'] text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-[#5b6502] transition-colors"
                  placeholder={t("forgotPassword.emailPlaceholder")}
                />
              </div>

              {/* Role Selection - Always shown */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <label className="text-[#381207] font-['Poppins'] font-medium text-sm sm:text-base">
                  {t("login.roleLabel")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg">
                    <input
                      type="radio"
                      id="caregiver"
                      name="role"
                      value="caregiver"
                      checked={selectedRole === "caregiver"}
                      onChange={handleRoleChange}
                      required
                      disabled={otpSent}
                      className="w-4 h-4 accent-[#5b6502]"
                    />
                    <label
                      htmlFor="caregiver"
                      className="text-[#381207] font-['Poppins'] text-sm sm:text-base cursor-pointer"
                    >
                      {t("login.caregiver")}
                    </label>
                  </div>

                  <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg ">
                    <input
                      type="radio"
                      id="volunteer"
                      name="role"
                      value="volunteer"
                      checked={selectedRole === "volunteer"}
                      onChange={handleRoleChange}
                      required
                      disabled={otpSent}
                      className="w-4 h-4 accent-[#5b6502]"
                    />
                    <label
                      htmlFor="volunteer"
                      className="text-[#381207] font-['Poppins'] text-sm sm:text-base cursor-pointer"
                    >
                      {t("login.volunteer")}
                    </label>
                  </div>

                  <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg">
                    <input
                      type="radio"
                      id="organization"
                      name="role"
                      value="organization"
                      checked={selectedRole === "organization"}
                      onChange={handleRoleChange}
                      required
                      disabled={otpSent}
                      className="w-4 h-4 accent-[#5b6502]"
                    />
                    <label
                      htmlFor="organization"
                      className="text-[#381207] font-['Poppins'] text-sm sm:text-base cursor-pointer"
                    >
                      {t("login.organization")}
                    </label>
                  </div>
                </div>
              </div>

              {/* OTP Input - Shown after OTP sent */}
              {otpSent && (
                <div className="flex flex-col items-start gap-2 sm:gap-3 w-full">
                  <label className="text-[#381207] font-['Poppins'] font-medium text-sm sm:text-base">
                    {t("forgotPassword.otp")}
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#4b4741] font-['Poppins'] text-lg sm:text-xl text-center focus:outline-none focus:ring-2 focus:ring-[#5b6502] transition-colors"
                    placeholder={t("forgotPassword.otpPlaceholder")}
                    maxLength={6}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                  />
                </div>
              )}

              {/* New Password Input - Shown after OTP sent */}
              {otpSent && (
                <div className="flex flex-col items-start gap-2 sm:gap-3 w-full">
                  <label className="text-[#381207] font-['Poppins'] font-medium text-sm sm:text-base">
                    {t("forgotPassword.newPassword")}
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#4b4741] font-['Poppins'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#5b6502] transition-colors"
                      placeholder={t("forgotPassword.newPasswordPlaceholder")}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7a756e] hover:text-[#5b6502] transition-colors"
                      aria-label={
                        showPassword
                          ? t("forgotPassword.hidePassword")
                          : t("forgotPassword.showPassword")
                      }
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3l18 18"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-[#5b6502] text-white text-center font-['Poppins'] text-sm sm:text-base md:text-lg font-medium hover:bg-[#4a5201] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-offset-2"
            >
              {otpSent
                ? t("forgotPassword.resetPasswordButton")
                : t("forgotPassword.sendOtpButton")}
            </button>

            {/* Resend OTP Link - Shown after OTP sent */}
            {otpSent && (
              <div className="text-center w-full">
                <button
                  type="button"
                  className="text-[#5b6502] font-['Poppins'] text-sm sm:text-base font-medium hover:underline"
                  onClick={handleResendOtp}
                >
                  {t("forgotPassword.resendOtp")}
                </button>
              </div>
            )}

            {/* Back to Login Link */}
            <div className="text-center w-full">
              <button
                type="button"
                className="text-[#381207] font-['Poppins'] text-sm sm:text-base font-medium hover:underline"
                onClick={() => navigate("/login")}
              >
                {t("forgotPassword.backToLogin")}
              </button>
            </div>
          </form>
        </div>

        {/* Small Image for Mobile - Hidden on desktop */}
        <div className="h-[30vh] lg:hidden order-0">
          <img
            src={LoginImg}
            alt={t("forgotPassword.loginImageAlt")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
