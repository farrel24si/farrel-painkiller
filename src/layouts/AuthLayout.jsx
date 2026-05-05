import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        // Hapus semua batasan lebar (max-w-md), kotak putih, dan padding.
        // Biarkan layout ini mengambil seluruh layar penuh (min-h-screen w-full)
        // sehingga komponen Login di dalamnya bisa merender desain split-screen-nya sendiri.
        <div className="min-h-screen w-full bg-white">
            
            {/* <Outlet /> akan merender komponen anak (seperti Login atau Register).
                Karena sekarang tidak ada kotak pembatas, komponen Login akan 
                tampil penuh dari ujung ke ujung layar sesuai desain Purity UI.
            */}
            <Outlet />

        </div>
    );
}