import { useState } from "react";
import { FaBell, FaSearch, FaCommentAlt, FaGift, FaHistory, FaUserCircle } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  // 1. State Modal: nilai awal FALSE (tertutup)
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    // sticky top-0 = menempel di atas saat scroll
    <header className="flex justify-between items-center bg-white px-8 py-4 sticky top-0 z-40">
      
      {/* Search Bar Container */}
      <div className="relative w-full max-w-xl">
        <input
          // 2. Buka modal saat input difokuskan
          onFocus={() => setIsSearchOpen(true)}
          // 3. Tutup modal saat klik di luar (pake timeout dikit biar klik di dalam modal sempet kebaca)
          onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
          type="text"
          placeholder="Search here..."
          className="w-full bg-gray-50 border-none p-3 pl-12 rounded-xl text-sm focus:ring-2 focus:ring-hijau transition-all outline-none"
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-abu-muda" />

        {/* --- IMPROVISASI 1: SEARCH MODAL --- */}
        {isSearchOpen && (
          <div className="absolute top-14 left-0 w-full bg-white rounded-2xl shadow-2xl z-20 p-5 border border-gray-100 animate-in fade-in zoom-in duration-200">
            <p className="text-[10px] font-extrabold text-gray-400 mb-4 uppercase tracking-widest">Recent Searches</p>
            <div className="space-y-4">
              {["Fresh Salad", "Beef Burger", "Pizza Hut"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-600 hover:text-hijau cursor-pointer transition-colors group">
                  <FaHistory className="text-gray-300 group-hover:text-hijau" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Icons & User Profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 border-r pr-6 border-gray-200">
          {/* Icon notifikasi dengan badge angka 21 */}
          <div className="relative p-3 bg-blue-50 rounded-2xl text-biru cursor-pointer hover:bg-blue-100 transition">
            <FaBell />
            <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-biru text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
              21
            </span>
          </div>
          <div className="p-3 bg-blue-50 rounded-2xl text-biru cursor-pointer hover:bg-blue-100 transition">
            <FaCommentAlt />
          </div>
          <div className="p-3 bg-red-50 rounded-2xl text-merah cursor-pointer hover:bg-red-100 transition">
            <SlSettings />
          </div>
        </div>

        {/* User Profile - Samantha Farrel */}
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400">Hello,</p>
            <p className="text-sm font-bold text-gray-800 group-hover:text-hijau transition-colors">Farrel</p>
          </div>
          {/* Menggunakan Icon sebagai pengganti foto profil yang sering error */}
          <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-hijau-muda group-hover:text-hijau transition-all">
            <FaUserCircle className="text-3xl" />
          </div>
        </div>
      </div>
    </header>
  );
}