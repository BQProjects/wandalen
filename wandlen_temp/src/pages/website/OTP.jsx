import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { data, useNavigate, useParams, useLocation } from "react-router-dom";
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
        alert("OTP verification successful!");

        // Set authentication context
        login({ email: email }, userType);
        setSessionId(res.data.sessionId);

        // Store in localStorage
        localStorage.setItem("userType", userType);
        localStorage.setItem("user", JSON.stringify({ email: email }));
        localStorage.setItem("sessionId", res.data.sessionId);
        localStorage.setItem("userId", res.data.userId);

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
      <div className="grid grid-cols-2 min-h-screen">
        <div className="flex justify-center items-center">
          <img
            src={LoginImg}
            alt="Login Image"
            className="w-full h-[100vh] object-cover"
          />
        </div>
        <div className="flex justify-center items-center py-8 px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
            className="inline-flex flex-col justify-center items-center gap-5"
          >
            <div className="flex flex-col items-start gap-10">
              <div className="flex flex-col items-start">
                <div className="text-[#381207] font-['Poppins'] text-[2.625rem] font-semibold leading-[normal]">
                  Verify OTP
                </div>
                <div className="text-[#7a756e] font-['Poppins'] text-lg leading-[normal]">
                  Enter the OTP sent to your email.
                </div>
              </div>
              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-col items-start gap-2">
                  <div className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                    OTP
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="flex items-center gap-2.5 pl-[0.9375rem] pr-[0.9375rem] p-2 w-[22.5rem] h-11 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#b3b1ac] font-['Poppins'] leading-[normal] focus:outline-none focus:ring-2 focus:ring-[#2a341f] text-center text-2xl"
                    placeholder="Enter OTP"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2.5">
              <div className="flex flex-col items-center gap-2.5">
                <button
                  type="submit"
                  className="flex justify-center items-center pt-[0.6875rem] pb-2 px-0 w-[22.5rem] h-[2.8125rem] rounded-lg bg-[#5b6502] text-white text-center font-['Poppins'] font-medium leading-[normal] hover:bg-[#4a5201] transition"
                >
                  Verify
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
