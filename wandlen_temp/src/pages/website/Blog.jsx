import React, { useState, useEffect, useContext } from "react";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const Blog = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;
  const { DATABASE_URL } = useContext(DatabaseContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}/admin/blogs`);
      const data = response.data;
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="flex-shrink-0 w-full min-h-[941px] bg-secondary flex flex-col items-center justify-center py-16 px-4 sm:px-10 md:px-20">
        <div className="w-full mx-auto text-start">
          {/* Header Section */}
          <div className="mb-16 text-left">
            <div
              className="text-[#5B6502] font-['Poppins'] text-[32px] font-semibold leading-[136%] mb-4"
              style={{ letterSpacing: "-0.32px" }}
            >
              {t("blog.header.title")}
            </div>
            <div
              className="text-[#381207] font-['Poppins'] text-5xl lg:text-4xl font-semibold leading-[136%]"
              style={{ letterSpacing: "-0.48px" }}
            >
              {t("blog.header.subtitle")}
            </div>
          </div>

          {/* Blog Grid - 2x2 Layout */}
          <div className="grid grid-cols-2 gap-8 lg:gap-12 mx-auto">
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="cursor-pointer flex flex-col gap-2"
                >
                  <Link to={`/blog/${blog._id}`}>
                    <div className="relative w-full h-full lg:h-[320px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat flex justify-center items-center group">
                      <img
                        src={blog.imgUrl || "/path/to/default/image.jpg"}
                        alt={blog.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                    <div className="text-[#4B4741] font-['Poppins'] text-lg font-semibold text-left mt-8 ml-1">
                      {blog.title}
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-[#381207] font-['Poppins'] text-lg">
                  No blogs available.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#5B6502] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-[#381207] font-['Poppins']">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#5B6502] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <Testimonial />
      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </>
  );
};

export default Blog;
