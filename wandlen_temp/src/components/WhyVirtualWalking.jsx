import React from "react";
import OrangeWood from "../assets/orangeWood.jpg";
import MemoryIcon from "../assets/MemoryIcon.svg";
import BrainIcon from "../assets/BrainIcon.svg";
import UserGroupIcon from "../assets/UserGroupIcon.svg";

const WhyVirtualWalking = () => (
  <div className="flex flex-col md:flex-row w-full  bg-accent mx-auto">
    <div className="w-full md:w-1/2 h-64 md:h-full">
      <img
        src={OrangeWood}
        className="w-full h-full object-cover"
        alt="Virtual Walking"
      />
    </div>
    <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-4 md:p-8">
      <div className="text-primary font-[Poppins] text-xl md:text-[2rem] font-semibold mb-2 md:mb-4 mt-4 md:mt-6">
        Why Virtual Walking?
      </div>
      <div className="text-secondary font-[Poppins] text-2xl md:text-5xl font-semibold mb-4 md:mb-8 mt-2 md:mt-6">
        Experience nature, wherever you are.
      </div>
      <div className="flex flex-col gap-4 md:gap-9">
        <div className="w-full h-px bg-border mt-8 md:mt-28" />
        <div className="flex items-start gap-3 md:gap-4">
          <img
            src={MemoryIcon}
            alt="Memory Icon"
            className="w-8 h-8 md:w-auto md:h-auto mt-1"
          />
          <div className="flex flex-col items-start gap-1 md:gap-2">
            <div className="text-white font-[Poppins] text-lg md:text-2xl font-semibold">
              Memory Stimulation
            </div>
            <div className="text-muted font-[Poppins] text-sm md:text-base">
              Familiar sights and sounds bring back memories, sparking joy and
              recognition.
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-border" />
        <div className="flex items-start gap-3 md:gap-4">
          <img
            src={BrainIcon}
            alt="Brain Icon"
            className="w-8 h-8 md:w-auto md:h-auto mt-1"
          />
          <div className="flex flex-col items-start gap-1 md:gap-2">
            <div className="text-white font-[Poppins] text-lg md:text-2xl font-semibold">
              Mood & Social Boost
            </div>
            <div className="text-muted font-[Poppins] text-sm md:text-base">
              Virtual walks spark conversation — enjoy alone or share with
              family and caregivers.
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-border" />
        <div className="flex items-start gap-4">
          <img src={UserGroupIcon} alt="User Group Icon" />
          <div className="flex flex-col items-start gap-2">
            <div className="text-white font-[Poppins] text-2xl font-semibold">
              Safe & Accessible
            </div>
            <div className="text-muted font-[Poppins]">
              Bring nature indoors for those who can’t walk outside, with no
              risk of falling or getting lost.
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-border" />
        <div className="flex items-start gap-3 md:gap-4">
          <img
            src={MemoryIcon}
            alt="Memory Icon"
            className="w-8 h-8 md:w-auto md:h-auto mt-1"
          />
          <div className="flex flex-col items-start gap-1 md:gap-2">
            <div className="text-white font-[Poppins] text-lg md:text-2xl font-semibold">
              Stress & Anxiety Relief
            </div>
            <div className="text-muted font-[Poppins] text-sm md:text-base">
              Natural images and sounds help calm the mind and ease tension.
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-border" />
      </div>
    </div>
  </div>
);

export default WhyVirtualWalking;
