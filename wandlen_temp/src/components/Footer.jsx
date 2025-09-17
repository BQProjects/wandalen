import React from 'react';
import Logo from "../assets/logo.svg";

const Footer = () => (
  <div className="w-full bg-[#2a341f] py-20 px-12">
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24 max-w-8xl w-full text-center">
        {/* Logo and Company Info Column */}
        <div className="flex flex-col gap-12 justify-between h-full items-center">
          <div className="flex items-center gap-4 justify-center -my-6.5">
            <img
              src={Logo}
              className="w-20 h-20"
              alt="Logo"
            />
            <span className="text-[#ede4dc] font-['Poppins'] text-xl font-medium">
              Virtueel Wandelen
            </span>
          </div>

          <div className="flex flex-col gap-3 mt-auto items-center">
            <div className="text-[#ede4dc] font-['Poppins'] text-sm">
              © 2025 Virtueel Wandelen
            </div>
            <div className="text-[#ede4dc] font-['Poppins'] text-sm">
              Terms and Conditions | Privacy Policy
            </div>
          </div>
        </div>

        {/* Menu Column */}
        <div className="flex flex-col gap-12 items-center">
          <h3 className="text-[#ede4dc] font-['Poppins'] text-2xl font-semibold">
            Menu
          </h3>
          <div className="flex flex-col gap-6 text-left ml-13">
            <a href="#" className="text-[#ede4dc] font-['Poppins'] text-lg hover:text-[#a6a643] transition-colors">
              Home
            </a>
            <a href="#" className="text-[#ede4dc] font-['Poppins'] text-lg hover:text-[#a6a643] transition-colors">
              Our Vision
            </a>
            <a href="#" className="text-[#ede4dc] font-['Poppins'] text-lg hover:text-[#a6a643] transition-colors">
              Subscriptions
            </a>
          </div>
        </div>

        {/* Contact Info Column */}
        <div className="flex flex-col gap-12 items-center">
          <h3 className="text-[#ede4dc] font-['Poppins'] text-2xl font-semibold mr-6">
            Contact ons
          </h3>
          <div className="flex flex-col gap-6 text-left ml-13">
            <div className="text-[#ede4dc] font-['Poppins'] text-lg">
              Tel: 06-43754290
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#ede4dc] font-['Poppins'] text-lg">Email:</span>
              <span className="text-[#ede4dc] font-['Poppins'] text-lg">info@virtueelwandelen.nl</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#ede4dc] font-['Poppins'] text-lg">Dominee C. Keersstraat 79</span>
              <span className="text-[#ede4dc] font-['Poppins'] text-lg">8151 AB Lemelerveld</span>
            </div>
          </div>
        </div>

        {/* Socials Column */}
        <div className="flex flex-col gap-12 items-center">
          <h3 className="text-[#ede4dc] font-['Poppins'] text-2xl font-semibold">
            Socials
          </h3>
          <div className="flex flex-col gap-6 text-left ml-2">
            <a href="#" className="text-[#ede4dc] font-['Poppins'] text-lg hover:text-[#a6a643] transition-colors">
              Facebook
            </a>
            <a href="#" className="text-[#ede4dc] font-['Poppins'] text-lg hover:text-[#a6a643] transition-colors">
              Instagram
            </a>
            <a href="#" className="text-[#ede4dc] font-['Poppins'] text-lg hover:text-[#a6a643] transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
