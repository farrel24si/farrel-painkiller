import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed, FaSwimmingPool, FaSpa, FaDumbbell, FaParking, FaUtensils,
  FaWifi, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaWhatsapp, FaArrowRight, FaUser, FaCalendarCheck, FaGift, FaHeart, 
  FaSearch, FaQuoteLeft, FaTimes, FaCheckCircle
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

// ======================= KOMPONEN PEMBANTU =======================

// Counter animasi (angka naik dari 0 ke target)
function AnimatedCounter({ target, suffix = "", duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          let start = 0;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasTriggered]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Marquee logo partner
function PartnerMarquee() {
  const logos = [
    "Booking.com", "Expedia", "Traveloka", "TripAdvisor",
    "Agoda", "Airbnb", "Google Travel", "Pegipegi"
  ];

  return (
    <div className="overflow-hidden whitespace-nowrap py-8 bg-white border-y border-gray-100">
      <div className="animate-marquee inline-block">
        {logos.concat(logos).map((name, i) => (
          <span key={i} className="mx-10 text-gray-300 font-bold text-xl tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity cursor-default">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

// Animasi Scroll (Fade In)
function ScrollReveal({ children, className = "", delay = "0" }) {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ======================= LANDING PAGE =======================
const LandingPage = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const heroRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);
  
  // State untuk Modal Pop-up Kamar
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Mencegah scroll pada body saat pop-up terbuka
  useEffect(() => {
    if (selectedRoom) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedRoom]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        setParallaxY(scrolled * 0.4);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const facilities = [
    { icon: <FaSwimmingPool />, name: "Infinity Pool" },
    { icon: <FaSpa />, name: "Holistic Spa" },
    { icon: <FaDumbbell />, name: "Fitness Center" },
    { icon: <FaUtensils />, name: "Fine Dining" },
    { icon: <FaParking />, name: "Valet Parking" },
    { icon: <FaWifi />, name: "High-Speed Wi-Fi" },
  ];

  const rooms = [
    {
      id: "deluxe",
      type: "Deluxe Suite",
      price: "$450",
      img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Kamar luas dengan pemandangan kota, tempat tidur king, dan bathtub marble.",
      amenities: ["Smart TV 55\"", "Bathtub Marble", "Akses Lounge", "Mesin Kopi Nespresso"]
    },
    {
      id: "standard",
      type: "Standard Room",
      price: "$150",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Kamar nyaman untuk perjalanan bisnis, dilengkapi meja kerja ergonomis dan Wi-Fi super cepat.",
      amenities: ["Meja Kerja Ergonomis", "High-Speed Wi-Fi", "Shower Air Panas", "Teh & Kopi Gratis"]
    },
    {
      id: "presidential",
      type: "Presidential Suite",
      price: "$1,200",
      img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Kemewahan tingkat atas dengan ruang tamu pribadi, kolam renang eksklusif, dan pelayan pribadi.",
      amenities: ["Private Pool", "Butler Pribadi 24/7", "Ruang Tamu Terpisah", "Antar-Jemput Bandara VIP"]
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

  const handleContact = (e) => {
    e.preventDefault();
    alert(`Pesan dari ${contactName} telah dikirim.`);
  };

  return (
    <div className="bg-[#F8F9FA] font-sans antialiased text-gray-800">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes particle {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0); }
          50% { opacity: 1; transform: translateY(-20px) scale(1); }
        }
        @keyframes draw {
          0% { stroke-dasharray: 200; stroke-dashoffset: 200; }
          100% { stroke-dasharray: 200; stroke-dashoffset: 0; }
        }
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 7s ease-in-out infinite; }
        .animate-particle { animation: particle 4s ease-in-out infinite; }
        .animate-draw { animation: draw 2s ease-in-out forwards; }
        .animate-fade-in-down { animation: fadeInDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* ===== HERO SECTION ENHANCED ===== */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
              transform: `scale(1.05) translateY(${parallaxY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/95 via-[#0a0f1e]/70 to-[#1a1f3e]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
          
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 203, 190, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 203, 190, 0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-[#3BCBBE]/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ top: '-10%', left: '-5%', animationDuration: '8s' }} />
          <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/20 to-[#3BCBBE]/20 rounded-full blur-3xl animate-pulse" style={{ bottom: '-10%', right: '-5%', animationDuration: '6s', animationDelay: '2s' }} />
          <div className="absolute w-[300px] h-[300px] bg-[#3BCBBE]/10 rounded-full blur-2xl animate-float" style={{ top: '50%', right: '20%', animationDuration: '10s' }} />

          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center">
          <div className="animate-fade-in-down mb-8">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 text-white/90 text-sm font-bold tracking-widest uppercase">
              <FaStar className="text-[#3BCBBE] animate-pulse" />
              <span>Award-Winning Hospitality</span>
              <FaStar className="text-[#3BCBBE] animate-pulse" />
            </div>
          </div>

          <div className="animate-fade-in-up max-w-5xl mx-auto mb-8" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none">
              <span className="block text-white mb-2">Experience</span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#3BCBBE] to-[#F5A623] bg-clip-text text-transparent font-serif italic">
                  True Luxury
                </span>
                <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#3BCBBE" strokeWidth="3" fill="none" className="animate-draw" />
                </svg>
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up max-w-2xl mx-auto mb-12" style={{ animationDelay: '0.4s' }}>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              Immerse yourself in unparalleled elegance where every detail is crafted 
              to create unforgettable moments. Your journey into sophistication begins here.
            </p>
          </div>

          <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md mx-auto" style={{ animationDelay: '0.6s' }}>
            <Button asChild className="w-full sm:w-auto bg-[#3BCBBE] hover:bg-[#2aa89d] text-white px-10 py-7 rounded-full text-lg font-bold shadow-[0_10px_40px_-10px_rgba(59,203,190,0.5)] transition-all hover:scale-105 cursor-pointer group">
              <a href="#rooms">
                <span className="flex items-center gap-2">Book Your Stay <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
              </a>
            </Button>
            
            <Button asChild variant="outline" className="w-full sm:w-auto bg-white/5 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white hover:text-[#0a0f1e] px-10 py-7 rounded-full text-lg font-bold transition-all hover:scale-105 cursor-pointer">
              <a href="#gallery">Explore Gallery</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== PARTNER MARQUEE ===== */}
      <PartnerMarquee />

      {/* ===== EDITORIAL ABOUT SECTION ===== */}
      <ScrollReveal>
        <section className="py-32 px-4 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Kiri: Teks */}
            <div className="pr-4 md:pr-12">
              <p className="text-[#3BCBBE] font-bold tracking-[0.2em] uppercase text-sm mb-4">
                The Capella Story
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Tempat Di Mana <br/>
                <span className="font-serif italic text-gray-600">Kenangan Tercipta</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
                Berdiri megah di jantung kota, Capella Hotel mendefinisikan ulang makna kemewahan. Kami percaya bahwa keramahtamahan sejati tidak hanya tentang tempat yang indah, tetapi tentang <strong className="text-gray-900 font-semibold">perhatian personal pada setiap detail</strong>.
              </p>
              <p className="text-gray-600 leading-relaxed mb-10 text-lg font-light">
                Dari keanggunan arsitektur hingga layanan 24 jam yang intuitif, setiap elemen dirancang untuk membawa Anda melarikan diri dari hiruk-pikuk dunia.
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-8">
                <div>
                  <p className="text-4xl font-black text-gray-900 mb-2">120+</p>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Kamar Elegan</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-gray-900 mb-2">24/7</p>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Layanan Personal</p>
                </div>
              </div>
            </div>

            {/* Kanan: Overlapping Images (Editorial Look) */}
            <div className="relative h-[500px] md:h-[600px] w-full hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Lobby"
                className="absolute top-0 right-0 w-3/4 h-[400px] object-cover rounded-[32px] shadow-2xl z-10 hover:z-30 transition-all duration-500 hover:scale-105"
              />
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Dining"
                className="absolute bottom-0 left-0 w-2/3 h-[350px] object-cover rounded-[32px] shadow-2xl z-20 border-8 border-[#F8F9FA] hover:scale-105 transition-all duration-500"
              />
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* ===== ROOM TYPES (LUXURY PORTFOLIO) ===== */}
      <ScrollReveal>
        <section id="rooms" className="py-32 px-4 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-[#3BCBBE] font-bold tracking-[0.2em] uppercase text-sm mb-4">Akomodasi</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ruang <span className="font-serif italic text-gray-600">Peristirahatan Anda</span>
              </h2>
              <p className="text-gray-500 text-lg font-light">
                Temukan perpaduan sempurna antara desain kontemporer dan kenyamanan absolut di setiap tipe kamar kami.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {rooms.map((room, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedRoom(room)}
                  className="group relative overflow-hidden rounded-[32px] shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#F8F9FA] cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-[350px] overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                    <img
                      src={room.img}
                      alt={room.type}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <span className="text-gray-900 font-black">{room.price}</span>
                      <span className="text-xs text-gray-500 font-bold ml-1">/ malam</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-20 p-8 bg-white transform -translate-y-6 mx-4 rounded-3xl shadow-xl transition-transform duration-500 group-hover:-translate-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">{room.type}</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">{room.desc}</p>
                    <div className="flex items-center text-[#3BCBBE] font-bold text-sm uppercase tracking-wider group-hover:text-gray-900 transition-colors">
                      Eksplorasi Kamar <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== FACILITIES (GLASSMORPHISM CARDS) ===== */}
      <ScrollReveal>
        <section id="facilities" className="py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fasilitas <span className="font-serif italic text-gray-600">Kelas Dunia</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:bg-[#3BCBBE] transition-all duration-300 hover:-translate-y-2 cursor-default"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 text-[#3BCBBE] flex items-center justify-center text-2xl mb-5 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  {fac.icon}
                </div>
                <span className="font-bold text-gray-800 text-center text-sm group-hover:text-white transition-colors">{fac.name}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== GALLERY ===== */}
      <ScrollReveal>
        <section id="gallery" className="py-32 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <p className="text-[#3BCBBE] font-bold tracking-[0.2em] uppercase text-sm mb-4">Galeri</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Momen <span className="font-serif italic text-gray-600">Tak Terlupakan</span>
                </h2>
              </div>
              <Button variant="outline" className="hidden md:flex rounded-full px-8 border-gray-300 text-gray-600 hover:bg-gray-50">
                Lihat Semua Foto
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
              {galleryImages.map((src, idx) => (
                <div
                  key={idx}
                  className={`overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group ${
                    idx === 0 || idx === 3 ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"
                  }`}
                >
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={src}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== FEEDBACK / REVIEWS ===== */}
      <ScrollReveal>
        <section className="py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <FaQuoteLeft className="text-5xl text-[#3BCBBE]/20 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Apa Kata <span className="font-serif italic text-gray-600">Tamu Kami</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex text-[#F5A623] mb-6 gap-1 text-lg">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light">"{rev.text}"</p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <img src={rev.photo} alt={rev.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-gray-900">{rev.name}</p>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mt-1">{rev.room}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== CAPELLA REWARDS (UPGRADED DARK THEME) ===== */}
      <ScrollReveal>
        <section className="relative bg-[#0F1729] text-white py-32 px-4 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3BCBBE]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F5A623]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* --- Kiri: Informasi Rewards --- */}
              <div className="space-y-8">
                <div>
                  <p className="text-[#3BCBBE] font-bold tracking-[0.2em] uppercase text-xs mb-3">
                    Loyalty Program
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-6">
                    Capella{" "}
                    <span className="font-sans not-italic font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3BCBBE] to-[#F5A623]">
                      Rewards
                    </span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-lg font-light">
                    Tingkatkan pengalaman menginap Anda. Dapatkan poin dari setiap reservasi untuk membuka diskon eksklusif, upgrade kamar gratis, dan akses khusus ke <i>private lounge</i> kami.
                  </p>
                </div>

                {/* Indikator Tier yang Lebih Mewah */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2.5 bg-gray-400/10 border border-gray-400/30 px-5 py-2.5 rounded-full backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-gray-400 shadow-[0_0_10px_rgba(156,163,175,0.8)]" />
                    <span className="text-gray-300 font-bold text-sm tracking-wide">Silver</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[#F5A623]/10 border border-[#F5A623]/30 px-5 py-2.5 rounded-full backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-[#F5A623] shadow-[0_0_10px_rgba(245,166,35,0.8)]" />
                    <span className="text-[#F5A623] font-bold text-sm tracking-wide">Gold</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[#3BCBBE]/10 border border-[#3BCBBE]/30 px-5 py-2.5 rounded-full backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-[#3BCBBE] shadow-[0_0_10px_rgba(59,203,190,0.8)]" />
                    <span className="text-[#3BCBBE] font-bold text-sm tracking-wide">Platinum</span>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="pt-6">
                  <Button asChild className="bg-[#3BCBBE] hover:bg-[#2aa89d] text-white rounded-full px-10 py-7 text-base font-bold shadow-[0_8px_30px_rgba(59,203,190,0.3)] transition-all hover:scale-105 hover:shadow-[0_8px_40px_rgba(59,203,190,0.5)] cursor-pointer">
                    <Link to="/register">Bergabung Sekarang (Gratis)</Link>
                  </Button>
                </div>
              </div>

              {/* --- Kanan: Statistik Berbentuk Kartu Melayang --- */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                
                <div className="group bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[32px] hover:bg-white/10 transition-all duration-300 hover:-translate-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#3BCBBE] to-[#2aa89d] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <FaUser className="text-white text-xl" />
                  </div>
                  <div className="text-4xl font-black text-white mb-2 tracking-tighter">
                    <AnimatedCounter target={10} suffix="K+" />
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tamu Bahagia</div>
                </div>
                
                {/* Efek Stagger (Berjenjang) pada kartu tengah */}
                <div className="group bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[32px] hover:bg-white/10 transition-all duration-300 hover:-translate-y-3 sm:mt-12">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#d48806] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <FaCalendarCheck className="text-white text-xl" />
                  </div>
                  <div className="text-4xl font-black text-white mb-2 tracking-tighter">
                    <AnimatedCounter target={7} />
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tahun Melayani</div>
                </div>

                <div className="group bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[32px] hover:bg-white/10 transition-all duration-300 hover:-translate-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#3BCBBE] to-[#2aa89d] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <FaStar className="text-white text-xl" />
                  </div>
                  <div className="text-4xl font-black text-white mb-2 tracking-tighter">
                    <AnimatedCounter target={98} suffix="%" />
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rating Kepuasan</div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== PROMOSI ===== */}
      <ScrollReveal>
        <section className="py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Penawaran <span className="font-serif italic text-gray-600">Spesial</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <Card className="overflow-hidden rounded-[32px] border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group cursor-pointer">
              <CardContent className="p-10 flex flex-col sm:flex-row gap-8 items-center">
                <div className="w-24 h-24 bg-[#3BCBBE]/10 rounded-full flex items-center justify-center text-[#3BCBBE] text-4xl shadow-inner group-hover:scale-110 transition-transform">
                  <FaHeart />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">Paket Bulan Madu</h3>
                  <p className="text-gray-500 mb-6 font-light">
                    Dekorasi romantis, makan malam lilin, dan perawatan spa pasangan eksklusif.
                  </p>
                  <span className="text-[#3BCBBE] font-bold text-sm uppercase tracking-wider flex items-center justify-center sm:justify-start">
                    Lihat Detail <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden rounded-[32px] border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group cursor-pointer">
              <CardContent className="p-10 flex flex-col sm:flex-row gap-8 items-center">
                <div className="w-24 h-24 bg-[#F5A623]/10 rounded-full flex items-center justify-center text-[#F5A623] text-4xl shadow-inner group-hover:scale-110 transition-transform">
                  <FaGift />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">Family Getaway</h3>
                  <p className="text-gray-500 mb-6 font-light">
                    Kamar penghubung luas, sarapan gratis untuk anak, dan akses penuh ke kids club.
                  </p>
                  <span className="text-[#F5A623] font-bold text-sm uppercase tracking-wider flex items-center justify-center sm:justify-start">
                    Lihat Detail <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-20 bg-[#F8F9FA] rounded-[32px] p-10 md:p-16 text-center border border-gray-100 shadow-sm">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Tetap Terhubung</h3>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto font-light text-lg">
              Berlangganan newsletter kami untuk mendapatkan penawaran rahasia dan pembaruan eksklusif.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Alamat email Anda"
                className="flex-1 rounded-full px-6 py-6 border-gray-200 shadow-sm text-center sm:text-left focus:ring-[#3BCBBE]"
              />
              <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 py-6 font-bold shadow-lg w-full sm:w-auto mt-3 sm:mt-0">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== FAQ ===== */}
      <ScrollReveal>
        <section className="bg-white py-32 px-4 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center font-serif">
              Pertanyaan Umum
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-gray-100 rounded-2xl px-6 bg-[#F8F9FA]">
                <AccordionTrigger className="hover:no-underline font-bold text-gray-800 py-6">
                  Apakah saya bisa meminta late check-out?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light pb-6 leading-relaxed">
                  Ya, late check-out tersedia berdasarkan ketersediaan kamar di hari tersebut. Member Gold dan Platinum mendapatkan prioritas late check-out hingga pukul 14:00 secara gratis. Silakan hubungi resepsionis kami.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-gray-100 rounded-2xl px-6 bg-[#F8F9FA]">
                <AccordionTrigger className="hover:no-underline font-bold text-gray-800 py-6">
                  Bagaimana cara mengakses Wi-Fi kecepatan tinggi?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light pb-6 leading-relaxed">
                  Wi-Fi gratis tersedia tanpa batas di seluruh area hotel dan resor. Anda akan menerima kode akses unik saat proses check-in, atau Anda dapat melihatnya di portal member Anda.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-gray-100 rounded-2xl px-6 bg-[#F8F9FA]">
                <AccordionTrigger className="hover:no-underline font-bold text-gray-800 py-6">
                  Apakah hotel menerima hewan peliharaan (Pet-friendly)?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light pb-6 leading-relaxed">
                  Untuk menjaga kenyamanan seluruh tamu, saat ini kami belum mengizinkan hewan peliharaan masuk ke area hotel, terkecuali untuk hewan pemandu (service animals) dengan sertifikat resmi.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="text-center mt-16">
              <p className="text-gray-500 mb-6 font-light">Butuh bantuan lain? Tim kami siap melayani Anda 24/7.</p>
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-3 rounded-full px-10 py-7 text-lg shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:scale-105 transition-all">
                <FaWhatsapp className="text-2xl" /> Hubungi via WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== LOKASI & KONTAK ===== */}
      <ScrollReveal>
        <section id="contact" className="py-32 px-4 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[#3BCBBE] font-bold tracking-[0.2em] uppercase text-sm mb-4">Kontak</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 font-serif">
                Lokasi Kami
              </h2>
              <div className="rounded-[32px] overflow-hidden shadow-2xl h-80 mb-8 border border-gray-100">
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
              <div className="space-y-5">
                <div className="flex items-center gap-5 text-gray-700">
                  <div className="w-12 h-12 rounded-full bg-[#F8F9FA] flex items-center justify-center text-[#3BCBBE]"><FaMapMarkerAlt className="text-xl" /></div>
                  <span className="font-medium">Jl. Sudirman No. 45, Jakarta Pusat 10220</span>
                </div>
                <div className="flex items-center gap-5 text-gray-700">
                  <div className="w-12 h-12 rounded-full bg-[#F8F9FA] flex items-center justify-center text-[#3BCBBE]"><FaPhoneAlt className="text-xl" /></div>
                  <span className="font-medium">+62 21 1234 5678</span>
                </div>
                <div className="flex items-center gap-5 text-gray-700">
                  <div className="w-12 h-12 rounded-full bg-[#F8F9FA] flex items-center justify-center text-[#3BCBBE]"><FaEnvelope className="text-xl" /></div>
                  <span className="font-medium">cs@capellahotel.com</span>
                </div>
              </div>
            </div>

            <div>
              <Card className="p-8 md:p-12 rounded-[32px] shadow-2xl border-0 bg-white h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Kirim Pesan</h3>
                <CardContent className="p-0 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nama Lengkap</label>
                    <Input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="rounded-xl border-gray-200 px-4 py-6 bg-[#F8F9FA] focus:bg-white focus:ring-[#3BCBBE]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <Input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="rounded-xl border-gray-200 px-4 py-6 bg-[#F8F9FA] focus:bg-white focus:ring-[#3BCBBE]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pesan</label>
                    <Textarea
                      rows={5}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="rounded-xl border-gray-200 px-4 py-4 bg-[#F8F9FA] focus:bg-white focus:ring-[#3BCBBE] resize-none"
                    />
                  </div>
                  <Button
                    onClick={handleContact}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-7 text-base font-bold shadow-lg transition-all hover:-translate-y-1"
                  >
                    Kirim Pesan Sekarang
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== POP-UP DETAIL KAMAR (MODAL) ===== */}
      <AnimatePresence>
        {selectedRoom && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedRoom(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Tombol Close */}
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 transition-colors shadow-sm"
              >
                <FaTimes />
              </button>

              {/* Kiri: Gambar Kamar */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative flex-shrink-0">
                <img src={selectedRoom.img} alt={selectedRoom.type} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              </div>

              {/* Kanan: Detail & Form Booking */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <div>
                  <p className="text-[#3BCBBE] font-bold tracking-[0.2em] uppercase text-xs mb-2">Room Details</p>
                  <h3 className="text-3xl font-bold font-serif text-gray-900 mb-2">{selectedRoom.type}</h3>
                  <p className="text-3xl font-black text-gray-900 mb-6">{selectedRoom.price} <span className="text-sm text-gray-500 font-medium font-sans">/ malam</span></p>
                  <p className="text-gray-600 leading-relaxed font-light mb-8">{selectedRoom.desc}</p>
                  
                  <div className="space-y-4 mb-10">
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Fasilitas Kamar:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 font-medium">
                      {selectedRoom.amenities.map((amenity, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <FaCheckCircle className="text-[#3BCBBE] flex-shrink-0" /> {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100">
                  <Button asChild className="w-full bg-[#0F1729] hover:bg-[#1a2332] text-white py-7 rounded-xl text-base font-bold shadow-[0_10px_30px_rgba(15,23,41,0.2)] hover:-translate-y-1 transition-transform cursor-pointer">
                    <Link to="/login">Login untuk Booking</Link>
                  </Button>
                  <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                    Hanya member Capella yang dapat melakukan reservasi eksklusif.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LandingPage;