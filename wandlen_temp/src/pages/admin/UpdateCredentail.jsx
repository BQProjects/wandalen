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
      console.error("Fout bij het ophalen van admins:", error);
      showMessage("error", "Kan admin accounts niet laden");
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
      showMessage("error", "Wachtwoorden komen niet overeen");
      setLoading(false);
      return;
    }

    if (newAdmin.password.length < 6) {
      showMessage("error", "Wachtwoord moet minimaal 6 tekens lang zijn");
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

      showMessage("success", "Nieuwe admin account succesvol aangemaakt");
      setNewAdmin({
        email: "",
        password: "",
        confirmPassword: "",
      });
      fetchAdmins(); // Refresh admin list
    } catch (error) {
      console.error("Fout bij het aanmaken van admin:", error);
      showMessage(
        "error",
        error.response?.data?.message || "Kan admin account niet aanmaken"
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
      showMessage("error", "Wachtwoorden komen niet overeen");
      setLoading(false);
      return;
    }

    if (editForm.password && editForm.password.length < 6) {
      showMessage("error", "Wachtwoord moet minimaal 6 tekens lang zijn");
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

      showMessage("success", "Admin account succesvol bijgewerkt");
      setEditingAdmin(null);
      setEditForm({
        email: "",
        password: "",
        confirmPassword: "",
        currentPassword: "",
      });
      fetchAdmins(); // Refresh admin list
    } catch (error) {
      console.error("Fout bij het bijwerken van admin:", error);
      showMessage(
        "error",
        error.response?.data?.message || "Kan admin account niet bijwerken"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete admin
  const handleDeleteAdmin = async (adminId) => {
    if (
      !window.confirm(
        "Weet je zeker dat je dit admin account wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt."
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`${DATABASE_URL}/admin/admins/${adminId}`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });

      showMessage("success", "Admin account succesvol verwijderd");
      fetchAdmins(); // Refresh admin list
    } catch (error) {
      console.error("Fout bij het verwijderen van admin:", error);
      showMessage(
        "error",
        error.response?.data?.message || "Kan admin account niet verwijderen"
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
          Beheer van Admin Accounts
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Maak en beheer administrator accounts voor het platform.
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
            { id: "create", label: "Admin Aanmaken", icon: "+" },
            { id: "manage", label: "Admins Beheren", icon: "" },
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
              Nieuwe Admin Account Aanmaken
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
                    placeholder="admin@voorbeeld.com"
                    required
                  />
                </div>
                <div></div>
                <div>
                  <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                    Wachtwoord *
                  </label>
                  <input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-[#e5e3df] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:border-transparent bg-white font-['Poppins']"
                    placeholder="Voer wachtwoord in"
                    required
                    minLength="6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                    Bevestig Wachtwoord *
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
                    placeholder="Bevestig wachtwoord"
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
                  {loading ? "Aanmaken..." : "Admin Account Aanmaken"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Admins Tab */}
        {activeTab === "manage" && (
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-[#381207] font-['Poppins'] mb-6">
              Admin Accounts Beheren
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
                            E-mailadres
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
                            Huidig Wachtwoord *
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
                            placeholder="Voer huidig wachtwoord in"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                            Nieuw Wachtwoord (optioneel)
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
                            placeholder="Voer nieuw wachtwoord in"
                            minLength="6"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#4b4741] font-['Poppins'] mb-2">
                            Bevestig Nieuw Wachtwoord
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
                            placeholder="Bevestig nieuw wachtwoord"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-6 py-2 text-[#381207] border border-[#e5e3df] rounded-lg hover:bg-[#ede4dc]/[.5] focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:ring-offset-2 font-['Poppins'] transition-colors"
                        >
                          Annuleren
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-['Poppins'] font-medium transition-colors"
                        >
                          {loading ? "Bijwerken..." : "Admin Bijwerken"}
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
                          Aangemaakt:{" "}
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-3 ml-6">
                        <button
                          onClick={() => handleEditAdmin(admin)}
                          className="px-4 py-2 bg-[#dd9219] text-white rounded-lg hover:bg-[#c4a016] focus:outline-none focus:ring-2 focus:ring-[#dd9219] focus:ring-offset-2 font-['Poppins'] transition-colors"
                        >
                          Bewerken
                        </button>
                        {admins.length > 1 && (
                          <button
                            onClick={() => handleDeleteAdmin(admin._id)}
                            className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-['Poppins'] transition-colors"
                          >
                            Verwijderen
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
                  Geen admin accounts gevonden
                </div>
                <p className="text-[#4b4741] font-['Poppins'] text-sm">
                  Maak je eerste admin account aan met behulp van de "Admin
                  Aanmaken" tab.
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
