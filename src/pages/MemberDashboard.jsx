import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BedDouble, Gem, CheckCircle2, XCircle, Clock, Star,
  CalendarDays, Crown, Medal, Trophy, ChevronRight,
  Compass, ArrowRight, CheckCircle, MapPin, X, Users
} from "lucide-react";

// ─── DATA KAMAR & TIER ────────────────────────────────────────────────────────
const roomsData = [
  {
    id: "deluxe",
    type: "Deluxe Suite",
    price: "$450",
    img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Kamar luas dengan pemandangan kota, tempat tidur king, dan bathtub marble.",
    amenities: ["Smart TV 55\"", "Akses Lounge Member"]
  },
  {
    id: "standard",
    type: "Standard Room",
    price: "$150",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Kamar nyaman untuk perjalanan bisnis, dilengkapi meja kerja dan Wi-Fi cepat.",
    amenities: ["Meja Kerja Ergonomis", "Mesin Nespresso"]
  },
  {
    id: "presidential",
    type: "Presidential Suite",
    price: "$1,200",
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Kemewahan tingkat atas dengan ruang tamu pribadi dan kolam renang eksklusif.",
    amenities: ["Private Pool", "Butler Pribadi 24/7"]
  },
];

const TIERS = [
  { name: "Silver", min: 0, max: 1999, color: "#A8A8A8", Icon: Medal,
    perks: ["Diskon 5% Kamar", "Late checkout 1 jam"] },
  { name: "Gold", min: 2000, max: 4999, color: "#F5A623", Icon: Trophy,
    perks: ["Diskon 10% Kamar", "Priority check-in", "Welcome amenity"] },
  { name: "Platinum", min: 5000, max: 99999, color: "#3BCBBE", Icon: Gem,
    perks: ["Diskon 15% Kamar", "Free room upgrade", "Dedicated concierge"] },
];

function getTier(points) {
  return TIERS.find(t => points >= t.min && points <= t.max) || TIERS[0];
}
function calcPoints(bookings) {
  return bookings.filter(b => b.status === "Checked-Out").reduce((sum, b) => sum + (b.price * 10), 0);
}

// Helper untuk format YYYY-MM-DD
const getTodayString = () => new Date().toISOString().split('T')[0];
const getTomorrowString = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

// ─── KOMPONEN UTAMA ───────────────────────────────────────────────────────────
export default function MemberDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  
  // State Modal & Filter Booking
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingFilter, setBookingFilter] = useState({
    checkIn: getTodayString(),
    checkOut: getTomorrowString(),
    guests: 2
  });
  
  // Hitung jumlah malam secara dinamis
  const calculateNights = () => {
    const start = new Date(bookingFilter.checkIn);
    const end = new Date(bookingFilter.checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1; // Minimal 1 malam
  };
  const nights = calculateNights();

  const [bookingsList, setBookingsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const API_URL = "https://pnpdzlpxlathfnfzgdol.supabase.co/rest/v1/bookings";
  const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucGR6bHB4bGF0aGZuZnpnZG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzg3MTAsImV4cCI6MjA5NjkxNDcxMH0.wQ6qy7pi1oPUcp0t-oCNyfUPirlZHew-gnfXdt7yc90";

  const fetchBookings = async (userId) => {
    try {
      setIsFetching(true);
      const { default: axios } = await import("axios");
      const { data } = await axios.get(
        `${API_URL}?user_id=eq.${userId}&order=created_at.desc`,
        { headers: { apikey: API_KEY, Authorization: `Bearer ${API_KEY}` } }
      );
      setBookingsList(data);
    } catch (error) {
      console.error("Gagal mengambil data booking:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (!session) { navigate("/login"); return; }
    
    const parsedUser = JSON.parse(session);
    setUser(parsedUser);
    fetchBookings(parsedUser.id);
  }, [navigate]);

  useEffect(() => {
    if (isBookingOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isBookingOpen]);

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3500);
  };

  const handleBookRoom = async (room) => {
    try {
      showAlert("success", "Sedang memproses reservasi...");
      const { default: axios } = await import("axios");
      
      const basePrice = parseInt(room.price.replace(/[^0-9]/g, ''), 10);
      const totalPrice = basePrice * nights; // Hitung total harga x malam

      const payload = {
        user_id: user.id,
        roomType: room.type,
        checkIn: bookingFilter.checkIn,
        checkOut: bookingFilter.checkOut,
        price: totalPrice,
        status: "Confirmed"
      };

      await axios.post(API_URL, payload, {
        headers: { 
          apikey: API_KEY, 
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        }
      });

      setIsBookingOpen(false);
      showAlert("success", `Reservasi ${room.type} untuk ${nights} malam berhasil dibuat!`);
      
      fetchBookings(user.id);
      
    } catch (error) {
      console.error(error);
      showAlert("error", "Terjadi kesalahan saat memproses reservasi.");
    }
  };

  if (!user) return null;

  const points      = calcPoints(bookingsList);
  const currentTier = getTier(points);
  const nextTier    = TIERS[TIERS.indexOf(currentTier) + 1] || null;
  const progress    = nextTier ? Math.round(((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100) : 100;
  const poinNeeded  = nextTier ? nextTier.min - points : 0;

  const total       = bookingsList.filter(b => b.status === "Checked-Out").reduce((s, b) => s + b.price, 0);
  const upcoming    = bookingsList.filter(b => b.status === "Confirmed");
  const totalStay   = bookingsList.filter(b => b.status === "Checked-Out").length;

  const statusStyles = {
    "Checked-Out": "text-[#48BB78] bg-[#48BB78]/10 border border-[#48BB78]/20",
    "Confirmed":   "text-[#3BCBBE] bg-[#3BCBBE]/10 border border-[#3BCBBE]/20",
    "Cancelled":   "text-[#E53E3E] bg-[#E53E3E]/10 border border-[#E53E3E]/20",
  };

  return (
    <div className="relative min-h-screen pb-20 bg-[#F8F9FA]">
      
      {/* Alert global */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring" }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-full shadow-lg font-bold text-sm flex items-center gap-3 backdrop-blur-xl border border-white/20 ${
              alert.type === "success" ? "bg-[#48BB78]/90 text-white" : "bg-[#E53E3E]/90 text-white"
            }`}
          >
            {alert.type === "success" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            {alert.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-10 max-w-7xl mx-auto px-4 md:px-8 mt-6">
        
        {/* ========================================================================= */}
        {/* 1. HERO KARTU MEMBER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] shadow-2xl bg-[#0a0f1e] p-8 md:p-12 border border-gray-800"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-center mix-blend-screen" />
            <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-[#3BCBBE]/20 to-transparent opacity-60 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-[#F5A623]/15 to-transparent opacity-60 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-10 text-white">
            
            <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-full border border-white/20 flex items-center justify-center text-4xl font-black bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 bg-[#0a0f1e] rounded-full p-1.5 border border-white/10">
                  <Crown size={16} className="text-[#F5A623]" />
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <p className="text-[#3BCBBE] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                  Selamat Datang Kembali
                </p>
                <h1 className="text-4xl md:text-5xl font-serif italic mb-3 font-light text-white drop-shadow-md">
                  {user.name}
                </h1>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-1 mb-4">
                  <span className="flex items-center gap-1.5 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold">
                    <currentTier.Icon size={14} style={{ color: currentTier.color }} />
                    {currentTier.name} Member
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 border border-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium text-white/70">
                    <CalendarDays size={13} className="text-[#3BCBBE]" />
                    Bergabung {user.created_at ? new Date(user.created_at).getFullYear() : "2026"}
                  </span>
                </div>

                <p className="text-gray-400 text-sm max-w-md font-light leading-relaxed">
                  Nikmati pengalaman menginap eksklusif dengan berbagai keistimewaan yang dirancang khusus untuk menyempurnakan setiap momen perjalanan Anda.
                </p>
              </div>
            </div>
            
            <div className="w-full lg:w-80 text-center flex flex-col justify-center bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[24px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full" />
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Total Saldo Poin</p>
              <p className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {points.toLocaleString("id-ID")}
              </p>
              
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="mt-6 w-full bg-gradient-to-r from-[#3BCBBE] to-[#2aa89d] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_5px_20px_rgba(59,203,190,0.4)] hover:shadow-[0_8px_30px_rgba(59,203,190,0.6)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group relative z-10"
              >
                <Compass size={16} className="group-hover:rotate-45 transition-transform" /> 
                Pesan Kamar Baru
              </button>
            </div>
            
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. SECTION: STATUS MENGINAP (Muncul jika ada pesanan mendatang) */}
        {/* ========================================================================= */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-serif">Status <span className="italic font-light text-gray-500">Reservasi</span></h2>
          </div>
          
          {upcoming.length > 0 ? (
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#3BCBBE]" />
              
              <div className="flex-shrink-0 relative">
                <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Room" className="w-48 h-32 object-cover rounded-2xl shadow-md" />
                <div className="absolute -top-3 -right-3 bg-[#3BCBBE] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg border-2 border-white">Mendatang</div>
              </div>
              
              <div className="flex-1 w-full">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">ID: {upcoming[0].id.substring(0, 8)}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">{upcoming[0].roomType}</h3>
                
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#3BCBBE]"><CalendarDays size={14} /></div>
                    <div className="text-sm font-medium">{upcoming[0].checkIn} <span className="text-gray-400 font-light mx-1">s/d</span> {upcoming[0].checkOut}</div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#3BCBBE]"><MapPin size={14} /></div>
                    <div className="text-sm font-medium">Capella Jakarta</div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto text-center md:text-right border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Biaya</p>
                <p className="text-3xl font-black text-gray-900 mb-4">${upcoming[0].price}</p>
                <button className="w-full md:w-auto px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                  Lihat Detail
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <BedDouble size={24} />
              </div>
              <p className="text-gray-500 font-medium mb-4">Anda belum memiliki rencana perjalanan mendatang.</p>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="text-[#3BCBBE] font-bold text-sm uppercase tracking-widest hover:underline"
              >
                Mulai Perjalanan Anda →
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. SECTION: METRIK & RIWAYAT */}
        {/* ========================================================================= */}
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 font-serif">Riwayat <span className="italic font-light text-gray-500">Reservasi</span></h2>
            
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto p-2">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr>
                      {["Akomodasi", "Tanggal", "Total", "Status"].map(h => (
                        <th key={h} className="pb-4 pt-6 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {bookingsList.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-10 text-gray-400 text-sm">Belum ada riwayat reservasi.</td>
                      </tr>
                    ) : (
                      bookingsList.map(b => (
                        <tr key={b.id} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-5 px-6">
                            <p className="text-sm font-bold text-gray-900 font-serif">{b.roomType}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">ID: {b.id.substring(0, 8)}</p>
                          </td>
                          <td className="py-5 px-6 text-gray-500">
                            <span className="block text-xs font-bold text-gray-700">{b.checkIn}</span>
                            <span className="text-[10px] text-gray-400">s/d {b.checkOut}</span>
                          </td>
                          <td className="py-5 px-6 text-sm font-bold text-gray-900">${b.price}</td>
                          <td className="py-5 px-6">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[b.status] || statusStyles["Confirmed"]}`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 font-serif">Ringkasan</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Malam Menginap</p>
                  <p className="text-3xl font-black text-gray-900">{totalStay}</p>
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform"><BedDouble size={20} /></div>
              </div>
              
              <div className="bg-[#0a0f1e] p-6 rounded-[24px] shadow-md border border-gray-800 flex items-center justify-between text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#3BCBBE]/20 rounded-bl-full blur-md" />
                <div className="relative z-10">
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Total Investasi</p>
                  <p className="text-3xl font-black">${total.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-[#3BCBBE]/20 rounded-full flex items-center justify-center text-[#3BCBBE] relative z-10 group-hover:scale-110 transition-transform"><Gem size={20} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. SECTION: CAPELLA REWARDS */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-gray-200/60 mt-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-serif">Capella <span className="italic font-light text-gray-500">Rewards</span></h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 relative overflow-hidden rounded-[32px] shadow-lg bg-[#0a0f1e] p-8 text-white border border-gray-800 flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-[#3BCBBE]/20 to-transparent rounded-full blur-[60px] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg flex-shrink-0">
                    <currentTier.Icon size={32} style={{ color: currentTier.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status Member</p>
                    <h2 className="text-3xl font-serif italic text-white">{currentTier.name}</h2>
                  </div>
                </div>
                
                {nextTier ? (
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold text-white/50 tracking-wider uppercase">
                      <span>{points.toLocaleString()} Pts</span>
                      <span>{nextTier.min.toLocaleString()} Pts</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-[#F5A623] to-[#3BCBBE] rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Kumpulkan <span className="font-bold text-white">{poinNeeded.toLocaleString()} poin</span> lagi untuk tier <strong style={{color: nextTier.color}}>{nextTier.name}</strong>.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-[#3BCBBE] font-light italic font-serif mt-4">Anda telah mencapai puncak kemewahan. Nikmati seluruh layanan eksklusif Capella.</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TIERS.map(tier => {
                const isActive = tier.name === currentTier.name;
                return (
                  <div 
                    key={tier.name} 
                    className={`relative p-6 rounded-[24px] flex flex-col ${
                      isActive ? "bg-white shadow-md border border-[#3BCBBE]/30" : "bg-white/50 border border-gray-100"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-4 right-4 text-[#3BCBBE] text-[10px] font-bold uppercase tracking-widest bg-[#3BCBBE]/10 px-3 py-1 rounded-full">
                        Aktif
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                      <tier.Icon size={20} style={{ color: tier.color }} />
                      <div>
                        <h4 className="text-lg font-serif italic font-bold text-gray-900">{tier.name}</h4>
                      </div>
                    </div>

                    <ul className="space-y-3 flex-1">
                      {tier.perks.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className={`flex-shrink-0 mt-0.5 ${isActive ? "text-[#3BCBBE]" : "text-gray-300"}`} />
                          <span className={`text-xs leading-relaxed ${isActive ? 'text-gray-700 font-medium' : 'text-gray-500 font-light'}`}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* POP-UP (MODAL) RESERVASI KAMAR DINAMIS */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsBookingOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#F8F9FA] w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header Modal & Global Filter Tanggal */}
              <div className="p-6 md:px-8 border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-gray-900">Pilih Akomodasi</h3>
                  <p className="text-xs text-gray-500 mt-1 font-light">Tentukan tanggal untuk melihat harga total.</p>
                </div>
                
                {/* Form Filter Tanggal & Tamu */}
                <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Check-in</label>
                    <input 
                      type="date" 
                      min={getTodayString()}
                      value={bookingFilter.checkIn}
                      onChange={(e) => setBookingFilter({...bookingFilter, checkIn: e.target.value})}
                      className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#3BCBBE] text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Check-out</label>
                    <input 
                      type="date" 
                      min={bookingFilter.checkIn}
                      value={bookingFilter.checkOut}
                      onChange={(e) => setBookingFilter({...bookingFilter, checkOut: e.target.value})}
                      className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#3BCBBE] text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tamu</label>
                    <input 
                      type="number" 
                      min="1"
                      value={bookingFilter.guests}
                      onChange={(e) => setBookingFilter({...bookingFilter, guests: e.target.value})}
                      className="w-16 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#3BCBBE] text-gray-700"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body Modal (Katalog Kamar) */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                {roomsData.map((room) => {
                  const basePrice = parseInt(room.price.replace(/[^0-9]/g, ''), 10);
                  const totalRoomPrice = basePrice * nights;

                  return (
                    <div key={room.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row group">
                      <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                        <img src={room.img} alt={room.type} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 left-3 bg-[#3BCBBE] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                          Member Rate
                        </div>
                      </div>
                      
                      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 font-serif">{room.type}</h4>
                              <p className="text-xs text-[#3BCBBE] font-bold">{room.price} / malam</p>
                            </div>
                            <div className="text-right bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Total ({nights} Malam)</span>
                              <span className="text-xl font-black text-gray-900">${totalRoomPrice.toLocaleString()}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mb-4 leading-relaxed font-light">{room.desc}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities.map((amenity, i) => (
                              <span key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                <CheckCircle size={10} className="text-[#3BCBBE]" /> {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleBookRoom(room)}
                          className="w-full sm:w-auto self-end bg-[#0F1729] hover:bg-[#1a2332] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          Pesan Kamar Ini <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}