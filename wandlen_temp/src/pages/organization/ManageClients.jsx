import React, { useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [orgData, setOrgData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");

  const getAllClients = async () => {
    try {
      const res = await axios.get(
        `${DATABASE_URL}/org/getClients/${sessionId}`
      );
      setClients(res.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const getOrgData = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/org/getOrg/${sessionId}`);
      setOrgData(res.data.org); // Fix: Access the nested 'org' key
    } catch (error) {
      console.error("Error fetching org data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getAllClients(), getOrgData()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
  });

  const [editingClientId, setEditingClientId] = useState(null); // New state for editing

  const [activeTab, setActiveTab] = useState("clients");

  const handleInputChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAddClient = async () => {
    // Check if client limit is reached before attempting to add
    if (orgData && clients.length >= orgData.clientLimit && !editingClientId) {
      alert(
        "Cannot add more clients. Please contact admin to increase client limit."
      );
      return;
    }
    try {
      if (editingClientId) {
        // Update existing client
        const res = await axios.put(
          `${DATABASE_URL}/org/editClient/${editingClientId}`,
          {
            firstName: newClient.firstName,
            lastName: newClient.lastName,
            email: newClient.email,
            phoneNo: newClient.phoneNo,
          }
        );
        if (res.status === 200) {
          alert("Client updated successfully");
          setClients(
            clients.map((client) =>
              client._id === editingClientId
                ? { ...client, ...newClient }
                : client
            )
          );
          setEditingClientId(null);
          setNewClient({
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            password: "",
          });
        }
      } else {
        // Add new client
        const randomPassword = Math.random().toString(36).slice(-8);
        const res = await axios.post(`${DATABASE_URL}/org/addClient`, {
          firstName: newClient.firstName,
          lastName: newClient.lastName,
          email: newClient.email,
          password: randomPassword,
          orgId: sessionId,
          phoneNo: newClient.phoneNo,
        });

        if (res.status === 201) {
          alert("Client added successfully");
          setNewClient({
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            password: "",
          });
          setClients([...clients, res.data.newClient]);
        }
      }
    } catch (error) {
      console.error("Error adding/updating client:", error);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`${DATABASE_URL}/org/deleteClient/${id}`);
      setClients(clients.filter((client) => client._id !== id)); // Remove from local state after successful delete
      alert("Client deleted successfully");
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client");
    }
  };

  const handleEditClient = (client) => {
    setEditingClientId(client._id);
    setNewClient({
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phoneNo: client.phoneNo,
      password: "",
    });
  };

  const handleCheckboxChange = (id) => {
    setClients(
      clients.map(
        (client) =>
          client._id === id ? { ...client, checked: !client.checked } : client // Fix: Use _id
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
                    key={client._id} // Fix: Use _id for unique key
                    className={index % 2 === 0 ? "bg-white" : "bg-[#ede4dc]"}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={client.checked}
                        onChange={() => handleCheckboxChange(client._id)} // Already using _id
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-6 py-4 text-[#381207]">
                      {client.firstName} {client.lastName}
                    </td>
                    <td className="px-6 py-4 text-[#381207]">
                      {client.phoneNo}
                    </td>
                    <td className="px-6 py-4 text-[#381207]">{client.email}</td>
                    <td className="px-6 py-4 text-[#381207]">
                      {client.plainPassword}
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleEditClient(client)}
                        className="text-[#381207] hover:text-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client._id)} // Already using _id
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

        {/* Add New Client Section - Conditionally Rendered */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {isLoading ? (
            <div className="text-center">
              <p className="text-[#381207]">Loading data...</p>
            </div>
          ) : orgData ? (
            clients.length >= orgData.clientLimit && !editingClientId ? (
              <div className="text-center">
                <h3 className="text-2xl font-medium text-[#381207] mb-2">
                  Client Limit Reached
                </h3>
                <p className="text-[#381207]">
                  Please contact admin to increase client limit.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-medium text-[#381207] mb-2">
                    {editingClientId ? "Edit Client" : "Add New Client"}
                  </h3>
                  <p className="text-[#381207]">
                    {editingClientId
                      ? 'Update client\'s details and click "Update Client" to save changes'
                      : 'Fill in client\'s details and click "Add Client" to save them to the list'}
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
                  <div>
                    <label className="block text-[#7a756e] font-medium mb-2">
                      Phone No
                    </label>
                    <input
                      type="text"
                      name="phoneNo"
                      value={newClient.phoneNo}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                      placeholder="Phone No"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddClient}
                  className="px-6 py-3 bg-[#a6a643] text-white rounded-lg hover:bg-[#8b8b3a] transition font-medium"
                >
                  {editingClientId ? "Update Client" : "Add Client"}
                </button>
                {editingClientId && (
                  <button
                    onClick={() => {
                      setEditingClientId(null);
                      setNewClient({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phoneNo: "",
                        password: "",
                      });
                    }}
                    className="ml-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
                  >
                    Cancel
                  </button>
                )}
              </>
            )
          ) : (
            <div className="text-center">
              <p className="text-[#381207]">Error loading organization data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageClients;
