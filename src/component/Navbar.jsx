import React, { useState, useEffect } from "react";
import reactLogo from "../assets/logo.gif";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-transparent backdrop-blur-md" : ""
      }`}
    >
      <div className="flex items-center flex-wrap px-4 md:px-8 pt-4">
        {/* Logo */}
        <div
          className={`${
            scrolled ? "w-16 h-16" : "w-28 h-28"
          } bg-white rounded-full border-4 border-[#255F38] overflow-hidden flex items-center justify-center z-10 shadow-lg transition-all duration-300`}
        >
          <img
            src={reactLogo}
            alt="Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Navbar container */}
        <nav
          className={`flex-1 ${
            scrolled ? "h-16" : "h-20"
          } bg-[#3D8D7A] bg-opacity-0 flex items-center justify-between px-6 md:px-12 shadow-md ml-[-2rem] relative w-full md:w-auto transition-all duration-300 rounded-l-xl rounded-r-xl`}
          style={{
            backgroundColor: scrolled ? "rgba(61, 141, 122, 0)" : undefined,
            boxShadow: scrolled
              ? "0 2px 8px rgba(0,0,0,0.1)"
              : "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-white">
            <a href="#home" className="hover:text-[#1DCD9F]">Home</a>
            <a href="#aboutUs" className="hover:text-[#1DCD9F]">About Us</a>
            <a href="#loanplan" className="hover:text-[#1DCD9F]">Loan Plan</a>
            <a href="#staff" className="hover:text-[#1DCD9F]">Our Staff</a>
            <a href="#contact" className="hover:text-[#1DCD9F]">Contact Us</a>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden ml-5">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <a
              href="/home/login"
              className="bg-[#1DCD9F] text-green-700 font-semibold px-4 py-2 rounded-md border-2 border-green-500 hover:bg-green-500 hover:text-white transition"
            >
              Login
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden w-full bg-[#3D8D7A] text-white px-6 pb-4">
          <div className="flex flex-col space-y-4">
            
            <a href="#home"onClick={() => setIsOpen(false)} className="hover:text-[#1DCD9F]"> Home</a> 
            
            <a href="#about"onClick={() => setIsOpen(false)} className="hover:text-[#1DCD9F]" >About Us</a>

            <a href="#staff" onClick={() => setIsOpen(false)}className="hover:text-[#1DCD9F]">Our Staff </a>

            <a href="#staff" onClick={() => setIsOpen(false)}className="hover:text-[#1DCD9F]">Loan Plan</a>
            
            <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-[#1DCD9F]">Contact Us</a>
            
            <a href="/home/login"onClick={() => setIsOpen(false)} 
              className="bg-[#1DCD9F] text-green-700 font-semibold px-4 py-2 rounded-md border-2 border-green-500 hover:bg-green-500 hover:text-white transition text-center">
              Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
