import React from "react";
import { useTranslation } from "react-i18next";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";
import blog2 from "../../assets/blog2.png";

const PowerofWalking = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-shrink-0 bg-secondary">
      <div className="flex-shrink-0">
        {/* Title */}
        <div className="inline-flex flex-col items-start gap-4 px-4 sm:px-10 md:px-20">
          <div className="text-primary font-[Poppins] text-xl md:text-[2rem] font-semibold leading-[136%]">
            {t("powerOfWalking.breadcrumb")}
          </div>
          <div className="w-full md:w-[654px] text-brown font-[Poppins] text-2xl sm:text-3xl md:text-5xl font-semibold leading-[136%] text-center md:text-left">
            {t("powerOfWalking.title")}
          </div>
        </div>

        {/* Main section */}
        <div className="flex flex-col md:flex-col items-center md:items-start justify-between mt-8 gap-10 md:gap-0 mb-20 px-4 sm:px-10 md:px-20">
          <img
            src={blog2}
            className="w-full h-auto rounded-3xl object-cover shadow-lg"
          />
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <div className="flex flex-col items-start gap-4 mt-10">
              <div className="flex flex-col items-start gap-5">
                <div className="w-full text-brown text-left font-[Poppins] text-base sm:text-lg md:text-2xl leading-[136%]">
                  {t("powerOfWalking.content.main")}
                </div>
                <div className="w-full text-brown text-left font-[Poppins] text-base sm:text-lg md:text-2xl leading-[136%]">
                  <div className="  text-black text-justify font-['Poppins'] text-xl leading-[180%]">
                    <h2 className="text-2xl font-semibold mb-4 text-brown">
                      {t("powerOfWalking.content.subtitle")}
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                      {t("powerOfWalking.content.benefits", {
                        returnObjects: true,
                      }).map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
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
    </div>
  );
};

export default PowerofWalking;
