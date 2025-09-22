import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const ManageVideos = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { DATABASE_URL } = useContext(DatabaseContext);

  const getVideos = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/all-videos`);
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Volunteer Video Submissions
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          View, download, and keep track of all videos submitted by your
          volunteers.
        </p>
      </div>

      {/* New Layout Section */}
      <div className="inline-flex flex-col justify-center items-start rounded-[0.625rem] bg-[#ede4dc]/[.30]">
        {/* Header Row */}
        <div className="flex items-center gap-6 self-stretch py-1 px-5 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div className="flex items-center gap-2 p-2 w-[14.875rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Video Title
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
          <div className="flex items-center gap-2 p-2 w-[524px]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Video Description
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
          <div className="flex items-center gap-2 p-2 w-[9.6875rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Submitted By
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
          <div className="flex items-center gap-2 p-2 w-[12.375rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Date Submitted
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
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.0026 12.6667C4.0026 13.0203 4.14308 13.3594 4.39313 13.6095C4.64318 13.8595 4.98232 14 5.33594 14H10.6693C11.0229 14 11.362 13.8595 11.6121 13.6095C11.8621 13.3594 12.0026 13.0203 12.0026 12.6667V4.66667H4.0026V12.6667ZM5.33594 6H10.6693V12.6667H5.33594V6ZM10.3359 2.66667L9.66927 2H6.33594L5.66927 2.66667H3.33594V4H12.6693V2.66667H10.3359Z"
              fill="#7A756E"
            />
          </svg>
        </div>

        {/* Data Rows */}
        {users.map((video, index) => (
          <div
            key={index}
            className={`flex items-center gap-6 self-stretch py-1 px-5 border-b border-b-[#d9bbaa] ${
              index % 2 === 0 ? "bg-[#ede4dc]" : ""
            }`}
          >
            <div className="flex items-center gap-2 pr-2 w-[14.875rem]">
              <div className="flex flex-col items-start gap-2 p-2">
                <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                  {video.title}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 p-2 w-[524px]">
              <div className="flex flex-col justify-center items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                {video.description}
              </div>
            </div>
            <div className="flex items-center gap-2 pr-2 w-[9.6875rem]">
              <div className="flex flex-col items-start gap-2 p-2">
                <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                  {video.submittedBy}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 p-2 w-[12.375rem]">
              <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                {video.dateSubmitted}
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
                d="M8 10V2M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                stroke="#7A756E"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.66406 6.66602L7.9974 9.99935L11.3307 6.66602"
                stroke="#7A756E"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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

export default ManageVideos;
