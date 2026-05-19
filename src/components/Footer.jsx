export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#313860] to-[#151928] text-white p-[18px] rounded-[15px] mt-10 shadow-md font-['Helvetica']">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-bold mb-2 text-[#3BCBBE]">Grand Farrel.</h2>
        <p className="text-gray-300 mb-4 text-sm">Luxury Hotel Management System</p>
        <div className="flex justify-center gap-6 mb-4 font-bold text-sm">
          <a href="#" className="hover:text-[#3BCBBE] transition-colors">Dashboard</a>
          <a href="#" className="hover:text-[#3BCBBE] transition-colors">Rooms</a>
          <a href="#" className="hover:text-[#3BCBBE] transition-colors">Support</a>
        </div>
        <p className="text-gray-500 text-xs font-bold">© 2026 Grand Farrel. All rights reserved.</p>
      </div>
    </footer>
  );
}