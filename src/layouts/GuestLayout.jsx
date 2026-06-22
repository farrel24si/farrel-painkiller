import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import FloatingChat from "../components/FloatingChat";
import {
  FaUser, FaBars, FaTimes, FaArrowUp, FaWhatsapp,
  FaInstagram, FaFacebook, FaTwitter, FaPhoneAlt, FaEnvelope
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

// Import logo Capella
import logo2 from "../assets/logo2.png";

// ======================= KOMPONEN PEMBANTU =======================

function ReadingProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setWidth(scrollPercent);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div
        className="h-full bg-[#3BCBBE] transition-all duration-150"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-sm py-3"
          : "bg-white/80 backdrop-blur-md py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 relative">
        
        {/* ── BAGIAN KIRI: LOGO & WORDMARK ── */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="group flex items-center gap-3">
            <img src={logo2} alt="Capella Logo" className="h-8 w-auto object-contain" />
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-[26px] font-serif italic tracking-wide text-gray-900 group-hover:text-[#3BCBBE] transition-colors duration-300">
                Capella
              </span>
              <span className="hidden xl:block text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Hotel & Resort
              </span>
            </div>
          </Link>
        </div>

        {/* ── BAGIAN TENGAH: DESKTOP MENU ── */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-sm font-semibold text-gray-600">
          <a href="/#rooms" className="hover:text-[#3BCBBE] transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,203,190,0.5)]">Rooms</a>
          <a href="/#facilities" className="hover:text-[#3BCBBE] transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,203,190,0.5)]">Facilities</a>
          <a href="/#gallery" className="hover:text-[#3BCBBE] transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,203,190,0.5)]">Gallery</a>
          <a href="/#contact" className="hover:text-[#3BCBBE] transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,203,190,0.5)]">Contact</a>
        </div>

        {/* ── BAGIAN KANAN: TOMBOL LOGIN & REGISTER ── */}
        <div className="hidden lg:flex flex-1 justify-end items-center gap-3">
          
          {/* Tombol Login (Hover Glow & Teks Menyala) */}
          <Button asChild className="bg-white hover:bg-white text-gray-800 text-sm px-6 py-2.5 rounded-full font-bold shadow-sm border border-gray-200 cursor-pointer transition-all duration-300 hover:border-[#3BCBBE]/50 hover:shadow-[0_0_15px_rgba(59,203,190,0.35)] hover:text-[#3BCBBE]">
            <Link to="/login">
              <FaUser className="mr-2 text-[#3BCBBE]" /> Login
            </Link>
          </Button>

          {/* Tombol Register (Hover Glow & Background Lebih Terang) */}
          <Button asChild className="bg-[#3BCBBE] hover:bg-[#4FD1C5] text-white text-sm px-7 py-2.5 rounded-full shadow-md cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,203,190,0.6)] hover:-translate-y-0.5">
            <Link to="/register">
              Register
            </Link>
          </Button>
          
        </div>

        {/* ── HAMBURGER MENU (UNTUK MOBILE/TABLET) ── */}
        <div className="flex-1 flex justify-end lg:hidden">
          <button
            className="text-gray-600 text-2xl hover:text-[#3BCBBE] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        className={`lg:hidden absolute w-full bg-white/95 backdrop-blur-xl shadow-lg transition-all duration-300 px-6 flex flex-col gap-4 text-sm font-semibold text-gray-600 ${
          isOpen ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden py-0"
        }`}
      >
        <a href="/#rooms" onClick={() => setIsOpen(false)} className="hover:text-[#3BCBBE]">Rooms</a>
        <a href="/#facilities" onClick={() => setIsOpen(false)} className="hover:text-[#3BCBBE]">Facilities</a>
        <a href="/#gallery" onClick={() => setIsOpen(false)} className="hover:text-[#3BCBBE]">Gallery</a>
        <a href="/#contact" onClick={() => setIsOpen(false)} className="hover:text-[#3BCBBE]">Contact</a>
        <div className="h-px bg-gray-100 my-2"></div>
        
        <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-gray-800">
          <FaUser className="text-[#3BCBBE]" /> Login
        </Link>
        
        <Button asChild className="bg-[#3BCBBE] hover:bg-[#4FD1C5] text-white mt-2 w-full px-5 py-3 rounded-xl shadow-md cursor-pointer transition-all">
          <Link to="/register" onClick={() => setIsOpen(false)}>
            Register
          </Link>
        </Button>
      </div>

      {/* Garis tipis teal → gold, muncul saat discroll */}
      <div className={`absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#3BCBBE]/60 to-[#F5A623]/60 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
    </header>
  );
}

// ======================= LAYOUT UTAMA =======================
export default function GuestLayout() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans antialiased flex flex-col">
      <style>{`html { scroll-behavior: smooth; }`}</style>
      
      <ReadingProgressBar />
      <Header />

      {/* Konten Halaman (Landing Page dll akan dirender di sini) */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#151928] text-white pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo2} alt="Capella Logo" className="h-8 w-auto brightness-0 invert" />
              <h3 className="text-2xl font-serif italic text-white tracking-wide">
                Capella
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Menginap dengan hati, dilayani sepenuh jiwa.
            </p>
            <div className="flex gap-4 text-xl">
              <FaInstagram className="hover:text-[#3BCBBE] cursor-pointer transition-colors hover:drop-shadow-[0_0_8px_rgba(59,203,190,0.8)]" />
              <FaFacebook className="hover:text-[#3BCBBE] cursor-pointer transition-colors hover:drop-shadow-[0_0_8px_rgba(59,203,190,0.8)]" />
              <FaTwitter className="hover:text-[#3BCBBE] cursor-pointer transition-colors hover:drop-shadow-[0_0_8px_rgba(59,203,190,0.8)]" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white tracking-wider text-sm uppercase">Tautan Cepat</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="/#rooms" className="hover:text-white transition-colors hover:text-shadow-sm">Kamar & Suite</a></li>
              <li><a href="/#facilities" className="hover:text-white transition-colors hover:text-shadow-sm">Fasilitas</a></li>
              <li><a href="/#gallery" className="hover:text-white transition-colors hover:text-shadow-sm">Galeri</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors hover:text-shadow-sm">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white tracking-wider text-sm uppercase">Layanan Tamu</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white tracking-wider text-sm uppercase">Hubungi Kami</h4>
            <p className="text-gray-400 text-sm mb-3">Senin - Minggu, 24 Jam</p>
            <p className="text-gray-400 text-sm flex items-center gap-2 mb-3">
              <FaPhoneAlt className="text-[#3BCBBE]" /> +62 21 1234 5678
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <FaEnvelope className="text-[#3BCBBE]" /> cs@capellahotel.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Capella Hotel & Resort. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-medium text-gray-600">Grand Farrel Hotel Management System</p>
        </div>
      </footer>

      {/* FLOATING CHAT & BACK TO TOP */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="bg-white p-3 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(59,203,190,0.4)] transition-all text-gray-600 hover:text-[#3BCBBE] hover:-translate-y-1"
          >
            <FaArrowUp />
          </button>
        )}

        {/* <button className="bg-[#25D366] text-white p-4 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:scale-110 transition-all relative group">
          <FaWhatsapp className="text-2xl" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat WhatsApp
          </span>
        </button> */}

        <FloatingChat />
      </div>
    </div>
  );
}