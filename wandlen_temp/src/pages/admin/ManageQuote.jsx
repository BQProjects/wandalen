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

  const handleDelete = async (userId) => {
    if (
      window.confirm(
        "Weet u zeker dat u deze organisatieverzoek wilt verwijderen?"
      )
    ) {
      try {
        await axios.delete(`${DATABASE_URL}/admin/delete-request/${userId}`);
        setReqUsers(reqUsers.filter((user) => user._id !== userId));
        console.log("Request deleted successfully");
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
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
          Organisaties Beheren
        </h1>
        <p className="text-lg md:text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Bekijk en beheer organisatieverzoeken en goedgekeurde organisaties.
        </p>
      </div>
      {/* Content Section */}
      <div className="w-full bg-[#ede4dc]/[.30] rounded-[0.625rem] overflow-hidden shadow-sm">
        {/* Header Row */}
        <div className="flex items-center py-1 px-6 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2] min-w-full">
          <div
            className="flex-1 px-2 py-3 min-w-[120px] flex items-center justify-between cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors rounded"
            onClick={() => handleSort("firstName")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Voornaam
            </div>
            {getSortIcon("firstName")}
          </div>
          <div
            className="flex-1 px-2 py-3 min-w-[120px] flex items-center justify-between cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors rounded"
            onClick={() => handleSort("lastName")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Achternaam
            </div>
            {getSortIcon("lastName")}
          </div>
          <div
            className="flex-1 px-2 py-3 min-w-[150px] flex items-center justify-between cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors rounded"
            onClick={() => handleSort("orgName")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Organisatie
            </div>
            {getSortIcon("orgName")}
          </div>
          <div
            className="flex-1 px-2 py-3 min-w-[120px] flex items-center justify-between cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors rounded"
            onClick={() => handleSort("phoneNo")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Telefoon
            </div>
            {getSortIcon("phoneNo")}
          </div>
          <div
            className="flex-1 px-2 py-3 min-w-[150px] flex items-center justify-between cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors rounded"
            onClick={() => handleSort("email")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              E-mail
            </div>
            {getSortIcon("email")}
          </div>
          <div
            className="flex-1 px-2 py-3 min-w-[100px] flex text-center items-center justify-center cursor-pointer hover:bg-[#a6a643]/[.3] transition-colors rounded"
            onClick={() => handleSort("createdAt")}
          >
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Datum
            </div>
            {getSortIcon("createdAt")}
          </div>
          <div className="flex-1 px-2 justify-center text-center py-3 min-w-[100px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Status
            </div>
          </div>
          <div className="w-[120px] min-w-[120px] flex justify-center items-center py-3">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Acties
            </div>
          </div>
        </div>

        {/* Data Rows */}
        {reqUsers.map((user, index) => (
          <div
            key={index}
            className={`flex items-center w-full py-3 px-6 min-h-[60px] border-b border-b-[#d9bbaa] ${
              index % 2 === 0 ? "bg-[#ede4dc]" : "bg-white"
            } hover:bg-[#a6a643]/[.1] transition-colors duration-200`}
          >
            <div className="flex-1 px-2 py-3 min-w-[120px] overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
              <div className="text-[#381207] font-['Poppins'] whitespace-nowrap">
                {user.contactPerson?.fullName?.split(" ")[0] || "N/A"}
              </div>
            </div>
            <div className="flex-1 px-2 py-3 min-w-[120px] overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
              <div className="text-[#381207] font-['Poppins'] whitespace-nowrap">
                {user.contactPerson?.fullName?.split(" ").slice(1).join(" ") ||
                  "N/A"}
              </div>
            </div>
            <div className="flex-1 px-2 py-3 min-w-[150px] overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
              <div className="text-[#381207] font-['Poppins'] font-medium whitespace-nowrap">
                {user.orgName}
              </div>
            </div>
            <div className="flex-1 px-2 py-3 min-w-[120px] overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
              <div className="text-[#381207] font-['Poppins'] whitespace-nowrap">
                {user.phoneNo}
              </div>
            </div>
            <div className="flex-1 px-2 py-3 min-w-[150px] overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
              <div className="text-[#381207] font-['Poppins'] whitespace-nowrap">
                {user.contactPerson?.email || "N/A"}
              </div>
            </div>
            <div className="flex-1 px-2 py-3 text-center min-w-[100px] overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
              <div className="text-[#381207] font-['Poppins'] text-sm whitespace-nowrap">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
            <div className="flex-1 px-2 py-3 min-w-[100px] flex justify-center items-center">
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
            <div className="w-[120px] min-w-[120px] flex justify-center items-center py-3 gap-2">
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
                {user.requestStates === "approved" ? "Bewerken" : "Toevoegen"}
              </button>
              <button
                className="p-1 rounded hover:bg-red-100 transition-colors"
                onClick={() => handleDelete(user._id)}
                title="Verzoek Verwijderen"
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

export default ManageQuote;
