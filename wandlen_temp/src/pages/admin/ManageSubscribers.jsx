import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

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
          <h2 className="text-2xl font-bold text-[#381207]">
            Subscriber Details
          </h2>
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
              First Name
            </label>
            <p className="mt-1 text-[#381207] font-medium">
              {subscriber.firstName || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
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
                {subscriber.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subscribed Date
            </label>
            <p className="mt-1 text-[#381207] font-medium">
              {subscriber.subscribedAt
                ? new Date(subscriber.subscribedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <p className="mt-1 text-[#381207] font-medium">
              {subscriber.notes || "No notes available"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
          {subscriber.isActive ? (
            <button
              onClick={() => {
                onUnsubscribe(subscriber.email);
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Unsubscribe
            </button>
          ) : (
            <button
              onClick={() => {
                onReactivate(subscriber.email);
                onClose();
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Reactivate
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
    if (window.confirm("Are you sure you want to unsubscribe this user?")) {
      try {
        const res = await axios.post(`${DATABASE_URL}/utils/unsubscribe`, {
          email,
        });
        alert("User unsubscribed successfully");
        fetchSubscriptions(); // Refresh the list
      } catch (error) {
        console.error("Error unsubscribing user:", error);
        alert("Error unsubscribing user. Please try again.");
      }
    }
  };

  const handleReactivate = async (email) => {
    if (
      window.confirm("Are you sure you want to reactivate this subscription?")
    ) {
      try {
        // We need to create a reactivate endpoint or update the existing unsubscribe endpoint
        // For now, let's create a simple update
        const subscription = subscriptions.find((sub) => sub.email === email);
        if (subscription) {
          // You might want to create a specific reactivate endpoint in the backend
          alert("Reactivation feature needs to be implemented in backend");
          // fetchSubscriptions(); // Refresh the list
        }
      } catch (error) {
        console.error("Error reactivating subscription:", error);
        alert("Error reactivating subscription. Please try again.");
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
          <div className="text-xl text-[#381207]">Loading subscribers...</div>
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
          Newsletter Subscribers
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Manage and view all newsletter subscribers in one place. Click on any
          row to view detailed information.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, or notes..."
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
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="text-[#381207] font-medium">
          {filteredSubscriptions.length} subscriber
          {filteredSubscriptions.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Simplified Subscriptions Table */}
      <div className="inline-flex flex-col justify-center items-start rounded-[0.625rem] bg-[#ede4dc]/[.30] overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center gap-6 self-stretch py-1 px-5 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div className="flex items-center gap-2 p-2 w-[16rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Full Name
            </div>
            <SortIcon
              column="firstName"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 p-2 w-[20rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Email
            </div>
            <SortIcon
              column="email"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 p-2 w-[12rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Subscribed Date
            </div>
            <SortIcon
              column="subscribedAt"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 p-2 w-[8rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Actions
            </div>
          </div>
        </div>

        {/* Data Rows */}
        {sortedSubscriptions.length > 0 ? (
          sortedSubscriptions.map((subscription, index) => (
            <div
              key={subscription._id || index}
              className={`flex items-center gap-6 self-stretch py-1 px-5 min-h-16 border-b border-b-[#d9bbaa] cursor-pointer hover:bg-[#ede4dc]/50 transition-colors ${
                index % 2 === 0 ? "bg-[#ede4dc]" : ""
              }`}
              onClick={() => handleRowClick(subscription)}
            >
              <div className="flex items-center gap-2 pr-2 w-[16rem]">
                <div className="flex flex-col items-start gap-2 p-2">
                  <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                    {`${subscription.firstName || ""} ${
                      subscription.lastName || ""
                    }`.trim() || "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5 p-2 w-[20rem]">
                <div className="flex flex-col justify-center items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal] break-all">
                  {subscription.email || "N/A"}
                </div>
              </div>
              <div className="flex items-center gap-0.5 p-2 w-[12rem]">
                <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                  {subscription.subscribedAt
                    ? new Date(subscription.subscribedAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 w-[8rem]">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click when clicking action button
                    if (subscription.isActive) {
                      handleUnsubscribe(subscription.email);
                    } else {
                      handleReactivate(subscription.email);
                    }
                  }}
                  className={`px-3 py-1 text-white text-xs rounded transition-colors ${
                    subscription.isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  title={
                    subscription.isActive
                      ? "Unsubscribe user"
                      : "Reactivate subscription"
                  }
                >
                  {subscription.isActive ? "Unsubscribe" : "Reactivate"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center p-8 text-[#381207] font-['Poppins']">
            No subscribers found matching your criteria.
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-[#381207] mb-2">
            Total Subscribers
          </h3>
          <p className="text-3xl font-bold text-[#a6a643]">
            {subscriptions.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-[#381207] mb-2">
            Active Subscribers
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {subscriptions.filter((sub) => sub.isActive).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-[#381207] mb-2">
            Inactive Subscribers
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
