import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import LoginImg from "../../assets/LoginImg.png";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserType, setSessionId, setUser, login } = useContext(AuthContext);
  const { DATABASE_URL } = useContext(DatabaseContext);
  // Get OTP from state if passed (for testing)
  const receivedOtp = location.state?.otp;

  // Determine user type from URL - no fallback, must match expected patterns
  let userType;
  if (location.pathname.includes("/volunteer/otp-verify/")) {
    userType = "volunteer";
  } else if (location.pathname.includes("/client/otp-verify/")) {
    userType = "client";
  } else if (location.pathname.includes("/otp-verify/")) {
    console.warn(
      "Using generic OTP route, user type detection may be unreliable"
    );
  } else {
    throw new Error(
      `Unexpected OTP route: ${location.pathname}. cannot determine user type.`
    );
  }

  const handleVerify = async () => {
    try {
      const res = await axios.post(`${DATABASE_URL}/utils/verify-otp`, {
        email,
        otp,
        type: userType,
      });
      if (res.status === 200) {
        // Check if userId is valid (not undefined or null)
        if (!res.data.userId || res.data.userId === "undefined") {
          alert(
            "OTP verification failed: Invalid user ID. Please try logging in again."
          );
          return;
        }

        alert("OTP verification successful!");

        // Set authentication context
        login({ email: email }, userType);
        setSessionId(res.data.sessionId);

        // Store in localStorage
        localStorage.setItem("userType", userType);
        localStorage.setItem("user", JSON.stringify({ email: email }));
        localStorage.setItem("sessionId", res.data.sessionId);
        localStorage.setItem("userId", res.data.userId);

        // For clients, check if plan has expired
        if (userType === "client") {
          try {
            const clientRes = await axios.get(
              `${DATABASE_URL}/client/get-account/${res.data.userId}`,
              {
                headers: { Authorization: `Bearer ${res.data.sessionId}` },
              }
            );
            if (
              clientRes.data.client.endDate &&
              new Date() > new Date(clientRes.data.client.endDate)
            ) {
              alert(
                "Your plan has expired. Please contact the admin at admin@wandalen.com"
              );
              return;
            }
          } catch (error) {
            console.error("Error fetching client data:", error);
          }
        }

        // Redirect to appropriate dashboard
        const from = location.state?.from?.pathname || `/${userType}`;
        navigate(from);
      } else {
        alert("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred during OTP verification. Please try again.");
    }
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
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
            className="w-full max-w-md mx-auto flex flex-col justify-center items-center gap-6 sm:gap-8"
          >
            <div className="flex flex-col items-start gap-6 sm:gap-8 w-full">
              {/* Header */}
              <div className="flex flex-col items-start w-full text-center sm:text-left">
                <h1 className="text-[#381207] font-['Poppins'] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-2 sm:mb-3">
                  Verify OTP
                </h1>
                <p className="text-[#7a756e] font-['Poppins'] text-sm sm:text-base md:text-lg">
                  Enter the OTP sent to your email.
                </p>
                {/* Display OTP for testing if received */}
                {receivedOtp && (
                  <div className="text-[#381207] font-['Poppins'] text-sm sm:text-base mt-2 p-2 bg-[#f0ebe7] rounded">
                    <strong>Test OTP:</strong> {receivedOtp}
                  </div>
                )}
              </div>

              {/* OTP Input */}
              <div className="flex flex-col items-start gap-2 sm:gap-3 w-full">
                <label className="text-[#381207] font-['Poppins'] font-medium text-sm sm:text-base">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#4b4741] font-['Poppins'] text-lg sm:text-xl text-center focus:outline-none focus:ring-2 focus:ring-[#5b6502] transition-colors"
                  placeholder="Enter OTP"
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-[#5b6502] text-white text-center font-['Poppins'] text-sm sm:text-base md:text-lg font-medium hover:bg-[#4a5201] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-offset-2"
            >
              Verify
            </button>

            {/* Resend OTP Link (Optional) */}
            <div className="text-center w-full">
              <button
                type="button"
                className="text-[#5b6502] font-['Poppins'] text-sm sm:text-base font-medium hover:underline"
                onClick={() => alert("OTP resend functionality would go here")}
              >
                Resend OTP
              </button>
            </div>
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

export default Otp;
