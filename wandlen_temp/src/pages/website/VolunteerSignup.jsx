import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import WebsiteHeader from "../../components/WebsiteHeader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import ForestDark from "../../assets/ForestDark.png";
import toast from "react-hot-toast";

const VolunteerSignupForm = () => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    postalCode: "",
    city: "",
    notes: "",
    isFirstTime: false,
    isUpdate: false,
    password: "",
    confirmPassword: "",
  });

   const [errors, setErrors] = useState({});
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };

   const toggleConfirmPasswordVisibility = () => {
     setShowConfirmPassword(!showConfirmPassword);
   };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+?[0-9\s\-\(\)]+$/;
    return re.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = t(
        "volunteerSignup.form.validation.firstNameRequired"
      );
    if (!formData.lastName.trim())
      newErrors.lastName = t(
        "volunteerSignup.form.validation.lastNameRequired"
      );
    if (!formData.email.trim())
      newErrors.email = t("volunteerSignup.form.validation.emailRequired");
    else if (!validateEmail(formData.email))
      newErrors.email = t("volunteerSignup.form.validation.emailInvalid");
    if (formData.phone && !validatePhone(formData.phone))
      newErrors.phone = t("volunteerSignup.form.validation.phoneInvalid");
    if (!formData.password.trim())
      newErrors.password = t(
        "volunteerSignup.form.validation.passwordRequired"
      );
    else if (formData.password.length < 6)
      newErrors.password = t(
        "volunteerSignup.form.validation.passwordMinLength"
      );
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = t(
        "volunteerSignup.form.validation.confirmPasswordRequired"
      );
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = t(
        "volunteerSignup.form.validation.passwordMismatch"
      );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (
      type === "checkbox" &&
      (name === "isFirstTime" || name === "isUpdate")
    ) {
      // Make checkboxes mutually exclusive
      setFormData({
        ...formData,
        isFirstTime: name === "isFirstTime" ? checked : false,
        isUpdate: name === "isUpdate" ? checked : false,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNameInput = (e) => {
    let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    handleInputChange({ target: { name: e.target.name, value, type: "text" } });
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/[^+\d\s\-\(\)]/g, "");
    handleInputChange({ target: { name: e.target.name, value, type: "text" } });
  };

  const handleNumberInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    handleInputChange({ target: { name: e.target.name, value, type: "text" } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await axios.post(`${DATABASE_URL}/volunteer/signup`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone,
        postal: formData.postalCode,
        address: `${formData.street}, ${formData.city}`,
      });
      if (res.status === 201) {
        toast.success(
          t("volunteerSignup.form.messages.signupSuccess") +
            " A confirmation email has been sent to your email address."
        );
        console.log(res.data);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          street: "",
          postalCode: "",
          city: "",
          notes: "",
          isFirstTime: false,
          isUpdate: false,
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } else {
        toast.error(t("volunteerSignup.form.messages.signupFailed"));
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(t("volunteerSignup.form.messages.errorOccurred"));
    }
  };

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      <div className="min-h-screen bg-[#ede4dc]">
        <div className="relative w-full pt-20 pb-50 px-4 sm:px-10 md:px-20 z-0">
          {/* Background Image */}
          <img
            src={ForestDark}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Centered Content */}
          <div className="relative text-left mx-auto">
            <div className="mb-8">
              <h1 className="text-[#ede4dc] font-[Poppins] text-5xl font-semibold leading-tight mb-4">
                {t("volunteerSignup.header.title")}
              </h1>
              <p className="text-[#ede4dc] font-[Poppins] text-2xl font-medium leading-relaxed max-w-2xl">
                {t("volunteerSignup.header.subtitle")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex mx-auto -my-40 pb-10 z-10 relative px-4 sm:px-10 md:px-20">
          <div className="bg-white p-10 rounded-2xl w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    {t("volunteerSignup.form.labels.firstName")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onInput={handleNameInput}
                    placeholder={t(
                      "volunteerSignup.form.placeholders.firstName"
                    )}
                    className={`w-full p-3 rounded-lg border text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643] ${
                      errors.firstName ? "border-red-500" : "border-[#cbcbcb]"
                    }`}
                    required
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    {t("volunteerSignup.form.labels.lastName")}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onInput={handleNameInput}
                    placeholder={t(
                      "volunteerSignup.form.placeholders.lastName"
                    )}
                    className={`w-full p-3 rounded-lg border text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643] ${
                      errors.lastName ? "border-red-500" : "border-[#cbcbcb]"
                    }`}
                    required
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    {t("volunteerSignup.form.labels.contactEmail")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t(
                      "volunteerSignup.form.placeholders.contactEmail"
                    )}
                    className={`w-full p-3 rounded-lg border text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643] ${
                      errors.email ? "border-red-500" : "border-[#cbcbcb]"
                    }`}
                    required
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                  )}
                </div>
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    {t("volunteerSignup.form.labels.phoneNumber")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onInput={handlePhoneInput}
                    placeholder={t(
                      "volunteerSignup.form.placeholders.phoneNumber"
                    )}
                    className={`w-full p-3 rounded-lg border text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643] ${
                      errors.phone ? "border-red-500" : "border-[#cbcbcb]"
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    {t("volunteerSignup.form.labels.street")}
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder={t("volunteerSignup.form.placeholders.street")}
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                  />
                </div>
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    {t("volunteerSignup.form.labels.postalCode")}
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    onInput={handleNumberInput}
                    placeholder={t(
                      "volunteerSignup.form.placeholders.postalCode"
                    )}
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                  />
                </div>
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    {t("volunteerSignup.form.labels.city")}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder={t("volunteerSignup.form.placeholders.city")}
                    className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    {t("volunteerSignup.form.labels.password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full p-3 pr-10 rounded-lg border text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643] ${
                        errors.password ? "border-red-500" : "border-[#cbcbcb]"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7a756e] hover:text-[#5b6502] transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-[#381207] font-medium mb-2">
                    {t("volunteerSignup.form.labels.confirmPassword")}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full p-3 pr-10 rounded-lg border text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643] ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-[#cbcbcb]"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7a756e] hover:text-[#5b6502] transition-colors"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
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
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[#381207] font-medium mb-2">
                  {t("volunteerSignup.form.labels.notes")}
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder={t("volunteerSignup.form.placeholders.notes")}
                  rows="4"
                  className="w-full p-3 rounded-lg border border-[#cbcbcb] text-[#381207] focus:outline-none focus:ring-2 focus:ring-[#a6a643] resize-none"
                />
              </div>

              <div>
                <label className="block text-[#381207] font-medium mb-4">
                  {t("volunteerSignup.form.labels.volunteerStatus")}
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="first-time"
                      name="isFirstTime"
                      checked={formData.isFirstTime}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#a6a643] focus:ring-[#a6a643]"
                    />
                    <label
                      htmlFor="first-time"
                      className="text-[#2a341f] text-sm"
                    >
                      {t("volunteerSignup.form.checkboxes.firstTime")}
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="update-info"
                      name="isUpdate"
                      checked={formData.isUpdate}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#a6a643] focus:ring-[#a6a643]"
                    />
                    <label
                      htmlFor="update-info"
                      className="text-[#2a341f] text-sm"
                    >
                      {t("volunteerSignup.form.checkboxes.updateInfo")}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#5b6502] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#4a5302] transition-colors"
                >
                  {t("volunteerSignup.form.buttons.submit")}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-[#7a756e]">
                {t("volunteerSignup.form.messages.alreadyHaveAccount")}{" "}
                <Link
                  to="/login"
                  className="text-[#2a341f] font-medium hover:underline"
                >
                  {t("volunteerSignup.form.messages.loginHere")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSignupForm;
