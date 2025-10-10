import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const ManageVolunteer = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { DATABASE_URL } = useContext(DatabaseContext);

  // This should view/edit existing volunteer
  const handleViewDetails = (volunteerId) => {
    navigate(`/admin/volunteer/${volunteerId}`);
  };

  const handleDelete = async (volunteerId) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      try {
        await axios.delete(
          `${DATABASE_URL}/admin/delete-volunteer/${volunteerId}`
        );
        setUsers(users.filter((user) => user._id !== volunteerId));
        console.log("Volunteer deleted successfully");
      } catch (error) {
        console.error("Error deleting volunteer:", error);
      }
    }
  };

  const getVolunteers = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/all-volunteers`);
      setUsers(res.data);
      setOriginalUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
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
        case "firstName":
          aValue = a.firstName || "";
          bValue = b.firstName || "";
          break;
        case "lastName":
          aValue = a.lastName || "";
          bValue = b.lastName || "";
          break;
        case "phoneNumber":
          aValue = a.phoneNumber || a.phone || "";
          bValue = b.phoneNumber || b.phone || "";
          break;
        case "email":
          aValue = a.email || "";
          bValue = b.email || "";
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

  useEffect(() => {
    getVolunteers();
  }, [DATABASE_URL]);

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Volunteer list view from form
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Select and add members from this quote request.
        </p>
      </div>

      {/* Table Section */}
      <div className="w-full bg-[#ede4dc]/[.30] rounded-[0.625rem] overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center w-full py-4 px-6 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div
            className="flex items-center gap-2 w-[18%] min-w-[150px] cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors px-2 py-1 rounded"
            onClick={() => handleSort("firstName")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              First Name
            </div>
            {getSortIcon("firstName")}
          </div>
          <div
            className="flex items-center gap-2 w-[18%] min-w-[150px] cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors px-2 py-1 rounded"
            onClick={() => handleSort("lastName")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Last Name
            </div>
            {getSortIcon("lastName")}
          </div>
          <div
            className="flex items-center gap-2 w-[20%] min-w-[180px] cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors px-2 py-1 rounded"
            onClick={() => handleSort("phoneNumber")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Phone Number
            </div>
            {getSortIcon("phoneNumber")}
          </div>
          <div
            className="flex items-center gap-2 w-[25%] min-w-[220px] cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors px-2 py-1 rounded"
            onClick={() => handleSort("email")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Contact Email
            </div>
            {getSortIcon("email")}
          </div>
          <div className="flex items-center gap-2 w-[19%] min-w-[170px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Actions
            </div>
          </div>
        </div>

        {/* Data Rows */}
        {users.map((user, index) => (
          <div
            key={user._id}
            className={`flex items-center w-full py-3 px-6 min-h-[60px] border-b border-b-[#d9bbaa] ${
              index % 2 === 0 ? "bg-[#ede4dc]" : "bg-white"
            }`}
          >
            <div className="w-[18%] min-w-[150px] pr-4">
              <div className="text-[#381207] font-['Poppins'] font-medium truncate">
                {user.firstName}
              </div>
            </div>
            <div className="w-[18%] min-w-[150px] pr-4">
              <div className="text-[#381207] font-['Poppins'] font-medium truncate">
                {user.lastName}
              </div>
            </div>
            <div className="w-[20%] min-w-[180px] pr-4">
              <div className="text-[#381207] font-['Poppins'] truncate">
                {user.phoneNumber || user.phone}
              </div>
            </div>
            <div className="w-[25%] min-w-[220px] pr-4">
              <div className="text-[#381207] font-['Poppins'] truncate">
                {user.email}
              </div>
            </div>
            <div className="w-[19%] min-w-[170px] flex items-center gap-3">
              <button
                className="px-3 py-1 rounded bg-[#dd9219] text-white font-['Poppins'] text-sm hover:bg-[#c4a016] transition-colors"
                onClick={() => handleViewDetails(user._id)}
              >
                View Details
              </button>
              <button
                className="p-1 rounded hover:bg-red-100 transition-colors"
                onClick={() => handleDelete(user._id)}
                title="Delete Volunteer"
              >
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
        ))}
      </div>
    </div>
  );
};

export default ManageVolunteer;
