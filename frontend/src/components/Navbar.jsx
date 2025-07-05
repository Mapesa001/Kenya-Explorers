import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        
        {/* Logo Section */}
        <div className="text-xl font-bold text-primary">
          <a href="#">MyBrand</a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Links and Search Section */}
        <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 md:static absolute left-0 top-full w-full md:w-auto bg-white px-4 md:px-0 transition-all duration-300 ease-in-out ${isOpen ? "flex" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 mt-4 md:mt-0">
            <li><Link to={'/'} className="hover:text-primary">Home</Link></li>
            <li><Link to={'#'} className="hover:text-primary">About</Link></li>
            <li><Link to={'#'} className="hover:text-primary">Products</Link></li>
            <li><Link to={'#'} className="hover:text-primary">Contact</Link></li>
          </ul>

          {/* Search bar */}
          <div className="flex items-center border rounded-md mt-3 md:mt-0 px-2 py-1 md:ml-4">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none text-sm px-2 w-full"
            />
            <FaSearch className="text-gray-500" />
          </div>
        </div>

        {/* Login / Register Section */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center gap-2 text-sm hover:text-primary">
            <FaUserCircle size={20} />
            <span>Login</span>
          </button>
          <button className="bg-primary text-white px-4 py-1.5 rounded-md text-sm hover:bg-primary-dark">
            Sign Up
          </button>
        </div>
      </div>

      {/* Mobile Login/Register Section */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <button className="flex items-center gap-2 text-sm hover:text-primary w-full mb-2">
            <FaUserCircle size={20} />
            <span>Login</span>
          </button>
          <button className="bg-primary text-white px-4 py-2 w-full rounded-md text-sm hover:bg-primary-dark">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
