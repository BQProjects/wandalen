import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { useContext } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userType, isAuthenticated, logout } = useContext(AuthContext);
  const { DATABASE_URL } = useContext(DatabaseContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const downloadAllData = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      // Show loading state
      const originalText = document.getElementById("downloadBtn").innerText;
      document.getElementById("downloadBtn").innerText = "Downloading...";
      document.getElementById("downloadBtn").disabled = true;

      // Fetch all data
      const [
        clientsRes,
        volunteersRes,
        orgsRes,
        videosRes,
        requestsRes,
        subscriptionsRes,
      ] = await Promise.all([
        axios.get(`${DATABASE_URL}/admin/all-clients`, {
          headers: { Authorization: `Bearer ${sessionId}` },
        }),
        axios.get(`${DATABASE_URL}/admin/all-volunteers`, {
          headers: { Authorization: `Bearer ${sessionId}` },
        }),
        axios.get(`${DATABASE_URL}/admin/all-orgs`, {
          headers: { Authorization: `Bearer ${sessionId}` },
        }),
        axios.get(`${DATABASE_URL}/admin/all-videos`, {
          headers: { Authorization: `Bearer ${sessionId}` },
        }),
        axios
          .get(`${DATABASE_URL}/volunteer/getAllRequests`, {
            headers: { Authorization: `Bearer ${sessionId}` },
          })
          .catch(() => ({ data: [] })), // Handle if this endpoint fails
        axios
          .get(`${DATABASE_URL}/utils/subscriptions`, {
            headers: { Authorization: `Bearer ${sessionId}` },
          })
          .catch(() => ({ data: { subscriptions: [] } })), // Handle if this endpoint fails
      ]);

      // Prepare data for Excel sheets
      const clientsData = (clientsRes.data || []).map((client, index) => ({
        "S.No": index + 1,
        "First Name": client.firstName || "N/A",
        "Last Name": client.lastName || "N/A",
        Email: client.email || "N/A",
        Phone: client.phoneNumber || "N/A",
        Organization: client.orgId?.name || "N/A",
        "Plan Type": client.plan?.title || client.subscriptionType || "N/A",
        "Start Date": client.startDate
          ? new Date(client.startDate).toLocaleDateString()
          : "N/A",
        "End Date": client.endDate
          ? new Date(client.endDate).toLocaleDateString()
          : "N/A",
        Status:
          client.endDate && new Date(client.endDate) > new Date()
            ? "Active"
            : "Inactive",
        "Created At": client.createdAt
          ? new Date(client.createdAt).toLocaleDateString()
          : "N/A",
      }));

      const volunteersData = (volunteersRes.data || []).map(
        (volunteer, index) => ({
          "S.No": index + 1,
          "First Name": volunteer.firstName || "N/A",
          "Last Name": volunteer.lastName || "N/A",
          Email: volunteer.email || "N/A",
          Phone: volunteer.phoneNumber || "N/A",
          Address: volunteer.address || "N/A",
          "Postal Code": volunteer.postal || "N/A",
          "Created At": volunteer.createdAt
            ? new Date(volunteer.createdAt).toLocaleDateString()
            : "N/A",
        })
      );

      const orgsData = (orgsRes.data || []).map((org, index) => ({
        "S.No": index + 1,
        "Organization Name": org.name || "N/A",
        "Contact Person": org.contactPersonName || "N/A",
        "Contact Email": org.contactPersonEmail || "N/A",
        "Contact Phone": org.contactPersonPhone || "N/A",
        Address: org.address || "N/A",
        Website: org.website || "N/A",
        "Created At": org.createdAt
          ? new Date(org.createdAt).toLocaleDateString()
          : "N/A",
      }));

      const videosData = (videosRes.data?.videos || videosRes.data || []).map(
        (video, index) => ({
          "S.No": index + 1,
          Title: video.title || "N/A",
          Description: video.description || "N/A",
          Location: video.location || "N/A",
          Duration: video.duration ? `${video.duration} min` : "N/A",
          Season: video.season || "N/A",
          "Nature Type": video.nature || "N/A",
          Animals: video.animals || "N/A",
          Sound: video.sound || "N/A",
          Tags: Array.isArray(video.tags)
            ? video.tags.join(", ")
            : video.tags || "N/A",
          Views: video.views || 0,
          Likes: video.likes || 0,
          "Uploaded By": video.uploadedBy
            ? `${video.uploadedBy.firstName || ""} ${
                video.uploadedBy.lastName || ""
              }`.trim()
            : "N/A",
          "Video URL": video.url || "N/A",
          "Thumbnail URL": video.imgUrl || "N/A",
          "Created At": video.createdAt
            ? new Date(video.createdAt).toLocaleDateString()
            : "N/A",
        })
      );

      const requestsData = (requestsRes.data || []).map((request, index) => ({
        "S.No": index + 1,
        Email: request.email || "N/A",
        "Location Details": request.location || "N/A",
        "Google Maps Link": request.link || "N/A",
        Status: request.currentStatus || "Pending",
        "Completed By": request.completedBy
          ? `${request.completedBy.firstName || ""} ${
              request.completedBy.lastName || ""
            }`.trim()
          : "N/A",
        "Created At": request.createdAt
          ? new Date(request.createdAt).toLocaleDateString()
          : "N/A",
      }));

      const subscriptionsData = (
        subscriptionsRes.data?.subscriptions || []
      ).map((subscription, index) => ({
        "S.No": index + 1,
        "First Name": subscription.firstName || "N/A",
        "Last Name": subscription.lastName || "N/A",
        Email: subscription.email || "N/A",
        Notes: subscription.notes || "N/A",
        Status: subscription.isActive ? "Active" : "Inactive",
        "Subscribed At": subscription.subscribedAt
          ? new Date(subscription.subscribedAt).toLocaleDateString()
          : "N/A",
        "Created At": subscription.createdAt
          ? new Date(subscription.createdAt).toLocaleDateString()
          : "N/A",
      }));

      // Create workbook
      const wb = XLSX.utils.book_new();

      // Add sheets
      const clientsWs = XLSX.utils.json_to_sheet(clientsData);
      const volunteersWs = XLSX.utils.json_to_sheet(volunteersData);
      const orgsWs = XLSX.utils.json_to_sheet(orgsData);
      const videosWs = XLSX.utils.json_to_sheet(videosData);
      const requestsWs = XLSX.utils.json_to_sheet(requestsData);
      const subscriptionsWs = XLSX.utils.json_to_sheet(subscriptionsData);

      XLSX.utils.book_append_sheet(wb, clientsWs, "Clients");
      XLSX.utils.book_append_sheet(wb, volunteersWs, "Volunteers");
      XLSX.utils.book_append_sheet(wb, orgsWs, "Organizations");
      XLSX.utils.book_append_sheet(wb, videosWs, "Videos");
      XLSX.utils.book_append_sheet(wb, requestsWs, "Video Requests");
      XLSX.utils.book_append_sheet(
        wb,
        subscriptionsWs,
        "Newsletter Subscriptions"
      );

      // Generate filename with current date
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];
      const filename = `Virtual_Wandelen_${dateStr}.xlsx`;

      // Download file
      XLSX.writeFile(wb, filename);

      // Reset button state
      document.getElementById("downloadBtn").innerText = originalText;
      document.getElementById("downloadBtn").disabled = false;

      alert("Data downloaded successfully!");
    } catch (error) {
      console.error("Error downloading data:", error);
      alert("Error downloading data. Please try again.");

      // Reset button state on error
      document.getElementById("downloadBtn").innerText = "Download All Data";
      document.getElementById("downloadBtn").disabled = false;
    }
  };

  const menuItems = [
    {
      label: "Overview",
      path: "/admin",
      icon: (
        <svg
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.75 6.5V3.5C9.75 3.2875 9.822 3.1095 9.966 2.966C10.11 2.8225 10.288 2.7505 10.5 2.75H15C15.2125 2.75 15.3907 2.822 15.5347 2.966C15.6787 3.11 15.7505 3.288 15.75 3.5V6.5C15.75 6.7125 15.678 6.89075 15.534 7.03475C15.39 7.17875 15.212 7.2505 15 7.25H10.5C10.2875 7.25 10.1095 7.178 9.966 7.034C9.8225 6.89 9.7505 6.712 9.75 6.5ZM2.25 9.5V3.5C2.25 3.2875 2.322 3.1095 2.466 2.966C2.61 2.8225 2.788 2.7505 3 2.75H7.5C7.7125 2.75 7.89075 2.822 8.03475 2.966C8.17875 3.11 8.2505 3.288 8.25 3.5V9.5C8.25 9.7125 8.178 9.89075 8.034 10.0347C7.89 10.1788 7.712 10.2505 7.5 10.25H3C2.7875 10.25 2.6095 10.178 2.466 10.034C2.3225 9.89 2.2505 9.712 2.25 9.5ZM9.75 15.5V9.5C9.75 9.2875 9.822 9.1095 9.966 8.966C10.11 8.8225 10.288 8.7505 10.5 8.75H15C15.2125 8.75 15.3907 8.822 15.5347 8.966C15.6787 9.11 15.7505 9.288 15.75 9.5V15.5C15.75 15.7125 15.678 15.8907 15.534 16.0347C15.39 16.1787 15.212 16.2505 15 16.25H10.5C10.2875 16.25 10.1095 16.178 9.966 16.034C9.8225 15.89 9.7505 15.712 9.75 15.5ZM2.25 15.5V12.5C2.25 12.2875 2.322 12.1095 2.466 11.966C2.61 11.8225 2.788 11.7505 3 11.75H7.5C7.7125 11.75 7.89075 11.822 8.03475 11.966C8.17875 12.11 8.2505 12.288 8.25 12.5V15.5C8.25 15.7125 8.178 15.8907 8.034 16.0347C7.89 16.1787 7.712 16.2505 7.5 16.25H3C2.7875 16.25 2.6095 16.178 2.466 16.034C2.3225 15.89 2.2505 15.712 2.25 15.5ZM3.75 8.75H6.75V4.25H3.75V8.75ZM11.25 14.75H14.25V10.25H11.25V14.75ZM11.25 5.75H14.25V4.25H11.25V5.75ZM3.75 14.75H6.75V13.25H3.75V14.75Z"
            fill="#381207"
          />
        </svg>
      ),
    },
    {
      label: "Manage Quotes",
      path: "/admin/manage",
      icon: (
        <svg
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 5.003H1.5V3.5H3.003V5.003H2.25ZM2.25 10.253H1.5V8.75H3.003V10.253H2.25ZM1.5 15.503H3.003V14H1.5V15.503ZM6 3.5H5.25V5H16.5V3.5H6ZM5.25 8.75H16.5V10.25H5.25V8.75ZM6 14H5.25V15.5H16.5V14H6Z"
            fill="#7A756E"
          />
        </svg>
      ),
    },
    {
      label: "Manage Volunteers",
      path: "/admin/manage-volunteer",
      icon: (
        <svg
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 15.125C12.1066 15.125 14.625 12.6066 14.625 9.5C14.625 6.3934 12.1066 3.875 9 3.875C5.8934 3.875 3.375 6.3934 3.375 9.5C3.375 12.6066 5.8934 15.125 9 15.125Z"
            fill="#DD9219"
          />
          <path
            d="M9 17.375C7.44248 17.375 5.91992 16.9131 4.62489 16.0478C3.32985 15.1825 2.32049 13.9526 1.72445 12.5136C1.12841 11.0747 0.972461 9.49127 1.27632 7.96367C1.58018 6.43607 2.3302 5.03288 3.43154 3.93154C4.53288 2.8302 5.93607 2.08018 7.46367 1.77632C8.99127 1.47246 10.5747 1.62841 12.0136 2.22445C13.4526 2.82049 14.6825 3.82985 15.5478 5.12489C16.4131 6.41992 16.875 7.94248 16.875 9.5C16.8726 11.5879 16.0422 13.5895 14.5658 15.0658C13.0895 16.5422 11.0879 17.3726 9 17.375ZM9 2.75C7.66498 2.75 6.35994 3.14588 5.2499 3.88758C4.13987 4.62928 3.27471 5.68349 2.76382 6.91689C2.25293 8.15029 2.11925 9.50749 2.3797 10.8169C2.64015 12.1262 3.28303 13.329 4.22703 14.273C5.17104 15.217 6.37377 15.8599 7.68314 16.1203C8.99252 16.3808 10.3497 16.2471 11.5831 15.7362C12.8165 15.2253 13.8707 14.3601 14.6124 13.2501C15.3541 12.1401 15.75 10.835 15.75 9.5C15.7479 7.71043 15.0361 5.99475 13.7707 4.72933C12.5053 3.46392 10.7896 2.75209 9 2.75Z"
            fill="#DD9219"
          />
        </svg>
      ),
    },
    {
      label: "Location Requests",
      path: "/admin/location-request",
      icon: (
        <svg
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 5.003H1.5V3.5H3.003V5.003H2.25ZM2.25 10.253H1.5V8.75H3.003V10.253H2.25ZM1.5 15.503H3.003V14H1.5V15.503ZM6 3.5H5.25V5H16.5V3.5H6ZM5.25 8.75H16.5V10.25H5.25V8.75ZM6 14H5.25V15.5H16.5V14H6Z"
            fill="#7A756E"
          />
        </svg>
      ),
    },
    {
      label: "Manage Videos",
      path: "/admin/manage-videos",
      icon: (
        <svg
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 5.003H1.5V3.5H3.003V5.003H2.25ZM2.25 10.253H1.5V8.75H3.003V10.253H2.25ZM1.5 15.503H3.003V14H1.5V15.503ZM6 3.5H5.25V5H16.5V3.5H6ZM5.25 8.75H16.5V10.25H5.25V8.75ZM6 14H5.25V15.5H16.5V14H6Z"
            fill="#7A756E"
          />
        </svg>
      ),
    },
    {
      label: "Manage Subscriptions",
      path: "/admin/manage-subscription",
      icon: (
        <svg
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 5.003H1.5V3.5H3.003V5.003H2.25ZM2.25 10.253H1.5V8.75H3.003V10.253H2.25ZM1.5 15.503H3.003V14H1.5V15.503ZM6 3.5H5.25V5H16.5V3.5H6ZM5.25 8.75H16.5V10.25H5.25V8.75ZM6 14H5.25V15.5H16.5V14H6Z"
            fill="#7A756E"
          />
        </svg>
      ),
    },
    {
      label: "Newsletter Subscribers",
      path: "/admin/manage-subscribers",
      icon: (
        <svg
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 2.5H3C2.175 2.5 1.5 3.175 1.5 4V15C1.5 15.825 2.175 16.5 3 16.5H15C15.825 16.5 16.5 15.825 16.5 15V4C16.5 3.175 15.825 2.5 15 2.5ZM15 6.25L9 10.75L3 6.25V4L9 8.5L15 4V6.25Z"
            fill="#7A756E"
          />
        </svg>
      ),
    },
    {
      label: "Blog",
      path: "/admin/all-blog",
      icon: (
        <svg
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 5.003H1.5V3.5H3.003V5.003H2.25ZM2.25 10.253H1.5V8.75H3.003V10.253H2.25ZM1.5 15.503H3.003V14H1.5V15.503ZM6 3.5H5.25V5H16.5V3.5H6ZM5.25 8.75H16.5V10.25H5.25V8.75ZM6 14H5.25V15.5H16.5V14H6Z"
            fill="#7A756E"
          />
        </svg>
      ),
    },
    {
      label: "Training Details",
      path: "/admin/training-details",
      icon: (
        <svg
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 5.003H1.5V3.5H3.003V5.003H2.25ZM2.25 10.253H1.5V8.75H3.003V10.253H2.25ZM1.5 15.503H3.003V14H1.5V15.503ZM6 3.5H5.25V5H16.5V3.5H6ZM5.25 8.75H16.5V10.25H5.25V8.75ZM6 14H5.25V15.5H16.5V14H6Z"
            fill="#7A756E"
          />
        </svg>
      ),
    },
    {
      label: "Update Credentials",
      path: "/admin/update-credentials",
      icon: (
        <svg
          width={18}
          height={19}
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 2.75C6.516 2.75 4.5 4.766 4.5 7.25C4.5 8.488 5.017 9.609 5.85 10.442L9 13.592L12.15 10.442C12.983 9.609 13.5 8.488 13.5 7.25C13.5 4.766 11.484 2.75 9 2.75ZM9 9.5C8.337 9.5 7.701 9.237 7.232 8.768C6.763 8.299 6.5 7.663 6.5 7C6.5 6.337 6.763 5.701 7.232 5.232C7.701 4.763 8.337 4.5 9 4.5C9.663 4.5 10.299 4.763 10.768 5.232C11.237 5.701 11.5 6.337 11.5 7C11.5 7.663 11.237 8.299 10.768 8.768C10.299 9.237 9.663 9.5 9 9.5Z"
            fill="#7A756E"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="inline-flex flex-col flex-shrink-0 items-start gap-2 py-0 px-4 min-h-screen bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] font-base">
      <div className="flex items-center gap-2 py-4 px-2 w-full">
        <div className="flex flex-col flex-shrink-0 justify-center items-center pb-[0.002px] w-[0.8125rem] h-[1.125rem] aspect-[13/18]">
          <svg
            width={13}
            height={18}
            viewBox="0 0 13 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.85328 17.9984C4.58576 17.595 6.37146 17.4157 8.07132 16.8898C10.2897 16.2037 12.5596 14.7538 12.9082 12.2885C13.243 9.91458 12.5682 7.54581 12.5991 5.17188L11.5603 5.62873C8.77186 7.15619 9.03628 8.24231 9.03628 8.24231C9.07921 8.67503 9.43292 9.1043 9.79864 9.55081C10.0871 9.90423 10.6177 10.187 10.0974 10.6076C9.94802 10.7283 9.71451 10.7766 9.6132 10.861C9.40201 11.0386 9.64582 11.2955 9.69218 11.4438C9.77804 11.7248 9.68188 11.8989 9.44322 12.0334C9.5926 12.1713 9.67158 12.2161 9.63724 12.442C9.61664 12.585 9.44837 12.6281 9.37282 12.754C9.21142 13.0229 9.34878 13.1798 9.37625 13.4384C9.53594 14.9866 7.46349 14.1677 6.63073 14.2556L5.7602 14.1901C4.93775 14.1849 3.94531 14.359 3.65513 15.2245L2.85156 17.9967L2.85328 17.9984Z"
              fill="#381207"
            />
            <path
              d="M5.01312 11.0267C5.58146 9.76297 6.21847 8.49411 6.37129 7.11664C6.51552 5.81675 6.21675 4.50824 5.82184 3.26179C5.4853 2.19981 5.06978 1.09818 5.26896 0C4.41044 1.0706 3.36134 1.9688 2.41183 2.95837C1.46231 3.94794 0.591784 5.07199 0.217473 6.39429C-0.335409 8.3424 0.256964 10.4215 0.976397 12.3145C1.65977 14.1109 2.53202 15.9642 2.55778 17.9244C3.26691 15.5763 4.00179 13.2678 5.0114 11.0267H5.01312Z"
              fill="#381207"
            />
          </svg>
        </div>
        <div className="flex flex-col flex-shrink-0 justify-center w-[3.625rem] h-4 text-muted-foreground text-center font-base text-lg leading-[normal]">
          ADMIN
        </div>
      </div>
      {menuItems.map((item) => (
        <div
          key={item.path}
          className={`flex items-center gap-2 p-2 w-full rounded cursor-pointer ${
            location.pathname === item.path ? "bg-border" : ""
          }`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <div className="flex-shrink-0 w-full text-brown font-base text-lg leading-[normal]">
            {item.label}
          </div>
        </div>
      ))}

      {/* Download All Data Button */}
      <button
        id="downloadBtn"
        onClick={downloadAllData}
        className="flex items-center justify-center gap-2 p-3 w-full rounded-lg bg-[#a6a643] text-white font-['Poppins'] text-sm font-medium hover:bg-[#8b8b3a] transition-colors mb-4"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.66667 6.66667L8 10L11.3333 6.66667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10V2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Download All Data
      </button>

      {/* Logout Button */}
      <button
        onClick={() => {
          handleLogout();
        }}
        className="py-2 px-4 w-full mt-auto mb-10 rounded-lg bg-[#381207] text-white font-['Poppins'] text-lg font-medium hover:bg-[#4a3a2a] transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
