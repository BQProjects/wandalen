import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const OrganizationFamilyHeader = () => {
  const { user, userType, isAuthenticated, logout } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileLanguageMenuOpen, setIsMobileLanguageMenuOpen] =
    useState(false);

  const handleLogout = () => {
    logout();
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false);
    setIsMobileLanguageMenuOpen(false);
  };

  return (
    <div className="flex justify-between items-center pl-[4.5rem] pr-[4.5rem] p-4 bg-[#ede4dc] relative">
      <Link
        to="/"
        className="flex flex-col flex-shrink-0 justify-center items-center w-16 h-20 cursor-pointer"
      >
        <svg
          width={65}
          height={90}
          viewBox="0 0 65 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-brown"
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
      </Link>

      {/* Hamburger Menu Button for Mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span
          className={`block w-6 h-0.5 bg-[#381207] transition-transform ${
            isMenuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[#381207] transition-opacity ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[#381207] transition-transform ${
            isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/organization/"
          className="flex justify-center items-center gap-2.5 body text-[#381207] font-['Poppins'] text-xl font-medium leading-[136%] hover:text-[#5b6502] transition-colors"
        >
          Welcome
        </Link>
        <Link
          to="/organization/all-videos"
          className="flex justify-center items-center gap-2.5 body-2 text-[#381207] font-['Poppins'] text-xl font-medium leading-[136%] hover:text-[#5b6502] transition-colors"
        >
          All Videos
        </Link>
        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            className="flex justify-center items-center gap-2"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C10.6333 22 9.34167 21.7373 8.125 21.212C6.90833 20.6867 5.846 19.97 4.938 19.062C4.03 18.154 3.31333 17.0917 2.788 15.875C2.26267 14.6583 2 13.3667 2 12C2 10.6167 2.26267 9.321 2.788 8.113C3.31333 6.905 4.03 5.84667 4.938 4.938C5.846 4.02933 6.90833 3.31267 8.125 2.788C9.34167 2.26333 10.6333 2.00067 12 2C13.3833 2 14.6793 2.26267 15.888 2.788C17.0967 3.31333 18.1547 4.03 19.062 4.938C19.9693 5.846 20.686 6.90433 21.212 8.113C21.738 9.32167 22.0007 10.6173 22 12C22 13.3667 21.7373 14.6583 21.212 15.875C20.6867 17.0917 19.97 18.1543 19.062 19.063C18.154 19.9717 17.0957 20.6883 15.887 21.213C14.6783 21.7377 13.3827 22 12 22ZM12 19.95C12.4333 19.35 12.8083 18.725 13.125 18.075C13.4417 17.425 13.7 16.7333 13.9 16H10.1C10.3 16.7333 10.5583 17.425 10.875 18.075C11.1917 18.725 11.5667 19.35 12 19.95ZM9.4 19.55C9.1 19 8.83767 18.429 8.613 17.837C8.38833 17.245 8.20067 16.6327 8.05 16H5.1C5.58333 16.8333 6.18767 17.5583 6.913 18.175C7.63833 18.7917 8.46733 19.25 9.4 19.55ZM14.6 19.55C15.5333 19.25 16.3627 18.7917 17.088 18.175C17.8133 17.5583 18.4173 16.8333 18.9 16H15.95C15.8 16.6333 15.6127 17.246 15.388 17.838C15.1633 18.43 14.9007 19.0007 14.6 19.55ZM4.25 14H7.65C7.6 13.6667 7.56267 13.3377 7.538 13.013C7.51333 12.6883 7.50067 12.3507 7.5 12C7.49933 11.6493 7.512 11.312 7.538 10.988C7.564 10.664 7.60133 10.3347 7.65 10H4.25C4.16667 10.3333 4.10433 10.6627 4.063 10.988C4.02167 11.3133 4.00067 11.6507 4 12C3.99933 12.3493 4.02033 12.687 4.063 13.013C4.10567 13.339 4.168 13.668 4.25 14ZM9.65 14H14.35C14.4 13.6667 14.4377 13.3377 14.463 13.013C14.4883 12.6883 14.5007 12.3507 14.5 12C14.4993 11.6493 14.4867 11.312 14.462 10.988C14.4373 10.664 14.4 10.3347 14.35 10H9.65C9.6 10.3333 9.56267 10.6627 9.538 10.988C9.51333 11.3133 9.50067 11.6507 9.5 12C9.49933 12.3493 9.512 12.687 9.538 13.013C9.564 13.339 9.60133 13.668 9.65 14ZM16.35 14H19.75C19.8333 13.6667 19.896 13.3377 19.938 13.013C19.98 12.6883 20.0007 12.3507 20 12C19.9993 11.6493 19.9787 11.312 19.938 10.988C19.8973 10.664 19.8347 10.3347 19.75 10H16.35C16.4 10.3333 16.4377 10.6627 16.463 10.988C16.4883 11.3133 16.5007 11.6507 16.5 12C16.4993 12.3493 16.4867 12.687 16.462 13.013C16.4373 13.339 16.4 13.668 16.35 14ZM15.95 8H18.9C18.4167 7.16667 17.8127 6.44167 17.088 5.825C16.3633 5.20833 15.534 4.75 14.6 4.45C14.9 5 15.1627 5.571 15.388 6.163C15.6133 6.755 15.8007 7.36733 15.95 8ZM10.1 8H13.9C13.7 7.26667 13.4417 6.575 13.125 5.925C12.8083 5.275 12.4333 4.65 12 4.05C11.5667 4.65 11.1917 5.275 10.875 5.925C10.5583 6.575 10.3 7.26667 10.1 8ZM5.1 8H8.05C8.2 7.36667 8.38767 6.754 8.613 6.162C8.83833 5.57 9.10067 4.99933 9.4 4.45C8.46667 4.75 7.63733 5.20833 6.912 5.825C6.18667 6.44167 5.58267 7.16667 5.1 8Z"
                fill="#4B4741"
              />
            </svg>
            <div className="body-4 text-[#4b4741] font-['Poppins'] text-xl font-medium leading-[136%]">
              {i18n.language === "en" ? t("header.english") : "Nederlands"}
            </div>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${
                isLanguageMenuOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M12.0008 14.9998L7.75781 10.7578L9.17281 9.34375L12.0008 12.1718L14.8288 9.34375L16.2438 10.7578L12.0008 14.9998Z"
                fill="#4B4741"
              />
            </svg>
          </button>
          {isLanguageMenuOpen && (
            <div className="absolute top-full mt-2 bg-secondary border border-[#381207] rounded-lg shadow-lg z-50">
              <button
                onClick={() => changeLanguage("nl")}
                className="block w-full text-left px-4 py-2 hover:bg-[#f0ebe7] text-[#381207] font-poppins text-lg md:text-xl font-medium"
              >
                Nederlands
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className="block w-full text-left px-4 py-2 hover:bg-[#f0ebe7] text-[#381207] font-poppins text-lg md:text-xl font-medium"
              >
                {t("header.english")}
              </button>
            </div>
          )}
        </div>
        <Link to="/organization/profile" className="w-12 h-12">
          <div className="flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity">
            <svg
              width={48}
              height={48}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 0C10.752 0 0 10.752 0 24C0 37.248 10.752 48 24 48C37.248 48 48 37.248 48 24C48 10.752 37.248 0 24 0ZM24 9.6C28.632 9.6 32.4 13.368 32.4 18C32.4 22.632 28.632 26.4 24 26.4C19.368 26.4 15.6 22.632 15.6 18C15.6 13.368 19.368 9.6 24 9.6ZM24 43.2C19.128 43.2 13.368 41.232 9.264 36.288C13.4684 32.9909 18.657 31.1991 24 31.1991C29.343 31.1991 34.5316 32.9909 38.736 36.288C34.632 41.232 28.872 43.2 24 43.2Z"
                fill="#381207"
              />
            </svg>
          </div>
        </Link>
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex justify-center items-center gap-2.5 py-2 px-4 rounded-lg bg-[#381207] text-white text-center font-['Poppins'] text-xl font-medium leading-[136%] hover:bg-[#4a3a2a] transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#ede4dc] shadow-lg z-40">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              to="/organization/"
              className="text-[#381207] font-['Poppins'] text-lg font-medium hover:text-[#5b6502] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Welcome
            </Link>
            <Link
              to="/organization/all-videos"
              className="text-[#381207] font-['Poppins'] text-lg font-medium hover:text-[#5b6502] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              All Videos
            </Link>
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsMobileLanguageMenuOpen(!isMobileLanguageMenuOpen)
                }
                className="flex justify-center items-center gap-2"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C10.6333 22 9.34167 21.7373 8.125 21.212C6.90833 20.6867 5.846 19.97 4.938 19.062C4.03 18.154 3.31333 17.0917 2.788 15.875C2.26267 14.6583 2 13.3667 2 12C2 10.6167 2.26267 9.321 2.788 8.113C3.31333 6.905 4.03 5.84667 4.938 4.938C5.846 4.02933 6.90833 3.31267 8.125 2.788C9.34167 2.26333 10.6333 2.00067 12 2C13.3833 2 14.6793 2.26267 15.888 2.788C17.0967 3.31333 18.1547 4.03 19.062 4.938C19.9693 5.846 20.686 6.90433 21.212 8.113C21.738 9.32167 22.0007 10.6173 22 12C22 13.3667 21.7373 14.6583 21.212 15.875C20.6867 17.0917 19.97 18.1543 19.062 19.063C18.154 19.9717 17.0957 20.6883 15.887 21.213C14.6783 21.7377 13.3827 22 12 22ZM12 19.95C12.4333 19.35 12.8083 18.725 13.125 18.075C13.4417 17.425 13.7 16.7333 13.9 16H10.1C10.3 16.7333 10.5583 17.425 10.875 18.075C11.1917 18.725 11.5667 19.35 12 19.95ZM9.4 19.55C9.1 19 8.83767 18.429 8.613 17.837C8.38833 17.245 8.20067 16.6327 8.05 16H5.1C5.58333 16.8333 6.18767 17.5583 6.913 18.175C7.63833 18.7917 8.46733 19.25 9.4 19.55ZM14.6 19.55C15.5333 19.25 16.3627 18.7917 17.088 18.175C17.8133 17.5583 18.4173 16.8333 18.9 16H15.95C15.8 16.6333 15.6127 17.246 15.388 17.838C15.1633 18.43 14.9007 19.0007 14.6 19.55ZM4.25 14H7.65C7.6 13.6667 7.56267 13.3377 7.538 13.013C7.51333 12.6883 7.50067 12.3507 7.5 12C7.49933 11.6493 7.512 11.312 7.538 10.988C7.564 10.664 7.60133 10.3347 7.65 10H4.25C4.16667 10.3333 4.10433 10.6627 4.063 10.988C4.02167 11.3133 4.00067 11.6507 4 12C3.99933 12.3493 4.02033 12.687 4.063 13.013C4.10567 13.339 4.168 13.668 4.25 14ZM9.65 14H14.35C14.4 13.6667 14.4377 13.3377 14.463 13.013C14.4883 12.6883 14.5007 12.3507 14.5 12C14.4993 11.6493 14.4867 11.312 14.462 10.988C14.4373 10.664 14.4 10.3347 14.35 10H9.65C9.6 10.3333 9.56267 10.6627 9.538 10.988C9.51333 11.3133 9.50067 11.6507 9.5 12C9.49933 12.3493 9.512 12.687 9.538 13.013C9.564 13.339 9.60133 13.668 9.65 14ZM16.35 14H19.75C19.8333 13.6667 19.896 13.3377 19.938 13.013C19.98 12.6883 20.0007 12.3507 20 12C19.9993 11.6493 19.9787 11.312 19.938 10.988C19.8973 10.664 19.8347 10.3347 19.75 10H16.35C16.4 10.3333 16.4377 10.6627 16.463 10.988C16.4883 11.3133 16.5007 11.6507 16.5 12C16.4993 12.3493 16.4867 12.687 16.462 13.013C16.4373 13.339 16.4 13.668 16.35 14ZM15.95 8H18.9C18.4167 7.16667 17.8127 6.44167 17.088 5.825C16.3633 5.20833 15.534 4.75 14.6 4.45C14.9 5 15.1627 5.571 15.388 6.163C15.6133 6.755 15.8007 7.36733 15.95 8ZM10.1 8H13.9C13.7 7.26667 13.4417 6.575 13.125 5.925C12.8083 5.275 12.4333 4.65 12 4.05C11.5667 4.65 11.1917 5.275 10.875 5.925C10.5583 6.575 10.3 7.26667 10.1 8ZM5.1 8H8.05C8.2 7.36667 8.38767 6.754 8.613 6.162C8.83833 5.57 9.10067 4.99933 9.4 4.45C8.46667 4.75 7.63733 5.20833 6.912 5.825C6.18667 6.44167 5.58267 7.16667 5.1 8Z"
                    fill="#4B4741"
                  />
                </svg>
                <div className="body-5 text-brown font-['Poppins'] text-lg font-medium leading-[136%]">
                  {i18n.language === "en" ? t("header.english") : "Nederlands"}
                </div>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform ${
                    isMobileLanguageMenuOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M12.0008 14.9998L7.75781 10.7578L9.17281 9.34375L12.0008 12.1718L14.8288 9.34375L16.2438 10.7578L12.0008 14.9998Z"
                    fill="#4B4741"
                  />
                </svg>
              </button>
              {isMobileLanguageMenuOpen && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[#381207] font-poppins text-lg font-medium"
                  >
                    {t("header.english")}
                  </button>
                  <button
                    onClick={() => changeLanguage("nl")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[#381207] font-poppins text-lg font-medium"
                  >
                    Nederlands
                  </button>
                </div>
              )}
            </div>
            <Link
              to="/organization/profile"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity">
                <svg
                  width={48}
                  height={48}
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 0C10.752 0 0 10.752 0 24C0 37.248 10.752 48 24 48C37.248 48 48 37.248 48 24C48 10.752 37.248 0 24 0ZM24 9.6C28.632 9.6 32.4 13.368 32.4 18C32.4 22.632 28.632 26.4 24 26.4C19.368 26.4 15.6 22.632 15.6 18C15.6 13.368 19.368 9.6 24 9.6ZM24 43.2C19.128 43.2 13.368 41.232 9.264 36.288C13.4684 32.9909 18.657 31.1991 24 31.1991C29.343 31.1991 34.5316 32.9909 38.736 36.288C34.632 41.232 28.872 43.2 24 43.2Z"
                    fill="#381207"
                  />
                </svg>
              </div>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="py-2 px-4 rounded-lg bg-[#381207] text-white font-['Poppins'] text-lg font-medium hover:bg-[#4a3a2a] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationFamilyHeader;
