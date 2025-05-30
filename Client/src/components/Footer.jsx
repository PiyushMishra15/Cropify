import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Heart,
  Leaf,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold tracking-tight">Cropify</span>
            </div>
            <p className="text-gray-300 mt-2 max-w-xs">
              Empowering farmers with technology to increase yield and
              sustainability.
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <span className="bg-green-700 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                Made By Piyush
              </span>
              <span className="flex items-center text-sm">
                <span className="text-orange-400 mr-1">made in</span>
                <span className="text-white">India</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Products", "Blog"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-green-500 rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  123 Agriculture Valley, Tech Park, Bangalore, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">contact@cropify.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full py-2 px-3 bg-green-950 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media */}
        <div className="py-6 border-t border-green-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300 text-sm">
                &copy; {currentYear} Cropify. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-gray-400 hover:text-white transition-transform duration-300 hover:-translate-y-1"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Made with love bar */}
        <div className="py-3 bg-green-950 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mt-4 text-center text-xs text-gray-400">
          <p className="flex items-center justify-center">
            Crafted with{" "}
            <Heart className="h-3 w-3 text-red-500 mx-1 animate-pulse" /> and
            sustainable code
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
