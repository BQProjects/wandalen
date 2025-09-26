import React from "react";
import PartnerOne from "../assets/partner1.png";
import PartnerTwo from "../assets/partner2.png";
import { useTranslation } from "react-i18next";

const PartnersSection = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-shrink-0 w-full min-h-[600px] md:min-h-[1035px] bg-dark-green py-8 md:py-16 px-4 md:px-8">
      <div className="flex-shrink-0 w-full text-primary text-center font-[Poppins] text-2xl md:text-[2.5rem] font-semibold leading-[136%] mb-4">
        {t("partnersSection.title")}
      </div>
      <div className="w-full text-white text-center font-[Poppins] text-lg md:text-[2rem] font-medium leading-[160%] mb-6 md:mb-8">
        {t("partnersSection.subtitle")}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-4 mb-6 md:mb-8">
        <div className="flex flex-shrink-0 justify-center items-center w-full md:w-2/6 h-64 md:h-[21.375rem] rounded-2xl bg-accent">
          <img
            src={PartnerOne}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="flex flex-shrink-0 justify-center items-center gap-2.5 p-4 md:p-6 w-full md:w-4/6 h-auto md:h-[21.375rem] rounded-3xl bg-accent">
          <span className="text-white text-center font-[Poppins] text-xl md:text-3xl font-medium leading-[160%]">
            {t("partnersSection.partner1Text")}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-shrink-0 justify-center items-center gap-2.5 p-4 md:p-6 w-full md:w-4/6 h-auto md:h-[21.375rem] rounded-3xl bg-white order-2 md:order-1">
          <span className="text-brown text-center font-[Poppins] text-lg md:text-2xl font-medium leading-[160%]">
            <span className="underline text-dark-olive">
              {t("partnersSection.partner2Title")}
            </span>
            <br />
            {t("partnersSection.partner2Text")}
          </span>
        </div>
        <div className="inline-flex flex-shrink-0 justify-center items-center w-full md:w-2/6 h-64 md:h-[21.375rem] rounded-2xl bg-white order-1 md:order-2">
          <div className="flex flex-shrink-0 justify-center items-center h-64 md:h-[21.375rem] rounded-2xl bg-accent">
            <img
              src={PartnerTwo}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
