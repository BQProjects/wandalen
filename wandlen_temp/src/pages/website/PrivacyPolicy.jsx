import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#ede4dc] min-h-screen pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2a341f] mb-8 text-center">
          {t("privacy.title")}
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <div className="text-center mb-6">
            <p className="text-[#7a756e] mb-2">{t("privacy.subtitle")}</p>
            <p className="text-[#7a756e]">{t("privacy.lastModified")}</p>
          </div>

          <p className="mb-8 text-[#381207]">{t("privacy.intro")}</p>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            1. {t("privacy.article1.title")}
          </h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>{t("privacy.article1.point1")}</li>
            <li>{t("privacy.article1.point2")}</li>
            <li>{t("privacy.article1.point3")}</li>
            <li>{t("privacy.article1.point4")}</li>
            <li>{t("privacy.article1.point5")}</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            2. {t("privacy.article2.title")}
          </h2>
          <p className="mb-4">{t("privacy.article2.intro")}</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>{t("privacy.article2.point1")}</li>
            <li>{t("privacy.article2.point2")}</li>
            <li>{t("privacy.article2.point3")}</li>
            <li>{t("privacy.article2.point4")}</li>
            <li>{t("privacy.article2.point5")}</li>
          </ul>
          <p className="mb-4">{t("privacy.article2.dataIntro")}</p>
          <ul className="list-disc pl-6 space-y-1 mb-6">
            <li>{t("privacy.article2.dataPoint1")}</li>
            <li>{t("privacy.article2.dataPoint2")}</li>
            <li>{t("privacy.article2.dataPoint3")}</li>
            <li>{t("privacy.article2.dataPoint4")}</li>
            <li>{t("privacy.article2.dataPoint5")}</li>
            <li>{t("privacy.article2.dataPoint6")}</li>
            <li>{t("privacy.article2.dataPoint7")}</li>
            <li>{t("privacy.article2.dataPoint8")}</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            3. {t("privacy.article3.title")}
          </h2>
          <p className="mb-4">{t("privacy.article3.intro")}</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>{t("privacy.article3.point1")}</li>
            <li>{t("privacy.article3.point2")}</li>
            <li>{t("privacy.article3.point3")}</li>
            <li>{t("privacy.article3.point4")}</li>
            <li>{t("privacy.article3.point5")}</li>
            <li>{t("privacy.article3.point6")}</li>
            <li>{t("privacy.article3.point7")}</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            4. {t("privacy.article4.title")}
          </h2>
          <p className="mb-4">{t("privacy.article4.intro")}</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>{t("privacy.article4.point1")}</li>
            <li>{t("privacy.article4.point2")}</li>
            <li>{t("privacy.article4.point3")}</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            5. {t("privacy.article5.title")}
          </h2>
          <p className="mb-4">{t("privacy.article5.intro")}</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>{t("privacy.article5.point1")}</li>
            <li>{t("privacy.article5.point2")}</li>
            <li>{t("privacy.article5.point3")}</li>
          </ul>
          <p className="mb-6 italic">{t("privacy.article5.note")}</p>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            6. {t("privacy.article6.title")}
          </h2>
          <p className="mb-4">{t("privacy.article6.intro")}</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>{t("privacy.article6.point1")}</li>
            <li>{t("privacy.article6.point2")}</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            7. {t("privacy.article7.title")}
          </h2>
          <p className="mb-4">{t("privacy.article7.intro")}</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>{t("privacy.article7.point1")}</li>
            <li>{t("privacy.article7.point2")}</li>
            <li>{t("privacy.article7.point3")}</li>
            <li>{t("privacy.article7.point4")}</li>
          </ul>
          <p className="mb-2">{t("privacy.article7.contact")}</p>
          <p className="mb-6">{t("privacy.article7.email")}</p>
          <p className="mb-6">{t("privacy.article7.response")}</p>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            8. {t("privacy.article8.title")}
          </h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>{t("privacy.article8.point1")}</li>
            <li>{t("privacy.article8.point2")}</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            9. {t("privacy.article9.title")}
          </h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>{t("privacy.article9.point1")}</li>
            <li>{t("privacy.article9.point2")}</li>
            <li>{t("privacy.article9.point3")}</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            10. {t("privacy.article10.title")}
          </h2>
          <p className="mb-4">{t("privacy.article10.intro")}</p>
          <p className="mb-4">{t("privacy.article10.contact")}</p>
          <div className="mb-4">
            <p className="font-semibold">{t("privacy.article10.company")}</p>
            <p>{t("privacy.article10.address")}</p>
            <p>{t("privacy.article10.city")}</p>
            <p>{t("privacy.article10.email")}</p>
            <p>{t("privacy.article10.phone")}</p>
          </div>
          <p className="mb-4 font-semibold">{t("privacy.article10.complaint")}</p>
          <p className="mb-6">{t("privacy.article10.complaintText")}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
