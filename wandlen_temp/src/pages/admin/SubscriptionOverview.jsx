import React from "react";

const SubscriptionOverview = () => {
  // Sample subscription data
  const subscription = {
    firstName: "John",
    lastName: "Lee",
    planType: "Free",
    status: "Trial",
    startDate: "Jul 03, 2025",
    endDate: "Jul 09, 2025",
    paymentStatus: "Paid",
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-[#ede4dc] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="flex items-center justify-center p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg
            width={25}
            height={24}
            viewBox="0 0 25 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M19.8936 13.709L17.6832 11.5007L5.64365 23.5361C5.44957 23.7289 5.29556 23.9582 5.19046 24.2108C5.08536 24.4635 5.03125 24.7343 5.03125 25.0079C5.03125 25.2815 5.08536 25.5524 5.19046 25.805C5.29556 26.0576 5.44957 26.287 5.64365 26.4798L17.6832 38.5215L19.8916 36.3132L8.59156 25.0111L19.8936 13.709Z"
              fill="#381207"
            />
          </svg>
        </button>
        <h1 className="text-[#381207] text-center font-['Poppins'] text-4xl font-medium">
          Subscription Overview
        </h1>
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>

      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1">
          {/* User Info Card */}
          <div className="bg-[#f7f6f4] rounded-2xl mb-6">
            <div className="p-6 border-b border-[#e5e3df]">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-[#381207] font-['Poppins'] text-2xl font-medium">
                      {subscription.firstName} {subscription.lastName}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          subscription.status === "Active"
                            ? "bg-green-500"
                            : subscription.status === "Trial"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="text-[#381207] font-['Poppins'] text-lg">
                        {subscription.status === "Trial"
                          ? "7 day Trial"
                          : subscription.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#381207] font-['Poppins'] text-lg font-medium">
                    {subscription.firstName.toLowerCase()}
                    {subscription.lastName.toLowerCase()}@gmail.com
                  </p>
                </div>
                <button className="px-4 py-2 border border-[#2a341f] rounded-md text-[#2a341f] font-['Poppins'] hover:bg-[#2a341f] hover:text-white transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="p-6 grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[#4b4741] font-['Poppins'] block mb-2">
                    Start date
                  </label>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {subscription.startDate}
                  </p>
                </div>
                <div>
                  <label className="text-[#4b4741] font-['Poppins'] block mb-2">
                    Last payment
                  </label>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {subscription.status === "Trial"
                      ? "7 day Trial"
                      : subscription.paymentStatus}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[#4b4741] font-['Poppins'] block mb-2">
                    End date
                  </label>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {subscription.endDate}
                  </p>
                </div>
                <div>
                  <label className="text-[#4b4741] font-['Poppins'] block mb-2">
                    Plan type
                  </label>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {subscription.planType}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payments Section */}
          <div className="bg-[#f7f6f4] rounded-2xl">
            <div className="p-6 border-b border-[#e5e3df]">
              <h3 className="text-[#381207] font-['Poppins'] text-2xl font-medium mb-2">
                Payments
              </h3>
              <p className="text-[#4b4741] font-['Poppins']">
                Keep track of payments from your customers in real time.
              </p>
            </div>

            {/* Payment Summary */}
            <div className="p-6 border-b border-[#e5e3df]">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                      Amount
                    </label>
                    <p className="text-[#381207] font-['Poppins']">€ 12,00</p>
                  </div>
                  <div>
                    <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                      Status
                    </label>
                    <p className="text-[#381207] font-['Poppins']">Paid</p>
                  </div>
                  <div>
                    <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                      Payment Type
                    </label>
                    <p className="text-[#381207] font-['Poppins']">One-time</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                      Payment provider
                    </label>
                    <p className="text-[#381207] font-['Poppins']">Stripe</p>
                  </div>
                  <div>
                    <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                      Method
                    </label>
                    <p className="text-[#381207] font-['Poppins']">
                      Mastercard***1234
                    </p>
                  </div>
                  <div>
                    <label className="text-[#4b4741] font-['Poppins'] block mb-1">
                      Cardholder name
                    </label>
                    <p className="text-[#381207] font-['Poppins']">
                      {subscription.firstName} {subscription.lastName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e5e3df]">
                <div className="flex justify-between items-center">
                  <label className="text-[#4b4741] font-['Poppins'] font-medium">
                    Total amount
                  </label>
                  <p className="text-[#381207] font-['Poppins'] font-medium text-lg">
                    € {subscription.planType === "Free" ? "00,00" : "12,00"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment History Table */}
            <div className="p-6">
              <div className="mb-4">
                <button className="inline-flex items-center gap-2 px-3 py-1 border border-[#2a341f] rounded-md text-[#2a341f] font-['Poppins'] text-sm">
                  Today
                  <svg width={12} height={12} viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12.6693 6L8.0026 10.6667L3.33594 6"
                      stroke="#2A341F"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="bg-[#ede4dc]/30 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#a6a643]/20 border-b border-[#d9bbaa] px-4 py-3">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-[#2a341f] font-['Poppins'] text-sm font-medium">
                      Plan type
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 11 12"
                        fill="none"
                      >
                        <path
                          d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                          stroke="#2A341F"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 text-[#2a341f] font-['Poppins'] text-sm font-medium">
                      Payment Date
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 11 12"
                        fill="none"
                      >
                        <path
                          d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                          stroke="#2A341F"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 text-[#2a341f] font-['Poppins'] text-sm font-medium">
                      Payment Method
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 11 12"
                        fill="none"
                      >
                        <path
                          d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                          stroke="#2A341F"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 text-[#2a341f] font-['Poppins'] text-sm font-medium">
                      Amount
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 11 12"
                        fill="none"
                      >
                        <path
                          d="M5.66667 1.33398V10.6673M5.66667 10.6673L10.3333 6.00065M5.66667 10.6673L1 6.00065"
                          stroke="#2A341F"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="bg-[#ede4dc] border-b border-[#d9bbaa] px-4 py-3">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-[#381207] font-['Poppins'] text-sm">
                      {subscription.planType}
                    </div>
                    <div className="text-[#381207] font-['Poppins'] text-sm">
                      {subscription.startDate}
                    </div>
                    <div className="text-[#381207] font-['Poppins'] text-sm">
                      Credit/Debit Cards (via Stripe)
                    </div>
                    <div className="text-[#381207] font-['Poppins'] text-sm">
                      € {subscription.planType === "Free" ? "00,00" : "12,00"}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-[#381207] font-['Poppins'] text-sm">
                      {subscription.planType}
                    </div>
                    <div className="text-[#381207] font-['Poppins'] text-sm">
                      {subscription.endDate}
                    </div>
                    <div className="text-[#381207] font-['Poppins'] text-sm">
                      Credit/Debit Cards (via Stripe)
                    </div>
                    <div className="text-[#381207] font-['Poppins'] text-sm">
                      € {subscription.planType === "Free" ? "00,00" : "12,00"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details & Method Sections */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-[#381207] font-['Poppins'] text-xl font-medium">
                    Payment details
                  </h4>
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 11.1673C7.86793 11.1656 7.74175 11.1124 7.64836 11.019C7.55496 10.9256 7.50173 10.7994 7.5 10.6673V7.33398C7.5 7.20138 7.55268 7.0742 7.64645 6.98043C7.74022 6.88666 7.86739 6.83398 8 6.83398C8.13261 6.83398 8.25978 6.88666 8.35355 6.98043C8.44732 7.0742 8.5 7.20138 8.5 7.33398V10.6673C8.49827 10.7994 8.44504 10.9256 8.35164 11.019C8.25825 11.1124 8.13207 11.1656 8 11.1673ZM8 6.16732C7.86793 6.16559 7.74175 6.11236 7.64836 6.01896C7.55496 5.92557 7.50173 5.79939 7.5 5.66732V5.33398C7.5 5.20138 7.55268 5.0742 7.64645 4.98043C7.74022 4.88666 7.86739 4.83398 8 4.83398C8.13261 4.83398 8.25978 4.88666 8.35355 4.98043C8.44732 5.0742 8.5 5.20138 8.5 5.33398V5.66732C8.49827 5.79939 8.44504 5.92557 8.35164 6.01896C8.25825 6.11236 8.13207 6.16559 8 6.16732ZM8 14C6.81331 14 5.65328 13.6481 4.66658 12.9888C3.67989 12.3295 2.91085 11.3925 2.45673 10.2961C2.0026 9.19975 1.88378 7.99335 2.11529 6.82946C2.3468 5.66558 2.91825 4.59648 3.75736 3.75736C4.59648 2.91825 5.66558 2.3468 6.82946 2.11529C7.99335 1.88378 9.19975 2.0026 10.2961 2.45673C11.3925 2.91085 12.3295 3.67989 12.9888 4.66658C13.6481 5.65328 14 6.81331 14 8C14 9.5913 13.3679 11.1174 12.2426 12.2426C11.1174 13.3679 9.5913 14 8 14ZM8 3C7.0111 3 6.0444 3.29325 5.22215 3.84265C4.39991 4.39206 3.75904 5.17296 3.3806 6.08659C3.00217 7.00022 2.90315 8.00555 3.09608 8.97545C3.289 9.94536 3.76521 10.8363 4.46447 11.5355C5.16373 12.2348 6.05465 12.711 7.02455 12.9039C7.99446 13.0969 8.99979 12.9978 9.91342 12.6194C10.8271 12.241 11.6079 11.6001 12.1574 10.7779C12.7068 9.95561 13 8.98891 13 8C13 6.67392 12.4732 5.40215 11.5355 4.46447C10.5979 3.52679 9.32609 3 8 3Z"
                      fill="#5B6502"
                    />
                  </svg>
                </div>
                <div className="flex items-center gap-2 py-0 px-6 w-[694px]">
                  <div className="flex flex-col flex-shrink-0 items-start gap-2 w-[14.75rem]">
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-16 text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Amount
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Status
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Payment Type
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-shrink-0 items-start gap-2 w-[12.25rem]">
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-16 text-[#381207] font-['Poppins'] leading-[normal]">
                        Amount
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#381207] font-['Poppins'] leading-[normal]">
                        Status
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#381207] font-['Poppins'] leading-[normal]">
                        Payment Type
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-[#381207] font-['Poppins'] text-xl font-medium">
                  Payment method
                </h4>
                <div className="flex items-center gap-2 py-0 px-6 w-[694px]">
                  <div className="flex flex-col flex-shrink-0 items-start gap-2 w-[14.75rem]">
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Payment provider
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Your merchant account
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Method
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Cardholder name
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] leading-[normal]">
                        Stripe payment ID
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-start gap-0.5 self-stretch py-2 px-0">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#4b4741] font-['Poppins'] font-medium leading-[normal]">
                        Total amount
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-shrink-0 items-start gap-2 w-[12.25rem]">
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-16 text-[#381207] font-['Poppins'] leading-[normal]">
                        Stripe
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#381207] font-['Poppins'] leading-[normal]">
                        gmail.com
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg text-[#381207] font-['Poppins'] leading-[normal]">
                        Mastercard***1234
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#381207] font-['Poppins'] leading-[normal]">
                        John Lee
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                      <div className="flex items-center gap-2.5 rounded-lg w-[7.1875rem] text-[#381207] font-['Poppins'] leading-[normal]">
                        Id link
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-start gap-0.5 self-stretch py-2 px-0">
                      <div className="flex items-center gap-2.5 rounded-lg __12_00 w-[7.1875rem] text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                        € 12,00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Subscription History */}
        <div className="w-96">
          <div className="bg-[#f7f6f4] rounded-2xl">
            <div className="p-6 border-b border-[#e5e3df]">
              <h3 className="text-[#381207] font-['Poppins'] text-2xl font-medium text-center">
                Subscription history
              </h3>
            </div>

            <div className="p-6">
              <div className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="w-3 h-3 rounded-full bg-[#a6a643]" />
                  <div className="w-px h-16 bg-[#a6a643]" />
                  <div className="w-3 h-3 rounded-full bg-[#a6a643]" />
                  <div className="w-px h-16 bg-[#a6a643]" />
                  <div className="w-3 h-3 rounded-full bg-[#a6a643]" />
                </div>

                {/* Timeline Content */}
                <div className="flex-1 space-y-12">
                  <div>
                    <h4 className="text-[#381207] font-['Poppins'] text-lg font-medium mb-2">
                      Subscription activated
                    </h4>
                    <p className="text-[#4b4741] font-['Poppins']">
                      {subscription.startDate}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[#381207] font-['Poppins'] text-lg font-medium mb-2">
                      Payment processed
                    </h4>
                    <p className="text-[#4b4741] font-['Poppins']">
                      {subscription.startDate}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[#381207] font-['Poppins'] text-lg font-medium mb-2">
                      Trial started
                    </h4>
                    <p className="text-[#4b4741] font-['Poppins']">
                      {subscription.startDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionOverview;
