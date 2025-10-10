import React, { useState, useEffect, useContext } from "react";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const UpdateCredentail = () => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");

  // State for creating new admin
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for managing existing admins
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editForm, setEditForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });

  // UI state
  const [activeTab, setActiveTab] = useState("create");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/admins`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });
      setAdmins(res.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
      showMessage("error", "Failed to load admin accounts");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Create new admin
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newAdmin.password !== newAdmin.confirmPassword) {
      showMessage("error", "Passwords do not match");
      setLoading(false);
      return;
    }

    if (newAdmin.password.length < 6) {
      showMessage("error", "Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${DATABASE_URL}/admin/adminscreate`,
        {
          email: newAdmin.email,
          password: newAdmin.password,
        },
        {
          headers: { Authorization: `Bearer ${sessionId}` },
        }
      );

      showMessage("success", "New admin account created successfully");
      setNewAdmin({
        email: "",
        password: "",
        confirmPassword: "",
      });
      fetchAdmins(); // Refresh admin list
    } catch (error) {
      console.error("Error creating admin:", error);
      showMessage(
        "error",
        error.response?.data?.message || "Failed to create admin account"
      );
    } finally {
      setLoading(false);
    }
  };

  // Start editing admin
  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin._id);
    setEditForm({
      email: admin.email,
      password: "",
      confirmPassword: "",
      currentPassword: "",
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingAdmin(null);
    setEditForm({
      email: "",
      password: "",
      confirmPassword: "",
      currentPassword: "",
    });
  };

  // Update admin
  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editForm.password && editForm.password !== editForm.confirmPassword) {
      showMessage("error", "Passwords do not match");
      setLoading(false);
      return;
    }

    if (editForm.password && editForm.password.length < 6) {
      showMessage("error", "Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const updateData = {
        currentPassword: editForm.currentPassword,
      };

      if (editForm.password) {
        updateData.password = editForm.password;
      }

      if (editForm.email) {
        updateData.email = editForm.email;
      }

      await axios.put(
        `${DATABASE_URL}/admin/admins/${editingAdmin}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${sessionId}` },
        }
      );

      showMessage("success", "Admin account updated successfully");
      setEditingAdmin(null);
      setEditForm({
        email: "",
        password: "",
        confirmPassword: "",
        currentPassword: "",
      });
      fetchAdmins(); // Refresh admin list
    } catch (error) {
      console.error("Error updating admin:", error);
      showMessage(
        "error",
        error.response?.data?.message || "Failed to update admin account"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete admin
  const handleDeleteAdmin = async (adminId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this admin account? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`${DATABASE_URL}/admin/admins/${adminId}`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });

      showMessage("success", "Admin account deleted successfully");
      fetchAdmins(); // Refresh admin list
    } catch (error) {
      console.error("Error deleting admin:", error);
      showMessage(
        "error",
        error.response?.data?.message || "Failed to delete admin account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Admin Account Management
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Create and manage administrator accounts for the platform.
        </p>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          {[
            { id: "create", label: "Create Admin", icon: "+" },
            { id: "manage", label: "Manage Admins", icon: "" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors font-['Poppins'] ${
                activeTab === tab.id
                  ? "bg-[#a6a643]/[.2] text-[#2a341f] border border-[#a6a643]/[.3]"
                  : "text-[#381207] hover:bg-[#a6a643]/[.1] hover:text-[#2a341f]"
              }`}
            >
              {tab.icon && <span className="text-lg">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-[#ede4dc]/[.30] rounded-[0.625rem] overflow-hidden">
        {/* Create Admin Tab */}
        {activeTab === "create" && (
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-[#381207] font-['Poppins'] mb-6">
              Create New Admin Account
            </h2>
            <form onSubmit={handleCreateAdmin} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-[#e5e3df] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:border-transparent bg-white font-['Poppins']"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div></div>
                <div>
                  <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-[#e5e3df] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:border-transparent bg-white font-['Poppins']"
                    placeholder="Enter password"
                    required
                    minLength="6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={newAdmin.confirmPassword}
                    onChange={(e) =>
                      setNewAdmin({
                        ...newAdmin,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-[#e5e3df] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:border-transparent bg-white font-['Poppins']"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-['Poppins'] font-medium transition-colors"
                >
                  {loading ? "Creating..." : "Create Admin Account"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Admins Tab */}
        {activeTab === "manage" && (
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-[#381207] font-['Poppins'] mb-6">
              Manage Admin Accounts
            </h2>

            <div className="space-y-4">
              {admins.map((admin) => (
                <div
                  key={admin._id}
                  className="bg-white rounded-lg p-6 border border-[#e5e3df] hover:bg-[#ede4dc]/[.5] transition-colors"
                >
                  {editingAdmin === admin._id ? (
                    // Edit Form
                    <form onSubmit={handleUpdateAdmin} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-[#e5e3df] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:border-transparent bg-white font-['Poppins']"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                            Current Password *
                          </label>
                          <input
                            type="password"
                            value={editForm.currentPassword}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                currentPassword: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-[#e5e3df] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:border-transparent bg-white font-['Poppins']"
                            placeholder="Enter current password"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                            New Password (optional)
                          </label>
                          <input
                            type="password"
                            value={editForm.password}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                password: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-[#e5e3df] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:border-transparent bg-white font-['Poppins']"
                            placeholder="Enter new password"
                            minLength="6"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={editForm.confirmPassword}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-[#e5e3df] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:border-transparent bg-white font-['Poppins']"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-6 py-2 text-[#381207] border border-[#e5e3df] rounded-lg hover:bg-[#ede4dc]/[.5] focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:ring-offset-2 font-['Poppins'] transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-['Poppins'] font-medium transition-colors"
                        >
                          {loading ? "Updating..." : "Update Admin"}
                        </button>
                      </div>
                    </form>
                  ) : (
                    // Admin Info
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-[#381207] font-['Poppins'] mb-1">
                          {admin.email}
                        </h3>
                        <p className="text-sm text-[#4b4741] font-['Poppins']">
                          Created:{" "}
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-3 ml-6">
                        <button
                          onClick={() => handleEditAdmin(admin)}
                          className="px-4 py-2 bg-[#dd9219] text-white rounded-lg hover:bg-[#c4a016] focus:outline-none focus:ring-2 focus:ring-[#dd9219] focus:ring-offset-2 font-['Poppins'] transition-colors"
                        >
                          Edit
                        </button>
                        {admins.length > 1 && (
                          <button
                            onClick={() => handleDeleteAdmin(admin._id)}
                            className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-['Poppins'] transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {admins.length === 0 && (
              <div className="text-center py-12">
                <div className="text-[#4b4741] font-['Poppins'] text-lg mb-2">
                  No admin accounts found
                </div>
                <p className="text-[#4b4741] font-['Poppins'] text-sm">
                  Create your first admin account using the "Create Admin" tab.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateCredentail;
