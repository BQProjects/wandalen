import React from "react";
import OrangeWood from "../assets/orangeWood.jpg";
import MemoryIcon from "../assets/MemoryIcon.svg";
import BrainIcon from "../assets/BrainIcon.svg";
import UserGroupIcon from "../assets/UserGroupIcon.svg";

const DawnForest = () => (
  <div className="flex w-full bg-accent">
    <div className="w-1/2 h-full">
      <img
        src={OrangeWood}
        className="w-full h-full object-cover"
        alt="Virtual Walking"
      />
    </div>
    <div className="w-1/2 h-full flex flex-col justify-center p-8">
      <div className="text-primary font-poppins text-[2rem] font-semibold mb-4 mt-6">
        Features
      </div>
      <div className="text-secondary font-poppins text-5xl font-semibold mb-8 mt-6">
        Waarom virtueel <br /> wandelen?
      </div>
      <div className="flex flex-col gap-9">
        <div className="w-full h-px bg-border mt-28" />
        <div className="flex items-start gap-4">
          <img src={MemoryIcon} alt="Memory Icon" />
          <div className="flex flex-col items-start gap-2">
            <div className="text-white font-poppins text-2xl font-semibold">
              Memory Stimulation
            </div>
            <div className="text-muted font-poppins">
              Familiar sights and sounds bring back memories, sparking joy and
              recognition.
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-border" />
        <div className="flex items-start gap-4">
          <img src={BrainIcon} alt="Brain Icon" />
          <div className="flex flex-col items-start gap-2">
            <div className="text-white font-poppins text-2xl font-semibold">
              Mood & Social Boost
            </div>
            <div className="text-muted font-poppins">
              Virtual walks spark conversation — enjoy alone or share with
              family and caregivers.
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-border" />
        <div className="flex items-start gap-4">
          <img src={UserGroupIcon} alt="User Group Icon" />
          <div className="flex flex-col items-start gap-2">
            <div className="text-white font-poppins text-2xl font-semibold">
              Safe & Accessible
            </div>
            <div className="text-muted font-poppins">
              Bring nature indoors for those who can’t walk outside, with no
              risk of falling or getting lost.
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-border" />
        <div className="flex items-start gap-4">
          <img src={MemoryIcon} alt="Memory Icon" />
          <div className="flex flex-col items-start gap-2">
            <div className="text-white font-poppins text-2xl font-semibold">
              Stress & Anxiety Relief
            </div>
            <div className="text-muted font-poppins">
              Natural images and sounds help calm the mind and ease tension.
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-border" />
      </div>
    </div>
  </div>
);

export default DawnForest;
