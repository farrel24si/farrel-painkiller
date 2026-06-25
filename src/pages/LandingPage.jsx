import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed, FaSwimmingPool, FaSpa, FaDumbbell, FaParking, FaUtensils,
  FaWifi, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaWhatsapp, FaArrowRight, FaUser, FaCalendarCheck, FaGift, FaHeart,
  FaSearch, FaQuoteLeft, FaTimes, FaCheckCircle, FaCommentDots, FaShieldAlt, FaFileContract
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
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${className}`}
    >
      {children}
    </div>
  );
}

// ======================= LANDING PAGE =======================
const LandingPage = () => {
  const navigate = useNavigate();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const heroRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (selectedRoom || selectedPromo || selectedPolicy) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedRoom, selectedPromo]);

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
    { icon: <FaSwimmingPool />, name: "Infinity Pool", desc: "Kolam renang tanpa batas dengan pemandangan cakrawala." },
    { icon: <FaSpa />, name: "Holistic Spa", desc: "Rangkaian perawatan spa holistik untuk relaksasi total." },
    { icon: <FaDumbbell />, name: "Fitness Center", desc: "Peralatan gym modern dan area latihan beban lengkap." },
    { icon: <FaUtensils />, name: "Fine Dining", desc: "Restoran elegan dengan menu khas internasional." },
    { icon: <FaParking />, name: "Valet Parking", desc: "Layanan parkir valet siap sedia untuk kenyamanan Anda." },
    { icon: <FaWifi />, name: "High-Speed Wi-Fi", desc: "Internet ultra‑cepat gratis di seluruh area hotel." },
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
    {
      name: "Siti Rahayu",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      text: "Presidential Suite-nya luar biasa! Fasilitas lengkap dan butler-nya sangat profesional.",
      response: "Terima kasih, Siti! Kami selalu berusaha memberikan yang terbaik. 💚",
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

  const promos = [
    {
      id: "honeymoon",
      title: "Paket Bulan Madu",
      desc: "Dekorasi romantis, makan malam lilin, dan perawatan spa pasangan eksklusif.",
      features: ["Dekorasi Bunga Romantis", "Candle Light Dinner", "Spa Treatment Pasangan", "Late Check-out"],
      icon: <FaHeart />,
      color: "text-[#3BCBBE]",
      bg: "bg-[#3BCBBE]/10",
      img: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "family",
      title: "Family Getaway",
      desc: "Kamar penghubung luas, sarapan gratis untuk anak, dan akses penuh ke kids club.",
      features: ["Connecting Room", "Gratis Sarapan untuk Anak", "Akses Kids Club", "Tiket Wahana Terdekat"],
      icon: <FaGift />,
      color: "text-[#F5A623]",
      bg: "bg-[#F5A623]/10",
      img: "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleContact = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setToastMessage(`Pesan dari ${contactName} telah dikirim.`);
    setContactName("");
    setContactEmail("");
    setContactMessage("");
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleNavigateToLogin = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/login");
      setIsNavigating(false);
    }, 1500); 
  };

  return (
    <div className="bg-[#F8F9FA] font-sans antialiased text-gray-800">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
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
        .animate-draw { animation: draw 2s ease-in-out forwards; }
        .animate-fade-in-down { animation: fadeInDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* ===== HERO SECTION – DEKORASI DIKURANGI ===== */}
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
        </div>

        {/* Hanya satu blob atmosfer, bukan hiasan kosong */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-[#3BCBBE]/10 to-purple-500/10 rounded-full blur-3xl" style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }} />
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
                  5-Star Serenity
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

      <PartnerMarquee />

      {/* ===== EDITORIAL ABOUT SECTION ===== */}
      <ScrollReveal>
        <section className="py-32 px-4 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="pr-4 md:pr-12">
              <p className="text-[#3BCBBE] font-bold tracking-[0.2em] uppercase text-sm mb-4">The Capella Story</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Tempat Di Mana <br />
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

      {/* ===== ROOM TYPES ===== */}
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

      {/* ===== FACILITIES – DITAMBAH DESKRIPSI ===== */}
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
                {fac.desc && (
                  <p className="text-xs text-gray-500 text-center mt-2 leading-relaxed group-hover:text-white/80 transition-colors max-w-[180px]">
                    {fac.desc}
                  </p>
                )}
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
                  className={`overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group ${idx === 0 || idx === 3 ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"
                    }`}
                >
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={src}
                      alt={`Gallery ${idx + 1}`}
                      title={`Capella Hotel Gallery ${idx + 1}`}
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

      {/* ===== CAPELLA REWARDS ===== */}
      <ScrollReveal>
        <section className="relative bg-[#0F1729] text-white py-32 px-4 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3BCBBE]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F5A623]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <p className="text-[#3BCBBE] font-bold tracking-[0.2em] uppercase text-xs mb-3">Loyalty Program</p>
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
                <div className="pt-6">
                  <Button asChild className="bg-[#3BCBBE] hover:bg-[#2aa89d] text-white rounded-full px-10 py-7 text-base font-bold shadow-[0_8px_30px_rgba(59,203,190,0.3)] transition-all hover:scale-105 hover:shadow-[0_8px_40px_rgba(59,203,190,0.5)] cursor-pointer">
                    <Link to="/register">Bergabung Sekarang (Gratis)</Link>
                  </Button>
                </div>
              </div>
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
            {promos.map((promo) => (
              <Card key={promo.id} onClick={() => setSelectedPromo(promo)} className="overflow-hidden rounded-[32px] border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group cursor-pointer">
                <CardContent className="p-10 flex flex-col sm:flex-row gap-8 items-center">
                  <div className={`w-24 h-24 ${promo.bg} rounded-full flex items-center justify-center ${promo.color} text-4xl shadow-inner group-hover:scale-110 transition-transform`}>
                    {promo.icon}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">{promo.title}</h3>
                    <p className="text-gray-500 mb-6 font-light">
                      {promo.desc}
                    </p>
                    <span className={`${promo.color} font-bold text-sm uppercase tracking-wider flex items-center justify-center sm:justify-start`}>
                      Lihat Detail <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== FAQ – JAWABAN DIPERSINGKAT ===== */}
      <ScrollReveal>
        <section className="bg-white py-32 px-4 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center font-serif">
              Pertanyaan Umum
            </h2>
            <div className="w-full space-y-4">
              {[
                { id: "faq1", q: "Apakah saya bisa meminta late check-out?", a: "Ya, tergantung ketersediaan. Member Gold & Platinum bisa gratis hingga pukul 14.00." },
                { id: "faq2", q: "Bagaimana cara mengakses Wi-Fi kecepatan tinggi?", a: "Wi-Fi ultra‑cepat gratis di seluruh area hotel. Kode akses diberikan saat check-in." },
                { id: "faq3", q: "Apakah hotel menerima hewan peliharaan?", a: "Kami belum menerima hewan peliharaan, kecuali hewan pemandu bersertifikat resmi." },
              ].map((faq) => (
                <div key={faq.id} className="border border-gray-100 rounded-2xl bg-[#F8F9FA] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full text-left font-bold text-gray-800 py-6 px-6 cursor-pointer flex justify-between items-center"
                  >
                    {faq.q}
                    <span className="text-gray-400 text-sm">{openFaq === faq.id ? 'Tutup' : 'Buka'}</span>
                  </button>
                  {openFaq === faq.id && (
                    <div className="text-gray-600 font-light pb-6 px-6 leading-relaxed animate-fade-in-down">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <p className="text-gray-500 mb-6 font-light">Butuh bantuan lain? Tim kami siap melayani Anda 24/7.</p>
              <Button onClick={() => window.dispatchEvent(new Event("open-sahaja-ai"))} className="bg-gradient-to-r from-[#313860] to-[#3BCBBE] hover:opacity-90 text-white gap-3 rounded-full px-10 py-7 text-lg shadow-[0_10px_30px_rgba(59,203,190,0.3)] hover:scale-105 transition-all cursor-pointer">
                <FaCommentDots className="text-2xl" /> Tanya SAHAJA AI
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== KEBIJAKAN PRIVASI & SYARAT KETENTUAN ===== */}
      <ScrollReveal>
        <section id="policy" className="py-20 px-4 max-w-7xl mx-auto border-t border-gray-100">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex items-start gap-6">
              <div className="w-16 h-16 bg-[#3BCBBE]/10 rounded-2xl flex items-center justify-center text-[#3BCBBE] text-2xl flex-shrink-0">
                <FaShieldAlt />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">Kebijakan Privasi</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-4">
                  Kami sangat menghargai privasi Anda. Semua data tamu dan transaksi dilindungi dengan standar keamanan enkripsi tertinggi.
                </p>
                <button onClick={() => setSelectedPolicy({ title: "Kebijakan Privasi", content: "Di Capella Hotel, privasi dan keamanan data Anda adalah prioritas utama kami. Kami mengumpulkan informasi pribadi seperti nama, alamat email, dan nomor telepon hanya untuk keperluan reservasi, peningkatan layanan, dan komunikasi terkait penawaran spesial. Semua data yang kami terima dilindungi menggunakan teknologi enkripsi terkini untuk mencegah akses tidak sah. Kami tidak akan menjual atau membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan eksplisit dari Anda, kecuali jika diwajibkan oleh hukum yang berlaku." })} className="text-[#3BCBBE] font-bold text-sm uppercase tracking-wider hover:underline cursor-pointer">Baca Selengkapnya</button>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex items-start gap-6">
              <div className="w-16 h-16 bg-[#F5A623]/10 rounded-2xl flex items-center justify-center text-[#F5A623] text-2xl flex-shrink-0">
                <FaFileContract />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">Syarat & Ketentuan</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-4">
                  Pelajari panduan layanan kami, kebijakan pembatalan, dan aturan menginap untuk memastikan pengalaman Anda berjalan lancar.
                </p>
                <button onClick={() => setSelectedPolicy({ title: "Syarat & Ketentuan", content: "Dengan melakukan reservasi di Capella Hotel, Anda menyetujui semua kebijakan dan panduan layanan kami. Waktu check-in standar adalah pukul 14:00 dan check-out pada pukul 12:00 siang. Pembatalan gratis berlaku jika dilakukan selambat-lambatnya 48 jam sebelum tanggal kedatangan; lewat dari itu, akan dikenakan biaya satu malam. Semua tamu diwajibkan menunjukkan kartu identitas resmi yang masih berlaku saat check-in. Setiap kerusakan fasilitas hotel yang disebabkan oleh kelalaian tamu akan dikenakan biaya tambahan sesuai dengan nilai perbaikan." })} className="text-[#F5A623] font-bold text-sm uppercase tracking-wider hover:underline cursor-pointer">Baca Selengkapnya</button>
              </div>
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

      {/* ===== POP-UP DETAIL KAMAR ===== */}
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
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 transition-colors shadow-sm"
              >
                <FaTimes />
              </button>
              <div className="w-full md:w-1/2 h-64 md:h-auto relative flex-shrink-0">
                <img src={selectedRoom.img} alt={selectedRoom.type} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              </div>
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
                  <Button onClick={handleNavigateToLogin} className="w-full bg-[#0F1729] hover:bg-[#1a2332] text-white py-7 rounded-xl text-base font-bold shadow-[0_10px_30px_rgba(15,23,41,0.2)] hover:-translate-y-1 transition-transform cursor-pointer">
                    Login untuk Booking
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

      {/* ===== POP-UP DETAIL PROMO ===== */}
      <AnimatePresence>
        {selectedPromo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedPromo(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              <button
                onClick={() => setSelectedPromo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 transition-colors shadow-sm cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative flex-shrink-0">
                <img src={selectedPromo.img} alt={selectedPromo.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <div>
                  <p className={`${selectedPromo.color} font-bold tracking-[0.2em] uppercase text-xs mb-2`}>Special Offer</p>
                  <h3 className="text-3xl font-bold font-serif text-gray-900 mb-6">{selectedPromo.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light mb-8">{selectedPromo.desc}</p>
                  
                  <div className="space-y-4 mb-10">
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Keuntungan Paket:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 font-medium">
                      {selectedPromo.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <FaCheckCircle className={selectedPromo.color} /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100">
                  <Button onClick={handleNavigateToLogin} className="w-full bg-[#0F1729] hover:bg-[#1a2332] text-white py-7 rounded-xl text-base font-bold shadow-[0_10px_30px_rgba(15,23,41,0.2)] hover:-translate-y-1 transition-transform cursor-pointer">
                    Klaim Promo Ini
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== POP-UP KEBIJAKAN PRIVASI & S&K ===== */}
      <AnimatePresence>
        {selectedPolicy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedPolicy(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden z-10 p-10 flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedPolicy(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-800 transition-colors shadow-sm cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="overflow-y-auto pr-4 mt-2">
                <div className="w-16 h-16 bg-[#3BCBBE]/10 rounded-2xl flex items-center justify-center text-[#3BCBBE] text-3xl mb-6">
                  {selectedPolicy.title === "Kebijakan Privasi" ? <FaShieldAlt /> : <FaFileContract />}
                </div>
                <h3 className="text-3xl font-bold font-serif text-gray-900 mb-6">{selectedPolicy.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light mb-8 whitespace-pre-line text-lg">
                  {selectedPolicy.content}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST CUSTOM */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[200] flex items-center gap-3 font-medium"
          >
            <FaCheckCircle className="text-[#3BCBBE] text-xl" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN LOADING */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#3BCBBE] rounded-full animate-spin"></div>
            <p className="mt-6 text-gray-500 font-bold tracking-widest uppercase text-sm animate-pulse">
              Memuat Halaman...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;