import React from "react";
import HoldHands from "../assets/HoldHands.png";

const SubscribeCard = () => (
  <div className="flex justify-center items-center w-full py-16 bg-[#ede4dc]">
    <div className="flex items-start gap-16 p-12 max-w-[1200px] w-full rounded-3xl bg-white shadow-lg">
      <div className="flex flex-col items-start gap-8 flex-1">
        <h2 className="text-[#381207] font-['Poppins'] text-2xl font-semibold">
          Stay Inspired
        </h2>
        <div className="flex flex-col gap-6 w-full">
          {/* Email Address Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#381207] font-['Poppins'] text-lg font-medium tracking-[-0.18px]">
              Email address
            </label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg border border-[#cbcbcb] text-[#8d8d8d] font-['Poppins'] placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors"
            />
          </div>

          {/* First Name and Last Name Fields */}
          <div className="flex gap-6 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#381207] font-['Poppins'] text-lg font-medium tracking-[-0.18px]">
                First name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="w-full px-4 py-3 rounded-lg border border-[#cbcbcb] text-[#8d8d8d] font-['Poppins'] placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#381207] font-['Poppins'] text-lg font-medium tracking-[-0.18px]">
                Last name
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-lg border border-[#cbcbcb] text-[#8d8d8d] font-['Poppins'] placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors"
              />
            </div>
          </div>

          {/* Notes Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#381207] font-['Poppins'] text-lg font-medium tracking-[-0.18px]">
              Notes
            </label>
            <textarea
              placeholder="E.g. Add special billing instructions"
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-[#cbcbcb] text-[#8d8d8d] font-['Poppins'] placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#5b6502] transition-colors resize-none"
            />
          </div>

          {/* Subscribe Button */}
          <div className="flex justify-end w-full mt-4">
            <button className="px-4 py-2 rounded-lg bg-[#5b6502] text-white font-['Poppins'] text-xl font-medium tracking-[-0.2px] cursor-pointer hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:ring-opacity-50">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-shrink-0 h-[545px] rounded-2xl overflow-hidden">
        <img
          src={HoldHands}
          alt="Holding hands in nature"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

export default SubscribeCard;
