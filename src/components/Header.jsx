import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaCog, FaBell, FaHistory } from "react-icons/fa";

// === IMPORT 3 KOMPONEN SHADCN UI ===
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const COLORS = {
  primary: '#3BCBBE',
  lightBg: '#F8F9FA',
  white: '#FFFFFF',
  textGray: '#718096',
  textDark: '#2D3748',
};

export default function Header({ title = "Dashboard", breadcrumb = ["Pages", "Dashboard"] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null); // State untuk menyimpan data user
  const navigate = useNavigate();

  // Membaca data user dari localStorage saat Header dimuat
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userSession");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Fungsi untuk Log Out
  const handleLogout = () => {
    localStorage.removeItem("userSession"); // Hapus sesi
    navigate("/login"); // Arahkan kembali ke halaman login
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center w-full px-6 pt-6 pb-2 sticky top-0 z-40 bg-[#F8F9FA] font-['Helvetica']">
      
      {/* KIRI: Breadcrumb & Title */}
      <div className="flex flex-col mb-4 md:mb-0">
        <div className="flex items-center gap-2 text-sm mb-1">
          <span style={{ color: COLORS.textGray }}>{breadcrumb[0]}</span>
          <span style={{ color: COLORS.textGray }}>/</span>
          <span style={{ color: COLORS.textDark }}>{breadcrumb[1]}</span>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: COLORS.textDark }}>{title}</h1>
      </div>

      {/* KANAN: Search & Icons */}
      <div className="flex items-center gap-5 relative">
        
        {/* SHADCN KOMPONEN 1: INPUT (Search Bar) */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10" />
          <Input 
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
            type="text" 
            placeholder="Type here..." 
            className="pl-9 rounded-full bg-white border-gray-200 focus-visible:ring-[#3BCBBE] focus-visible:ring-1 shadow-sm w-32 md:w-56 text-sm text-gray-700 placeholder:text-gray-400"
          />

          {isSearchOpen && (
            <div className="absolute top-12 left-0 w-full rounded-2xl shadow-md z-20 p-5 bg-[#FFFFFF] border border-gray-200 animate-in fade-in duration-200">
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

        {/* SHADCN KOMPONEN 2: DROPDOWN MENU (Profile/User) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 font-bold text-sm transition-colors ml-2 hover:text-[#3BCBBE] outline-none" style={{ color: COLORS.textGray }}>
              {/* Jika user sudah login, tampilkan ikon dan inisial/nama. Jika belum, tampilkan Sign In */}
              {user ? (
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-[#3BCBBE] text-white flex items-center justify-center text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700">{user.name.split(" ")[0]}</span>
                </div>
              ) : (
                <>
                  <FaUser className="text-sm" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 font-['Helvetica'] rounded-xl">
            {/* Tampilkan Nama Lengkap & Email di Dropdown */}
            {user ? (
              <>
                <DropdownMenuLabel className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="text-xs text-gray-400 font-normal">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            ) : (
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            )}

            {/* Fungsi Logout dipanggil di sini */}
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="transition-colors hover:text-[#3BCBBE] relative outline-none" style={{ color: COLORS.textGray }}>
              <FaBell className="text-lg" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 font-['Helvetica'] rounded-xl p-2">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <FaBell className="text-gray-200 text-3xl mb-2" />
              <p className="text-sm font-medium text-gray-500">All caught up!</p>
              <p className="text-xs text-gray-400 mt-1">No new notifications right now.</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}