import React from "react";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import blog4 from "../../assets/blog4.png";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";

const NatureBenefits = () => {
  return (
    <div className="flex-shrink-0 bg-secondary">
      <div className="flex-shrink-0">
        {/* Title */}
        <div className="inline-flex flex-col items-start gap-4 px-4 sm:px-10 md:px-20">
          <div className="text-primary font-[Poppins] text-xl md:text-[2rem] font-semibold leading-[136%]">
            Nature Stories
          </div>
          <div className="w-full md:w-[654px] text-brown font-[Poppins] text-2xl sm:text-3xl md:text-5xl font-semibold leading-[136%] text-center md:text-left">
            Nature’s Benefits for Body and Mind
          </div>
        </div>

        {/* Main section */}
        <div className="flex flex-col md:flex-col items-center md:items-start justify-between mt-8 gap-10 md:gap-0 mb-20 px-4 sm:px-10 md:px-20">
          <img
            src={blog4}
            className="w-full h-auto rounded-3xl object-cover shadow-lg"
          />
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <div className="flex flex-col items-start gap-4 mt-10">
              <div className="flex flex-col items-start gap-5">
                <div className="w-full text-brown text-left font-[Poppins] text-base sm:text-lg md:text-2xl leading-[136%]">
                  Nature has always been more than just a backdrop to our lives.
                  It is the air we breathe, the water we drink, and the ground
                  we walk on. Yet, in our fast-paced world, it’s easy to forget
                  the powerful role that nature plays in our physical,
                  emotional, and social well-being. <br />
                  Spending time outdoors—even for a short walk—has been proven
                  to reduce stress, lower blood pressure, and improve
                  concentration. For children, nature inspires curiosity,
                  imagination, and play. For older adults, it awakens memories
                  and creates moments of calm and recognition. But nature’s
                  importance goes beyond individual health. It connects us.
                  Shared experiences in a park, forest, or garden bring
                  families, friends, and even communities closer. In this sense,
                  nature is both a healer and a unifier.
                </div>
                <div className="w-full text-brown text-left font-[Poppins] text-base sm:text-lg md:text-2xl leading-[136%]">
                  <div className="  text-black text-justify font-['Poppins'] text-xl leading-[180%]">
                    <h2 className="text-2xl font-semibold mb-4 text-brown">
                      Why it matters now:
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        🌱 Mental health boost – Green spaces reduce anxiety and
                        increase happiness.
                      </li>
                      <li>
                        🌞 Physical health – Regular exposure to fresh air and
                        sunlight strengthens immunity and improves sleep.
                      </li>
                      <li>
                        🌍 A deeper bond – Connecting with nature nurtures a
                        sense of belonging and care for the planet.
                      </li>
                      <li>
                        When we choose to slow down and embrace nature—even in
                        small ways, like listening to birdsong or feeling the
                        grass under our feet—we remind ourselves that we are
                        part of something larger.
                      </li>
                      ✨ Nature isn't just "out there." It's part of who we are.
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonial />
      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </div>
  );
};

export default NatureBenefits;
