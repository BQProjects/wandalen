import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OrganizationCreated = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [amountPaid, setAmountPaid] = useState("");
  const [planValidFrom, setPlanValidFrom] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [planValidTo, setPlanValidTo] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split("T")[0]
  );
  const [clientLimit, setClientLimit] = useState(10);

  const handleClientLimitChange = (e) => {
    setClientLimit(e.target.value);
  };

  const handleCreateUser = () => {
    // Placeholder for create user logic
    console.log("Create or update user");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackToHome = () => {
    navigate("/admin/manage");
  };

  return (
    <div className="flex-1 bg-white p-6 mx-auto">
      {/* Background Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#2a341f]/50 flex items-center justify-center z-50">
          <div className="bg-[#ede4dc] rounded-[1.25rem] p-8 max-w-2xl w-full mx-4 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-[#381207] hover:text-[#a6a643]"
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Success Message */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-[#381207] font-['Poppins'] mb-4">
                Organization{" "}
                {user?.requestStates === "approved" ? "Updated" : "Created"}{" "}
                Successfully!
              </h2>
              <p className="text-xl text-[#381207] font-['Poppins'] font-medium">
                We've sent login details to{" "}
                {user?.contactPerson?.email || user?.email || "[Contact Email]"}
                . They can now log in and add their patients or members.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleBackToHome}
                className="px-6 py-3 rounded-lg bg-[#a6a643] text-[#381207] font-['Poppins'] font-medium hover:bg-[#8f9b3a]"
              >
                Back to RFQ forms
              </button>
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 rounded-lg bg-[#a6a643] text-[#381207] font-['Poppins'] font-medium hover:bg-[#8f9b3a]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Title Row */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBackToHome}
          className="text-brown hover:text-brand"
        >
          <svg
            width={25}
            height={50}
            viewBox="0 0 25 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.8936 13.707L17.6832 11.4987L5.64365 23.5341C5.44957 23.727 5.29556 23.9563 5.19046 24.2089C5.08536 24.4615 5.03125 24.7324 5.03125 25.006C5.03125 25.2796 5.08536 25.5505 5.19046 25.8031C5.29556 26.0557 5.44957 26.285 5.64365 26.4779L17.6832 38.5195L19.8916 36.3112L8.59156 25.0091L19.8936 13.707Z"
              fill="#381207"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold text-[#381207] font-['Poppins']">
          Submission details
        </h1>
      </div>

      {/* Main Content (Submission Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-11/12 mx-auto mt-14">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-[#381207] font-['Poppins'] text-2xl font-semibold">
                {user?.contactPerson?.email || user?.email}
              </p>
              <p className="text-[#4b4741] font-['Poppins'] text-md font-semibold">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "31-08-2025"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-[#8d8d8d] font-['Poppins']">Full name</p>
                <p className="text-[#381207] font-['Poppins'] text-lg">
                  {user?.contactPerson?.fullName || "John"}
                </p>
              </div>
              <div>
                <p className="text-[#8d8d8d] font-['Poppins']">Phone number</p>
                <p className="text-[#381207] font-['Poppins'] text-lg">
                  {user?.phoneNo || "+31 6 1234 5678"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#8d8d8d] font-['Poppins']">Address</p>
            <p className="text-[#381207] font-['Poppins'] text-lg">
              {user?.address || "Dominee C. Keersstraat 798151 AB Lemelerveld"}
            </p>
          </div>

          <div>
            <p className="text-[#8d8d8d] font-['Poppins']">Notes</p>
            <p className="text-[#381207] font-['Poppins'] text-lg">
              {user?.notes ||
                "We're looking to start this plan by mid-August for a small group of caregivers. Please let us know if early onboarding support is available, and if we can upgrade the number of users later."}
            </p>
          </div>
        </div>

        <div className="relative mb-10">
          <div className="pt-16 p-6 rounded-2xl bg-[#ede4dc]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                width={96}
                height={96}
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width={96} height={96} rx={48} fill="#ede4dc" />
                <path
                  d="M29.3133 92.999C38.0078 90.9819 46.9693 90.0855 55.5001 87.4564C66.6331 84.0257 78.0247 76.7764 79.7739 64.45C81.4542 52.5804 78.0678 40.7367 78.2229 28.8672L73.0096 31.1514C59.0158 38.7886 60.3428 44.2192 60.3428 44.2192C60.5582 46.3827 62.3333 48.5291 64.1687 50.7616C65.6163 52.5287 68.2789 53.9424 65.668 56.0456C64.9184 56.649 63.7465 56.8904 63.2381 57.3127C62.1782 58.2006 63.4018 59.4849 63.6344 60.2262C64.0653 61.6313 63.5827 62.5019 62.385 63.1742C63.1347 63.8638 63.531 64.088 63.3587 65.2172C63.2553 65.9326 62.4108 66.1481 62.0317 66.7773C61.2217 68.122 61.9111 68.9065 62.0489 70.1994C62.8503 77.9401 52.4497 73.8456 48.2705 74.2852L43.9017 73.9577C39.7742 73.9318 34.7937 74.8024 33.3374 79.1296L29.3047 92.9903L29.3133 92.999Z"
                  fill="#381207"
                />
                <path
                  d="M40.1584 58.1327C43.0106 51.8143 46.2075 45.4701 46.9744 38.5828C47.6982 32.0834 46.1989 25.5409 44.217 19.3088C42.528 13.9989 40.4428 8.49085 41.4423 3C37.1339 8.35294 31.8689 12.8439 27.1038 17.7917C22.3386 22.7395 17.9699 28.3596 16.0914 34.9711C13.3167 44.7115 16.2896 55.1071 19.9001 64.5717C23.3296 73.5536 27.707 82.8199 27.8362 92.6207C31.395 80.8805 35.083 69.3385 40.1498 58.1327H40.1584Z"
                  fill="#381207"
                />
              </svg>
            </div>
            <div className="text-[#381207] font-['Poppins'] text-lg font-medium mb-4">
              Complete the User & Plan Information
            </div>
            <div className="grid gap-4">
              <div>
                <label className="block text-[#381207] font-['Poppins'] font-medium mb-2">
                  Amount Paid
                </label>
                <input
                  className="border border-[#B3B1AC] p-2 rounded-md w-full"
                  value={user?.amountPaid}
                />
              </div>
              <div>
                <label className="block text-[#381207] font-['Poppins'] font-medium mb-2">
                  Plan Valid From
                </label>
                <input
                  type="date"
                  className="border border-[#B3B1AC] p-2 rounded-md w-full"
                  value={
                    user?.planValidFrom
                      ? new Date(user.planValidFrom).toISOString().split("T")[0]
                      : ""
                  }
                />
              </div>
              <div>
                <label className="block text-[#381207] font-['Poppins'] font-medium mb-2">
                  Plan Valid To
                </label>
                <input
                  type="date"
                  className="border border-[#B3B1AC] p-2 rounded-md w-full"
                  value={
                    user?.planValidTo
                      ? new Date(user.planValidTo).toISOString().split("T")[0]
                      : ""
                  }
                />
              </div>
              <div>
                <label className="block text-[#381207] font-['Poppins'] font-medium mb-2">
                  Client Limit
                </label>
                <input
                  className="border border-[#B3B1AC] p-2 rounded-md w-full"
                  type="number"
                  min="0"
                  value={user?.clientLimit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCreated;
