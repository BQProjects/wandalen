"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { DatabaseContext } from "../contexts/DatabaseContext";

// TestimonialCard Component
const TestimonialCard = ({ text, name, photo }) => (
  <div className="flex flex-col justify-between gap-4 p-6 sm:p-8 w-full min-w-[350px] sm:min-w-[450px] max-w-[450px] rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0 min-h-[300px]">
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
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { DATABASE_URL } = React.useContext(DatabaseContext);

  useEffect(() => {
    fetchTestimonials();
  }, []);

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

  useEffect(() => {
    if (loading || testimonials.length === 0) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    const cardWidth = 450 + 32; // card width + gap
    const totalWidth = cardWidth * testimonials.length;

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // Reset position for seamless loop
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }

      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;

      if (!isPaused) {
        requestAnimationFrame(scroll);
      }
    };

    const animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, testimonials.length, loading]);

  if (loading) {
    return (
      <div className="bg-[#ede4dc] py-20">
        <div className="w-full mx-auto text-center">
          <div className="text-gray-600">Loading testimonials...</div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="bg-[#ede4dc] py-20">
        <div className="w-full mx-auto text-center">
          <div className="text-gray-600">No testimonials available yet.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ede4dc]">
      <div className="w-full mx-auto pb-20 overflow-hidden">
        {/* Scrolling Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-8 will-change-transform"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Triple the testimonials for seamless infinite scroll */}
            {[...testimonials, ...testimonials, ...testimonials].map(
              (testimonial, index) => (
                <TestimonialCard
                  key={index}
                  text={testimonial.text}
                  name={testimonial.name}
                  photo={testimonial.photo}
                />
              )
            )}
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-orange-50 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingTestimonials;
