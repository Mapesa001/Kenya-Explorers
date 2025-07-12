import { useRef, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const formRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power3.out" },
    });

    tl.from(headingRef.current, { opacity: 0, y: -30 })
      .from(imageRef.current, { x: -100, opacity: 0 }, "-=0.8")
      .from(formRef.current, { x: 100, opacity: 0 }, "-=1");
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 8 && hasLetters && hasNumbers && hasSpecial)
      return "Strong";
    if (password.length >= 8 && hasLetters && hasNumbers) return "Medium";
    return "Weak";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format";
      case "password":
        return value.length >= 8 && /\d/.test(value) && /[a-zA-Z]/.test(value)
          ? ""
          : "Password must be at least 8 characters, include a letter and a number";
      case "phone":
        return /^\d{10,15}$/.test(value)
          ? ""
          : "Phone must be 10-15 digits with no spaces";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordStrength(evaluatePasswordStrength(value));
    }

    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      phone: validateField("phone", formData.phone),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    try {
      const res = await fetch("https://kenya-explorers.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage(data.message);
      setFormData({ fullName: "", phone: "", email: "", password: "" });
      setPasswordStrength("");
    } catch (err) {
      setMessage(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen dark:bg-black mt-16 flex items-center justify-center px-6 md:px-20 py-12 relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1677741446379-8afb81b8e9d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D')] bg-cover bg-center z-0" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-6xl bg-secondary/80 border-x-2 border-primary rounded-xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Image Panel */}
        <div
          ref={imageRef}
          className="hidden md:flex flex-col items-center justify-center p-10 bg-[var(--footer-highlight)] text-black dark:text-gray-900"
        >
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Join Wild Nature
          </h2>
          <p className="text-md mb-4 text-center text-white">
            Become part of our nature community. Enjoy personalized tours,
            exclusive events, and immersive wildlife experiences.
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="p-8 sm:p-10" ref={formRef}>
          <h2
            ref={headingRef}
            className="text-3xl font-extrabold text-primary mb-6"
          >
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <div className="flex items-center border border-secondary rounded-md overflow-hidden dark:border-gray-700">
                <span className="p-3 bg-gray-100 text-secondary dark:bg-gray-800">
                  <FaUser className="text-primary" />
                </span>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center border border-secondary rounded-md overflow-hidden dark:border-gray-700">
                <span className="p-3 bg-gray-100 text-secondary dark:bg-gray-800">
                  <FaPhone className="text-primary" />
                </span>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Phone number"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center border border-secondary rounded-md overflow-hidden dark:border-gray-700">
                <span className="p-3 bg-gray-100 text-secondary dark:bg-gray-800">
                  <FaEnvelope className="text-primary" />
                </span>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center border border-secondary rounded-md overflow-hidden dark:border-gray-700 relative">
                <span className="p-3 bg-gray-100 text-secondary dark:bg-gray-800">
                  <FaLock className="text-primary" />
                </span>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-gray-600 dark:text-gray-300"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
              {formData.password && (
                <div className="mt-1">
                  <div
                    className={`h-2 rounded transition-all ${
                      passwordStrength === "Strong"
                        ? "bg-green-500 w-full"
                        : passwordStrength === "Medium"
                        ? "bg-yellow-500 w-2/3"
                        : "bg-red-500 w-1/3"
                    }`}
                  />
                  <p
                    className={`text-sm mt-1 ${
                      passwordStrength === "Strong"
                        ? "text-green-500"
                        : passwordStrength === "Medium"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {passwordStrength} Password
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-md transition"
            >
              Sign Up
            </button>

            {/* Message */}
            {message && <p className="text-sm text-yellow-300">{message}</p>}

            {/* Login Link */}
            <p className="text-sm text-center text-white dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
