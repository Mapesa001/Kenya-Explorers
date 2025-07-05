import { FaFacebookF, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text py-10 px-4 md:px-20 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold text-footer-highlight mb-3">Wild Nature</h2>
          <p>
            Explore the heart of Africa. Discover wildlife, natural beauty, and adventure like never before.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-md font-semibold mb-3 text-footer-highlight">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Services</a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-md font-semibold mb-3 text-footer-highlight">Contact Us</h3>
          <p>Email: explore@wildnature.com</p>
          <p>Phone: +254 712 345 678</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaGlobe /></a>
          </div>
        </div>
      </div>

      {/* Divider and Copy */}
      <div className="border-t border-gray-600 mt-10 pt-4 text-center text-xs">
        &copy; {new Date().getFullYear()} Wild Nature. All rights reserved.
      </div>
    </footer>
  );
}
