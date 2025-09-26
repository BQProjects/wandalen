import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const ManageSubscription = () => {
  const navigate = useNavigate();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/all-clients`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });
      // Assuming res.data is an array of client objects
      const mappedSubscriptions = res.data.map((client) => {
        const now = new Date();
        const endDate = new Date(client.endDate);
        const status = endDate > now ? "Active" : "Inactive";
        return {
          firstName: client.firstName || "N/A",
          lastName: client.lastName || "N/A",
          planType: client.plan?.title || client.subscriptionType || "N/A",
          status,
          startDate: client.startDate
            ? new Date(client.startDate).toLocaleDateString()
            : "N/A",
          endDate: client.endDate
            ? new Date(client.endDate).toLocaleDateString()
            : "N/A",
          paymentStatus: "Paid", // Assuming paid if in DB; adjust if backend provides
        };
      });
      setSubscriptions(mappedSubscriptions);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleRowClick = (sub) => {
    // Navigate to SubscriptionOverview with optional state
    navigate("/admin/subscription-overview", { state: { subscription: sub } });
  };

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Manage Subscription Plans
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Track and manage all member subscriptions in one place.
        </p>
      </div>

      {/* New Layout Section */}
      <div className="flex flex-col justify-center items-start w-[1280px] rounded-[0.625rem] bg-[#ede4dc]/[.30]">
        {/* Header Row */}
        <div className="flex items-center gap-4 self-stretch py-1 px-5 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div className="flex items-center gap-2 p-2 w-[8.75rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              First name
            </div>
            <svg
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                stroke="#2A341F"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 p-2 w-[8.75rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Last name
            </div>
            <svg
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                stroke="#2A341F"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 p-2 w-[8.375rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Plan type
            </div>
            <svg
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                stroke="#2A341F"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 p-2 w-[7.75rem]">
            <div className="flex flex-col justify-center items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Status
            </div>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3535 8.75H4C3.58579 8.75 3.25 8.41421 3.25 8C3.25 7.58579 3.58579 7.25 4 7.25H13.3535C13.68 6.09575 14.7412 5.25 16 5.25C17.2588 5.25 18.32 6.09575 18.6465 7.25H20C20.4142 7.25 20.75 7.58579 20.75 8C20.75 8.41421 20.4142 8.75 20 8.75H18.6465C18.32 9.90425 17.2588 10.75 16 10.75C14.7412 10.75 13.68 9.90425 13.3535 8.75ZM14.75 8C14.75 7.30964 15.3096 6.75 16 6.75C16.6904 6.75 17.25 7.30964 17.25 8C17.25 8.69036 16.6904 9.25 16 9.25C15.3096 9.25 14.75 8.69036 14.75 8Z"
                fill="#2A341F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.6465 16.75H20C20.4142 16.75 20.75 16.4142 20.75 16C20.75 15.5858 20.4142 15.25 20 15.25H10.6465C10.32 14.0957 9.25878 13.25 8 13.25C6.74122 13.25 5.67998 14.0957 5.35352 15.25H4C3.58579 15.25 3.25 15.5858 3.25 16C3.25 16.4142 3.58579 16.75 4 16.75H5.35352C5.67998 17.9043 6.74122 18.75 8 18.75C9.25878 18.75 10.32 17.9043 10.6465 16.75ZM6.75 16C6.75 15.3096 7.30964 14.75 8 14.75C8.69036 14.75 9.25 15.3096 9.25 16C9.25 16.6904 8.69036 17.25 8 17.25C7.30964 17.25 6.75 16.6904 6.75 16Z"
                fill="#2A341F"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 p-2 w-[8.75rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Start date
            </div>
            <svg
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                stroke="#2A341F"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 p-2 w-[8.75rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              End date
            </div>
            <svg
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                stroke="#2A341F"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 py-2 pl-2 pr-0 w-[15.5rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Last payment status
            </div>
            <svg
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                stroke="#2A341F"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mdi_delete-outline flex justify-center items-center pl-[0.1875rem] pr-[0.1875rem] p-0 w-4 h-4"></div>
        </div>

        {/* Data Rows */}
        {subscriptions.map((sub, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 self-stretch py-1 px-5 border-b border-b-[#d9bbaa] cursor-pointer ${
              index % 2 === 0 ? "bg-[#ede4dc]" : ""
            }`}
            onClick={() => handleRowClick(sub)}
          >
            <div className="flex items-center gap-2 pr-2 w-[8.75rem]">
              <div className="flex flex-col items-start gap-2 p-2">
                <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                  {sub.firstName}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-2 w-[8.75rem]">
              <div className="flex flex-col items-start gap-2 p-2">
                <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                  {sub.lastName}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 p-2 w-[8.375rem]">
              <div className="flex flex-col justify-center items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                {sub.planType}
              </div>
            </div>
            <div className="flex items-center p-2 w-[7.75rem]">
              <div className="flex items-start">
                <div className="flex justify-center items-center gap-2">
                  <svg
                    width={10}
                    height={10}
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx={5}
                      cy={5}
                      r={4}
                      fill={
                        sub.status === "Active"
                          ? "#12B76A"
                          : sub.status === "Trial"
                          ? "#FFBE41"
                          : "#FF674F"
                      }
                    />
                  </svg>
                  <div className="text text-[#381207] font-['Poppins'] leading-[normal]">
                    {sub.status}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 p-2 w-[8.75rem]">
              <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                {sub.startDate}
              </div>
            </div>
            <div className="flex items-center gap-0.5 p-2 w-[8.75rem]">
              <div className="flex flex-col justify-center items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                {sub.endDate}
              </div>
            </div>
            <div className="flex items-center gap-0.5 p-2 w-[15.5rem]">
              <div className="flex items-start">
                <div className="flex justify-center items-center gap-2">
                  <svg
                    width={10}
                    height={10}
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx={5} cy={5} r={4} fill="#12B76A" />
                  </svg>
                  <div className="text text-[#381207] font-['Poppins'] leading-[normal]">
                    {sub.paymentStatus}
                  </div>
                </div>
              </div>
            </div>
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M4.0026 12.6667C4.0026 13.0203 4.14308 13.3594 4.39313 13.6095C4.64318 13.8595 4.98232 14 5.33594 14H10.6693C11.0229 14 11.362 13.8595 11.6121 13.6095C11.8621 13.3594 12.0026 13.0203 12.0026 12.6667V4.66667H4.0026V12.6667ZM5.33594 6H10.6693V12.6667H5.33594V6ZM10.3359 2.66667L9.66927 2H6.33594L5.66927 2.66667H3.33594V4H12.6693V2.66667H10.3359Z"
                fill="#7A756E"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSubscription;
