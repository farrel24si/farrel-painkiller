export default function Avatar({ name }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#313860] to-[#151928] text-white flex items-center justify-center font-bold font-['Helvetica'] border-2 border-white shadow-sm hover:scale-110 transition-transform">
      {name.charAt(0)}
    </div>
  );
}