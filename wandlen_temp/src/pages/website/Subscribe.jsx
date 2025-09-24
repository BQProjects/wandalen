import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";

// Subscription Card Component
const SubscriptionCard = ({
  title,
  price,
  period,
  description,
  features,
  isPopular = false,
  buttonText = "Start subscription",
  trialText = "Experience 7 days free trial",
  onClick,
  icon,
}) => (
  <div className="relative flex-shrink-0 w-[385px]">
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {icon}
    </div>
    <div className="inline-flex flex-col items-center gap-5 pb-10 px-10 rounded-2xl bg-[#f7f6f4] pt-16">
      <div className="flex flex-col items-center gap-2">
        <div className="text-[#381207] text-center font-['Poppins'] text-[2rem] font-medium leading-[normal]">
          {title}
        </div>
        <div className="flex items-start gap-2.5">
          <div className="text-[#381207] text-center font-['Poppins'] text-2xl font-medium leading-[normal]">
            €
          </div>
          <div className="text-[#381207] text-center font-['Poppins'] text-5xl font-normal leading-[normal]">
            {price} <span className="text-sm font-normal">/ {period}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-start gap-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0026 4.66656L6.0026 12.6666L2.33594 8.9999L3.27594 8.0599L6.0026 10.7799L13.0626 3.72656L14.0026 4.66656Z"
                  fill="#381207"
                />
              </svg>
              <div className="text-[#381207] font-['Poppins'] leading-[normal]">
                {feature}
              </div>
            </div>
          ))}
        </div>
        <div className="text-[#381207] text-center font-['Poppins'] text-sm leading-[normal]">
          {description}
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 self-stretch">
        <button
          className="flex justify-center items-center gap-2 self-stretch py-2 px-4 h-12 rounded-lg bg-[#a6a643] text-white font-['Poppins'] text-xl font-medium leading-[136%] border-none cursor-pointer"
          onClick={onClick}
        >
          {buttonText}
        </button>
        <div className="self-stretch text-[#381207] text-center font-['Poppins'] text-xs leading-[normal]">
          {trialText}
        </div>
      </div>
    </div>
  </div>
);

// Discount Badge Component
const DiscountBadge = ({ discount }) => (
  <div className="inline-flex flex-shrink-0 justify-center items-center gap-2 p-2 h-[2.6875rem] rounded-lg bg-[#e5e3df] mt-4">
    <div className="text-[#4b4741] font-['Poppins'] font-medium leading-[136%]">
      {discount}
    </div>
    <svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3609 6.3076V3.1676H10.2276L8.00094 0.960938L5.8076 3.1676H2.6676V6.3076L0.460938 8.50094L2.6676 10.7276V13.8609H5.8076L8.00094 16.0676L10.2276 13.8609H13.3609V10.7276L15.5676 8.50094L13.3609 6.3076Z"
        fill="#4B4741"
      />
    </svg>
  </div>
);

// Hero Section Component
const HeroSection = () => (
  <div className="flex flex-col items-start gap-2 w-[1136px]">
    <div className="subscription_plans text-[#a6a643] font-['Poppins'] text-[2rem] font-semibold leading-[136%]">
      Subscription Plans
    </div>
    <div className="unlimited_walks__new_routes_every_month_ w-[835px] text-[#381207] font-['Poppins'] text-5xl font-semibold leading-[136%]">
      Unlimited walks, new routes every month.
    </div>
  </div>
);

const Subscribe = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const navigate = useNavigate();

  const handleCardClick = (plan) => {
    const { icon, ...planWithoutIcon } = plan;
    navigate("/payment", { state: { plan: planWithoutIcon } });
  };

  const basePlan = {
    icon: (
      <svg
        width={96}
        height={96}
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={96} height={96} rx={48} fill="#F7F6F4" />
        <path
          d="M29.3133 92.999C38.0078 90.9819 46.9693 90.0855 55.5001 87.4564C66.6331 84.0257 78.0247 76.7764 79.7739 64.45C81.4542 52.5804 78.0678 40.7367 78.2229 28.8672L73.0096 31.1514C59.0158 38.7886 60.3428 44.2192 60.3428 44.2192C60.5582 46.3827 62.3333 48.5291 64.1687 50.7616C65.6163 52.5287 68.2789 53.9424 65.668 56.0456C64.9184 56.649 63.7465 56.8904 63.2381 57.3127C62.1782 58.2006 63.4018 59.4849 63.6344 60.2262C64.0653 61.6313 63.5827 62.5019 62.385 63.1742C63.1347 63.8638 63.531 64.088 63.3587 65.2172C63.2553 65.9326 62.4108 66.1481 62.0317 66.7773C61.2217 68.122 61.9111 68.9065 62.0489 70.1994C62.8503 77.9401 52.4497 73.8456 48.2705 74.2852L43.9017 73.9577C39.7742 73.9318 34.7937 74.8024 33.3374 79.1296L29.3047 92.9903L29.3133 92.999Z"
          fill="#381207"
        />
        <path
          d="M40.1584 58.1327C43.0106 51.8143 46.2075 45.4701 46.9744 38.5828C47.6982 32.0834 46.1989 25.5409 44.217 19.3088C42.528 13.9989 40.4428 8.49085 41.4423 3C37.1339 8.35294 31.8689 12.8439 27.1038 17.7917C22.3386 22.7395 17.9699 28.3596 16.0914 34.9711C13.3167 44.7115 16.2896 55.1071 19.9001 64.5717C23.3296 73.5536 27.707 82.8199 27.8362 92.6207C31.395 80.8805 35.083 69.3385 40.1498 58.1327H40.1584Z"
          fill="#381207"
        />
      </svg>
    ),
    title: "Home subscription",
    description:
      "Bring recognizable nature closer and let your loved one enjoy it at home.",
    features: ["Unlimited virtual walks", "New routes every month"],
    isPopular: false,
  };

  const monthlyPlan = {
    ...basePlan,
    price: "12.99",
    period: "month",
  };

  const yearlyPlan = {
    ...basePlan,
    price: "116.91",
    period: "year",
  };

  return (
    <div className="flex-shrink-0 bg-[#ede4dc]">
      <div className="px-4 sm:px-10 md:px-20">
        <HeroSection />
        <div className="flex justify-center gap-8 mt-20 mb-10">
          {/* Monthly Card Wrapper */}
          <div className="flex flex-col items-center">
            <SubscriptionCard
              {...monthlyPlan}
              onClick={() => handleCardClick(monthlyPlan)}
            />
          </div>

          {/* Yearly Card Wrapper with Discount */}
          <div className="flex flex-col items-center">
            <SubscriptionCard
              {...yearlyPlan}
              onClick={() => handleCardClick(yearlyPlan)}
            />
            <DiscountBadge discount="25% discount" />
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

export default Subscribe;
