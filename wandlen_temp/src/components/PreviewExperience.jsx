import React, { useState, useEffect } from "react";
import Laptop_trail from "../assets/laptop_trail.png";
import Tablet_trail from "../assets/Tablet_iPad_mini_trail.png";
import Phone_trail from "../assets/Phone_trail.png";
import { useTranslation } from "react-i18next";

const PreviewExperience = () => {
  const { t } = useTranslation();
  const [activeDevice, setActiveDevice] = useState(0);

  const devices = [
    {
      id: 0,
      name: "desktop",
      image: Laptop_trail,
      scale: "scale-85",
      aspectRatio: "aspect-[16/10]",
      icon: (
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.25 4.5C20.4489 4.5 20.6397 4.57902 20.7803 4.71967C20.921 4.86032 21 5.05109 21 5.25V16.5H3V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H20.25ZM3.75 3C3.15326 3 2.58097 3.23705 2.15901 3.65901C1.73705 4.08097 1.5 4.65326 1.5 5.25V18H22.5V5.25C22.5 4.65326 22.2629 4.08097 21.841 3.65901C21.419 3.23705 20.8467 3 20.25 3H3.75ZM0 18.75H24C24 19.3467 23.7629 19.919 23.341 20.341C22.919 20.7629 22.3467 21 21.75 21H2.25C1.65326 21 1.08097 20.7629 0.65901 20.341C0.237053 19.919 0 19.3467 0 18.75Z"
            fill="#4B4741"
          />
        </svg>
      ),
    },
    {
      id: 1,
      name: "tablet",
      image: Tablet_trail,
      scale: "scale-50",
      aspectRatio: "aspect-[3/4]",
      icon: (
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 18H13M5.875 3H18.125C18.608 3 19 3.448 19 4V20C19 20.552 18.608 21 18.125 21H5.875C5.392 21 5 20.552 5 20V4C5 3.448 5.392 3 5.875 3Z"
            stroke="#4B4741"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "mobile",
      image: Phone_trail,
      scale: "scale-40",
      aspectRatio: "aspect-[9/16]",
      icon: (
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 3.25H8C7.04 3.25 6.25 4.04 6.25 5V19C6.25 19.96 7.04 20.75 8 20.75H16C16.96 20.75 17.75 19.96 17.75 19V5C17.75 4.04 16.96 3.25 16 3.25ZM16.25 19C16.25 19.14 16.14 19.25 16 19.25H8C7.86 19.25 7.75 19.14 7.75 19V5C7.75 4.86 7.86 4.75 8 4.75H16C16.14 4.75 16.25 4.86 16.25 5V19ZM13 16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16C11 15.45 11.45 15 12 15C12.55 15 13 15.45 13 16Z"
            fill="#4B4741"
          />
        </svg>
      ),
    },
  ];

  // Auto-loop through devices every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDevice((prev) => (prev + 1) % devices.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [devices.length]);

  const currentDevice = devices[activeDevice];

  return (
    <div className="w-full bg-[#C1BE9B] py-16 lg:py-12 px-4 sm:px-10 md:px-20">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start gap-2 max-w-[1136px] mb-8">
          <div className="text-xl lg:text-3xl xl:text-[32px] font-semibold text-[#5b6502] font-[Poppins]">
            {t("previewExperience.title")}
          </div>
          <div className="max-w-[835px] opacity-[0.8] text-[#381207] font-[Poppins] text-2xl lg:text-4xl xl:text-[48px] font-semibold">
            {t("previewExperience.subtitle")}
          </div>
        </div>

        {/* Video Preview */}
        <div className="flex flex-col items-center space-y-8">
          {/* Main Video Display with Fixed Container */}
          <div className="relative w-full max-w-4xl h-[300px] lg:h-[500px] flex items-center justify-center">
            {/* Fixed background container to prevent layout shifts */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`relative transition-all duration-700 ease-in-out transform ${currentDevice.scale} ${currentDevice.aspectRatio} w-full max-w-3xl`}
              >
                <img
                  src={currentDevice.image}
                  alt={`${t("previewExperience.alt")} - ${
                    currentDevice.name
                  } view`}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* Device Selector with Auto-Loop */}
          <div className="flex items-center gap-2">
            {devices.map((device, index) => (
              <button
                key={device.id}
                onClick={() => setActiveDevice(index)}
                className={`flex justify-center items-center p-1 w-8 h-8 rounded transition-all duration-300 ${
                  activeDevice === index
                    ? "bg-[#5b6502] scale-110"
                    : "bg-[#e5e3df] hover:bg-[#d5d3cf]"
                }`}
              >
                {device.icon}
              </button>
            ))}
          </div>

          <div className="text-center">
            <span className="text-[#5b6502] font-['Poppins'] text-sm font-medium capitalize transition-all duration-300">
              {t(`previewExperience.devices.${currentDevice.name}`)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewExperience;
