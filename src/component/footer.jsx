import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaRegEnvelope } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#0B0F0E] text-[#A0FFE5] border-t border-[#1DCD9F] pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DCD9F] to-[#A0FFE5]">
              COLFTrack
            </h3>
            <p className="text-[#A0FFE5]/80">
              Empowering financial decisions with intelligent, real-time loan management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#1DCD9F] transition-colors"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#1DCD9F] transition-colors"><FaLinkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#1DCD9F] transition-colors"><FaGithub className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#1DCD9F] transition-colors"><FaRegEnvelope className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#1DCD9F]">Product</h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "API", "Integrations"].map(item => (
                <li key={item}>
                  <a href="#" className="flex items-center hover:text-[#A0FFE5] transition-colors group">
                    {item} <FiArrowUpRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#1DCD9F]">Resources</h4>
            <ul className="space-y-3">
              {["Documentation", "Guides", "Blog", "Support"].map(item => (
                <li key={item}>
                  <a href="#" className="flex items-center hover:text-[#A0FFE5] transition-colors group">
                    {item} <FiArrowUpRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#1DCD9F]">Contact</h4>
            <ul className="space-y-3 text-[#A0FFE5]/80">
              <li className="flex items-start">
                <span>Email:</span>
                <a href="mailto:hello@colflanka.com" className="ml-2 hover:text-[#1DCD9F] transition-colors">hello@colflanka.com</a>
              </li>
              <li className="flex items-start">
                <span>Phone:</span>
                <a href="tel:+94712345678" className="ml-2 hover:text-[#1DCD9F] transition-colors">+94 71 234 5678</a>
              </li>
              <li>
                25A Lake Road<br />
                Colombo, Sri Lanka
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#1DCD9F]/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#A0FFE5]/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} COLFTrack by COLF Lanka. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-[#1DCD9F] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1DCD9F] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#1DCD9F] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
