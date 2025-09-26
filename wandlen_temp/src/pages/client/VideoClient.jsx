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
import { useTranslation } from "react-i18next";

const VideoClient = () => {
  const { id } = useParams();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    views: 0,
    likes: 0,
  });
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    review: "",
    rating: 5,
  });
  const [userReviewed, setUserReviewed] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Add this new state for pagination
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
      alert(t("videoClient.loginToLike"));
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

  const fetchReviews = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const url = userId
        ? `${DATABASE_URL}/client/get-reviews/${id}?userId=${userId}`
        : `${DATABASE_URL}/client/get-reviews/${id}`;

      const res = await axios.get(url);
      setReviews(res.data.reviews || []);

      if (userId && res.data.hasReviewed) {
        setUserReviewed(true);
        setShowReviewForm(false);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert(t("videoClient.loginToReview"));
      return;
    }

    try {
      await axios.post(`${DATABASE_URL}/client/add-review`, {
        clientId: userId,
        review: reviewForm.review,
        rating: reviewForm.rating,
        vidoId: id,
      });

      // Update state
      setJustSubmitted(true);
      setShowReviewForm(false);
      setUserReviewed(true);

      // Reset form
      setReviewForm({
        review: "",
        rating: 5,
      });

      // Fetch reviews again
      fetchReviews();
      alert(t("videoClient.reviewSuccess"));
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(t("videoClient.reviewError"));
    }
  };

  useEffect(() => {
    // Always fetch these
    getVideo();
    addView();
    checkLikeStatus();
    fetchReviews();
  }, [id]);
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
                <span className="text-lg sm:text-2xl font-semibold">
                  {t("videoClient.back")}
                </span>
              </Link>

              {/* Video Title */}
              <h2 className="text-2xl sm:text-3xl font-semibold text-brown mb-6 sm:mb-8">
                {formData.name || t("videoClient.defaultTitle")}
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
            {t("videoClient.experiencesTitle")}
          </div>

          {/* Dynamic Reviews Section with Navigation Arrows */}
          {reviews.length > 0 && (
            <div className="mt-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-brown">
                  {t("videoClient.allReviews")}
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
          )}

          {/* Review Form Section */}
          <div className="mt-8 pb-10">
            <h3 className="text-2xl font-semibold text-brown mb-6">
              {userReviewed || justSubmitted
                ? t("videoClient.thanksForReview")
                : t("videoClient.shareExperience")}
            </h3>

            {/* Only show form if user hasn't reviewed AND hasn't just submitted */}
            {!userReviewed && !justSubmitted && showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="bg-[#381207] p-6 rounded-lg shadow-lg"
              >
                <div className="mb-6">
                  <label
                    htmlFor="review"
                    className="block text-[#EDE4DC] font-medium mb-2"
                  >
                    {t("videoClient.yourReview")}
                  </label>
                  <textarea
                    id="review"
                    rows="4"
                    value={reviewForm.review}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, review: e.target.value })
                    }
                    className="w-full p-3 border placeholder:text-[#EDE4DC]  text-[#EDE4DC]  border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
                    placeholder={t("videoClient.reviewPlaceholder")}
                    required
                  ></textarea>
                </div>

                {/* Repositioned stars and submit button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="mb-4 sm:mb-0">
                    <label
                      htmlFor="rating"
                      className="block text-[#EDE4DC] font-medium mb-2"
                    >
                      {t("videoClient.rating")}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setReviewForm({ ...reviewForm, rating: star })
                          }
                          className="focus:outline-none"
                        >
                          <img
                            src={
                              star <= reviewForm.rating ? StarFilled : StarEmpty
                            }
                            alt="Star"
                            className="w-6 h-6"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#A6A643] hover:bg-accent text-[#EDE4DC] font-medium py-2 px-6 rounded-lg transition-colors self-end"
                  >
                    {t("videoClient.submitReview")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VideoClient;
