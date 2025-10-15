import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#2a341f] text-[#ede4dc] py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16 justify-center">
          {/* Company Info */}
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                  <svg
                    width={28}
                    height={40}
                    viewBox="0 0 65 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#ede4dc] flex-shrink-0"
                  >
                    <path
                      d="M14.2586 89.999C22.9212 87.9819 31.8499 87.0855 40.3494 84.4564C51.4417 81.0257 62.7915 73.7764 64.5343 61.45C66.2084 49.5804 62.8344 37.7367 62.9889 25.8672L57.7948 28.1514C43.8522 35.7886 45.1744 41.2192 45.1744 41.2192C45.389 43.3827 47.1576 45.5291 48.9863 47.7616C50.4286 49.5287 53.0815 50.9424 50.4801 53.0456C49.7332 53.649 48.5656 53.8904 48.059 54.3127C47.003 55.2006 48.2222 56.4849 48.454 57.2262C48.8832 58.6313 48.4025 59.5019 47.2091 60.1742C47.956 60.8638 48.3509 61.088 48.1792 62.2172C48.0762 62.9326 47.2348 63.1481 46.8571 63.7773C46.0501 65.122 46.7369 65.9065 46.8743 67.1994C47.6727 74.9401 37.3102 70.8456 33.1463 71.2852L28.7936 70.9577C24.6812 70.9318 19.7189 71.8024 18.2679 76.1296L14.25 89.9903L14.2586 89.999Z"
                      fill="currentColor"
                    />
                    <path
                      d="M25.0662 55.1327C27.908 48.8143 31.0931 42.4701 31.8572 35.5828C32.5784 29.0834 31.0845 22.5409 29.1099 16.3088C27.4272 10.9989 25.3495 5.49085 26.3454 0C22.0528 5.35294 16.8071 9.84388 12.0594 14.7917C7.31176 19.7395 2.95899 25.3596 1.08739 31.9711C-1.67709 41.7115 1.28485 52.1071 4.88211 61.5717C8.29907 70.5536 12.6604 79.8199 12.7892 89.6207C16.3349 77.8805 20.0095 66.3385 25.0576 55.1327H25.0662Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <p className="text-base sm:text-lg font-medium font-[Poppins]">
                  {t("footer.companyName")}
                </p>
              </div>
            </div>
          </div>
          {/* Menu */}
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-5 font-[Poppins]">
              {t("footer.menu")}
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#a6a643] transition-colors inline-block py-1 font-[Poppins]"
                >
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/ourVission"
                  className="hover:text-[#a6a643] transition-colors inline-block py-1 font-[Poppins]"
                >
                  {t("footer.ourVision")}
                </Link>
              </li>
              <li>
                <Link
                  to="/subscribe"
                  className="hover:text-[#a6a643] transition-colors inline-block py-1 font-[Poppins]"
                >
                  {t("footer.subscriptions")}
                </Link>
              </li>
              <li>
                <Link
                  to="/become-volunteer"
                  className="hover:text-[#a6a643] transition-colors inline-block py-1 font-[Poppins]"
                >
                  {t("footer.volunteer")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-5 font-[Poppins]">
              {t("footer.contact")}
            </h4>
            <div className="text-sm space-y-2 sm:space-y-3 font-[Poppins]">
              <p>{t("footer.address")}</p>
              <p>{t("footer.phone")}</p>
              <p>{t("footer.email")}</p>
            </div>
          </div>

          {/* Socials */}
          <div className="text-center sm:text-left ml-20">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-5 font-[Poppins]">
              {t("footer.followUs")}
            </h4>
            <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <a
                href="https://www.facebook.com/profile.php?id=61575691716922"
                className="hover:text-[#a6a643] transition-colors rounded-full hover:bg-[#a6a643]/10"
                aria-label="Facebook"
              >
                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
                Facebook
              </a>
              <a
                href="https://www.instagram.com/virtueelwandelen/"
                className="hover:text-[#a6a643] transition-colors rounded-full hover:bg-[#a6a643]/10"
                aria-label="Instagram"
              >
                {/* <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4077 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 6.5H17.51"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/106807275/"
                className="hover:text-[#a6a643] transition-colors rounded-full hover:bg-[#a6a643]/10"
                aria-label="LinkedIn"
              >
                {/* <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 9H2V21H6V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#ede4dc]/20 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-center sm:text-left font-[Poppins]">
              {t("footer.copyright")}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs sm:text-sm opacity-75">
              <Link
                to="/terms"
                className="hover:text-[#a6a643] transition-colors font-[Poppins] text-center sm:text-left"
              >
                {t("footer.termsAndConditions")}
              </Link>
              <Link
                to="/privacy-policy"
                className="hover:text-[#a6a643] transition-colors font-[Poppins] text-center sm:text-left"
              >
                {t("footer.privacyPolicy")}
              </Link>
              {/* <span className="hidden sm:inline text-[#ede4dc]/60">&</span>
              <Link
                to="/agreement"
                className="hover:text-[#a6a643] transition-colors font-[Poppins] text-center sm:text-left"
              >
                {t("footer.privacyPolicy")}
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
