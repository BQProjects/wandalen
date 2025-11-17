import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";

const Media = () => {
  const { t } = useTranslation();
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { DATABASE_URL } = React.useContext(DatabaseContext);

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}/admin/media`);
      setMediaItems(response.data);
    } catch (error) {
      console.error("Error fetching media items:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-[#EDE4DC] py-10 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-10 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">{t("media.loading")}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-shrink-0 w-full  bg-secondary flex flex-col items-center justify-center py-16 px-4 sm:px-10 md:px-20">
        <div className="w-full mx-auto text-start">
          {/* Header Section */}
          <div className="mb-16 text-left">
            <div
              className="text-[#5B6502] font-['Poppins'] text-[32px] font-semibold leading-[136%] mb-4"
              style={{ letterSpacing: "-0.32px" }}
            >
              {t("media.header.title")}
            </div>
            {/* <div
              className="text-[#381207] font-['Poppins'] text-5xl lg:text-5xl font-semibold leading-[136%]"
              style={{ letterSpacing: "-0.48px" }}
            >
              {t("blog.header.subtitle")}
            </div> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-[#A6A643] to-[#8F9B3A] h-40 flex items-center justify-center relative overflow-hidden">
                  {item.banner ? (
                    <img
                      src={item.banner}
                      alt={`${item.source} banner`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path
                        d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="14,2 14,8 20,8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="16"
                        y1="13"
                        x2="8"
                        y2="13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="16"
                        y1="17"
                        x2="8"
                        y2="17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <polyline
                        points="10,9 9,9 8,9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#381207] mb-2 line-clamp-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#A6A643] mb-4 font-medium">
                    {item.source}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#A6A643] hover:text-[#8F9B3A] font-medium transition-colors duration-200"
                  >
                    {t("media.readMore")}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </>
  );
};

export default Media;
