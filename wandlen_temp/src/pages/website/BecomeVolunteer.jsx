import React, { useState, useEffect, useContext } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import PositiveImage from "../../assets/PositiveImage.jpg";
import VideoTraning from "../../assets/VideoTraning.png";
import CameraTips from "../../assets/CameraTips.png";
import NatureWalk from "../../assets/NatureWalk.png";
import VolunteerAction from "../../assets/VolunteerAction.jpg";
import FaqQuestionsVolunteer from "../../components/volunteer/FaqQuestionsVolunteer";
import Testimonial from "../../components/common/TestimonialScroll";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";

const BecomeVolunteer = () => {
  const { t } = useTranslation();
  const [trainings, setTrainings] = useState([]);
  const { DATABASE_URL } = useContext(DatabaseContext);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}/admin/trainings`);
      const data = response.data;
      setTrainings(data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  const getImageForTitle = (title) => {
    if (title.toLowerCase().includes("video training")) return VideoTraning;
    if (title.toLowerCase().includes("camera")) return CameraTips;
    if (title.toLowerCase().includes("nature")) return NatureWalk;
    return VideoTraning; // default
  };

  const getLinkForTitle = (training) => {
    return `/training/${training._id}`;
  };
  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="bg-dark-green h-[86vh] text-white px-4 py-16 flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center mt-20 mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-6 font-['Poppins']">
            {t("becomeVolunteer.hero.title")}
          </h1>
          <p className="text-xl md:text-3xl font-medium font-['Poppins'] max-w-4xl mx-auto leading-relaxed space-x-1">
            {t("becomeVolunteer.hero.description")}
          </p>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="bg-secondary px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-primary font-['Poppins'] text-2xl font-semibold mb-2">
                {t("becomeVolunteer.howItWorks.title")}
              </p>
              <h2 className="text-4xl md:text-5xl font-['Poppins'] font-semibold text-brown">
                {t("becomeVolunteer.howItWorks.subtitle")}
              </h2>
            </div>
            <button
              className="bg-[#a6a643] hover:bg-[#8f8f3d] font-['Poppins'] text-white px-4 py-2 rounded-lg text-lg font-medium transition-colors hidden lg:block"
              onClick={() => (window.location.href = "/volunteer-signup")}
            >
              {t("becomeVolunteer.howItWorks.knowMore")}
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t("becomeVolunteer.howItWorks.steps", { returnObjects: true }).map(
              (step, index) => (
                <div
                  key={index}
                  className="bg-[#f7f6f4] rounded-2xl p-8 space-y-6"
                >
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-brown text-3xl font-['Poppins'] font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-brown text-2xl font-['Poppins'] font-medium">
                      {step.title}
                    </h3>
                    <p className="text-brown font-['Poppins'] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="bg-dark-green text-white px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-primary font-['Poppins'] text-2xl font-semibold mb-2">
                  {t("becomeVolunteer.benefits.title")}
                </p>
                <h2 className="text-4xl md:text-5xl font-['Poppins'] font-semibold mb-8">
                  {t("becomeVolunteer.benefits.subtitle")}
                </h2>
              </div>

              <div className="space-y-6">
                {t("becomeVolunteer.benefits.benefits", {
                  returnObjects: true,
                }).map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 py-3 border-b border-border/20"
                  >
                    <Check
                      className="text-primary mt-1 flex-shrink-0"
                      size={24}
                    />
                    <p className="text-lg leading-relaxed font-['Poppins']">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  className="bg-[#a6a643] hover:bg-[#8f8f3d] text-white font-['Poppins'] px-4 py-2 rounded-lg text-lg font-medium transition-colors"
                  onClick={() => (window.location.href = "/volunteer-signup")}
                >
                  {t("becomeVolunteer.benefits.joinVolunteer")}
                </button>
                <button
                  className="bg-[#a6a643] hover:bg-[#8f8f3d] text-white font-['Poppins'] px-4 py-2 rounded-lg text-lg font-medium transition-colors"
                  onClick={() => (window.location.href = "/login")}
                >
                  {t("becomeVolunteer.benefits.alreadyVolunteer")}
                </button>
              </div>
            </div>

            <div className="rounded-2xl h-full flex items-center justify-center">
              <img
                src={PositiveImage}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Events Section */}
      <section className="bg-secondary px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {trainings.map((training, index) => (
              <div
                key={training._id}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="bg-brown text-secondary rounded-lg p-4 text-center min-w-[110px]">
                  <div className="text-4xl font-['Poppins'] font-bold">
                    {new Date(training.date).getDate()}
                  </div>
                  <div className="text-xl font-['Poppins'] font-medium">
                    {new Date(training.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </div>
                </div>

                <div className="bg-gray-300 w-full md:w-60 h-48 md:h-40 rounded-lg bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center flex-shrink-0">
                  <img
                    src={getImageForTitle(training.title)}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-primary font-['Poppins'] text-2xl font-semibold">
                    {training.title}
                  </h3>
                  <p className="text-brown font-['Poppins'] text-lg leading-relaxed">
                    {training.description}
                  </p>
                  <Link to={getLinkForTitle(training)}>
                    <button className="bg-[#a6a643] hover:bg-[#8f8f3d] font-['Poppins'] text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      {t("becomeVolunteer.events.moreInfo")}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Volunteers Section */}
      <section className="bg-accent text-white">
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <div className="rounded-2xl h-full flex items-center justify-center">
              <img
                src={VolunteerAction}
                alt="Volunteer in Action"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-8 py-8 px-4">
              <div>
                <p className="text-primary text-2xl font-['Poppins'] font-semibold mb-2 mt-10">
                  {t("becomeVolunteer.whyVolunteers.title")}
                </p>
                <h2 className="text-4xl md:text-5xl font-['Poppins'] font-semibold text-secondary">
                  {t("becomeVolunteer.whyVolunteers.subtitle")}
                </h2>
              </div>

              <div className="space-y-8">
                {t("becomeVolunteer.whyVolunteers.volunteerItems", {
                  returnObjects: true,
                }).map((item, index) => (
                  <div key={index}>
                    <div className="w-full h-px bg-border mb-6"></div>
                    <div className="flex items-start gap-3">
                      <Check
                        className="text-primary mt-1 flex-shrink-0"
                        size={24}
                      />
                      <div>
                        <h3 className="text-2xl font-['Poppins'] font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted font-['Poppins'] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-full h-px bg-border"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FaqQuestionsVolunteer />
      <Testimonial />
      <SubscribeCard />
      <Footer />
    </div>
  );
};

export default BecomeVolunteer;
