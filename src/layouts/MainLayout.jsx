import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
    return (
        // flex = mengaktifkan flexbox, h-screen = tinggi penuh layar
        <div className="flex h-screen bg-slate-50">
            <Sidebar />  {/* Sidebar tetap di kiri */}
            
            {/*
                flex-1 = ambil sisa lebar setelah sidebar
                flex flex-col = susun header dan konten secara vertikal
                overflow-hidden = potong kelebihan konten (agar scroll hanya di area tertentu)
            */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />  {/* Header tetap di atas */}
                
                {/*
                    flex-1 = ambil sisa tinggi setelah header
                    overflow-y-auto = jika konten di dalam Outlet melebihi tinggi,
                                    akan muncul scrollbar VERTIKAL di sini
                                    Header dan Sidebar tetap diam.
                */}
                <div className="flex-1 overflow-y-auto bg-slate-50">
                    <Outlet />  {/* Tempat halaman Dashboard, Bookings, Guests dirender */}
                </div>
            </div>
        </div>
    );
}