import React, { useState, useEffect, useContext } from "react";
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

const VideoAdmin = () => {
  const { id } = useParams();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        console.log("Fetching video with ID:", id);
        const res = await axios.get(
          `${DATABASE_URL}/client/get-video/${id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionId}`,
            },
          }
        );
        console.log("Video data received:", res.data);
        console.log("Video URL (imgUrl):", res.data.imgUrl);
        setVideo(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchVideo();
    }
  }, [id, DATABASE_URL, sessionId]);
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className=" px-4 sm:px-10 md:px-20">
        <div className="mx-auto">
          {/* Video Section */}
          <div className="">
            <div className=" mx-auto">
              {/* Back Button */}
              <Link
                to="/admin/all-videos"
                className="inline-flex items-center gap-3 text-brown hover:text-accent transition-colors mb-6 sm:mb-8 mt-10"
              >
                <img src={BackArrow} alt="Back Arrow" className="w-6 h-6" />
                <span className="text-lg sm:text-2xl font-semibold">Terug</span>
              </Link>

              {/* Video Title */}
              <h2 className="text-2xl sm:text-3xl font-semibold text-brown mb-6 sm:mb-8">
                {video ? video.title : "Loading..."}
              </h2>

              {/* Video Player */}
              <div className="bg-black rounded-lg sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
                <video
                  src={video ? video.imgUrl : BgVideo}
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
            </div>
          </div>
          <div className=" text-[#381207] font-['Poppins'] text-[2.5rem] font-semibold leading-[136%] pb-10">
            Ervaringen met deze video:
          </div>
          {/* Testimonials Grid */}
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

export default VideoAdmin;
