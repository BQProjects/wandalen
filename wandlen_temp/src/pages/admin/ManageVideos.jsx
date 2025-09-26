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

  const getVideos = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/all-videos`);
      setUsers(res.data.videos); // Changed to res.data.videos to get the array
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
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
      <div className="inline-flex flex-col justify-center items-start rounded-[0.625rem] bg-[#ede4dc]/[.30]">
        {/* Header Row */}
        <div className="flex items-center gap-6 self-stretch py-1 px-5 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div className="flex items-center gap-2 p-2 w-[14.875rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Video Title
            </div>
            <SortIcon
              column="title"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 p-2 w-[524px]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Video Description
            </div>
            <SortIcon
              column="description"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 p-2 w-[9.6875rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Submitted By
            </div>
            <SortIcon
              column="uploadedBy"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
          <div className="flex items-center gap-2 p-2 w-[12.375rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Date Submitted
            </div>
            <SortIcon
              column="createdAt"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
        </div>

        {/* Data Rows */}
        {sortedVideos.map((video, index) => (
          <div
            key={index}
            className={`flex items-center gap-6 self-stretch py-1 px-5 border-b border-b-[#d9bbaa] ${
              index % 2 === 0 ? "bg-[#ede4dc]" : ""
            }`}
          >
            <div className="flex items-center gap-2 pr-2 w-[14.875rem]">
              <div className="flex flex-col items-start gap-2 p-2">
                <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                  {video.title}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 p-2 w-[524px]">
              <div className="flex flex-col justify-center items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                {video.description}
              </div>
            </div>
            <div className="flex items-center gap-2 pr-2 w-[9.6875rem]">
              <div className="flex flex-col items-start gap-2 p-2">
                <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                  {video.uploadedBy
                    ? `${video.uploadedBy.firstName} ${video.uploadedBy.lastName}`
                    : "Unknown"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 p-2 w-[12.375rem]">
              <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                {new Date(video.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageVideos;
