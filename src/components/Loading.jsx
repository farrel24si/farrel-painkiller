import React from "react";
import { FaBolt } from "react-icons/fa";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 relative overflow-hidden">
            
            {/* --- Efek Cahaya Belakang (Glowing Orb) --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4FD1C5] rounded-full blur-[80px] opacity-20 animate-pulse pointer-events-none"></div>

            {/* --- Animasi Spinner --- */}
            <div className="relative flex justify-center items-center mb-8">
                
                {/* Ring Luar (Berputar ke Kanan) */}
                <div className="absolute w-20 h-20 border-4 border-slate-200 border-t-[#4FD1C5] rounded-full animate-spin shadow-lg"></div>
                
                {/* Ring Dalam (Berputar ke Kiri / Reverse) */}
                <div className="absolute w-14 h-14 border-4 border-transparent border-b-[#4FD1C5] border-l-[#4FD1C5] rounded-full opacity-70 animate-[spin_1.5s_linear_reverse]"></div>
                
                {/* Ikon Tengah (Berkedip) */}
                <div className="text-[#4FD1C5] text-2xl z-10 animate-pulse drop-shadow-md">
                    <FaBolt />
                </div>

            </div>

            {/* --- Teks Loading --- */}
            <div className="text-center z-10 flex flex-col items-center">
                <p className="text-slate-700 font-extrabold tracking-[0.2em] animate-pulse uppercase text-sm mb-1">
                    Loading System
                </p>
                <div className="flex gap-1 mt-1">
                    <span className="w-1.5 h-1.5 bg-[#4FD1C5] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#4FD1C5] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#4FD1C5] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
            </div>
            
        </div>
    );
}