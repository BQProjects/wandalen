import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";

const TermnCondition = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#ede4dc] min-h-screen pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2a341f] mb-8 text-center">
          {t("agreement.title")}
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article1.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article1.point1")}</li>
            <li>{t("agreement.article1.point2")}</li>
            <li>{t("agreement.article1.point3")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article2.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article2.point1")}</li>
            <li>{t("agreement.article2.point2")}</li>
            <li>{t("agreement.article2.point3")}</li>
            <li>{t("agreement.article2.point4")}</li>
            <li>{t("agreement.article2.point5")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article3.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article3.point1")}</li>
            <li>{t("agreement.article3.point2")}</li>
            <li>{t("agreement.article3.point3")}</li>
            <li>{t("agreement.article3.point4")}</li>
            <li>{t("agreement.article3.point5")}</li>
            <li>{t("agreement.article3.point6")}</li>
            <li>{t("agreement.article3.point7")}</li>
            <li>{t("agreement.article3.point8")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article4.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article4.point1")}</li>
            <li>{t("agreement.article4.point2")}</li>
            <li>{t("agreement.article4.point3")}</li>
            <li>{t("agreement.article4.point4")}</li>
            <li>{t("agreement.article4.point5")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article5.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article5.point1")}</li>
            <li>{t("agreement.article5.point2")}</li>
            <li>{t("agreement.article5.point3")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article6.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article6.point1")}</li>
            <li>{t("agreement.article6.point2")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article7.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article7.point1")}</li>
            <li>{t("agreement.article7.point2")}</li>
            <li>{t("agreement.article7.point3")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article8.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article8.point1")}</li>
            <li>{t("agreement.article8.point2")}</li>
            <li>{t("agreement.article8.point3")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article9.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article9.point1")}</li>
            <li>{t("agreement.article9.point2")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article10.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>
              {t("agreement.article10.point1")}
              <ul className="list-disc pl-6 mt-2">
                <li>{t("agreement.article10.phone")}</li>
                <li>{t("agreement.article10.email")}</li>
              </ul>
            </li>
            <li>{t("agreement.article10.point2")}</li>
            <li>{t("agreement.article10.point3")}</li>
            <li>{t("agreement.article10.point4")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article11.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article11.point1")}</li>
            <li>{t("agreement.article11.point2")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article12.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article12.point1")}</li>
            <li>{t("agreement.article12.point2")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4">
            {t("agreement.article13.title")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>{t("agreement.article13.point1")}</li>
            <li>{t("agreement.article13.point2")}</li>
            <li>{t("agreement.article13.point3")}</li>
          </ol>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-6 mt-10">
            {t("agreement.disclaimer.title")}
          </h2>
          <p className="mb-4">{t("agreement.disclaimer.paragraph1")}</p>
          <p className="mb-4">{t("agreement.disclaimer.paragraph2")}</p>
          <p className="mb-4">{t("agreement.disclaimer.paragraph3")}</p>
          <p className="mb-4">{t("agreement.disclaimer.paragraph4")}</p>

          <h2 className="text-xl md:text-2xl font-semibold text-[#2a341f] mb-4 mt-10">
            {t("agreement.copyright.title")}
          </h2>
          <p className="mb-4">{t("agreement.copyright.paragraph1")}</p>
          <p className="mb-4">{t("agreement.copyright.paragraph2")}</p>
        </div>
          </div>
          <Footer />
    </div>
  );
};

export default TermnCondition;
