import React from "react";
import deermountain from "../../assets/deermountain.jpg";
import PlantSvg from "../../assets/plant.svg";
import ScrollDown from "../../assets/scrollDown.svg";
import PartnersSection from "../../components/PartnersSection";
import OurWalking from "../../components/DawnForest";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import { Link } from "react-router-dom";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";
import { useTranslation } from "react-i18next";
import ReadMoreAboutTina from "./ReadMoreAboutTina";

const OurApproach = () => {
  const { t } = useTranslation();
  const handleScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex-shrink-0 bg-secondary">
      <div className="flex-shrink-0">
        {/* Title */}
        <div className="inline-flex flex-col items-start gap-4 px-4 sm:px-10 md:px-20 mt-10">
          <div className="text-primary font-[Poppins] text-xl md:text-[2rem] font-semibold leading-[136%]">
            {t("ourApproach.vision")}
          </div>
          <div className="w-full md:w-[654px] text-brown font-[Poppins] text-2xl sm:text-3xl md:text-5xl font-semibold leading-[136%] text-center md:text-left">
            {t("ourApproach.title")}
          </div>
        </div>

        {/* Main section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mt-8 gap-10 md:gap-0">
          <img
            src={deermountain}
            className="w-full max-w-[800px] h-auto md:h-[963px] rounded-2xl object-cover px-4 sm:px-10 md:px-20"
          />
          <div className="flex flex-col gap-6 w-full md:w-auto px-4 sm:px-10 md:px-0">
            <div className="flex flex-col items-start gap-4 px-4 sm:px-10 md:px-24">
              <div className="flex flex-col items-start gap-5">
                <div className="w-full md:w-[550px] text-brown text-left font-[Poppins] text-base sm:text-lg md:text-2xl leading-[136%]">
                  {t("ourApproach.description1")}
                </div>
                <div className="w-full md:w-[550px] text-brown text-left font-[Poppins] text-base sm:text-lg md:text-2xl leading-[136%]">
                  {t("ourApproach.description2")}
                </div>
                <div className="w-full md:w-[550px] text-brown text-left font-[Poppins] text-base sm:text-lg md:text-2xl leading-[136%]">
                  {t("ourApproach.description3")}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-start px-4 sm:px-10 md:px-24">
              <Link
                to="/choose-experience"
                className="flex items-center w-fit gap-2.5 py-2 px-5 rounded-lg bg-primary text-white font-[Poppins]  text-base sm:text-lg md:text-xl font-medium leading-[136%] hover:bg-opacity-90 transition-colors"
              >
                {t("ourApproach.ctaButton")}
              </Link>
            </div>

            {/* Scroll + Plant */}
            <div className="flex flex-col w-full pt-20 sm:pt-32 md:pt-64 gap-4">
              <div className="flex justify-end px-4 sm:px-10 md:px-20">
                <img
                  src={ScrollDown}
                  onClick={handleScrollDown}
                  className="cursor-pointer w-8 h-8 md:w-auto md:h-auto"
                />
              </div>
              <div className="flex justify-center md:justify-end">
                <img
                  src={PlantSvg}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-auto md:h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <PartnersSection />
      <ReadMoreAboutTina />
      {/* <OurWalking /> */}
      <Testimonial />
      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </div>
  );
};

export default OurApproach;
