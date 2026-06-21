import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, LogOut, ChevronDown, User, CalendarCheck, Gem } from "lucide-react";

// Import logo2.png
import logo2 from "../assets/logo2.png";

export default function MemberLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (!session) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(session);
      if (parsedUser.role === "admin") navigate("/dashboard");
      setUser(parsedUser);
    }
  }, [navigate]);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Helvetica'] flex flex-col">
      {/* ── HEADER ── */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        // Mengubah background menjadi putih glossy (kaca)
        className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
          
          {/* Logo & Wordmark */}
          <Link to="/member" className="group flex items-center gap-3">
            {/* Menambahkan Logo Image */}
            <img src={logo2} alt="Capella Logo" className="h-8 w-auto object-contain" />
            
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-[26px] font-serif italic tracking-wide text-gray-900 group-hover:text-[#3BCBBE] transition-colors duration-300">
                Capella
              </span>
              <span className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Members Club
              </span>
            </div>
          </Link>

          {/* User cluster + dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <div className="relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-[#3BCBBE] to-[#F5A623] shadow-sm">
                {user.name.charAt(0).toUpperCase()}
                <Crown
                  size={11}
                  className="absolute -bottom-1 -right-1 text-[#F5A623] bg-white rounded-full p-[2px] shadow-sm"
                />
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700">{user.name}</span>
              <ChevronDown
                size={15}
                className={`text-gray-400 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-3 w-60 rounded-2xl bg-white shadow-2xl border border-black/5 overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-gray-50 bg-[#F8F9FA]">
                    <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>

                  <nav className="py-1.5">
                    <Link
                      to="/member"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-[#3BCBBE]/5 hover:text-[#3BCBBE] transition-colors"
                    >
                      <User size={15} /> Profil Saya
                    </Link>
                    <Link
                      to="/member"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-[#3BCBBE]/5 hover:text-[#3BCBBE] transition-colors"
                    >
                      <CalendarCheck size={15} /> Riwayat Booking
                    </Link>
                    <Link
                      to="/member"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-[#3BCBBE]/5 hover:text-[#3BCBBE] transition-colors"
                    >
                      <Gem size={15} /> Capella Rewards
                    </Link>
                  </nav>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-5 py-3.5 text-sm font-bold text-[#E53E3E] hover:bg-[#E53E3E]/5 transition-colors border-t border-gray-50"
                  >
                    <LogOut size={15} /> Keluar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Garis tipis teal → gold, jadi signature visual Capella */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#3BCBBE]/60 to-[#F5A623]/60" />
      </motion.header>

      {/* ── MAIN ── */}
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full"
      >
        <Outlet context={{ user }} />
      </motion.main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p className="font-serif italic text-sm text-gray-500">Capella</p>
          <p>&copy; {new Date().getFullYear()} Capella Hotel &amp; Resort. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 