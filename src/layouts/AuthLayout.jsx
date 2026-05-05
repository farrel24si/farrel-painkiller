import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        // Kombinasi Tailwind untuk memusatkan konten:
        // min-h-screen = tinggi minimal seukuran layar
        // flex + items-center + justify-center = pusat vertikal & horizontal
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            {/*
                Kotak putih: p-8 (padding), rounded-3xl (sudut membulat),
                shadow-xl (bayangan), w-full max-w-md (lebar maksimal 28rem),
                border (garis tepi)
            */}
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
                {/* Brand Logo - hanya hiasan, tidak mempengaruhi fungsi routing */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                        Hotella<span className="text-blue-600">.</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Staff Portal</p>
                </div>

                {/* 
                    <Outlet/> adalah "lubang" tempat komponen anak (Login, Register) dirender.
                    Kerangka luar (kotak putih, logo, footer) tetap sama,
                    tetapi isi tengah berganti sesuai route.
                */}
                <Outlet />

                {/* Footer statis */}
                <p className="text-center text-xs text-slate-400 mt-8 font-medium">
                    © 2026 Hotella.<br/>All rights reserved.
                </p>
            </div>
        </div>
    );
}