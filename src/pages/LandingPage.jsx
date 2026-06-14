// src/pages/LandingPage.jsx
import React, { useState, useEffect, useRef } from "react";
import FloatingChat from "./../components/FloatingChat";
import { Link } from "react-router-dom";
import {
  FaBed, FaSwimmingPool, FaSpa, FaDumbbell, FaParking, FaUtensils,
  FaWifi, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaWhatsapp, FaInstagram, FaFacebook, FaTwitter,
  FaArrowRight, FaUser, FaCalendarCheck, FaGift, FaHeart, FaGem,
  FaBars, FaTimes, FaArrowUp, FaSearch
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ======================= HEADER DENGAN STAFF LOGIN =======================
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm py-4 px-6 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-[#3BCBBE] tracking-tight">
          Capella Hotel
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-600 items-center">
          <a href="#rooms" className="hover:text-[#3BCBBE] transition-colors">Rooms</a>
          <a href="#facilities" className="hover:text-[#3BCBBE] transition-colors">Facilities</a>
          <a href="#gallery" className="hover:text-[#3BCBBE] transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-[#3BCBBE] transition-colors">Contact</a>

          {/* Staff Login */}
          <Link
            to="/login"
            className="text-gray-400 hover:text-[#3BCBBE] transition-colors text-xs font-medium"
            title="Halaman staff & admin"
          >
            Staff Login
          </Link>

          <Button className="bg-[#3BCBBE] hover:bg-[#2aa89d] text-white text-sm px-5 py-2 rounded-full shadow-md transition-all">
            Book Now
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 flex flex-col gap-4 text-sm font-semibold text-gray-600 transition-all duration-300 ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <a href="#rooms" className="hover:text-[#3BCBBE]">Rooms</a>
        <a href="#facilities" className="hover:text-[#3BCBBE]">Facilities</a>
        <a href="#gallery" className="hover:text-[#3BCBBE]">Gallery</a>
        <a href="#contact" className="hover:text-[#3BCBBE]">Contact</a>
        <Link to="/login" className="text-gray-400 hover:text-[#3BCBBE]">Staff Login</Link>
        <Button className="bg-[#3BCBBE] hover:bg-[#2aa89d] text-white w-fit px-5 py-2 rounded-full">
          Book Now
        </Button>
      </div>
    </header>
  );
}

// ======================= ANIMASI SCROLL =======================
function ScrollReveal({ children, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ======================= LANDING PAGE =======================
const LandingPage = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const facilities = [
    { icon: <FaSwimmingPool />, name: "Kolam Renang" },
    { icon: <FaSpa />, name: "Spa & Sauna" },
    { icon: <FaDumbbell />, name: "Fitness Center" },
    { icon: <FaUtensils />, name: "Restoran" },
    { icon: <FaParking />, name: "Parkir Gratis" },
    { icon: <FaWifi />, name: "Wi-Fi Cepat" },
  ];

  const rooms = [
    {
      type: "Deluxe Suite",
      price: "$450",
      img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Kamar luas dengan pemandangan kota, tempat tidur king, dan bathtub marble.",
    },
    {
      type: "Standard Room",
      price: "$150",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Kamar nyaman untuk perjalanan bisnis, dilengkapi meja kerja dan Wi-Fi.",
    },
    {
      type: "Presidential Suite",
      price: "$1,200",
      img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Kemewahan tingkat atas dengan ruang tamu pribadi, kolam renang eksklusif.",
    },
  ];

  const reviews = [
    {
      name: "Ayu Lestari",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "Menginap di sini sungguh luar biasa! Staf sangat ramah, kamar bersih, dan sarapannya enak.",
      response: "Terima kasih, Ayu! Kami senang Anda merasa seperti di rumah sendiri. 💚",
    },
    {
      name: "Budi Santoso",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "Pelayanan personal yang tak tertandingi. Saya selalu kembali ke sini setiap kali ke Jakarta.",
      response: "Bapak Budi, kehadiran Anda selalu kami tunggu. Sampai bertemu lagi!",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    alert(`Booking requested for ${checkIn} to ${checkOut}, ${guests} tamu.`);
  };

  const handleContact = (e) => {
    e.preventDefault();
    alert(`Pesan dari ${contactName} telah dikirim.`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans antialiased">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Header />

      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#313860]/70 to-[#151928]/80" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
            Pengalaman Menginap yang{" "}
            <span className="text-[#3BCBBE]">Mengenal Anda</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto font-light">
            Karena setiap tamu adalah cerita berharga. Kami siap menyambut Anda
            dengan keramahan khas Nusantara.
          </p>

          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg p-6 rounded-[28px] shadow-2xl border-0">
            <CardContent className="p-0">
              <form
                onSubmit={handleBooking}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
              >
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-1">
                    <FaCalendarCheck className="text-[#3BCBBE] text-xs" />
                    Check-in (DD/MM/YY)
                  </label>
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#F8F9FA] border-gray-200 focus:border-[#3BCBBE] rounded-xl text-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-1">
                    <FaCalendarCheck className="text-[#3BCBBE] text-xs" />
                    Check-out (DD/MM/YY)
                  </label>
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#F8F9FA] border-gray-200 focus:border-[#3BCBBE] rounded-xl text-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-1">
                    <FaUser className="text-[#3BCBBE] text-xs" />
                    Tamu
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#F8F9FA] border-gray-200 focus:border-[#3BCBBE] rounded-xl text-gray-700"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#3BCBBE] hover:bg-[#2aa89d] text-white font-bold py-3 text-base rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <FaSearch /> Cek Ketersediaan
                </Button>
              </form>
              <div className="mt-4">
                <Textarea
                  placeholder="Permintaan khusus (ulang tahun, anniversary, preferensi kamar...)"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full bg-[#F8F9FA] border-gray-200 focus:border-[#3BCBBE] rounded-xl text-sm text-gray-700"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* <div className="mt-6 flex justify-center">
            <span className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium">
              <FaUser className="inline mr-2" /> Welcome back, Rizky! Lihat
              penawaran spesial Anda.
            </span>
          </div> */}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <ScrollReveal>
        <section className="py-24 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Capella Hotel —{" "}
                <span className="text-[#3BCBBE]">Tempat Anda Dikenang</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                Lebih dari sekadar tempat bermalam, kami menciptakan hubungan
                personal dengan setiap tamu. Dengan 120 kamar elegan, restoran
                pemenang penghargaan, spa menenangkan, dan layanan 24 jam,
                kami memastikan setiap momen Anda berkesan.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-[#3BCBBE] text-[#3BCBBE] hover:bg-[#3BCBBE] hover:text-white rounded-full"
                >
                  Cerita Kami
                </Button>
                <Button className="bg-[#313860] hover:bg-[#1e2442] text-white rounded-full">
                  Lihat Fasilitas <FaArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Lobby"
                className="rounded-3xl shadow-md object-cover h-48 w-full hover:scale-105 transition-transform"
              />
              <img
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Pool"
                className="rounded-3xl shadow-md object-cover h-48 w-full hover:scale-105 transition-transform"
              />
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Restaurant"
                className="rounded-3xl shadow-md object-cover h-48 w-full hover:scale-105 transition-transform"
              />
              <img
                src="https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Room"
                className="rounded-3xl shadow-md object-cover h-48 w-full hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== FACILITIES ===== */}
      <ScrollReveal>
        <section id="facilities" className="bg-white py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Fasilitas Lengkap
            </h2>
            <p className="text-gray-500 mb-16 text-lg">
              Nikmati kenyamanan yang dirancang khusus untuk Anda
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {facilities.map((fac, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center p-6 rounded-2xl bg-[#F8F9FA] hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-[#3BCBBE]/10 text-[#3BCBBE] flex items-center justify-center text-2xl mb-4 group-hover:bg-[#3BCBBE] group-hover:text-white transition-colors">
                    {fac.icon}
                  </div>
                  <span className="font-semibold text-gray-700">{fac.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== GALLERY ===== */}
      <ScrollReveal>
        <section id="gallery" className="py-24 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Galeri Kami
          </h2>
          <p className="text-gray-500 mb-16 text-center text-lg">
            Sekilas keindahan yang menanti Anda
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((src, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== ROOM TYPES ===== */}
      <ScrollReveal>
        <section id="rooms" className="py-24 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Pilihan Kamar
          </h2>
          <p className="text-gray-500 mb-16 text-center text-lg">
            Dari kenyamanan klasik hingga kemewahan modern
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room, idx) => (
              <Card
                key={idx}
                className="overflow-hidden rounded-3xl border-0 shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={room.img}
                    alt={room.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {room.type}
                    </h3>
                    <div className="text-right">
                      <span className="text-[#3BCBBE] font-bold text-2xl">
                        {room.price}
                      </span>
                      <span className="text-sm text-gray-400 block">/ malam</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">{room.desc}</p>
                  <Button className="w-full bg-[#313860] hover:bg-[#1e2442] text-white rounded-xl py-3">
                    Pesan Sekarang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== REVIEWS & LOYALTY ===== */}
      <ScrollReveal>
        <section className="bg-[#313860] text-white py-24 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-bold mb-8">Apa Kata Tamu Kami</h2>
              <div className="space-y-8">
                {reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={rev.photo}
                        alt={rev.name}
                        className="w-14 h-14 rounded-full border-2 border-[#3BCBBE]"
                      />
                      <div>
                        <p className="font-bold text-lg">{rev.name}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="italic text-gray-200 mb-3">“{rev.text}”</p>
                    <div className="text-sm text-[#3BCBBE] font-medium bg-[#3BCBBE]/10 p-2 rounded-lg">
                      {rev.response}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="bg-white/20 px-5 py-2 rounded-full text-sm font-medium">
                  ⭐ 4.9 dari Google (1.250+ ulasan)
                </span>
                <span className="bg-white/20 px-5 py-2 rounded-full text-sm font-medium">
                  🏆 Traveler's Choice 2025
                </span>
              </div>
            </div>

            <div className="space-y-10">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaGem className="text-[#3BCBBE]" /> Capella Rewards
                </h3>
                <p className="text-gray-200 mb-6">
                  Bergabung dan dapatkan poin setiap menginap. Nikmati diskon
                  eksklusif, upgrade gratis, dan akses ke lounge member.
                </p>
                <div className="flex gap-3 mb-6">
                  <span className="bg-[#3BCBBE]/20 px-4 py-1.5 rounded-full text-sm border border-[#3BCBBE]">
                    Silver
                  </span>
                  <span className="bg-[#3BCBBE]/20 px-4 py-1.5 rounded-full text-sm border border-[#3BCBBE]">
                    Gold
                  </span>
                  <span className="bg-[#3BCBBE]/20 px-4 py-1.5 rounded-full text-sm border border-[#3BCBBE]">
                    Platinum
                  </span>
                </div>
                <Button className="bg-[#3BCBBE] hover:bg-[#2aa89d] text-white rounded-full px-8 py-3">
                  Daftar Sekarang (Gratis)
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 p-5 rounded-2xl">
                  <FaUser className="mx-auto text-3xl mb-2 text-[#3BCBBE]" />
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-gray-300">Tamu Bahagia</div>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl">
                  <FaCalendarCheck className="mx-auto text-3xl mb-2 text-[#3BCBBE]" />
                  <div className="text-3xl font-bold">7</div>
                  <div className="text-sm text-gray-300">Tahun Melayani</div>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl">
                  <FaStar className="mx-auto text-3xl mb-2 text-[#3BCBBE]" />
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-gray-300">Rating Kepuasan</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== PROMOSI ===== */}
      <ScrollReveal>
        <section className="py-24 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Penawaran Spesial
          </h2>
          <p className="text-gray-500 mb-16 text-center text-lg">
            Didesain khusus untuk momen istimewa Anda
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            <Card className="overflow-hidden rounded-3xl border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#3BCBBE]/5 to-white">
              <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 bg-[#3BCBBE] rounded-full flex items-center justify-center text-white text-4xl shadow-lg">
                  <FaHeart />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Paket Bulan Madu
                  </h3>
                  <p className="text-gray-600 mb-5">
                    Dekorasi romantis, makan malam lilin, dan spa pasangan.
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#3BCBBE] text-[#3BCBBE] hover:bg-[#3BCBBE] hover:text-white rounded-full"
                  >
                    Lihat Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-3xl border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#313860]/5 to-white">
              <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 bg-[#313860] rounded-full flex items-center justify-center text-white text-4xl shadow-lg">
                  <FaGift />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Family Getaway
                  </h3>
                  <p className="text-gray-600 mb-5">
                    Kamar penghubung, sarapan gratis anak, dan kids club.
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#313860] text-[#313860] hover:bg-[#313860] hover:text-white rounded-full"
                  >
                    Lihat Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-[#F8F9FA] rounded-3xl p-8 md:p-12 text-center shadow-inner">
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              Dapatkan Penawaran Eksklusif
            </h3>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Langganan newsletter kami dan dapatkan diskon member serta info
              pre-arrival.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <Input
                placeholder="Alamat email Anda"
                className="flex-1 rounded-xl border-gray-200"
              />
              <Button className="bg-[#3BCBBE] hover:bg-[#2aa89d] text-white rounded-xl px-6">
                Langganan
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== FAQ ===== */}
      <ScrollReveal>
        <section className="bg-white py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              Pertanyaan Umum
            </h2>
            <p className="text-gray-500 mb-12 text-center text-lg">
              Tidak menemukan jawaban? Tim kami siap membantu.
            </p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Apakah saya bisa meminta late check-out?
                </AccordionTrigger>
                <AccordionContent>
                  Ya, late check-out tersedia berdasarkan ketersediaan. Silakan
                  hubungi resepsionis atau tulis di permintaan khusus saat booking.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Bagaimana cara mengakses Wi-Fi?
                </AccordionTrigger>
                <AccordionContent>
                  Wi-Fi gratis tersedia di seluruh area hotel. Anda akan menerima
                  kode akses saat check-in atau melalui email pre-arrival.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Apakah hotel menerima hewan peliharaan?
                </AccordionTrigger>
                <AccordionContent>
                  Saat ini kami belum menyediakan fasilitas untuk hewan peliharaan,
                  kecuali hewan pemandu. Hubungi kami untuk kebutuhan khusus.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="text-center mt-10">
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-3 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                <FaWhatsapp className="text-2xl" /> Chat via WhatsApp
              </Button>
              <p className="text-sm text-gray-400 mt-3">CS tersedia 24/7</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== LOKASI & KONTAK ===== */}
      <ScrollReveal>
        <section id="contact" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Lokasi Kami
              </h2>
              <div className="rounded-3xl overflow-hidden shadow-xl h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5693123456!2d106.8271533153095!3d-6.187110195528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f435e6b7e1e1%3A0x1234567890abcdef!2sHotel%20Indonesia%20Kempinski%20Jakarta!5e0!3m2!1sid!2sid!4v1690000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Hotel"
                ></iframe>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-gray-700">
                  <FaMapMarkerAlt className="text-[#3BCBBE] text-xl" />
                  <span>Jl. Sudirman No. 45, Jakarta Pusat 10220</span>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <FaPhoneAlt className="text-[#3BCBBE] text-xl" />
                  <span>+62 21 1234 5678</span>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <FaEnvelope className="text-[#3BCBBE] text-xl" />
                  <span>cs@capellahotel.com</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  🚕 10 menit dari Stasiun Sudirman | 🚌 Halte bus terdekat 5 menit
                  jalan kaki
                </p>
                <a
                  href="https://goo.gl/maps/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[#3BCBBE] font-semibold hover:underline"
                >
                  Dapatkan Arah →
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Hubungi Kami
              </h2>
              <Card className="p-8 rounded-3xl shadow-md border-0">
                <CardContent className="p-0 space-y-5">
                  <Input
                    placeholder="Nama Anda"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="rounded-xl border-gray-200"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="rounded-xl border-gray-200"
                  />
                  <Textarea
                    placeholder="Pesan singkat"
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="rounded-xl border-gray-200"
                  />
                  <Button
                    onClick={handleContact}
                    className="w-full bg-[#313860] hover:bg-[#1e2442] text-white rounded-xl py-6 text-base"
                  >
                    Kirim Pesan
                  </Button>
                  <button className="w-full text-[#3BCBBE] text-sm font-medium hover:underline">
                    Atau minta kami hubungi Anda (Callback)
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#151928] text-white pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-[#3BCBBE]">
              Capella Hotel
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Menginap dengan hati, dilayani sepenuh jiwa.
            </p>
            <div className="flex gap-4 text-xl">
              <FaInstagram className="hover:text-[#3BCBBE] cursor-pointer transition-colors" />
              <FaFacebook className="hover:text-[#3BCBBE] cursor-pointer transition-colors" />
              <FaTwitter className="hover:text-[#3BCBBE] cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Tautan Cepat</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition">Kamar & Suite</a></li>
              <li><a href="#" className="hover:text-white transition">Fasilitas</a></li>
              <li><a href="#" className="hover:text-white transition">Galeri</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Layanan Tamu</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Member Login</a></li>
              <li><a href="#" className="hover:text-white transition">Pesanan Saya</a></li>
              <li><a href="#" className="hover:text-white transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition">Syarat & Ketentuan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Hubungi Kami</h4>
            <p className="text-gray-400 text-sm">Senin - Minggu, 24 Jam</p>
            <p className="text-gray-400 text-sm mt-2">+62 21 1234 5678</p>
            <p className="text-gray-400 text-sm mt-2">cs@capellahotel.com</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          © 2026 Capella Hotel. All rights reserved.
        </div>
      </footer>

      {/* FLOATING CHAT & BACK TO TOP */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="bg-white p-3 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all text-gray-600 hover:text-[#3BCBBE]"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        )}

        <button className="bg-[#25D366] text-white p-4 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform relative group">
          <FaWhatsapp className="text-2xl" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat WhatsApp
          </span>
        </button>
        
        {/* Menggunakan Komponen Floating Chat Terintegrasi AI */}
        <FloatingChat />
      </div>
    </div>
  );
};

export default LandingPage;