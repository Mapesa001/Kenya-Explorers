import { useRef } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

export default function Login() {
  const formRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 1.2, ease: "power3.out" } });

    tl.from(headingRef.current, { opacity: 0, y: -30 })
      .from(imageRef.current, { x: -100, opacity: 0 }, "-=0.8")
      .from(formRef.current, { x: 100, opacity: 0 }, "-=1");
  }, []);

  return (
    <div className="min-h-screen dark:bg-black mt-16 flex items-center justify-center px-6 md:px-20 py-12 relative">
      {/* Optional Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601071733462-d0bbb6ee7a02?q=80&w=360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center z-0"></div>

      {/* Wrapper */}
      <div className="relative z-10 w-full max-w-6xl bg-secondary/80 border-x-2 border-primary rounded-xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Image Panel */}
        <div ref={imageRef} className="hidden md:flex flex-col items-center justify-center p-10 bg-[var(--footer-highlight)] text-black dark:text-gray-900">
          <h2 className="text-3xl font-bold mb-4 text-primary">Explore Wild Nature</h2>
          <p className="text-md mb-4 text-center text-white">
            Become part of our nature community. Enjoy personalized tours, exclusive events, and immersive wildlife experiences.
          </p>
          {/* <img src="/images/giraffe-side.png" alt="Giraffe" className="w-64 mt-4" /> */}
        </div>

        {/* Sign Up Form */}
        <div className="p-8 sm:p-10" ref={formRef}>
          <h2 ref={headingRef} className="text-3xl font-extrabold text-primary mb-6">
            Log Into The Next Adventure
          </h2>

          <form className="space-y-5">
            {/* Name */}
            <div className="flex items-center border border-secondary rounded-md overflow-hidden dark:border-gray-700">
              <span className="p-3 bg-gray-100 text-secondary dark:bg-gray-800">
                <FaUser className="text-secondary" />
              </span>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border border-secondary rounded-md overflow-hidden dark:border-gray-700">
              <span className="p-3 bg-gray-100 text-secondary dark:bg-gray-800">
                <FaLock className="text-secondary" />
              </span>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-md transition"
            >
              Log In
            </button>

            {/* Already have account */}
            <p className="text-sm text-center text-white dark:text-gray-400">
              Dont have an account?{" "}
              <Link to={"/signup" } className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
