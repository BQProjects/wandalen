import React, { useState } from "react";

const VolunteerSignupForm = () => {
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
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-[#2a341f] px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[#ede4dc] text-5xl font-medium leading-tight mb-4">
            Become a Volunteer
          </h1>
          <p className="text-[#ede4dc] text-xl font-medium leading-relaxed max-w-2xl">
            Join us in bringing meaningful, nature-connected experiences to
            others. Fill in your details below and we'll reach out to welcome
            you on board.
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl max-w-4xl">
          <p className="text-[#381207] text-2xl font-medium mb-8">
            Tell us a little about yourself so we can connect with you.
          </p>

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

          <h2 className="text-[#381207] text-2xl font-medium mt-8">
            Volunteer Details
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSignupForm;
