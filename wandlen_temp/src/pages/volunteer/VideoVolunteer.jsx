import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BgVideo from "../../assets/BgVideo.mp4";
import BackArrow from "../../assets/BackArrow.svg";
import Heart from "../../assets/Heart.svg";
import StarFilled from "../../assets/StarFilled.svg";
import StarEmpty from "../../assets/StarEmpty.svg";
import Quote from "../../assets/Quote.svg";
import LeftArrow from "../../assets/LeftArrow.svg";
import RightArrow from "../../assets/RightArrow.svg";
import Footer from "../../components/Footer";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const VideoVolunteer = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;

  const goToNextPage = () => {
    if ((currentPage + 1) * reviewsPerPage < reviews.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchReviews = async () => {
    try {
      console.log("Fetching reviews for video ID:", id);

      // Try volunteer endpoint first, then fallback to client endpoint
      let res;
      try {
        res = await axios.get(`${DATABASE_URL}/volunteer/getReviews/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        });
      } catch (error) {
        console.log("Volunteer endpoint failed, trying client endpoint");
        res = await axios.get(`${DATABASE_URL}/client/getReviews/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        });
      }

      console.log("Reviews data received:", res.data);
      setReviews(res.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        console.log("Fetching video with ID:", id);
        const res = await axios.get(
          `${DATABASE_URL}/volunteer/getVideo/${id}`,
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
      fetchReviews();
    }
  }, [id, DATABASE_URL, sessionId]);
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
                to="/volunteer"
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
            {t("videoExperiences.title")}
          </div>

          {/* Reviews Section */}
          {reviews.length > 0 ? (
            <>
              {/* Navigation Arrows */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-full ${
                    currentPage === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-secondary hover:bg-accent"
                  } transition-colors`}
                >
                  <img src={LeftArrow} alt="Previous" className="w-6 h-6" />
                </button>

                <span className="text-brown font-medium">
                  {currentPage + 1} van{" "}
                  {Math.ceil(reviews.length / reviewsPerPage)}
                </span>

                <button
                  onClick={goToNextPage}
                  disabled={
                    (currentPage + 1) * reviewsPerPage >= reviews.length
                  }
                  className={`p-2 rounded-full ${
                    (currentPage + 1) * reviewsPerPage >= reviews.length
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-secondary hover:bg-accent"
                  } transition-colors`}
                >
                  <img src={RightArrow} alt="Next" className="w-6 h-6" />
                </button>
              </div>

              {/* Dynamic Reviews Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 pb-8 sm:pb-16">
                {reviews
                  .slice(
                    currentPage * reviewsPerPage,
                    (currentPage + 1) * reviewsPerPage
                  )
                  .map((review, index) => (
                    <div
                      key={index}
                      className="bg-border p-4 sm:p-6 rounded-lg shadow-lg"
                    >
                      <div className="text-lg sm:text-xl font-semibold text-brown mb-2">
                        {review.username || review.name || "Anoniem"}
                      </div>
                      <div className="text-brown font-medium mb-4 text-sm sm:text-base">
                        {review.comment ||
                          review.review ||
                          "Geen commentaar beschikbaar"}
                      </div>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <img
                            key={i}
                            src={
                              i < (review.rating || 0) ? StarFilled : StarEmpty
                            }
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
                  ))}
              </div>
            </>
          ) : (
            /* No Reviews Message */
            <div className="flex justify-center items-center pb-8 sm:pb-16">
              <div className="text-center">
                <div className="text-lg sm:text-xl text-brown font-medium">
                  {t("videoExperiences.noReviews.title")}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VideoVolunteer;
