import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usersAPI } from "../services/usersAPI";
import {
  FaUser, FaLock, FaBed, FaGem, FaSignOutAlt,
  FaCheckCircle, FaTimesCircle, FaClock, FaStar,
  FaEdit, FaSave, FaTimes, FaShieldAlt, FaCalendarAlt
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

// ─── DATA DUMMY RIWAYAT BOOKING ───────────────────────────────────────────────
const dummyBookings = [
  { id: "BKG-2026001", roomType: "Deluxe Suite",       checkIn: "2026-01-10", checkOut: "2026-01-13", status: "Checked-Out", price: 1350 },
  { id: "BKG-2026002", roomType: "Standard Room",      checkIn: "2026-03-05", checkOut: "2026-03-07", status: "Checked-Out", price: 300  },
  { id: "BKG-2026003", roomType: "Presidential Suite", checkIn: "2026-05-20", checkOut: "2026-05-22", status: "Confirmed",   price: 2400 },
  { id: "BKG-2026004", roomType: "Deluxe Suite",       checkIn: "2026-06-30", checkOut: "2026-07-02", status: "Confirmed",   price: 900  },
  { id: "BKG-2026005", roomType: "Standard Room",      checkIn: "2025-11-15", checkOut: "2025-11-16", status: "Cancelled",   price: 150  },
];

// ─── CAPELLA REWARDS CONFIG ───────────────────────────────────────────────────
const TIERS = [
  { name: "Silver",   min: 0,    max: 1999,  color: "#A8A8A8", bg: "#F5F5F5",    icon: "🥈", perks: ["Diskon 5% untuk semua kamar", "Late checkout 1 jam", "Welcome drink"] },
  { name: "Gold",     min: 2000, max: 4999,  color: "#F5A623", bg: "#FFF8EC",    icon: "🥇", perks: ["Diskon 10% untuk semua kamar", "Late checkout 2 jam", "Welcome amenity basket", "Priority check-in"] },
  { name: "Platinum", min: 5000, max: 99999, color: "#3BCBBE", bg: "#E8FAFA",    icon: "💎", perks: ["Diskon 15% untuk semua kamar", "Free room upgrade", "Airport transfer gratis", "Dedicated concierge", "Free minibar"] },
];

function getTier(points) {
  return TIERS.find(t => points >= t.min && points <= t.max) || TIERS[0];
}

// Setiap $1 = 10 poin (berdasarkan riwayat booking yang sudah Checked-Out)
function calcPoints(bookings) {
  return bookings
    .filter(b => b.status === "Checked-Out")
    .reduce((sum, b) => sum + b.price * 10, 0);
}

// ─── KOMPONEN UTAMA ───────────────────────────────────────────────────────────
export default function Profile() {
  const navigate  = useNavigate();
  const [user, setUser]     = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  // Alert global
  const [alert, setAlert]   = useState(null); // { type: "success"|"error", msg: "..." }

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (!session) { navigate("/login"); return; }
    setUser(JSON.parse(session));
  }, [navigate]);

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3500);
  };

  if (!user) return null;

  const points      = calcPoints(dummyBookings);
  const currentTier = getTier(points);
  const nextTier    = TIERS[TIERS.indexOf(currentTier) + 1] || null;
  const progress    = nextTier
    ? Math.round(((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100)
    : 100;

  const tabs = [
    { id: "profile",   label: "Profil Saya",     icon: <FaUser /> },
    { id: "password",  label: "Ganti Password",  icon: <FaLock /> },
    { id: "bookings",  label: "Riwayat Booking", icon: <FaBed /> },
    { id: "rewards",   label: "Capella Rewards",  icon: <FaGem /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Helvetica']">

      {/* ── TOP NAV ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <span className="text-xl font-bold text-[#3BCBBE]">Capella Hotel</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#3BCBBE] transition-colors"
          >
            <MdSpaceDashboard /> Dashboard
          </button>
          <button
            onClick={() => { localStorage.removeItem("userSession"); navigate("/login"); }}
            className="flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-600 transition-colors"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* ── GLOBAL ALERT ── */}
      {alert && (
        <div className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-[12px] shadow-lg font-bold text-sm flex items-center gap-2 transition-all ${
          alert.type === "success"
            ? "bg-[#48BB78]/10 border border-[#48BB78]/30 text-[#48BB78]"
            : "bg-[#E53E3E]/10 border border-[#E53E3E]/30 text-[#E53E3E]"
        }`}>
          {alert.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
          {alert.msg}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ── HERO KARTU MEMBER ── */}
        <div
          className="rounded-[20px] p-8 mb-8 text-white shadow-lg overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #313860 0%, #3BCBBE 100%)" }}
        >
          {/* dekoratif lingkaran */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-3xl font-black shadow-md flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-1">Selamat datang kembali</p>
              <h1 className="text-3xl font-black mb-1">{user.name}</h1>
              <p className="text-white/70 text-sm">{user.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                <span className="text-lg">{currentTier.icon}</span>
                <span className="font-bold text-sm bg-white/20 px-3 py-1 rounded-full">
                  {currentTier.name} Member
                </span>
              </div>
            </div>

            {/* Poin */}
            <div className="text-center bg-white/10 backdrop-blur-sm px-6 py-4 rounded-[15px] border border-white/20 flex-shrink-0">
              <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Total Poin</p>
              <p className="text-4xl font-black">{points.toLocaleString("id-ID")}</p>
              <p className="text-white/70 text-xs mt-1">Capella Points</p>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">

          {/* Tab Header */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-[#3BCBBE] text-[#3BCBBE] bg-[#3BCBBE]/5"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">

            {/* ── TAB: PROFIL ── */}
            {activeTab === "profile" && (
              <ProfileTab user={user} setUser={setUser} showAlert={showAlert} />
            )}

            {/* ── TAB: GANTI PASSWORD ── */}
            {activeTab === "password" && (
              <PasswordTab user={user} showAlert={showAlert} />
            )}

            {/* ── TAB: RIWAYAT BOOKING ── */}
            {activeTab === "bookings" && (
              <BookingsTab bookings={dummyBookings} />
            )}

            {/* ── TAB: CAPELLA REWARDS ── */}
            {activeTab === "rewards" && (
              <RewardsTab
                points={points}
                currentTier={currentTier}
                nextTier={nextTier}
                progress={progress}
                bookings={dummyBookings}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: PROFIL ──────────────────────────────────────────────────────────────
function ProfileTab({ user, setUser, showAlert }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      showAlert("error", "Nama dan email tidak boleh kosong.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      showAlert("error", "Format email tidak valid.");
      return;
    }
    try {
      setLoading(true);
      // Update ke Supabase
      const { default: axios } = await import("axios");
      const API_URL = "https://pnpdzlpxlathfnfzgdol.supabase.co/rest/v1/users";
      const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucGR6bHB4bGF0aGZuZnpnZG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzg3MTAsImV4cCI6MjA5NjkxNDcxMH0.wQ6qy7pi1oPUcp0t-oCNyfUPirlZHew-gnfXdt7yc90";
      await axios.patch(
        `${API_URL}?id=eq.${user.id}`,
        { name: form.name, email: form.email },
        { headers: { apikey: API_KEY, Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" } }
      );
      const updated = { ...user, name: form.name, email: form.email };
      localStorage.setItem("userSession", JSON.stringify(updated));
      setUser(updated);
      setEditing(false);
      showAlert("success", "Profil berhasil diperbarui!");
    } catch {
      showAlert("error", "Gagal memperbarui profil. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({ name: user.name, email: user.email });
    setEditing(false);
  };

  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Informasi Pribadi</h2>
          <p className="text-sm text-gray-400 mt-0.5">Kelola data profil akun kamu</p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 text-sm font-bold text-[#3BCBBE] border border-[#3BCBBE] px-4 py-2 rounded-[10px] hover:bg-[#3BCBBE] hover:text-white transition-all"
          >
            <FaEdit /> Edit Profil
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Nama */}
        <div>
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
            Nama Lengkap
          </label>
          {editing ? (
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-[12px] px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent"
            />
          ) : (
            <div className="bg-[#F8F9FA] rounded-[12px] px-4 py-3 text-sm font-bold text-gray-800">
              {user.name}
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
            Alamat Email
          </label>
          {editing ? (
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-200 rounded-[12px] px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent"
            />
          ) : (
            <div className="bg-[#F8F9FA] rounded-[12px] px-4 py-3 text-sm font-bold text-gray-800">
              {user.email}
            </div>
          )}
        </div>

        {/* Member Sejak */}
        <div>
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
            Member Sejak
          </label>
          <div className="bg-[#F8F9FA] rounded-[12px] px-4 py-3 text-sm font-bold text-gray-800 flex items-center gap-2">
            <FaCalendarAlt className="text-[#3BCBBE]" />
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
              : "—"}
          </div>
        </div>

        {editing && (
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-[#3BCBBE] text-white px-6 py-3 rounded-[12px] font-bold text-sm hover:bg-[#2aa89d] transition-all disabled:opacity-60"
            >
              <FaSave /> {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex items-center gap-2 border border-gray-200 text-gray-500 px-6 py-3 rounded-[12px] font-bold text-sm hover:bg-gray-50 transition-all"
            >
              <FaTimes /> Batal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TAB: GANTI PASSWORD ──────────────────────────────────────────────────────
function PasswordTab({ user, showAlert }) {
  const [form, setForm]   = useState({ current: "", newPw: "", confirm: "" });
  const [show, setShow]   = useState({ current: false, newPw: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const toggle = key => setShow(s => ({ ...s, [key]: !s[key] }));

  const validate = () => {
    const e = {};
    if (!form.current) e.current = "Password saat ini wajib diisi.";
    if (!form.newPw || form.newPw.length < 6) e.newPw = "Password baru minimal 6 karakter.";
    if (form.newPw !== form.confirm) e.confirm = "Konfirmasi password tidak cocok.";
    if (form.current === form.newPw) e.newPw = "Password baru tidak boleh sama dengan yang lama.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    // Cek password lama
    if (form.current !== user.password) {
      setErrors({ current: "Password saat ini salah." });
      return;
    }

    try {
      setLoading(true);
      const { default: axios } = await import("axios");
      const API_URL = "https://pnpdzlpxlathfnfzgdol.supabase.co/rest/v1/users";
      const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucGR6bHB4bGF0aGZuZnpnZG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzg3MTAsImV4cCI6MjA5NjkxNDcxMH0.wQ6qy7pi1oPUcp0t-oCNyfUPirlZHew-gnfXdt7yc90";
      await axios.patch(
        `${API_URL}?id=eq.${user.id}`,
        { password: form.newPw },
        { headers: { apikey: API_KEY, Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" } }
      );
      // Update session
      const updated = { ...user, password: form.newPw };
      localStorage.setItem("userSession", JSON.stringify(updated));
      setForm({ current: "", newPw: "", confirm: "" });
      showAlert("success", "Password berhasil diperbarui!");
    } catch {
      showAlert("error", "Gagal mengubah password. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ id, label, placeholder }) => (
    <div>
      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show[id] ? "text" : "password"}
          value={form[id]}
          onChange={e => setForm({ ...form, [id]: e.target.value })}
          placeholder={placeholder}
          className={`w-full border rounded-[12px] px-4 py-3 pr-12 text-sm text-gray-800 outline-none focus:ring-2 focus:border-transparent transition-all ${
            errors[id] ? "border-[#E53E3E] focus:ring-[#E53E3E]/30" : "border-gray-200 focus:ring-[#3BCBBE]"
          }`}
        />
        <button type="button" onClick={() => toggle(id)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
          {show[id] ? "🙈" : "👁️"}
        </button>
      </div>
      {errors[id] && <p className="text-[#E53E3E] text-xs mt-1 font-bold">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Ganti Password</h2>
        <p className="text-sm text-gray-400 mt-0.5">Pastikan password baru kuat dan mudah diingat</p>
      </div>

      {/* Tips keamanan */}
      <div className="bg-[#3BCBBE]/10 border border-[#3BCBBE]/20 rounded-[12px] p-4 mb-6 flex gap-3">
        <FaShieldAlt className="text-[#3BCBBE] flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-700">
          <p className="font-bold text-[#3BCBBE] mb-1">Tips Password Aman</p>
          <p className="text-gray-500 text-xs">Gunakan minimal 6 karakter, kombinasi huruf besar, huruf kecil, dan angka.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field id="current" label="Password Saat Ini"       placeholder="Masukkan password lama"    />
        <Field id="newPw"   label="Password Baru"           placeholder="Minimal 6 karakter"        />
        <Field id="confirm" label="Konfirmasi Password Baru" placeholder="Ulangi password baru"     />

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-[#313860] to-[#3BCBBE] text-white px-6 py-3 rounded-[12px] font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60 mt-2"
        >
          <FaLock /> {loading ? "Memperbarui..." : "Perbarui Password"}
        </button>
      </form>
    </div>
  );
}

// ─── TAB: RIWAYAT BOOKING ─────────────────────────────────────────────────────
function BookingsTab({ bookings }) {
  const statusCfg = {
    "Checked-Out": { color: "text-[#48BB78] bg-[#48BB78]/10", icon: <FaCheckCircle className="text-[#48BB78]" /> },
    "Confirmed":   { color: "text-[#3BCBBE]  bg-[#3BCBBE]/10",  icon: <FaClock       className="text-[#3BCBBE]"  /> },
    "Cancelled":   { color: "text-[#E53E3E]  bg-[#E53E3E]/10",  icon: <FaTimesCircle className="text-[#E53E3E]"  /> },
  };

  const total     = bookings.filter(b => b.status === "Checked-Out").reduce((s, b) => s + b.price, 0);
  const upcoming  = bookings.filter(b => b.status === "Confirmed").length;
  const totalStay = bookings.filter(b => b.status === "Checked-Out").length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Riwayat Booking</h2>
        <p className="text-sm text-gray-400 mt-0.5">Semua perjalanan kamu bersama Capella Hotel</p>
      </div>

      {/* Statistik kecil */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Menginap",  value: `${totalStay}x`,  color: "text-[#3BCBBE]" },
          { label: "Upcoming",        value: `${upcoming}`,     color: "text-[#F5A623]" },
          { label: "Total Spending",  value: `$${total.toLocaleString()}`, color: "text-[#313860]" },
        ].map((s, i) => (
          <div key={i} className="bg-[#F8F9FA] rounded-[12px] p-4 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 font-bold mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabel booking */}
      <div className="overflow-x-auto rounded-[12px] border border-gray-100">
        <table className="w-full text-left min-w-[540px]">
          <thead className="bg-[#3BCBBE] text-white">
            <tr>
              {["Booking ID", "Tipe Kamar", "Check-in", "Check-out", "Harga", "Status"].map(h => (
                <th key={h} className="px-5 py-3 text-xs font-bold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50 text-sm">
            {bookings.map(b => {
              const cfg = statusCfg[b.status];
              return (
                <tr key={b.id} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-5 py-4 font-bold text-[#3BCBBE]">{b.id}</td>
                  <td className="px-5 py-4 font-bold text-gray-800">{b.roomType}</td>
                  <td className="px-5 py-4 text-gray-500">{b.checkIn}</td>
                  <td className="px-5 py-4 text-gray-500">{b.checkOut}</td>
                  <td className="px-5 py-4 font-bold text-gray-800">${b.price}</td>
                  <td className="px-5 py-4">
                    <span className={`flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-[8px] text-[11px] font-bold uppercase ${cfg.color}`}>
                      {cfg.icon} {b.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── TAB: CAPELLA REWARDS ─────────────────────────────────────────────────────
function RewardsTab({ points, currentTier, nextTier, progress, bookings }) {
  const poinNeeded = nextTier ? nextTier.min - points : 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Capella Rewards</h2>
        <p className="text-sm text-gray-400 mt-0.5">Kumpulkan poin setiap menginap dan nikmati keistimewaan lebih</p>
      </div>

      {/* Kartu tier saat ini */}
      <div
        className="rounded-[16px] p-6 mb-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #313860, ${currentTier.color})` }}
      >
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{currentTier.icon}</span>
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Tier Saat Ini</p>
              <h3 className="text-2xl font-black">{currentTier.name} Member</h3>
            </div>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-black">{points.toLocaleString("id-ID")}</span>
            <span className="text-white/70 mb-1">poin</span>
          </div>

          {nextTier ? (
            <>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-white/80 text-xs font-bold">
                {poinNeeded.toLocaleString("id-ID")} poin lagi untuk naik ke <span className="text-white">{nextTier.name}</span>
              </p>
            </>
          ) : (
            <p className="text-white/80 text-xs font-bold">🎉 Kamu sudah mencapai tier tertinggi!</p>
          )}
        </div>
      </div>

      {/* Keuntungan tier saat ini */}
      <div className="bg-[#F8F9FA] rounded-[16px] p-6 mb-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaStar className="text-[#F5A623]" /> Keuntungan {currentTier.name} Member
        </h3>
        <div className="space-y-3">
          {currentTier.perks.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#3BCBBE]/20 flex items-center justify-center flex-shrink-0">
                <FaCheckCircle className="text-[#3BCBBE] text-xs" />
              </div>
              <span className="text-sm font-bold text-gray-700">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Perbandingan semua tier */}
      <h3 className="font-bold text-gray-800 mb-4">Semua Tier</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {TIERS.map(tier => {
          const isActive = tier.name === currentTier.name;
          return (
            <div
              key={tier.name}
              className={`rounded-[14px] p-5 border-2 transition-all ${
                isActive ? "border-[#3BCBBE] bg-[#3BCBBE]/5 shadow-md" : "border-gray-100 bg-white"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{tier.icon}</span>
                <span className="font-black text-gray-800">{tier.name}</span>
                {isActive && (
                  <span className="ml-auto text-[10px] font-black text-[#3BCBBE] bg-[#3BCBBE]/10 px-2 py-0.5 rounded-full">
                    AKTIF
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-bold mb-3">
                {tier.min.toLocaleString()} – {tier.max === 99999 ? "∞" : tier.max.toLocaleString()} poin
              </p>
              <div className="space-y-1.5">
                {tier.perks.map((p, i) => (
                  <p key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
                    <FaCheckCircle className="text-[#3BCBBE] mt-0.5 flex-shrink-0 text-[10px]" /> {p}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Riwayat perolehan poin */}
      <h3 className="font-bold text-gray-800 mb-4">Riwayat Perolehan Poin</h3>
      <div className="space-y-3">
        {bookings.filter(b => b.status === "Checked-Out").map(b => (
          <div key={b.id} className="flex items-center justify-between bg-[#F8F9FA] rounded-[12px] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#3BCBBE]/10 flex items-center justify-center">
                <FaBed className="text-[#3BCBBE] text-sm" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{b.roomType}</p>
                <p className="text-xs text-gray-400">{b.checkIn} — {b.checkOut}</p>
              </div>
            </div>
            <span className="text-[#3BCBBE] font-black text-sm">
              +{(b.price * 10).toLocaleString("id-ID")} poin
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}