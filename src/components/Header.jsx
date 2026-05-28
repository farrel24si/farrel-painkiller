import React, { useState } from "react";
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
              <FaUser className="text-sm" />
              <span>Sign In</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 font-['Helvetica'] rounded-xl">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:text-[#3BCBBE] focus:text-[#3BCBBE]">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:text-[#3BCBBE] focus:text-[#3BCBBE]">Billing</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:text-[#3BCBBE] focus:text-[#3BCBBE]">Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Ikon Settings (Biasa) */}
        <button className="transition-colors hover:text-[#3BCBBE]" style={{ color: COLORS.textGray }}>
          <FaCog className="text-lg" />
        </button>

        {/* SHADCN KOMPONEN 3: TOOLTIP (Notifikasi) */}
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="transition-colors hover:text-[#3BCBBE] relative" style={{ color: COLORS.textGray }}>
                <FaBell className="text-lg" />
                {/* Red dot notifikasi */}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-white font-['Helvetica'] rounded-lg text-xs">
              <p>3 New Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>
    </header>
  );
}