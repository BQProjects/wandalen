import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "../../assets/BgVideo.mp4";
import VideoGridWithFilters from "../../components/common/VideoGridWithFilters";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import Background from "../../assets/background.png";
import Footer from "../../components/Footer";

const VolunteerHome = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
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

  const handleVideoDelete = (id) => {
    // Show confirmation dialog and delete video
    if (window.confirm("Are you sure you want to delete this video?")) {
      console.log("Deleting video with ID:", id);
    }
  };

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
            Welcome to Virtual Walking!
          </h1>
          <p className="text-5xl text-[#EDE4DC] font-medium font-[Poppins] max-w-2xl mx-auto">
            Bring Nature to Those Who Can’t Walk
          </p>
          <p className="text-2xl text-[#EDE4DC] font-medium font-[Poppins] max-w-2xl mx-auto mt-4">
            Capture, share, and upload calming nature videos to brighten the day
            of seniors and people with dementia.
          </p>
        </div>
      </div>
      <div className="mx-auto relative px-4 sm:px-10 md:px-20 pt-20">
        {/* Updated Video Grid with Filters */}
        <VideoGridWithFilters
          videos={videos}
          onVideoSelect={handleVideoSelect}
          title="Recently Created by You"
          subtitle="View, edit, and track the impact of your videos."
          showFilters={true}
          showStats={true}
          isClientView={false}
          onVideoEdit={handleVideoEdit}
          onVideoDelete={handleVideoDelete}
        />
      </div>
      {/* Existing section remains unchanged */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="location_request_form text-[#381207] font-['Poppins'] text-3xl md:text-4xl font-medium leading-normal mb-4">
              Location Request Form
            </h2>
            <p className="select_and_add_members_from_this_quote_request_ text-[#381207] font-['Poppins'] text-lg leading-normal">
              Select and add members from this quote request.
            </p>
            <p className="all_patient text-[#381207] font-['Poppins'] text-lg leading-normal">
              All Patient
            </p>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-[#a6a643]/[.2] border-b border-[#d9bbaa]">
                  <th className="px-6 py-4 text-left text-[#2a341f] font-['Poppins'] text-lg font-medium">
                    Email
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
                    Location Details
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
                    Google Maps Link
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {req.map((item, index) => (
                  <tr className="border-b border-[#d9bbaa] bg-[#ede4dc]">
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
                          navigate("create-video");
                        }}
                        className="px-4 py-2 bg-[#dd9219] text-white font-['Poppins'] text-base rounded hover:bg-[#c47a15] transition-colors"
                      >
                        Create Video
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Row 1 */}
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
