import { React, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Background2 from "../../assets/Background2.png";
import HoldHands from "../../assets/HoldHands.png";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";

function RoutesNearYou() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");

  const [formData, setFormData] = useState({
    email: "",
    location: "",
    link: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${DATABASE_URL}/client/request-video`,
        {
          email: formData.email,
          location: formData.location,
          link: formData.link || undefined,
        },
        {
          headers: { Authorization: `Bearer ${sessionId}` },
        }
      );

      if (response.status === 201) {
        setMessage(t("dawnForest.discoverRoutes.successMessage"));
        setFormData({ email: "", location: "", link: "" });
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setMessage(t("dawnForest.discoverRoutes.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
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
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-end gap-8 lg:gap-20 p-6 lg:p-10 rounded-2xl bg-white">
              <div className="flex flex-col items-start gap-10 w-full lg:flex-1">
                <div className="self-stretch text-[#381207] font-['Poppins'] text-xl font-medium leading-[normal]">
                  {t("dawnForest.discoverRoutes.formTitle")}
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-center items-end gap-5 w-full"
                >
                  <div className="flex flex-col items-start gap-2 w-full">
                    <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                      {t("dawnForest.discoverRoutes.emailLabel")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t(
                        "dawnForest.discoverRoutes.emailPlaceholder"
                      )}
                      required
                      className="w-full p-3 border border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] font-['Poppins'] text-[#381207]"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-full">
                    <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                      {t("dawnForest.discoverRoutes.locationLabel")}
                    </label>
                    <textarea
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder={t(
                        "dawnForest.discoverRoutes.locationPlaceholder"
                      )}
                      required
                      rows={4}
                      className="w-full p-3 border border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] font-['Poppins'] text-[#381207] resize-none"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-full">
                    <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                      {t("dawnForest.discoverRoutes.linkLabel")}
                    </label>
                    <input
                      type="url"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      placeholder={t(
                        "dawnForest.discoverRoutes.linkPlaceholder"
                      )}
                      className="w-full p-3 border border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] font-['Poppins'] text-[#381207]"
                    />
                  </div>
                  {message && (
                    <div
                      className={`w-full p-3 rounded-lg font-['Poppins'] text-center ${
                        message ===
                        t("dawnForest.discoverRoutes.successMessage")
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-2.5 w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 rounded-lg bg-[#5b6502] text-white font-['Poppins'] font-medium hover:bg-[#4a5202] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : t("dawnForest.discoverRoutes.submitButton")}
                    </button>
                  </div>
                </form>
              </div>
              {/* Image Section */}
              <div className="flex-shrink-0 w-full max-w-sm mx-auto lg:mx-0 lg:w-[300px] h-[250px] sm:h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
                <img
                  src={HoldHands}
                  alt={t("subscribeCard.imageAlt")}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoutesNearYou;
