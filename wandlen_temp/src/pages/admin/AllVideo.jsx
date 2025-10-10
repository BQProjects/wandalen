import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoGridWithFilters from "../../components/common/VideoGridWithFilters";
import axios from "axios";
import toast from "react-hot-toast";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const AllVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});
  const [total, setTotal] = useState(0);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const itemsPerPage = 9;
  const [req, setReq] = useState([]);

  // const videos = [
  //   {
  //     id: 1,
  //     title: "Korte wandeling Holterberg",
  //     duration: "15 min",
  //     location: "Hellendoorn, Nederland",
  //     thumbnail: BgVideo,
  //     tags: ["Opkomende zon", "Kinderen", "Wilde dieren", "Bos"],
  //     views: 320,
  //     likes: 123,
  //   },
  //   {
  //     id: 2,
  //     title: "Boswandeling met vogels",
  //     duration: "25 min",
  //     location: "Lemele, Nederland",
  //     thumbnail: BgVideo,
  //     tags: ["Winter", "Sneeuw", "Gouden gras", "Vogels", "Bos"],
  //     views: 450,
  //     likes: 89,
  //   },
  //   {
  //     id: 3,
  //     title: "Strandwandeling zonsondergang",
  //     duration: "30 min",
  //     location: "Lemelerveld, Noordzee kust",
  //     thumbnail: BgVideo,
  //     tags: ["Winter", "Koeien", "Rustig briesje", "Strand"],
  //     views: 200,
  //     likes: 67,
  //   },
  //   {
  //     id: 4,
  //     title: "Bergpad met uitzicht",
  //     duration: "20 min",
  //     location: "Luttenberg, Nederland",
  //     thumbnail: BgVideo,
  //     tags: ["Vogels", "Opkomende zon", "Heide"],
  //     views: 300,
  //     likes: 150,
  //   },
  //   {
  //     id: 5,
  //     title: "Rustige rivierwandeling",
  //     duration: "50 min",
  //     location: "Raalte, IJssel",
  //     thumbnail: BgVideo,
  //     tags: ["Kinderen", "Wilde dieren", "Water", "Zomer"],
  //     views: 280,
  //     likes: 95,
  //   },
  //   {
  //     id: 6,
  //     title: "Herfstkleuren in het bos",
  //     duration: "70 min",
  //     location: "Hellendoorn, Utrechtse Heuvelrug",
  //     thumbnail: BgVideo,
  //     tags: ["Sneeuw", "Gouden gras", "Herfst", "Bos"],
  //     views: 400,
  //     likes: 110,
  //   },
  // ];

  const handleVideoSelect = (id) => {
    navigate(`/admin/video/${id}`); // Use absolute path to match the route for VideoAdmin
  };

  const handleVideoEdit = (id) => {
    // Navigate to create video page with edit mode
    navigate(`/admin/create-video`, {
      state: { editMode: true, videoId: id },
    });
  };

  const handleVideoDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        const res = await axios.delete(
          `${DATABASE_URL}/volunteer/deleteVideo/${id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionId}`,
            },
          }
        );
        if (res.status === 200) {
          toast.success("Video deleted successfully");
          fetchVideos(currentPage, activeFilters); // Refresh the list with current page/filters
        } else {
          toast.error("Failed to delete video");
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        toast.error("An error occurred while deleting the video");
      }
    }
  };

  const fetchVideos = async (page, filters) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
      });
      // Map filters to backend fields (matching the backend query)
      const fieldMap = {
        Lengte: "duration",
        Locatie: "location", // Now searches location, province, and municipality
        Seizoen: "season",
        Natuurtype: "nature",
        Dieren: "animals",
      };
      Object.entries(filters).forEach(([key, values]) => {
        const field = fieldMap[key];
        if (field && values.length > 0) {
          values.forEach((value) => params.append(field, value));
        }
      });
      const res = await axios.get(
        `${DATABASE_URL}/admin/all-videos?${params}`,
        {
          headers: { Authorization: `Bearer ${sessionId}` },
        }
      );
      setVideos(res.data.videos);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos(currentPage, activeFilters);
  }, [currentPage, activeFilters]);

  // Add this new useEffect to reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);

  const getAllRequests = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/volunteer/getAllRequests`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });
      setReq(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  useEffect(() => {
    getAllRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#ede4dc]">
      <div className="mx-auto relative px-4 sm:px-10 md:px-20 pt-20">
        {/* Updated Video Grid with Filters */}
        <VideoGridWithFilters
          videos={videos}
          onVideoSelect={handleVideoSelect}
          title="All Videos"
          subtitle="Manage all videos in the system."
          showFilters={true}
          showStats={true}
          isClientView={false}
          isAdminView={true}
          onVideoEdit={handleVideoEdit}
          onVideoDelete={handleVideoDelete}
          showResultsCount={true}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
          totalPages={Math.ceil(total / itemsPerPage)}
          total={total}
        />
      </div>
    </div>
  );
};

export default AllVideos;
