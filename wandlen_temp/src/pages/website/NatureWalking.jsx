import React, { useState } from "react";
import { MapPin, Clock, Users } from "lucide-react";
import Testimonial from "../../components/common/TestimonialScroll";
import Footer from "../../components/Footer";
import SubscribeCard from "../../components/SubscribeCard";
import FaqQuestionsVolunteer from "../../components/volunteer/FaqQuestionsVolunteer";

const NatureWalking = () => {
  return (
    <div className="min-h-screen bg-[#ede4dc]">
      {/* Hero Section */}
      <section className="bg-[#2a341f] h-[86vh] text-white px-4 py-16 flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center mt-20 mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#a6a643] mb-6 font-['Poppins']">
            Become a Volunteer with Virtual Walking
          </h1>
          <p className="text-xl md:text-2xl font-medium font-['Poppins'] max-w-4xl mx-auto leading-relaxed">
            For many - from seniors in care to those with limited mobility -
            nature can feel far away. Virtual Walking brings Overijssel's beauty
            indoors with calming walking videos that inspire relaxation and
            connection. And we can't do it without you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-col mx-auto">
        <div className="max-w-7xl mx-auto p-16 w-full">
          <div className="flex flex-col items-start gap-2 mb-5 px-2">
            <h2 className="text-[#a6a643] text-3xl font-semibold leading-tight font-['Poppins']">
              Nature Walk Filming Practice
            </h2>
            <h3 className="text-[#381207] text-5xl font-semibold leading-tight font-['Poppins']">
              Sep 19, 2025 | Lemelerveld
            </h3>
          </div>
          {/* Event Details Grid */}
          <div className="grid lg:grid-cols-3 gap-6 pt-5 pb-5 bg-[#f7f6f4] rounded-2xl px-4 md:px-6">
            {/* Content Section */}
            <div className="lg:col-span-2 rounded-2xl p-6 md:p-8">
              <div className="mb-6 md:mb-8">
                <h3 className="text-[#dd9219] text-xl md:text-2xl lg:text-3xl font-semibold mb-4 font-['Poppins']">
                  What to Expect?
                </h3>
                <div className="text-[#381207] text-base md:text-lg space-y-3 font-['Poppins']">
                  <p>
                    • Practical camera workshop: learn how to make stable, calm,
                    and atmospheric recordings
                  </p>
                  <p>• Tips on sound, lighting, and movement</p>
                  <p>• Practice together with the camera</p>
                  <p>• Ask questions to the video coach</p>
                  <p>• Lunch and a walk with other volunteers</p>
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <h3 className="text-[#dd9219] text-xl md:text-2xl lg:text-3xl font-semibold mb-4 font-['Poppins']">
                  Why Join?
                </h3>
                <p className="text-[#381207] text-base md:text-lg leading-relaxed font-['Poppins']">
                  Whether you're just starting out or already have filming
                  experience, this day will help you create beautiful walking
                  videos for older adults (with dementia). It's also a great way
                  to meet other volunteers and share experiences.
                </p>
              </div>
              <button
                onClick={() => (window.location.href = "/volunteer-signup")}
                className="bg-[#a6a643] text-white px-4 md:px-8 py-2 rounded-lg text-lg md:text-xl font-medium hover:bg-[#8d8f37] transition-colors duration-300 font-['Poppins']"
              >
                Sign up now for the meeting
              </button>
            </div>

            {/* Practical Information Sidebar */}
            <div className="bg-[#381207] rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-[#dd9219] text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8 font-['Poppins']">
                Practical Information
              </h3>

              <div className="space-y-6 md:space-y-8">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#ede4dc] w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#ede4dc] text-lg md:text-xl font-semibold mb-1 font-['Poppins']">
                      Location
                    </h4>
                    <p className="text-[#ede4dc] text-base md:text-lg font-['Poppins']">
                      Dominee C. Keersstraat 79
                      <br />
                      8151 AB Lemelerveld
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-4">
                  <Clock className="text-[#ede4dc] w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#ede4dc] text-lg md:text-xl font-semibold mb-1 font-['Poppins']">
                      Time
                    </h4>
                    <p className="text-[#ede4dc] text-base md:text-lg font-['Poppins']">
                      10:00 AM to 2:30 PM
                    </p>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="flex items-start gap-4">
                  <Users className="text-[#ede4dc] w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#ede4dc] text-lg md:text-xl font-semibold mb-1 font-['Poppins']">
                      For whom?
                    </h4>
                    <p className="text-[#ede4dc] text-base md:text-lg font-['Poppins']">
                      Volunteers who create videos for Virtual Walking (or want
                      to get started)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FaqQuestionsVolunteer />
        <Testimonial />
        <SubscribeCard />
      </div>
      <Footer />
    </div>
  );
};

export default NatureWalking;
