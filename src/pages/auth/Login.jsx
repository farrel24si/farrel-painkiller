import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Tambahkan Link disini
import axios from "axios";
import { 
    FaExclamationTriangle, 
    FaSpinner, 
    FaBolt, 
    FaCube, 
    FaHeart 
} from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    
    const [dataForm, setDataForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        axios.post("https://dummyjson.com/user/login", {
            username: dataForm.username,
            password: dataForm.password,
            expiresInMins: 60,
        })
        .then((response) => {
            if (response.status === 200) {
                navigate("/"); 
            }
        })
        .catch((err) => {
            if (err.response) {
                setError(err.response.data.message || "Username atau password salah.");
            } else {
                setError("Terjadi kesalahan pada server.");
            }
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="min-h-screen w-full flex font-sans bg-white relative overflow-hidden">
            
            {/* --- TOP NAVBAR ---
            <nav className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1000px] z-50 flex justify-between items-center bg-white/80 backdrop-blur-md rounded-2xl md:rounded-full px-6 py-4 shadow-[0_7px_23px_rgba(0,0,0,0.05)] border border-white">
                <div className="font-bold text-slate-800 flex items-center gap-2 text-xs md:text-sm tracking-wider uppercase">
                    <FaCube className="text-xl" />
                    Purity UI Dashboard
                </div>
                <div className="hidden md:flex gap-8 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <span className="cursor-pointer hover:text-[#4FD1C5] transition-colors">Dashboard</span>
                    <span className="cursor-pointer hover:text-[#4FD1C5] transition-colors">Profile</span>
                    <Link to="/register" className="cursor-pointer hover:text-[#4FD1C5] transition-colors">Sign Up</Link>
                    <span className="cursor-pointer text-slate-800">Sign In</span>
                </div>
                <button className="hidden md:block bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase transition-all shadow-md">
                    Free Download
                </button>
            </nav> */}

            {/* --- KIRI: BAGIAN FORMULIR --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 pt-32 pb-12 z-10 min-h-screen">
                <div className="w-full max-w-[350px]">
                    
                    <h2 className="text-3xl font-bold text-[#4FD1C5] mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-slate-400 font-bold text-sm mb-10">
                        Enter your email and password to sign in
                    </p>

                    {error && (
                        <div className="bg-red-50 mb-6 p-4 text-sm text-red-600 rounded-2xl flex items-center border border-red-100">
                            <FaExclamationTriangle className="mr-3 text-lg shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Email <span className="text-slate-400 font-normal ml-1">(Hint: emilys)</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={dataForm.username}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#4FD1C5] focus:ring-1 focus:ring-[#4FD1C5] transition-all text-sm placeholder-slate-400"
                                placeholder="Your email address"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Password <span className="text-slate-400 font-normal ml-1">(Hint: emilyspass)</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={dataForm.password}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#4FD1C5] focus:ring-1 focus:ring-[#4FD1C5] transition-all text-sm placeholder-slate-400"
                                placeholder="Your password"
                                required
                            />
                        </div>

                        {/* Baris Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                                <div className={`w-10 h-5 rounded-full flex items-center px-[2px] transition-colors duration-300 ${rememberMe ? 'bg-[#4FD1C5]' : 'bg-slate-200'}`}>
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${rememberMe ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
                                </div>
                                <span className="ml-3 text-sm text-slate-700 font-bold">Remember me</span>
                            </div>
                            
                            {/* Tambahan Link Forgot Password */}
                            <Link to="/forgot" className="text-sm font-bold text-[#4FD1C5] hover:text-[#3dbdb3] transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white font-bold py-4 px-4 rounded-2xl shadow-[0_4px_12px_rgba(79,209,197,0.3)] transition-all flex justify-center items-center text-[11px] uppercase tracking-wider mt-2 ${
                                loading ? "bg-slate-400 cursor-not-allowed shadow-none" : "bg-[#4FD1C5] hover:bg-[#3dbdb3] hover:-translate-y-0.5"
                            }`}
                        >
                            {loading ? <FaSpinner className="animate-spin text-lg" /> : "SIGN IN"}
                        </button>
                    </form>

                    <p className="text-sm text-slate-400 text-center mt-8 font-bold">
                        Don't have an account?{" "}
                        {/* Diubah jadi Link */}
                        <Link to="/register" className="text-[#4FD1C5] cursor-pointer hover:text-[#3dbdb3] transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>

                {/* Footer Teks Kiri */}
                <div className="mt-auto pt-10 text-xs text-slate-400 font-bold w-full max-w-[350px]">
                    <p className="text-center md:text-left">
                        © 2021, Made with <FaHeart className="inline text-[#4FD1C5] mx-1" /> by <span className="text-[#4FD1C5]">Creative Tim</span> & <span className="text-[#4FD1C5]">Simmmple</span> for a better web
                    </p>
                </div>
            </div>

            {/* --- KANAN: GRAFIS BANNER --- */}
            <div className="hidden lg:block lg:w-1/2 p-4 h-screen">
                <div className="w-full h-full bg-[#4FD1C5] rounded-bl-[80px] rounded-[25px] overflow-hidden flex items-center justify-center relative shadow-2xl">
                    
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] border-[50px] border-white/50 rounded-full"></div>
                        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] border-[30px] border-white/50 rounded-full"></div>
                    </div>

                    <div className="flex items-center gap-3 text-white text-5xl font-bold z-10 tracking-tight">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#4FD1C5] shadow-xl">
                            <FaBolt size={32} />
                        </div>
                        Capella
                    </div>

                </div>
            </div>
            
        </div>
    );
}