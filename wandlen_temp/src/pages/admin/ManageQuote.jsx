import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const ManageQuote = () => {
  const navigate = useNavigate();

  const [reqUsers, setReqUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
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
      setReqUsers(res.data);
      setOriginalUsers(res.data);
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
    <div className="flex-1 bg-[#f7f6f4] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Manage Organizations
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          View and manage organization requests and approved organizations.
        </p>
      </div>
      {/* Content Section */}
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
                onClick={() => handleSort("orgName")}
              >
                Organization name
                {getSortIcon("orgName")}
              </th>
              <th
                className="px-6 py-4 text-left text-[#2a341f] font-['Poppins'] text-lg cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors"
                onClick={() => handleSort("phoneNo")}
              >
                Phone number
                {getSortIcon("phoneNo")}
              </th>
              <th
                className="px-6 py-4 text-left text-[#2a341f] font-['Poppins'] text-lg cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors"
                onClick={() => handleSort("email")}
              >
                Contact email
                {getSortIcon("email")}
              </th>
              <th className="px-6 py-4 text-center text-[#2a341f] font-['Poppins'] text-lg">
                Status
              </th>
              <th className="px-6 py-4 text-center text-[#2a341f] font-['Poppins'] text-lg">
                T&C
              </th>
              <th className="px-6 py-4 text-center text-[#2a341f] font-['Poppins'] text-lg">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reqUsers.map((user, index) => (
              <tr
                key={index}
                className={`border-b border-b-[#d9bbaa] ${
                  index % 2 === 0 ? "bg-[#ede4dc]" : ""
                }`}
              >
                <td className="px-6 py-4 text-[#381207] font-['Poppins']">
                  {user.contactPerson?.fullName?.split(" ")[0] || "N/A"}
                </td>
                <td className="px-6 py-4 text-[#381207] font-['Poppins']">
                  {user.contactPerson?.fullName
                    ?.split(" ")
                    .slice(1)
                    .join(" ") || "N/A"}
                </td>
                <td className="px-6 py-4 text-[#381207] font-['Poppins']">
                  {user.orgName}
                </td>
                <td className="px-6 py-4 text-[#381207] font-['Poppins']">
                  {user.phoneNo}
                </td>
                <td className="px-6 py-4 text-[#381207] font-['Poppins']">
                  {user.contactPerson?.email || "N/A"}
                </td>
                <td className="px-6 py-4 text-center text-[#381207] font-['Poppins']">
                  {user.requestStates}
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={user.requestStates === "approved"}
                    readOnly
                    className="w-5 h-5 text-[#dd9219] bg-gray-100 border-gray-300 rounded focus:ring-[#dd9219] focus:ring-2"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="px-4 py-2 rounded bg-[#dd9219] text-white font-['Poppins'] hover:bg-[#c4a016] cursor-pointer"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageQuote;
