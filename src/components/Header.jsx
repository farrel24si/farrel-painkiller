import React, { useState } from "react";
import { FaSearch, FaUser, FaCog, FaBell, FaHistory } from "react-icons/fa";

// ============================================
// PURITY DASHBOARD COLOR CONSTANTS
// ============================================
const COLORS = {
  primary: '#3BCBBE',           // Hijau utama
  lightBg: '#F8F9FA',           // Putih dasar
  white: '#FFFFFF',             // Putih murni
  lightGray: '#E2E8F0',         // Gray terang
  textGray: '#718096',          // Gray text
  textDark: '#2D3748',          // Dark text
};

export default function Header({ title = "Dashboard", breadcrumb = ["Pages", "Dashboard"] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header 
      // Menggunakan padding yang cukup (pt-6) agar tidak menempel di atas browser
      className="flex flex-col md:flex-row justify-between items-start md:items-center w-full px-6 pt-6 pb-2 sticky top-0 z-40 bg-[#F8F9FA] font-['Helvetica']"
    >
      
      {/* =========================================
          BAGIAN KIRI: Breadcrumb & Title
          ========================================= */}
      <div className="flex flex-col mb-4 md:mb-0">
        <div className="flex items-center gap-2 text-sm mb-1">
          <span style={{ color: COLORS.textGray }}>{breadcrumb[0]}</span>
          <span style={{ color: COLORS.textGray }}>/</span>
          <span style={{ color: COLORS.textDark }}>{breadcrumb[1]}</span>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: COLORS.textDark }}>{title}</h1>
      </div>

      {/* =========================================
          BAGIAN KANAN: Search & Icons
          Urutan: Search Bar -> Sign In -> Settings -> Bell
          ========================================= */}
      <div className="flex items-center gap-5 relative">
        
        {/* 1. Search Bar */}
        <div className="relative">
          <div className="flex items-center bg-[#FFFFFF] rounded-full px-4 py-2 border border-gray-200 focus-within:border-[#3BCBBE] focus-within:ring-1 focus-within:ring-[#3BCBBE] transition-all shadow-sm">
            <FaSearch className="text-gray-400 mr-3 text-sm" />
            <input 
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
              type="text" 
              placeholder="Type here..." 
              className="bg-transparent outline-none text-sm w-32 md:w-48 text-gray-700 placeholder-gray-400 font-medium"
            />
          </div>

          {/* Search Modal Dropdown */}
          {isSearchOpen && (
            <div 
              className="absolute top-12 left-0 w-full rounded-2xl shadow-md z-20 p-5 bg-[#FFFFFF] border border-gray-200 animate-in fade-in duration-200"
            >
              <p className="text-[10px] font-extrabold mb-4 uppercase tracking-widest text-gray-400">
                Recent Searches
              </p>
              <div className="space-y-4">
                {["Booking #1042", "John Doe Guest", "Deluxe Room"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm cursor-pointer group">
                    <FaHistory className="text-gray-400 group-hover:text-[#3BCBBE] transition-colors" />
                    <span className="text-gray-700 group-hover:text-[#3BCBBE] transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Sign In */}
        <button className="flex items-center gap-2 font-bold text-sm transition-colors ml-2 hover:text-[#3BCBBE]" style={{ color: COLORS.textGray }}>
          <FaUser className="text-sm" />
          <span>Sign In</span>
        </button>

        {/* 3. Settings (Icon Gear) */}
        <button className="transition-colors hover:text-[#3BCBBE]" style={{ color: COLORS.textGray }}>
          <FaCog className="text-lg" />
        </button>

        {/* 4. Notifikasi (Icon Bell) */}
        <button className="transition-colors hover:text-[#3BCBBE]" style={{ color: COLORS.textGray }}>
          <FaBell className="text-lg" />
        </button>

      </div>
    </header>
  );
}