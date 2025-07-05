import { useEffect, useState, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Homepage() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

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

  // GSAP animations
  useGSAP(() => {
    gsap.from(heroRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="relative min-h-screen mt-14 bg-white dark:bg-black text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: `url('/images/skybg.png')`,
        }}
      >
        <div className="absolute inset-0 z-0">
            <img
                src="/images/ground.png"
                alt="Hero Background"
                className="w-full mt-100 size-[240px] absolute object-cover"
            />
            <img
                src="/images/sun.png"
                alt="Hero Background"
                className="w-full size-[200px] mt-30 right-[250px] absolute object-contain"
            />
            <img
                src="/images/mti2.png"
                alt="Hero Background"
                className="w-full size-[400px] mt-20 right-[450px] absolute object-contain"
            />
            <img
                src="/images/mti2.png"
                alt="Hero Background"
                className="w-full size-[280px] mt-50 right-[550px] absolute object-contain"
            />
            <img
                src="/images/giraffe.png"
                alt="Hero Background"
                className="w-full size-[280px] mt-50 right-[150px] absolute object-contain"
            />
        </div>

        <div className="text-center w-1/2 z-10 px-6 ml-64 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Wild Nature Adventures
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Discover the untamed beauty of Africa — from sun-drenched savannahs to majestic wildlife.
          </p>
          <a
            href="#explore"
            className="inline-block bg-[var(--footer-highlight)] text-black font-semibold py-3 px-6 rounded-md hover:bg-yellow-500 transition"
          >
            Explore Now
          </a>
        </div>
      </section>

      {/* Content Section */}
      <section id="explore" ref={contentRef} className="py-20 px-6 md:px-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We offer curated wildlife tours across Africa, led by expert guides, with comfort and authenticity in mind.
              Whether you’re after thrilling safaris, quiet nature walks, or cultural encounters — we’ve got you covered.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Experienced local guides</li>
              <li>Eco-friendly accommodations</li>
              <li>Flexible travel packages</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
          <img
            src="/images/safari-jeep.jpg"
            alt="Safari Jeep"
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

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
