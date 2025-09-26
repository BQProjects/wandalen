import React from "react";
import HoldHands from "../assets/HoldHands.png";
import { useTranslation } from "react-i18next";

const SubscribeCard = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-[#ede4dc] px-4 sm:px-6 md:px-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 lg:gap-12 xl:gap-16 p-6 sm:p-8 md:p-10 lg:p-12 max-w-[1200px] w-full rounded-xl sm:rounded-2xl md:rounded-3xl bg-white shadow-lg">
        <div className="flex flex-col items-start gap-6 sm:gap-8 w-full">
          <h2 className="text-[#381207] font-['Poppins'] text-xl sm:text-2xl font-semibold">
            {t("subscribeCard.title")}
          </h2>
          <div className="flex flex-col gap-4 sm:gap-6 w-full">
            {/* Email Address Field */}
            <div className="flex flex-col gap-1 sm:gap-2 w-full">
              <label className="text-[#381207] font-['Poppins'] text-base sm:text-lg font-medium tracking-[-0.18px]">
                {t("subscribeCard.emailLabel")}
              </label>
              <input
                type="email"
                placeholder={t("subscribeCard.emailPlaceholder")}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#cbcbcb] text-[#8d8d8d] font-['Poppins'] text-sm sm:text-base placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors"
              />
            </div>

            {/* First Name and Last Name Fields */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
              <div className="flex flex-col gap-1 sm:gap-2 flex-1">
                <label className="text-[#381207] font-['Poppins'] text-base sm:text-lg font-medium tracking-[-0.18px]">
                  {t("subscribeCard.firstNameLabel")}
                </label>
                <input
                  type="text"
                  placeholder={t("subscribeCard.firstNamePlaceholder")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#cbcbcb] text-[#8d8d8d] font-['Poppins'] text-sm sm:text-base placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1 sm:gap-2 flex-1">
                <label className="text-[#381207] font-['Poppins'] text-base sm:text-lg font-medium tracking-[-0.18px]">
                  {t("subscribeCard.lastNameLabel")}
                </label>
                <input
                  type="text"
                  placeholder={t("subscribeCard.lastNamePlaceholder")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#cbcbcb] text-[#8d8d8d] font-['Poppins'] text-sm sm:text-base placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors"
                />
              </div>
            </div>

            {/* Notes Field */}
            <div className="flex flex-col gap-1 sm:gap-2 w-full">
              <label className="text-[#381207] font-['Poppins'] text-base sm:text-lg font-medium tracking-[-0.18px]">
                {t("subscribeCard.notesLabel")}
              </label>
              <textarea
                placeholder={t("subscribeCard.notesPlaceholder")}
                rows="3"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#cbcbcb] text-[#8d8d8d] font-['Poppins'] text-sm sm:text-base placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors resize-none"
              />
            </div>

            {/* Subscribe Button */}
            <div className="flex justify-center sm:justify-end w-full mt-2 sm:mt-4">
              <button className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#5b6502] text-white font-['Poppins'] text-base sm:text-lg md:text-xl font-medium tracking-[-0.2px] cursor-pointer hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-opacity-50">
                {t("subscribeCard.subscribeButton")}
              </button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-shrink-0 w-full lg:w-auto h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[545px] rounded-xl sm:rounded-2xl overflow-hidden mt-4 lg:mt-0">
          <img
            src={HoldHands}
            alt={t("subscribeCard.imageAlt")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscribeCard;
