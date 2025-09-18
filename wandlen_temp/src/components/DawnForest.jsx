import React, { useState, useEffect, useRef } from "react";
import OrangeWood from "../assets/orangeWood.jpg";
import MemoryIcon from "../assets/MemoryIcon.svg";
import BrainIcon from "../assets/BrainIcon.svg";
import UserGroupIcon from "../assets/UserGroupIcon.svg";

const DawnForest = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const prevScrollYRef = useRef(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Get position relative to viewport
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      const prevScrollY = prevScrollYRef.current;
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      if (currentScrollY > prevScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection("up");
      }

      prevScrollYRef.current = currentScrollY;

      // Calculate section based on component's position in viewport
      // When component is in view and user scrolls down halfway through it
      if (rect.top <= 0 && rect.bottom > window.innerHeight) {
        // Show second section when component is partially scrolled
        setCurrentSection(1);
      } else {
        setCurrentSection(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // First set of benefits (adapted from original)
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

  // Second set of benefits (adapted from original)
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

  const BenefitItem = ({ benefit, isVisible }) => (
    <div
      className={`flex items-start gap-4 transition-all duration-700 ease-in-out transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : scrollDirection === "up"
          ? "opacity-0 -translate-y-8"
          : "opacity-0 translate-y-8"
      }`}
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

  return (
    <div ref={sectionRef} className="h-[200vh]">
      {" "}
      {/* Taller container to allow scrolling */}
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
          <div>
            <div className="text-primary font-poppins text-[2rem] font-semibold mb-4 pl-14">
              Why Virtual Walking?
            </div>
            <div className="text-secondary font-poppins text-5xl font-semibold mb-8 pl-14 leading-tight">
              Experience nature, <br /> wherever you are.
            </div>
          </div>

          {/* Benefits Container */}
          <div className="flex flex-col gap-8 pl-16 pr-16 mt-12">
            {/* Benefits Section - Animating between them */}
            <div className="space-y-8">
              <div className="w-full h-px bg-border" />
              {(currentSection === 0 ? firstBenefits : secondBenefits).map(
                (benefit, index) => (
                  <React.Fragment key={`benefit-${index}`}>
                    <BenefitItem benefit={benefit} isVisible={true} />
                    <div className="w-full h-px bg-border" />
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DawnForest;

// import React, { useState, useEffect, useRef } from "react";
// import OrangeWood from "../assets/orangeWood.jpg";
// import MemoryIcon from "../assets/MemoryIcon.svg";
// import BrainIcon from "../assets/BrainIcon.svg";
// import UserGroupIcon from "../assets/UserGroupIcon.svg";

// const DawnForest = () => {
//   const [scrollY, setScrollY] = useState(0);
//   const [currentSection, setCurrentSection] = useState(0);
//   const [scrollDirection, setScrollDirection] = useState("down");
//   const [scrollLocked, setScrollLocked] = useState(false); // New state for scroll lock
//   const prevScrollYRef = useRef(0);
//   const componentRef = useRef(null); // Ref for the component's outer div

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!componentRef.current) return;
//       const componentTop = componentRef.current.offsetTop;
//       const newScrollY = window.scrollY - componentTop; // Relative scroll position
//       const prevScrollY = prevScrollYRef.current;

//       // Determine scroll direction
//       if (newScrollY > prevScrollY) {
//         setScrollDirection("down");
//       } else if (newScrollY < prevScrollY) {
//         setScrollDirection("up");
//       }

//       prevScrollYRef.current = newScrollY;
//       setScrollY(newScrollY);

//       // Calculate which section should be visible based on scroll position
//       const windowHeight = window.innerHeight;
//       const section = Math.floor(
//         Math.max(0, newScrollY) / (windowHeight * 0.1)
//       ); // Ensure non-negative
//       setCurrentSection(Math.min(section, 1));

//       // Lock scroll when in second section
//       setScrollLocked(section >= 1);

//     };

//     const handleWheel = (e) => {
//       if (scrollLocked && e.deltaY > 0) {
//         e.preventDefault(); // Prevent scrolling down when locked
//       }
//     };

//     const handleTouchMove = (e) => {
//       if (scrollLocked) {
//         e.preventDefault(); // Prevent touch scrolling when locked
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("wheel", handleWheel, { passive: false });
//     window.addEventListener("touchmove", handleTouchMove, { passive: false });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("wheel", handleWheel);
//       window.removeEventListener("touchmove", handleTouchMove);
//     };
//   }, []);

//   // First set of benefits (adapted from original)
//   const firstBenefits = [
//     {
//       icon: <img src={MemoryIcon} alt="Memory Icon" className="w-8 h-8" />,
//       title: "Memory Stimulation",
//       description:
//         "Familiar sights and sounds bring back memories, sparking joy and recognition.",
//     },
//     {
//       icon: <img src={BrainIcon} alt="Brain Icon" className="w-8 h-8" />,
//       title: "Mood & Social Boost",
//       description:
//         "Virtual walks spark conversation — enjoy alone or share with family and caregivers.",
//     },
//   ];

//   // Second set of benefits (adapted from original)
//   const secondBenefits = [
//     {
//       icon: (
//         <img src={UserGroupIcon} alt="User Group Icon" className="w-8 h-8" />
//       ),
//       title: "Safe & Accessible",
//       description:
//         "Bring nature indoors for those who can't walk outside, with no risk of falling or getting lost.",
//     },
//     {
//       icon: <img src={MemoryIcon} alt="Memory Icon" className="w-8 h-8" />, // Reused as in original for Stress & Anxiety
//       title: "Stress & Anxiety Relief",
//       description:
//         "Natural images and sounds help calm the mind and ease tension.",
//     },
//   ];

//   const BenefitItem = ({ benefit, isVisible }) => (
//     <div
//       className={`flex items-start gap-4 transition-all duration-700 ease-in-out transform ${
//         isVisible
//           ? "opacity-100 translate-y-0"
//           : scrollDirection === "up"
//           ? "opacity-0 -translate-y-8" // Slide up when scrolling up
//           : "opacity-0 translate-y-8" // Slide down when scrolling down
//       }`}
//     >
//       <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
//       <div className="flex flex-col items-start gap-2">
//         <div className="text-white font-poppins text-2xl font-semibold">
//           {benefit.title}
//         </div>
//         <div className="text-muted font-poppins leading-relaxed">
//           {benefit.description}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div ref={componentRef} className="min-h-screen">
//       {" "}
//       {/* Changed to min-h-screen for component height */}
//       <div className="sticky top-0 flex w-full h-screen bg-accent">
//         {/* Left side - Image */}
//         <div className="w-1/2 h-full">
//           <img
//             src={OrangeWood}
//             className="w-full h-full object-cover"
//             alt="Virtual Walking"
//           />
//         </div>

//         {/* Right side - Content */}
//         <div className="w-1/2 h-full flex flex-col justify-center p-8">
//           {/* Header */}
//           <div>
//             <div className="text-primary font-poppins text-[2rem] font-semibold mb-4 pl-14">
//               Why Virtual Walking?
//             </div>
//             <div className="text-secondary font-poppins text-5xl font-semibold mb-8 pl-14 leading-tight">
//               Experience nature, <br /> wherever you are.
//             </div>
//           </div>

//           {/* Benefits Container */}
//           <div className="flex flex-col gap-8 pl-16 pr-16 mt-12">
//             {/* First Section Benefits */}
//             <div
//               className={`space-y-8 ${
//                 currentSection === 0 ? "block" : "hidden"
//               }`}
//             >
//               <div className="w-full h-px bg-border" />
//               {firstBenefits.map((benefit, index) => (
//                 <React.Fragment key={`first-${index}`}>
//                   <BenefitItem
//                     benefit={benefit}
//                     isVisible={currentSection === 0}
//                   />
//                   <div className="w-full h-px bg-border" />
//                 </React.Fragment>
//               ))}
//             </div>

//             {/* Second Section Benefits */}
//             <div
//               className={`space-y-8 ${
//                 currentSection === 1 ? "block" : "hidden"
//               }`}
//             >
//               <div className="w-full h-px bg-border" />
//               {secondBenefits.map((benefit, index) => (
//                 <React.Fragment key={`second-${index}`}>
//                   <BenefitItem
//                     benefit={benefit}
//                     isVisible={currentSection === 1}
//                   />
//                   <div className="w-full h-px bg-border" />
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DawnForest;
