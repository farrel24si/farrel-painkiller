import { FaSpinner } from "react-icons/fa";

export default function Loading() {
    return (
        // Komponen ini digunakan sebagai fallback di Suspense dan saat loading login
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
            {/* animate-spin dari Tailwind: membuat icon berputar terus */}
            <FaSpinner className="text-blue-600 text-5xl animate-spin mb-4" />
            {/* animate-pulse: efek kedap-kedip halus */}
            <p className="text-slate-500 font-medium tracking-widest animate-pulse uppercase text-sm">
                Loading System...
            </p>
        </div>
    );
}