import React from "react";
import tina from "../../assets/tina.jpg";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";

function ReadMoreAboutTina() {
  return (
    <div className="bg-[#ede4dc] min-h-screen">
      {/* Header Section */}
      <div className="py-20 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start gap-2 mb-12">
            <div className="text-[#a6a643] font-['Poppins'] text-[2rem] font-semibold leading-[136%]">
              Tina Rozendal – van der Meer
            </div>
            <div className="max-w-4xl text-[#381207] font-['Poppins'] text-3xl lg:text-5xl font-semibold leading-[136%]">
              founder of Virtueel Wandelen.
            </div>
          </div>

          <div className="inline-flex items-start gap-12 mb-20">
            {/* Left Image */}
            <div className="w-[662px] h-[985px] rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={tina}
                alt="Tina Rozendal"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Text Content */}
            <div className="flex flex-col items-start gap-10 w-[558px]">
              <div className="flex flex-col items-start gap-5 self-stretch">
                <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-xl leading-[160%]">
                  Tina grew up on the outskirts of the village of Haarle in
                  Salland, Overijssel. At this hobby farm she was often outside,
                  in the vegetable garden, the meadow, by the pond or the other
                  animals in the yard. She grew up with nature around her. Tina
                  helps both healthcare organizations and government agencies as
                  a process supervisor in greening and connection on the theme
                  of nature &amp; health.&nbsp;
                </div>
                <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-xl leading-[160%]">
                  Tina comes from a care family. Both her parents worked in the
                  hospital. Her mother as a nurse and her father started in the
                  operating room as an anesthesia assistant and then focused on
                  improving the logistics processes in hospitals in his career.
                  Tina learned from her family how your body works and how to
                  build in peace by listening to your body and connecting with
                  nature. She likes to bring this basic need of man for a
                  natural environment and its influence on your body and mind
                  back to people in this way.
                </div>
                <div className="self-stretch text-[#381207] text-justify font-['Poppins'] text-xl leading-[160%]">
                  Tina has the qualities of an inspiring connector. She uses her
                  personal qualities to make an impact. Tina is warm and
                  sensitive, enthusiastic and energetic and alert to new
                  opportunities and possibilities. She is also inspiring and
                  mobilizing, optimistic, independent and original. These
                  characteristics have ensured that she has developed this plan
                  and to realize this platform. Virtual Walking therefore aims
                  to focus on the well-being and resilience of people by making
                  a direct connection with nature in an environment where it is
                  no longer taken for granted.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </div>
  );
}

export default ReadMoreAboutTina;
