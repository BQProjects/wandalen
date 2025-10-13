import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const LocationRequest = () => {
  const navigate = useNavigate();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  const getAllReqs = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/video-req`);
      console.log("API Response:", res.data);

      let users = [];
      if (Array.isArray(res.data)) {
        users = res.data;
      } else if (Array.isArray(res.data.requests)) {
        users = res.data.requests;
      } else if (Array.isArray(res.data.videoRequests)) {
        users = res.data.videoRequests;
      } else {
        users = [];
      }

      // Apply default sorting (newest first)
      users = users.sort((a, b) => {
        const aDate = new Date(a.createdAt || 0);
        const bDate = new Date(b.createdAt || 0);
        return bDate - aDate; // Newest first
      });

      setUsers(users);
      setOriginalUsers(users);
    } catch (error) {
      console.error("Error fetching location requests:", error);
      setUsers([]);
      setOriginalUsers([]);
    }
  };

  useEffect(() => {
    getAllReqs();
  }, []);
  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this location request?")
    ) {
      try {
        await axios.delete(`${DATABASE_URL}/admin/video-req/${id}`);
        getAllReqs(); // Refresh the list
      } catch (error) {
        console.error("Error deleting location request:", error);
      }
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedUsers = [...users].sort((a, b) => {
      let aValue = "";
      let bValue = "";

      switch (key) {
        case "email":
          aValue = a.email || "";
          bValue = b.email || "";
          break;
        case "location":
          aValue = a.location || "";
          bValue = b.location || "";
          break;
        case "link":
          aValue = a.link || "";
          bValue = b.link || "";
          break;
        case "currentStatus":
          aValue = a.currentStatus || "";
          bValue = b.currentStatus || "";
          break;
        case "createdAt":
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg
          width={11}
          height={11}
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline ml-2 opacity-50"
        >
          <path
            d="M5.66667 0.832031V10.1654M5.66667 10.1654L10.3333 5.4987M5.66667 10.1654L1 5.4987"
            stroke="#2A341F"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    if (sortConfig.direction === "asc") {
      return (
        <svg
          width={11}
          height={11}
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline ml-2"
        >
          <path
            d="M5.66667 10.1654V0.832031M5.66667 0.832031L1 5.4987M5.66667 0.832031L10.3333 5.4987"
            stroke="#2A341F"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else {
      return (
        <svg
          width={11}
          height={11}
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline ml-2"
        >
          <path
            d="M5.66667 0.832031V10.1654M5.66667 10.1654L10.3333 5.4987M5.66667 10.1654L1 5.4987"
            stroke="#2A341F"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
  };

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
          <div className="flex items-center py-1 px-6 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2] min-w-full">
            <div
              className="flex-1 px-2 py-3 min-w-[150px] flex items-center justify-between cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors rounded"
              onClick={() => handleSort("email")}
            >
              <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
                Email
              </div>
              {getSortIcon("email")}
            </div>
            <div
              className="flex-1 px-2 py-3 min-w-[120px] flex items-center justify-between cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors rounded"
              onClick={() => handleSort("location")}
            >
              <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
                Location
              </div>
              {getSortIcon("location")}
            </div>

            <div
              className="flex-1 px-2 py-3 min-w-[180px] flex items-center justify-between cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors rounded"
              onClick={() => handleSort("link")}
            >
              <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
                Google Maps Link
              </div>
              {getSortIcon("link")}
            </div>
            <div
              className="flex-1 px-2 py-3 min-w-[120px] flex items-center justify-evenly cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors rounded"
              onClick={() => handleSort("currentStatus")}
            >
              <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
                Video Created
              </div>
              {getSortIcon("currentStatus")}
            </div>
            <div className="w-[80px] min-w-[80px] flex justify-center items-center py-3">
              <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
                Actions
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
                <div className="flex-1 px-2 py-3 min-w-[150px] overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
                  <div className="text-[#381207] font-['Poppins'] whitespace-nowrap">
                    {user.email}
                  </div>
                </div>
                <div className="flex-1 px-2 py-3 min-w-[120px] overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
                  <div className="text-[#381207] font-['Poppins'] whitespace-nowrap">
                    {user.location || "No location provided"}
                  </div>
                </div>

                <div className="flex-1 px-2 py-3 min-w-[180px] overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
                  <div className="text-[#381207] font-['Poppins'] underline whitespace-nowrap">
                    {user.link || "No link provided"}
                  </div>
                </div>
                <div className="flex-1 px-2 py-3 min-w-[120px] flex justify-center items-center">
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
                <div className="w-[80px] min-w-[80px] flex justify-center items-center py-3">
                  <button onClick={() => handleDelete(user._id)}>
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-red-600"
                    >
                      <path
                        d="M3 6H5H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 11V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 11V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
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
