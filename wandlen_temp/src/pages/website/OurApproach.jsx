import React from "react";
import deermountain from "../../assets/deermountain.jpg";
import PlantSvg from "../../assets/plant.svg";
import ScrollDown from "../../assets/scrollDown.svg";
import PartnersSection from "../../components/PartnersSection";
import OurWalking from "../../components/WhyVirtualWalking";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import Button from "@mui/material/Button";
import ChooseYourExperience from "./ChoseYourExperience";
import { Link } from "react-router-dom";

const OurApproach = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex-shrink-0 bg-secondary">
      <div className="flex-shrink-0 py-8 md:py-20 px-4 md:px-20">
        <div className="inline-flex flex-col items-start gap-4">
          <div className="text-primary font-poppins text-xl md:text-[2rem] font-semibold leading-[136%]">
            Our Approach
          </div>
          <div className="w-full md:w-[654px] text-brown font-poppins text-3xl md:text-5xl font-semibold leading-[136%]">
            Making Nature Accessible, Anywhere
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-20 justify-center mt-8">
          <img
            src={deermountain}
            className="w-full md:w-[662px] h-auto md:h-[963px] rounded-2xl object-cover"
          />
          <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex flex-col items-center md:items-start gap-5 pb-4">
                <div className="w-full md:w-[424px] text-brown text-center md:text-justify font-poppins text-lg md:text-xl leading-[136%]">
                  Virtual Walking opens the door to nature for everyone —
                  regardless of physical limitations. Through authentic,
                  real-life walking videos, we bring the beauty, peace, and
                  familiarity of local landscapes to people who may no longer be
                  able to experience them in person.
                </div>
                <div className="w-full md:w-[424px] text-brown text-center md:text-justify font-poppins text-lg md:text-xl leading-[136%]">
                  From seniors with dementia to those with limited mobility, our
                  videos bring calm, spark recognition, and support well-being —
                  strengthening connections with the world and with oneself.
                </div>
              </div>
            </div>
            <Link
              to="/choose-experience"
              className="flex items-center gap-2.5 py-2 px-5 rounded-lg bg-primary text-white font-poppins text-lg md:text-xl font-medium leading-[136%] hover:bg-opacity-90 transition-colors"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 px-4 md:px-20 flex justify-center md:justify-end">
        <img
          src={ScrollDown}
          onClick={handleScrollDown}
          className="cursor-pointer w-8 h-8 md:w-auto md:h-auto"
        />
      </div>
      <div className="mt-10 flex justify-center md:justify-end px-4 md:px-20">
        <img src={PlantSvg} className="w-16 h-16 md:w-auto md:h-auto" />
      </div>
      <PartnersSection />
      <OurWalking />
      <Testimonial />
      <FaqQuestions />
    </div>
  );
};

export default OurApproach;
