// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import useEmailAuth from "../hooks/sendEmailAuth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Check for token on mount
    setIsLoggedIn(!!localStorage.getItem("token"));

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    useEmailAuth.handleLogout?.(); // optional chaining to avoid errors if not defined
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header
      className={`fixed  top-0 bg-white/90 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center h-full">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-700">
              Cropify
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 h-full">
          <Link
            to="/shop"
            className="text-gray-700 hover:text-green-600 transition-colors flex items-center h-full"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-green-600 transition-colors flex items-center h-full"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-green-600 transition-colors flex items-center h-full"
          >
            Contact
          </Link>
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4 h-full">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-100 h-10"
              aria-label="Logout"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors p-2 rounded-full hover:bg-gray-100 h-10"
              aria-label="Login"
            >
              <User size={20} />
              <span className="text-sm font-medium">Login</span>
            </button>
          )}

          <button
            onClick={() => navigate("/cart")}
            className="flex items-center space-x-1 bg-green-500 text-white px-3 py-2 rounded-full hover:bg-green-600 transition-colors relative group h-10"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            <span className="text-sm font-medium">Cart</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
              0
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white absolute w-full transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100 shadow-lg"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <Link
            to="/shop"
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                aria-label="Logout"
              >
                <LogOut size={20} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                aria-label="Login"
              >
                <User size={20} />
                <span className="text-sm font-medium">Login</span>
              </button>
            )}

            <button
              onClick={() => {
                navigate("/cart");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 bg-green-500 text-white px-3 py-2 rounded-full hover:bg-green-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              <span className="text-sm font-medium">Cart (0)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
