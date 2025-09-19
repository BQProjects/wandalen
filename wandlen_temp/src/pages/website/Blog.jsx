import React from "react";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";
import SubscribeCard from "../../components/SubscribeCard";
import Footer from "../../components/Footer";
import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.png";
import blog3 from "../../assets/blog3.png";
import blog4 from "../../assets/blog4.png";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <>
      <div className="flex-shrink-0 w-full min-h-[941px] bg-[#eeebc6] flex flex-col items-center justify-center py-16 px-8">
        <div className="w-full max-w-[1280px] mx-auto text-start">
          {/* Header Section */}
          <div className="mb-16 text-left ml-13">
            <div
              className="text-[#5B6502] font-['Poppins'] text-[32px] font-semibold leading-[136%] mb-4"
              style={{ letterSpacing: "-0.32px" }}
            >
              Nature Stories
            </div>
            <div
              className="text-[#381207] font-['Poppins'] text-5xl lg:text-4xl font-semibold leading-[136%]"
              style={{ letterSpacing: "-0.48px" }}
            >
              Stories and insights that bring nature <br></br> closer to
              everyone
            </div>
          </div>

          {/* Video Grid - 2x2 Layout */}
          <div className="grid grid-cols-2 gap-8 lg:gap-12 mx-auto px-4 lg:px-8 xl:px-12">
            {/* Video 1 - Mountain/Forest Scene */}
            <div className="cursor-pointer flex flex-col gap-2">
              <Link to="/nature-matters">
                <div className="relative w-full h-full lg:h-[320px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat flex justify-center items-center group">
                  <img
                    src={blog1}
                    alt="Blog1"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="text-[#4B4741] font-['Poppins'] text-lg font-semibold text-left">
                  Why Nature matters
                </div>
              </Link>
            </div>

            {/* Video 2 - Purple Lavender Scene */}
            <div className="cursor-pointer flex flex-col gap-2">
              <Link to="/power-of-walking">
                <div className="relative w-full h-full lg:h-[320px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat flex justify-center items-center group">
                  <img
                    src={blog2}
                    alt="Blog2"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="text-[#4B4741] font-['Poppins'] text-lg font-semibold text-left">
                  The Power of Walking in Nature
                </div>
              </Link>
            </div>

            {/* Video 3 - Ocean Sunset Scene */}
            <div className="cursor-pointer flex flex-col gap-2">
              <Link to="/health-and-happiness">
                <div className="relative w-full h-full lg:h-[320px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat flex justify-center items-center group">
                  <img
                    src={blog3}
                    alt="Blog3"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="text-[#4B4741] font-['Poppins'] text-lg font-semibold text-left">
                  Health and Happiness from Nature
                </div>
              </Link>
            </div>

            {/* Video 4 - Winter Forest Scene */}
            <div className="cursor-pointer flex flex-col gap-2">
              <Link to="/nature-benefits">
                <div className="relative w-full h-full lg:h-[320px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat flex justify-center items-center group">
                  <img
                    src={blog4}
                    alt="Blog4"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="text-[#4B4741] font-['Poppins'] text-lg font-semibold text-left">
                  Nature’s Benefits for Body and Mind
                </div>
              </Link>
            </div>
          </div>
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
