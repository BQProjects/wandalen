import React, { useState } from "react";
import LeftArrow from "../../assets/LeftArrow.svg";
import RightArrow from "../../assets/RightArrow.svg";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "Virtueel Wandelen brengt de natuur tot leven met rustgevende natuurwandelvideo’s voor ouderen en mensen met dementie.",
    },
    {
      text: "Een geweldige ervaring die helpt bij het verminderen van stress en het verbeteren van de stemming.",
    },
    {
      text: "Perfect voor mensen die niet meer kunnen wandelen, maar wel willen genieten van de natuur.",
    },
    {
      text: "What I hope to get out of my volunteer work at Virtual Walking is mainly connection and meaning. I would like to... do something that really matters to others, in this case to people who can no longer walk themselves, but can still feel, experience and enjoy. In addition, it gives me satisfaction to combine my love for hiking and nature Read More with my desire to contribute to the well-being of others. The idea that someone else can view a walk at a later time is really a great find!",
    },
    {
      text: "Perfect voor mensen die niet meer kunnen wandelen, maar wel willen genieten van de natuur.",
    },  
    {
      text: "Perfect voor mensen die niet meer kunnen wandelen, maar wel willen genieten van de natuur.",
    },
    {
      text: "Perfect voor mensen die niet meer kunnen wandelen, maar wel willen genieten van de natuur.",
    },
    {
      text: "Perfect voor mensen die niet meer kunnen wandelen, maar wel willen genieten van de natuur.",
    },
    {
      text: "Perfect voor mensen die niet meer kunnen wandelen, maar wel willen genieten van de natuur.",
    },
    {
      text: "Perfect voor mensen die niet meer kunnen wandelen, maar wel willen genieten van de natuur.",
    },
    {
      text: "Perfect voor mensen die niet meer kunnen wandelen, maar wel willen genieten van de natuur.",
    },
    {
      text: "Perfect voor mensen die niet meer kunnen wandelen, maar wel willen genieten van de natuur.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative flex-shrink-0 h-[300px] md:h-[400px] bg-accent px-4 md:px-0">
      <img
        src={LeftArrow}
        alt="Previous"
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 cursor-pointer w-6 h-6 md:w-auto md:h-auto"
        onClick={prevTestimonial}
      />
      <div className="flex flex-col justify-center items-center gap-6 md:gap-10 w-full max-w-[864px] mx-auto h-full px-4 md:px-0">
        <div className="flex flex-col items-center gap-2 self-stretch text-center">
          <div className="self-stretch text-primary font-['Poppins'] text-xl md:text-[2rem] font-semibold leading-[136%]">
            Testimonial
          </div>
          <div className="self-stretch text-secondary font-['Poppins'] text-2xl md:text-5xl font-semibold leading-[136%]">
            Our Success Stories
          </div>
        </div>
        <div className="flex justify-center items-center w-full max-w-[864px] min-h-[3.375rem] flex-shrink-0 text-secondary text-center font-['Poppins'] text-base md:text-xl leading-[136%] px-4">
          {testimonials[currentIndex].text}
        </div>
        <div className="flex justify-center items-center gap-2 mt-2 md:mt-4">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-secondary opacity-50"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
      <img
        src={RightArrow}
        alt="Next"
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 cursor-pointer w-6 h-6 md:w-auto md:h-auto"
        onClick={nextTestimonial}
      />
    </div>
  );
};

export default Testimonial;
