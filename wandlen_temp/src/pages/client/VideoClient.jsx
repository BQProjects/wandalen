import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BgVideo from "../../assets/BgVideo.mp4";
import BackArrow from "../../assets/BackArrow.svg";
import Heart from "../../assets/Heart.svg";
import StarFilled from "../../assets/StarFilled.svg";
import StarEmpty from "../../assets/StarEmpty.svg";
import Quote from "../../assets/Quote.svg";
import Footer from "../../components/Footer";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const VideoClient = () => {
  const { id } = useParams();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    views: 0,
    likes: 0,
  });
  const [isLiked, setIsLiked] = useState(false);

  const getVideo = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/client/get-video/${id}`);
      setFormData({
        name: res.data.title,
        url: res.data.imgUrl,
        views: res.data.views,
        likes: res.data.likes,
      });
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const addView = async () => {
    try {
      const res = await axios.put(`${DATABASE_URL}/client/add-view/${id}`);
      setFormData((prev) => ({ ...prev, views: prev.views + 1 }));
    } catch (error) {
      console.error("Error adding view:", error);
    }
  };

  const checkLikeStatus = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await axios.get(
        `${DATABASE_URL}/client/check-like/${id}?userId=${userId}`
      );
      setIsLiked(res.data.isLiked);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const addLike = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to like videos");
      return;
    }

    try {
      const res = await axios.put(
        `${DATABASE_URL}/client/add-like/${id}?userId=${userId}`,
        {}
      );
      setIsLiked(res.data.liked);
      setFormData((prev) => ({
        ...prev,
        likes: res.data.liked ? prev.likes + 1 : prev.likes - 1,
      }));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    getVideo();
    addView();
    checkLikeStatus();
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-secondary px-4 sm:px-10 md:px-20">
        <div className="mx-auto">
          {/* Video Section */}
          <div className="">
            <div className=" mx-auto">
              {/* Back Button */}
              <Link
                to="/client"
                className="inline-flex items-center gap-3 text-brown hover:text-accent transition-colors mb-6 sm:mb-8 mt-10"
              >
                <img src={BackArrow} alt="Back Arrow" className="w-6 h-6" />
                <span className="text-lg sm:text-2xl font-semibold">Back</span>
              </Link>

              {/* Video Title */}
              <h2 className="text-2xl sm:text-3xl font-semibold text-brown mb-6 sm:mb-8">
                {formData.name || "Winterwandeling Boetelerveld"}
              </h2>

              {/* Video Player */}
              <div className="bg-black rounded-lg sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
                <video
                  src={formData.url || BgVideo}
                  controls
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "16/9" }}
                  onError={(e) => {
                    console.error("Video failed to load:", e);
                    e.target.src = BgVideo;
                  }}
                  onLoadStart={() => console.log("Video loading started")}
                  onCanPlay={() => console.log("Video can play")}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div></div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => addLike()}
                    className="p-3 rounded-full bg-secondary hover:bg-accent transition-colors"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-6 h-6 ${
                        isLiked ? "fill-red-500" : "fill-gray-400"
                      }`}
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" text-[#381207] font-['Poppins'] text-[2.5rem] font-semibold leading-[136%] pb-10">
            Ervaringen met deze video:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 pb-8 sm:pb-16">
            {/* Testimonial 1 */}
            <div className="bg-border p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="text-lg sm:text-xl font-semibold text-brown mb-2">
                Naam
              </div>
              <div className="text-brown font-medium mb-4">-</div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <img
                    key={i}
                    src={StarFilled}
                    alt="Star"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                ))}
                <img
                  src={StarEmpty}
                  alt="Star"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>
              <div className="flex justify-center">
                <div className="bg-secondary p-2 sm:p-3 rounded-full">
                  <img
                    src={Quote}
                    alt="Quote"
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-border p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="text-lg sm:text-xl font-semibold text-brown mb-2">
                Sanne
              </div>
              <div className="text-brown font-medium mb-4 text-sm sm:text-base">
                Tijdens de boswandeling met herfstbladeren begon mevrouw De
                Vries spontaan te glimlachen. Ze wees naar het scherm.
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <img
                    key={i}
                    src={StarFilled}
                    alt="Star"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                ))}
                <img
                  src={StarEmpty}
                  alt="Star"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>
              <div className="flex justify-center">
                <div className="bg-secondary p-2 sm:p-3 rounded-full">
                  <img
                    src={Quote}
                    alt="Quote"
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-border p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="text-lg sm:text-xl font-semibold text-brown mb-2">
                Martijn
              </div>
              <div className="text-brown font-medium mb-4 text-sm sm:text-base">
                Mijn vader herkende meteen de dijk in de video. Hij begon te
                vertellen over fietstochten met zijn broer. Ik had hem in tijden
                niet zo enthousiast gehoord.
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={StarFilled}
                    alt="Star"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                ))}
              </div>
              <div className="flex justify-center">
                <div className="bg-secondary p-2 sm:p-3 rounded-full">
                  <img
                    src={Quote}
                    alt="Quote"
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoClient;
