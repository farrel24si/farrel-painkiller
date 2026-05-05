import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();   // Untuk pindah halaman setelah sukses login
    const [loading, setLoading] = useState(false);   // State untuk animasi loading & disable tombol
    const [error, setError] = useState("");          // State untuk menyimpan pesan error
    
    // 1. State untuk menyimpan ketikan user (object dengan username & password)
    const [dataForm, setDataForm] = useState({
        username: "",
        password: "",
    });

    // Fungsi untuk meng-update state setiap kali user mengetik
    const handleChange = (evt) => {
        const { name, value } = evt.target;   // name="username" atau "password"
        // Spread operator: salin semua properti lama, lalu timpa properti [name] dengan value baru
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    // 2. Fungsi saat tombol login ditekan (Integrasi API)
    const handleSubmit = async (e) => {
        e.preventDefault();   // Mencegah reload halaman
        setLoading(true);     // Tampilkan spinner dan disable input
        setError("");         // Bersihkan error lama

        // Hit API DummyJSON sesuai Modul P7
        axios.post("https://dummyjson.com/user/login", {
            username: dataForm.username,
            password: dataForm.password,
            expiresInMins: 60,
        })
        .then((response) => {
            if (response.status === 200) {
                // Kalau sukses, pindah ke halaman Dashboard (route "/")
                navigate("/"); 
            }
        })
        .catch((err) => {
            // Kalau gagal (password salah), tampilkan error
            if (err.response) {
                setError(err.response.data.message || "Username atau password salah.");
            } else {
                setError("Terjadi kesalahan pada server.");
            }
        })
        .finally(() => {
            setLoading(false);   // Matikan loading, baik sukses maupun gagal
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">
                Staff Login 👋
            </h2>

            {/* Jika state error tidak kosong, tampilkan alert merah */}
            {error && (
                <div className="bg-red-50 mb-5 p-4 text-sm text-red-600 rounded-xl flex items-center border border-red-100">
                    <FaExclamationTriangle className="mr-3 text-lg" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Username <span className="text-slate-400 font-normal">(Hint: emilys)</span>
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={dataForm.username}
                        onChange={handleChange}
                        disabled={loading}   // Saat loading, input tidak bisa diketik
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Password <span className="text-slate-400 font-normal">(Hint: emilyspass)</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="********"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex justify-center items-center ${
                        loading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? <FaSpinner className="animate-spin text-xl" /> : "Login"}
                </button>
            </form>
        </div>
    );
}