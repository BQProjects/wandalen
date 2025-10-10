import React from "react";
import PartnerOne from "../assets/partner1.png";
import PartnerTwo from "../assets/partner2.png";
import { useTranslation } from "react-i18next";

const PartnersSection = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-shrink-0 w-full min-h-[600px] lg:min-h-[1035px] bg-dark-green py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex-shrink-0 w-full text-primary text-center font-[Poppins] text-xl sm:text-2xl lg:text-[2.5rem] font-semibold leading-[136%] mb-4 lg:mb-6">
          {t("partnersSection.title")}
        </div>
        <div className="w-full text-white text-center font-[Poppins] text-base sm:text-lg lg:text-[2rem] font-medium leading-[160%] mb-6 lg:mb-8 px-4">
          {t("partnersSection.subtitle")}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="flex flex-shrink-0 justify-center items-center w-full lg:w-2/6 h-64 sm:h-72 lg:h-[21.375rem] rounded-2xl bg-accent overflow-hidden">
            <img
              src={PartnerOne}
              className="w-full h-full object-cover rounded-2xl"
              alt="Partner 1"
            />
          </div>
          <div className="flex flex-shrink-0 justify-center items-center gap-2.5 p-4 sm:p-6 lg:p-8 w-full lg:w-4/6 h-auto min-h-[200px] lg:h-[21.375rem] rounded-3xl bg-accent">
            <span
              className="text-white text-center font-[Poppins] text-base sm:text-lg lg:text-2xl font-medium leading-[160%]"
              dangerouslySetInnerHTML={{
                __html: t("partnersSection.partner1Text"),
              }}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="flex flex-shrink-0 justify-center items-center gap-2.5 p-4 sm:p-6 lg:p-8 w-full lg:w-4/6 h-auto min-h-[200px] lg:h-[21.375rem] rounded-3xl bg-white order-2 lg:order-1">
            <span className="text-brown text-center font-[Poppins] text-base sm:text-lg lg:text-2xl font-medium leading-[160%]">
              <span className="underline text-dark-olive">
                {t("partnersSection.partner2Title")}
              </span>
              <br />
              {t("partnersSection.partner2Text")}
            </span>
          </div>
          <div className="inline-flex flex-shrink-0 justify-center items-center w-full lg:w-2/6 h-64 sm:h-72 lg:h-[21.375rem] rounded-2xl bg-white order-1 lg:order-2">
            <div className="flex flex-shrink-0 justify-center items-center w-full h-full rounded-2xl bg-accent overflow-hidden">
              <img
                src={PartnerTwo}
                className="w-full h-full object-cover rounded-2xl"
                alt="Partner 2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
