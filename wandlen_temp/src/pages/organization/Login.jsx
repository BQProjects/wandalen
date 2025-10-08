import React, { useContext, useState } from "react";
import WebsiteHeader from "../../components/WebsiteHeader";
import { router } from "../../routing/router";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const { setUserType, setSessionId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${DATABASE_URL}/org/login`, formData);
      if (res.status === 201) {
        console.log("Login successful:", res.data);
        setUserType("organization");

        localStorage.setItem("userType", "organization");
        localStorage.setItem("orgData", JSON.stringify(res.data));
        localStorage.setItem("orgId", res.data._id);
        localStorage.setItem("sessionId", res.data._id);
        setSessionId(res.data._id);
        setIsLoggedIn(true);
        navigate("/organization");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      <WebsiteHeader />
      <div className="flex justify-center items-center py-8 px-4 min-h-screen">
        <div className="bg-white rounded-2xl p-10 shadow-lg w-full max-w-[500px]">
          <h2 className="text-2xl font-medium text-[#381207] mb-6">
            Organization Login
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
          <div className="mt-6 text-center">
            <p className="text-[#7a756e]">
              Don't have an account?{" "}
              <Link
                to="/organization/signup"
                className="text-[#2a341f] font-medium hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
