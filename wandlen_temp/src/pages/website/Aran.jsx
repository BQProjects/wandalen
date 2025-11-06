import React, { useState, useRef, useEffect } from "react";
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
import ScrollingTestimonials from "../../components/ScrollingTestimonials";

const MessageUs = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: t("aran.chat.greeting"),
    },
  ]);
  const [currentNode, setCurrentNode] = useState("start");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const chatFlow = {
    start: {
      message: t("aran.chat.greeting"),
      options: [
        { label: t("aran.chat.menu.aboutVW"), next: "q1" },
        { label: t("aran.chat.menu.login"), next: "login" },
        { label: t("aran.chat.menu.usage"), next: "usage" },
        { label: t("aran.chat.menu.pricing"), next: "pricing" },
        { label: t("aran.chat.menu.support"), next: "support" },
        { label: t("aran.chat.menu.contact"), next: "contact" },
      ],
    },
    q1: {
      message: t("aran.chat.aboutVW.message"),
      options: [
        { label: t("aran.chat.aboutVW.forWhom"), next: "q4" },
        { label: t("aran.chat.aboutVW.newVideos"), next: "q5" },
        { label: t("aran.chat.aboutVW.whatsDifferent"), next: "q3_diff" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    login: {
      message: t("aran.chat.login.message"),
      options: [
        { label: t("aran.chat.login.howToLogin"), next: "q2" },
        { label: t("aran.chat.login.forgotPassword"), next: "q6" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q2: {
      message: t("aran.chat.login.loginSteps"),
      options: [
        { label: t("aran.chat.login.forgotPassword") + "?", next: "q6" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q6: {
      message: t("aran.chat.login.forgotPasswordSteps"),
      options: [
        { label: t("aran.chat.login.howToLogin") + "?", next: "q2" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    usage: {
      message: t("aran.chat.usage.message"),
      options: [
        { label: t("aran.chat.usage.whatsDifferent"), next: "q3_diff" },
        { label: t("aran.chat.usage.worksOnTV"), next: "q7" },
        { label: t("aran.chat.usage.homeUse"), next: "q8" },
        { label: t("aran.chat.usage.beleefbox"), next: "q9" },
        { label: t("aran.chat.menu.moreOptions"), next: "usage2" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    usage2: {
      message: t("aran.chat.usage.message2"),
      options: [
        { label: t("aran.chat.usage.howToUseBeleefbox"), next: "q10" },
        { label: t("aran.chat.usage.requestWalk"), next: "q11" },
        { label: t("aran.chat.usage.activities"), next: "q12" },
        { label: t("aran.chat.usage.dementiaTips"), next: "q13" },
        { label: t("aran.chat.usage.videoLength"), next: "q14" },
        { label: t("aran.chat.usage.multipleViewers"), next: "q15" },
        { label: t("aran.chat.menu.back"), next: "usage" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q3_diff: {
      message: t("aran.chat.usage.differentMessage"),
      options: [
        { label: t("aran.chat.aboutVW.forWhom"), next: "q4" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q7: {
      message: t("aran.chat.usage.tvMessage"),
      options: [
        { label: t("aran.chat.support.browsers"), next: "q18" },
        { label: t("aran.chat.actions.moreUsageQuestions"), next: "usage" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q8: {
      message: t("aran.chat.usage.homeUseMessage"),
      options: [
        { label: t("aran.chat.actions.aboutPricing"), next: "pricing" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q9: {
      message: t("aran.chat.usage.beleefboxMessage"),
      options: [
        { label: t("aran.chat.actions.howToUseBox"), next: "q10" },
        { label: t("aran.chat.actions.moreUsageQuestions"), next: "usage" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q10: {
      message: t("aran.chat.usage.howToUseBeleefboxMessage"),
      options: [
        { label: t("aran.chat.usage.beleefbox") + "?", next: "q9" },
        { label: t("aran.chat.actions.moreUsageQuestions"), next: "usage2" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q11: {
      message: t("aran.chat.usage.requestWalkMessage"),
      options: [
        { label: t("aran.chat.actions.moreUsageQuestions"), next: "usage2" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q12: {
      message: t("aran.chat.usage.activitiesMessage"),
      options: [
        { label: t("aran.chat.usage.dementiaTips") + "?", next: "q13" },
        { label: t("aran.chat.actions.moreUsageQuestions"), next: "usage2" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q13: {
      message: t("aran.chat.usage.dementiaTipsMessage"),
      options: [
        { label: t("aran.chat.target.aboutVW") + "?", next: "q4" },
        { label: t("aran.chat.actions.moreUsageQuestions"), next: "usage2" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q14: {
      message: t("aran.chat.usage.videoLengthMessage"),
      options: [
        { label: t("aran.chat.aboutVW.newVideos") + "?", next: "q5" },
        { label: t("aran.chat.actions.moreUsageQuestions"), next: "usage2" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q15: {
      message: t("aran.chat.usage.multipleViewersMessage"),
      options: [
        { label: t("aran.chat.usage.worksOnTV") + "?", next: "q7" },
        { label: t("aran.chat.actions.moreUsageQuestions"), next: "usage2" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    pricing: {
      message: t("aran.chat.pricing.message"),
      options: [
        { label: t("aran.chat.pricing.organizations"), next: "q19" },
        { label: t("aran.chat.pricing.requestQuote"), next: "offer" },
        { label: t("aran.chat.pricing.homeSubscription"), next: "q8" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q19: {
      message: t("aran.chat.pricing.organizationsMessage"),
      options: [
        { label: t("aran.chat.pricing.requestQuote"), next: "offer" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    offer: {
      message: t("aran.chat.pricing.requestQuoteMessage"),
      options: [
        { label: t("aran.chat.pricing.organizations") + "?", next: "q19" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    support: {
      message: t("aran.chat.support.message"),
      options: [
        { label: t("aran.chat.support.videoNotStarting"), next: "q16" },
        { label: t("aran.chat.support.needInternet"), next: "q17" },
        { label: t("aran.chat.support.browsers"), next: "q18" },
        { label: t("aran.chat.support.contact"), next: "contact" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q16: {
      message: t("aran.chat.support.videoNotStartingMessage"),
      options: [
        { label: t("aran.chat.support.browsers") + "?", next: "q18" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q17: {
      message: t("aran.chat.support.needInternetMessage"),
      options: [
        { label: t("aran.chat.support.technicalProblems"), next: "support" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q18: {
      message: t("aran.chat.support.browsersMessage"),
      options: [
        { label: t("aran.chat.support.videoNotStarting") + "?", next: "q16" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q4: {
      message: t("aran.chat.target.message"),
      options: [
        { label: t("aran.chat.target.dementiaTips"), next: "q13" },
        { label: t("aran.chat.target.aboutVW"), next: "q1" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    q5: {
      message: t("aran.chat.newVideos.message"),
      options: [
        { label: t("aran.chat.newVideos.requestWalk"), next: "q11" },
        { label: t("aran.chat.newVideos.videoLength"), next: "q14" },
        { label: t("aran.chat.menu.backToMenu"), next: "start" },
      ],
    },
    contact: {
      message: t("aran.chat.contact.message"),
      options: [{ label: t("aran.chat.menu.backToMenu"), next: "start" }],
    },
  };

  // Scroll chat to bottom automatically
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update first message when language changes
  useEffect(() => {
    setMessages([
      {
        type: "bot",
        text: t("aran.chat.greeting"),
      },
    ]);
    setCurrentNode("start");
  }, [i18n.language, t]);

  const handleOptionClick = (option) => {
    const next = chatFlow[option.next];
    setMessages((prev) => [...prev, { type: "user", text: option.label }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: next.message }]);
      setCurrentNode(option.next);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50-[1000]">
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
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 sm:mb-4 ${
                    msg.type === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`flex items-start ${
                      msg.type === "user" ? "justify-end" : ""
                    }`}
                  >
                    <div
                      className={`p-2 sm:p-3 rounded-lg max-w-xs ${
                        msg.type === "bot"
                          ? "bg-secondary text-black"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p className="text-xs sm:text-sm whitespace-pre-line">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-start">
                    <div className="bg-secondary text-black p-2 sm:p-3 rounded-lg max-w-xs">
                      <p className="text-xs sm:text-sm animate-pulse">
                        {t("aran.chat.typing")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 sm:p-4 border-t border-gray-300 bg-white flex flex-wrap gap-2">
              {chatFlow[currentNode].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className="bg-secondary text-black text-xs px-2 py-1 rounded-lg hover:bg-[#4a5501] transition"
                >
                  {opt.label}
                </button>
              ))}
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

  const brands = [
    { src: "/brand1.svg", alt: "NOS", url: "https://nos.nl" },
    {
      src: "/Brand2.png",
      alt: "Vroege Vogels",
      url: "https://www.bnnvara.nl/vroegevogels",
    },
    { src: "/brand3.svg", alt: "NPO Radio 5", url: "https://www.nporadio5.nl" },
    { src: "/brand4.svg", alt: "De Stentor", url: "https://www.destentor.nl" },
    { src: "/brand5.svg", alt: "rtv Oost", url: "https://www.oost.nl/" },
    { src: "/brand6.svg", alt: "Tubantia", url: "https://www.tubantia.nl" },
    { src: "/brand7.svg", alt: "NPO Radio 1", url: "https://www.nporadio1.nl" },
  ];

  const duplicatedBrands = [...brands, ...brands];
  return (
    <>
      <style>{`.scroll-wrapper::-webkit-scrollbar { display: none; }
.scroll-wrapper { overflow: hidden; }
.scroll-track { display: flex; width: 200%; align-items: center; }
.scroll-item { flex: 0 0 auto; }
.scroll-track img { display: block; }
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-scroll {
  animation: scroll 35s linear infinite;
  will-change: transform;
}`}</style>
      {/* Main Section */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[86vh] bg-cover bg-center bg-no-repeat overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0 bg-[#2A341F]"
          src="/NewBgVideo.mp4"
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
      <div className="border-1 border-[#A6A09A]" />
      {/* Discover Nature Videos Section */}
      <div className="flex-shrink-0 w-full min-h-[600px] md:min-h-[800px] lg:min-h-[941px] bg-[#EDE4DC] flex flex-col items-center justify-center py-10 sm:py-12 md:py-16 px-4 sm:px-10 md:px-20">
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
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[320px] rounded-2xl overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/1125835751?h=cb1c1b43cb&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameborder="0"
                className="w-full h-full absolute inset-0 rounded-2xl"
                referrerpolicy="strict-origin-when-cross-origin"
                title="Video 1 homepage: titel under: Lemelerberg in de  winter"
              ></iframe>
            </div>

            {/* Video 2 - Purple Lavender Scene */}
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[320px] rounded-2xl overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/1125836067?h=b385661387&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameborder="0"
                className="w-full h-full absolute inset-0 rounded-2xl"
                referrerpolicy="strict-origin-when-cross-origin"
                title="Video 2 homepage: De IJssel over bij Den Nul"
              ></iframe>
            </div>

            {/* Video 3 - Ocean Sunset Scene */}
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[320px] rounded-2xl overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/1125836341?h=3c53c14e8c&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameborder="0"
                className="w-full h-full absolute inset-0 rounded-2xl"
                referrerpolicy="strict-origin-when-cross-origin"
                title="Video 3 homepage: title: Koeien kijken op het Boetelerveld"
              ></iframe>
            </div>

            {/* Video 4 - Winter Forest Scene */}
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[320px] rounded-2xl overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/1125836865?h=1976cd5af1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameborder="0"
                className="w-full h-full absolute inset-0 rounded-2xl"
                referrerpolicy="strict-origin-when-cross-origin"
                title="Video 4 homepage: Een zomerse wandeling over de heide"
              ></iframe>
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

      <DawnForest />

      {/* Impact Counters Section */}
      <div className="flex flex-shrink-0 flex-col justify-center items-center w-full min-h-[564px] bg-[#ede4dc] py-10 sm:py-12 md:py-16 px-4 sm:px-10 md:px-20">
        <div className="mb-10">
          <div className="text-[#A6A643] font-['Poppins'] text-3xl sm:text-4xl font-semibold leading-[160%] mb-8">
            {t("impactCounters.title")}
          </div>
          <div className="text-[#381207] font-['Poppins'] text-4xl sm:text-5xl font-semibold leading-[136%]">
            Our nature walks are widely shared — in newspapers, on radio and TV,
            and online.
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap justify-center items-center w-full gap-4">
            <div className="inline-flex flex-col flex-shrink-0 justify-center items-center gap-2 pt-4 pb-6 px-6 h-[10.375rem] w-[300px] rounded-2xl bg-[#F7F6F4]">
              <div className="text-[#a6a643] text-center font-['Poppins'] text-4xl sm:text-5xl font-semibold leading-[136%]">
                90+
              </div>
              <div className="text-[#2a341f] text-center font-['Poppins'] text-base sm:text-lg leading-[136%]">
                {t("impactCounters.natureVideos")}
              </div>
            </div>
            <div className="inline-flex flex-col flex-shrink-0 justify-center items-center gap-2 pt-4 pb-6 px-6 h-[10.375rem] w-[300px] rounded-2xl bg-[#F7F6F4]">
              <div className="text-[#a6a643] text-center font-['Poppins'] text-4xl sm:text-5xl font-semibold leading-[136%]">
                450+
              </div>
              <div className="text-[#2a341f] text-center font-['Poppins'] text-base sm:text-lg leading-[136%]">
                {t("impactCounters.virtualKm")}
              </div>
            </div>
            <div className="inline-flex flex-col flex-shrink-0 justify-center items-center gap-2 pt-4 pb-6 px-6 h-[10.375rem] w-[300px] rounded-2xl bg-[#F7F6F4]">
              <div className="text-[#a6a643] text-center font-['Poppins'] text-4xl sm:text-5xl font-semibold leading-[136%]">
                20+
              </div>
              <div className="text-[#2a341f] text-center font-['Poppins'] text-base sm:text-lg leading-[136%]">
                {t("impactCounters.volunteerFilmmakers")}
              </div>
            </div>
            <div className="inline-flex flex-col flex-shrink-0 justify-center items-center gap-2 pt-4 pb-6 px-6 h-[10.375rem] w-[300px] rounded-2xl bg-[#F7F6F4]">
              <div className="text-[#a6a643] text-center font-['Poppins'] text-4xl sm:text-5xl font-semibold leading-[136%]">
                240+
              </div>
              <div className="text-[#2a341f] text-center font-['Poppins'] text-base sm:text-lg leading-[136%]">
                {t("impactCounters.uniqueRoutes")}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Brand Images Scrolling Row */}
      <div className="w-full py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="w-[95%] mx-auto overflow-hidden scroll-wrapper">
          <div className="scroll-track animate-scroll gap-6 sm:gap-8 lg:gap-12">
            {duplicatedBrands.map((brand, index) => (
              <div
                key={index}
                className="flex justify-center items-center flex-shrink-0 scroll-item"
              >
                <a href={brand.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="w-[200px] h-[120px] object-contain"
                  />
                </a>
              </div>
            ))}
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

      {/* Positive Experiences Section */}
      <div className="w-full bg-[#EDE4DC] py-10 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-10 md:px-20">
        <div className="mx-auto">
          {/* Header Section */}
          <div className="text-left">
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
        </div>
      </div>

      <ScrollingTestimonials />

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
                <div className="relative items-center text-[#a6a643] font-[Poppins] text-[32px] font-semibold mb-4 tracking-tight">
                  {t("dawnForest.discoverRoutes.title")}
                </div>
                <div className="relative items-center text-white font-[Poppins] text-4xl lg:text-5xl font-semibold leading-tight max-w-[800px]">
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

      <PreviewExperience />

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
