import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import LoginImg from "../../assets/LoginImg.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [selectedRole, setSelectedRole] = useState("");
  const { DATABASE_URL } = useContext(DatabaseContext);
  const { login, setUserType, setSessionId } = useContext(AuthContext); // Added missing context
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
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
        alert("Please select a role");
        return;
    }

    try {
      const res = await axios.post(apiEndpoint, formData);
      // Check status based on role (201 for org, 200 for others)
      const successStatus = selectedRole === "organization" ? 201 : 200;

      if (res.status === successStatus) {
        alert("Login successful!");
        if (selectedRole === "organization") {
          login({ email: formData.email }, selectedRole);

          // Set auth context for org
          setUserType("organization");
          setSessionId(res.data._id);

          // Store in localStorage (aligned with working code)
          localStorage.setItem("userType", "organization");
          localStorage.setItem("orgData", JSON.stringify(res.data));
          localStorage.setItem("orgId", res.data._id);
          localStorage.setItem("sessionId", res.data._id);

          navigate(redirectPath);
        } else {
          // For clients and volunteers, go to OTP verification
          navigate(redirectPath, {
            state: { otp: res.data.otp, ...location.state },
          });
        }
      } else {
        alert("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      <div className="grid grid-cols-2 min-h-screen">
        <div className="flex justify-center items-center py-8 px-4">
          <form
            onSubmit={handleSubmit}
            className="inline-flex flex-col justify-center items-center gap-5"
          >
            <div className="flex flex-col items-start gap-10">
              <div className="flex flex-col items-start">
                <div className="text-[#381207] font-['Poppins'] text-[2.625rem] font-semibold leading-[normal]">
                  Welcome back!
                </div>
                <div className="text-[#7a756e] font-['Poppins'] text-lg leading-[normal]">
                  Please select your role and log in.
                </div>
              </div>
              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-col items-start gap-2">
                  <div className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                    Email
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="flex items-center gap-2.5 pl-[0.9375rem] pr-[0.9375rem] p-2 w-[22.5rem] h-11 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#b3b1ac] font-['Poppins'] leading-[normal] focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                    Password
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="flex items-center gap-2.5 pl-[0.9375rem] pr-[0.9375rem] p-2 w-[22.5rem] h-11 rounded-lg border border-[#e5e3df] bg-[#f7f6f4] text-[#b3b1ac] font-['Poppins'] leading-[normal] focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                  />
                </div>
                <div className="flex flex-row justify-between items-center w-[22.5rem]">
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="role"
                      value="caregiver"
                      checked={selectedRole === "caregiver"}
                      onChange={handleRoleChange}
                      required
                    />
                    <label
                      htmlFor="caregiver"
                      className="text-[#381207] font-['Poppins'] font-medium leading-[normal]"
                    >
                      Caregiver
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="role"
                      value="volunteer"
                      checked={selectedRole === "volunteer"}
                      onChange={handleRoleChange}
                      required
                    />
                    <label
                      htmlFor="volunteer"
                      className="text-[#381207] font-['Poppins'] font-medium leading-[normal]"
                    >
                      Volunteer
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="role"
                      value="organization"
                      checked={selectedRole === "organization"}
                      onChange={handleRoleChange}
                      required
                    />
                    <label
                      htmlFor="organization"
                      className="text-[#381207] font-['Poppins'] font-medium leading-[normal]"
                    >
                      Organization
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2.5">
              <div className="flex flex-col items-center gap-2.5">
                <button
                  type="submit"
                  className="flex justify-center items-center pt-[0.6875rem] pb-2 px-0 w-[22.5rem] h-[2.8125rem] rounded-lg bg-[#5b6502] text-white text-center font-['Poppins'] font-medium leading-[normal] hover:bg-[#4a5201] transition"
                >
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={LoginImg}
            alt="Login Image"
            className="w-full h-[100vh] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
