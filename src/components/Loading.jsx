import { FaSpinner } from "react-icons/fa";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
            <FaSpinner className="text-blue-600 text-5xl animate-spin mb-4" />
            <p className="text-slate-500 font-medium tracking-widest animate-pulse uppercase text-sm">
                Loading System...
            </p>
        </div>
    );
}