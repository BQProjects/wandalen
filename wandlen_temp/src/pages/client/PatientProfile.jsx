import React, { useContext, useEffect, useState } from "react";
import UserIcon from "../../assets/UserIcon.svg";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const clientId = localStorage.getItem("userId");
  const [profileData, setProfileData] = useState({
    fullName: "",
    organizationName: "",
    contactEmail: "",
    phone: "",
    addressv: "",
    accountEmail: "",
    password: "",
    currentPlan: "",
    validUntil: "",
  });

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: Integrate with backend API
    console.log("Saving patient profile:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values if needed
    setIsEditing(false);
  };

  const getProfileData = async () => {
    try {
      const res = await axios.get(
        `${DATABASE_URL}/client/get-account/${clientId}`,
        { headers: { Authorization: `Bearer ${sessionId}` } }
      );
      setProfileData({
        fullName: res.data.firstName,
        organizationName: res.data.organizationName,
        contactEmail: res.data.email,
        phone: res.data.phoneNo,
        address: res.data.address,
        accountEmail: res.data.email,
        password: res.data.password,
        currentPlan: res.data.subscriptionType,
        validUntil: res.data.endDate,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      {/* Header Section */}
      <div className="relative h-96 bg-gradient-to-r from-[#2a341f] to-[#3a452f]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-between h-full px-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <img src={UserIcon} alt="User Icon" />
            </div>
            <div>
              <h1 className="text-4xl font-medium text-white mb-2">
                John Smith
              </h1>
              <button className="px-4 py-2 border border-white/30 rounded-lg text-white text-sm hover:bg-white/10 transition">
                Remove Image
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Account Info Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-medium text-[#381207] mb-6">
            Account Info
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#7a756e] font-medium mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                  />
                ) : (
                  <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207]">
                    {profileData.fullName}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[#7a756e] font-medium mb-2">
                  Organization Name/Family Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="organizationName"
                    value={profileData.organizationName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                  />
                ) : (
                  <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207]">
                    {profileData.organizationName}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#7a756e] font-medium mb-2">
                  Contact Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="contactEmail"
                    value={profileData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                  />
                ) : (
                  <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207]">
                    {profileData.contactEmail}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[#7a756e] font-medium mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                  />
                ) : (
                  <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207]">
                    {profileData.phone}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-[#7a756e] font-medium mb-2">
                Address
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                />
              ) : (
                <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207] min-h-[3rem]">
                  {profileData.address}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Login Info Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-medium text-[#381207] mb-6">
            Login Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#7a756e] font-medium mb-2">
                Account Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="accountEmail"
                  value={profileData.accountEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                />
              ) : (
                <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207]">
                  {profileData.accountEmail}
                </div>
              )}
            </div>
            <div>
              <label className="block text-[#7a756e] font-medium mb-2">
                Password
              </label>
              <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207]">
                {profileData.password}
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Info Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-medium text-[#381207] mb-6">
            Subscription Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[#7a756e] font-medium mb-2">
                Current Plan
              </label>
              <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207]">
                {profileData.currentPlan}
              </div>
            </div>
            <div>
              <label className="block text-[#7a756e] font-medium mb-2">
                Valid Until
              </label>
              <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207]">
                {profileData.validUntil}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="px-4 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition">
              Upgrade Plan
            </button>
            <button className="px-4 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition">
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Close Account Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-medium text-[#381207] mb-6">
            Close Your Account
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-[#7a756e] flex-1">
              To close your account, first move any remaining sites to Trash. If
              your site has any Premium Plans or domains connected, you'll need
              to cancel or transfer them first.
            </p>
            <button className="px-4 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition whitespace-nowrap">
              Close Your Account
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-[#2a341f] text-white rounded-lg hover:bg-[#1e241a] transition font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-[#2a341f] text-white rounded-lg hover:bg-[#1e241a] transition font-medium"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
