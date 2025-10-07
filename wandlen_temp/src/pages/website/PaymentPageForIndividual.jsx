import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { useTranslation } from "react-i18next";
import axios from "axios";

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
  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-[#381207] font-medium">
        {label}
        {required && "*"}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onInput={onInput}
        className={`w-full h-11 px-4 rounded-lg border bg-white text-[#381207] placeholder-[#7a756e] focus:outline-none focus:ring-2 focus:ring-[#5b6502] focus:border-transparent ${
          error ? "border-red-500" : "border-[#e5e3df]"
        }`}
        required={required}
      />
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
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    firstName: "",
    surname: "",
    function: "",
    email2: "",
    telephone: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  const [isAgreed, setIsAgreed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+?[0-9\s\-\(\)]+$/;
    return re.test(phone);
  };

  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, "");
    return /^\d{16}$/.test(cleaned);
  };

  const validateExpiryDate = (date) => {
    const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!re.test(date)) return false;
    const [month, year] = date.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    return (
      expYear > currentYear ||
      (expYear === currentYear && expMonth >= currentMonth)
    );
  };

  const validateCVC = (cvc) => {
    return /^\d{3}$/.test(cvc);
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.companyName.trim())
      newErrors.companyName = t("payment.errors.companyNameRequired");
    if (!formData.firstName.trim())
      newErrors.firstName = t("payment.errors.firstNameRequired");
    if (!formData.surname.trim())
      newErrors.surname = t("payment.errors.surnameRequired");
    if (!formData.function.trim())
      newErrors.function = t("payment.errors.functionRequired");
    if (!formData.email2.trim())
      newErrors.email2 = t("payment.errors.emailRequired");
    else if (!validateEmail(formData.email2))
      newErrors.email2 = t("payment.errors.emailInvalid");
    if (!formData.telephone.trim())
      newErrors.telephone = t("payment.errors.telephoneRequired");
    else if (!validatePhone(formData.telephone))
      newErrors.telephone = t("payment.errors.telephoneInvalid");
    if (!formData.password.trim())
      newErrors.password = t("payment.errors.passwordRequired");
    else if (formData.password.length < 6)
      newErrors.password = t("payment.errors.passwordTooShort");
    if (!formData.country.trim())
      newErrors.country = t("payment.errors.countryRequired");
    if (!formData.address.trim())
      newErrors.address = t("payment.errors.addressRequired");
    if (!formData.city.trim())
      newErrors.city = t("payment.errors.cityRequired");
    if (!formData.postalCode.trim())
      newErrors.postalCode = t("payment.errors.postalCodeRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.cardholderName.trim())
      newErrors.cardholderName = t("payment.errors.cardholderNameRequired");
    if (!formData.cardNumber.trim())
      newErrors.cardNumber = t("payment.errors.cardNumberRequired");
    else if (!validateCardNumber(formData.cardNumber))
      newErrors.cardNumber = t("payment.errors.cardNumberInvalid");
    if (!formData.expiryDate.trim())
      newErrors.expiryDate = t("payment.errors.expiryDateRequired");
    else if (!validateExpiryDate(formData.expiryDate))
      newErrors.expiryDate = t("payment.errors.expiryDateInvalid");
    if (!formData.cvc.trim()) newErrors.cvc = t("payment.errors.cvcRequired");
    else if (!validateCVC(formData.cvc))
      newErrors.cvc = t("payment.errors.cvcInvalid");
    if (!isAgreed) newErrors.agreement = t("payment.errors.agreementRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    try {
      const signupData = {
        firstName: formData.firstName,
        lastName: formData.surname,
        email: formData.email2,
        password: formData.password,
        companyName: formData.companyName,
        function: formData.function,
        telephone: formData.telephone,
        country: formData.country,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        plan: selectedPlan,
        payment: {
          cardholderName: formData.cardholderName,
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvc: formData.cvc,
        },
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      };

      const res = await axios.post(`${DATABASE_URL}/client/signup`, signupData);
      console.log("Sign up response:", res.data);
      alert(
        t("payment.messages.signupSuccess") +
          " A confirmation email has been sent to your email address. Our support team will get back to you soon with setup instructions."
      );
      navigate("/login");
    } catch (error) {
      console.error("Error during sign up:", error);
      alert(t("payment.messages.signupFailed"));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleCardNumberInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    handleInputChange("cardNumber", value);
  };

  const handleExpiryDateInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    handleInputChange("expiryDate", value);
  };

  const handleCVCInput = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 3);
    handleInputChange("cvc", value);
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/[^+\d\s\-\(\)]/g, "");
    handleInputChange("telephone", value);
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        console.log("Processing payment...", formData);
        handleSignUp();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
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
            {currentStep === 1 && (
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
                    label={t("payment.form.labels.function")}
                    placeholder={t("payment.form.placeholders.function")}
                    value={formData.function}
                    onChange={(value) => handleInputChange("function", value)}
                    error={errors.function}
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
                  onClick={handleContinue}
                  className="w-full mt-6 py-3 bg-[#5b6502] text-white font-medium rounded-lg hover:bg-[#4a5502] transition-colors"
                >
                  {t("payment.buttons.continue")}
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <StepIndicator
                  number="02"
                  title={t("payment.steps.paymentMethod")}
                  description={t("payment.steps.paymentDescription")}
                  t={t}
                />

                <div className="space-y-5 mt-6">
                  <FormInput
                    label={t("payment.form.labels.cardholderName")}
                    placeholder={t("payment.form.placeholders.cardholderName")}
                    value={formData.cardholderName}
                    onChange={(value) =>
                      handleInputChange("cardholderName", value)
                    }
                    error={errors.cardholderName}
                  />

                  <FormInput
                    label={t("payment.form.labels.cardNumber")}
                    placeholder={t("payment.form.placeholders.cardNumber")}
                    value={formData.cardNumber}
                    onChange={(value) => handleInputChange("cardNumber", value)}
                    onInput={handleCardNumberInput}
                    error={errors.cardNumber}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label={t("payment.form.labels.expiryDate")}
                      placeholder={t("payment.form.placeholders.expiryDate")}
                      value={formData.expiryDate}
                      onChange={(value) =>
                        handleInputChange("expiryDate", value)
                      }
                      onInput={handleExpiryDateInput}
                      error={errors.expiryDate}
                    />

                    <FormInput
                      label={t("payment.form.labels.cvc")}
                      placeholder={t("payment.form.placeholders.cvc")}
                      value={formData.cvc}
                      onChange={(value) => handleInputChange("cvc", value)}
                      onInput={handleCVCInput}
                      error={errors.cvc}
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-2 mt-6 p-4 bg-gray-50 rounded-lg">
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 10.25H16.75V8C16.75 6.74022 16.2496 5.53204 15.3588 4.64124C14.468 3.75045 13.2598 3.25 12 3.25C10.7402 3.25 9.53204 3.75045 8.64124 4.64124C7.75045 5.53204 7.25 6.74022 7.25 8V10.25H7C6.27065 10.25 5.57118 10.5397 5.05546 11.0555C4.53973 11.5712 4.25 12.2707 4.25 13V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H17C17.7293 20.75 18.4288 20.4603 18.9445 19.9445C19.4603 19.4288 19.75 18.7293 19.75 18V13C19.75 12.2707 19.4603 11.5712 18.9445 11.0555C18.4288 10.5397 17.7293 10.25 17 10.25ZM8.75 8C8.75 7.13805 9.09241 6.3114 9.7019 5.7019C10.3114 5.09241 11.138 4.75 12 4.75C12.862 4.75 13.6886 5.09241 14.2981 5.7019C14.9076 6.3114 15.25 7.13805 15.25 8V10.25H8.75V8ZM18.25 18C18.25 18.3315 18.1183 18.6495 17.8839 18.8839C17.6495 19.1183 17.3315 19.25 17 19.25H7C6.66848 19.25 6.35054 19.1183 6.11612 18.8839C5.8817 18.6495 5.75 18.3315 5.75 18V13C5.75 12.6685 5.8817 12.3505 6.11612 12.1161C6.35054 11.8817 6.66848 11.75 7 11.75H17C17.3315 11.75 17.6495 11.8817 17.8839 12.1161C18.1183 12.3505 18.25 12.6685 18.25 13V18Z"
                      fill="#381207"
                    />
                  </svg>
                  <span className="text-[#4b4741] text-sm font-medium">
                    {t("payment.security.notice")}
                  </span>
                </div>

                {/* Terms Agreement */}
                <div className="flex flex-col items-start gap-2 mt-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="agreement"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="w-4 h-4 text-[#5b6502] bg-gray-100 border-gray-300 rounded focus:ring-[#5b6502] focus:ring-2"
                    />
                    <label
                      htmlFor="agreement"
                      className="text-[#4b4741] text-sm"
                    >
                      {t("payment.terms.agreement")}{" "}
                      <a href="#" className="underline hover:text-[#5b6502]">
                        {t("payment.terms.termsLink")}
                      </a>{" "}
                      {t("common.and")}{" "}
                      <a href="#" className="underline hover:text-[#5b6502]">
                        {t("payment.terms.privacyLink")}
                      </a>
                      .
                    </label>
                  </div>
                  {errors.agreement && (
                    <span className="text-red-500 text-sm">
                      {errors.agreement}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full mt-6 py-3 bg-[#5b6502] text-white font-medium rounded-lg hover:bg-[#4a5502] transition-colors"
                >
                  {t("payment.buttons.completeSubscription")}
                </button>

                <p className="text-center text-[#4b4741] text-sm mt-4">
                  {t("payment.messages.trialEnds")}
                </p>
              </div>
            )}
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
