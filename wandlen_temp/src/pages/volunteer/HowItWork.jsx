import React from "react";
import HowItWorkCam from "../../assets/HowItWorkCamera.svg";
import SecondCam from "../../assets/SecondCam.svg";
import CameraIcon from "../../assets/CameraIcon.svg";
import SoundIcon from "../../assets/SoundIcon.svg";
import FocusIcon from "../../assets/FocusIcon.svg";
import SunIcon from "../../assets/SunIcon.svg";
import ClothingIcon from "../../assets/ClothingIcon.svg";
import SunShadowIcon from "../../assets/SunShadowIcon.svg";
import RotationIcon from "../../assets/RotationIcon.svg";
import PathIcon from "../../assets/PathIcon.svg";
import Testimonial from "../../components/common/TestimonialScroll";
import HandHold from "../../assets/HandHold.png";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <div className="min-h-screen font-base">
      <main className="bg-border">
        <div className="relative w-full h-[86vh] flex items-center justify-center">
          {/* Background Image */}
          <img
            src={HandHold}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay Filter */}
          <div className="absolute inset-0 bg-[#2A341F] opacity-75"></div>

          {/* Centered Text */}
          <div className="relative text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl lg:text-2xl font-semibold font-[Poppins] text-[#DD9219] mb-4">
              How to help as a Volunteer
            </h1>
            <p className="text-5xl text-[#EDE4DC] font-medium font-[Poppins] max-w-2xl mx-auto">
              Bring nature to those who can’t walk
            </p>
            <p className="text-2xl text-[#EDE4DC] font-medium font-[Poppins] max-w-2xl mx-auto mt-4">
              Record or upload videos of nature and share them with clients. Ask
              questions or leave a message anytime!
            </p>
          </div>
        </div>

        {/* Section 2: Interactive Camera Guide */}
        <section className="bg-secondary py-16 px-4 sm:px-10 md:px-20">
          <div className="mx-auto flex flex-col md:flex-row items-center gap-8">
            {/* SVG on the left */}
            <div className="flex-shrink-0">
              <img src={HowItWorkCam} alt="Camera Guide" />
            </div>
            {/* Text component on the right */}
            <div className="flex-1">
              <div className="flex flex-col items-start gap-5 w-full">
                <div className="flex flex-col items-start gap-1.5 self-stretch">
                  <div className="self-stretch text-brown font-[Poppins] font-base text-[2rem] font-semibold leading-[136%] tracking-tight-4">
                    How does the camera work again?
                  </div>
                  <div className="self-stretch font-[Poppins] text-brown font-base text-xl font-medium leading-[136%] tracking-tight-2">
                    Want to create nature videos for Virtual Walking? We offer
                    training sessions where you’ll learn step by step how to use
                    the camera, along with practical tips to make filming as
                    easy as possible. We recommend joining a training first
                    before you get started. Need a refresher afterwards on how
                    to use the camera? You’ll find everything you need on the
                    dedicated instruction page.
                  </div>
                </div>
                <a href="#extrainstructions">
                  <div className="flex items-center font-[Poppins] gap-2.5 py-2 px-0 rounded-lg text-olive font-base text-xl font-medium leading-[136%] underline tracking-tight-2 link">
                    View the extra instructions
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-accent py-16 px-4 sm:px-10 md:px-20">
          <div
            className="mx-auto flex flex-col items-center"
            id="extrainstructions"
          >
            {/* Top Text - Left-Aligned */}
            <div className="self-start mb-4">
              <div className="font-[Poppins] self-stretch text-white font-base text-[2rem] font-semibold leading-[136%]">
                Hoe gebruik je de camera?
              </div>
            </div>

            {/* Below Text */}
            <div className="self-start mb-8">
              <div className="self-stretch font-[Poppins] text-white font-base text-xl font-medium leading-[136%]">
                Door op de informatie icoontjes te drukken krijg je weer even
                opfrisser over het gebruik van de camera.
              </div>
            </div>

            {/* Centered SVG */}
            <div className="flex justify-center">
              <img
                src={SecondCam}
                alt="Camera Guide"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="bg-secondary py-16 px-4 sm:px-10 md:px-20">
          <div className="mx-auto px-4 flex flex-col items-center">
            {/* Title and Description */}
            <div className="flex flex-col items-start gap-1.5 w-full mb-8">
              <div className="self-stretch font-[Poppins] text-brand font-base text-[2rem] font-semibold leading-[136%]">
                Meer tips voor jou als vrijwilliger
              </div>
              <div className="self-stretch font-[Poppins] text-brown font-base text-xl font-medium leading-[136%]">
                Met deze extra tips zorg je voor een fijne ervaring voor de
                kijker én jezelf.
              </div>
            </div>

            {/* 3x2 Grid for the 6 Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Box 1 */}
              <div className="flex justify-center items-center gap-5 pt-[1.875rem] pr-[1.875rem] pb-[1.875rem] pl-[1.875rem] rounded-lg bg-border">
                <img src={CameraIcon} alt="Camera Icon" />
                <div className="text-brown font-[Poppins] font-base text-2xl font-semibold leading-[136%]">
                  Neem je spullen mee: selfiestick, beschermhoesje camera,
                  beschermlens.
                </div>
              </div>

              {/* Box 2 */}
              <div className="flex justify-center items-center gap-5 pt-[1.875rem] pr-[1.875rem] pb-[1.875rem] pl-[1.875rem] rounded-lg bg-border">
                <img src={SoundIcon} alt="Sound Icon" />
                <div className="text-brown font-[Poppins] font-base text-2xl font-semibold leading-[136%]">
                  Ademhaling: niet hijgen in de camera, geen geluiden maken.
                </div>
              </div>

              {/* Box 3 */}
              <div className="flex justify-center items-center gap-5 pt-[1.875rem] pr-[1.875rem] pb-[1.875rem] pl-[1.875rem] rounded-lg bg-border">
                <img src={FocusIcon} alt="Focus Icon" />
                <div className="font-[Poppins] text-brown font-base text-2xl font-semibold leading-[136%]">
                  Als je wil focussen, dan moet je er heel dicht op.
                </div>
              </div>

              {/* Box 4 */}
              <div className="flex justify-center items-center gap-5 pt-[1.875rem] pr-[1.875rem] pb-[1.875rem] pl-[1.875rem] rounded-lg bg-border">
                <img src={SunIcon} alt="Sun Icon" />
                <div className="text-brown font-[Poppins] font-base text-2xl font-semibold leading-[136%]">
                  Tijdens zonsopkomst is er mooi licht buiten, dit is de ideale
                  tijd om op pad te gaan.
                </div>
              </div>

              {/* Box 5 */}
              <div className="flex justify-center items-center gap-5 pt-[1.875rem] pr-[1.875rem] pb-[1.875rem] pl-[1.875rem] rounded-lg bg-border">
                <img src={ClothingIcon} alt="Clothing Icon" />
                <div className="text-brown font-[Poppins] font-base text-2xl font-semibold leading-[136%]">
                  Kleding: let op schuren van je jas, rits die geluid maakt.
                </div>
              </div>

              {/* Box 6 */}
              <div className="flex justify-center items-center gap-5 pt-[1.875rem] pr-[1.875rem] pb-[1.875rem] pl-[1.875rem] rounded-lg bg-border">
                <img src={SunShadowIcon} alt="Sun Shadow Icon" />
                <div className="text-brown font-[Poppins] font-base text-2xl font-semibold leading-[136%]">
                  Zon: je eigen schaduw met de stick voorkomen, iets meer opzij
                  filmen.
                </div>
              </div>

              {/* Box 7 */}
              <div className="flex justify-center items-center gap-5 pt-[1.875rem] pr-[1.875rem] pb-[1.875rem] pl-[1.875rem] rounded-lg bg-border">
                <img src={RotationIcon} alt="Sun Shadow Icon" />
                <div className="text-brown font-[Poppins] font-base text-2xl font-semibold leading-[136%]">
                  Heel rustig draaien als je een richting wilt laten zien, tegen
                  je gevoel in; te langzaam.
                </div>
              </div>

              {/* Box 8 */}
              <div className="flex justify-center items-center gap-5 pt-[1.875rem] pr-[1.875rem] pb-[1.875rem] pl-[1.875rem] rounded-lg bg-[#d9bbaa]">
                <img src={PathIcon} alt="Sun Shadow Icon" />
                <div className="text-[#381207] font-['Poppins'] text-2xl font-semibold leading-[136%]">
                  Blijf in principe op de paden (een beetje struinen is
                  geoorloofd).
                </div>
              </div>
            </div>
          </div>
        </section>
        <Testimonial />
      </main>
      <Footer />
    </div>
  );
}

export default HowItWorks;
