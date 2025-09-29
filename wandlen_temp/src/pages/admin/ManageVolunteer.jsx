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
      <div className="overflow-x-auto rounded-[0.625rem] bg-[#ede4dc]/[.30]">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#a6a643]/[.2] border-b border-b-[#d9bbaa]">
              <th
                className="px-6 py-4 text-left text-[#2a341f] font-['Poppins'] text-lg cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors"
                onClick={() => handleSort("firstName")}
              >
                First name
                {getSortIcon("firstName")}
              </th>
              <th
                className="px-6 py-4 text-left text-[#2a341f] font-['Poppins'] text-lg cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors"
                onClick={() => handleSort("lastName")}
              >
                Last name
                {getSortIcon("lastName")}
              </th>
              <th
                className="px-6 py-4 text-left text-[#2a341f] font-['Poppins'] text-lg cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors"
                onClick={() => handleSort("phoneNumber")}
              >
                Phone number
                {getSortIcon("phoneNumber")}
              </th>
              <th
                className="px-6 py-4 text-left text-[#2a341f] font-['Poppins'] text-lg cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors"
                onClick={() => handleSort("email")}
              >
                Contact email
                {getSortIcon("email")}
              </th>
              <th className="px-6 py-4 text-center text-[#2a341f] font-['Poppins'] text-lg">
                Volunteer
              </th>
              <th className="px-6 py-4 text-center text-[#2a341f] font-['Poppins'] text-lg">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className={`border-b border-b-[#d9bbaa] ${
                  user.isVolunteer ? "bg-[#ede4dc]" : ""
                }`}
              >
                <td className="px-6 py-4 text-[#381207] font-['Poppins']">
                  {user.firstName}
                </td>
                <td className="px-6 py-4 text-[#381207] font-['Poppins']">
                  {user.lastName}
                </td>
                <td className="px-6 py-4 text-[#381207] font-['Poppins']">
                  {user.phoneNumber || user.phone}
                </td>
                <td className="px-6 py-4 text-[#381207] font-['Poppins']">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={user.isVolunteer}
                    readOnly
                    className="w-5 h-5 text-[#dd9219] bg-gray-100 border-gray-300 rounded focus:ring-[#dd9219] focus:ring-2"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="px-4 py-2 rounded bg-[#dd9219] text-white font-['Poppins'] hover:bg-[#c4a016] cursor-pointer"
                    onClick={() => handleViewDetails(user._id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVolunteer;
