import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded-lg shadow-lg border border-gray-500 py-2">
          <p className="block px-4 py-2 text-gray-700  hover:bg-gray-200 transition-colors cursor-pointer">
              <Link to={"/dashboard"}>Dashboard</Link>
          </p>
          <p className="block px-4 py-2 text-gray-700  hover:bg-gray-200 transition-colors cursor-pointer">
              <Link to={"/login"}>Login</Link>
          </p>
          <p className="block px-4 py-2 text-gray-700  hover:bg-gray-200 transition-colors cursor-pointer">
              <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;