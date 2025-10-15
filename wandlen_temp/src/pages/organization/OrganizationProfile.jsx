import React, { useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";
import UserIcon from "../../assets/UserIcon.svg";
import HandHold from "../../assets/HandHold.png";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const OrganizationProfile = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    organizationName: "",
    contactEmail: "",
    phone: "",
    address: "",
    accountEmail: "",
    password: "*************",
    currentPlan: "",
    planValidTo: "",
    profilePic: "",
  });
  const [originalData, setOriginalData] = useState({});
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const orgId = localStorage.getItem("userId");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showCloseAccountModal, setShowCloseAccountModal] = useState(false);
  const [closeAccountConfirmText, setCloseAccountConfirmText] = useState("");

  const getOrgData = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/org/getOrg/${orgId}`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });
      const org = res.data.org;
      const data = {
        fullName: org.contactPerson?.fullName || "",
        organizationName: org.orgName || "",
        contactEmail: org.contactPerson?.email || "",
        phone: org.contactPerson?.phoneNumber || "",
        address: org.address || "",
        accountEmail: org.email || "",
        password: "*************",
        currentPlan: org.amountPaid
          ? `Custom Plan (${org.amountPaid})`
          : "Home Subscription (€12.99/month)",
        planValidTo: org.planValidTo
          ? new Date(org.planValidTo).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Not set",
        profilePic: org.profilePic || "",
      };
      setProfileData(data);
      setOriginalData(data);
    } catch (error) {
      console.error("Error fetching org data:", error);
    }
  };

  useEffect(() => {
    getOrgData();
  }, []);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        orgName: profileData.organizationName,
        email: profileData.accountEmail,
        phoneNo: profileData.phone,
        address: profileData.address,
        contactPerson: {
          fullName: profileData.fullName,
          email: profileData.contactEmail,
          phoneNumber: profileData.phone,
        },
      };
      await axios.put(`${DATABASE_URL}/org/updateOrg/${orgId}`, updatedData, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });
      toast.success(t("organizationProfile.profileUpdatedSuccess"));
      setIsEditing(false);
      setOriginalData(profileData);
      getOrgData();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(t("organizationProfile.profileUpdateFailed"));
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async () => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error(t("organizationProfile.passwordRequired"));
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t("organizationProfile.passwordMismatch"));
      return;
    }

    try {
      const orgId = localStorage.getItem("userId");
      const response = await axios.put(
        `${DATABASE_URL}/org/update-password/${orgId}`,
        { newPassword: passwordData.newPassword },
        {
          headers: { Authorization: `Bearer ${sessionId}` },
        }
      );

      if (response.status === 200) {
        toast.success(t("organizationProfile.passwordUpdateSuccess"));
        setPasswordData({ newPassword: "", confirmPassword: "" });
        setShowPasswordChange(false);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(t("organizationProfile.passwordUpdateError"));
    }
  };

  const handleCloseAccount = async () => {
    if (closeAccountConfirmText.toLowerCase() !== "close my account") {
      toast.error(t("organizationProfile.closeAccountConfirmError"));
      return;
    }

    try {
      const orgId = localStorage.getItem("userId");
      const response = await axios.delete(
        `${DATABASE_URL}/org/delete-account/${orgId}`,
        {
          headers: { Authorization: `Bearer ${sessionId}` },
        }
      );

      if (response.status === 200) {
        toast.success(t("organizationProfile.accountClosedSuccess"));
        localStorage.clear();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error closing account:", error);
      toast.error(t("organizationProfile.accountCloseError"));
    }
  };

  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error(t("organizationProfile.invalidFileType"));
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("organizationProfile.fileTooLarge"));
      return;
    }

    setUploadingImage(true);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "wandelen");
      formData.append("cloud_name", "duycbzosb");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/duycbzosb/image/upload",
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      // Update profile picture in backend
      await axios.put(
        `${DATABASE_URL}/org/upload-profile-picture/${orgId}`,
        { profilePicUrl: imageUrl },
        { headers: { Authorization: `Bearer ${sessionId}` } }
      );

      // Update local state
      setProfileData((prev) => ({ ...prev, profilePic: imageUrl }));
      setOriginalData((prev) => ({ ...prev, profilePic: imageUrl }));

      toast.success(t("organizationProfile.profilePicUpdateSuccess"));
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error(t("organizationProfile.profilePicUpdateError"));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveProfilePic = async () => {
    try {
      await axios.put(
        `${DATABASE_URL}/org/upload-profile-picture/${orgId}`,
        { profilePicUrl: "" },
        { headers: { Authorization: `Bearer ${sessionId}` } }
      );

      setProfileData((prev) => ({ ...prev, profilePic: "" }));
      setOriginalData((prev) => ({ ...prev, profilePic: "" }));

      toast.success(t("organizationProfile.profilePicRemoveSuccess"));
    } catch (error) {
      console.error("Error removing profile picture:", error);
      toast.error(t("organizationProfile.profilePicRemoveError"));
    }
  };

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      {/* Header Section */}
      <div className="relative w-full pt-10 pb-10 flex items-center justify-center">
        {/* Background Image */}
        <img
          src={HandHold}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay Filter */}
        <div className="absolute inset-0 bg-[#2A341F] opacity-55"></div>

        {/* Centered Content */}
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full bg-cover bg-center mb-4 flex items-center justify-center bg-[#f7f6f4] border-2 border-[#e5e3df]">
              {profileData.profilePic ? (
                <div
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${profileData.profilePic})` }}
                />
              ) : (
                <img
                  src={UserIcon}
                  alt="Default User Icon"
                  className="w-16 h-16 text-[#7a756e]"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicUpload}
                className="hidden"
                id="org-profile-pic-upload"
                disabled={uploadingImage}
              />
              <label
                htmlFor="org-profile-pic-upload"
                className={`absolute bottom-0 right-0 cursor-pointer ${
                  uploadingImage
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-110"
                } transition-transform`}
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <rect width={24} height={24} rx={4} fill="white" />
                  <path
                    d="M5.833 19.709H18.167C18.9847 19.709 19.7688 19.3842 20.347 18.806C20.9252 18.2278 21.25 17.4436 21.25 16.626V9.43197C21.2501 9.02702 21.1705 8.62601 21.0156 8.25185C20.8607 7.87769 20.6337 7.5377 20.3474 7.25131C20.0611 6.96492 19.7212 6.73774 19.347 6.58274C18.9729 6.42775 18.5719 6.34797 18.167 6.34797H16.748C16.34 6.34797 15.948 6.18497 15.658 5.89597L14.508 4.74497C14.365 4.60167 14.195 4.48799 14.008 4.41043C13.821 4.33287 13.6205 4.29295 13.418 4.29297H10.582C10.172 4.29297 9.782 4.45597 9.492 4.74497L8.342 5.89597C8.052 6.18597 7.66 6.34797 7.252 6.34797H5.833C5.42805 6.34797 5.02707 6.42775 4.65296 6.58274C4.27884 6.73774 3.93893 6.96492 3.65264 7.25131C3.36634 7.5377 3.13927 7.87769 2.98439 8.25185C2.82952 8.62601 2.74987 9.02702 2.75 9.43197V16.626C2.75 17.4436 3.07482 18.2278 3.65299 18.806C4.23116 19.3842 5.01534 19.709 5.833 19.709Z"
                    stroke="#381207"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0016 16.6243C13.0919 16.6243 14.1376 16.1912 14.9085 15.4203C15.6795 14.6493 16.1126 13.6036 16.1126 12.5133C16.1126 11.423 15.6795 10.3774 14.9085 9.60643C14.1376 8.83547 13.0919 8.40234 12.0016 8.40234C10.9113 8.40234 9.86567 8.83547 9.09471 9.60643C8.32375 10.3774 7.89063 11.423 7.89062 12.5133C7.89063 13.6036 8.32375 14.6493 9.09471 15.4203C9.86567 16.1912 10.9113 16.6243 12.0016 16.6243Z"
                    stroke="#381207"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            </div>
            {uploadingImage && (
              <p className="text-white text-sm font-[Poppins] mb-2">
                {t("organizationProfile.uploadingImage")}
              </p>
            )}
            {profileData.profilePic && (
              <button
                onClick={handleRemoveProfilePic}
                className="px-4 py-2 text-white rounded-lg transition mb-4"
              >
                <div className="flex justify-center items-center gap-1 py-2 px-4 rounded-lg border-[0.5px] border-[#e5e3df] text-white font-['Poppins'] text-sm leading-[normal] hover:bg-white hover:text-[#381207] transition-colors">
                  {t("organizationProfile.removeImage")}
                </div>
              </button>
            )}
            <p className="text-5xl text-[#EDE4DC] font-semibold font-[Poppins]">
              {profileData.organizationName}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Account Info Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-medium text-[#381207] mb-6 font-[Poppins]">
            {t("organizationProfile.accountInfo")}
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                  {t("organizationProfile.fullName")}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] font-[Poppins]"
                  />
                ) : (
                  <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207] font-[Poppins]">
                    {profileData.fullName}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                  {t("organizationProfile.organizationName")}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="organizationName"
                    value={profileData.organizationName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] font-[Poppins]"
                  />
                ) : (
                  <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207] font-[Poppins]">
                    {profileData.organizationName}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                  {t("organizationProfile.contactEmail")}
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="contactEmail"
                    value={profileData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] font-[Poppins]"
                  />
                ) : (
                  <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207] font-[Poppins]">
                    {profileData.contactEmail}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                  {t("organizationProfile.phoneNumber")}
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] font-[Poppins]"
                  />
                ) : (
                  <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207] font-[Poppins]">
                    {profileData.phone}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                {t("organizationProfile.address")}
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-[#2a341f] font-[Poppins]"
                />
              ) : (
                <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207] min-h-[3rem] font-[Poppins]">
                  {profileData.address}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Login Info Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-medium text-[#381207] mb-6 font-[Poppins]">
            {t("organizationProfile.loginInfo")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                {t("organizationProfile.accountEmail")}
              </label>
              <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207] font-[Poppins]">
                {profileData.accountEmail}
              </div>
              <p className="text-sm text-[#7a756e] mt-1 font-[Poppins]">
                {t("organizationProfile.emailCannotBeChanged")}
              </p>
            </div>
            <div>
              <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                {t("organizationProfile.password")}
              </label>
              <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207] font-[Poppins] flex justify-between items-center">
                <span>{profileData.password}</span>
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="text-[#2a341f] hover:underline text-sm font-[Poppins]"
                >
                  {t("organizationProfile.changePassword")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Info Section
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-medium text-[#381207] mb-6 font-[Poppins]">
            {t("organizationProfile.subscriptionInfo")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                {t("organizationProfile.currentPlan")}
              </label>
              <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207] font-[Poppins]">
                {profileData.currentPlan}
              </div>
            </div>
            <div>
              <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                {t("organizationProfile.validUntil")}
              </label>
              <div className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg text-[#381207] font-[Poppins]">
                {profileData.planValidTo}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="px-4 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition font-[Poppins]">
              {t("organizationProfile.upgradePlan")}
            </button>
            <button className="px-4 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition font-[Poppins]">
              {t("organizationProfile.cancelSubscription")}
            </button>
          </div>
        </div> */}

        {/* Close Account Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-medium text-[#381207] mb-6 font-[Poppins]">
            {t("organizationProfile.closeAccount")}
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-[#7a756e] flex-1 font-[Poppins]">
              {t("organizationProfile.closeAccountDescription")}
            </p>
            <button
              onClick={() => setShowCloseAccountModal(true)}
              className="px-4 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition whitespace-nowrap font-[Poppins]"
            >
              {t("organizationProfile.closeAccountButton")}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-[#2a341f] text-white rounded-lg hover:bg-[#1e241a] transition font-medium font-[Poppins]"
              >
                {t("organizationProfile.saveChanges")}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium font-[Poppins]"
              >
                {t("organizationProfile.cancel")}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-[#2a341f] text-white rounded-lg hover:bg-[#1e241a] transition font-medium font-[Poppins]"
            >
              {t("organizationProfile.editProfile")}
            </button>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-medium text-[#381207] mb-6 font-[Poppins]">
              {t("organizationProfile.changePassword")}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                  {t("organizationProfile.newPassword")}
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-[#b3b1ac] font-[Poppins] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                />
              </div>
              <div>
                <label className="block text-[#7a756e] font-medium mb-2 font-[Poppins]">
                  {t("organizationProfile.confirmPassword")}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-[#b3b1ac] font-[Poppins] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-4 py-2 bg-[#2a341f] text-white rounded-lg hover:bg-[#1e241a] transition font-[Poppins]"
              >
                {t("organizationProfile.saveChanges")}
              </button>
              <button
                onClick={() => {
                  setShowPasswordChange(false);
                  setPasswordData({ newPassword: "", confirmPassword: "" });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-[Poppins]"
              >
                {t("organizationProfile.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close Account Confirmation Modal */}
      {showCloseAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-[#381207] mb-4 font-[Poppins]">
              {t("organizationProfile.confirmCloseAccount")}
            </h3>
            <p className="text-[#7a756e] mb-4 font-[Poppins]">
              {t("organizationProfile.closeAccountWarning")}
            </p>
            <p className="text-[#7a756e] mb-4 font-[Poppins]">
              {t("organizationProfile.typeToConfirm")}
            </p>
            <input
              type="text"
              value={closeAccountConfirmText}
              onChange={(e) => setCloseAccountConfirmText(e.target.value)}
              placeholder={t("organizationProfile.closeMyAccount")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED321] mb-4 font-[Poppins]"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowCloseAccountModal(false);
                  setCloseAccountConfirmText("");
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-[Poppins]"
              >
                {t("organizationProfile.cancel")}
              </button>
              <button
                onClick={handleCloseAccount}
                disabled={
                  closeAccountConfirmText !==
                  t("organizationProfile.closeMyAccount")
                }
                className={`px-4 py-2 rounded-lg transition font-[Poppins] ${
                  closeAccountConfirmText ===
                  t("organizationProfile.closeMyAccount")
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {t("organizationProfile.deleteAccount")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationProfile;
