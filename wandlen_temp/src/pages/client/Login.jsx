import React, { useState, useContext } from "react";
import WebsiteHeader from "../../components/WebsiteHeader";
import { router } from "../../routing/router";
import { Link, useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { DATABASE_URL } = useContext(DatabaseContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${DATABASE_URL}/client/login`, formData);
      if (res.status === 200) {
        alert("Login successful!");
        console.log(res.data);
        navigate(`/client/otp-verify/${formData.email}`);
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
      <WebsiteHeader />
      <div className="flex justify-center items-center py-8 px-4 min-h-screen">
        <div className="bg-white rounded-2xl p-10 shadow-lg w-full max-w-[500px]">
          <h2 className="text-2xl font-medium text-[#381207] mb-6 text-center">
            Client Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#7a756e] font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
              />
            </div>
            <div>
              <label className="block text-[#7a756e] font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-3 bg-[#2a341f] text-white rounded-lg hover:bg-[#1e241a] transition font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
