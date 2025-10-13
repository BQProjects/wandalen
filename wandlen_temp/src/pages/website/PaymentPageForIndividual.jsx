import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

// Back Arrow Component
const BackArrow = () => (
  <svg width={25} height={50} viewBox="0 0 25 50" fill="none">
    <path
      d="M19.8936 13.707L17.6832 11.4987L5.64365 23.5341C5.44957 23.727 5.29556 23.9563 5.19046 24.2089C5.08536 24.4615 5.03125 24.7324 5.03125 25.006C5.03125 25.2796 5.08536 25.5505 5.19046 25.8031C5.29556 26.0557 5.44957 26.285 5.64365 26.4779L17.6832 38.5195L19.8916 36.3112L8.59156 25.0091L19.8936 13.707Z"
      fill="#381207"
    />
  </svg>
);

// Form Input Component
const FormInput = ({
  label,
  placeholder,
  type = "text",
  required = true,
  value,
  onChange,
  error,
  onInput,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-[#381207] font-medium">
        {label}
        {required && "*"}
      </label>
      <div className="relative w-full">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onInput={onInput}
          className={`w-full h-11 px-4 rounded-lg border bg-white text-[#381207] placeholder-[#7a756e] focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:border-transparent ${
            type === "password" ? "pr-10" : ""
          } ${error ? "border-red-500" : "border-[#e5e3df]"}`}
          required={required}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7a756e] hover:text-[#5b6502] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

// Step Indicator Component
const StepIndicator = ({ number, title, description, t }) => (
  <div className="flex items-start gap-2 w-full h-12">
    <div className="flex justify-center items-center w-6 h-6 p-2 rounded-full bg-[#d9bbaa] text-[#381207] text-sm font-medium">
      {number}
    </div>
    <div className="flex flex-col justify-center">
      <div className="text-[#381207] text-xl font-medium">{title}</div>
      {description && (
        <div className="text-[#7a756e] text-sm leading-normal mt-1">
          {description}
        </div>
      )}
    </div>
  </div>
);

// Order Summary Component
const OrderSummary = ({ plan, t }) => (
  <div className="inline-flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-[#e5e3df] bg-[#f7f6f4]">
    <div className="flex flex-col items-start gap-1 w-full">
      <h3 className="text-[#381207] text-xl font-medium">
        {t("payment.summary.title")}
      </h3>

      <div className="flex items-start gap-6 mt-4 w-full">
        <div className="flex flex-col items-start gap-2.5 w-full ">
          <div className="text-[#381207] font-medium">{plan.title}</div>
          <div className="text-[#4b4741]">{t("payment.summary.duration")}</div>
          <div className="text-[#4b4741]">{t("payment.summary.freeTrial")}</div>
          <div className="text-[#4b4741]">{t("payment.summary.sessions")}</div>
        </div>
        <div className="flex flex-col items-end gap-2.5">
          <div className="text-[#381207] font-medium text-right">
            € {plan.price}
          </div>
          <div className="text-[#4b4741] text-right w-32">
            {t("payment.summary.untilCancellation")}
          </div>
          <div className="text-[#4b4741] text-right w-32">
            {t("payment.summary.sevenDays")}
          </div>
          <div className="text-[#4b4741] text-right w-32">
            {t("payment.summary.unlimited")}
          </div>
        </div>
      </div>
    </div>

    <div className="w-full h-px bg-[#e5e3df]" />

    <div className="flex justify-between items-start w-full">
      <div className="flex flex-col items-start gap-2.5 py-3">
        <div className="text-[#381207] font-medium">
          {t("payment.summary.subtotal")}
        </div>
        <div className="text-[#381207] font-medium">
          {t("payment.summary.vat")}
        </div>
      </div>
      <div className="flex flex-col items-start gap-2.5 py-3">
        <div className="text-[#381207] font-medium text-right">
          € {plan.price}
        </div>
        <div className="text-[#381207] font-medium text-right">
          € {(parseFloat(plan.price) * 0.21).toFixed(2)}
        </div>
      </div>
    </div>

    <div className="w-full h-px bg-[#e5e3df]" />

    <div className="flex justify-between items-start w-full">
      <div className="text-[#381207] font-medium">
        {t("payment.summary.totalToday")}
      </div>
      <div className="text-[#381207] font-medium">€ 0.00</div>
    </div>

    <p className="text-[#381207] text-sm text-center w-full">
      {t("payment.summary.trialNotice", {
        price: plan.price,
        period:
          plan.period === "month"
            ? t("subscribe.plan.periods.month")
            : t("subscribe.plan.periods.year"),
      })}
    </p>
  </div>
);

const PaymentPageForIndividual = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const { t } = useTranslation();
  const selectedPlan = location.state?.plan;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    firstName: "",
    surname: "",
    email2: "",
    telephone: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+?[0-9\s\-\(\)]+$/;
    return re.test(phone);
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("payment.errors.firstNameRequired");
    }

    if (!formData.surname.trim()) {
      newErrors.surname = t("payment.errors.surnameRequired");
    }

    if (!formData.email2.trim()) {
      newErrors.email2 = t("payment.errors.emailRequired");
    } else if (!validateEmail(formData.email2)) {
      newErrors.email2 = t("payment.errors.emailInvalid");
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = t("payment.errors.telephoneRequired");
    } else if (!validatePhone(formData.telephone)) {
      newErrors.telephone = t("payment.errors.telephoneInvalid");
    }

    if (!formData.password.trim()) {
      newErrors.password = t("payment.errors.passwordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = t("payment.errors.passwordTooShort");
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = t("payment.errors.confirmPasswordRequired");
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("payment.errors.passwordsDoNotMatch");
    }

    if (!formData.country.trim()) {
      newErrors.country = t("payment.errors.countryRequired");
    }

    if (!formData.address.trim()) {
      newErrors.address = t("payment.errors.addressRequired");
    }

    if (!formData.city.trim()) {
      newErrors.city = t("payment.errors.cityRequired");
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = t("payment.errors.postalCodeRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/[^+\d\s\-\(\)]/g, "");
    handleInputChange("telephone", value);
  };

  const handlePaymentSubscription = async () => {
    try {
      if (validateStep1()) {
        // Store form data in localStorage to retrieve after payment
        localStorage.setItem(
          "pendingSignupData",
          JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.surname,
            email: formData.email2,
            password: formData.password,
            function: formData.function,
            telephone: formData.telephone,
            country: formData.country,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            plan: selectedPlan,
          })
        );

        // Determine which Stripe link to use based on plan period
        const stripeLinks = {
          //month: "https://buy.stripe.com/test_bJecN49hWbLodtG1DU4gg00", // test
          month: "https://buy.stripe.com/3cI3cu8ikclW6VV2dabbG00", // prod
          year: "https://buy.stripe.com/eVq5kCdCE5Xy6VVaJGbbG01",
        };

        const stripeUrl = stripeLinks[selectedPlan.period] || stripeLinks.month;

        // Redirect to Stripe Checkout
        window.location.href = stripeUrl;
      }
    } catch (error) {
      console.error("Error during payment subscription:", error);
      toast.error(t("payment.messages.subscriptionFailed"));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#381207] mb-4">
            {t("payment.messages.noPlanSelected")}
          </h2>
          <button
            onClick={() => navigate("/client/subscribe")}
            className="px-6 py-3 bg-[#5b6502] text-white rounded-lg hover:bg-[#4a5502] transition-colors"
          >
            {t("payment.buttons.choosePlan")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <BackArrow />
          </button>
          <div>
            <h1 className="text-4xl font-medium text-[#381207]">
              {t("payment.header.title")}
            </h1>
            <p className="text-xl text-[#7a756e] mt-2">
              {t("payment.header.subtitle")}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Additional Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <StepIndicator
                number="01"
                title={t("payment.steps.additionalInfo")}
                t={t}
              />

              <div className="space-y-5 mt-6">
                <FormInput
                  label={t("payment.form.labels.firstName")}
                  placeholder={t("payment.form.placeholders.firstName")}
                  value={formData.firstName}
                  onChange={(value) => handleInputChange("firstName", value)}
                  error={errors.firstName}
                />

                <FormInput
                  label={t("payment.form.labels.surname")}
                  placeholder={t("payment.form.placeholders.surname")}
                  value={formData.surname}
                  onChange={(value) => handleInputChange("surname", value)}
                  error={errors.surname}
                />

                <FormInput
                  label={t("payment.form.labels.email")}
                  placeholder={t("payment.form.placeholders.email")}
                  type="email"
                  value={formData.email2}
                  onChange={(value) => handleInputChange("email2", value)}
                  error={errors.email2}
                />

                <FormInput
                  label={t("payment.form.labels.telephone")}
                  placeholder={t("payment.form.placeholders.telephone")}
                  type="tel"
                  value={formData.telephone}
                  onChange={(value) => handleInputChange("telephone", value)}
                  onInput={handlePhoneInput}
                  error={errors.telephone}
                />

                <FormInput
                  label={t("payment.form.labels.password")}
                  placeholder={t("payment.form.placeholders.password")}
                  type="password"
                  value={formData.password}
                  onChange={(value) => handleInputChange("password", value)}
                  error={errors.password}
                />

                <FormInput
                  label={t("payment.form.labels.confirmPassword")}
                  placeholder={t("payment.form.placeholders.confirmPassword")}
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(value) =>
                    handleInputChange("confirmPassword", value)
                  }
                  error={errors.confirmPassword}
                />

                <FormInput
                  label={t("payment.form.labels.country")}
                  placeholder={t("payment.form.placeholders.country")}
                  value={formData.country}
                  onChange={(value) => handleInputChange("country", value)}
                  error={errors.country}
                />

                <FormInput
                  label={t("payment.form.labels.address")}
                  placeholder={t("payment.form.placeholders.address")}
                  value={formData.address}
                  onChange={(value) => handleInputChange("address", value)}
                  error={errors.address}
                />

                <FormInput
                  label={t("payment.form.labels.city")}
                  placeholder={t("payment.form.placeholders.city")}
                  value={formData.city}
                  onChange={(value) => handleInputChange("city", value)}
                  error={errors.city}
                />

                <FormInput
                  label={t("payment.form.labels.postalCode")}
                  placeholder={t("payment.form.placeholders.postalCode")}
                  value={formData.postalCode}
                  onChange={(value) => handleInputChange("postalCode", value)}
                  error={errors.postalCode}
                />
              </div>

              <button
                onClick={handlePaymentSubscription}
                className="w-full mt-6 py-3 bg-[#5b6502] text-white font-medium rounded-lg hover:bg-[#4a5502] transition-colors"
              >
                {t("payment.buttons.continue")}
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary plan={selectedPlan} t={t} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPageForIndividual;
