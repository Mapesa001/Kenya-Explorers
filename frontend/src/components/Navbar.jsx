import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const scrollStop = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const menuElement = scrollStop.current;

    if (isOpen && menuElement) {
      disableBodyScroll(menuElement);
    } else if (menuElement) {
      enableBodyScroll(menuElement);
    }

    // Clean up scroll locks when component unmounts
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isOpen]);

  // // Close the menu when clicking outside
  // const handleClickOutside = (event) => {
  //   if (scrollStop.current && !scrollStop.current.contains(event.target)) {
  //     setIsOpen(false);
  //   }
  // };
  // // Add event listener for clicks outside the menu
  // React.useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <nav
      ref={scrollStop}
      className="w-full backdrop-blur-sm bg-neutral-100/70 shadow-md fixed top-0 left-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo Section */}
        <div className="text-xl font-bold text-primary-500">
          <Link to={"/"}>Kenya Explorers🦒</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Links and Search Section */}
        <div
          className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 md:static absolute left-0 top-full w-full md:w-auto px-4 md:px-0 transition-all duration-300 ease-in-out ${
            isOpen ? "flex bg-neutral-100 pb-4 rounded-b-2xl" : "hidden bg-transparent"
          }`}
        >
          <ul className="flex flex-col text-secondary md:flex-row md:space-x-6 space-y-2 md:space-y-0 mt-4 md:mt-0">
            <li>
              <Link
                to={"/"}
                className={`hover:text-primary ${
                  isActive("/") ? "text-primary-500" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className={`hover:text-primary ${
                  isActive("/about") ? "text-primary-500" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to={"/services"}
                className={`hover:text-primary ${
                  isActive("/services") ? "text-primary-500" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to={"/admindashboard"}
                className={`hover:text-primary ${
                  isActive("/admindashboard") ? "text-primary-500" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                AdminDashboard
              </Link>
            </li>
            <li>
              <Link
                to={"/attractions"}
                className={`hover:text-primary ${
                  isActive("/attractions") ? "text-primary-500" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                Attractions
              </Link>
            </li>
            <li>
              <Link
                to={"/contact"}
                className={`hover:text-primary ${
                  isActive("/contact") ? "text-primary-500" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Search bar */}
          <div className={`flex items-center border border-secondary rounded-md mt-3 md:mt-0 px-2 py-1 md:ml-4 ${isOpen ? '' : ''}`}>
            <input
              type="text"
              placeholder="Search..."
              className="outline-none text-sm px-2 w-full text-secondary bg-transparent placeholder-secondary"
            />
            <FaSearch className="text-primary" />
          </div>
        </div>

        {/* Login / Register Section */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center cursor-pointer gap-2 text-secondary text-sm hover:text-primary">
            <FaUserCircle size={20} className="text-secondary" />
            <Link
              to={"/login"}
              className={isActive("/login") ? "text-primary-500" : ""}
            >
              Login
            </Link>
          </button>
          <button className="bg-primary cursor-pointer text-white px-4 py-1.5 rounded-md text-sm hover:bg-secondary-900-brand">
            <Link to={"/signup"}>Sign Up</Link>
          </button>
        </div>
      </div>

      {/* Mobile Login/Register Section */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <button className="flex items-center gap-2 text-sm hover:text-primary w-full mb-2">
            <FaUserCircle size={20} />
            <Link
              to={"/login"}
              className={isActive("/login") ? "text-primary-500" : ""}
              onClick={() => setIsOpen(!isOpen)}
            >
              Login
            </Link>
          </button>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-500/50">
            <Link to={"/signup"} onClick={() => setIsOpen(!isOpen)}>
              Sign Up
            </Link>
          </button>
        </div>
      )}
    </nav>
  );
}
