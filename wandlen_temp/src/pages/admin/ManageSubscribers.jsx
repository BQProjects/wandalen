import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";
import toast from "react-hot-toast";

// Sort Icon Component
const SortIcon = ({ column, sortConfig, onSort }) => {
  const isActive = sortConfig.key === column;
  const direction = isActive ? sortConfig.direction : "asc";

  return (
    <svg
      width={11}
      height={12}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer transition-transform hover:scale-110 ${
        isActive ? "text-[#a6a643]" : "text-[#2a341f]"
      }`}
      onClick={() => onSort(column)}
      style={{
        transform:
          isActive && direction === "desc" ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <path
        d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Subscriber Detail Modal Component
const SubscriberModal = ({
  subscriber,
  isOpen,
  onClose,
  onUnsubscribe,
  onReactivate,
}) => {
  if (!isOpen || !subscriber) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#381207]">Abonnee Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Voornaam
            </label>
            <p className="mt-1 text-[#381207] font-medium">
              {subscriber.firstName || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Achternaam
            </label>
            <p className="mt-1 text-[#381207] font-medium">
              {subscriber.lastName || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-[#381207] font-medium break-all">
              {subscriber.email || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="mt-1 flex items-center gap-2">
              <svg
                width={10}
                height={10}
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx={5}
                  cy={5}
                  r={4}
                  fill={subscriber.isActive ? "#12B76A" : "#FF674F"}
                />
              </svg>
              <span className="text-[#381207] font-medium">
                {subscriber.isActive ? "Actief" : "Inactief"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Abonnementsdatum
            </label>
            <p className="mt-1 text-[#381207] font-medium">
              {subscriber.subscribedAt
                ? new Date(subscriber.subscribedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notities
            </label>
            <p className="mt-1 text-[#381207] font-medium">
              {subscriber.notes || "Geen notities beschikbaar"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Sluiten
          </button>
          {subscriber.isActive ? (
            <button
              onClick={() => {
                onUnsubscribe(subscriber.email);
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Uitschrijven
            </button>
          ) : (
            <button
              onClick={() => {
                onReactivate(subscriber.email);
                onClose();
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Heractiveren
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ManageSubscribers = () => {
  const navigate = useNavigate();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, active, inactive
  const [loading, setLoading] = useState(true);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${DATABASE_URL}/utils/subscriptions`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });
      setSubscriptions(res.data.subscriptions || []);
      setFilteredSubscriptions(res.data.subscriptions || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort subscriptions based on current sort config
  const sortedSubscriptions = React.useMemo(() => {
    let sortableItems = [...filteredSubscriptions];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle date sorting
        if (
          sortConfig.key === "subscribedAt" ||
          sortConfig.key === "createdAt"
        ) {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredSubscriptions, sortConfig]);

  // Filter subscriptions based on search term and status
  useEffect(() => {
    let filtered = subscriptions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (sub) =>
          sub.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((sub) => {
        if (statusFilter === "active") return sub.isActive;
        if (statusFilter === "inactive") return !sub.isActive;
        return true;
      });
    }

    setFilteredSubscriptions(filtered);
  }, [subscriptions, searchTerm, statusFilter]);

  const handleRowClick = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setIsModalOpen(true);
  };

  const handleUnsubscribe = async (email) => {
    if (
      window.confirm("Weet je zeker dat je deze gebruiker wilt uitschrijven?")
    ) {
      try {
        const res = await axios.post(`${DATABASE_URL}/utils/unsubscribe`, {
          email,
        });
        toast.success("Gebruiker succesvol uitgeschreven");
        fetchSubscriptions(); // Refresh the list
      } catch (error) {
        console.error("Error unsubscribing user:", error);
        toast.error("Fout bij uitschrijven gebruiker. Probeer het opnieuw.");
      }
    }
  };

  const handleReactivate = async (email) => {
    if (
      window.confirm("Weet je zeker dat je dit abonnement wilt heractiveren?")
    ) {
      try {
        // We need to create a reactivate endpoint or update the existing unsubscribe endpoint
        // For now, let's create a simple update
        const subscription = subscriptions.find((sub) => sub.email === email);
        if (subscription) {
          // You might want to create a specific reactivate endpoint in the backend
          toast.error(
            "Heractiveringsfunctie moet geïmplementeerd worden in backend"
          );
          // fetchSubscriptions(); // Refresh the list
        }
      } catch (error) {
        console.error("Error reactivating subscription:", error);
        toast.error("Fout bij heractiveren abonnement. Probeer het opnieuw.");
      }
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-[#f7f6f4] p-6 overflow-y-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-[#381207]">Abonnees laden...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6 overflow-y-auto">
      {/* Subscriber Detail Modal */}
      <SubscriberModal
        subscriber={selectedSubscriber}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUnsubscribe={handleUnsubscribe}
        onReactivate={handleReactivate}
      />

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Nieuwsbrief Abonnees
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Beheer en bekijk alle nieuwsbrief abonnees op één plek. Klik op een
          rij voor gedetailleerde informatie.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Zoeken op naam, e-mail of notities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label className="text-[#381207] font-medium">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:border-transparent"
          >
            <option value="all">Alle</option>
            <option value="active">Actief</option>
            <option value="inactive">Inactief</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="text-[#381207] font-medium">
          {filteredSubscriptions.length} abonnee
          {filteredSubscriptions.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Simplified Subscriptions Table */}
      <div className="w-full bg-[#ede4dc]/[.30] rounded-[0.625rem] overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center w-full py-4 px-6 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div className="flex items-center gap-2 w-[23%] min-w-[170px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Volledige Naam
            </div>
            <SortIcon
              column="firstName"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[28%] min-w-[200px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Email
            </div>
            <SortIcon
              column="email"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[22%] min-w-[160px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Abonnementsdatum
            </div>
            <SortIcon
              column="subscribedAt"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[12%] min-w-[90px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Status
            </div>
          </div>
          <div className="flex items-center gap-2 w-[15%] min-w-[110px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Acties
            </div>
          </div>
        </div>

        {/* Data Rows */}
        {sortedSubscriptions.length > 0 ? (
          sortedSubscriptions.map((subscription, index) => (
            <div
              key={subscription._id || index}
              className={`flex items-center w-full py-3 px-6 min-h-[60px] border-b border-b-[#d9bbaa] cursor-pointer hover:bg-[#ede4dc]/50 transition-colors ${
                index % 2 === 0 ? "bg-[#ede4dc]" : "bg-white"
              }`}
              onClick={() => handleRowClick(subscription)}
            >
              <div className="w-[23%] min-w-[170px] pr-4">
                <div className="text-[#381207] font-['Poppins'] font-medium truncate">
                  {`${subscription.firstName || ""} ${
                    subscription.lastName || ""
                  }`.trim() || "N/A"}
                </div>
              </div>
              <div className="w-[28%] min-w-[200px] pr-4">
                <div className="text-[#381207] font-['Poppins'] truncate">
                  {subscription.email || "N/A"}
                </div>
              </div>
              <div className="w-[22%] min-w-[160px] pr-4">
                <div className="text-[#381207] font-['Poppins'] text-sm truncate">
                  {subscription.subscribedAt
                    ? new Date(subscription.subscribedAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
              <div className="w-[12%] min-w-[90px] pr-4">
                <div className="flex items-center gap-2">
                  <svg
                    width={10}
                    height={10}
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx={5}
                      cy={5}
                      r={4}
                      fill={subscription.isActive ? "#12B76A" : "#FF674F"}
                    />
                  </svg>
                  <span className="text-[#381207] font-['Poppins'] text-xs">
                    {subscription.isActive ? "Actief" : "Inactief"}
                  </span>
                </div>
              </div>
              <div className="w-[15%] min-w-[110px] flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (subscription.isActive) {
                      handleUnsubscribe(subscription.email);
                    } else {
                      handleReactivate(subscription.email);
                    }
                  }}
                  className={`px-2 py-1 text-white text-xs rounded transition-colors ${
                    subscription.isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  title={
                    subscription.isActive
                      ? "Gebruiker uitschrijven"
                      : "Abonnement heractiveren"
                  }
                >
                  {subscription.isActive ? "Uitschrijven" : "Heractiveren"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center p-8 text-[#381207] font-['Poppins']">
            No abonnees gevonden die aan uw criteria voldoen.
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-[#381207] mb-2">
            Totaal Abonnees
          </h3>
          <p className="text-3xl font-bold text-[#a6a643]">
            {subscriptions.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-[#381207] mb-2">
            Actieve Abonnees
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {subscriptions.filter((sub) => sub.isActive).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-[#381207] mb-2">
            Inactieve Abonnees
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {subscriptions.filter((sub) => !sub.isActive).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscribers;
