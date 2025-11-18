import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RequestCard = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen bg-[#515744] py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="text-[#a6a643] font-['Poppins'] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight mb-2 sm:mb-4">
            {t("requestCard.header.subtitle")}
          </div>
          <div className="text-white font-['Poppins'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight max-w-[835px]">
            {t("requestCard.header.title")}
          </div>
        </div>

        {/* Main Content - Side by Side on larger screens, stacked on mobile */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center lg:items-start">
          {/* Left Card - Care Institutions */}
          <div className="w-full lg:flex-1 flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 py-8 sm:py-10 px-4 sm:px-6 md:px-8 rounded-2xl bg-[#454c36] min-h-[700px]">
            <div className="flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 w-full max-w-[424px]">
              <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full">
                {/* Care Institutions Icon */}
                <div className="flex justify-center items-center">
                  <svg
                    width={120}
                    height={120}
                    viewBox="0 0 180 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-[180px] lg:h-[180px]"
                  >
                    <path
                      d="M113.777 155.134C113.777 168.867 102.969 180.001 89.6383 180.001C76.3073 180.001 65.5 168.867 65.5 155.134C65.5 141.4 76.3073 130.266 89.6383 130.266C102.969 130.266 113.777 141.4 113.777 155.134Z"
                      fill="white"
                    />
                    <path
                      d="M89.6383 0C76.3131 0 65.5 11.1399 65.5 24.8679C65.5 38.5959 76.3131 49.7358 89.6383 49.7358C102.963 49.7358 113.777 38.5959 113.777 24.8679C113.777 11.1399 102.963 0 89.6383 0ZM89.6383 47.4853C77.5145 47.4853 67.6845 37.3581 67.6845 24.8679C67.6845 12.3777 77.6238 2.25049 89.6383 2.25049C101.762 2.25049 111.592 12.3777 111.592 24.8679C111.592 37.3581 101.762 47.4853 89.6383 47.4853Z"
                      fill="white"
                    />
                    <path
                      d="M37.2435 36.1656C25.7657 29.312 10.8993 33.3568 4.23125 45.2663C0.951882 50.9964 0.186698 57.7376 1.82638 64.1418C3.46606 70.546 7.51061 75.939 13.0855 79.1972C16.9114 81.4443 21.0653 82.5679 25.1099 82.5679C33.4176 82.5679 41.616 78.0737 46.0978 70.2089C52.6565 58.2994 48.7213 43.0192 37.2435 36.1656ZM3.90331 63.58C2.37294 57.7376 3.13812 51.6705 6.08955 46.5022C9.04098 41.3339 13.7414 37.6262 19.3163 36.0533C27.5147 39.6486 33.3083 48.0752 33.3083 57.85C33.3083 67.6248 27.5147 75.939 19.3163 79.6467C17.5673 79.1972 15.709 78.4108 14.0693 77.3996C9.04098 74.2537 5.43368 69.4224 3.90331 63.58Z"
                      fill="white"
                    />
                    <path
                      d="M12.0856 100.842C0.51003 107.721 -3.4213 122.944 3.24012 134.898C7.71747 142.904 15.7985 147.302 24.2072 147.302C28.2478 147.302 32.3975 146.175 36.2196 143.919C41.789 140.536 45.8296 135.236 47.4676 128.808C49.1057 122.38 48.232 115.614 45.0651 109.863C38.2945 98.1352 23.552 94.0755 12.0856 100.842ZM5.09659 133.77C2.14809 128.583 1.38366 122.38 2.91251 116.629C4.44136 110.765 8.04509 105.916 13.1777 102.871C16.563 100.842 20.2759 99.8267 24.098 99.8267H24.2072C24.7533 102.646 26.1729 110.54 26.1729 123.057C26.1729 135.349 24.8625 142.566 24.3164 145.16C16.563 145.16 9.13712 141.1 5.09659 133.77Z"
                      fill="white"
                    />
                    <path
                      d="M155.879 82.5679C159.92 82.5679 164.069 81.4443 167.892 79.1972C173.461 75.8266 177.501 70.546 179.139 64.1418C180.778 57.7376 179.904 50.9964 176.737 45.2663C170.076 33.3568 155.333 29.312 143.758 36.1656C132.182 43.0192 128.251 58.187 134.912 70.0966C139.389 78.0737 147.58 82.5679 155.879 82.5679ZM174.881 46.3898C177.829 51.5581 178.593 57.7376 177.065 63.4677C175.536 69.3101 171.932 74.1413 166.799 77.1749C165.161 78.186 163.305 78.8602 161.558 79.4219C153.367 75.8266 147.58 67.4001 147.58 57.6253C147.58 47.8504 153.367 39.4239 161.558 35.8286C167.236 37.5139 171.932 41.2216 174.881 46.3898Z"
                      fill="white"
                    />
                    <path
                      d="M167.916 100.9C156.455 94.0464 141.611 98.0911 134.953 110.001C131.679 115.731 130.914 122.472 132.552 128.876C134.189 135.28 138.227 140.673 143.794 143.932C147.614 146.179 151.762 147.302 155.8 147.302C164.096 147.302 172.282 142.808 176.757 134.943C183.415 123.034 179.486 107.754 167.916 100.9ZM174.901 133.707C170.754 141.01 163.332 145.055 155.582 144.943C155.036 142.359 153.727 135.168 153.727 122.921C153.727 110.45 155.036 102.585 155.691 99.7765H156.019C159.839 99.7765 163.55 100.788 166.933 102.81C171.954 105.844 175.665 110.675 177.193 116.517C178.612 122.472 177.848 128.539 174.901 133.707Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h3 className="text-white text-center font-['Poppins'] text-xl sm:text-2xl font-medium leading-normal">
                  {t("requestCard.careInstitutions.title")}
                </h3>
                <div className="flex flex-col gap-3 sm:gap-4 w-full">
                  <div className="flex flex-col items-start gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                          fill="#A6A643"
                        />
                      </svg>
                      <span className="text-white font-['Poppins'] text-sm sm:text-base leading-normal">
                        {t("requestCard.careInstitutions.features.easyQuotes")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                          fill="#A6A643"
                        />
                      </svg>
                      <span className="text-white font-['Poppins'] text-sm sm:text-base leading-normal">
                        {t("requestCard.careInstitutions.features.wellBeing")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                          fill="#A6A643"
                        />
                      </svg>
                      <span className="text-white font-['Poppins'] text-sm sm:text-base leading-normal">
                        {t("requestCard.careInstitutions.features.connection")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                          fill="#A6A643"
                        />
                      </svg>
                      <span className="text-white font-['Poppins'] text-sm sm:text-base leading-normal">
                        {t("requestCard.careInstitutions.features.flexible")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                          fill="#A6A643"
                        />
                      </svg>
                      <span className="text-white font-['Poppins'] text-sm sm:text-base leading-normal">
                        {t("requestCard.careInstitutions.features.simpleStart")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/offerte-aanvragen" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#5b6502] hover:bg-[#a6a643] text-white font-['Poppins'] text-lg sm:text-xl font-medium tracking-tight cursor-pointer hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-opacity-50">
                  {t("requestCard.careInstitutions.button")}
                </button>
              </Link>
            </div>
          </div>

          {/* Right Card - Subscribe Now Section */}
          <div className="w-full lg:flex-1 flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 py-8 sm:py-10 px-4 sm:px-6 md:px-8 rounded-2xl bg-[#454c36] min-h-[700px]">
            <div className="flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 w-full max-w-[424px]">
              <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full">
                {/* Home Users Icon */}
                <div className="flex justify-center items-center">
                  <svg
                    width={120}
                    height={120}
                    viewBox="0 0 141 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-[180px] lg:h-[180px]"
                  >
                    <path
                      d="M92.3706 1.92703C85.4343 1.92703 78.9227 3.34507 72.9772 6.03934C66.1825 2.49424 58.2553 0.367188 50.045 0.367188C22.7245 0.367188 0.5 22.6304 0.5 49.9985C0.5 77.3666 22.7245 99.6298 50.045 99.6298C58.2553 99.6298 65.8994 97.6446 72.6941 94.0995C78.7811 96.7937 85.4343 98.3536 92.3706 98.3536C118.983 98.3536 140.5 76.7994 140.5 50.1403C140.5 23.4812 118.983 1.92703 92.3706 1.92703ZM49.9034 96.6519C24.14 96.6519 3.18959 75.665 3.18959 49.8567C3.18959 24.0484 24.14 3.06146 49.9034 3.06146C56.9813 3.06146 63.6345 4.6213 69.5799 7.45737C54.4333 15.5402 44.0996 31.564 44.0996 49.9985C44.0996 68.2912 54.2917 84.1732 69.2968 92.3978C63.4929 95.0921 56.8397 96.6519 49.9034 96.6519Z"
                      fill="#DEE2DA"
                    />
                  </svg>
                </div>
                <h3
                  className="text-white text-center font-['Poppins'] text-xl sm:text-2xl font-medium leading-normal"
                  dangerouslySetInnerHTML={{
                    __html: t("requestCard.homeUsers.title"),
                  }}
                ></h3>
                <div className="flex flex-col gap-3 sm:gap-4 w-full">
                  <div className="flex flex-col items-start gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                          fill="#A6A643"
                        />
                      </svg>
                      <span className="text-white font-['Poppins'] text-sm sm:text-base leading-normal">
                        {t("requestCard.homeUsers.features.affordable")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                          fill="#A6A643"
                        />
                      </svg>
                      <span className="text-white font-['Poppins'] text-sm sm:text-base leading-normal">
                        {t("requestCard.homeUsers.features.videos")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                          fill="#A6A643"
                        />
                      </svg>
                      <span className="text-white font-['Poppins'] text-sm sm:text-base leading-normal">
                        {t("requestCard.homeUsers.features.personal")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                          fill="#A6A643"
                        />
                      </svg>
                      <span className="text-white font-['Poppins'] text-sm sm:text-base leading-normal">
                        {t("requestCard.homeUsers.features.impactful")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                          fill="#A6A643"
                        />
                      </svg>
                      <span className="text-white font-['Poppins'] text-sm sm:text-base leading-normal">
                        {t("requestCard.homeUsers.features.easy")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/abonneren" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#5b6502] hover:bg-[#a6a643] text-white font-['Poppins'] text-lg sm:text-xl font-medium tracking-tight cursor-pointer hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-opacity-50">
                  {t("requestCard.homeUsers.button")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RequestCard;
