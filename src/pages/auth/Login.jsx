import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Home } from "lucide-react";
import { usersAPI } from "../../services/usersAPI";
import { motion } from "framer-motion";
import Alert from "../../components/Alert";
import logo from "../../assets/logo1.png";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email dan password harus diisi.");
      return;
    }

    try {
      setLoading(true);
      const users = await usersAPI.loginUser(formData.email, formData.password);

      if (users && users.length > 0) {
        const loggedInUser = users[0];
        localStorage.setItem("userSession", JSON.stringify(loggedInUser));
        setToastMessage(`Selamat datang, ${loggedInUser.name}!`);
        
        setTimeout(() => {
          if (loggedInUser.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/member");
          }
        }, 2000);
      } else {
        setError("Email atau Password salah!");
        setLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server. Silakan coba lagi.");
      setLoading(false);
    } 
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="min-h-screen flex font-['Helvetica']"
    >
      {toastMessage && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
          <Alert type="success" message={toastMessage} />
        </div>
      )}
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
              src={logo} // ganti dengan path logo Anda
              alt="Capella Hotel"
              className="h-8 w-auto"
            />
            <span className="text-white text-xl font-bold tracking-widest"></span>
          </div>

          {/* Teks di bawah */}
          <div className="text-white max-w-md animate-fade-in-up">
            <h1 className="text-3xl font-semibold leading-tight">
              Liburan Tenang.<br />Rewards Datang.
            </h1>
            <p className="text-base opacity-90 mt-2 leading-relaxed">
              Masuk ke akun Anda untuk mengelola reservasi kamar, menukar poin Capella Rewards, dan menikmati promo eksklusif khusus member.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel – form login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-6 bg-gradient-to-br from-[#F8F9FA] to-[#E2E8F0]">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 md:p-8 animate-fade-in-up">
          {/* Logo mobile */}
          <div className="lg:hidden flex justify-center mb-4">
            <img src={logo} alt="Capella" className="h-10 w-auto" />
          </div>

          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-[#3BCBBE]">LOGIN</h2>
            <p className="text-sm text-gray-500">Sign in to continue</p>
          </div>

          {error && (
            <Alert type="error" message={error} onClose={() => setError("")} />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Password"
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

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 text-[#3BCBBE] focus:ring-[#3BCBBE]"
                />
                Remember me
              </label>
              <Link
                to="/forgot"
                className="text-sm text-[#3BCBBE] hover:underline"
              >
                Forgot password?
              </Link>
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
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#3BCBBE] font-bold hover:underline"
              >
                Create one
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
    </motion.div>
  );
}