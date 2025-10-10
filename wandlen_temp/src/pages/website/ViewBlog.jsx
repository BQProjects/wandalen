import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="flex-shrink-0 bg-secondary">
      <div className="flex-shrink-0">
        {/* Title */}
        <div className="inline-flex flex-col items-start gap-4 px-4 sm:px-10 md:px-20 mt-10">
          <div className="text-primary font-[Poppins] text-xl md:text-[2rem] font-semibold leading-[136%]">
            Blog
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
      </div>
      <Testimonial />
      <FaqQuestions />
      <SubscribeCard />
      <Footer />
    </div>
  );
};

export default ViewBlog;
