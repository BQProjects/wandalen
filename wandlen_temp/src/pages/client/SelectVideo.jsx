import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HandHold from "../../assets/HandHold.png";
import VideoGridWithFilters from "../../components/common/VideoGridWithFilters";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";
import Footer from "../../components/Footer";
import RoutesNearYou from "../../components/common/RoutesNearYou";

const SelectVideo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});
  const [total, setTotal] = useState(0);
  const clientId = localStorage.getItem("userId");
  const [firstName, setFirstName] = useState("");
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const itemsPerPage = 9;
  const [watchLimit, setWatchLimit] = useState(null);

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

  // Add useEffect to reset page when new videos are added (total increases)
  const [prevTotal, setPrevTotal] = useState(0);
  useEffect(() => {
    if (total > prevTotal && prevTotal > 0) {
      setCurrentPage(1);
    }
    setPrevTotal(total);
  }, [total, prevTotal]);

  // Fetch client profile to get first name
  useEffect(() => {
    //Temporarily disabled due to missing endpoint
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${DATABASE_URL}/client/get-account/${clientId}`,
          { headers: { Authorization: `Bearer ${sessionId}` } }
        );
        setFirstName(res.data.client.firstName || "Client");
      } catch (error) {
        console.error("Error fetching profile:", error);
        setFirstName("Client");
      }
    };
    if (sessionId) {
      fetchProfile();
    }
    setFirstName("Client"); // Placeholder until endpoint is available
  }, [DATABASE_URL, sessionId]);

  // Fetch watch limit status
  useEffect(() => {
    const fetchWatchLimit = async () => {
      try {
        const res = await axios.get(`${DATABASE_URL}/client/get-watch-limit`, {
          headers: { Authorization: `Bearer ${sessionId}` },
        });
        setWatchLimit(res.data);
      } catch (error) {
        console.error("Error fetching watch limit:", error);
      }
    };
    if (sessionId) {
      fetchWatchLimit();
    }
  }, [DATABASE_URL, sessionId]);

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
          <div className="flex justify-center items-center gap-5">
            <span className="text-[#ede4dc] font-['Poppins'] text-8xl font-semibold leading-[136%]">
              Welcome
            </span>
            <span className="text-[#a6a643] font-['Poppins'] text-8xl font-semibold leading-[normal]">
              {firstName}
            </span>
            <span className="text-[#ede4dc] font-['Poppins'] text-8xl font-semibold leading-[136%]">
              !
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto relative px-4 sm:px-10 md:px-20 pt-20">
        {watchLimit && watchLimit.limitReached ? (
          <div className="bg-[#381207] rounded-2xl p-8 text-center text-[#ede4dc] mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h3 className="text-2xl font-semibold text-[#dd9219]">
                Daily Video Limit Reached
              </h3>
            </div>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed mb-4">
              You have watched {watchLimit.dailyWatchCount} videos today. The
              daily limit is {watchLimit.maxLimit} videos per day.
            </p>
            {watchLimit.resetTime && (
              <p className="text-lg max-w-3xl mx-auto leading-relaxed">
                Your limit will reset at midnight (
                {new Date(watchLimit.resetTime).toLocaleString()}).
              </p>
            )}
          </div>
        ) : (
          <VideoGridWithFilters
            videos={videos}
            onVideoSelect={handleVideoSelect}
            title={t("selectVideo.grid.title")}
            subtitle={t("selectVideo.grid.subtitle")}
            customFilterOptions={null}
            showFilters={true}
            showStats={true}
            isClientView={true}
            emptyStateMessage={t("selectVideo.grid.emptyState")}
            showResultsCount={true}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
            totalPages={Math.ceil(total / itemsPerPage)}
            total={total} // Pass total matching videos
          />
        )}

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
      <RoutesNearYou />
      <Footer />
    </div>
  );
};

export default SelectVideo;
