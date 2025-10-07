import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BgVideo from "../../assets/BgVideo.mp4";
import VideoGridWithFilters from "../../components/common/VideoGridWithFilters";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import Background from "../../assets/background.png";
import Footer from "../../components/Footer";

const VolunteerHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    navigate(`video/${id}`);
  };

  const handleVideoEdit = (id) => {
    // Navigate to create video page with edit mode
    navigate(`create-video`, {
      state: { editMode: true, videoId: id },
    });
  };

  const handleVideoDelete = async (id) => {
    if (window.confirm(t("volunteerHome.deleteConfirm"))) {
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
          alert(t("volunteerHome.deleteSuccess"));
          fetchVideos(currentPage, activeFilters); // Refresh the list with current page/filters
        } else {
          alert(t("volunteerHome.deleteFailed"));
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        alert(t("volunteerHome.deleteError"));
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
        Geluidsprikkels: "sound",
      };
      Object.entries(filters).forEach(([key, values]) => {
        const field = fieldMap[key];
        if (field && values.length > 0) {
          values.forEach((value) => params.append(field, value));
        }
      });

      const userId = localStorage.getItem("userId");
      const res = await axios.get(
        `${DATABASE_URL}/volunteer/getSelfVideos/${userId}?${params}`,
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
      // Filter out completed requests
      const pendingRequests = res.data.filter(
        (req) => req.currentStatus !== "Completed"
      );
      setReq(pendingRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  useEffect(() => {
    getAllRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#ede4dc]">
      <div className="relative w-full h-[86vh] flex items-center justify-center">
        {/* Background Image */}
        <img
          src={Background}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay Filter */}
        <div className="absolute inset-0 bg-[#2A341F] opacity-55"></div>

        {/* Centered Text */}
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-2xl font-semibold font-[Poppins] text-[#A6A643] mb-4">
            {t("volunteerHome.welcome")}
          </h1>
          <p className="text-5xl text-[#EDE4DC] font-medium font-[Poppins] max-w-2xl mx-auto">
            {t("volunteerHome.heroTitle")}
          </p>
          <p className="text-2xl text-[#EDE4DC] font-medium font-[Poppins] max-w-2xl mx-auto mt-4">
            {t("volunteerHome.heroDescription")}
          </p>
        </div>
      </div>
      <div className="mx-auto relative px-4 sm:px-10 md:px-20 pt-20">
        {/* Updated Video Grid with Filters */}
        <VideoGridWithFilters
          videos={videos}
          onVideoSelect={handleVideoSelect}
          title={t("volunteerHome.recentlyCreated")}
          subtitle={t("volunteerHome.recentlyCreatedSubtitle")}
          showFilters={true}
          showStats={true}
          isClientView={false}
          onVideoEdit={handleVideoEdit}
          onVideoDelete={handleVideoDelete}
          showResultsCount={true}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
          totalPages={Math.ceil(total / itemsPerPage)}
          total={total} // Pass total matching videos
        />
      </div>

      {/* Future Videos Card */}
      <div className="mb-12 w-11/12 mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#d9bbaa]">
          <div className="bg-gradient-to-r from-[#a6a643]/[.2] to-[#dd9219]/[.2] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a6a643] rounded-full p-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17ZM19 19H5V5H19V19.1ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#2a341f] font-['Poppins'] text-2xl font-semibold">
                    📊 Future Videos Planning
                  </h3>
                  <p className="text-[#381207] font-['Poppins'] text-base mt-1">
                    Manage and track upcoming video locations in real-time
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("future-videos")}
                className="bg-[#dd9219] hover:bg-[#c47a15] text-white font-['Poppins'] text-base font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <span>View Planning</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Existing section remains unchanged */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="location_request_form text-[#381207] font-['Poppins'] text-3xl md:text-4xl font-medium leading-normal mb-4">
              {t("volunteerHome.locationRequestForm")}
            </h2>
            <p className="select_and_add_members_from_this_quote_request_ text-[#381207] font-['Poppins'] text-lg leading-normal">
              {t("volunteerHome.locationRequestSubtitle")}
            </p>
            <p className="all_patient text-[#381207] font-['Poppins'] text-lg leading-normal">
              {t("volunteerHome.allPatients")}
            </p>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-[#a6a643]/[.2] border-b border-[#d9bbaa]">
                  <th className="px-6 py-4 text-left text-[#2a341f] font-['Poppins'] text-lg font-medium">
                    {t("volunteerHome.email")}
                    <svg
                      width={11}
                      height={12}
                      viewBox="0 0 11 12"
                      fill="none"
                      className="inline ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.66667 1.33203V10.6654M5.66667 10.6654L10.3333 5.9987M5.66667 10.6654L1 5.9987"
                        stroke="#2A341F"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </th>
                  <th className="px-6 py-4 text-left text-[#2a341f] font-['Poppins'] text-lg font-medium">
                    {t("volunteerHome.locationDetails")}
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      className="inline ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.9987 1.33203V10.6654M5.9987 10.6654L10.6654 5.9987M5.9987 10.6654L1.33203 5.9987"
                        stroke="#2A341F"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </th>
                  <th className="px-6 py-4 text-left text-[#2a341f] font-['Poppins'] text-lg font-medium hidden md:table-cell">
                    {t("volunteerHome.googleMapsLink")}
                    <svg
                      width={11}
                      height={12}
                      viewBox="0 0 11 12"
                      fill="none"
                      className="inline ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.33464 1.33203V10.6654M5.33464 10.6654L10.0013 5.9987M5.33464 10.6654L0.667969 5.9987"
                        stroke="#2A341F"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </th>
                  <th className="px-6 py-4 text-center text-[#2a341f] font-['Poppins'] text-lg font-medium">
                    {t("volunteerHome.action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {req.map((item, index) => (
                  <tr className="border-b border-[#d9bbaa] bg-white">
                    <td className="px-6 py-4 text-[#381207] font-['Poppins'] text-base">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 text-[#381207] font-['Poppins'] text-base">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 text-[#381207] font-['Poppins'] text-base underline hidden md:table-cell">
                      <a
                        href="https://maps.app.goo.gl/M2dmycCvDJEW1hGv8"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.link}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          navigate("create-video", {
                            state: { requestData: item },
                          });
                        }}
                        className="px-4 py-2 bg-[#dd9219] text-white font-['Poppins'] text-base rounded hover:bg-[#c47a15] transition-colors"
                      >
                        {t("volunteerHome.createVideo")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default VolunteerHome;
