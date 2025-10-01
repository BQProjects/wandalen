import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import OrganizationIcon from "../../assets/Organization.svg";
import FamilyIcon from "../../assets/FamilyIcon.svg";

const ChooseYourExperience = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#515744] flex items-center justify-center px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-white text-3xl md:text-5xl font-semibold leading-tight max-w-3xl mx-auto">
            {t("chooseYourExperience.subtitle")}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* For Care Organizations */}
          <div className="bg-[#454c36] rounded-2xl p-8 md:p-10 flex flex-col items-center text-center">
            <div className="mb-8">
              <img
                src={OrganizationIcon}
                alt="Organization"
                className="w-40 h-40 mx-auto"
              />
            </div>

            <div className="mb-8">
              <h3 className="text-white text-2xl font-medium mb-4">
                {t("chooseYourExperience.organization.title")}
              </h3>
              <p className="text-white text-center leading-relaxed max-w-sm mx-auto">
                {t("chooseYourExperience.organization.description")}
              </p>
            </div>

            <Link to="/request-quote">
              <button className="bg-[#5b6502] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4a5302] transition-colors">
                {t("chooseYourExperience.organization.button")}
              </button>
            </Link>
          </div>

          {/* For Families at Home */}
          <div className="bg-[#454c36] rounded-2xl p-8 md:p-10 flex flex-col items-center text-center">
            <div className="mb-8">
              <img
                src={FamilyIcon}
                alt="Family"
                className="w-40 h-40 mx-auto"
              />
            </div>

            <div className="mb-8">
              <h3 className="text-white text-2xl font-medium mb-4">
                {t("chooseYourExperience.family.title")}
              </h3>
              <p className="text-white text-center leading-relaxed max-w-sm mx-auto">
                {t("chooseYourExperience.family.description")}
              </p>
            </div>

            <Link to="/subscribe">
              <button className="bg-[#5b6502] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4a5302] transition-colors">
                {t("chooseYourExperience.family.button")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseYourExperience;
