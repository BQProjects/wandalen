import React from "react";
import { useTranslation } from "react-i18next";
import tina from "../../assets/tina.jpg";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";

function ReadMoreAboutTina() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#ede4dc] min-h-screen">
      {/* Header Section */}
      <div className="py-20 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start gap-2 mb-12">
            <div className="text-[#a6a643] font-['Poppins'] text-[2rem] font-semibold leading-[136%]">
              {t("tina.name")}
            </div>
            <div className="max-w-4xl text-[#381207] font-['Poppins'] text-3xl lg:text-5xl font-semibold leading-[136%]">
              {t("tina.title")}
            </div>
          </div>

          <div className="inline-flex items-start gap-12 mb-20">
            {/* Left Image */}
            <div className="w-[662px] h-[985px] rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={tina}
                alt="Tina Rozendal"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Text Content */}
            <div className="flex flex-col items-start gap-10 w-[558px]">
              <div className="flex flex-col items-start gap-5 self-stretch">
                <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-xl leading-[160%]">
                  {t("tina.paragraph1")}
                </div>
                <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-xl leading-[160%]">
                  {t("tina.paragraph2")}
                </div>
                <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-xl leading-[160%]">
                  {t("tina.paragraph3")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </div>
  );
}

export default ReadMoreAboutTina;
