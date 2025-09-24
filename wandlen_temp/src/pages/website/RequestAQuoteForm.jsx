import React, { useContext, useState } from "react";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { useNavigate } from "react-router-dom";

const RequestAQuoteForm = () => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const navigate = useNavigate();

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
      newErrors.organizationName = "Organization name is required";
    if (!formData.contactEmail.trim())
      newErrors.contactEmail = "Contact email is required";
    else if (!validateEmail(formData.contactEmail))
      newErrors.contactEmail = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(formData.phone))
      newErrors.phone = "Invalid phone format";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (formData.website && !validateUrl(formData.website))
      newErrors.website = "Invalid URL format";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.emailAddress.trim())
      newErrors.emailAddress = "Email address is required";
    else if (!validateEmail(formData.emailAddress))
      newErrors.emailAddress = "Invalid email format";
    if (!formData.phoneContact.trim())
      newErrors.phoneContact = "Phone contact is required";
    else if (!validatePhone(formData.phoneContact))
      newErrors.phoneContact = "Invalid phone format";
    if (!formData.totalClients.trim())
      newErrors.totalClients = "Total clients is required";
    if (!formData.numberLocations.trim())
      newErrors.numberLocations = "Number of locations is required";
    if (formData.targetGroups.length === 0)
      newErrors.targetGroups = "At least one target group is required";
    if (!formData.estimatedClients.trim())
      newErrors.estimatedClients = "Estimated clients is required";
    if (!formData.startDate.trim())
      newErrors.startDate = "Start date is required";
    if (!formData.onboardingSupport)
      newErrors.onboardingSupport = "Onboarding support selection is required";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";
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
    try {
      const response = await axios.post(`${DATABASE_URL}/org/signup`, formData);
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully!");
      navigate("/generate-pass/" + response.data._id);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please check your details and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="relative bg-black bg-opacity-10 h-[438px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 text-center text-[#ede4dc] px-6">
          <h1 className="text-5xl font-medium mb-4">Get a Custom Quote</h1>
          <p className="text-xl max-w-[754px] mx-auto">
            Tell us a bit about your organization or family. We’ll help you take
            the next step toward meaningful, nature-connected experiences. Just
            fill in the details, and we’ll get back to you shortly with a
            tailored quote.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-[1000px] space-y-8">
          <h2 className="text-2xl font-medium text-[#381207]">
            Please fill in the details below
          </h2>

          {/* Organization Details */}
          <div className="space-y-6">
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                Organization Name
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="E.g., Sunrise Wellness Center, City Care Home, Local Daycare"
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
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="E.g. info@wellnesscenter.nl"
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
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onInput={handlePhoneInput}
                  placeholder="+31"
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
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, building number"
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
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Street, building number..."
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
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="E.g., 1234 AB"
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
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Amsterdam"
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
                Website Link
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="e.g. https://website.link/..."
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
            Organization details
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onInput={handleNameInput}
                  placeholder="E.g., Anna Jansen"
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
                  Job Title / Position
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="E.g., Activities Coordinator, Care Manager"
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
                  Email Address
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  placeholder="Your direct work email"
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
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneContact"
                  value={formData.phoneContact}
                  onChange={handleChange}
                  onInput={handlePhoneInput}
                  placeholder="+31 | Direct line for quick contact"
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
            Contact person
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  Total Number of Clients
                </label>
                <input
                  type="text"
                  name="totalClients"
                  value={formData.totalClients}
                  onChange={handleChange}
                  onInput={handleNumberInput}
                  placeholder="How many people are in your care?"
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
                  Number of Locations
                </label>
                <input
                  type="text"
                  name="numberLocations"
                  value={formData.numberLocations}
                  onChange={handleChange}
                  onInput={handleNumberInput}
                  placeholder="E.g., 1 care home, 3 daycare centers"
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
                Target group(s) for which the platform will be used
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                {["Dementia", "Day care", "Rehabilitation", "Other"].map(
                  (group) => (
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
                  )
                )}
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
            Organization & Target Group
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  Estimated number of clients who will use the platform
                </label>
                <input
                  type="text"
                  name="estimatedClients"
                  value={formData.estimatedClients}
                  onChange={handleChange}
                  onInput={handleNumberInput}
                  placeholder="E.g., 20 clients per week"
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
                  Desired start date of use
                </label>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  placeholder="E.g., 01 October 2025"
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
            Use of Virtual Walking
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                Do you need onboarding and integration support?
              </label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="onboardingSupport"
                    value="Yes"
                    checked={formData.onboardingSupport === "Yes"}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="onboardingSupport"
                    value="No"
                    checked={formData.onboardingSupport === "No"}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
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
                placeholder="Please explain"
                className="w-full p-3 border border-[#cbcbcb] rounded-lg h-20 mt-4 focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
              />
            </div>
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                Additional services or custom solutions you are interested in?
              </label>
              <textarea
                name="additionalServices"
                value={formData.additionalServices}
                onChange={handleChange}
                placeholder="Tell us what you’d like to explore. Example: “Virtual Walking Experience Box with scent, sound, and touch elements (€93 each)."
                className="w-full p-3 border border-[#cbcbcb] rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
              />
            </div>
            <div>
              <label className="block text-[#381207] font-medium mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="E.g., special billing instructions or accessibility needs"
                className="w-full p-3 border border-[#cbcbcb] rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
              />
            </div>
          </div>

          {/* Quotation & set-up fee */}
          <h3 className="text-2xl font-medium text-[#381207]">
            Quotation & set-up fee
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
                I agree that my details will be used to prepare a quotation.
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestAQuoteForm;
