import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "../../assets/SearchIcon.svg";
import DownArrow from "../../assets/DownArrow.svg";

const FaqQuestionsVolunteer = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = t("faqVolunteer.faqs", { returnObjects: true });

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-shrink-0 justify-center items-center pt-8 md:pt-[6.75rem] pb-8 md:pb-[6.75rem] px-4 md:px-[10.125rem] w-full bg-dark-green">
      <div className="flex flex-col items-start gap-6 md:gap-8 w-full max-w-4xl">
        <div className="frame-1 flex flex-col md:flex-row md:items-center justify-center md:justify-between self-stretch gap-4 md:gap-0">
          <div className="w-full text-white text-center font-semibold font-poppins text-xl md:text-2xl leading-[1.875rem]">
            {t("faqVolunteer.title")}
          </div>
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
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
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

export default FaqQuestionsVolunteer;
