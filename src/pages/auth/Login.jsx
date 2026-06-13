import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usersAPI } from "../../services/usersAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi sederhana
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
        alert(`Selamat datang, ${loggedInUser.name}!`);
        navigate("/dashboard");
      } else {
        setError("Email atau Password salah!");
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server. Silakan coba lagi.");
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
              Welcome Back 👋
            </h2>
            <p className="text-sm text-gray-500">
              Masuk ke Capella Hotel Management
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Password dengan tombol show/hide */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot"
                  className="text-xs font-medium text-[#3BCBBE] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="rounded-xl border-gray-200 focus:border-[#3BCBBE] pr-10"
                  placeholder="••••••••"
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

            {/* Tombol Login */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3BCBBE] hover:bg-[#2aa89d] text-white font-bold py-6 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                "Memverifikasi..."
              ) : (
                <>
                  <FaSignInAlt /> Login
                </>
              )}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#3BCBBE] font-semibold hover:underline">
                Sign up
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