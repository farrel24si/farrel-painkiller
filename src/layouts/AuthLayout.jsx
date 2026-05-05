import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
                {/* Brand Logo */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                        Hotella<span className="text-blue-600">.</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Staff Portal</p>
                </div>

                {/* Komponen Login/Register akan muncul di sini */}
                <Outlet />

                <p className="text-center text-xs text-slate-400 mt-8 font-medium">
                    © 2026 Hotella.<br/>All rights reserved.
                </p>
            </div>
        </div>
    );
}