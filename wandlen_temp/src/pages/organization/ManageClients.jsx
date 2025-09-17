import React, { useState } from "react";

const ManageClients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      fullName: "John Lee",
      phone: "+31 6 1234 5678",
      email: "johnlee",
      password: "VM12ops#u5",
      checked: false,
    },
    {
      id: 2,
      fullName: "Mark Ham",
      phone: "+31 6 1234 5678",
      email: "markham",
      password: "VM34ops#u6",
      checked: true,
    },
    {
      id: 3,
      fullName: "Sandy Rue",
      phone: "+31 6 1234 5678",
      email: "sandyrue",
      password: "VM56ops#u7",
      checked: false,
    },
    {
      id: 4,
      fullName: "Lisa Mona",
      phone: "+31 6 1234 5678",
      email: "lisamona",
      password: "VM78ops#u8",
      checked: false,
    },
    {
      id: 5,
      fullName: "Betty Walt",
      phone: "+31 6 1234 5678",
      email: "bettywalt",
      password: "VM91ops#u9",
      checked: false,
    },
    {
      id: 6,
      fullName: "Tom Harris",
      phone: "+31 6 1234 5678",
      email: "tomharris",
      password: "VM11ops#u4",
      checked: false,
    },
  ]);

  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [activeTab, setActiveTab] = useState("clients");

  const handleInputChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAddClient = () => {
    if (newClient.firstName && newClient.lastName && newClient.email) {
      const fullName = `${newClient.firstName} ${newClient.lastName}`;
      const newClientData = {
        id: clients.length + 1,
        fullName,
        phone: "+31 6 1234 5678", // Placeholder
        email: newClient.email,
        password: `VM${Math.floor(Math.random() * 100)}ops#u${Math.floor(
          Math.random() * 10
        )}`, // Generated password
        checked: false,
      };
      setClients([...clients, newClientData]);
      setNewClient({ firstName: "", lastName: "", email: "" });
    }
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const handleCheckboxChange = (id) => {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, checked: !client.checked } : client
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#ede4dc] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#dd9219] mb-2">
            Organization
          </h1>
          <h2 className="text-5xl font-medium text-[#381207]">
            Manage Client, subscription & your community
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex bg-[#e5e3df] rounded-lg p-1 mb-8 w-fit shadow-md">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "overview"
                ? "bg-[#381207] text-white"
                : "text-[#381207] hover:bg-gray-200"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "clients"
                ? "bg-[#381207] text-white"
                : "text-[#381207] hover:bg-gray-200"
            }`}
          >
            Clients
          </button>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#a6a643]/20 border-b border-[#d9bbaa]">
                  <th className="px-6 py-4 text-left">
                    <input type="checkbox" className="w-4 h-4" />
                  </th>
                  <th className="px-6 py-4 text-left text-[#2a341f] font-medium">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-[#2a341f] font-medium">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-left text-[#2a341f] font-medium">
                    Email Id
                  </th>
                  <th className="px-6 py-4 text-left text-[#2a341f] font-medium">
                    Generated Password
                  </th>
                  <th className="px-6 py-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr
                    key={client.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#ede4dc]"}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={client.checked}
                        onChange={() => handleCheckboxChange(client.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-6 py-4 text-[#381207]">
                      {client.fullName}
                    </td>
                    <td className="px-6 py-4 text-[#381207]">{client.phone}</td>
                    <td className="px-6 py-4 text-[#381207]">{client.email}</td>
                    <td className="px-6 py-4 text-[#381207]">
                      {client.password}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-[#381207] hover:text-red-600 transition"
                      >
                        <svg
                          width={17}
                          height={16}
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M4.5026 12.6667C4.5026 13.0203 4.64308 13.3594 4.89313 13.6095C5.14318 13.8595 5.48232 14 5.83594 14H11.1693C11.5229 14 11.862 13.8595 12.1121 13.6095C12.3621 13.3594 12.5026 13.0203 12.5026 12.6667V4.66667H4.5026V12.6667ZM5.83594 6H11.1693V12.6667H5.83594V6ZM10.8359 2.66667L10.1693 2H6.83594L6.16927 2.66667H3.83594V4H13.1693V2.66667H10.8359Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Client Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-medium text-[#381207] mb-2">
              Add New Client
            </h3>
            <p className="text-[#381207]">
              Fill in client's details and click "Add Client" to save them to
              the list
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-[#7a756e] font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={newClient.firstName}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-[#7a756e] font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={newClient.lastName}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label className="block text-[#7a756e] font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={newClient.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                placeholder="Email"
              />
            </div>
          </div>

          <button
            onClick={handleAddClient}
            className="px-6 py-3 bg-[#a6a643] text-white rounded-lg hover:bg-[#8b8b3a] transition font-medium"
          >
            Add Client
          </button>
        </div>

        {/* Status Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#34c759] shadow-sm">
            <svg width={16} height={17} viewBox="0 0 16 17" fill="none">
              <path
                d="M8.0026 1.83203C4.33594 1.83203 1.33594 4.83203 1.33594 8.4987C1.33594 12.1654 4.33594 15.1654 8.0026 15.1654C11.6693 15.1654 14.6693 12.1654 14.6693 8.4987C14.6693 4.83203 11.6693 1.83203 8.0026 1.83203ZM8.0026 13.832C5.0626 13.832 2.66927 11.4387 2.66927 8.4987C2.66927 5.5587 5.0626 3.16536 8.0026 3.16536C10.9426 3.16536 13.3359 5.5587 13.3359 8.4987C13.3359 11.4387 10.9426 13.832 8.0026 13.832ZM11.0626 5.55203L6.66927 9.94536L4.9426 8.22536L4.0026 9.16536L6.66927 11.832L12.0026 6.4987L11.0626 5.55203Z"
                fill="#34C759"
              />
            </svg>
            <span className="text-[#381207] font-medium">Done</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClients;
