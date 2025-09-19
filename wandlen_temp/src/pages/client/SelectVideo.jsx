import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "../../assets/BgVideo.mp4";
import VideoGridWithFilters from "../../components/common/VideoGridWithFilters";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const SelectVideo = () => {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");

  const handleGetVideos = async () => {
    try {
      const res = await axios.get(
        `${DATABASE_URL}/client/get-all-videos/1/10"`,
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        }
      );
      setVideos(res.data.videos);
      console.log(res.data.videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
  useEffect(() => {
    handleGetVideos();
  }, []);

  const handleVideoSelect = (id) => {
    navigate(`video/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#ede4dc]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#381207] mb-4">
            Select Your Video
          </h1>
          <p className="text-lg text-[#6b5b4a] max-w-2xl">
            Discover the perfect nature walk video for your relaxation and
            mindfulness journey.
          </p>
        </div>

        {/* Video Grid with Filters */}
        <VideoGridWithFilters
          videos={videos}
          onVideoSelect={handleVideoSelect}
          title="Available Nature Videos"
          subtitle="Discover beautiful nature walks from our volunteers."
          showFilters={true}
          showStats={false}
          isClientView={true}
          emptyStateMessage="No nature videos available at the moment."
          showResultsCount={true}
        />

        {/* Favorites Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
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
        </div>
      </div>
    </div>
  );
};

export default SelectVideo;
