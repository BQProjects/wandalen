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

const ManageSubscription = () => {
  const navigate = useNavigate();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const [subscriptions, setSubscriptions] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "startDate",
    direction: "desc",
  });

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/all-clients`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });
      // Assuming res.data is an array of client objects
      const mappedSubscriptions = res.data.map((client) => {
        const now = new Date();
        const endDate = client.endDate ? new Date(client.endDate) : null;
        const trialEndDate = client.trialEndDate
          ? new Date(client.trialEndDate)
          : null;

        // Determine status based on subscriptionStatus field and dates
        let status = "Inactive";
        let paymentStatus = "Pending";

        if (client.subscriptionStatus === "cancelled") {
          status = "Cancelled";
          paymentStatus =
            client.paymentStatus === "completed" || client.paymentVerified
              ? "Paid"
              : "Pending";
        } else if (client.subscriptionStatus === "trial") {
          // Check if trial is still active
          if (trialEndDate && now <= trialEndDate) {
            status = "Trial";
            paymentStatus = "Pending"; // During trial, payment is pending
          } else if (endDate && now <= endDate) {
            status = "Active";
            paymentStatus = "Paid"; // Trial ended, subscription continued = Paid
          } else {
            status = "Expired";
            paymentStatus =
              client.paymentStatus === "completed" || client.paymentVerified
                ? "Paid"
                : "Pending";
          }
        } else if (client.subscriptionStatus === "active") {
          if (endDate && now <= endDate) {
            status = "Active";
            paymentStatus = "Paid"; // Active subscription = Paid
          } else {
            status = "Expired";
            paymentStatus =
              client.paymentStatus === "completed" || client.paymentVerified
                ? "Paid"
                : "Pending";
          }
        } else if (client.subscriptionStatus === "expired") {
          status = "Expired";
          paymentStatus =
            client.paymentStatus === "completed" || client.paymentVerified
              ? "Paid"
              : "Pending";
        }

        return {
          clientId: client._id,
          email: client.email,
          firstName: client.firstName || "N/A",
          lastName: client.lastName || "N/A",
          planType: client.plan?.title || client.subscriptionType || "N/A",
          planPrice: client.plan?.price || "€ 12,00",
          planPeriod: client.plan?.period || "month",
          status,
          startDate: client.startDate
            ? new Date(client.startDate).toLocaleDateString()
            : "N/A",
          endDate: client.endDate
            ? new Date(client.endDate).toLocaleDateString()
            : "N/A",
          paymentStatus,
          stripeCustomerId: client.stripeCustomerId,
          stripeSubscriptionId: client.stripeSubscriptionId,
          company: client.company,
          phoneNo: client.phoneNo,
          country: client.country,
        };
      });
      setSubscriptions(mappedSubscriptions);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Failed to fetch subscriptions");
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

  // Sort the subscriptions based on current sort config
  const sortedSubscriptions = React.useMemo(() => {
    let sortableItems = [...subscriptions];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle date sorting
        if (sortConfig.key === "startDate" || sortConfig.key === "endDate") {
          aValue = aValue !== "N/A" ? new Date(aValue) : new Date(0);
          bValue = bValue !== "N/A" ? new Date(bValue) : new Date(0);
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
  }, [subscriptions, sortConfig]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleRowClick = (sub) => {
    // Navigate to SubscriptionOverview with optional state
    navigate("/admin/subscription-overview", { state: { subscription: sub } });
  };

  const handleDeleteClient = async (clientId, stripeSubscriptionId) => {
    if (!stripeSubscriptionId) {
      // No subscription, can delete directly
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this client?"
      );
      if (!confirmDelete) return;
    } else {
      // Has subscription, check if cancelled
      const confirmDelete = window.confirm(
        "This client has a Stripe subscription. Make sure the subscription is cancelled in Stripe before deleting. Proceed with deletion?"
      );
      if (!confirmDelete) return;
    }

    try {
      const res = await axios.delete(
        `${DATABASE_URL}/admin/delete-client/${clientId}`,
        {
          headers: { Authorization: `Bearer ${sessionId}` },
        }
      );
      toast.success(res.data.message);
      // Refresh the subscriptions list
      fetchSubscriptions();
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error(error.response?.data?.message || "Failed to delete client");
    }
  };

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Manage Subscription Plans
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Track and manage all member subscriptions in one place.
        </p>
      </div>

      {/* New Layout Section */}
      <div className="w-full bg-[#ede4dc]/[.30] rounded-[0.625rem] overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center w-full py-4 px-6 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div className="flex items-center gap-2 w-[14%] min-w-[100px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              First Name
            </div>
            <SortIcon
              column="firstName"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[14%] min-w-[100px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Last Name
            </div>
            <SortIcon
              column="lastName"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[16%] min-w-[120px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Plan Type
            </div>
            <SortIcon
              column="planType"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[12%] min-w-[80px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Status
            </div>
            <SortIcon
              column="status"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[14%] min-w-[100px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Start Date
            </div>
            <SortIcon
              column="startDate"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[14%] min-w-[100px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              End Date
            </div>
            <SortIcon
              column="endDate"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[13%] min-w-[110px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Payment
            </div>
            <SortIcon
              column="paymentStatus"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[3%] min-w-[40px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Action
            </div>
          </div>
        </div>

        {/* Data Rows */}
        {sortedSubscriptions.map((sub, index) => (
          <div
            key={index}
            className={`flex items-center w-full py-3 px-6 min-h-[60px] border-b border-b-[#d9bbaa] cursor-pointer ${
              index % 2 === 0 ? "bg-[#ede4dc]" : "bg-white"
            }`}
            onClick={() => handleRowClick(sub)}
          >
            <div className="w-[14%] min-w-[100px] pr-4">
              <div className="text-[#381207] font-['Poppins'] font-medium truncate">
                {sub.firstName}
              </div>
            </div>
            <div className="w-[14%] min-w-[100px] pr-4">
              <div className="text-[#381207] font-['Poppins'] font-medium truncate">
                {sub.lastName}
              </div>
            </div>
            <div className="w-[16%] min-w-[120px] pr-4">
              <div className="text-[#381207] font-['Poppins'] truncate">
                {sub.planType}
              </div>
            </div>
            <div className="w-[12%] min-w-[80px] pr-4">
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
                    fill={
                      sub.status === "Active"
                        ? "#12B76A"
                        : sub.status === "Trial"
                        ? "#FFBE41"
                        : sub.status === "Cancelled"
                        ? "#FF8C42"
                        : sub.status === "Expired"
                        ? "#FF674F"
                        : "#9CA3AF"
                    }
                  />
                </svg>
                <div className="text-[#381207] font-['Poppins'] text-sm truncate">
                  {sub.status}
                </div>
              </div>
            </div>
            <div className="w-[14%] min-w-[100px] pr-4">
              <div className="text-[#381207] font-['Poppins'] text-sm truncate">
                {sub.startDate}
              </div>
            </div>
            <div className="w-[14%] min-w-[100px] pr-4">
              <div className="text-[#381207] font-['Poppins'] text-sm truncate">
                {sub.endDate}
              </div>
            </div>
            <div className="w-[13%] min-w-[110px] pr-4">
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
                    fill={sub.paymentStatus === "Paid" ? "#12B76A" : "#FFBE41"}
                  />
                </svg>
                <div className="text-[#381207] font-['Poppins'] text-sm truncate">
                  {sub.paymentStatus}
                </div>
              </div>
            </div>
            <div className="w-[3%] min-w-[40px] flex justify-center">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClient(sub.clientId, sub.stripeSubscriptionId);
                }}
              >
                <path
                  d="M4.0026 12.6667C4.0026 13.0203 4.14308 13.3594 4.39313 13.6095C4.64318 13.8595 4.98232 14 5.33594 14H10.6693C11.0229 14 11.362 13.8595 11.6121 13.6095C11.8621 13.3594 12.0026 13.0203 12.0026 12.6667V4.66667H4.0026V12.6667ZM5.33594 6H10.6693V12.6667H5.33594V6ZM10.3359 2.66667L9.66927 2H6.33594L5.66927 2.66667H3.33594V4H12.6693V2.66667H10.3359Z"
                  fill="#7A756E"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSubscription;
