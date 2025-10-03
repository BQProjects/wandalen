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
          <div className="flex justify-center md:justify-end">
            <img
              src={PlantSvg}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-auto md:h-auto"
            />
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <PartnersSection />
      <div>
        <div className="py-20 px-4 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-start gap-2 mb-8 lg:mb-12">
              <div className="text-[#a6a643] font-['Poppins'] text-xl sm:text-2xl lg:text-[2rem] font-semibold leading-[136%]">
                Tina Rozendal
              </div>
              <div className="max-w-4xl text-[#381207] font-['Poppins'] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-[136%]">
                – van der Meer, founder of Virtual Walking and owner of 10
                Natuurlijk.
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
                    Tina grew up on the outskirts of the village of Haarle in
                    Salland, Overijssel. At this hobby farm she was often
                    outside, in the vegetable garden, the meadow, by the pond or
                    the other animals in the yard. She grew up with nature
                    around her. Tina helps both healthcare organizations and
                    government agencies as a process supervisor in greening and
                    connection on the theme of nature &amp; health.&nbsp;
                  </div>
                  <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-base sm:text-lg lg:text-xl leading-[160%]">
                    Tina comes from a care family. Both her parents worked in
                    the hospital. Her mother as a nurse and her father started
                    in the operating room as an anesthesia assistant and then
                    focused on improving the logistics processes in hospitals in
                    his career. Tina learned from her family how your body works
                    and how to build in peace by listening to your body and
                    connecting with nature. She likes to bring this basic need
                    of man for a natural environment and its influence on your
                    body and mind back to people in this way.
                  </div>
                  <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-base sm:text-lg lg:text-xl leading-[160%]">
                    Tina has the qualities of an inspiring connector. She uses
                    her personal qualities to make an impact. Tina is warm and
                    sensitive, enthusiastic and energetic and alert to new
                    opportunities and possibilities. She is also inspiring and
                    mobilizing, optimistic, independent and original. These
                    characteristics have ensured that she has developed this
                    plan and to realize this platform. Virtual Walking therefore
                    aims to focus on the well-being and resilience of people by
                    making a direct connection with nature in an environment
                    where it is no longer taken for granted.
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
