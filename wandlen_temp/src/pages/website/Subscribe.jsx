import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
}) => (
  <div
    className={`relative flex flex-col items-center gap-6 p-8 rounded-2xl bg-secondary-soft shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
      isPopular ? "ring-primary scale-105" : ""
    } font-base`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-olive text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          Most Popular
        </div>
      </div>
    )}

    <div className="flex flex-col items-center gap-3 text-center">
      <h3 className="text-2xl font-semibold text-brown">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-brown">€</span>
        <span className="text-3xl font-bold text-brown">{price}</span>
        <span className="text-lg text-muted-foreground">/ {period}</span>
      </div>
    </div>

    <div className="flex flex-col items-center gap-4 w-full">
      <button onClick={onClick} className="w-full py-3 px-6 btn btn-secondary">
        {buttonText}
      </button>
      <p className="text-sm text-muted-foreground text-center">{trialText}</p>
    </div>

    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-sm text-brown text-center leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col gap-3 w-full">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-olive rounded-full flex items-center justify-center">
              <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-brown text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Discount Badge Component
const DiscountBadge = ({ discount }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg shadow-md">
    <span className="text-foreground font-medium">{discount}</span>
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path
        d="M13.3609 5.8076V2.6676H10.2276L8.00094 0.460938L5.8076 2.6676H2.6676V5.8076L0.460938 8.00094L2.6676 10.2276V13.3609H5.8076L8.00094 15.5676L10.2276 13.3609H13.3609V10.2276L15.5676 8.00094L13.3609 5.8076ZM5.8876 4.70094C6.54094 4.70094 7.06761 5.2276 7.06761 5.8876C7.06761 6.20056 6.94328 6.5007 6.72199 6.72199C6.5007 6.94328 6.20056 7.06761 5.8876 7.06761C5.2276 7.06761 4.70094 7.04094 4.70094 5.8876C4.70094 5.2276 5.2276 4.70094 5.8876 4.70094ZM10.1476 11.3343C9.49427 11.3343 8.9676 10.8009 8.9676 10.1476C8.9676 9.83465 9.09193 9.53451 9.31322 9.31322C9.53451 9.09193 9.83465 8.9676 10.1476 8.9676C10.8009 8.9676 11.3343 9.49427 11.3343 10.1476C11.3343 10.4623 11.2092 10.7642 10.9867 10.9867C10.7642 11.2092 10.4623 11.3343 10.1476 11.3343ZM5.6676 11.3543L4.6676 10.3543L10.3543 4.6676L11.3543 5.1676L5.6676 11.3543Z"
        fill="#4B4741"
      />
    </svg>
  </div>
);

// Hero Section Component
const HeroSection = () => (
  <div className="text-center mb-12">
    <div className="flex justify-center mb-6">
      <svg
        width={80}
        height={80}
        viewBox="0 0 66 90"
        fill="none"
        className="text-[#381207]"
      >
        <path
          d="M14.3133 89.999C23.0078 87.9819 31.9693 87.0855 40.5001 84.4564C51.6331 81.0257 63.0247 73.7764 64.7739 61.45C66.4542 49.5804 63.0678 37.7367 63.2229 25.8672L58.0096 28.1514C44.0158 35.7886 45.3428 41.2192 45.3428 41.2192C45.5582 43.3827 47.3333 45.5291 49.1687 47.7616C50.6163 49.5287 53.2789 50.9424 50.668 53.0456C49.9184 53.649 48.7465 53.8904 48.2381 54.3127C47.1782 55.2006 48.4018 56.4849 48.6344 57.2262C49.0653 58.6313 48.5827 59.5019 47.385 60.1742C48.1347 60.8638 48.531 61.088 48.3587 62.2172C48.2553 62.9326 47.4108 63.1481 47.0317 63.7773C46.2217 65.122 46.9111 65.9065 47.0489 67.1994C47.8503 74.9401 37.4497 70.8456 33.2705 71.2852L28.9017 70.9577C24.7742 70.9318 19.7937 71.8024 18.3374 76.1296L14.3047 89.9903L14.3133 89.999Z"
          fill="currentColor"
        />
        <path
          d="M25.1584 55.1327C28.0106 48.8143 31.2075 42.4701 31.9744 35.5828C32.6982 29.0834 31.1989 22.5409 29.217 16.3088C27.528 10.9989 25.4428 5.49085 26.4423 0C22.1339 5.35294 16.8689 9.84388 12.1038 14.7917C7.33864 19.7395 2.96988 25.3596 1.09139 31.9711C-1.68325 41.7115 1.28958 52.1071 4.90006 61.5717C8.32959 70.5536 12.707 79.8199 12.8362 89.6207C16.395 77.8805 20.083 66.3385 25.1498 55.1327H25.1584Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#a6a643] mb-4">
      Subscription Plans
    </h1>
    <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#381207] max-w-4xl mx-auto leading-tight">
      Unlimited walks, new routes every month.
    </p>
  </div>
);

const Subscribe = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const navigate = useNavigate();

  const handleCardClick = (plan) => {
    navigate("/payment", { state: { plan } });
  };

  const plans = [
    {
      title: "Home subscription",
      price: billingPeriod === "monthly" ? "12.99" : "116.91",
      period: billingPeriod === "monthly" ? "month" : "year",
      description:
        "Bring recognizable nature closer and let your loved one enjoy it at home.",
      features: [
        "Unlimited virtual walks",
        "New routes every month",
        "HD video quality",
        "Offline access",
        "24/7 support",
      ],
      isPopular: false,
    },
    {
      title: "Premium subscription",
      price: billingPeriod === "monthly" ? "19.99" : "179.91",
      period: billingPeriod === "monthly" ? "month" : "year",
      description:
        "Enhanced experience with premium features and priority support.",
      features: [
        "Everything in Home plan",
        "4K video quality",
        "Custom route requests",
        "Family sharing (up to 3)",
        "Priority customer support",
        "Early access to new routes",
      ],
      isPopular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-surface font-base">
      <div className="container mx-auto px-6 py-12">
        <HeroSection />

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg shadow-md">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-olive text-white shadow-md"
                  : "text-brown hover:bg-gray-100"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                billingPeriod === "yearly"
                  ? "bg-olive text-white shadow-md"
                  : "text-brown hover:bg-gray-100"
              }`}
            >
              Yearly
              {billingPeriod === "yearly" && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <DiscountBadge discount="25% off" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Subscription Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <SubscriptionCard
              key={index}
              {...plan}
              onClick={() => handleCardClick(plan)}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-brown mb-4">
            Why Choose Our Subscription?
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Experience the healing power of nature from the comfort of your
            home. Our carefully curated virtual walks help reduce stress,
            improve mood, and provide a sense of calm and tranquility.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
