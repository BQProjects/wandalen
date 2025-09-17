import React, { useState } from 'react';

const VolunteerFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What kind of music is used with the videos?",
      answer: "We use calming, nature-inspired music that complements the walking videos without overpowering the natural sounds."
    },
    {
      question: "How are the recordings edited?",
      answer: "Our team edits the videos to ensure smooth transitions, appropriate pacing, and optimal quality for relaxation."
    },
    {
      question: "Do I have to film everything in 1 go?",
      answer: "No, you can film in multiple sessions. We can combine clips to create a complete walking experience."
    },
    {
      question: "I would like to learn more about dementia, to delve into the target group, is that possible?",
      answer: "Yes, we provide training sessions and resources to help volunteers understand dementia and create more effective content."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex justify-center items-center pt-[6.75rem] pb-[15.3125rem] pl-[10.125rem] pr-[10.125rem] bg-[#2a341f]">
      <div className="flex flex-col items-start gap-8">
        <div className="frame-1 flex items-center self-stretch gap-4">
          <div className="w-[956px] text-white text-center font-['Poppins'] text-2xl leading-[1.875rem]">
            Frequently Asked Questions
          </div>
          <svg width={24} height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.961 5.5C14.253 5.5 16.922 8.169 16.922 11.461C16.922 12.831 16.46 14.092 15.684 15.099L18.948 18.365C19.011 18.427 19.023 18.521 18.986 18.595L18.948 18.647L18.148 19.448C18.085 19.511 17.991 19.523 17.916 19.486L17.865 19.448L14.599 16.184C13.592 16.96 12.331 17.422 10.961 17.422C7.67 17.422 5 14.753 5 11.462C5 8.168 7.669 5.5 10.961 5.5ZM10.956 6.579C8.262 6.579 6.079 8.762 6.079 11.456C6.079 14.15 8.262 16.333 10.956 16.333C13.65 16.333 15.833 14.15 15.833 11.456C15.833 8.762 13.65 6.579 10.956 6.579Z" fill="white" />
          </svg>
        </div>
        <div className="flex flex-col items-start w-[956px]">
          {faqs.map((faq, index) => (
            <div key={index} className="w-full">
              <div className="flex flex-col items-start gap-6 pb-6">
                <div
                  className="flex justify-between items-center py-6 px-0 w-[956px] cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="text-white font-['Poppins'] text-xl font-medium leading-[1.3125rem]">
                    {faq.question}
                  </div>
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  >
                    <path d="M17 14L12 9L7 14" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {openIndex === index && (
                <div className="pb-6 px-0">
                  <div className="text-white font-['Poppins'] text-lg leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
              <div className="w-[954px] h-px bg-[#e5e3df]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerFaq;
