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
  const [reviews, setReviews] = useState([]);

  // Add pagination state for reviews
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil((reviews?.length || 0) / reviewsPerPage);

  // Navigation functions
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/admin/get-reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      });
      setReviews(res.data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // If admin endpoint doesn't exist, try client endpoint
      try {
        const res = await axios.get(`${DATABASE_URL}/client/get-reviews/${id}`);
        setReviews(res.data.reviews || []);
      } catch (clientError) {
        console.error(
          "Error fetching reviews from client endpoint:",
          clientError
        );
      }
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        console.log("Fetching video with ID:", id);
        const res = await axios.get(`${DATABASE_URL}/admin/get-video/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        });
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
      fetchReviews();
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
                {video && video.url && video.url.includes("vimeo.com") ? (
                  // Vimeo video player
                  <iframe
                    src={video.url}
                    className="w-full h-auto"
                    style={{ aspectRatio: "16/9" }}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title={video.title || "Video"}
                  ></iframe>
                ) : (
                  // Regular video player for non-Vimeo videos
                  <video
                    src={video ? video.url : BgVideo}
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
                )}
              </div>
            </div>
          </div>
          <div className=" text-[#381207] font-['Poppins'] text-[2.5rem] font-semibold leading-[136%] pb-10">
            Ervaringen met deze video:
          </div>

          {/* Video Description */}
          {video?.description && (
            <div className="text-[#381207] font-['Poppins'] text-lg leading-relaxed mb-8 w-full">
              {video.description}
            </div>
          )}

          {/* Dynamic Reviews Section with Navigation Arrows */}
          {reviews.length > 0 ? (
            <div className="mt-10 pb-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-brown">
                  Alle beoordelingen
                </h3>
              </div>

              <div className="relative">
                {/* Left Arrow */}
                {currentPage > 0 && (
                  <button
                    onClick={goToPreviousPage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-secondary hover:bg-accent flex items-center justify-center shadow-md focus:outline-none"
                    aria-label="Previous reviews"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="#381207"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}

                {/* Right Arrow */}
                {currentPage < totalPages - 1 && (
                  <button
                    onClick={goToNextPage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-secondary hover:bg-accent flex items-center justify-center shadow-md focus:outline-none"
                    aria-label="Next reviews"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="#381207"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {reviews
                    .slice(
                      currentPage * reviewsPerPage,
                      currentPage * reviewsPerPage + reviewsPerPage
                    )
                    .map((review, index) => (
                      <div
                        key={index}
                        className="bg-border p-4 sm:p-6 rounded-lg shadow-lg"
                      >
                        <div className="flex justify-center">
                          <div className="bg-secondary p-2 sm:p-3 rounded-full">
                            <img
                              src={Quote}
                              alt="Quote"
                              className="w-6 h-6 sm:w-8 sm:h-8"
                            />
                          </div>
                        </div>
                        <div className="text-lg sm:text-xl font-semibold text-brown mb-2">
                          {review.username || "Anonymous"}
                        </div>
                        <div className="text-brown font-medium mb-4 text-sm sm:text-base">
                          {review.review}
                        </div>
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <img
                              key={i}
                              src={i < review.rating ? StarFilled : StarEmpty}
                              alt="Star"
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            /* No Reviews Message */
            <div className="flex justify-center items-center mt-10 pb-8 sm:pb-16">
              <div className="text-center">
                <div className="text-lg sm:text-xl text-brown font-medium">
                  Nog geen beoordelingen
                </div>
                <div className="text-sm sm:text-base text-gray-600 mt-2">
                  Wees de eerste om deze video te beoordelen!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoAdmin;
