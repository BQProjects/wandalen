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
import wheelchair from "../../assets/wheelchair.png";
import girl from "../../assets/girl.png";
import walking from "../../assets/walking.png";
import camera from "../../assets/camera.png";
import PreviewExperience from "../../components/PreviewExperience";
import Mute from "../../assets/Mute.svg";
import UnMute from "../../assets/UnMute.svg";
import { Link } from "react-router-dom";

const MessageUs = () => {
  const [isOpen, setIsOpen] = useState(false); // For modal or tooltip

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)} // Toggle action (e.g., open chat modal)
        className="flex justify-center items-center w-14 h-14 bg-[#5b6502] hover:bg-[#4a5501] rounded-lg shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-opacity-50"
        aria-label="Message Us"
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18L3.7 20.3C3.38334 20.6167 3.02067 20.6877 2.612 20.513C2.20333 20.3383 1.99933 20.0257 2 19.575V4C2 3.45 2.196 2.97933 2.588 2.588C2.98 2.19667 3.45067 2.00067 4 2H20C20.55 2 21.021 2.196 21.413 2.588C21.805 2.98 22.0007 3.45067 22 4V16C22 16.55 21.8043 17.021 21.413 17.413C21.0217 17.805 20.5507 18.0007 20 18H6ZM7 14H13C13.2833 14 13.521 13.904 13.713 13.712C13.905 13.52 14.0007 13.2827 14 13C13.9993 12.7173 13.9033 12.48 13.712 12.288C13.5207 12.096 13.2833 12 13 12H7C6.71667 12 6.47933 12.096 6.288 12.288C6.09667 12.48 6.00067 12.7173 6 13C5.99933 13.2827 6.09534 13.5203 6.288 13.713C6.48067 13.9057 6.718 14.0013 7 14ZM7 11H17C17.2833 11 17.521 10.904 17.713 10.712C17.905 10.52 18.0007 10.2827 18 10C17.9993 9.71733 17.9033 9.48 17.712 9.288C17.5207 9.096 17.2833 9 17 9H7C6.71667 9 6.47933 9.096 6.288 9.288C6.09667 9.48 6.00067 6.71733 6 10C5.99933 10.2827 6.09534 10.5203 6.288 10.713C6.48067 10.9057 6.718 11.0013 7 11ZM7 8H17C17.2833 8 17.521 7.904 17.713 7.712C17.905 7.52 18.0007 7.28267 18 7C17.9993 6.71733 17.9033 6.48 17.712 6.288C17.5207 6.096 17.2833 6 17 6H7C6.71667 6 6.47933 6.096 6.288 6.288C6.09667 6.48 6.00067 6.71733 6 7C5.99933 7.28267 6.09534 7.52033 6.288 7.713C6.48067 7.90567 6.718 8.00133 7 8Z"
            fill="white"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col animate-slide-up">
            <div className="flex justify-between items-center p-4 border-b bg-[#5b6502] text-white rounded-t-lg">
              <h3 className="text-lg font-semibold">
                Chat with Virtueel Wandelen
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 text-xl font-bold"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="mb-4">
                <div className="flex items-start">
                  <div className="bg-[#5b6502] text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">
                      Hello! Welcome to BrainQuest. How can we assist you with
                      virtual walking experiences today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 text-right">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs inline-block">
                  <p className="text-sm">
                    I'm interested in learning more about your services.
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-start">
                  <div className="bg-[#5b6502] text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">
                      Great! We offer immersive virtual walks through beautiful
                      landscapes. Would you like to schedule a demo or get a
                      quote?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-white">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#5b6502]"
                />
                <button className="bg-[#5b6502] text-white px-4 py-2 rounded-r-lg hover:bg-[#4a5501] transition-colors">
                  Send
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
      <div className="relative w-full h-[86vh] bg-cover bg-center bg-no-repeat overflow-hidden">
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
          <button onClick={toggleMute}>
            {isMuted ? (
              <img src={Mute} alt="Mute" />
            ) : (
              <img src={UnMute} alt="Unmute" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-start justify-start h-1/3 mx-auto pt-24">
          {/* Left Content - Text */}
          <div className="flex-1 max-w-2xl px-4 sm:px-10 md:px-20">
            <h1 className="text-[32px] font-semibold text-[#A6A643] mb-4 font-poppins tracking-wide">
              Virtueel Wandelen
            </h1>
            <h2 className="text-6xl font-semibold text-white mb-6 leading-tight font-poppins">
              Change your life
              <br />
              memories
            </h2>
            <p className="text-xl font-medium text-white mb-8 leading-relaxed font-poppins max-w-xl">
              Virtueel Walken brings the natural life to life and rustiness
              natural change videos for the outside world with denial.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/request-quote">
                <button className="cursor-pointer flex justify-center items-center gap-2 py-2 px-4 rounded-lg bg-[#a6a643] hover:bg-[#5B6502] meer_informatie text-white font-[Poppins] text-xl font-medium leading-[136%]">
                  Request for quote
                </button>
              </Link>
              <Link to="/subscribe">
                <button className="cursor-pointer text-[#A6A643] flex justify-center items-center gap-2 py-2 px-4 rounded-lg border-2 border-[#abb53b] hover:bg-[#ffffb6] font-[Poppins] text-xl font-medium leading-[136%]">
                  View subscription plans
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Center Content - Scroll Indicator */}
        <div className="w-full flex justify-center items-center absolute bottom-10 left-0">
          <div className="flex flex-col items-center space-y-4">
            {/* Microphone Icon */}
            <svg
              width={33}
              height={46}
              viewBox="0 0 33 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 16.5833C2 12.7156 3.53645 9.00626 6.27136 6.27136C9.00626 3.53645 12.7156 2 16.5833 2C20.4511 2 24.1604 3.53645 26.8953 6.27136C29.6302 9.00626 31.1667 12.7156 31.1667 16.5833V29.0833C31.1667 30.9984 30.7895 32.8948 30.0566 34.6641C29.3237 36.4335 28.2495 38.0411 26.8953 39.3953C25.5411 40.7495 23.9335 41.8237 22.1641 42.5566C20.3948 43.2895 18.4984 43.6667 16.5833 43.6667C14.6682 43.6667 12.7719 43.2895 11.0025 42.5566C9.2332 41.8237 7.62555 40.7495 6.27136 39.3953C4.91717 38.0411 3.84297 36.4335 3.11009 34.6641C2.37721 32.8948 2 30.9984 2 29.0833V16.5833Z"
                stroke="#EDE4DC"
                strokeWidth="3.125"
              />
              <path
                d="M13.4609 15.543C13.4609 14.7142 13.7902 13.9193 14.3762 13.3333C14.9623 12.7472 15.7571 12.418 16.5859 12.418C17.4147 12.418 18.2096 12.7472 18.7956 13.3333C19.3817 13.9193 19.7109 14.7142 19.7109 15.543V19.7096C19.7109 20.5384 19.3817 21.3333 18.7956 21.9193C18.2096 22.5054 17.4147 22.8346 16.5859 22.8346C15.7571 22.8346 14.9623 22.5054 14.3762 21.9193C13.7902 21.3333 13.4609 20.5384 13.4609 19.7096V15.543Z"
                stroke="#EDE4DC"
                strokeWidth="3.125"
              />
              <path
                d="M16.5859 2V12.4167"
                stroke="#EDE4DC"
                strokeWidth="3.125"
                strokeLinecap="round"
              />
            </svg>

            {/* Scroll Arrows */}
            <div className="flex flex-col space-y-1">
              <svg
                width={19}
                height={11}
                viewBox="0 0 19 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-100"
              >
                <path
                  d="M8.8457 9.00488L2.05762 2.14941L2.05176 2.15527L9.34375 9.52344L9.3457 9.52539L9.39844 9.56836C9.40219 9.57091 9.40631 9.57281 9.41016 9.5752L8.8457 9.00488ZM17.1152 2.15039L10.3262 9.00586L9.76855 9.56934C9.78748 9.55661 9.80588 9.54204 9.82227 9.52539L9.82422 9.52344L17.1201 2.15527L17.1152 2.15039Z"
                  fill="#381207"
                  stroke="#EDE4DC"
                  strokeWidth="2.08333"
                  className="animate-pulse"
                />
              </svg>
              <svg
                width={19}
                height={11}
                viewBox="0 0 19 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-70"
              >
                <path
                  d="M8.8457 9.00488L2.05762 2.14941L2.05176 2.15527L9.34375 9.52344L9.3457 9.52539L9.39844 9.56836C9.40219 9.57091 9.40631 9.57281 9.41016 9.5752L8.8457 9.00488ZM17.1152 2.15039L10.3262 9.00586L9.76855 9.56934C9.78748 9.55661 9.80588 9.54204 9.82227 9.52539L9.82422 9.52344L17.1201 2.15527L17.1152 2.15039Z"
                  fill="#381207"
                  stroke="#D9BBAA"
                  strokeWidth="2.08333"
                  className="animate-pulse"
                />
              </svg>
              <svg
                width={19}
                height={11}
                viewBox="0 0 19 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-40"
              >
                <path
                  d="M8.8457 9.00488L2.05762 2.14941L2.05176 2.15527L9.34375 9.52344L9.3457 9.52539L9.39844 9.56836C9.40219 9.57091 9.40631 9.57281 9.41016 9.5752L8.8457 9.00488ZM17.1152 2.15039L10.3262 9.00586L9.76855 9.56934C9.78748 9.55661 9.80588 9.54204 9.82227 9.52539L9.82422 9.52344L17.1201 2.15527L17.1152 2.15039Z"
                  fill="#381207"
                  stroke="#D9BBAA"
                  strokeWidth="2.08333"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Second Hero Section */}
      <div className="w-full bg-[#EDE4DC] py-16 lg:py-24 relative">
        {/* Message Us Component - Top Right Corner */}
        <div className="cursor-pointer absolute bottom-180 right-9 z-10">
          <MessageUs />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mt-3">
          {/* Subtitle */}
          <h2 className="text-xl lg:text-3xl xl:text-[32px] font-semibold text-[#A6A643] mb-8 font-[Poppins] ">
            Digital transformations in the Overijsselse nature
          </h2>

          {/* Main Description */}
          <p className="text-4xl justify-start text-[#381207] leading-relaxed mb-16 max-w-full mx-auto font-[Poppins] font-medium">
            Imagine: a forest walk, the rustling of leaves and singing birds.
            For people with dementia such a nature experience can mean a lot.
            Virtual Walking brings this experience close, right from home or a
            care facility. It offers peace, relaxation and recognition.
          </p>

          {/* Features Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-[#EDE4DC]">
                <img src={leaf} alt="Leaf" className="w-80 h-80" />
              </div>
              <h3 className="text-xl lg:text-2xl font-medium text-[#381207] font-poppins">
                Explore Overijssel's
                <br />
                Nature Videos
              </h3>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-[#EDE4DC]">
                <img src={click} alt="click" className="w-80 h-80" />
              </div>
              <h3 className="text-xl lg:text-2xl font-medium text-[#381207] font-poppins">
                Enjoy Unique & Simple <br /> Viewing
              </h3>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-[#EDE4DC]">
                <img src={human} alt="walk" className="w-80 h-80" />
              </div>
              <h3 className="text-xl lg:text-2xl font-medium text-[#381207] font-poppins">
                Watch Instantly with <br /> One Click
              </h3>
            </div>
          </div>
        </div>
      </div>
      <PreviewExperience />
      <DawnForest />

      {/* Discover Nature Videos Section */}
      <div className="flex-shrink-0 w-full min-h-[941px] bg-[#eeebc6] flex flex-col items-center justify-center py-16 px-4 sm:px-10 md:px-20">
        <div className="w-full mx-auto text-start">
          {/* Header Section */}
          <div className="mb-16">
            <div
              className="text-[#5b6502] font-['Poppins'] text-[32px] font-semibold leading-[136%] mb-4"
              style={{ letterSpacing: "-0.32px" }}
            >
              Discover Nature Videos
            </div>
            <div
              className="text-[#381207] font-['Poppins'] text-5xl lg:text-4xl font-semibold leading-[136%]"
              style={{ letterSpacing: "-0.48px" }}
            >
              Choose a route or season.
            </div>
          </div>

          {/* Video Grid - 2x2 Layout */}
          <div className="grid grid-cols-2 gap-6 lg:gap-8 mx-auto">
            {/* Video 1 - Mountain/Forest Scene */}
            <div
              className="relative w-full h-[250px] lg:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-200 via-green-200 to-gray-300 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #D3D3D3 100%)",
              }}
            >
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[65px] h-[65px] lg:w-[81px] lg:h-[81px] rounded-full bg-[#DD9219] bg-opacity-80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                  <svg
                    width={50}
                    height={50}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="lg:w-8 lg:h-8"
                  >
                    <path
                      d="M26 14.268C27.3333 15.0378 27.3333 16.9623 26 17.7321L10.5 26.9186C9.1667 27.6884 7.5 26.7261 7.5 25.1865V6.8135C7.5 5.2739 9.1667 4.3116 10.5 5.0814L26 14.268Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Volume Control */}
              <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 flex items-center justify-center p-2 h-8 w-8 lg:h-10 lg:w-10 rounded bg-white bg-opacity-50 backdrop-blur-sm">
                <svg
                  width={14}
                  height={10}
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:w-4 lg:h-3"
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
              className="relative w-full h-[250px] lg:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #DDA0DD 0%, #FFB6C1 50%, #FFDAB9 100%)",
              }}
            >
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[65px] h-[65px] lg:w-[81px] lg:h-[81px] rounded-full bg-[#DD9219] bg-opacity-80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                  <svg
                    width={28}
                    height={28}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="lg:w-8 lg:h-8"
                  >
                    <path
                      d="M26 14.268C27.3333 15.0378 27.3333 16.9623 26 17.7321L10.5 26.9186C9.1667 27.6884 7.5 26.7261 7.5 25.1865V6.8135C7.5 5.2739 9.1667 4.3116 10.5 5.0814L26 14.268Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Volume Control */}
              <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 flex items-center justify-center p-2 h-8 w-8 lg:h-10 lg:w-10 rounded bg-white bg-opacity-50 backdrop-blur-sm">
                <svg
                  width={14}
                  height={10}
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:w-4 lg:h-3"
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
              className="relative w-full h-[250px] lg:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-300 via-purple-200 to-pink-200 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #87CEFA 0%, #DDA0DD 50%, #FFB6C1 100%)",
              }}
            >
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[65px] h-[65px] lg:w-[81px] lg:h-[81px] rounded-full bg-[#DD9219] bg-opacity-80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                  <svg
                    width={28}
                    height={28}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="lg:w-8 lg:h-8"
                  >
                    <path
                      d="M26 14.268C27.3333 15.0378 27.3333 16.9623 26 17.7321L10.5 26.9186C9.1667 27.6884 7.5 26.7261 7.5 25.1865V6.8135C7.5 5.2739 9.1667 4.3116 10.5 5.0814L26 14.268Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Volume Control */}
              <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 flex items-center justify-center p-2 h-8 w-8 lg:h-10 lg:w-10 rounded bg-white bg-opacity-50 backdrop-blur-sm">
                <svg
                  width={14}
                  height={10}
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:w-4 lg:h-3"
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
              className="relative w-full h-[250px] lg:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-green-400 via-gray-200 to-white bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #228B22 0%, #D3D3D3 50%, #FFFFFF 100%)",
              }}
            >
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[65px] h-[65px] lg:w-[81px] lg:h-[81px] rounded-full bg-[#DD9219] bg-opacity-80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                  <svg
                    width={28}
                    height={28}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="lg:w-8 lg:h-8"
                  >
                    <path
                      d="M26 14.268C27.3333 15.0378 27.3333 16.9623 26 17.7321L10.5 26.9186C9.1667 27.6884 7.5 26.7261 7.5 25.1865V6.8135C7.5 5.2739 9.1667 4.3116 10.5 5.0814L26 14.268Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Volume Control */}
              <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 flex items-center justify-center p-2 h-8 w-8 lg:h-10 lg:w-10 rounded bg-white bg-opacity-50 backdrop-blur-sm">
                <svg
                  width={14}
                  height={10}
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:w-4 lg:h-3"
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
        </div>
      </div>

      {/* Positive Experiences Section */}
      <div className="w-full bg-[#EDE4DC] py-16 lg:py-24 px-4 sm:px-10 md:px-20">
        <div className="mx-auto">
          {/* Header Section */}
          <div className="text-left mb-16">
            <div className="text-[#A6A643] font-['Poppins'] text-xl lg:text-[32px] font-semibold mb-4">
              Positive Experiences
            </div>
            <h2 className="text-[#381207] font-['Poppins'] text-3xl lg:text-5xl xl:text-5xl font-bold leading-tight mb-8 text-left mx-auto">
              Virtueel Wandelen creates warm, <br /> positive moments for all.
            </h2>
            <button className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#A6A643] text-white font-['Poppins'] text-xl font-medium rounded-lg hover:bg-[#8a8f39] transition-all focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:ring-opacity-50">
              Watch Now
            </button>
          </div>

          {/* Three Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-8xl mx-auto">
            {/* Card 1 - Family Connection */}
            <div className="bg-[#f7f6f4] rounded-2xl p-8 flex flex-col text-left space-y-20 justify-end">
              <div className="">
                <svg
                  width={64}
                  height={64}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="items-left"
                >
                  <path
                    d="M53.3359 31.9987C53.3359 26.3407 51.0883 20.9145 47.0875 16.9138C43.0868 12.913 37.6606 10.6654 32.0026 10.6654C26.3447 10.6654 20.9184 12.913 16.9177 16.9138C12.9169 20.9145 10.6693 26.3407 10.6693 31.9987C10.6693 37.6566 12.9169 43.0829 16.9177 47.0836C20.9184 51.0844 26.3447 53.332 32.0026 53.332C37.6606 53.332 43.0868 51.0844 47.0875 47.0836C51.0883 43.0829 53.3359 37.6566 53.3359 31.9987ZM58.6693 31.9987C58.6693 39.0711 55.8598 45.8539 50.8588 50.8549C45.8578 55.8558 39.075 58.6654 32.0026 58.6654C28.5007 58.6654 25.0331 57.9756 21.7977 56.6355C18.5624 55.2954 15.6227 53.3311 13.1464 50.8549C8.14545 45.8539 5.33594 39.0711 5.33594 31.9987C5.33594 24.9263 8.14545 18.1435 13.1464 13.1425C18.1474 8.14155 24.9302 5.33203 32.0026 5.33203C35.5045 5.33203 38.9721 6.02179 42.2075 7.36191C45.4428 8.70204 48.3826 10.6663 50.8588 13.1425C53.335 15.6187 55.2993 18.5585 56.6394 21.7938C57.9795 25.0292 58.6693 28.4968 58.6693 31.9987ZM26.6693 25.332C26.6693 27.4654 24.8026 29.332 22.6693 29.332C20.5359 29.332 18.6693 27.4654 18.6693 25.332C18.6693 23.1987 20.5359 21.332 22.6693 21.332C24.8026 21.332 26.6693 23.1987 26.6693 25.332ZM45.3359 25.332C45.3359 27.4654 43.4693 29.332 41.3359 29.332C39.2026 29.332 37.3359 27.4654 37.3359 25.332C37.3359 23.1987 39.2026 21.332 41.3359 21.332C43.4693 21.332 45.3359 23.1987 45.3359 25.332ZM32.0026 45.9454C27.3359 45.9454 23.2293 43.9987 20.8293 41.1187L24.6159 37.332C25.8159 39.252 28.6693 40.612 32.0026 40.612C35.3359 40.612 38.1893 39.252 39.3893 37.332L43.1759 41.1187C40.7759 43.9987 36.6693 45.9454 32.0026 45.9454Z"
                    fill="#381207"
                  />
                </svg>
              </div>
              <div className="flex-grow flex flex-col justify-center space-y-4">
                <h3 className="text-[#381207] font-['Poppins'] text-2xl font-semibold">
                  Family Connection
                </h3>
                <p className="text-[#381207] font-['Poppins'] text-lg leading-relaxed">
                  Loved ones feel happier and more alert when watching together.
                </p>
              </div>
            </div>

            {/* Card 2 - Calm & Comfort */}
            <div className="bg-[#f7f6f4] rounded-2xl p-8 flex flex-col text-left space-y-12 justify-end">
              <div className="flex-shrink-0">
                <svg
                  width={64}
                  height={64}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="items-left"
                >
                  <path
                    d="M61.4571 30.4075C61.202 29.9593 60.8601 29.5664 60.4515 29.2518C60.0429 28.9371 59.5756 28.7071 59.0771 28.575C57.2686 28.1094 55.3996 27.9223 53.5346 28.02C54.5346 23.0575 53.7846 19.1325 53.0196 16.805C52.7147 15.8489 52.0646 15.0406 51.1962 14.5378C50.3277 14.0349 49.3031 13.8735 48.3221 14.085C45.7781 14.6514 43.3592 15.6783 41.1846 17.115C39.5918 13.8617 37.2731 11.0177 34.4071 8.8025C33.7126 8.28159 32.8678 8 31.9996 8C31.1314 8 30.2867 8.28159 29.5921 8.8025C26.7256 11.0171 24.4066 13.8612 22.8146 17.115C20.6401 15.6783 18.2211 14.6514 15.6771 14.085C14.6961 13.8735 13.6715 14.0349 12.8031 14.5378C11.9346 15.0406 11.2845 15.8489 10.9796 16.805C10.2296 19.1325 9.47962 23.055 10.4646 28.02C8.59965 27.9223 6.73068 28.1094 4.92212 28.575C4.42359 28.7071 3.95636 28.9371 3.54772 29.2518C3.13909 29.5664 2.79723 29.9593 2.54212 30.4075C2.27513 30.8666 2.10226 31.3744 2.03358 31.901C1.9649 32.4277 2.0018 32.9627 2.14212 33.475C2.98962 36.6175 5.59212 42.595 13.4746 47.305C21.3571 52.015 28.2821 52 32.0121 52C35.7421 52 42.6796 52 50.5121 47.305C58.3946 42.595 60.9971 36.6175 61.8446 33.475C61.9868 32.9636 62.0258 32.4289 61.9592 31.9023C61.8927 31.3756 61.722 30.8675 61.4571 30.4075ZM14.7846 18.035C14.7876 18.0226 14.7952 18.0118 14.8059 18.0048C14.8166 17.9979 14.8296 17.9952 14.8421 17.9975C17.1684 18.5228 19.3637 19.5154 21.2946 20.915C20.4155 23.7914 19.9789 26.7848 19.9996 29.7925C19.9996 34.4775 20.9421 38.2925 22.2771 41.3625C20.3793 39.4629 18.7371 37.3241 17.3921 35C12.8871 27.155 13.8246 21 14.7846 18.035ZM15.5346 43.8725C8.86712 39.8925 6.70462 35.0125 5.99962 32.425C7.83915 31.972 9.74802 31.8727 11.6246 32.1325C12.251 33.8107 13.0162 35.4338 13.9121 36.985C16.1119 40.7773 18.9936 44.1302 22.4121 46.875C19.9948 46.1798 17.6792 45.1703 15.5246 43.8725H15.5346ZM31.9996 47.6C29.6671 45.865 23.9996 40.5425 23.9996 29.7925C23.9996 19.175 29.5946 13.81 31.9996 12C34.4046 13.815 39.9996 19.18 39.9996 29.7975C39.9996 40.5425 34.3321 45.865 31.9996 47.6ZM42.7046 20.915C44.6358 19.5163 46.831 18.5245 49.1571 18C49.1697 17.9977 49.1826 18.0003 49.1933 18.0073C49.204 18.0143 49.2116 18.0251 49.2146 18.0375C50.1746 21 51.1121 27.155 46.6071 35C45.2634 37.3272 43.6212 39.4687 41.7221 41.37C43.0571 38.305 43.9996 34.485 43.9996 29.8C44.0211 26.7898 43.5844 23.7938 42.7046 20.915ZM57.9996 32.43C57.3071 34.9925 55.1496 39.8825 48.4771 43.8725C46.3224 45.1694 44.0068 46.1781 41.5896 46.8725C45.0081 44.1277 47.8899 40.7747 50.0896 36.9825C50.9856 35.4313 51.7507 33.8082 52.3771 32.13C54.2532 31.8716 56.1613 31.9725 57.9996 32.4275V32.43Z"
                    fill="#381207"
                  />
                </svg>
              </div>
              <div className="flex-grow flex flex-col justify-center space-y-4">
                <h3 className="text-[#381207] font-['Poppins'] text-2xl font-semibold">
                  Calm & Comfort
                </h3>
                <p className="text-[#381207] font-['Poppins'] text-lg leading-relaxed">
                  Caregivers notice a soothing effect for restless residents.
                </p>
              </div>
            </div>

            {/* Card 3 - Sharing Memories */}
            <div className="bg-[#f7f6f4] rounded-2xl p-8 flex flex-col text-left space-y-17 justify-end">
              <div className="flex-shrink-0">
                <svg
                  width={64}
                  height={64}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="items=left"
                >
                  <path
                    d="M24.0026 58.6654C23.2954 58.6654 22.6171 58.3844 22.117 57.8843C21.6169 57.3842 21.3359 56.7059 21.3359 55.9987V47.9987H10.6693C9.25478 47.9987 7.89823 47.4368 6.89803 46.4366C5.89784 45.4364 5.33594 44.0798 5.33594 42.6654V10.6654C5.33594 9.25088 5.89784 7.89432 6.89803 6.89413C7.89823 5.89393 9.25478 5.33203 10.6693 5.33203H53.3359C54.7504 5.33203 56.107 5.89393 57.1072 6.89413C58.1074 7.89432 58.6693 9.25088 58.6693 10.6654V42.6654C58.6693 44.0798 58.1074 45.4364 57.1072 46.4366C56.107 47.4368 54.7504 47.9987 53.3359 47.9987H37.0693L27.2026 57.892C26.6693 58.3987 26.0026 58.6654 25.3359 58.6654H24.0026ZM26.6693 42.6654V50.8787L34.8826 42.6654H53.3359V10.6654H10.6693V42.6654H26.6693Z"
                    fill="#381207"
                  />
                </svg>
              </div>
              <div className="flex-grow flex flex-col justify-center space-y-4">
                <h3 className="text-[#381207] font-['Poppins'] text-2xl font-semibold">
                  Sharing Memories
                </h3>
                <p className="text-[#381207] font-['Poppins'] text-lg leading-relaxed">
                  Residents enjoy spotting familiar scenes and telling stories.
                </p>
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
                  Discover Routes Near You
                </div>
                <div className="relative items-center text-white font-[Poppins] text-4xl lg:text-5xl font-semibold leading-tight max-w-[800px] pl-12">
                  Explore beautiful journeys from participating municipalities.
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
                Your Turn to Inspire – New Every Month!
              </div>

              <div className="space-y-4 max-w-[600px]">
                <div className="text-white/90 text-base font-['Poppins'] leading-relaxed">
                  Have a scenic or special route we haven't covered yet? <br />{" "}
                  Log in and submit your favorite – we might feature it in our
                  next video!
                </div>
                <div className="text-white/90 text-base font-['Poppins'] leading-relaxed">
                  We publish new videos and community-suggested routes every
                  month, <br /> so keep exploring and stay inspired.
                </div>
              </div>

              <button
                className="cursor-pointer inline-flex items-center px-4 py-2 rounded-lg bg-[#A6A643] text-white font-['Poppins'] text-xl font-medium hover:bg-[#5B6502] transition-all"
                onClick={() => (window.location.href = "/become-volunteer")}
              >
                Explore this feature
              </button>
            </div>
          </div>
        </div>
      </div>
      <RequestCard />

      {/* Organizations Section */}
      <div
        className={`flex flex-col justify-center items-center gap-12 p-20 w-full transition-all duration-500 ${
          activeTab === "organizations"
            ? "bg-[#1f1915]"
            : activeTab === "families"
            ? "bg-[#ede4dc]"
            : activeTab === "volunteer"
            ? "bg-[#1f1915]"
            : "bg-[#1f1915]"
        }`}
      >
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center gap-2 rounded-lg bg-[#f7f6f4]">
            <button
              onClick={() => setActiveTab("organizations")}
              className={`cursor-pointer flex justify-center items-center gap-2.5 py-2 px-4 rounded-lg font-['Poppins'] text-2xl leading-[136%] transition-all ${
                activeTab === "organizations"
                  ? "bg-[#5b6502] text-white"
                  : "bg-[#f7f6f4] text-[#4b4741] hover:bg-[#e5e3df]"
              }`}
            >
              Organizations
            </button>
            <button
              onClick={() => setActiveTab("families")}
              className={`cursor-pointer flex justify-center items-center gap-2.5 py-2 px-4 rounded-lg font-['Poppins'] text-2xl leading-[136%] transition-all ${
                activeTab === "families"
                  ? "bg-[#5b6502] text-white"
                  : "bg-[#f7f6f4] text-[#4b4741] hover:bg-[#e5e3df]"
              }`}
            >
              Families
            </button>
            <button
              onClick={() => setActiveTab("volunteer")}
              className={`cursor-pointer flex justify-center items-center gap-2.5 py-2 px-4 rounded-lg font-['Poppins'] text-2xl leading-[136%] transition-all ${
                activeTab === "volunteer"
                  ? "bg-[#5b6502] text-white"
                  : "bg-[#f7f6f4] text-[#4b4741] hover:bg-[#e5e3df]"
              }`}
            >
              Volunteer
            </button>
          </div>
        </div>
        <div className="flex justify-center items-start gap-12 h-[810px]">
          <div className="flex flex-col items-start gap-10">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col items-start gap-4">
                <div className="text-[#a6a643] font-['Poppins'] text-[2rem] font-semibold leading-[136%]">
                  {activeTab === "organizations" &&
                    "Virtual Walking for Organizations"}
                  {activeTab === "families" && "Virtual Walking at Home"}
                  {activeTab === "volunteer" &&
                    "Virtual Walking as a Volunteer"}
                </div>
                <div className="w-[431px] text-white font-['Poppins'] text-5xl font-semibold leading-[136%]">
                  {activeTab === "organizations" &&
                    "Calm moments, shared together."}
                  {activeTab === "volunteer" && "Share walks, spread joy."}
                </div>
                <div className="w-[431px] text-[#381207] font-['Poppins'] text-5xl font-semibold leading-[136%]">
                  {activeTab === "families" &&
                    "Nature’s beauty, just a click away."}
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 self-stretch">
                {activeTab === "organizations" && (
                  <>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-white font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Request a Quote Easily{" "}
                        </span>
                        Quick form for pricing, customization, and our personal
                        visit.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-white font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Promotes Well-Being{" "}
                        </span>
                        Calming effect for restlessness, encouraging peaceful
                        moments.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-white font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Encourages Connection{" "}
                        </span>
                        Inspires conversation between residents and caregivers.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-white font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Flexible Access{" "}
                        </span>
                        Works seamlessly on tablets, laptops, and large shared
                        screens.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 self-stretch border-b-[0.5px] border-b-[#e5e3df]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-white font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Simple Onboarding{" "}
                        </span>
                        Minimal admin setup and full guidance during start-up.
                      </div>
                    </div>
                  </>
                )}
                {activeTab === "families" && (
                  <>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#7A756E]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-[#381207] font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Affordable Subscription{" "}
                        </span>
                        Enjoy unlimited access for only €12.99/month.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#7A756E]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-[#381207] font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          100+ Scenic Videos{" "}
                        </span>
                        Explore Overijssel, with fresh walks every month.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#7A756E]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-[#381207] font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          Personal Touch{" "}
                        </span>
                        Request us to capture your favorite walking route.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#7A756E]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-[#381207] font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          Real Impact{" "}
                        </span>
                        Caregivers share stories of joy and relaxation.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#7A756E]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-[#381207] font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Simple & Instant{" "}
                        </span>
                        Nature at home with just a single button press.
                      </div>
                    </div>
                  </>
                )}
                {activeTab === "volunteer" && (
                  <>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-white font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Grow the Collection{" "}
                        </span>
                        Your walks help our library expand each week.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-white font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Film with Support{" "}
                        </span>
                        We set up the camera and guide your filming.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-white font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Walk Together{" "}
                        </span>
                        Alone on the path, but part of a bigger community.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-white font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Find Recognition{" "}
                        </span>
                        More videos mean more smiles and shared moments.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-b-[0.5px] border-b-[#e5e3df]">
                      <div className="flex items-center gap-2.5 pb-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                            fill="#A6A643"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-0 pb-2 w-[524px] h-[5.0625rem] text-white font-['Poppins'] text-base leading-[136%]">
                        <span className="text-[#a6a643] text-[24px] font-semibold pb-4">
                          {" "}
                          Find Recognition{" "}
                        </span>
                        More videos mean more smiles and shared moments.
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Link
              to={
                activeTab === "organizations"
                  ? "/request-quote"
                  : activeTab === "families"
                  ? "/subscribe"
                  : "/volunteer-signup"
              }
            >
              <div className="cursor-pointer hover:bg-[#5B6502] flex justify-center items-center gap-2 py-2 px-4 rounded-lg bg-[#a6a643] meer_informatie text-white font-['Poppins'] text-xl font-medium leading-[136%]">
                {activeTab === "organizations" && "Get a Quote"}
                {activeTab === "families" && "Subscribe Now"}
                {activeTab === "volunteer" && "Join as Volunteer"}
              </div>
            </Link>
          </div>
          <div className="self-stretch w-[508px] bg-gray-300 rounded-lg flex items-center justify-center">
            {activeTab === "organizations" && (
              <img
                src={wheelchair}
                alt="Virtual walking for organizations"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {activeTab === "families" && (
              <img
                src={walking}
                alt="Virtual Walking at Home"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {activeTab === "volunteer" && (
              <img
                src={camera}
                alt="Virtual Walking as a Volunteer"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </div>

      {/* Tina Section */}
      <div className="w-full bg-[#ede4dc] py-16 lg:py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="bg-white rounded-2xl p-8 lg:p-18 max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-[#a6a643] font-['Poppins'] text-3xl lg:text-2xl font-semibold">
                    Tina - Founder of Virtual Walking.
                  </h3>
                  <blockquote className="text-[#381207] font-['Poppins'] text-xl lg:text-2xl font-normal leading-relaxed w-xl text-justify">
                    "Together – with informal caregivers, care organizations and
                    volunteers – we bring nature to life for everyone who can no
                    longer visit it themselves."
                  </blockquote>
                </div>
                <button className="cursor-pointer px-4 py-2 bg-[#a6a643] text-white font-['Poppins'] text-xl font-medium rounded-lg transition-all hover:bg-[#8a8f39] focus:outline-none focus:ring-2 focus:ring-[#a6a643] focus:ring-opacity-50">
                  Read more about Tina
                </button>
              </div>

              {/* Right Image */}
              <div className="flex justify-center lg:justify-end">
                <img
                  src={girl}
                  alt="Tina"
                  className="w-full max-w-sm h-auto rounded-lg"
                />
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
