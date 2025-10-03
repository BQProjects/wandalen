import React, { useState, useRef } from "react";
import DawnForest from "../../../src/components/DawnForest";
import Background2 from "../../assets/Background2.png";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";
import RequestCard from "../../components/RequestCard";
import leaf from "../../assets/leaf.svg";
import click from "../../assets/click.svg";
import human from "../../assets/walkinghuman.svg";
import wheelchair from "../../assets/wheelchair.jpg";
import girl from "../../assets/tinasection.jpg";
import walking from "../../assets/walking.jpg";
import camera from "../../assets/CameraTips.png";
import PreviewExperience from "../../components/PreviewExperience";
import Mute from "../../assets/Mute.svg";
import UnMute from "../../assets/UnMute.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MessageUs = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center w-12 h-12 md:w-14 md:h-14 bg-[#5b6502] hover:bg-[#4a5501] rounded-lg shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-opacity-50"
        aria-label="Message Us"
      >
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="md:w-6 md:h-6"
        >
          <path
            d="M6 18L3.7 20.3C3.38334 20.6167 3.02067 20.6877 2.612 20.513C2.20333 20.3383 1.99933 20.0257 2 19.575V4C2 3.45 2.196 2.97933 2.588 2.588C2.98 2.19667 3.45067 2.00067 4 2H20C20.55 2 21.021 2.196 21.413 2.588C21.805 2.98 22.0007 3.45067 22 4V16C22 16.55 21.8043 17.021 21.413 17.413C21.0217 17.805 20.5507 18.0007 20 18H6ZM7 14H13C13.2833 14 13.521 13.904 13.713 13.712C13.905 13.52 14.0007 13.2827 14 13C13.9993 12.7173 13.9033 12.48 13.712 12.288C13.5207 12.096 13.2833 12 13 12H7C6.71667 12 6.47933 12.096 6.288 12.288C6.09667 12.48 6.00067 12.7173 6 13C5.99933 13.2827 6.09534 13.5203 6.288 13.713C6.48067 13.9057 6.718 14.0013 7 14ZM7 11H17C17.2833 11 17.521 10.904 17.713 10.712C17.905 10.52 18.0007 10.2827 18 10C17.9993 9.71733 17.9033 9.48 17.712 9.288C17.5207 9.096 17.2833 9 17 9H7C6.71667 9 6.47933 9.096 6.288 9.288C6.09667 9.48 6.00067 6.71733 6 10C5.99933 10.2827 6.09534 10.5203 6.288 10.713C6.48067 10.9057 6.718 11.0013 7 11ZM7 8H17C17.2833 8 17.521 7.904 17.713 7.712C17.905 7.52 18.0007 7.28267 18 7C17.9993 6.71733 17.9033 6.48 17.712 6.288C17.5207 6.096 17.2833 6 17 6H7C6.71667 6 6.47933 6.096 6.288 6.288C6.09667 6.48 6.00067 6.71733 6 7C5.99933 7.28267 6.09534 7.52033 6.288 7.713C6.48067 7.90567 6.718 8.00133 7 8Z"
            fill="white"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-24 md:right-6 z-50">
          <div className="bg-white rounded-lg shadow-lg w-72 sm:w-80 h-80 sm:h-96 flex flex-col animate-slide-up">
            <div className="flex justify-between items-center p-3 sm:p-4 border-b bg-[#5b6502] text-white rounded-t-lg">
              <h3 className="text-base sm:text-lg font-semibold">
                {t("aran.chat.title")}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 text-xl font-bold"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gray-50">
              <div className="mb-3 sm:mb-4">
                <div className="flex items-start">
                  <div className="bg-[#5b6502] text-white p-2 sm:p-3 rounded-lg max-w-xs">
                    <p className="text-xs sm:text-sm">
                      {t("aran.chat.greeting")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-3 sm:mb-4 text-right">
                <div className="bg-gray-200 text-gray-800 p-2 sm:p-3 rounded-lg max-w-xs inline-block">
                  <p className="text-xs sm:text-sm">
                    {t("aran.chat.userMessage")}
                  </p>
                </div>
              </div>
              <div className="mb-3 sm:mb-4">
                <div className="flex items-start">
                  <div className="bg-[#5b6502] text-white p-2 sm:p-3 rounded-lg max-w-xs">
                    <p className="text-xs sm:text-sm">
                      {t("aran.chat.response")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 sm:p-4 border-t bg-white">
              <div className="flex">
                <input
                  type="text"
                  placeholder={t("aran.chat.placeholder")}
                  className="flex-1 p-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#5b6502]"
                />
                <button className="bg-[#5b6502] text-white px-3 py-2 text-sm rounded-r-lg hover:bg-[#4a5501] transition-colors">
                  {t("aran.chat.send")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Aran = () => {
  // Tab state for organizations section
  const [activeTab, setActiveTab] = useState("organizations");
  const scrollRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const { t, ready } = useTranslation("translation");

  if (!ready) {
    return <div>Loading translations...</div>;
  }

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };
  return (
    <>
      <style>{`.scroll-container::-webkit-scrollbar { display: none; }`}</style>
      {/* Main Section */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[86vh] bg-cover bg-center bg-no-repeat overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0 bg-[#2A341F]"
          src="/BgVideo.mp4"
          autoPlay
          muted={isMuted}
          loop
          playsInline
        />

        {/* Color Overlay */}
        <div className="absolute inset-0 bg-[#2A341F] opacity-25 z-5"></div>

        {/* Mute Button */}
        <div className="absolute bottom-4 left-4 z-20">
          <button onClick={toggleMute} className="focus:outline-none">
            {isMuted ? (
              <img
                src={Mute}
                alt="Mute"
                className="w-8 h-8 md:w-auto md:h-auto"
              />
            ) : (
              <img
                src={UnMute}
                alt="Unmute"
                className="w-8 h-8 md:w-auto md:h-auto"
              />
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-start justify-start h-1/3 mx-auto pt-16 md:pt-24">
          {/* Left Content - Text */}
          <div className="flex-1 max-w-3xl px-4 sm:px-10 md:px-20 pt-12">
            <h1 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#A6A643] mb-2 sm:mb-4 font-[Poppins] tracking-wide">
              {t("aran.hero.title")}
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 sm:mb-6 leading-tight font-[Poppins]">
              {t("aran.hero.subtitle")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-medium text-white mb-4 sm:mb-8 leading-relaxed font-[Poppins] max-w-xl">
              {t("aran.hero.description")}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <Link to="/request-quote">
                <button className="cursor-pointer flex justify-center items-center gap-2 py-2 px-4 rounded-lg bg-[#a6a643] hover:bg-[#5B6502] text-white font-[Poppins] text-base sm:text-lg md:text-xl font-medium leading-[136%] w-full sm:w-auto">
                  {t("aran.hero.requestQuote")}
                </button>
              </Link>
              <Link to="/subscribe">
                <button className="cursor-pointer text-white hover:text-[#A6A643] flex justify-center items-center gap-2 py-2 px-4 rounded-lg border-2 border-[#abb53b] hover:bg-[#ffffb6] font-[Poppins] text-base sm:text-lg md:text-xl font-medium leading-[136%] w-full sm:w-auto mt-2 sm:mt-0">
                  {t("aran.hero.viewPlans")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Second Hero Section */}
      <div className="w-full bg-[#EDE4DC] py-10 sm:py-12 md:py-16 lg:py-24 relative">
        {/* Message Us Component - Top Right Corner */}
        <div className="cursor-pointer absolute bottom-180 right-9 z-10">
          <MessageUs />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-3">
          {/* Subtitle */}
          <h2 className="text-lg sm:text-xl lg:text-3xl xl:text-[32px] font-semibold text-[#A6A643] mb-4 sm:mb-8 font-[Poppins]">
            {t("aran.secondHero.subtitle")}
          </h2>

          {/* Main Description */}
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#381207] leading-relaxed mb-8 sm:mb-16 max-w-full mx-auto font-[Poppins] font-semibold">
            {t("aran.secondHero.description")}
          </p>

          {/* Features Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-14 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center bg-[#EDE4DC]">
                <img
                  src={leaf}
                  alt="Leaf"
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#381207] font-[Poppins]">
                {t("aran.secondHero.features.exploreNature")}
              </h3>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center bg-[#EDE4DC]">
                <img
                  src={click}
                  alt="click"
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#381207] font-[Poppins]">
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("aran.secondHero.features.simpleViewing"),
                  }}
                />
              </h3>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center bg-[#EDE4DC]">
                <img
                  src={human}
                  alt="walk"
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#381207] font-[Poppins]">
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("aran.secondHero.features.instantWatch"),
                  }}
                />
              </h3>
            </div>
          </div>
        </div>
      </div>
      <PreviewExperience />
      <DawnForest />

      {/* Discover Nature Videos Section */}
      <div className="flex-shrink-0 w-full min-h-[600px] md:min-h-[800px] lg:min-h-[941px] bg-[#eeebc6] flex flex-col items-center justify-center py-10 sm:py-12 md:py-16 px-4 sm:px-10 md:px-20">
        <div className="w-full mx-auto text-start">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div
              className="text-[#5b6502] font-['Poppins'] text-xl sm:text-2xl md:text-[32px] font-semibold leading-[136%] mb-2"
              style={{ letterSpacing: "-0.32px" }}
            >
              {t("discoverVideos.title")}
            </div>
            <div
              className="text-[#381207] font-['Poppins'] text-2xl sm:text-3xl lg:text-5xl font-semibold leading-[136%]"
              style={{ letterSpacing: "-0.48px" }}
            >
              {t("discoverVideos.subtitle")}
            </div>
          </div>

          {/* Video Grid - Responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mx-auto">
            {/* Video 1 - Mountain/Forest Scene */}
            <div
              className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-200 via-green-200 to-gray-300 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #D3D3D3 100%)",
              }}
            >
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] lg:w-[81px] lg:h-[81px] rounded-full bg-[#DD9219] bg-opacity-80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                  >
                    <path
                      d="M26 14.268C27.3333 15.0378 27.3333 16.9623 26 17.7321L10.5 26.9186C9.1667 27.6884 7.5 26.7261 7.5 25.1865V6.8135C7.5 5.2739 9.1667 4.3116 10.5 5.0814L26 14.268Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Volume Control */}
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 flex items-center justify-center p-1 sm:p-2 h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded bg-white bg-opacity-50 backdrop-blur-sm">
                <svg
                  width={12}
                  height={8}
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-2 sm:w-3.5 sm:h-2.5 lg:w-4 lg:h-3"
                >
                  <path
                    d="M8 1V11M4 3.5V8.5M12 2V10M0 4.5V7.5"
                    stroke="#381207"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Video 2 - Purple Lavender Scene */}
            <div
              className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #DDA0DD 0%, #FFB6C1 50%, #FFDAB9 100%)",
              }}
            >
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] lg:w-[81px] lg:h-[81px] rounded-full bg-[#DD9219] bg-opacity-80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                  >
                    <path
                      d="M26 14.268C27.3333 15.0378 27.3333 16.9623 26 17.7321L10.5 26.9186C9.1667 27.6884 7.5 26.7261 7.5 25.1865V6.8135C7.5 5.2739 9.1667 4.3116 10.5 5.0814L26 14.268Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Volume Control */}
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 flex items-center justify-center p-1 sm:p-2 h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded bg-white bg-opacity-50 backdrop-blur-sm">
                <svg
                  width={12}
                  height={8}
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-2 sm:w-3.5 sm:h-2.5 lg:w-4 lg:h-3"
                >
                  <path
                    d="M8 1V11M4 3.5V8.5M12 2V10M0 4.5V7.5"
                    stroke="#381207"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Video 3 - Ocean Sunset Scene */}
            <div
              className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-300 via-purple-200 to-pink-200 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #87CEFA 0%, #DDA0DD 50%, #FFB6C1 100%)",
              }}
            >
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] lg:w-[81px] lg:h-[81px] rounded-full bg-[#DD9219] bg-opacity-80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                  >
                    <path
                      d="M26 14.268C27.3333 15.0378 27.3333 16.9623 26 17.7321L10.5 26.9186C9.1667 27.6884 7.5 26.7261 7.5 25.1865V6.8135C7.5 5.2739 9.1667 4.3116 10.5 5.0814L26 14.268Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Volume Control */}
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 flex items-center justify-center p-1 sm:p-2 h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded bg-white bg-opacity-50 backdrop-blur-sm">
                <svg
                  width={12}
                  height={8}
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-2 sm:w-3.5 sm:h-2.5 lg:w-4 lg:h-3"
                >
                  <path
                    d="M8 1V11M4 3.5V8.5M12 2V10M0 4.5V7.5"
                    stroke="#381207"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Video 4 - Winter Forest Scene */}
            <div
              className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-green-400 via-gray-200 to-white bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #228B22 0%, #D3D3D3 50%, #FFFFFF 100%)",
              }}
            >
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] lg:w-[81px] lg:h-[81px] rounded-full bg-[#DD9219] bg-opacity-80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                  >
                    <path
                      d="M26 14.268C27.3333 15.0378 27.3333 16.9623 26 17.7321L10.5 26.9186C9.1667 27.6884 7.5 26.7261 7.5 25.1865V6.8135C7.5 5.2739 9.1667 4.3116 10.5 5.0814L26 14.268Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Volume Control */}
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 flex items-center justify-center p-1 sm:p-2 h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded bg-white bg-opacity-50 backdrop-blur-sm">
                <svg
                  width={12}
                  height={8}
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-2 sm:w-3.5 sm:h-2.5 lg:w-4 lg:h-3"
                >
                  <path
                    d="M8 1V11M4 3.5V8.5M12 2V10M0 4.5V7.5"
                    stroke="#381207"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Watch Now Button */}
          <div className="mt-8 sm:mt-12 text-center">
            <button
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#A6A643] text-white font-['Poppins'] text-base sm:text-lg md:text-xl font-medium rounded-lg hover:bg-[#8a8f39] transition-all focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:ring-opacity-50"
              onClick={() => (window.location.href = "/subscribe")}
            >
              {t("positiveExperiences.watchNow")}
            </button>
          </div>
        </div>
      </div>

      {/* Positive Experiences Section */}
      <div className="w-full bg-[#EDE4DC] py-10 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-10 md:px-20">
        <div className="mx-auto">
          {/* Header Section */}
          <div className="text-left mb-8 sm:mb-12 md:mb-16">
            <div className="text-[#A6A643] font-['Poppins'] text-lg sm:text-xl lg:text-[32px] font-semibold mb-2 sm:mb-4">
              {t("positiveExperiences.title")}
            </div>
            <h2 className="text-[#381207] font-['Poppins'] text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-8 text-left mx-auto">
              {t("positiveExperiences.subtitle")}
            </h2>
            <button
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#A6A643] text-white font-['Poppins'] text-base sm:text-lg md:text-xl font-medium rounded-lg hover:bg-[#8a8f39] transition-all focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:ring-opacity-50"
              onClick={() => (window.location.href = "/subscribe")}
            >
              {t("positiveExperiences.watchNow")}
            </button>
          </div>

          {/* Three Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-8xl mx-auto">
            {/* Card 1 - Family Connection */}
            <div className="bg-[#f7f6f4] rounded-2xl p-6 sm:p-8 flex flex-col text-left h-full space-y-8 sm:space-y-16 md:space-y-20 justify-end">
              <div className="">
                <svg
                  width={48}
                  height={48}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="items-left md:w-16 md:h-16"
                >
                  <path
                    d="M53.3359 31.9987C53.3359 26.3407 51.0883 20.9145 47.0875 16.9138C43.0868 12.913 37.6606 10.6654 32.0026 10.6654C26.3447 10.6654 20.9184 12.913 16.9177 16.9138C12.9169 20.9145 10.6693 26.3407 10.6693 31.9987C10.6693 37.6566 12.9169 43.0829 16.9177 47.0836C20.9184 51.0844 26.3447 53.332 32.0026 53.332C37.6606 53.332 43.0868 51.0844 47.0875 47.0836C51.0883 43.0829 53.3359 37.6566 53.3359 31.9987ZM58.6693 31.9987C58.6693 39.0711 55.8598 45.8539 50.8588 50.8549C45.8578 55.8558 39.075 58.6654 32.0026 58.6654C28.5007 58.6654 25.0331 57.9756 21.7977 56.6355C18.5624 55.2954 15.6227 53.3311 13.1464 50.8549C8.14545 45.8539 5.33594 39.0711 5.33594 31.9987C5.33594 24.9263 8.14545 18.1435 13.1464 13.1425C18.1474 8.14155 24.9302 5.33203 32.0026 5.33203C35.5045 5.33203 38.9721 6.02179 42.2075 7.36191C45.4428 8.70204 48.3826 10.6663 50.8588 13.1425C53.335 15.6187 55.2993 18.5585 56.6394 21.7938C57.9795 25.0292 58.6693 28.4968 58.6693 31.9987ZM26.6693 25.332C26.6693 27.4654 24.8026 29.332 22.6693 29.332C20.5359 29.332 18.6693 27.4654 18.6693 25.332C18.6693 23.1987 20.5359 21.332 22.6693 21.332C24.8026 21.332 26.6693 23.1987 26.6693 25.332ZM45.3359 25.332C45.3359 27.4654 43.4693 29.332 41.3359 29.332C39.2026 29.332 37.3359 27.4654 37.3359 25.332C37.3359 23.1987 39.2026 21.332 41.3359 21.332C43.4693 21.332 45.3359 23.1987 45.3359 25.332ZM32.0026 45.9454C27.3359 45.9454 23.2293 43.9987 20.8293 41.1187L24.6159 37.332C25.8159 39.252 28.6693 40.612 32.0026 40.612C35.3359 40.612 38.1893 39.252 39.3893 37.332L43.1759 41.1187C40.7759 43.9987 36.6693 45.9454 32.0026 45.9454Z"
                    fill="#381207"
                  />
                </svg>
              </div>
              <div className="flex-grow flex flex-col justify-center space-y-2 sm:space-y-4">
                <h3 className="text-[#381207] font-['Poppins'] text-xl sm:text-2xl font-semibold">
                  {t("dawnForest.threeCards.familyConnection.title")}
                </h3>
                <p className="text-[#381207] font-['Poppins'] text-base sm:text-lg leading-relaxed">
                  {t("dawnForest.threeCards.familyConnection.description")}
                </p>
              </div>
            </div>

            {/* Card 2 - Calm & Comfort */}
            <div className="bg-[#f7f6f4] rounded-2xl p-6 sm:p-8 flex flex-col text-left h-full space-y-8 sm:space-y-12 justify-end">
              <div className="flex-shrink-0">
                <svg
                  width={48}
                  height={48}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="items-left md:w-16 md:h-16"
                >
                  <path
                    d="M61.4571 30.4075C61.202 29.9593 60.8601 29.5664 60.4515 29.2518C60.0429 28.9371 59.5756 28.7071 59.0771 28.575C57.2686 28.1094 55.3996 27.9223 53.5346 28.02C54.5346 23.0575 53.7846 19.1325 53.0196 16.805C52.7147 15.8489 52.0646 15.0406 51.1962 14.5378C50.3277 14.0349 49.3031 13.8735 48.3221 14.085C45.7781 14.6514 43.3592 15.6783 41.1846 17.115C39.5918 13.8617 37.2731 11.0177 34.4071 8.8025C33.7126 8.28159 32.8678 8 31.9996 8C31.1314 8 30.2867 8.28159 29.5921 8.8025C26.7256 11.0171 24.4066 13.8612 22.8146 17.115C20.6401 15.6783 18.2211 14.6514 15.6771 14.085C14.6961 13.8735 13.6715 14.0349 12.8031 14.5378C11.9346 15.0406 11.2845 15.8489 10.9796 16.805C10.2296 19.1325 9.47962 23.055 10.4646 28.02C8.59965 27.9223 6.73068 28.1094 4.92212 28.575C4.42359 28.7071 3.95636 28.9371 3.54772 29.2518C3.13909 29.5664 2.79723 29.9593 2.54212 30.4075C2.27513 30.8666 2.10226 31.3744 2.03358 31.901C1.9649 32.4277 2.0018 32.9627 2.14212 33.475C2.98962 36.6175 5.59212 42.595 13.4746 47.305C21.3571 52.015 28.2821 52 32.0121 52C35.7421 52 42.6796 52 50.5121 47.305C58.3946 42.595 60.9971 36.6175 61.8446 33.475C61.9868 32.9636 62.0258 32.4289 61.9592 31.9023C61.8927 31.3756 61.722 30.8675 61.4571 30.4075ZM14.7846 18.035C14.7876 18.0226 14.7952 18.0118 14.8059 18.0048C14.8166 17.9979 14.8296 17.9952 14.8421 17.9975C17.1684 18.5228 19.3637 19.5154 21.2946 20.915C20.4155 23.7914 19.9789 26.7848 19.9996 29.7925C19.9996 34.4775 20.9421 38.2925 22.2771 41.3625C20.3793 39.4629 18.7371 37.3241 17.3921 35C12.8871 27.155 13.8246 21 14.7846 18.035ZM15.5346 43.8725C8.86712 39.8925 6.70462 35.0125 5.99962 32.425C7.83915 31.972 9.74802 31.8727 11.6246 32.1325C12.251 33.8107 13.0162 35.4338 13.9121 36.985C16.1119 40.7773 18.9936 44.1302 22.4121 46.875C19.9948 46.1798 17.6792 45.1703 15.5246 43.8725H15.5346ZM31.9996 47.6C29.6671 45.865 23.9996 40.5425 23.9996 29.7925C23.9996 19.175 29.5946 13.81 31.9996 12C34.4046 13.815 39.9996 19.18 39.9996 29.7975C39.9996 40.5425 34.3321 45.865 31.9996 47.6ZM42.7046 20.915C44.6358 19.5163 46.831 18.5245 49.1571 18C49.1697 17.9977 49.1826 18.0003 49.1933 18.0073C49.204 18.0143 49.2116 18.0251 49.2146 18.0375C50.1746 21 51.1121 27.155 46.6071 35C45.2634 37.3272 43.6212 39.4687 41.7221 41.37C43.0571 38.305 43.9996 34.485 43.9996 29.8C44.0211 26.7898 43.5844 23.7938 42.7046 20.915ZM57.9996 32.43C57.3071 34.9925 55.1496 39.8825 48.4771 43.8725C46.3224 45.1694 44.0068 46.1781 41.5896 46.8725C45.0081 44.1277 47.8899 40.7747 50.0896 36.9825C50.9856 35.4313 51.7507 33.8082 52.3771 32.13C54.2532 31.8716 56.1613 31.9725 57.9996 32.4275V32.43Z"
                    fill="#381207"
                  />
                </svg>
              </div>
              <div className="flex-grow flex flex-col justify-center space-y-2 sm:space-y-4">
                <h3 className="text-[#381207] font-['Poppins'] text-xl sm:text-2xl font-semibold">
                  {t("dawnForest.threeCards.calmComfort.title")}
                </h3>
                <p className="text-[#381207] font-['Poppins'] text-base sm:text-lg leading-relaxed">
                  {t("dawnForest.threeCards.calmComfort.description")}
                </p>
              </div>
            </div>

            {/* Card 3 - Sharing Memories */}
            <div className="bg-[#f7f6f4] rounded-2xl p-6 sm:p-8 flex flex-col text-left h-full space-y-8 sm:space-y-12 md:space-y-17 justify-end">
              <div className="flex-shrink-0">
                <svg
                  width={48}
                  height={48}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="items-left md:w-16 md:h-16"
                >
                  <path
                    d="M24.0026 58.6654C23.2954 58.6654 22.6171 58.3844 22.117 57.8843C21.6169 57.3842 21.3359 56.7059 21.3359 55.9987V47.9987H10.6693C9.25478 47.9987 7.89823 47.4368 6.89803 46.4366C5.89784 45.4364 5.33594 44.0798 5.33594 42.6654V10.6654C5.33594 9.25088 5.89784 7.89432 6.89803 6.89413C7.89823 5.89393 9.25478 5.33203 10.6693 5.33203H53.3359C54.7504 5.33203 56.107 5.89393 57.1072 6.89413C58.1074 7.89432 58.6693 9.25088 58.6693 10.6654V42.6654C58.6693 44.0798 58.1074 45.4364 57.1072 46.4366C56.107 47.4368 54.7504 47.9987 53.3359 47.9987H37.0693L27.2026 57.892C26.6693 58.3987 26.0026 58.6654 25.3359 58.6654H24.0026ZM26.6693 42.6654V50.8787L34.8826 42.6654H53.3359V10.6654H10.6693V42.6654H26.6693Z"
                    fill="#381207"
                  />
                </svg>
              </div>
              <div className="flex-grow flex flex-col justify-center space-y-2 sm:space-y-4">
                <h3 className="text-[#381207] font-['Poppins'] text-xl sm:text-2xl font-semibold">
                  {t("dawnForest.threeCards.sharingMemories.title")}
                </h3>
                <p className="text-[#381207] font-['Poppins'] text-base sm:text-lg leading-relaxed">
                  {t("dawnForest.threeCards.sharingMemories.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Counters Section */}
      <div className="w-full bg-[#EDE4DC] py-10 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-10 md:px-20">
        <div className="mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#381207] mb-8 font-[Poppins]">
            {t("impactCounters.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#A6A643] mb-2">
                90+
              </div>
              <div className="text-lg text-[#381207] font-[Poppins]">
                {t("impactCounters.natureVideos")}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#A6A643] mb-2">
                450+
              </div>
              <div className="text-lg text-[#381207] font-[Poppins]">
                {t("impactCounters.virtualKm")}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#A6A643] mb-2">
                20+
              </div>
              <div className="text-lg text-[#381207] font-[Poppins]">
                {t("impactCounters.volunteerFilmmakers")}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#A6A643] mb-2">
                50+
              </div>
              <div className="text-lg text-[#381207] font-[Poppins]">
                {t("impactCounters.uniqueRoutes")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Routes Near You Section */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat px-4 sm:px-10 md:px-20"
        // style={{ backgroundImage: `url(${Background2})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#2A341F] bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 w-full h-full py-16">
          <div className=" mx-auto">
            {/* Header Section */}
            <div>
              <div className="relative mb-32">
                <img
                  src={Background2}
                  alt="background2"
                  className="absolute inset-0 w-[140%] h-[140%] -top-[10%] object-cover opacity-90 items-center rounded-3xl"
                />
                <div className="relative items-center text-[#a6a643] font-[Poppins] text-[32px] font-semibold mb-4 tracking-tight pl-12">
                  {t("dawnForest.discoverRoutes.title")}
                </div>
                <div className="relative items-center text-white font-[Poppins] text-4xl lg:text-5xl font-semibold leading-tight max-w-[800px] pl-12">
                  {t("dawnForest.discoverRoutes.subtitle")}
                </div>
              </div>
            </div>
            {/* Location Buttons */}
            <div className="flex items-center gap-4 mb-16">
              {/* Left Arrow */}
              <button
                onClick={() =>
                  scrollRef.current?.scrollBy({
                    left: -200,
                    behavior: "smooth",
                  })
                }
                className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all"
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Location Buttons */}
              <div
                ref={scrollRef}
                className="scroll-container flex gap-4 overflow-x-auto whitespace-nowrap flex-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onClick={() => (window.location.href = "/subscribe")}
              >
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Dalfsen
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Deventer
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Haaksbergen
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Hellendoorn
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Hof van Twente
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Olst-Wijhe
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Ommen
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Raalte
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Rijssen-Holten
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Steenwijkerland
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Twenterand
                </button>
                <button className="cursor-pointer px-6 py-3 rounded-lg text-[18px] border border-white/30 text-white font-['Poppins'] hover:bg-white/10 transition-all">
                  Wierden
                </button>
              </div>

              {/* Right Arrow */}
              <button
                onClick={() =>
                  scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })
                }
                className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all"
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Bottom Section */}
            <div className="space-y-8">
              <div className="text-white font-['Poppins'] text-2xl font-medium">
                {t("dawnForest.discoverRoutes.inspireTitle")}
              </div>

              <div className="space-y-4 max-w-[600px]">
                <div className="text-white/90 text-base font-['Poppins'] leading-relaxed">
                  {t("dawnForest.discoverRoutes.inspireDescription1")}
                </div>
                <div className="text-white/90 text-base font-['Poppins'] leading-relaxed">
                  {t("dawnForest.discoverRoutes.inspireDescription2")}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  className="cursor-pointer inline-flex items-center px-4 py-2 rounded-lg bg-[#A6A643] text-white font-['Poppins'] text-xl font-medium hover:bg-[#5B6502] transition-all"
                  onClick={() => (window.location.href = "/subscribe")}
                >
                  {t("dawnForest.discoverRoutes.exploreFeature")}
                </button>

                <button
                  className="cursor-pointer inline-flex items-center px-4 py-2 rounded-lg bg-[#A6A643] text-white font-['Poppins'] text-xl font-medium hover:bg-[#5B6502] transition-all"
                  onClick={() => (window.location.href = "/become-volunteer")}
                >
                  {t("dawnForest.discoverRoutes.moreAboutVolunteering")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RequestCard />

      {/* Organizations Section */}
      <div
        className={`flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-12 py-8 px-4 sm:py-12 sm:px-6 md:py-16 md:px-12 lg:p-20 w-full transition-all duration-500 ${
          activeTab === "organizations"
            ? "bg-[#1f1915]"
            : activeTab === "Thuis"
            ? "bg-[#ede4dc]"
            : activeTab === "volunteer"
            ? "bg-[#1f1915]"
            : "bg-[#1f1915]"
        }`}
      >
        {/* Tab Buttons */}
        <div className="flex justify-center items-center w-full overflow-x-auto">
          <div className="flex justify-center items-center gap-1 sm:gap-2 rounded-lg bg-[#f7f6f4] p-1">
            <button
              onClick={() => setActiveTab("organizations")}
              className={`cursor-pointer flex justify-center items-center gap-2.5 py-2 px-3 sm:px-4 rounded-lg font-['Poppins'] text-base sm:text-lg md:text-xl lg:text-2xl leading-[136%] transition-all whitespace-nowrap ${
                activeTab === "organizations"
                  ? "bg-[#5b6502] text-white"
                  : "bg-[#f7f6f4] text-[#4b4741] hover:bg-[#e5e3df]"
              }`}
            >
              {t("dawnForest.organizationsTabs.organizations")}
            </button>
            <button
              onClick={() => setActiveTab("Thuis")}
              className={`cursor-pointer flex justify-center items-center gap-2.5 py-2 px-3 sm:px-4 rounded-lg font-['Poppins'] text-base sm:text-lg md:text-xl lg:text-2xl leading-[136%] transition-all whitespace-nowrap ${
                activeTab === "Thuis"
                  ? "bg-[#5b6502] text-white"
                  : "bg-[#f7f6f4] text-[#4b4741] hover:bg-[#e5e3df]"
              }`}
            >
              {t("dawnForest.organizationsTabs.families") || "Families"}
            </button>
            <button
              onClick={() => setActiveTab("volunteer")}
              className={`cursor-pointer flex justify-center items-center gap-2.5 py-2 px-3 sm:px-4 rounded-lg font-['Poppins'] text-base sm:text-lg md:text-xl lg:text-2xl leading-[136%] transition-all whitespace-nowrap ${
                activeTab === "volunteer"
                  ? "bg-[#5b6502] text-white"
                  : "bg-[#f7f6f4] text-[#4b4741] hover:bg-[#e5e3df]"
              }`}
            >
              {t("dawnForest.organizationsTabs.volunteer") || "Volunteer"}
            </button>
          </div>
        </div>

        {/* Content Section - Stacked on mobile, side by side on larger screens */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-12 w-full max-w-7xl">
          {/* Left Content with Sliding Animation */}
          <div className="flex flex-col items-start gap-6 sm:gap-8 lg:gap-10 w-full lg:w-1/2 relative overflow-hidden">
            {/* Sliding Container */}
            <div
              className="flex transition-transform duration-700 ease-in-out w-[300%]"
              style={{
                transform: `translateX(-${
                  activeTab === "organizations"
                    ? 0
                    : activeTab === "Thuis"
                    ? 33.333
                    : 66.666
                }%)`,
              }}
            >
              {/* Organizations Tab Content */}
              <div className="w-1/3 flex-shrink-0 pr-8">
                <div className="flex flex-col items-start gap-4 sm:gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 sm:gap-4 w-full">
                    <div className="text-[#a6a643] font-['Poppins'] text-xl sm:text-2xl lg:text-[2rem] font-semibold leading-tight">
                      {t("dawnForest.organizationsTabs.organizationsTitle") ||
                        "Virtual Walking for Organizations"}
                    </div>
                    <div className="w-full font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-white">
                      {t(
                        "dawnForest.organizationsTabs.organizationsSubtitle"
                      ) || "Calm moments, shared together."}
                    </div>
                  </div>
                  {/* Organizations Benefits */}
                  <div className="flex flex-col items-start gap-4 self-stretch w-full">
                    {(Array.isArray(
                      t("dawnForest.organizationsTabs.organizationsBenefits", {
                        returnObjects: true,
                      })
                    )
                      ? t(
                          "dawnForest.organizationsTabs.organizationsBenefits",
                          {
                            returnObjects: true,
                          }
                        )
                      : [
                          {
                            title: "Request a Quote Easily",
                            description:
                              "Quick form for pricing, customization, and our personal visit.",
                          },
                          {
                            title: "Promotes Well-Being",
                            description:
                              "Calming effect for restlessness, encouraging peaceful moments.",
                          },
                          {
                            title: "Encourages Connection",
                            description:
                              "Inspires conversation between residents and caregivers.",
                          },
                          {
                            title: "Flexible Access",
                            description:
                              "Works seamlessly on tablets, laptops, and large shared screens.",
                          },
                          {
                            title: "Simple Onboarding",
                            description:
                              "Minimal admin setup and full guidance during start-up.",
                          },
                        ]
                    ).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df] w-full pb-2 sm:pb-4"
                      >
                        <div className="flex-shrink-0 flex items-center gap-2.5 pt-1">
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          >
                            <path
                              d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                              fill="#A6A643"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col items-start pb-2 text-white font-['Poppins'] text-sm sm:text-base leading-snug sm:leading-normal">
                          <span className="text-[#a6a643] text-lg sm:text-xl md:text-2xl font-semibold pb-1 sm:pb-2">
                            {item.title}
                          </span>
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Families Tab Content */}
              <div className="w-1/3 flex-shrink-0 pr-8">
                <div className="flex flex-col items-start gap-4 sm:gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 sm:gap-4 w-full">
                    <div className="text-[#a6a643] font-['Poppins'] text-xl sm:text-2xl lg:text-[2rem] font-semibold leading-tight">
                      {t("dawnForest.organizationsTabs.familiesTitle") ||
                        "Virtual Walking at Home"}
                    </div>
                    <div className="w-full font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-[#381207]">
                      {t("dawnForest.organizationsTabs.familiesSubtitle") ||
                        "Nature's beauty, just a click away."}
                    </div>
                  </div>
                  {/* Families Benefits */}
                  <div className="flex flex-col items-start gap-4 self-stretch w-full">
                    {(Array.isArray(
                      t("dawnForest.organizationsTabs.familiesBenefits", {
                        returnObjects: true,
                      })
                    )
                      ? t("dawnForest.organizationsTabs.familiesBenefits", {
                          returnObjects: true,
                        })
                      : [
                          {
                            title: "Affordable Subscription",
                            description:
                              "Enjoy unlimited access for only €12.99/month.",
                          },
                          {
                            title: "100+ Scenic Videos",
                            description:
                              "Explore Overijssel, with fresh walks every month.",
                          },
                          {
                            title: "Personal Touch",
                            description:
                              "Request us to capture your favorite walking route.",
                          },
                          {
                            title: "Real Impact",
                            description:
                              "Caregivers share stories of joy and relaxation.",
                          },
                          {
                            title: "Simple & Instant",
                            description:
                              "Nature at home with just a single button press.",
                          },
                        ]
                    ).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 border-b-[0.5px] border-b-[#7A756E] w-full pb-2 sm:pb-4"
                      >
                        <div className="flex-shrink-0 flex items-center gap-2.5 pt-1">
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          >
                            <path
                              d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                              fill="#A6A643"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col items-start pb-2 text-[#381207] font-['Poppins'] text-sm sm:text-base leading-snug sm:leading-normal">
                          <span className="text-[#a6a643] text-lg sm:text-xl md:text-2xl font-semibold pb-1 sm:pb-2">
                            {item.title}
                          </span>
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Volunteer Tab Content */}
              <div className="w-1/3 flex-shrink-0">
                <div className="flex flex-col items-start gap-4 sm:gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 sm:gap-4 w-full">
                    <div className="text-[#a6a643] font-['Poppins'] text-xl sm:text-2xl lg:text-[2rem] font-semibold leading-tight">
                      {t("dawnForest.organizationsTabs.volunteerTitle") ||
                        "Virtual Walking as a Volunteer"}
                    </div>
                    <div className="w-full font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-white">
                      {t("dawnForest.organizationsTabs.volunteerSubtitle") ||
                        "Share walks, spread joy."}
                    </div>
                  </div>
                  {/* Volunteer Benefits */}
                  <div className="flex flex-col items-start gap-4 self-stretch w-full">
                    {(Array.isArray(
                      t("dawnForest.organizationsTabs.volunteerBenefits", {
                        returnObjects: true,
                      })
                    )
                      ? t("dawnForest.organizationsTabs.volunteerBenefits", {
                          returnObjects: true,
                        })
                      : [
                          {
                            title: "Grow the Collection",
                            description:
                              "Your walks help our library expand each week.",
                          },
                          {
                            title: "Film with Support",
                            description:
                              "We set up the camera and guide your filming.",
                          },
                          {
                            title: "Walk Together",
                            description:
                              "Alone on the path, but part of a bigger community.",
                          },
                          {
                            title: "Find Recognition",
                            description:
                              "More videos mean more smiles and shared moments.",
                          },
                          {
                            title: "Make a Difference",
                            description:
                              "Your contributions bring joy to many people.",
                          },
                        ]
                    ).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df] w-full pb-2 sm:pb-4"
                      >
                        <div className="flex-shrink-0 flex items-center gap-2.5 pt-1">
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          >
                            <path
                              d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                              fill="#A6A643"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col items-start pb-2 text-white font-['Poppins'] text-sm sm:text-base leading-snug sm:leading-normal">
                          <span className="text-[#a6a643] text-lg sm:text-xl md:text-2xl font-semibold pb-1 sm:pb-2">
                            {item.title}
                          </span>
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Button */}
            <Link
              to={
                activeTab === "organizations"
                  ? "/request-quote"
                  : activeTab === "Thuis"
                  ? "/subscribe"
                  : "/volunteer-signup"
              }
              className="w-full sm:w-auto"
            >
              <div className="cursor-pointer hover:bg-[#5B6502] flex justify-center items-center gap-2 py-2 px-4 rounded-lg bg-[#a6a643] text-white font-['Poppins'] text-base sm:text-lg lg:text-xl font-medium leading-tight transition-all w-full sm:w-auto">
                {activeTab === "organizations" &&
                  (t("dawnForest.organizationsTabs.getQuote") || "Get a Quote")}
                {activeTab === "Thuis" &&
                  (t("dawnForest.organizationsTabs.subscribeNow") ||
                    "Subscribe Now")}
                {activeTab === "volunteer" &&
                  (t("dawnForest.organizationsTabs.joinVolunteer") ||
                    "Join as Volunteer")}
              </div>
            </Link>
          </div>

          {/* Right Image with Sliding Animation */}
          <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[800px] rounded-lg overflow-hidden relative">
            <div
              className="flex transition-transform duration-700 ease-in-out w-[300%] h-full"
              style={{
                transform: `translateX(-${
                  activeTab === "organizations"
                    ? 0
                    : activeTab === "Thuis"
                    ? 33.333
                    : 66.666
                }%)`,
              }}
            >
              <img
                src={wheelchair}
                alt="Virtual walking for organizations"
                className="w-1/3 h-full object-cover rounded-lg flex-shrink-0"
              />
              <img
                src={walking}
                alt="Virtual Walking at Home"
                className="w-1/3 h-full object-cover rounded-lg flex-shrink-0"
              />
              <img
                src={camera}
                alt="Virtual Walking as a Volunteer"
                className="w-1/3 h-full object-cover rounded-lg flex-shrink-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tina Section */}
      <div className="w-full bg-[#ede4dc] py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-[#a6a643] font-['Poppins'] text-xl sm:text-2xl md:text-3xl lg:text-2xl font-semibold leading-tight">
                      {t("dawnForest.tinaSection.title")}
                    </h3>
                    <blockquote className="text-[#381207] font-['Poppins'] text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-left">
                      {t("dawnForest.tinaSection.quote")}
                    </blockquote>
                  </div>
                  <div className="flex justify-start">
                    <button
                      className="cursor-pointer px-3 sm:px-4 py-2 bg-[#a6a643] text-white font-['Poppins'] text-base sm:text-lg md:text-xl font-medium rounded-lg transition-all hover:bg-[#8a8f39] focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:ring-opacity-50 w-full sm:w-auto"
                      onClick={() => (window.location.href = "/read-more")}
                    >
                      {t("dawnForest.tinaSection.readMore")}
                    </button>
                  </div>
                </div>

                {/* Right Image */}
                <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
                  <img
                    src={girl}
                    alt="Tina"
                    className="w-full max-w-[250px] sm:max-w-[500px] md:max-w-sm h-auto min-h-[500px] rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonial />
      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </>
  );
};

export default Aran;
