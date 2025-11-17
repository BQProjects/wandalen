import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { DATABASE_URL } = useContext(DatabaseContext);
  const { t } = useTranslation();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}/admin/blogs/${id}`);
      const data = response.data;
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>{t("viewBlog.loading")}</div>;
  }

  if (!blog) {
    return <div>{t("viewBlog.notFound")}</div>;
  }

  return (
    <div className="flex-shrink-0 bg-secondary">
      <div className="flex-shrink-0">
        {/* Title */}
        <div className="inline-flex flex-col items-start gap-4 px-4 sm:px-10 md:px-20 mt-10">
          <div className="text-primary font-[Poppins] text-xl md:text-[2rem] font-semibold leading-[136%]">
            {t("viewBlog.blogTitle")}
          </div>
          <div className="w-full md:w-[654px] text-brown font-[Poppins] text-2xl sm:text-3xl md:text-5xl font-semibold leading-[136%] text-center md:text-left">
            {blog.title}
          </div>
          {blog.date && (
            <div className="text-brown font-[Poppins] text-lg leading-[136%]">
              {new Date(blog.date).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Main section */}
        <div className="flex flex-col md:flex-col items-center md:items-start justify-between mt-8 gap-10 md:gap-0 mb-20 px-4 sm:px-10 md:px-20">
          <img
            src={blog.imgUrl || "/path/to/default/image.jpg"}
            alt={blog.title}
            className="w-full h-auto rounded-3xl object-cover shadow-lg"
          />
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <div className="flex flex-col items-start gap-4 mt-10">
              <div className="flex flex-col items-start gap-5">
                {blog.content &&
                  blog.content.map((item, index) => (
                    <div key={index} className="w-full">
                      {item.type === "heading" ? (
                        <div className="text-primary font-[Poppins] text-xl md:text-2xl font-semibold leading-[136%]">
                          {item.value}
                        </div>
                      ) : item.type === "text" ? (
                        <div className="text-brown text-left font-[Poppins] text-base sm:text-lg md:text-xl leading-[136%]">
                          {item.value}
                        </div>
                      ) : item.type === "image" ? (
                        <img
                          src={item.value}
                          alt={`Content ${index}`}
                          className="w-full h-auto rounded-3xl object-cover shadow-lg"
                        />
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Downloadable Resources Section */}
        {blog.downloadableResources &&
          blog.downloadableResources.length > 0 && (
            <div className="flex flex-col items-start gap-6 w-full px-4 sm:px-10 md:px-20 mb-10">
              <div className="text-primary font-[Poppins] text-2xl font-semibold leading-[136%]">
                {t("viewBlog.downloadableResources")}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {blog.downloadableResources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary"
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
                        </svg>
                      </div>
                      <div className="text-brown font-[Poppins] text-lg font-semibold leading-[136%] flex-1 truncate">
                        {resource.name}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        window.open(resource.url, "_blank");
                      }}
                      className="flex justify-center items-center gap-3 py-3 px-6 rounded-xl bg-primary text-white font-[Poppins] font-semibold leading-[136%] hover:bg-primary-dark hover:shadow-md transition-all duration-200 w-full group"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:translate-y-0.5 transition-transform duration-200"
                      >
                        <path
                          d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 10L12 15L17 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15V3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {t("viewBlog.download")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
      <Testimonial />
      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </div>
  );
};

export default ViewBlog;
