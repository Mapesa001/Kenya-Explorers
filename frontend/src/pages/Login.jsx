import { useRef, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useNavigate } from "react-router-dom";

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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format.";
      case "password":
        return value.length >= 6 ? "" : "Password must be at least 6 characters.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Save token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setMessage(data.message);

      // Redirect based on role
      switch (data.user.role) {
        case 'admin':
          navigate('/');
          break;
        case 'user':
          navigate('/');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen dark:bg-black mt-16 flex items-center justify-center px-6 md:px-20 py-12 relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601071733462-d0bbb6ee7a02?q=80&w=360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center z-0" />

      <div className="relative z-10 w-full max-w-6xl bg-secondary/80 border-x-2 border-primary rounded-xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div
          ref={imageRef}
          className="hidden md:flex flex-col items-center justify-center p-10 bg-[var(--footer-highlight)] text-black dark:text-gray-900"
        >
          <h2 className="text-3xl font-bold mb-4 text-primary">Explore Wild Nature</h2>
          <p className="text-md mb-4 text-center text-white">
            Become part of our nature community. Enjoy personalized tours, exclusive events,
            and immersive wildlife experiences.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-8 sm:p-10" ref={formRef}>
          <h2 ref={headingRef} className="text-3xl font-extrabold text-primary mb-6">
            Log Into The Next Adventure
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-md transition"
            >
              Log In
            </button>

            {/* Message */}
            {message && <p className="text-sm text-yellow-300 mt-2">{message}</p>}

            {/* Signup Link */}
            <p className="text-sm text-center text-white dark:text-gray-400">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
