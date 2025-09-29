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

const ManageVideos = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");

  const getVideos = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/all-videos`);
      setUsers(res.data.videos); // Changed to res.data.videos to get the array
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Function to toggle video approval
  const toggleVideoApproval = async (videoId, currentStatus) => {
    try {
      const res = await axios.put(
        `${DATABASE_URL}/admin/toggle-video-approval/${videoId}`,
        { isApproved: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        // Update the local state
        setUsers((prevVideos) =>
          prevVideos.map((video) =>
            video._id === videoId
              ? { ...video, isApproved: !currentStatus }
              : video
          )
        );
        alert(
          `Video ${!currentStatus ? "approved" : "unapproved"} successfully`
        );
      }
    } catch (error) {
      console.error("Error toggling video approval:", error);
      alert("Error updating video approval status");
    }
  };

  // Function to download video
  const downloadVideo = (videoUrl, videoTitle) => {
    if (videoUrl) {
      const link = document.createElement("a");
      link.href = videoUrl;
      link.download = `${videoTitle || "video"}.mp4`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Video URL not available");
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

  // Sort the videos based on current sort config
  const sortedVideos = React.useMemo(() => {
    let sortableItems = [...users];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle nested object properties
        if (sortConfig.key === "uploadedBy") {
          aValue = a.uploadedBy
            ? `${a.uploadedBy.firstName} ${a.uploadedBy.lastName}`
            : "";
          bValue = b.uploadedBy
            ? `${b.uploadedBy.firstName} ${b.uploadedBy.lastName}`
            : "";
        }

        if (sortConfig.key === "createdAt") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (sortConfig.key === "isApproved") {
          aValue = Boolean(aValue);
          bValue = Boolean(bValue);
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
  }, [users, sortConfig]);

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Volunteer Video Submissions
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl mb-4">
          View, download, and keep track of all videos submitted by your
          volunteers.
        </p>
        <button
          onClick={() => navigate("/admin/all-videos")} // Adjust the path if different
          className="px-4 py-2 bg-[#a6a643] text-white rounded-md hover:bg-[#8b8b3a] transition-colors"
        >
          Go to All Videos
        </button>
        <button
          className="mb-4 px-6 py-2 ml-6 font-[Poppins] bg-[#a6a643] text-white rounded-lg hover:bg-[#8b8b3a] transition font-medium"
          onClick={() => navigate("/admin/create-video")}
        >
          Create Video
        </button>
      </div>

      {/* New Layout Section */}
      <div className="w-full bg-[#ede4dc]/[.30] rounded-[0.625rem] overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center w-full py-4 px-6 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div className="flex items-center gap-2 w-[22%] min-w-[220px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Video Title
            </div>
            <SortIcon
              column="title"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[32%] min-w-[300px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Video Description
            </div>
            <SortIcon
              column="description"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[18%] min-w-[180px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Submitted By
            </div>
            <SortIcon
              column="uploadedBy"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[15%] min-w-[140px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Submitted
            </div>
            <SortIcon
              column="createdAt"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 w-[13%] min-w-[120px]">
            <div className="text-[#2a341f] font-['Poppins'] text-lg font-semibold">
              Actions
            </div>
            <SortIcon
              column="isApproved"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
        </div>

        {/* Data Rows */}
        {sortedVideos.map((video, index) => (
          <div
            key={index}
            className={`flex items-center w-full py-3 px-6 min-h-[60px] border-b border-b-[#d9bbaa] ${
              index % 2 === 0 ? "bg-[#ede4dc]" : "bg-white"
            }`}
          >
            <div className="w-[22%] min-w-[220px] pr-4">
              <div className="text-[#381207] font-['Poppins'] font-medium truncate">
                {video.title}
              </div>
            </div>
            <div className="w-[32%] min-w-[300px] pr-4">
              <div className="text-[#381207] font-['Poppins'] truncate">
                {video.description}
              </div>
            </div>
            <div className="w-[18%] min-w-[180px] pr-4">
              <div className="text-[#381207] font-['Poppins'] truncate">
                {video.uploadedBy
                  ? `${video.uploadedBy.firstName} ${video.uploadedBy.lastName}`
                  : "Unknown"}
              </div>
            </div>
            <div className="w-[15%] min-w-[140px] pr-4">
              <div className="text-[#381207] font-['Poppins'] text-sm">
                {new Date(video.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="w-[13%] min-w-[120px] flex items-center gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={video.isApproved || false}
                  onChange={() =>
                    toggleVideoApproval(video._id, video.isApproved)
                  }
                  className="w-4 h-4 text-[#a6a643] bg-gray-100 border-gray-300 rounded focus:ring-[#a6a643] focus:ring-2"
                />
                <span className="text-[#381207] font-['Poppins'] text-sm">
                  {video.isApproved ? "Yes" : "No"}
                </span>
              </div>
              <button
                onClick={() => downloadVideo(video.url, video.title)}
                className="px-3 py-2 flex items-center gap-2"
                title="Download video for editing"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 10V2M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                    stroke="currentColor"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.66406 6.66797L7.9974 10.0013L11.3307 6.66797"
                    stroke="currentColor"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageVideos;
