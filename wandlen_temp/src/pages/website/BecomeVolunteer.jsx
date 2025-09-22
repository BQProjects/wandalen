import React, { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import PositiveImage from "../../assets/PositiveImage.jpg";
import VideoTraning from "../../assets/VideoTraning.png";
import CameraTips from "../../assets/CameraTips.png";
import NatureWalk from "../../assets/NatureWalk.png";
import VolunteerAction from "../../assets/VolunteerAction.jpg";
import FaqQuestionsVolunteer from "../../components/volunteer/FaqQuestionsVolunteer";
import Testimonial from "../../components/common/TestimonialScroll";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";

const BecomeVolunteer = () => {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="bg-dark-green h-[86vh] text-white px-4 py-16 flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center mt-20 mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-6 font-['Poppins']">
            Become a Volunteer with Virtual Walking
          </h1>
          <p className="text-xl md:text-3xl font-medium font-['Poppins'] max-w-4xl mx-auto leading-relaxed space-x-1">
            For many - from seniors in care to those with limited mobility -
            nature can feel far away. Virtual Walking brings Overijssel's beauty
            indoors with calming walking videos that inspire relaxation and
            connection. And we can't do it without you.
          </p>
        </div>
      </section>
      {/* Events Section */}
      <section className="bg-secondary px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {[
              {
                date: "19",
                month: "Sep",
                image: VideoTraning,
                title: "Video Training",
                description:
                  "Learn how to get started as a volunteer. We'll introduce you to Virtual Walking, explain the basics, and guide you through the first steps.",
                link: "/video-training",
              },
              {
                date: "24",
                month: "Sep",
                image: CameraTips,
                title: "Camera Tips & Introduction",
                description:
                  "Join a short hands-on session where you'll discover how to film calming nature walks and use the provided equipment with ease.",
                link: "/camera-tips",
              },
              {
                date: "03",
                month: "Oct",
                image: NatureWalk,
                title: "Nature Walk Filming Practice",
                description:
                  "Head outdoors with your camera and practice capturing beautiful nature walks. Enthusiasm counts more than experience!",
                link: "/nature-walking",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="bg-brown text-secondary rounded-lg p-4 text-center min-w-[110px]">
                  <div className="text-4xl font-['Poppins'] font-bold">
                    {event.date}
                  </div>
                  <div className="text-xl font-['Poppins'] font-medium">
                    {event.month}
                  </div>
                </div>

                <div className="bg-gray-300 w-full md:w-60 h-48 md:h-40 rounded-lg bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center flex-shrink-0">
                  <img
                    src={event.image}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-primary font-['Poppins'] text-2xl font-semibold">
                    {event.title}
                  </h3>
                  <p className="text-brown font-['Poppins'] text-lg leading-relaxed">
                    {event.description}
                  </p>
                  <Link to={event.link}>
                    <button className="bg-primary font-['Poppins'] text-white px-6 py-2 rounded-lg font-medium hover:bg-dark-olive transition-colors">
                      More Information
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-dark-green text-white px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-primary font-['Poppins'] text-2xl font-semibold mb-2">
                  Positive Benefits
                </p>
                <h2 className="text-4xl md:text-5xl font-['Poppins'] font-semibold mb-8">
                  Why Virtual Walking?
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  "Brings nature safely indoors - gives people the chance to enjoy nature without risks, especially for those unable to walk outside.",
                  "Stimulates memories - familiar sounds and views can trigger recognition and joyful moments.",
                  "Encourages social connection - creates shared experiences with family, caregivers, or fellow residents — and can also be enjoyed alone.",
                  "Reduces anxiety and stress - soothing natural sights and sounds help ease restlessness and bring calm.",
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 py-3 border-b border-border/20"
                  >
                    <Check
                      className="text-primary mt-1 flex-shrink-0"
                      size={24}
                    />
                    <p className="text-lg leading-relaxed font-['Poppins']">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  className="bg-primary text-white font-['Poppins'] px-4 py-2 rounded-lg text-lg font-medium hover:bg-dark-olive transition-colors"
                  onClick={() => (window.location.href = "/volunteer-signup")}
                >
                  Join as Volunteer
                </button>
                <button
                  className="bg-primary text-white font-['Poppins'] px-4 py-2 rounded-lg text-lg font-medium hover:bg-dark-olive transition-colors"
                  onClick={() => (window.location.href = "/login")}
                >
                  Already a Volunteer
                </button>
              </div>
            </div>

            <div className="rounded-2xl h-full flex items-center justify-center">
              <img
                src={PositiveImage}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-primary font-['Poppins'] text-2xl font-semibold mb-2">
                How it works
              </p>
              <h2 className="text-4xl md:text-5xl font-['Poppins'] font-semibold text-brown">
                Joining is easy — just follow these steps
              </h2>
            </div>
            <button
              className="bg-primary font-['Poppins'] text-white px-4 py-2 rounded-lg text-lg font-medium hover:bg-dark-olive transition-colors hidden lg:block"
              onClick={() => (window.location.href = "/volunteer-signup")}
            >
              Know More
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Sign up as a volunteer",
                description:
                  "Show your interest through our simple form or reach out directly. We'll be happy to connect and welcome you.",
              },
              {
                number: "2",
                title: "Introduction and short training",
                description:
                  "We'll schedule a short session to explain how to film walks and guide you in using the equipment with confidence.",
              },
              {
                number: "3",
                title: "Explore with your camera",
                description:
                  "Head outdoors to capture beautiful nature walks on your own. No professional skills are needed, just your enthusiasm.",
              },
              {
                number: "4",
                title: "Share on the platform",
                description:
                  "Upload your videos easily through our platform. We'll edit them and make sure they reach people who will enjoy them.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="bg-[#f7f6f4] rounded-2xl p-8 space-y-6"
              >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-brown text-3xl font-['Poppins'] font-semibold">
                    {step.number}
                  </span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-brown text-2xl font-['Poppins'] font-medium">
                    {step.title}
                  </h3>
                  <p className="text-brown font-['Poppins'] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Volunteers Section */}
      <section className="bg-accent text-white">
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <div className="rounded-2xl h-full flex items-center justify-center">
              <img
                src={VolunteerAction}
                alt="Volunteer in Action"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-8 py-8 px-4">
              <div>
                <p className="text-primary text-2xl font-['Poppins'] font-semibold mb-2 mt-10">
                  Want to help?
                </p>
                <h2 className="text-4xl md:text-5xl font-['Poppins'] font-semibold text-secondary">
                  Why Volunteers Are Essential
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "Nature & Filming Passion",
                    description:
                      "Love being in nature and enjoy filming? Combine both to create relaxing virtual walk videos.",
                  },
                  {
                    title: "Guidance & Tips",
                    description:
                      "Get a short hands-on session with practical tips & tricks for making calming nature videos.",
                  },
                  {
                    title: "Tools Provided",
                    description:
                      "Enjoy free use of our camera to capture your walk in high quality.",
                  },
                  {
                    title: "Constructive Feedback",
                    description:
                      "Receive helpful feedback to make your videos even more engaging and soothing.",
                  },
                  {
                    title: "Share Your Work",
                    description:
                      "Your video will be shared on our platform with a large, appreciative audience.",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="w-full h-px bg-border mb-6"></div>
                    <div className="flex items-start gap-3">
                      <Check
                        className="text-primary mt-1 flex-shrink-0"
                        size={24}
                      />
                      <div>
                        <h3 className="text-2xl font-['Poppins'] font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted font-['Poppins'] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-full h-px bg-border"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FaqQuestionsVolunteer />
      <Testimonial />
      <SubscribeCard />
      <Footer />
    </div>
  );
};

export default BecomeVolunteer;
