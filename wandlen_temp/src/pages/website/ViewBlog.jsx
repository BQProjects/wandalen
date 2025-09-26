import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${id}`);
      if (!response.ok) throw new Error("Failed to fetch blog");
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="flex-shrink-0 bg-secondary">
      <div className="flex-shrink-0">
        {/* Title */}
        <div className="inline-flex flex-col items-start gap-4 px-4 sm:px-10 md:px-20">
          <div className="text-primary font-[Poppins] text-xl md:text-[2rem] font-semibold leading-[136%]">
            Blog
          </div>
          <div className="w-full md:w-[654px] text-brown font-[Poppins] text-2xl sm:text-3xl md:text-5xl font-semibold leading-[136%] text-center md:text-left">
            {blog.title}
          </div>
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
                      {item.type === "text" ? (
                        <div className="text-brown text-left font-[Poppins] text-base sm:text-lg md:text-2xl leading-[136%]">
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
      </div>
      <Testimonial />
      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </div>
  );
};

export default ViewBlog;
