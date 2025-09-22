import React, { useContext, useState } from "react";
import WebsiteHeader from "../../components/WebsiteHeader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import ForestDark from "../../assets/ForestDark.png";

const VolunteerSignupForm = () => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    postalCode: "",
    city: "",
    notes: "",
    isFirstTime: false,
    isUpdate: false,
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post(`${DATABASE_URL}/volunteer/signup`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone,
        postal: formData.postalCode,
        address: `${formData.street}, ${formData.city}`,
      });
      if (res.status === 201) {
        alert("Signup successful! Please log in.");
        console.log(res.data);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          street: "",
          postalCode: "",
          city: "",
          notes: "",
          isFirstTime: false,
          isUpdate: false,
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      <div className="min-h-screen bg-[#ede4dc]">
        <div className="relative w-full pt-10 pb-10 px-4 sm:px-10 md:px-20 z-0">
          {/* Background Image */}
          <img
            src={ForestDark}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Centered Content */}
          <div className="relative text-left mx-auto">
            <div className="mb-8">
              <h1 className="text-[#ede4dc] font-[Poppins] text-5xl font-semibold leading-tight mb-4">
                Become a Volunteer
              </h1>
              <p className="text-[#ede4dc] font-[Poppins] text-2xl font-medium leading-relaxed max-w-2xl">
                Join us in bringing meaningful, nature-connected experiences to
                others. Fill in your details below and we’ll reach out to
                welcome you on board.
              </p>
            </div>
          </div>
        </div>
        <div className="flex mx-auto -my-10 pb-10 z-10 relative px-4 sm:px-10 md:px-20">
          <div className="bg-white p-10 rounded-2xl w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g., Emma"
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g., Johnson"
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., emma.johnson@email.com"
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+31"
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    Street
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Street"
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                  />
                </div>
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="Postal Code"
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                  />
                </div>
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Share any skills, availability, or special interests"
                  rows="4"
                  className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643] resize-none"
                />
              </div>

              <div>
                <label className="block text-[#381207] font-medium mb-4">
                  Volunteer Status
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="first-time"
                      name="isFirstTime"
                      checked={formData.isFirstTime}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#a6a643] focus:ring-[#a6a643]"
                    />
                    <label
                      htmlFor="first-time"
                      className="text-[#2a341f] text-sm"
                    >
                      I'm a first-time volunteer
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="update-info"
                      name="isUpdate"
                      checked={formData.isUpdate}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#a6a643] focus:ring-[#a6a643]"
                    />
                    <label
                      htmlFor="update-info"
                      className="text-[#2a341f] text-sm"
                    >
                      I'm already volunteering and want to update my info
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#5b6502] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#4a5302] transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-[#7a756e]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#2a341f] font-medium hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSignupForm;
