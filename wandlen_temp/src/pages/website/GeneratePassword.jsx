import React, { useContext, useState } from "react";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoginImg from "../../assets/LoginImg.png";
import toast from "react-hot-toast";

const GeneratePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(
        `${DATABASE_URL}/org/set-initial-password/${id}`,
        {
          password,
        }
      );
      console.log("Server response:", res.data);
      toast.success(
        "Password set successfully! You can now log in to your account."
      );
      navigate("/login");
    } catch (error) {
      console.error(
        "Error setting password:",
        error.response?.data || error.message
      );
      toast.error("Failed to set password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image Section - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:flex justify-center items-center order-2 lg:order-1">
          <img
            src={LoginImg}
            alt="Login Image"
            className="w-full h-[100vh] object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center py-8 px-4 sm:px-6 md:px-8 lg:px-12 order-1 lg:order-2">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto flex flex-col justify-center items-center gap-6 sm:gap-8"
          >
            <div className="flex flex-col items-start gap-6 sm:gap-8 w-full">
              {/* Header */}
              <div className="flex flex-col items-start w-full text-center sm:text-left">
                <h1 className="text-[#381207] font-['Poppins'] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-2 sm:mb-3">
                  Set Your Password
                </h1>
                <p className="text-[#7a756e] font-['Poppins'] text-sm sm:text-base md:text-lg">
                  Create a secure password for your account.
                </p>
              </div>

              {/* Password Inputs */}
              <div className="flex flex-col items-start gap-4 sm:gap-6 w-full">
                <div className="flex flex-col items-start gap-2 sm:gap-3 w-full">
                  <label className="text-[#381207] font-['Poppins'] font-medium text-sm sm:text-base">
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#4b4741] font-['Poppins'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#5b6502] transition-colors"
                      placeholder="Enter Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7a756e] hover:text-[#5b6502] transition-colors"
                      aria-label={
                        showPassword ? "Hide Password" : "Show Password"
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

                <div className="flex flex-col items-start gap-2 sm:gap-3 w-full">
                  <label className="text-[#381207] font-['Poppins'] font-medium text-sm sm:text-base">
                    Confirm Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#4b4741] font-['Poppins'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#5b6502] transition-colors"
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7a756e] hover:text-[#5b6502] transition-colors"
                      aria-label={
                        showConfirmPassword ? "Hide Password" : "Show Password"
                      }
                    >
                      {showConfirmPassword ? (
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
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-[#5b6502] text-white text-center font-['Poppins'] text-sm sm:text-base md:text-lg font-medium hover:bg-[#4a5201] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-offset-2"
            >
              Set Password
            </button>
          </form>
        </div>

        {/* Small Image for Mobile - Hidden on desktop */}
        <div className="h-[30vh] lg:hidden order-0">
          <img
            src={LoginImg}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneratePassword;
