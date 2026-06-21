import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from "lucide-react";
import { usersAPI } from "../../services/usersAPI";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Semua kolom wajib diisi.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    try {
      setLoading(true);
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "member",
      };
      await usersAPI.registerUser(userData);
      setSuccess("Pendaftaran berhasil! Mengarahkan ke halaman login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Detail Error:", err.response?.data || err.message);
      setError(`Gagal mendaftar: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-['Helvetica'] bg-gradient-to-br from-[#F8F9FA] to-[#E2E8F0]">
      {/* Left Panel – gambar + gradien + logo + teks */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 w-full p-8 flex flex-col justify-between h-full">
          {/* Logo di kiri atas */}
          <div className="flex items-center space-x-2">
            <img
              src="src/assets/logo1.png"
              alt="Capella Hotel"
              className="h-8 w-auto"
            />
            <span className="text-white text-xl font-bold tracking-widest"></span>
          </div>

          {/* Teks di bawah */}
          <div className="text-white max-w-md animate-fade-in-up">
            <h1 className="text-3xl font-semibold leading-tight">
              Gabung Sekarang.<br />Nikmati Kemewahannya.
            </h1>
            <p className="text-base opacity-90 mt-2 leading-relaxed">
              Daftar dalam 30 detik. Dapatkan 500 Poin Capella pertama Anda sebagai hadiah selamat datang!
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel – form register */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 md:p-8 animate-fade-in-up">
          {/* Logo mobile */}
          <div className="lg:hidden flex justify-center mb-4">
            <img src="/assets/logo.png" alt="Capella" className="h-10 w-auto" />
          </div>

          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-[#3BCBBE]">CREATE ACCOUNT</h2>
            <p className="text-sm text-gray-500">Join us for a luxurious stay</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2 rounded-r-xl text-sm mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-2 rounded-r-xl text-sm mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama Lengkap */}
            <div>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-[#3BCBBE] transition-all"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-[#3BCBBE] transition-all"
                  placeholder="Email address"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-[#3BCBBE] transition-all"
                  placeholder="Min. 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-[#3BCBBE] transition-all"
                  placeholder="Repeat password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-2xl text-sm font-bold tracking-wide transition-all ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#3BCBBE] text-white shadow-md shadow-[#3BCBBE]/20 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#2aa89d]"
              }`}
            >
              {loading ? "Processing..." : "Register Now"}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#3BCBBE] font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>
            <div className="pt-3 border-t border-gray-200">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-400 hover:text-[#3BCBBE] transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}