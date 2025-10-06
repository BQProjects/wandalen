import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";

// Subscription Card Component
const SubscriptionCard = ({
  title,
  price,
  period,
  originalPrice,
  description,
  features,
  isPopular = false,
  buttonText = "Start subscription",
  trialText = "Experience 7 days free trial",
  onClick,
  icon,
  t,
}) => (
  <div className="relative flex-shrink-0 w-full h-full min-h-[530px]">
    {/* Icon */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {icon}
    </div>

    {/* Card Body */}
    <div className="inline-flex flex-col items-center gap-5 pb-10 px-4 sm:px-10 rounded-2xl bg-[#f7f6f4] pt-16 h-full flex-grow">
      <div className="flex flex-col items-center gap-2">
        <div className="text-[#381207] text-center font-['Poppins'] text-xl md:text-2xl font-medium leading-[normal]">
          {title}
        </div>
        <div className="flex items-start gap-2.5">
          <div className="text-[#381207] text-center font-['Poppins'] text-2xl font-medium leading-[normal]">
            €
          </div>
          <div className="text-[#381207] text-center font-['Poppins'] text-3xl md:text-5xl font-normal leading-[normal]">
            {price} <span className="text-sm font-normal">/ {period}</span>
          </div>
        </div>
        {originalPrice && (
          <div className="text-[#a6a643] text-sm font-medium">
            {t(
              "subscribe.discountCode",
              "Gebruik code NATUUR01 voor eerste maand korting"
            )}{" "}
            (€{originalPrice} {t("subscribe.discountInstead", "i.p.v.")} €
            {price})
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 flex-grow">
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

      {/* Spacer to push button down */}
      <div className="flex-grow"></div>

      <div className="flex flex-col items-start gap-2 self-stretch">
        <button
          className="flex justify-center items-center gap-2 self-stretch py-2 px-4 h-12 rounded-lg bg-[#a6a643] hover:bg-[#8f8f3d] text-white font-['Poppins'] text-lg md:text-xl font-medium leading-[136%] border-none cursor-pointer"
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

// Healthcare Organization Card Component
const HealthcareCard = ({ t, onClick }) => (
  <div className="relative flex-shrink-0 w-full h-full min-h-[530px]">
    {/* Icon */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
    </div>

    {/* Card Body */}
    <div className="inline-flex flex-col items-center gap-5 pb-10 px-4 sm:px-10 rounded-2xl bg-[#f7f6f4] pt-16 h-full flex-grow">
      <div className="flex flex-col items-center gap-2">
        <div className="text-[#381207] text-center font-['Poppins'] text-xl md:text-2xl font-medium leading-[normal]">
          {t("subscribe.healthcare.title", "Zorg organisatie licentie")}
        </div>
        <div className="flex items-start gap-2.5">
          <div className="text-[#381207] text-center font-['Poppins'] text-2xl font-medium leading-[normal]">
            {t("subscribe.healthcare.price", "Prijs op aanvraag")}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 flex-grow">
        <div className="flex flex-col items-start gap-2">
          {(
            t("subscribe.healthcare.features", { returnObjects: true }) || [
              "Breng herkenbare natuur in de huiskamer of groepsruimte",
              "Nieuwe routes elke maand",
              "Ontvang een voorstel op maat voor uw zorgorganisatie",
            ]
          ).map((feature, index) => (
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
      </div>

      {/* Spacer to push button down */}
      <div className="flex-grow"></div>

      <div className="flex flex-col items-start gap-2 self-stretch">
        <button
          className="flex justify-center items-center gap-2 self-stretch py-2 px-4 h-12 rounded-lg bg-[#a6a643] hover:bg-[#8f8f3d] text-white font-['Poppins'] text-lg md:text-xl font-medium leading-[136%] border-none cursor-pointer"
          onClick={onClick}
        >
          {t("subscribe.healthcare.buttonText", "Neem contact op")}
        </button>
      </div>
    </div>
  </div>
);

// Hero Section Component
const HeroSection = ({ t }) => (
  <div className="flex flex-col items-start gap-2 w-full pt-10">
    <div className=" text-[#a6a643] font-['Poppins'] text-xl md:text-2xl font-semibold leading-[136%]">
      {t("subscribe.hero.title")}
    </div>
    <div className=" w-full max-w-[835px] text-[#381207] font-['Poppins'] text-3xl md:text-5xl font-semibold leading-[136%]">
      {t("subscribe.hero.subtitle")}
    </div>
  </div>
);

const Subscribe = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    title: t("subscribe.plan.title"),
    description: t("subscribe.plan.description"),
    features: t("subscribe.plan.features", { returnObjects: true }),
    buttonText: t("subscribe.plan.buttonText"),
    trialText: t("subscribe.plan.trialText"),
    isPopular: false,
  };

  const monthlyPlan = {
    ...basePlan,
    price: "9.99",
    period: t("subscribe.plan.periods.month"),
  };

  const yearlyPlan = {
    ...basePlan,
    price: "119.88",
    period: t("subscribe.plan.periods.year"),
    originalPrice: "95.90",
  };

  const handleHealthcareClick = () => {
    navigate("/request-quote");
  };

  return (
    <div className="flex-shrink-0 bg-[#ede4dc]">
      <div className="px-4 sm:px-10 md:px-20">
        <HeroSection t={t} />
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-20 mb-10 items-stretch">
          {/* Monthly Card */}
          <div className="flex flex-col items-center flex-1 min-h-[530px]">
            <SubscriptionCard
              {...monthlyPlan}
              onClick={() => handleCardClick(monthlyPlan)}
              t={t}
            />
          </div>

          {/* Yearly Card */}
          <div className="flex flex-col items-center flex-1 min-h-[530px]">
            <SubscriptionCard
              {...yearlyPlan}
              onClick={() => handleCardClick(yearlyPlan)}
              t={t}
            />
          </div>

          {/* Healthcare Card */}
          <div className="flex flex-col items-center flex-1 min-h-[530px]">
            <HealthcareCard t={t} onClick={handleHealthcareClick} />
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
