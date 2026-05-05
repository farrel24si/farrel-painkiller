import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto p-6 text-center bg-gray-50">
      {/* Gambar Animasi / Ilustrasi */}
      <img src={image} alt={`Error ${code}`} className="w-64 md:w-80 mb-6 drop-shadow-xl" />
      
      {/* Kode Error */}
      <h1 className="text-7xl md:text-9xl font-black text-gray-800 mb-4 animate-bounce">
        {code}
      </h1>
      
      {/* Deskripsi */}
      <p className="text-xl md:text-2xl font-medium text-gray-600 max-w-xl">
        {description}
      </p>

      {/* Tombol Balik */}
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-3 bg-hijau text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
      >
        <FaHome className="text-xl" />
        Back to Dashboard
      </Link>
    </div>
  );
}