import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const TopNav = () => {
  return (
    <header className="flex justify-between items-center bg-[#121212] px-8 py-4 shadow-md">
      {/* Logo */}
      <div className="text-[#A0E081] font-bold text-xl">TPG</div>

      {/* Navigation Links */}
      <nav className="flex space-x-8">
        <a href="#" className="text-white hover:text-[#A0E081] font-medium">Accueil</a>
        <a href="#" className="text-white hover:text-[#A0E081] font-medium">Réunion</a>
        <a href="#" className="text-white hover:text-[#A0E081] font-medium">Offre</a>
        <a href="#" className="text-white hover:text-[#A0E081] font-medium">Sollicitation</a>
      </nav>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <FaBell className="text-white hover:text-[#A0E081] text-lg cursor-pointer" />
        <FaUserCircle className="text-white hover:text-[#A0E081] text-xl cursor-pointer" />
      </div>
    </header>
  );
};

export default TopNav;
