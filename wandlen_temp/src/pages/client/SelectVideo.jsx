import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HandHold from "../../assets/HandHold.png";
import VideoGridWithFilters from "../../components/common/VideoGridWithFilters";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";
import Footer from "../../components/Footer";

const SelectVideo = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});
  const [total, setTotal] = useState(0);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const itemsPerPage = 9;

  const fetchVideos = async (page, filters) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
      });
      // Map filters to backend fields (matching the backend query)
      const fieldMap = {
        Lengte: "duration",
        Locatie: "location",
        Seizoen: "season",
        Natuurtype: "nature",
        Dieren: "animals",
        Geluidsprikkels: "sound",
      };
      Object.entries(filters).forEach(([key, values]) => {
        const field = fieldMap[key];
        if (field && values.length > 0) {
          values.forEach((value) => params.append(field, value));
        }
      });
      const res = await axios.get(
        `${DATABASE_URL}/client/get-all-videos?${params}`,
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

  const handleVideoSelect = (id) => {
    navigate(`video/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#ede4dc]">
      <div className="relative w-full h-[86vh] flex items-center justify-center">
        {/* Background Image */}
        <img
          src={HandHold}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay Filter */}
        <div className="absolute inset-0 bg-[#2A341F] opacity-55"></div>

        {/* Centered Text */}
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-2xl font-semibold font-[Poppins] text-[#DD9219] mb-4">
            All Videos
          </h1>
          <p className="text-5xl text-[#EDE4DC] font-medium font-[Poppins] max-w-2xl mx-auto">
            Choose a video that suits you
          </p>
          <p className="text-2xl text-[#EDE4DC] font-medium font-[Poppins] max-w-2xl mx-auto mt-4">
            Let yourself be carried away by nature walk videos that stimulate
            your senses and evoke memories.
          </p>
        </div>
      </div>

      <div className="mx-auto relative px-4 sm:px-10 md:px-20 pt-20">
        {/* Video Grid with Filters */}
        <VideoGridWithFilters
          videos={videos}
          onVideoSelect={handleVideoSelect}
          title="Your Favorite Videos"
          subtitle="Easily find and enjoy the videos you love most, anytime."
          customFilterOptions={null}
          showFilters={true}
          showStats={true}
          isClientView={true}
          emptyStateMessage="No nature videos available at the moment."
          showResultsCount={true}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
          totalPages={Math.ceil(total / itemsPerPage)}
          total={total} // Pass total matching videos
        />

        {/* TODO: need to change the favorites section to pagination section */}
        {/* Favorites Section */}
        {/* <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-[#381207] rounded-2xl p-8 text-center text-[#ede4dc]">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h3 className="text-2xl font-semibold text-[#dd9219]">
                Your Favorite Videos
              </h3>
            </div>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed">
              Easily find and enjoy the videos you love most, anytime. Build
              your personal collection of nature walks that bring you peace and
              tranquility.
            </p>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default SelectVideo;
