import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import LoginImg from "../../assets/LoginImg.png";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const { login, setUserType, setSessionId } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine the API endpoint and redirect path based on selected role
    let apiEndpoint = "";
    let redirectPath = "";

    switch (selectedRole) {
      case "caregiver":
        apiEndpoint = `${DATABASE_URL}/client/login`;
        redirectPath = `/client/otp-verify/${formData.email}`;
        break;
      case "volunteer":
        apiEndpoint = `${DATABASE_URL}/volunteer/login`;
        redirectPath = `/volunteer/otp-verify/${formData.email}`;
        break;
      case "organization":
        apiEndpoint = `${DATABASE_URL}/org/login`;
        redirectPath = "/organization"; // Direct navigation for org
        break;
      default:
        toast.error("Please select a role");
        return;
    }

    try {
      const res = await axios.post(apiEndpoint, formData);
      // Check status based on role (201 for org, 200 for others)
      const successStatus = selectedRole === "organization" ? 201 : 200;

      if (res.status === successStatus) {
        toast.success("Login successful!");
        if (selectedRole === "organization") {
          // Check if plan has expired
          if (res.data.endDate && new Date() > new Date(res.data.endDate)) {
            toast.error(
              "Your plan has expired. Please contact the admin at admin@wandalen.com"
            );
            return;
          }

          login({ email: formData.email }, selectedRole);

          // Set auth context for org
          setUserType("organization");
          setSessionId(res.data.sessionId);

          // Store in localStorage (aligned with working code)
          localStorage.setItem("userType", "organization");
          localStorage.setItem("orgData", JSON.stringify(res.data));
          localStorage.setItem("orgId", res.data._id);
          localStorage.setItem("sessionId", res.data.sessionId);
          localStorage.setItem("userId", res.data._id);

          navigate(redirectPath);
        } else {
          // For clients and volunteers, go to OTP verification
          navigate(redirectPath, {
            state: { otp: res.data.otp, ...location.state },
          });
        }
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response?.status === 403 && error.response?.data?.expired) {
        toast.error(
          error.response.data.message ||
            "Your subscription has expired. Please sign up again."
        );
        return;
      }

      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Form Section */}
        <div className="flex justify-center items-center py-8 px-4 sm:px-6 md:px-8 lg:px-12 order-2 lg:order-1">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto flex flex-col justify-center gap-6 sm:gap-8"
          >
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="text-center lg:text-left">
                <h1 className="text-[#381207] font-['Poppins'] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-2 sm:mb-3">
                  Welkom: log in met je bestaande account
                </h1>
                <p className="text-[#7a756e] font-['Poppins'] text-sm sm:text-base md:text-lg">
                  Gebruik je e-mailadres en wachtwoord waarmee je eerder bent
                  geregistreerd.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Email Field */}
                <div className="flex flex-col gap-1 sm:gap-2">
                  <label className="text-[#381207] font-['Poppins'] font-medium text-sm sm:text-base">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#4b4741] font-['Poppins'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#5b6502]"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1 sm:gap-2">
                  <label className="text-[#381207] font-['Poppins'] font-medium text-sm sm:text-base">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#4b4741] font-['Poppins'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#5b6502]"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7a756e] hover:text-[#5b6502] transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
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

                {/* Role Selection */}
                <div className="flex flex-col gap-2 sm:gap-3">
                  <label className="text-[#381207] font-['Poppins'] font-medium text-sm sm:text-base">
                    Selecteer je rol om verder te gaan.
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
                        className="w-4 h-4 accent-[#5b6502]"
                      />
                      <label
                        htmlFor="caregiver"
                        className="text-[#381207] font-['Poppins'] text-sm sm:text-base cursor-pointer"
                      >
                        Caregiver
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
                        className="w-4 h-4 accent-[#5b6502]"
                      />
                      <label
                        htmlFor="volunteer"
                        className="text-[#381207] font-['Poppins'] text-sm sm:text-base cursor-pointer"
                      >
                        Volunteer
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
                        className="w-4 h-4 accent-[#5b6502]"
                      />
                      <label
                        htmlFor="organization"
                        className="text-[#381207] font-['Poppins'] text-sm sm:text-base cursor-pointer"
                      >
                        Organization
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-[#5b6502] text-white text-center font-['Poppins'] text-sm sm:text-base md:text-lg font-medium hover:bg-[#4a5201] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-offset-2"
            >
              Log in
            </button>

            {/* Forgot Password Link */}
            <div className="text-center w-full">
              <button
                type="button"
                className="text-[#5b6502] font-['Poppins'] text-sm sm:text-base font-medium hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                wachtwoord vergeten
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="h-[30vh] sm:h-[40vh] lg:h-screen order-1 lg:order-2">
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

export default Login;
