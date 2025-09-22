import React from "react";
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

const Footer = () => (
  <footer className="bg-[#2a341f] text-[#ede4dc] py-12 md:py-16">
    <div className="max-w-6xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <div className="space-y-2 text-base">
            <div className="flex items-baseline gap-4 mb-4">
              <div className="flex items-center justify-center">
                <svg
                  width={30}
                  height={42}
                  viewBox="0 0 65 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-cream"
                >
                  <path
                    d="M14.2586 89.999C22.9212 87.9819 31.8499 87.0855 40.3494 84.4564C51.4417 81.0257 62.7915 73.7764 64.5343 61.45C66.2084 49.5804 62.8344 37.7367 62.9889 25.8672L57.7948 28.1514C43.8522 35.7886 45.1744 41.2192 45.1744 41.2192C45.389 43.3827 47.1576 45.5291 48.9863 47.7616C50.4286 49.5287 53.0815 50.9424 50.4801 53.0456C49.7332 53.649 48.5656 53.8904 48.059 54.3127C47.003 55.2006 48.2222 56.4849 48.454 57.2262C48.8832 58.6313 48.4025 59.5019 47.2091 60.1742C47.956 60.8638 48.3509 61.088 48.1792 62.2172C48.0762 62.9326 47.2348 63.1481 46.8571 63.7773C46.0501 65.122 46.7369 65.9065 46.8743 67.1994C47.6727 74.9401 37.3102 70.8456 33.1463 71.2852L28.7936 70.9577C24.6812 70.9318 19.7189 71.8024 18.2679 76.1296L14.25 89.9903L14.2586 89.999Z"
                    fill="currentColor"
                  />
                  <path
                    d="M25.0662 55.1327C27.908 48.8143 31.0931 42.4701 31.8572 35.5828C32.5784 29.0834 31.0845 22.5409 29.1099 16.3088C27.4272 10.9989 25.3495 5.49085 26.3454 0C22.0528 5.35294 16.8071 9.84388 12.0594 14.7917C7.31176 19.7395 2.95899 25.3596 1.08739 31.9711C-1.67709 41.7115 1.28485 52.1071 4.88211 61.5717C8.29907 70.5536 12.6604 79.8199 12.7892 89.6207C16.3349 77.8805 20.0095 66.3385 25.0576 55.1327H25.0662Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p>Virtueel Wandelen</p>
            </div>
            <p>© 2025 Virtueel Wandelen</p>
            <p className="text-sm opacity-75">
              Terms and Conditions | Privacy Policy
            </p>
          </div>
        </div>

        {/* Menu */}
        <div>
          <h4 className="text-lg md:text-xl font-semibold mb-4">Menu</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-[#a6a643] transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/ourapproach"
                className="hover:text-[#a6a643] transition-colors"
              >
                Our Vision
              </a>
            </li>
            <li>
              <a
                href="/subscribe"
                className="hover:text-[#a6a643] transition-colors"
              >
                Subscriptions
              </a>
            </li>
            <li>
              <a
                href="/become-volunteer"
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
          <h4 className="text-lg md:text-xl font-semibold mb-4">Follow Us</h4>
          <ul className="space-y-2 text-sm mt-4">
            <li>
              <a href="#" className="hover:text-[#a6a643] transition-colors">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#a6a643] transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#a6a643] transition-colors">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
