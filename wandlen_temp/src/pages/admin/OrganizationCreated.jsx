import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrganizationCreated = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal opens by default

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackToHome = () => {
    navigate("/admin/manage"); // Assuming admin home is /admin/manage
  };

  return (
    <div className="flex-1 bg-white p-6 max-w-4xl mx-auto">
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
                Organization Created Successfully!
              </h2>
              <p className="text-xl text-[#381207] font-['Poppins'] font-medium">
                We’ve sent login details to [Contact Email]. They can now log in
                and add their patient or members.
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

      {/* Main Content (Submission Details) */}
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#381207] font-['Poppins'] mb-4">
            Submission details
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-[#381207] font-['Poppins'] text-lg font-medium">
              johnlee@gmail.com
            </p>
            <p className="text-[#4b4741] font-['Poppins'] text-sm">
              31-08-2025
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-[#8d8d8d] font-['Poppins']">Full name</p>
              <p className="text-[#381207] font-['Poppins'] text-lg">John</p>
            </div>
            <div>
              <p className="text-[#8d8d8d] font-['Poppins']">Phone number</p>
              <p className="text-[#381207] font-['Poppins'] text-lg">
                +31 6 1234 5678
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[#8d8d8d] font-['Poppins']">
                Organization name / Family name
              </p>
              <p className="text-[#381207] font-['Poppins'] text-lg">
                Sunrise Wellness Center
              </p>
            </div>
            <div>
              <p className="text-[#8d8d8d] font-['Poppins']">Contact Email</p>
              <p className="text-[#381207] font-['Poppins'] text-lg">
                johnlee@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[#8d8d8d] font-['Poppins']">Address</p>
          <p className="text-[#381207] font-['Poppins'] text-lg">
            Dominee C. Keersstraat 798151 AB Lemelerveld
          </p>
        </div>

        <div>
          <p className="text-[#8d8d8d] font-['Poppins']">Notes</p>
          <p className="text-[#381207] font-['Poppins'] text-lg">
            We’re looking to start this plan by mid-August for a small group of
            caregivers. Please let us know if early onboarding support is
            available, and if we can upgrade the number of users later.
          </p>
        </div>

        <div className="text-center">
          <p className="text-[#381207] font-['Poppins'] text-lg">All Patient</p>
        </div>

        <div className="flex justify-center">
          <button className="px-4 py-2 rounded border border-[#5b6502] bg-white text-[#5b6502] font-['Poppins'] hover:bg-[#5b6502] hover:text-white">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline mr-2"
            >
              <path
                d="M8 10V2M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.66406 6.66797L7.9974 10.0013L11.3307 6.66797"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCreated;
