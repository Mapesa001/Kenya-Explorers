import { useEffect, useState} from "react";
import { FaArrowUp } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import WhyChooseUs from "../components/WhyChooseUs";


export default function Homepage() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Back to top button logic
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <div className="relative min-h-screen mt-14 bg-white dark:bg-black text-gray-800 dark:text-gray-100 overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Content Section */}
      <WhyChooseUs />

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-[var(--footer-highlight)] text-white shadow-md hover:bg-yellow-500 z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
