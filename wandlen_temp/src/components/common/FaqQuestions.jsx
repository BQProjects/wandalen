import React, { useState } from "react";
import SearchIcon from "../../assets/SearchIcon.svg";
import DownArrow from "../../assets/DownArrow.svg";

const FaqQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Virtual Walking?",
      answer:
        "Virtual Walking is an innovative platform that provides immersive virtual reality experiences of walking through various scenic locations, designed to promote relaxation and mental well-being.",
    },
    {
      question: "Who is Virtual Walking for?",
      answer:
        "Virtual Walking is suitable for anyone looking to relax, reduce stress, or experience the benefits of walking without physical exertion. It's particularly beneficial for individuals with mobility challenges, the elderly, or those seeking mindfulness practices.",
    },
    {
      question: "Are the videos and sounds calming?",
      answer:
        "Yes, all Virtual Walking videos feature soothing visuals and calming soundscapes, including gentle nature sounds, soft music, and ambient audio to enhance the relaxation experience.",
    },
    {
      question: "Is it suitable for people in an advanced stage of dementia?",
      answer:
        "Virtual Walking can be beneficial for individuals with dementia, as it provides familiar and comforting environments. However, it's recommended to consult with healthcare professionals for personalized suitability.",
    },
    {
      question: "Can I choose walks by theme or location?",
      answer:
        "Absolutely! Virtual Walking offers a wide variety of walks categorized by themes (e.g., forest, beach, mountain) and specific locations from around the world, allowing you to choose based on your preferences.",
    },
    {
      question: "Can Virtual Walking be used independently?",
      answer:
        "Yes, Virtual Walking is designed for independent use. The interface is user-friendly, and you can navigate through walks at your own pace without assistance.",
    },
    {
      question: "Do I need to be able to walk to use Virtual Walking?",
      answer:
        "No physical walking ability is required. Virtual Walking is entirely virtual, so you can enjoy the experience from a seated position or even while lying down.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-shrink-0 justify-center items-center pt-8 md:pt-[6.75rem] pb-8 md:pb-[6.75rem] px-4 md:px-[10.125rem] w-full bg-dark-green">
      <div className="flex flex-col items-start gap-6 md:gap-8 w-full max-w-4xl">
        <div className="frame-1 flex flex-col md:flex-row md:items-center justify-center md:justify-between self-stretch gap-4 md:gap-0">
          <div className="w-full text-white text-center md:text-left font-poppins text-xl md:text-2xl leading-[1.875rem]">
            Frequently Asked Questions
          </div>
          <img
            src={SearchIcon}
            alt="Search Icon"
            className="w-6 h-6 md:w-auto md:h-auto self-center md:self-auto"
          />
        </div>
        <div className="flex flex-col items-start w-full">
          {faqs.map((faq, index) => (
            <div key={index} className="w-full">
              <div
                className="flex justify-between items-center py-4 md:py-6 px-0 w-full cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div className="text-white font-poppins text-lg md:text-xl font-medium leading-[1.3125rem] pr-4">
                  {faq.question}
                </div>
                <img
                  src={DownArrow}
                  alt="Down Arrow"
                  className={`transition-transform duration-300 w-5 h-5 md:w-auto md:h-auto flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`text-white font-poppins text-sm md:text-base leading-[1.5rem] pb-4 md:pb-6 px-0 ${
                  openIndex === index ? "block" : "hidden"
                }`}
              >
                {faq.answer}
              </div>
              {index < faqs.length && (
                <div className="w-full h-px bg-secondary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqQuestions;
