import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usersAPI } from "../../services/usersAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";

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

    // Validasi
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F9FA] to-[#E2E8F0] px-4">
      <Card className="w-full max-w-md p-8 rounded-[28px] shadow-2xl border-0 bg-white/80 backdrop-blur-lg">
        <CardContent className="p-0 space-y-6">
          {/* Judul */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              Create Capella Account ✨
            </h2>
            <p className="text-sm text-gray-500">
              Bergabung dengan manajemen hotel
            </p>
          </div>

          {/* Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="rounded-xl border-gray-200 focus:border-[#3BCBBE]"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="rounded-xl border-gray-200 focus:border-[#3BCBBE]"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="rounded-xl border-gray-200 focus:border-[#3BCBBE] pr-10"
                  placeholder="Min. 6 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="rounded-xl border-gray-200 focus:border-[#3BCBBE] pr-10"
                  placeholder="Ulangi password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3BCBBE] hover:bg-[#2aa89d] text-white font-bold py-6 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                "Memproses..."
              ) : (
                <>
                  <FaUserPlus /> Register
                </>
              )}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#3BCBBE] font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </form>

          <div className="text-center">
            <Link
              to="/"
              className="text-xs text-gray-400 hover:text-[#3BCBBE] transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}