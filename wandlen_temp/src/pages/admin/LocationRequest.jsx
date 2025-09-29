import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const LocationRequest = () => {
  const navigate = useNavigate();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const [users, setUsers] = useState([]);

  const getAllReqs = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/video-req`);
      console.log("API Response:", res.data);

      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else if (Array.isArray(res.data.requests)) {
        setUsers(res.data.requests);
      } else if (Array.isArray(res.data.videoRequests)) {
        setUsers(res.data.videoRequests);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching location requests:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    getAllReqs();
  }, []);

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Location Request form
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Select and add members from this location request.
        </p>
      </div>

      {/* New Form Layout */}
      <div className="w-full overflow-x-auto">
        <div className="inline-flex flex-col justify-center items-start rounded-[0.625rem] bg-[#ede4dc]/[.30] min-w-full">
          {/* Header Row */}
          <div className="flex items-center gap-4 py-1 px-6 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2] min-w-full">
            <div className="flex items-center gap-2 p-2 w-[200px] flex-shrink-0">
              <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
                Email
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 w-[150px] flex-shrink-0">
              <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
                Created By
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 flex-1 min-w-[300px]">
              <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
                Google Maps Link
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 w-[150px] flex-shrink-0">
              <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
                Video Created
              </div>
            </div>
          </div>

          {/* Data Rows */}
          {users?.map((user, index) => {
            return (
              <div
                key={index}
                className={`flex items-center w-full py-3 px-6 min-h-[60px] border-b border-b-[#d9bbaa] ${
                  index % 2 === 0 ? "bg-[#ede4dc]" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-2 pr-2 w-[200px] flex-shrink-0">
                  <div className="flex flex-col items-start gap-2 p-2">
                    <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal] truncate">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pr-2 w-[150px] flex-shrink-0">
                  <div className="flex flex-col items-start gap-2 p-2">
                    <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal] truncate">
                      {user.createdBy
                        ? `${user.createdBy.firstName || ""} ${
                            user.createdBy.lastName || ""
                          }`.trim() ||
                          user.createdBy.email ||
                          "Admin"
                        : "System"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 p-2 flex-1 min-w-[300px]">
                  <div className="flex flex-col justify-center items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal] underline truncate">
                    {user.link || "No link provided"}
                  </div>
                </div>
                <div className="flex justify-center items-center pb-[0.5px] pt-px px-0 w-[150px] flex-shrink-0">
                  {user.currentStatus === "Completed" && (
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-green-600"
                    >
                      <path
                        d="M12.6667 2.25H3.33333C2.97971 2.25 2.64057 2.39048 2.39052 2.64052C2.14048 2.89057 2 3.22971 2 3.58333V12.9167C2 13.2703 2.14048 13.6094 2.39052 13.8595C2.64057 14.1095 2.97971 14.25 3.33333 14.25H12.6667C13.0203 14.25 13.3594 14.1095 13.6095 13.8595C13.8595 13.6094 14 13.2703 14 12.9167V3.58333C14 3.22971 13.8595 2.89057 13.6095 2.64052C13.3594 2.39048 13.0203 2.25 12.6667 2.25ZM12.6667 3.58333V12.9167H3.33333V3.58333H12.6667ZM6.66667 11.5833L4 8.91667L4.94 7.97L6.66667 9.69667L11.06 5.30333L12 6.25"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationRequest;
