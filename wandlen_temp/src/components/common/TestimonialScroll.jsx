import React, { useState } from "react";
import LeftArrow from "../../assets/LeftArrow.svg";
import RightArrow from "../../assets/RightArrow.svg";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const testimonials = [
    {
      text: "Virtueel Wandelen brengt de natuur tot leven met rustgevende natuurwandelvideo’s voor ouderen en mensen met dementie.",
    },
    { text: "Offering a beautiful walking experience does me good" },
    {
      text: "I would like everyone to experience what walking can bring you, peace, space, inspiration, connection. Virtual Walking... is such a great way to do that. I therefore join it with enthusiasm",
    },
    {
      text: "What I hope to get out of my volunteer work at Virtual Walking is mainly connection and meaning. I would like to... do something that really matters to others, in this case to people who can no longer walk themselves, but can still feel, experience and enjoy. In addition, it gives me satisfaction to combine my love for hiking and nature with my desire to contribute to the well-being of others. The idea that someone else can view a walk at a later time is really a great find!",
    },
    {
      text: "I am a nurse and come into contact with people with dementia at work. I also walk a lot in my spare time.",
    },
    {
      text: "Nice combination of walking, doing useful work that makes people happy.",
    },
    {
      text: "My hobbies are photography/video and walking. In addition, I think it is important to do volunteer work that... really makes sense.",
    },
    {
      text: "Making beautiful images makes me very happy. Furthermore, walking is fun and good for your health...",
    },
    { text: "A smile on someone else's face is enough." },
    {
      text: "I love walking and photography/filming and I like to share that with others",
    },
    {
      text: "I already like to walk and this is a nice combination between being physically active and doing something useful",
    },
    {
      text: "Perfect voor mensen die niet meer kunnen wandelen, maar wel willen genieten van de natuur.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setExpanded(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setExpanded(false);
  };

  return (
    <div className="relative flex-shrink-0 bg-accent px-4 py-12 md:px-0 min-h-[300px]">
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
            Testimonials
          </h3>
          <h2 className="text-secondary font-['Poppins'] text-3xl md:text-5xl font-bold leading-snug">
            Our Success Stories
          </h2>
        </div>

        {/* Testimonial Card */}
        <div
          key={currentIndex}
          className="rounded-2xl p-6 md:p-10 text-center text-secondary font-['Poppins'] text-base md:text-xl leading-relaxed max-w-3xl transition-opacity duration-500 ease-in-out"
        >
          {(() => {
            const text = testimonials[currentIndex].text;
            const maxLength = 180;
            if (text.length > maxLength && !expanded) {
              return (
                <>
                  {text.slice(0, maxLength)}...
                  <button
                    onClick={() => setExpanded(true)}
                    className="text-primary ml-2 font-semibold underline hover:text-primary/80"
                  >
                    Read More
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
                    Read Less
                  </button>
                </>
              );
            } else {
              return text;
            }
          })()}
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
