import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const ManageQuote = () => {
  const navigate = useNavigate();

  const [reqUsers, setReqUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const { DATABASE_URL } = useContext(DatabaseContext);

  const handleAdd = (user) => {
    navigate("/admin/add-customer", { state: { user } });
  };

  const handleEdit = (user) => {
    navigate("/admin/add-customer", { state: { user } });
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/all-requests`);
      let users = res.data;

      // Apply default sorting (newest first)
      users = users.sort((a, b) => {
        const aDate = new Date(a.createdAt || 0);
        const bDate = new Date(b.createdAt || 0);
        return bDate - aDate; // Newest first
      });

      setReqUsers(users);
      setOriginalUsers(users);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedUsers = [...reqUsers].sort((a, b) => {
      let aValue = "";
      let bValue = "";

      switch (key) {
        case "firstName":
          aValue = a.contactPerson?.fullName?.split(" ")[0] || "";
          bValue = b.contactPerson?.fullName?.split(" ")[0] || "";
          break;
        case "lastName":
          aValue =
            a.contactPerson?.fullName?.split(" ").slice(1).join(" ") || "";
          bValue =
            b.contactPerson?.fullName?.split(" ").slice(1).join(" ") || "";
          break;
        case "orgName":
          aValue = a.orgName || "";
          bValue = b.orgName || "";
          break;
        case "phoneNo":
          aValue = a.phoneNo || "";
          bValue = b.phoneNo || "";
          break;
        case "email":
          aValue = a.contactPerson?.email || "";
          bValue = b.contactPerson?.email || "";
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

    setReqUsers(sortedUsers);
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
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex-1 bg-[#f7f6f4] p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#381207] font-['Poppins'] mb-3 md:mb-4">
          Manage Organizations
        </h1>
        <p className="text-lg md:text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          View and manage organization requests and approved organizations.
        </p>
      </div>
      {/* Content Section */}
      <div className="w-full bg-[#ede4dc]/[.30] rounded-[0.625rem] overflow-hidden shadow-sm">
        {/* Header Row */}
        <div className="flex items-center w-full py-3 md:py-4 px-4 md:px-6 h-14 md:h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div
            className="flex items-center gap-2 w-[11%] min-w-[110px] cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors px-2 py-1 rounded"
            onClick={() => handleSort("firstName")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              First Name
            </div>
            {getSortIcon("firstName")}
          </div>
          <div
            className="flex items-center gap-2 w-[11%] min-w-[110px] cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors px-2 py-1 rounded"
            onClick={() => handleSort("lastName")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Last Name
            </div>
            {getSortIcon("lastName")}
          </div>
          <div
            className="flex items-center gap-2 w-[16%] min-w-[160px] cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors px-2 py-1 rounded"
            onClick={() => handleSort("orgName")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Organization
            </div>
            {getSortIcon("orgName")}
          </div>
          <div
            className="flex items-center gap-2 w-[11%] min-w-[110px] cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors px-2 py-1 rounded"
            onClick={() => handleSort("phoneNo")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Phone
            </div>
            {getSortIcon("phoneNo")}
          </div>
          <div
            className="flex items-center gap-2 w-[16%] min-w-[160px] cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors px-2 py-1 rounded"
            onClick={() => handleSort("email")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Email
            </div>
            {getSortIcon("email")}
          </div>
          <div
            className="flex items-center gap-2 w-[11%] min-w-[110px] cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors px-2 py-1 rounded"
            onClick={() => handleSort("createdAt")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Date
            </div>
            {getSortIcon("createdAt")}
          </div>
          <div className="flex items-center gap-2 w-[9%] min-w-[90px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Status
            </div>
          </div>
          <div className="flex items-center gap-2 w-[15%] min-w-[150px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Actions
            </div>
          </div>
        </div>

        {/* Data Rows */}
        {reqUsers.map((user, index) => (
          <div
            key={index}
            className={`flex items-center w-full py-3 md:py-4 px-4 md:px-6 h-14 md:h-16 border-b border-b-[#d9bbaa] ${
              index % 2 === 0 ? "bg-[#ede4dc]" : "bg-white"
            } hover:bg-[#a6a643]/[.1] transition-colors duration-200`}
          >
            <div className="w-[11%] min-w-[110px] px-2">
              <div className="text-[#381207] font-['Poppins'] truncate">
                {user.contactPerson?.fullName?.split(" ")[0] || "N/A"}
              </div>
            </div>
            <div className="w-[11%] min-w-[110px] px-2">
              <div className="text-[#381207] font-['Poppins'] truncate">
                {user.contactPerson?.fullName?.split(" ").slice(1).join(" ") ||
                  "N/A"}
              </div>
            </div>
            <div className="w-[16%] min-w-[160px] px-2">
              <div className="text-[#381207] font-['Poppins'] font-medium truncate">
                {user.orgName}
              </div>
            </div>
            <div className="w-[11%] min-w-[110px] px-2">
              <div className="text-[#381207] font-['Poppins'] truncate">
                {user.phoneNo}
              </div>
            </div>
            <div className="w-[16%] min-w-[160px] px-2">
              <div className="text-[#381207] font-['Poppins'] truncate">
                {user.contactPerson?.email || "N/A"}
              </div>
            </div>
            <div className="w-[11%] min-w-[110px] px-2">
              <div className="text-[#381207] font-['Poppins'] text-sm truncate">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
            <div className="w-[9%] min-w-[90px] px-2">
              <div className="text-[#381207] font-['Poppins'] text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.requestStates === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.requestStates}
                </span>
              </div>
            </div>
            <div className="w-[15%] min-w-[150px] px-2 flex items-center gap-3">
              <button
                className="px-3 py-1 rounded bg-[#dd9219] text-white font-['Poppins'] text-sm hover:bg-[#c4a016] transition-colors"
                onClick={() => {
                  if (user.requestStates === "approved") {
                    handleEdit(user);
                  } else {
                    handleAdd(user);
                  }
                }}
              >
                {user.requestStates === "approved" ? "Edit" : "Add"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQuote;
