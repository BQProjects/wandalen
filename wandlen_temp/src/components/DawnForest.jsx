import React from "react";
import OrangeWood from "../assets/orangeWood.jpg";
import MemoryIcon from "../assets/MemoryIcon.svg";
import BrainIcon from "../assets/BrainIcon.svg";
import UserGroupIcon from "../assets/UserGroupIcon.svg";
import { useTranslation } from "react-i18next";

const DawnForest = () => {
  const { t } = useTranslation();

  // First set of benefits
  const firstBenefitsData = t("dawnForest.benefits.first", {
    returnObjects: true,
  });
  const firstBenefits = firstBenefitsData.map((benefit, index) => ({
    ...benefit,
    icon:
      index === 0 ? (
        <img
          src={MemoryIcon}
          alt="Memory Icon"
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        />
      ) : (
        <img
          src={BrainIcon}
          alt="Brain Icon"
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        />
      ),
  }));

  // Second set of benefits
  const secondBenefitsData = t("dawnForest.benefits.second", {
    returnObjects: true,
  });
  const secondBenefits = secondBenefitsData.map((benefit, index) => ({
    ...benefit,
    icon:
      index === 0 ? (
        <img
          src={UserGroupIcon}
          alt="User Group Icon"
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        />
      ) : (
        <img
          src={MemoryIcon}
          alt="Memory Icon"
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        />
      ),
  }));

  // Combine both benefit sets
  const allBenefits = [...firstBenefits, ...secondBenefits];

  const BenefitItem = ({ benefit }) => {
    return (
      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
        <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
        <div className="flex flex-col items-start gap-1 sm:gap-2">
          <div className="text-white font-poppins text-lg sm:text-xl md:text-2xl font-semibold">
            {benefit.title}
          </div>
          <div className="text-muted font-poppins text-sm sm:text-base leading-relaxed">
            {benefit.description}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-accent">
      {/* Image - Full width on mobile, half width on md+ */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen">
        <img
          src={OrangeWood}
          className="w-full h-full object-cover"
          alt={t("dawnForest.imageAlt")}
        />
      </div>

      {/* Content - Full width on mobile, half width on md+ */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-4 sm:p-6 md:p-8 py-8 md:py-16">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="text-primary font-poppins text-lg sm:text-xl md:text-2xl lg:text-[2rem] font-semibold mb-2 sm:mb-3 md:mb-4 pl-4 sm:pl-8 md:pl-14">
            {t("dawnForest.header")}
          </div>
          <div className="text-secondary font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold pl-4 sm:pl-8 md:pl-14 leading-tight">
            {t("dawnForest.subtitle")}
          </div>
        </div>

        {/* Benefits Container */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-16">
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Top border */}
            <div className="w-full h-px bg-border" />

            {/* All Benefits */}
            {allBenefits.map((benefit, index) => (
              <React.Fragment key={index}>
                <BenefitItem benefit={benefit} />
                <div className="w-full h-px bg-border" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DawnForest;
