import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { FaHome } from "react-icons/fa";

// Tambahkan CSS Animasi Kustom langsung di file JSX atau file CSS utama kamu
// Agar mudah, saya masukkan ke dalam tag <style> langsung di komponen ini
const customAnimationCSS = `
  @keyframes text-3d-float {
    0% { transform: perspective(1000px) rotateY(10deg) translateY(0px); }
    50% { transform: perspective(1000px) rotateY(-10deg) translateY(-20px); }
    100% { transform: perspective(1000px) rotateY(10deg) translateY(0px); }
  }

  @keyframes bg-gradient-pan {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-3d-text {
    animation: text-3d-float 6s ease-in-out infinite;
    text-shadow: 
      2px 2px 0 #1D7842, /* Warna Gradasi Hijau Tua */
      4px 4px 0 #1D7842,
      6px 6px 15px rgba(0,0,0,0.1);
  }

  .animate-grad-bg {
    background: linear-gradient(270deg, #F9FAFB, #E6FFFA, #F9FAFB);
    background-size: 400% 400%;
    animation: bg-gradient-pan 15s ease infinite;
  }
`;

export default function NotFound() {
  return (
    <>
      <style>{customAnimationCSS}</style>
      
      {/* Background dengan animasi gradasi halus (menggunakan class kustom) */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center overflow-hidden animate-grad-bg">
        
        {/* Kontainer Utama */}
        <div className="relative flex flex-col items-center max-w-2xl w-full">
          
          {/* Teks 404 Raksasa dengan Efek 3D Melayang */}
          <h1 className="absolute text-[16rem] md:text-[20rem] font-black text-gray-100 opacity-80 animate-3d-text leading-none select-none z-0">
            404
          </h1>

          {/* Animasi Lottie Keren (Ganti FaExclamationTriangle dengan ini) */}
          <div className="relative z-10 w-full max-w-sm md:max-w-md -mt-10 md:-mt-16">
            <Player
              autoplay
              loop
              src="https://assets10.lottiefiles.com/packages/lf20_kji92461.json" // Animasi Astronaut Tersesat Keren
              className="w-full h-full"
            />
          </div>

          {/* Bagian Teks & CTA (Berada di atas teks 3D) */}
          <div className="relative z-20 -mt-8 md:-mt-12 bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Oops! You're Lost in Space.
            </h2>
            <p className="text-gray-600 mt-4 max-w-md mx-auto text-lg leading-relaxed">
              Halaman yang kamu cari sepertinya tidak ada atau sudah pindah ke galaksi lain. Jangan khawatir, kami akan bantu kamu kembali.
            </p>

            {/* Tombol Kembali (Dengan Gradasi & Efek Hover Keren) */}
            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-3 bg-gradient-to-r from-hijau via-green-600 to-green-700 text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl hover:brightness-110 active:scale-95 group"
            >
              <FaHome className="text-xl group-hover:rotate-[-10deg] transition-transform" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Footer Kecil (Dibuat samar agar tidak mengganggu fokus) */}
        <p className="absolute bottom-6 text-gray-400 text-sm font-medium z-30">
          Sedap Restaurant Admin Dashboard &copy; 2025
        </p>
      </div>
    </>
  );
}