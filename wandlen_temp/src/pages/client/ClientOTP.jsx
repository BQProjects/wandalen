import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { data, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const ClientOTP = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();
  const { setUserType, setSessionId, setUser } = useContext(AuthContext);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const handleVerify = async () => {
    try {
      const res = await axios.post(`${DATABASE_URL}/utils/verify-otp`, {
        email,
        otp,
        type: "client",
      });
      if (res.status === 200) {
        alert("OTP verification successful!");
        setUserType("client");
        // Redirect or perform further actions
        setSessionId(res.data.sessionId);
        setUser({ email: email });
        localStorage.setItem("userType", "client");
        localStorage.setItem("user", JSON.stringify({ email: email }));
        localStorage.setItem("sessionId", res.data.sessionId);
        localStorage.setItem("userId", res.data.userId);

        navigate("/client");
      } else {
        alert("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred during OTP verification. Please try again.");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <input
        type="text"
        onChange={(e) => setOtp(e.target.value)}
        className="border border-gray-300 rounded-md p-2 text-center text-2xl w-1/3"
        placeholder="Enter OTP"
      />
      <button
        onClick={handleVerify}
        className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Verify
      </button>
    </div>
  );
};

export default ClientOTP;
