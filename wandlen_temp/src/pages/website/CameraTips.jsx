import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Camera,
} from "lucide-react";
import NewsletterSection from "../../components/common/NewsletterSection";
import Testimonial from "../../components/common/TestimonialScroll";
import FaqQuestions from "../../components/common/FaqQuestions";

const CameraTips = () => {
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (email) {
      console.log("Email submitted:", email);
      alert("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      {/* Hero Section */}
      <section className="bg-[#2a341f] text-white px-4 py-16 flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center mt-20 mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#a6a643] mb-6 font-['Poppins']">
            Become a Volunteer with Virtual Walking
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-4xl mx-auto leading-relaxed">
            For many - from seniors in care to those with limited mobility -
            nature can feel far away. Virtual Walking brings Overijssel's beauty
            indoors with calming walking videos that inspire relaxation and
            connection. And we can't do it without you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-col mx-auto">
        <div className="max-w-7xl mx-auto p-16 w-full">
          <div className="flex flex-col items-start gap-2 mb-5 px-2">
            <h2 className="text-[#a6a643] text-3xl font-semibold leading-tight">
              Video Training
            </h2>
            <h3 className="text-[#381207] text-5xl font-semibold leading-tight">
              Sep 19, 2025 | Lemelerveld
            </h3>
          </div>
          {/* Event Details Grid */}
          <div className="grid lg:grid-cols-3 gap-6 pt-5 pb-5 bg-[#f7f6f4] rounded-2xl px-4 md:px-6">
            {/* Content Section */}
            <div className="lg:col-span-2 rounded-2xl p-6 md:p-8">
              <div className="mb-6 md:mb-8">
                <h3 className="text-[#dd9219] text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
                  What to Expect?
                </h3>
                <div className="text-[#381207] text-base md:text-lg space-y-3">
                  <p>
                    • Practical camera workshop: learn how to make stable, calm,
                    and atmospheric recordings
                  </p>
                  <p>• Tips on sound, lighting, and movement</p>
                  <p>• Practice together with the camera</p>
                  <p>• Ask questions to the video coach</p>
                  <p>• Lunch and a walk with other volunteers</p>
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <h3 className="text-[#dd9219] text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
                  Why Join?
                </h3>
                <p className="text-[#381207] text-base md:text-lg leading-relaxed">
                  Whether you're just starting out or already have filming
                  experience, this day will help you create beautiful walking
                  videos for older adults (with dementia). It's also a great way
                  to meet other volunteers and share experiences.
                </p>
              </div>
              <button
                onClick={() => (window.location.href = "/volunteer-signup")}
                className="bg-[#a6a643] text-white px-6 md:px-8 py-3 rounded-lg text-lg md:text-xl font-medium hover:bg-[#8d8f37] transition-colors duration-300"
              >
                Sign up now for the meeting
              </button>
            </div>

            {/* Practical Information Sidebar */}
            <div className="bg-[#381207] rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-[#dd9219] text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8">
                Practical Information
              </h3>

              <div className="space-y-6 md:space-y-8">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#ede4dc] w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#ede4dc] text-lg md:text-xl font-semibold mb-1">
                      Location
                    </h4>
                    <p className="text-[#ede4dc] text-base md:text-lg">
                      Dominee C. Keersstraat 79
                      <br />
                      8151 AB Lemelerveld
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-4">
                  <Clock className="text-[#ede4dc] w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#ede4dc] text-lg md:text-xl font-semibold mb-1">
                      Time
                    </h4>
                    <p className="text-[#ede4dc] text-base md:text-lg">
                      10:00 AM to 2:30 PM
                    </p>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="flex items-start gap-4">
                  <Users className="text-[#ede4dc] w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#ede4dc] text-lg md:text-xl font-semibold mb-1">
                      For whom?
                    </h4>
                    <p className="text-[#ede4dc] text-base md:text-lg">
                      Volunteers who create videos for Virtual Walking (or want
                      to get started)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FaqQuestions />
        <Testimonial />
        <NewsletterSection />
      </div>

      {/* Footer */}
      <footer className="bg-[#2a341f] text-[#ede4dc] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="w-20 h-14 bg-[#ede4dc] rounded mb-6 flex items-center justify-center">
                <span className="text-[#2a341f] font-bold text-sm">VW</span>
              </div>
              <div className="space-y-2 text-sm">
                <p>Virtueel Wandelen</p>
                <p>© 2025 Virtueel Wandelen</p>
                <p className="text-xs opacity-75">
                  Terms and Conditions | Privacy Policy
                </p>
              </div>
            </div>

            {/* Menu */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#a6a643] transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#a6a643] transition-colors"
                  >
                    Our Vision
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#a6a643] transition-colors"
                  >
                    Subscriptions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#a6a643] transition-colors"
                  >
                    Volunteer
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-4">Contact</h4>
              <div className="text-sm space-y-2">
                <p>
                  Dominee C. Keersstraat 79
                  <br />
                  8151 AB Lemelerveld
                </p>
                <p>Tel: 06-43754290</p>
                <p>Email: info@virtueelwandelen.nl</p>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#a6a643] transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-[#a6a643] transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-[#a6a643] transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
              <ul className="space-y-2 text-sm mt-4">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#a6a643] transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#a6a643] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#a6a643] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CameraTips;
