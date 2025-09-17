import React, { useState } from "react";
import InspiredImage from "../../assets/InspiredImage.png";

const NewsletterSection = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="bg-[#ede4dc] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[#381207] text-2xl font-medium mb-8">
                Stay Inspired
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="block text-[#381207] font-medium mb-2">
                    Email address
                  </div>
                  <div className="w-full p-3 rounded-lg border border-[#cbcbcb] bg-white cursor-text">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full outline-none text-[#8d8d8d]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="block text-[#381207] font-medium mb-2">
                      First name
                    </div>
                    <div className="w-full p-3 rounded-lg border border-[#cbcbcb] bg-white cursor-text">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className="w-full outline-none text-[#8d8d8d]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="block text-[#381207] font-medium mb-2">
                      Last name
                    </div>
                    <div className="w-full p-3 rounded-lg border border-[#cbcbcb] bg-white cursor-text">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className="w-full outline-none text-[#8d8d8d]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="block text-[#381207] font-medium mb-2">
                    Notes
                  </div>
                  <div className="w-full p-3 rounded-lg border border-[#cbcbcb] bg-white cursor-text">
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="E.g. Add special billing instructions"
                      rows="4"
                      className="w-full outline-none text-[#8d8d8d] resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-[#5b6502] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#4a5302] transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <div className="rounded-xl h-64 lg:h-full flex items-center justify-center">
              <img className="rounded-xl" src={InspiredImage} alt="Inspired" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
