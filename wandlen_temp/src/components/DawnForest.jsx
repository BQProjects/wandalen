import React, { useState, useEffect, useRef } from "react";
import OrangeWood from "../assets/orangeWood.jpg";
import MemoryIcon from "../assets/MemoryIcon.svg";
import BrainIcon from "../assets/BrainIcon.svg";
import UserGroupIcon from "../assets/UserGroupIcon.svg";

const DawnForest = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate overall progress through the component
      const scrolled = -rect.top;
      const maxScroll = containerHeight - windowHeight;
      const totalProgress = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Determine which section we're in (0 or 1)
      const newSection = totalProgress < 0.5 ? 0 : 1;
      setCurrentSection(newSection);

      // Calculate progress within the current section (0 to 1)
      const sectionProg =
        newSection === 0
          ? Math.min(1, totalProgress * 2) // First half maps to 0-1
          : Math.min(1, (totalProgress - 0.5) * 2); // Second half maps to 0-1

      setSectionProgress(sectionProg);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // First set of benefits
  const firstBenefits = [
    {
      icon: <img src={MemoryIcon} alt="Memory Icon" className="w-8 h-8" />,
      title: "Memory Stimulation",
      description:
        "Familiar sights and sounds bring back memories, sparking joy and recognition.",
    },
    {
      icon: <img src={BrainIcon} alt="Brain Icon" className="w-8 h-8" />,
      title: "Mood & Social Boost",
      description:
        "Virtual walks spark conversation — enjoy alone or share with family and caregivers.",
    },
  ];

  // Second set of benefits
  const secondBenefits = [
    {
      icon: (
        <img src={UserGroupIcon} alt="User Group Icon" className="w-8 h-8" />
      ),
      title: "Safe & Accessible",
      description:
        "Bring nature indoors for those who can't walk outside, with no risk of falling or getting lost.",
    },
    {
      icon: <img src={MemoryIcon} alt="Memory Icon" className="w-8 h-8" />,
      title: "Stress & Anxiety Relief",
      description:
        "Natural images and sounds help calm the mind and ease tension.",
    },
  ];

  const BenefitItem = ({
    benefit,
    index,
    isCurrentSection,
    sectionProgress,
  }) => {
    // Stagger the animation of benefits within each section
    const delay = index * 0.3;
    const adjustedProgress = Math.max(0, sectionProgress - delay);

    const opacity = isCurrentSection ? Math.min(1, adjustedProgress * 2) : 0;

    const translateY = isCurrentSection
      ? Math.max(0, (1 - adjustedProgress * 2) * 30)
      : 30;

    return (
      <div
        className="flex items-start gap-4 transition-all duration-500 ease-out"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
        <div className="flex flex-col items-start gap-2">
          <div className="text-white font-poppins text-2xl font-semibold">
            {benefit.title}
          </div>
          <div className="text-muted font-poppins leading-relaxed">
            {benefit.description}
          </div>
        </div>
      </div>
    );
  };

  const currentBenefits = currentSection === 0 ? firstBenefits : secondBenefits;

  return (
    <div ref={containerRef} className="h-[200vh]">
      {/* Double height for two sections */}
      <div className="sticky top-0 flex w-full h-screen bg-accent">
        {/* Left side - Image */}
        <div className="w-1/2 h-full">
          <img
            src={OrangeWood}
            className="w-full h-full object-cover"
            alt="Virtual Walking"
          />
        </div>

        {/* Right side - Content */}
        <div className="w-1/2 h-full flex flex-col justify-center p-8">
          {/* Header */}
          <div
            style={{
              opacity: Math.min(1, sectionProgress * 3),
              transform: `translateY(${Math.max(
                0,
                (1 - sectionProgress * 3) * 20
              )}px)`,
            }}
            className="transition-all duration-500 ease-out"
          >
            <div className="text-primary font-poppins text-[2rem] font-semibold mb-4 pl-14">
              Why Virtual Walking?
            </div>
            <div className="text-secondary font-poppins text-5xl font-semibold mb-8 pl-14 leading-tight">
              Experience nature, <br /> wherever you are.
            </div>
          </div>

          {/* Benefits Container */}
          <div className="flex flex-col gap-8 pl-16 pr-16 mt-12">
            <div className="space-y-8 relative min-h-[300px]">
              {/* Top border */}
              <div
                className="w-full h-px bg-border transition-opacity duration-500"
                style={{ opacity: sectionProgress > 0.2 ? 1 : 0 }}
              />

              {/* Current Benefits */}
              {currentBenefits.map((benefit, index) => (
                <React.Fragment key={`${currentSection}-${index}`}>
                  <BenefitItem
                    benefit={benefit}
                    index={index}
                    isCurrentSection={true}
                    sectionProgress={sectionProgress}
                  />
                  <div
                    className="w-full h-px bg-border transition-opacity duration-500"
                    style={{
                      opacity:
                        sectionProgress > 0.2 + index * 0.3 + 0.2 ? 1 : 0,
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Section indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {[0, 1].map((section) => (
              <div
                key={section}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSection === section ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DawnForest;
