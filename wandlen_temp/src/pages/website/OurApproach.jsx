import React from "react";
import deermountain from "../../assets/deermountain.jpg";
import PlantSvg from "../../assets/plant.svg";
import ScrollDown from "../../assets/scrollDown.svg";
import PartnersSection from "../../components/PartnersSection";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";
import { useTranslation } from "react-i18next";
import tina from "../../assets/tina.jpg";
import { Link } from "react-router-dom";

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
      <div>
        <div className="px-4 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-start gap-2 mb-8 lg:mb-12">
              <div className="text-[#a6a643] font-['Poppins'] text-xl sm:text-2xl lg:text-[2rem] font-semibold leading-[136%]">
                {t("ourApproach.vision")}
              </div>
              <div className="max-w-4xl text-[#381207] font-['Poppins'] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-[136%]">
                {t("ourApproach.title")}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 mb-20">
              {/* Left Image */}
              <div className="w-full lg:w-[662px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[985px] rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={deermountain}
                  alt="Tina Rozendal"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Text Content */}
              <div className="flex flex-col items-start gap-6 lg:gap-10 w-full lg:w-[558px]">
                <div className="flex flex-col items-start gap-4 lg:gap-5 self-stretch">
                  <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-base sm:text-lg lg:text-xl leading-[160%]">
                    {t("ourApproach.description1")}
                  </div>
                  <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-base sm:text-lg lg:text-xl leading-[160%]">
                    {t("ourApproach.description2")}
                  </div>
                  <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-base sm:text-lg lg:text-xl leading-[160%]">
                    {t("ourApproach.description3")}
                  </div>
                </div>
                {/* CTA Button */}
                <div className="flex justify-start ">
                  <Link
                    to="/choose-experience"
                    className="flex items-center w-fit gap-2.5 py-2 px-5 rounded-lg bg-primary text-white font-[Poppins]  text-base sm:text-lg md:text-xl font-medium leading-[136%] hover:bg-opacity-90 transition-colors"
                  >
                    {t("ourApproach.ctaButton")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll + Plant */}
        <div className="flex flex-col w-full gap-4 -mt-40">
          <div className="flex justify-end px-4 sm:px-10 md:px-20">
            <img
              src={ScrollDown}
              onClick={handleScrollDown}
              className="cursor-pointer w-8 h-8 md:w-auto md:h-auto"
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img src={PlantSvg} className="w-full h-12  md:w-auto md:h-auto" />
        </div>
      </div>

      {/* Other Sections */}
      <PartnersSection />
      <div>
        <div className="py-20 px-4 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-start gap-2 mb-8 lg:mb-12">
              <div className="text-[#a6a643] font-['Poppins'] text-xl sm:text-2xl lg:text-[2rem] font-semibold leading-[136%]">
                {t("tina.name")}
              </div>
              <div className="max-w-4xl text-[#381207] font-['Poppins'] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-[136%]">
                {t("tina.title")}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 mb-20">
              {/* Left Image */}
              <div className="w-full lg:w-[662px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[985px] rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={tina}
                  alt="Tina Rozendal"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Text Content */}
              <div className="flex flex-col items-start gap-6 lg:gap-10 w-full lg:w-[558px]">
                <div className="flex flex-col items-start gap-4 lg:gap-5 self-stretch">
                  <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-base sm:text-lg lg:text-xl leading-[160%]">
                    {t("tina.paragraph1")}
                  </div>
                  <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-base sm:text-lg lg:text-xl leading-[160%]">
                    {t("tina.paragraph2")}
                  </div>
                  <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-base sm:text-lg lg:text-xl leading-[160%]">
                    {t("tina.paragraph3")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <OurWalking /> */}
      <Testimonial />
      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </div>
  );
};

export default OurApproach;
