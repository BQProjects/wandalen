import React, { useState } from "react";
import LeftArrow from "../../assets/LeftArrow.svg";
import RightArrow from "../../assets/RightArrow.svg";
import { useTranslation } from "react-i18next";

const Testimonial = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const testimonials = t("testimonials.items", { returnObjects: true }) || [];

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
    setExpanded(false);
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + testimonials.length) % testimonials.length
      );
    }
    setExpanded(false);
  };

  return (
    <div className="relative flex-shrink-0 bg-accent px-4 py-12 md:px-0 min-h-[380px]">
      {/* Left Arrow */}
      <img
        src={LeftArrow}
        alt="Previous"
        className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 cursor-pointer w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform"
        onClick={prevTestimonial}
      />

      {/* Content */}
      <div className="flex flex-col justify-center items-center gap-8 w-full max-w-[864px] mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-primary font-['Poppins'] text-lg md:text-2xl font-semibold tracking-wide uppercase">
            {t("testimonials.title")}
          </h3>
          <h2 className="text-secondary font-['Poppins'] text-3xl md:text-5xl font-bold leading-snug">
            {t("testimonials.subtitle")}
          </h2>
        </div>

        {/* Testimonial Card */}
        <div
          key={currentIndex}
          className="rounded-2xl p-6 md:p-10 text-justify text-secondary font-['Poppins'] text-base md:text-xl leading-relaxed max-w-3xl transition-opacity duration-500 ease-in-out"
        >
          {testimonials.length > 0 ? (
            (() => {
              const text = testimonials[currentIndex] || "";
              const maxLength = 120;
              if (text.length > maxLength && !expanded) {
                return (
                  <>
                    {text.slice(0, maxLength)}...
                    <button
                      onClick={() => setExpanded(true)}
                      className="text-primary ml-2 font-semibold underline hover:text-primary/80"
                    >
                      {t("testimonials.readMore")}
                    </button>
                  </>
                );
              } else if (expanded) {
                return (
                  <>
                    {text}
                    <button
                      onClick={() => setExpanded(false)}
                      className="text-primary ml-2 font-semibold underline hover:text-primary/80"
                    >
                      {t("testimonials.readLess")}
                    </button>
                  </>
                );
              } else {
                return text;
              }
            })()
          ) : (
            <div>Loading testimonials...</div>
          )}
        </div>
      </div>

      {/* Right Arrow */}
      <img
        src={RightArrow}
        alt="Next"
        className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 cursor-pointer w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform"
        onClick={nextTestimonial}
      />
    </div>
  );
};

export default Testimonial;
