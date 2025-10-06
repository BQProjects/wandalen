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
    <div className="p-6">
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
            { id: "create", label: "Create Admin", icon: "➕" },
            { id: "manage", label: "Manage Admins", icon: "⚙️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Create Admin Tab */}
        {activeTab === "create" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Create New Admin Account
            </h2>
            <form onSubmit={handleCreateAdmin} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    minLength="6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Admin Account"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Admins Tab */}
        {activeTab === "manage" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Manage Admin Accounts
            </h2>

            <div className="space-y-4">
              {admins.map((admin) => (
                <div
                  key={admin._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  {editingAdmin === admin._id ? (
                    // Edit Form
                    <form onSubmit={handleUpdateAdmin} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            minLength="6"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? "Updating..." : "Update"}
                        </button>
                      </div>
                    </form>
                  ) : (
                    // Admin Info
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {admin.email}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Created:{" "}
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditAdmin(admin)}
                          className="px-3 py-1 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Edit
                        </button>
                        {admins.length > 1 && (
                          <button
                            onClick={() => handleDeleteAdmin(admin._id)}
                            className="px-3 py-1 text-red-600 border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
              <div className="text-center py-8 text-gray-500">
                No admin accounts found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateCredentail;
