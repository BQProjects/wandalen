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
        let status = "Inactief";
        let paymentStatus = "In afwachting";

        if (client.subscriptionStatus === "cancelled") {
          status = "Geannuleerd";
          paymentStatus =
            client.paymentStatus === "completed" || client.paymentVerified
              ? "Betaald"
              : "In afwachting";
        } else if (client.subscriptionStatus === "trial") {
          // Check if trial is still active
          if (trialEndDate && now <= trialEndDate) {
            status = "Proefperiode";
            paymentStatus = "In afwachting"; // During trial, payment is pending
          } else if (endDate && now <= endDate) {
            status = "Actief";
            paymentStatus = "Betaald"; // Trial ended, subscription continued = Paid
          } else {
            status = "Verlopen";
            paymentStatus =
              client.paymentStatus === "completed" || client.paymentVerified
                ? "Betaald"
                : "In afwachting";
          }
        } else if (client.subscriptionStatus === "active") {
          if (endDate && now <= endDate) {
            status = "Actief";
            paymentStatus = "Betaald"; // Active subscription = Paid
          } else {
            status = "Verlopen";
            paymentStatus =
              client.paymentStatus === "completed" || client.paymentVerified
                ? "Betaald"
                : "In afwachting";
          }
        } else if (client.subscriptionStatus === "expired") {
          status = "Verlopen";
          paymentStatus =
            client.paymentStatus === "completed" || client.paymentVerified
              ? "Betaald"
              : "In afwachting";
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
          videosWatched: client.dailyWatchCount || 0,
          lastWatchDate: client.lastWatchDate,
        };
      });
      setSubscriptions(mappedSubscriptions);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Kan abonnementen niet ophalen");
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

        // Handle numeric sorting for videos watched
        if (sortConfig.key === "videosWatched") {
          aValue = Number(aValue) || 0;
          bValue = Number(bValue) || 0;
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
        "Weet je zeker dat je deze klant wilt verwijderen?"
      );
      if (!confirmDelete) return;
    } else {
      // Has subscription, check if cancelled
      const confirmDelete = window.confirm(
        "Deze klant heeft een Stripe abonnement. Zorg ervoor dat het abonnement is geannuleerd in Stripe voordat je verwijdert. Doorgaan met verwijderen?"
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
      toast.error(
        error.response?.data?.message || "Kan klant niet verwijderen"
      );
    }
  };

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Abonnementen Beheren
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Volg en beheer alle lid abonnementen op één plek.
        </p>
      </div>

      {/* New Layout Section */}
      <div className="w-full bg-[#ede4dc]/[.30] rounded-[0.625rem] overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center w-full py-4 px-6 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div className="flex items-center gap-2 w-[12%] min-w-[90px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Voornaam
            </div>
            <SortIcon
              column="firstName"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[12%] min-w-[90px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Achternaam
            </div>
            <SortIcon
              column="lastName"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[14%] min-w-[110px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Plan Type
            </div>
            <SortIcon
              column="planType"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[10%] min-w-[70px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Status
            </div>
            <SortIcon
              column="status"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[12%] min-w-[90px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Startdatum
            </div>
            <SortIcon
              column="startDate"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[12%] min-w-[90px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Einddatum
            </div>
            <SortIcon
              column="endDate"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[11%] min-w-[80px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              V.Bekeken
            </div>
            <SortIcon
              column="videosWatched"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[11%] min-w-[90px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Betaling
            </div>
            <SortIcon
              column="paymentStatus"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[6%] min-w-[50px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Actie
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
            <div className="w-[12%] min-w-[90px] pr-4">
              <div className="text-[#381207] font-['Poppins'] font-medium truncate">
                {sub.firstName}
              </div>
            </div>
            <div className="w-[12%] min-w-[90px] pr-4">
              <div className="text-[#381207] font-['Poppins'] font-medium truncate">
                {sub.lastName}
              </div>
            </div>
            <div className="w-[14%] min-w-[110px] pr-4">
              <div className="text-[#381207] font-['Poppins'] truncate">
                {sub.planType}
              </div>
            </div>
            <div className="w-[10%] min-w-[70px] pr-4">
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
                      sub.status === "Actief"
                        ? "#12B76A"
                        : sub.status === "Proefperiode"
                        ? "#FFBE41"
                        : sub.status === "Geannuleerd"
                        ? "#FF8C42"
                        : sub.status === "Verlopen"
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
            <div className="w-[12%] min-w-[90px] pr-4">
              <div className="text-[#381207] font-['Poppins'] text-sm truncate">
                {sub.startDate}
              </div>
            </div>
            <div className="w-[12%] min-w-[90px] pr-4">
              <div className="text-[#381207] font-['Poppins'] text-sm truncate">
                {sub.endDate}
              </div>
            </div>
            <div className="w-[11%] min-w-[80px] pr-4">
              <div className="text-[#381207] font-['Poppins'] text-center font-medium">
                {sub.videosWatched}
              </div>
            </div>
            <div className="w-[11%] min-w-[90px] pr-4">
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
                      sub.paymentStatus === "Betaald" ? "#12B76A" : "#FFBE41"
                    }
                  />
                </svg>
                <div className="text-[#381207] font-['Poppins'] text-sm truncate">
                  {sub.paymentStatus}
                </div>
              </div>
            </div>
            <div className="w-[6%] min-w-[50px] flex justify-center">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSubscription;
