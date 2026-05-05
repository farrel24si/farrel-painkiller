import React from "react";
import { Link } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";

export default function Forgot() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-6 relative">
            
            {/* Background Dekoratif Opsional */}
            <div className="absolute top-0 left-0 w-full h-[40vh] bg-[#4FD1C5] rounded-b-[30px] md:rounded-b-[80px] z-0"></div>

            {/* Card Content */}
            <div className="bg-white p-10 rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] w-full max-w-md relative z-10 flex flex-col items-center text-center">
                
                <div className="w-16 h-16 bg-teal-50 text-[#4FD1C5] rounded-full flex items-center justify-center text-2xl mb-6 shadow-inner">
                    <FaLock />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Forgot Password?</h2>
                <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">
                    Please contact the IT Department to reset your staff credentials. System administrators are available 24/7.
                </p>

                <Link 
                    to="/login" 
                    className="flex items-center justify-center gap-2 w-full text-white font-bold py-3.5 px-4 rounded-2xl shadow-[0_4px_12px_rgba(79,209,197,0.3)] bg-[#4FD1C5] hover:bg-[#3dbdb3] transition-all hover:-translate-y-0.5 text-xs uppercase tracking-wider"
                >
                    <FaArrowLeft /> Back to Sign In
                </Link>
            </div>
        </div>
    );
}