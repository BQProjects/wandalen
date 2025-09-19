import React, { useState } from "react";
import SearchIcon from "../../assets/SearchIcon.svg";
import DownArrow from "../../assets/DownArrow.svg";

const FaqQuestionsVolunteer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What kind of music is used with the videos?",
      answer:
        "The basis of the videos are the sounds that occur at the moment you film: the wind through the trees, rippling water, geese flying overhead, your footsteps on the ground... What we want to add is the option to choose music when playing the video so that people have the option to turn on music that they like. So that will be an extra option that can be chosen personally.",
    },
    {
      question: "How are the recordings edited?",
      answer:
        "We work with an editor who edits the videos. This removes annoying noises or unpleasant images (for example, a too fast turn). The videos are played at the pace that is being walked, so no slower or faster. The pieces of video flow smoothly into each other (one clip fades while the other comes into view) so that there are quiet transitions and it is experienced as pleasant.",
    },
    {
      question: "Do I have to film everything in 1 go?",
      answer:
        "No, as soon as you have started filming and you want to stop for whatever reason (rest on a bench yourself, or blow your nose for example) you can stop the recording. If you want to continue, turn the camera back on and continue your walk. The editor puts the videos together. So you can also take a break in between if necessary.No, as soon as you have started filming and you want to stop for whatever reason (rest on a bench yourself, or blow your nose for example) you can stop the recording. If you want to continue, turn the camera back on and continue your walk. The editor puts the videos together. So you can also take a break in between if necessary.",
    },
    {
      question:
        "I would like to learn more about dementia, to delve into the target group, is that possible?",
      answer:
        "Yes, there are websites that give you more information about the number 1 national disease: Dementia. For more information, visit <a href='https://www.alzheimer-nederland.nl' target='_blank' rel='noopener noreferrer' class='text-primary underline'>www.alzheimer-nederland.nl</a> or <a href='https://www.samendementievriendelijk.nl' target='_blank' rel='noopener noreferrer' class='text-primary underline'>www.samendementievriendelijk.nl</a>",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-shrink-0 justify-center items-center pt-8 md:pt-[6.75rem] pb-8 md:pb-[6.75rem] px-4 md:px-[10.125rem] w-full bg-dark-green">
      <div className="flex flex-col items-start gap-6 md:gap-8 w-full max-w-4xl">
        <div className="frame-1 flex flex-col md:flex-row md:items-center justify-center md:justify-between self-stretch gap-4 md:gap-0">
          <div className="w-full text-white text-center font-semibold font-poppins text-xl md:text-2xl leading-[1.875rem]">
            Frequently Asked Questions
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
