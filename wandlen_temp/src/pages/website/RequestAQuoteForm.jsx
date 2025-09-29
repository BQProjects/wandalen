import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { useNavigate, Link } from "react-router-dom";

const RequestAQuoteForm = () => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    organizationName: "",
    contactEmail: "",
    phone: "",
    address: "",
    street: "",
    postalCode: "",
    city: "",
    website: "",
    fullName: "",
    jobTitle: "",
    emailAddress: "",
    phoneContact: "",
    totalClients: "",
    numberLocations: "",
    targetGroups: [],
    estimatedClients: "",
    startDate: "",
    onboardingSupport: "",
    onboardingExplanation: "",
    additionalServices: "",
    notes: "",
    agreeToTerms: false,
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

  const validateUrl = (url) => {
    const re = /^https?:\/\/[^\s$.?#].[^\s]*$/;
    return re.test(url);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.organizationName.trim())
      newErrors.organizationName = t(
        "requestQuoteForm.validation.organizationName"
      );
    if (!formData.contactEmail.trim())
      newErrors.contactEmail = t("requestQuoteForm.validation.contactEmail");
    else if (!validateEmail(formData.contactEmail))
      newErrors.contactEmail = t(
        "requestQuoteForm.validation.contactEmailInvalid"
      );
    if (!formData.phone.trim())
      newErrors.phone = t("requestQuoteForm.validation.phone");
    else if (!validatePhone(formData.phone))
      newErrors.phone = t("requestQuoteForm.validation.phoneInvalid");
    if (!formData.address.trim())
      newErrors.address = t("requestQuoteForm.validation.address");
    if (!formData.street.trim())
      newErrors.street = t("requestQuoteForm.validation.street");
    if (!formData.postalCode.trim())
      newErrors.postalCode = t("requestQuoteForm.validation.postalCode");
    if (!formData.city.trim())
      newErrors.city = t("requestQuoteForm.validation.city");
    if (formData.website && !validateUrl(formData.website))
      newErrors.website = t("requestQuoteForm.validation.websiteInvalid");
    if (!formData.fullName.trim())
      newErrors.fullName = t("requestQuoteForm.validation.fullName");
    if (!formData.jobTitle.trim())
      newErrors.jobTitle = t("requestQuoteForm.validation.jobTitle");
    if (!formData.emailAddress.trim())
      newErrors.emailAddress = t("requestQuoteForm.validation.emailAddress");
    else if (!validateEmail(formData.emailAddress))
      newErrors.emailAddress = t(
        "requestQuoteForm.validation.emailAddressInvalid"
      );
    if (!formData.phoneContact.trim())
      newErrors.phoneContact = t("requestQuoteForm.validation.phoneContact");
    else if (!validatePhone(formData.phoneContact))
      newErrors.phoneContact = t(
        "requestQuoteForm.validation.phoneContactInvalid"
      );
    if (!formData.totalClients.trim())
      newErrors.totalClients = t("requestQuoteForm.validation.totalClients");
    if (!formData.numberLocations.trim())
      newErrors.numberLocations = t(
        "requestQuoteForm.validation.numberLocations"
      );
    if (formData.targetGroups.length === 0)
      newErrors.targetGroups = t("requestQuoteForm.validation.targetGroups");
    if (!formData.estimatedClients.trim())
      newErrors.estimatedClients = t(
        "requestQuoteForm.validation.estimatedClients"
      );
    if (!formData.startDate.trim())
      newErrors.startDate = t("requestQuoteForm.validation.startDate");
    if (!formData.onboardingSupport)
      newErrors.onboardingSupport = t(
        "requestQuoteForm.validation.onboardingSupport"
      );
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = t("requestQuoteForm.validation.agreeToTerms");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTargetGroupChange = (group) => {
    setFormData({
      ...formData,
      targetGroups: formData.targetGroups.includes(group)
        ? formData.targetGroups.filter((g) => g !== group)
        : [...formData.targetGroups, group],
    });
    if (errors.targetGroups) {
      setErrors((prev) => ({ ...prev, targetGroups: "" }));
    }
  };

  const handleNameInput = (e) => {
    let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    handleChange({ target: { name: e.target.name, value, type: "text" } });
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/[^+\d\s\-\(\)]/g, "");
    handleChange({ target: { name: e.target.name, value, type: "text" } });
  };

  const handleNumberInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    handleChange({ target: { name: e.target.name, value, type: "text" } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const targetGroupMapping = {
      Dementia: "dementia",
      Elderly: "elderly",
      Disabled: "disabled",
      Other: "other",
    };

    const mappedFormData = {
      ...formData,
      targetGroups: formData.targetGroups.map(
        (group) => targetGroupMapping[group] || "other"
      ),
    };

    try {
      const response = await axios.post(
        `${DATABASE_URL}/org/signup`,
        mappedFormData
      );
      console.log("Form submitted successfully:", response.data);
      alert(t("requestQuoteForm.form.messages.success"));
      // navigate("/generate-pass/" + response.data._id);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(t("requestQuoteForm.form.messages.error"));
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="relative bg-black bg-opacity-10 h-[438px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 text-center text-[#ede4dc] px-6">
          <h1 className="text-5xl font-medium mb-4">
            {t("requestQuoteForm.header.title")}
          </h1>
          <p className="text-xl max-w-[754px] mx-auto">
            {t("requestQuoteForm.header.subtitle")}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-[1000px] space-y-8">
          <h2 className="text-2xl font-medium text-[#381207]">
            {t("requestQuoteForm.form.title")}
          </h2>

          {/* Organization Details */}
          <div className="space-y-6">
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                {t("requestQuoteForm.form.labels.organizationName")}
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder={t(
                  "requestQuoteForm.form.placeholders.organizationName"
                )}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                  errors.organizationName
                    ? "border-red-500"
                    : "border-[#cbcbcb]"
                }`}
              />
              {errors.organizationName && (
                <span className="text-red-500 text-sm">
                  {errors.organizationName}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.contactEmail")}
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder={t(
                    "requestQuoteForm.form.placeholders.contactEmail"
                  )}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.contactEmail ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.contactEmail && (
                  <span className="text-red-500 text-sm">
                    {errors.contactEmail}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.phoneNumber")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onInput={handlePhoneInput}
                  placeholder={t("requestQuoteForm.form.placeholders.phone")}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.phone ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone}</span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                {t("requestQuoteForm.form.labels.address")}
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={t("requestQuoteForm.form.placeholders.address")}
                className={`w-full p-3 border rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                  errors.address ? "border-red-500" : "border-[#cbcbcb]"
                }`}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address}</span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.street")}
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder={t("requestQuoteForm.form.placeholders.street")}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.street ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.street && (
                  <span className="text-red-500 text-sm">{errors.street}</span>
                )}
              </div>
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.postalCode")}
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder={t(
                    "requestQuoteForm.form.placeholders.postalCode"
                  )}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.postalCode ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.postalCode && (
                  <span className="text-red-500 text-sm">
                    {errors.postalCode}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.city")}
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={t("requestQuoteForm.form.placeholders.city")}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.city ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.city && (
                  <span className="text-red-500 text-sm">{errors.city}</span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                {t("requestQuoteForm.form.labels.websiteLink")}
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder={t("requestQuoteForm.form.placeholders.website")}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                  errors.website ? "border-red-500" : "border-[#cbcbcb]"
                }`}
              />
              {errors.website && (
                <span className="text-red-500 text-sm">{errors.website}</span>
              )}
            </div>
          </div>

          {/* Organization Details Section */}
          <h3 className="text-2xl font-medium text-[#381207]">
            {t("requestQuoteForm.form.sections.organizationDetails")}
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.fullName")}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onInput={handleNameInput}
                  placeholder={t("requestQuoteForm.form.placeholders.fullName")}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.fullName ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.fullName && (
                  <span className="text-red-500 text-sm">
                    {errors.fullName}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.jobTitle")}
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder={t("requestQuoteForm.form.placeholders.jobTitle")}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.jobTitle ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.jobTitle && (
                  <span className="text-red-500 text-sm">
                    {errors.jobTitle}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.emailAddress")}
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  placeholder={t(
                    "requestQuoteForm.form.placeholders.emailAddress"
                  )}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.emailAddress ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.emailAddress && (
                  <span className="text-red-500 text-sm">
                    {errors.emailAddress}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.phoneNumber")}
                </label>
                <input
                  type="tel"
                  name="phoneContact"
                  value={formData.phoneContact}
                  onChange={handleChange}
                  onInput={handlePhoneInput}
                  placeholder={t(
                    "requestQuoteForm.form.placeholders.phoneContact"
                  )}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.phoneContact ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.phoneContact && (
                  <span className="text-red-500 text-sm">
                    {errors.phoneContact}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Contact Person Section */}
          <h3 className="text-2xl font-medium text-[#381207]">
            {t("requestQuoteForm.form.sections.contactPerson")}
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.totalClients")}
                </label>
                <input
                  type="text"
                  name="totalClients"
                  value={formData.totalClients}
                  onChange={handleChange}
                  onInput={handleNumberInput}
                  placeholder={t(
                    "requestQuoteForm.form.placeholders.totalClients"
                  )}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.totalClients ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.totalClients && (
                  <span className="text-red-500 text-sm">
                    {errors.totalClients}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.numberLocations")}
                </label>
                <input
                  type="text"
                  name="numberLocations"
                  value={formData.numberLocations}
                  onChange={handleChange}
                  onInput={handleNumberInput}
                  placeholder={t(
                    "requestQuoteForm.form.placeholders.numberLocations"
                  )}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.numberLocations
                      ? "border-red-500"
                      : "border-[#cbcbcb]"
                  }`}
                />
                {errors.numberLocations && (
                  <span className="text-red-500 text-sm">
                    {errors.numberLocations}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                {t("requestQuoteForm.form.labels.targetGroups")}
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                {t("requestQuoteForm.form.options.targetGroups", {
                  returnObjects: true,
                }).map((group) => (
                  <label
                    key={group}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.targetGroups.includes(group)}
                      onChange={() => handleTargetGroupChange(group)}
                      className="w-4 h-4"
                    />
                    <span className="text-[#2a341f] text-sm">{group}</span>
                  </label>
                ))}
              </div>
              {errors.targetGroups && (
                <span className="text-red-500 text-sm">
                  {errors.targetGroups}
                </span>
              )}
            </div>
          </div>

          {/* Organization & Target Group */}
          <h3 className="text-2xl font-medium text-[#381207]">
            {t("requestQuoteForm.form.sections.organizationTargetGroup")}
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.estimatedClients")}
                </label>
                <input
                  type="text"
                  name="estimatedClients"
                  value={formData.estimatedClients}
                  onChange={handleChange}
                  onInput={handleNumberInput}
                  placeholder={t(
                    "requestQuoteForm.form.placeholders.estimatedClients"
                  )}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.estimatedClients
                      ? "border-red-500"
                      : "border-[#cbcbcb]"
                  }`}
                />
                {errors.estimatedClients && (
                  <span className="text-red-500 text-sm">
                    {errors.estimatedClients}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("requestQuoteForm.form.labels.startDate")}
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  placeholder={t(
                    "requestQuoteForm.form.placeholders.startDate"
                  )}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] ${
                    errors.startDate ? "border-red-500" : "border-[#cbcbcb]"
                  }`}
                />
                {errors.startDate && (
                  <span className="text-red-500 text-sm">
                    {errors.startDate}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Use of Virtual Walking */}
          <h3 className="text-2xl font-medium text-[#381207]">
            {t("requestQuoteForm.form.sections.virtualWalkingUse")}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                {t("requestQuoteForm.form.labels.onboardingSupport")}
              </label>
              <div className="flex gap-6 mt-2">
                {t("requestQuoteForm.form.options.onboardingSupport", {
                  returnObjects: true,
                }).map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="onboardingSupport"
                      value={option}
                      checked={formData.onboardingSupport === option}
                      onChange={handleChange}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {errors.onboardingSupport && (
                <span className="text-red-500 text-sm">
                  {errors.onboardingSupport}
                </span>
              )}
              <textarea
                name="onboardingExplanation"
                value={formData.onboardingExplanation}
                onChange={handleChange}
                placeholder={t(
                  "requestQuoteForm.form.placeholders.onboardingExplanation"
                )}
                className="w-full p-3 border border-[#cbcbcb] rounded-lg h-20 mt-4 focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
              />
            </div>
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                {t("requestQuoteForm.form.labels.additionalServices")}
              </label>
              <textarea
                name="additionalServices"
                value={formData.additionalServices}
                onChange={handleChange}
                placeholder={t(
                  "requestQuoteForm.form.placeholders.additionalServices"
                )}
                className="w-full p-3 border border-[#cbcbcb] rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
              />
            </div>
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                {t("requestQuoteForm.form.labels.notes")}
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder={t("requestQuoteForm.form.placeholders.notes")}
                className="w-full p-3 border border-[#cbcbcb] rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
              />
            </div>
          </div>

          {/* Quotation & set-up fee */}
          <h3 className="text-2xl font-medium text-[#381207]">
            {t("requestQuoteForm.form.sections.quotationSetup")}
          </h3>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-[#2a341f] text-sm">
                {t("requestQuoteForm.form.labels.agreeToTerms")}{" "}
                <Link
                  to="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5b6502] hover:text-[#4a5201] underline"
                >
                  ({t("footer.termsAndConditions")})
                </Link>
              </span>
            </div>
            {errors.agreeToTerms && (
              <span className="text-red-500 text-sm">
                {errors.agreeToTerms}
              </span>
            )}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-3 bg-[#5b6502] text-white rounded-lg hover:bg-[#4a5201] transition font-medium"
          >
            {t("requestQuoteForm.form.buttons.submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestAQuoteForm;
