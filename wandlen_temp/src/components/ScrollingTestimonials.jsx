"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DatabaseContext } from "../contexts/DatabaseContext";
import LeftArrow from "../assets/LeftArrow.svg";
import RightArrow from "../assets/RightArrow.svg";

// TestimonialCard Component
const TestimonialCard = ({ text, name, photo }) => (
  <div className="flex flex-col justify-between gap-4 p-6 sm:p-8 w-5xl rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[300px]">
    <div className="w-full text-gray-700 font-[Poppins] text-sm sm:text-base leading-relaxed">
      "{text}"
    </div>
    <div className="flex justify-start items-center gap-3 w-full">
      <img
        src={photo || "https://via.placeholder.com/56x56?text=No+Photo"}
        alt={name}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
      />
      <div className="text-gray-900 font-[Poppins] text-sm sm:text-base font-semibold">
        {name}
      </div>
    </div>
  </div>
);

// Scrolling Testimonials Section
const ScrollingTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { DATABASE_URL } = React.useContext(DatabaseContext);
  const { t } = useTranslation();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000); // Auto scroll every 4 seconds

      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}/utils/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + testimonials.length) % testimonials.length
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-[#ede4dc] py-20">
        <div className="w-full mx-auto text-center">
          <div className="text-gray-600">{t("testimonials.loading")}</div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="bg-[#ede4dc] py-20">
        <div className="w-full mx-auto text-center">
          <div className="text-gray-600">
            {t("testimonials.noTestimonials")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ede4dc] py-20">
      <div className="w-full mx-auto relative px-4 md:px-8">
        {/* Left Arrow */}
        <img
          src={LeftArrow}
          alt="Previous"
          className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 cursor-pointer w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform z-10"
          onClick={prevTestimonial}
        />

        {/* Content */}
        <div className="flex justify-center items-center max-w-7xl mx-auto">
          <TestimonialCard
            key={currentIndex}
            text={testimonials[currentIndex].text}
            name={testimonials[currentIndex].name}
            photo={testimonials[currentIndex].photo}
          />
        </div>

        {/* Right Arrow */}
        <img
          src={RightArrow}
          alt="Next"
          className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 cursor-pointer w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform z-10"
          onClick={nextTestimonial}
        />
      </div>
    </div>
  );
};

export default ScrollingTestimonials;
