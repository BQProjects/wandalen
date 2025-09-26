import React, { useState, useEffect } from "react";
import { MapPin, Clock, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Testimonial from "../../components/common/TestimonialScroll";
import Footer from "../../components/Footer";
import SubscribeCard from "../../components/SubscribeCard";
import FaqQuestionsVolunteer from "../../components/volunteer/FaqQuestionsVolunteer";

const Training = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [training, setTraining] = useState(null);

  useEffect(() => {
    fetchTraining();
  }, [location.pathname]);

  const fetchTraining = async () => {
    try {
      const response = await fetch("/api/admin/trainings");
      if (!response.ok) throw new Error("Failed to fetch trainings");
      const data = await response.json();
      let filter = "";
      if (location.pathname === "/video-training") {
        filter = "video training";
      } else if (location.pathname === "/camera-tips") {
        filter = "camera";
      } else if (location.pathname === "/nature-walking") {
        filter = "nature";
      }
      const selectedTraining = data.find((t) =>
        t.title.toLowerCase().includes(filter)
      );
      setTraining(selectedTraining);
    } catch (error) {
      console.error("Error fetching training:", error);
    }
  };

  if (!training) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      {/* Hero Section */}
      <section className="bg-[#2a341f] h-[86vh] text-white px-4 py-16 flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center mt-20 mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#a6a643] mb-6 font-['Poppins']">
            {t("videoTraining.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl font-medium font-['Poppins'] max-w-4xl mx-auto leading-relaxed">
            {t("videoTraining.hero.description")}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-col mx-auto">
        <div className="max-w-7xl mx-auto p-16 w-full">
          <div className="flex flex-col items-start gap-2 mb-5 px-2">
            <h2 className="text-[#a6a643] text-3xl font-semibold leading-tight font-['Poppins']">
              {training.title}
            </h2>
            <h3 className="text-[#381207] text-5xl font-semibold leading-tight font-['Poppins']">
              {new Date(training.date).toLocaleDateString()}
            </h3>
          </div>
          {/* Event Details Grid */}
          <div className="grid lg:grid-cols-3 gap-6 pt-5 pb-5 bg-[#f7f6f4] rounded-2xl px-4 md:px-6">
            {/* Content Section */}
            <div className="lg:col-span-2 rounded-2xl p-6 md:p-8">
              <div className="mb-6 md:mb-8">
                <h3 className="text-[#dd9219] text-xl md:text-2xl lg:text-3xl font-semibold mb-4 font-['Poppins']">
                  {t("videoTraining.whatToExpect.title")}
                </h3>
                <div className="text-[#381207] text-base md:text-lg space-y-3 font-['Poppins']">
                  {t("videoTraining.whatToExpect.items", {
                    returnObjects: true,
                  }).map((item, index) => (
                    <p key={index}>• {item}</p>
                  ))}
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <h3 className="text-[#dd9219] text-xl md:text-2xl lg:text-3xl font-semibold mb-4 font-['Poppins']">
                  {t("videoTraining.whyJoin.title")}
                </h3>
                <p className="text-[#381207] text-base md:text-lg leading-relaxed font-['Poppins']">
                  {t("videoTraining.whyJoin.description")}
                </p>
              </div>
              <button
                onClick={() => (window.location.href = "/volunteer-signup")}
                className="bg-[#a6a643] text-white px-4 md:px-8 py-2 rounded-lg text-lg md:text-xl font-medium hover:bg-[#8d8f37] transition-colors duration-300 font-['Poppins']"
              >
                {t("videoTraining.signupButton")}
              </button>
            </div>

            {/* Practical Information Sidebar */}
            <div className="bg-[#381207] rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-[#dd9219] text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8 font-['Poppins']">
                {t("videoTraining.practicalInfo.title")}
              </h3>

              <div className="space-y-6 md:space-y-8">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#ede4dc] w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#ede4dc] text-lg md:text-xl font-semibold mb-1 font-['Poppins']">
                      {t("videoTraining.practicalInfo.location.title")}
                    </h4>
                    <p className="text-[#ede4dc] text-base md:text-lg font-['Poppins']">
                      {training.location}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-4">
                  <Clock className="text-[#ede4dc] w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#ede4dc] text-lg md:text-xl font-semibold mb-1 font-['Poppins']">
                      {t("videoTraining.practicalInfo.time.title")}
                    </h4>
                    <p className="text-[#ede4dc] text-base md:text-lg font-['Poppins']">
                      {training.timing}
                    </p>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="flex items-start gap-4">
                  <Users className="text-[#ede4dc] w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#ede4dc] text-lg md:text-xl font-semibold mb-1 font-['Poppins']">
                      {t("videoTraining.practicalInfo.audience.title")}
                    </h4>
                    <p className="text-[#ede4dc] text-base md:text-lg font-['Poppins']">
                      {training.audience}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FaqQuestionsVolunteer />
        <Testimonial />
        <SubscribeCard />
      </div>
      <Footer />
    </div>
  );
};

export default Training;
